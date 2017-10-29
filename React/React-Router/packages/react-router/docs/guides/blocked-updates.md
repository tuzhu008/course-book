# 处理更新阻塞

React Router有许多位置感知（location-aware）组件，它们使用当前`location`对象来确定它们渲染的内容。默认情况下，当前`location`会隐式地传递给使用React的上下文模型的组件。当位置发生变化时，这些组件应该使用来自上下文的新的`location`对象重新渲染。

React提供了两种方法来优化应用程序的渲染性能:`shouldComponentUpdate` 生命周期方法和`PureComponent`。除非满足了合适的条件，否则都将阻止组件的重新渲染。不幸的是，这意味着，如果它们的重新渲染被阻止React Router的位置感知组件可能会变得与当前位置不同步。

### 有问题的例子

我们从一个阻止更新的组件开始。

```js
class UpdateBlocker extends React.PureComponent {
  render() {
    return this.props.children
  }
}
```
当`<UpdateBlocker>`在挂载时，任何位置感知子组件将使用当前的`location` 和 `match`对象来渲染。

```js
// location = { pathname: '/about' }
<UpdateBlocker>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>
```
当位置发生改变，`<UpdateBlocker>`检测不到任何属性或者状态的变化，所以他们的子组件将不会重新渲染。

```js
// location = { pathname: '/faq' }
<UpdateBlocker>
  // 这些links不会被重新渲染，所以他们保留之前的属性
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>
```

### `shouldComponentUpdate`

为了让组件知道它应该在位置发生改变时更新，需要实现它的`shouldComponentUpdate`方法，使该方法能够检测位置的变化。

如果你要自己实现`shouldComponentUpdate`，你**可以**比较当前的location和下一个`context.router`对象的location。然而，作为一个用户，您不应该直接使用上下文。相反，如果您可以比较当前和下一个位置而不触及上下文，则是理想的选择。

#### 三方代码

您可能会遇到一些问题，组件在位置更改之后没有更新，尽管您自己没有调用`shouldComponentUpdate`。这很有可能是因为`shouldComponentUpdate`被第三方代码调用，例如:`react-redux`的 `connect` 和 `mobx-react`的`observer`.

```js
// react-redux
const MyConnectedComponent = connect(mapStateToProps)(MyComponent)

// mobx-react
const MyObservedComponent = observer(MyComponent)
```
有了第三方代码，您可能甚至无法控制`shouldComponentUpdate`的实现。相反，您必须构造您的代码，以使位置更改对那些方法很显而易见。

`connect`和`observer`都创建了一个组件，该组件的`shouldComponentUpdate`方法对当前的`props`和下一个`props`进行了比较浅的比较。当至少有一个prop发生改变时，这些组件才会重新呈现。这意味着，为了确保在位置更改时更新，需要在位置更改时提供一个prop

### `PureComponent`

响应的`PureComponent`没有实现`shouldComponentUpdate`，但是它采取了类似的方法来防止更新。当一个"pure"组件更新时，它将对当前的`props` 和 `state`和下一个`props` 和 `state`做一个比较浅的比较。如果比较没有发现任何差异，那么组件将不会更新。就像`shouldComponentUpdate`一样，这意味着为了在位置更改时强制"pure"组件更新，它需要有一个已更改的prop或state。


### 解决方案

#### 快速解决方案

如果您在使用诸如`connect`(来自react-redux)或`observer`(来自Mobx)之类的高阶组件时遇到这个问题，您可以将该组件包装在`withRouter`中，以移除被阻塞的更新。

```javascript
// redux before
const MyConnectedComponent = connect(mapStateToProps)(MyComponent)
// redux after
const MyConnectedComponent = withRouter(connect(mapStateToProps)(MyComponent))

// mobx before
const MyConnectedComponent = observer(MyComponent)
// mobx after
const MyConnectedComponent = withRouter(observer(MyComponent))
```

**这不是最有效的解决方案**, 但是，它将预防更新被阻塞的问题。有关这个解决方案的更多信息，参阅 [Redux指南](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates).  要理解为什么这不是最优解，轻阅读 [这个线程](https://github.com/ReactTraining/react-router/pull/5552#issuecomment-331502281).

#### 推荐解决方案

在位置更改之后，避免重新渲染被阻塞的关键是将`location`对象传递给被阻塞的组件作为一个属性。无论何时位置发生变化，location将是不同的，所以比较程序会发现当前和下一个location是不同的。

```js
// location = { pathname: '/about' }
<UpdateBlocker location={location}>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>

// location = { pathname: '/faq' }
<UpdateBlocker location={location}>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq' class='active'>F.A.Q.</a>
</UpdateBlocker>
```

#### 获取location

为了将当前的`location`对象作为属性传递给组件，您必须能够访问它。组件可以访问该`location`的主要方式是通过一个`<Route>`。当一个`<Route>`匹配(或者总是使用`children`属性)时，它将当前`location`传递给它渲染的子元素。

```js
<Route path='/here' component={Here}/>
const Here = (props) => {
  // props.location = { pathname: '/here', ... }
  return <div>You are here</div>
}

<Route path='/there' render={(props) => {
  // props.location = { pathname: '/there', ... }
  return <div>You are there</div>
}}/>

<Route path='/everywhere' children={(props) => {
  // props.location = { pathname: '/everywhere', ... }
  return <div>You are everywhere</div>
}}/>
```

这意味着，如果给定一个阻止更新的组件，用下列方法，您可以很容易地将`location`作为它一个属性传递:

```js
// Blocker是一个 "pure"组件,所以它仅在接收到新props时更新 
class Blocker extends React.PureComponent {
  render() {
    <div>
      <NavLink to='/oz'>Oz</NavLink>
      <NavLink to='/kansas'>Kansas</NavLink>
    </div>
  }
}
```

1. 一个直接由一个`<Route>`渲染的组件不需要担心更新被阻塞，因为它有一个被注入的`location`作为一个属性。

```js
// 无论这个location什么改变，<Blocker>的lacation属性将改变
<Route path='/:place' component={Blocker}/>
```

2. 由`<Route>`直接渲染的组件可以将该位置属性传递给它所创建的任何子元素。

```js
<Route path='/parent' component={Parent} />

const Parent = (props) => {
  // <Parent> 接收location作为它的一个prop，location会传递到它创建的任何子元素
  return (
    <SomeComponent>
      <Blocker location={props.location} />
    </SomeComponent>
  )
}
```

当组件没有被一个`<Route>`组件渲染，而该组件渲染时它没有`location`参数，会发生什么?有两种方法可以自动地将`location`作为组件的属性注入到组件中。


1. 渲染一个没有`path`的`<Route>`。虽然`<Route>`通常被用于匹配特定的路径，但无`path`的`<Route>`总是匹配的，因此它总是渲染它的组件。

```js
// 无`path`的 <Route> = <Blocker> 将始终被渲染
const MyComponent= () => (
  <SomeComponent>
    <Route component={Blocker} />
  </SomeComponent>
)
```

2. 您可以使用`withRouter`高阶组件包裹一个组件，并且被包裹的组件将会被赋予当前的`location` 作为它的属性。
```js
// 在内部, withRouter 只渲染一个无路的<Route>
const BlockAvoider = withRouter(Blocker)

const MyComponent = () => (
  <SomeComponent>
    <BlockAvoider />
  </SomeComponent>
)
```
