# 从 v2/v3 迁移到 v4

反应路由器v4是一个完整的重写版本，所以没有一个简单的迁移路径。本指南将为您提供一些帮助您了解如何升级您的应用程序的步骤。

**注意:** 这个迁移指南是针对React Router v2和v3的，但是为了简便起见，对以前版本的引用只会提到v3。

* [The Router](#the-router)
* [Routes](#routes)
  * [Nesting Routes](#nesting-routes)
  * [on* properties](#on-properties)
  * [Switch](#switch)
  * [Redirect](#redirect)
* [PatternUtils](#patternutils)
* [Link](#link)

## The Router

在React Router v3中，有一个单一的`<Router>`组件。它提供一个`history`对象作为一个属性。

此外，你还可以给`<Router>`提供路由配置，使用`routes`属性，或者将`<Route>`作为`<Router>`的子元素。

```js
// v3
import routes from './routes'
<Router history={browserHistory} routes={routes} />
// or
<Router history={browserHistory}>
  <Route path='/' component={App}>
    // ...
  </Route>
</Router>
```

对于React Router v4，最大的变化之一是有许多不同的路由器组件。每一个都将为您创建一个`history`对象。`<BrowserRouter>`创建了一个浏览器history`<HashRouter>`创建了一个哈希history，`<MemoryRouter>`创建了一个内存history。

在v4中，没有集中的路由配置。在任何需要根据路由渲染内容的地方，您只需要渲染一个`<Route>`组件。

```html
//v4
<BrowserRouter>
  <div>
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
  </div>
</BrowserRouter>
```

需要注意的一点是，路由器组件必须只提供一个单一子元素。

```html
// yes
<BrowserRouter>
  <div> //单一子元素
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
  </div>
</BrowserRouter>

// no
<BrowserRouter>
  <Route path='/about' component={About} />
  <Route path='/contact' component={Contact} />
</BrowserRouter>
```

## Routes

In v3, the `<Route>` was not really a component. Instead, all of your application's `<Route>` elements were just used to created a route configuration object.在v3中，`<Route>`并不是一个真正的组件。相反，您的应用程序的所有`<Route>`元素都只是用来创建一个路由配置对象。

```js
/// in v3 这个元素
<Route path='contact' component={Contact} />
// 相当于
{
  path: 'contact',
  component: Contact
}
```

在v4中，您可以像常规的React应用程序一样布局应用程序的组件。在任何您想要根据location(特别是它的`pathname`)渲染内容的地方，您都要渲染一个`<Route>`。

v4的`<Route>`组件实际上是一个组件，因此无论您在哪里渲染一个`<Route>`组件，内容都将被渲染。当该`<Route>`的`path`与当前location匹配时，它将使用它的渲染属性(`component`、`render`或者 `children`)进行渲染。当 `<Route>`的 `path`不匹配时，它将渲染一个null。

### Nesting Routes

在v3中，`<Route>`是通过将它们传递作为其父类`<Route>`的`children`属性来嵌套的。

```js
<Route path='parent' component={Parent}>
  <Route path='child' component={Child} />
  <Route path='other' component={Other} />
</Route>
```

When a nested `<Route>` matched, React elements would be created using both the child and parent `<Route>`'s `component` prop. The child element would be passed to the parent element as its `children` prop.当一个嵌套的`<Route>`匹配时，将使用父`<Route>`的 `component`属性和child来创建React元素。子元素将被传递给父元素作为它的`children`属性。

```js
<Parent {...routeProps}>
  <Child {...routeProps} />
</Parent>
```
在v4中，子`<Route>`应该由父`<Route>`的组件来渲染。

```js
<Route path='parent' component={Parent} />

const Parent = () => (
  <div>
    <Route path='child' component={Child} />
    <Route path='other' component={Other} />
  </div>
)
```

### `on*` properties

React Router v3提供了`onEnter`, `onUpdate`, 和 `onLeave`方法。这些本质上是重新创建React的生命周期方法。

使用v4时，您应该使用由`<Route>`渲染的组件的生命周期方法。与`onEnter`不同，您将使用`componentDidMount`或`componentWillMount`。你以前会使用`onUpdate`的地方您可以使用`componentDidUpdate`或`componentWillUpdate`(或可能是`componentWillReceiveProps`)。`onLeave`可以被`componentWillUnmount`代替。

### `<Switch>`

在v3中，您可以指定许多子路由，并且只有第一个匹配的路由会被渲染。
```js
// v3
<Route path='/' component={App}>
  <IndexRoute component={Home} />
  <Route path='about' component={About} />
  <Route path='contact' component={Contact} />
</Route>
```

v4使用`<Switch>`组件提供了类似的功能。当`<Switch>`被渲染的时候，它只会渲染与当前位置匹配的第一个子`<Route>`对象。
```js
// v4
const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
  </Switch>
)

```

### `<Redirect>`

在v3中，如果您想要从一个路径重定向到另一个路径，例如`/`重定向到`/welcome`，您将使用`<IndexRedirect >`

```js
// v3
<Route path="/" component={App}>
  <IndexRedirect to="/welcome" />
</Route>

```

在v4中，您可以使用`<Redirect>`实现相同的功能。

```js
// v4
<Route exact path="/" render={() => <Redirect to="/welcome" component={App} />} />

<Switch  >
  <Route exact path="/" component={App} />
  <Route path="/login" component={Login} />
  <Redirect path="*" to="/" />
</Switch>

```

## PatternUtils

### matchPattern(pattern, pathname)

在v3中，如果路径有一个固定匹配模式，您可以使用内部使用相同检测代码的代码来检查。在v4 这已经被[path-to-regexp](https://github.com/pillarjs/path-to-regexp)所提供的[matchPath](/packages/react-router/docs/api/matchPath.md)取代。

### formatPattern(pattern, params)


在v3中，您可以使用PatternUtils.formatPattern从一个路径模式（可能是在一个常量或中央路由配置中）来生成一跳有效的路径和一个包含名称参数的对象：

```js
// v3
const THING_PATH = '/thing/:id';

<Link to={PatternUtils.formatPattern(THING_PATH, {id: 1})}>A thing</Link>
```

在v4中，您可以使用[path-to-regexp](https://github.com/pillarjs/path-to-regexp)中的 [compile](https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp) 函数来实现相同的功能

```js
// v4
const THING_PATH = '/thing/:id';

const thingPath = pathToRegexp.compile(THING_PATH);

<Link to={thingPath({id: 1})}>A thing</Link>
```

## Link

### `to` 属性是必须的

在v3中，您可以省略`to`属性或将其设置为null，以创建一个没有`href`属性的锚标签。

```js
// v3
<Link to={disabled ? null : `/item/${id}`} className="item">
  // item content
</Link>
```

在v4中，您应该始终提供`to`属性。如果您依赖于空的`to`，您可以做一个简单的包装器。

```js
// v4
import { Link } from 'react-router-dom'

const LinkWrapper = (props) => {
  const Component = props.to ? Link : 'a'
  return (
    <Component {...props}>
      { props.children }
    </Component>
  )
}

<LinkWrapper to={disabled ? null : `/item/${id}`} className="item">
  // item content
</LinkWrapper>
```
