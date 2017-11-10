# `<Route>`

Route组件可能是React Router中最重要的组件。它最基本的
职责是当一个[location](./location.md)匹配到路由的`path`时，渲染一些UI。

思考下面的代码：

```js
import { BrowserRouter as Router, Route } from 'react-router-dom'

<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>
```
如果应用的location是`/`，那么UI层次结构就会是这样的:
```html
<div>
  <Home/>
  <!-- react-empty: 2 -->
</div>
```

如果应用的location是`/news`，那么UI层次结构将会是:

```html
<div>
  <!-- react-empty: 1 -->
  <NewsFeed/>
</div>
```

"react-empty"注释只是React的`null`渲染的实现细节。但就我们的目的而言，这是有益的。从技术上来说，Route组件即使它渲染为`null`，它也始终是“被渲染”的。一旦应用程序location与路由的路径，您的组件就会被渲染。
## Route 渲染方法

`<Route>`有三种渲染方法:

- [`<Route component>`](#component)
- [`<Route render>`](#render-func)
- [`<Route children>`](#children-func)

每种方法在不同的情况下都很有用。你应该只使用这些props的其中的一种。参见下面的解释，了解为什么你有3个选项。大多数情况下，您将使用`component`。

## Route props

三个 [渲染方法](#route-render-methods)将被传递到相同的三个路由props：

- [match](./match.md)
- [location](./location.md)
- [history](./history.md)

## component

只有当location匹配时才渲染一个React组件。它将会使用[route props](#route-props)来渲染。

```js
<Route path="/user/:username" component={User}/>

// match参数将被从路由接收到的props解构出来
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```

当你使用`component`(而不是`render`或`children`,在下文)路由器使用[`React.createElement`](https://facebook.github.io/react/docs/react-api.html#createelement)从给定的组件创建一个新的[React元素](https://facebook.github.io/react/docs/rendering-elements.html)。这意味着，如果您为`component`属性提供了一个内联函数，那么每次渲染您都将创建一个新的组件。这将导致现有组件的**卸载**和新组件的**安装**，而不是仅仅**更新**现有组件。当使用内联函数的内联函数时，使用`render`或`children`属性(下文)。
## render: func

这样就可以方便地进行内联渲染和包装，而不必考虑上面所述的不需要的重新加载。

取代创建一个新的[React元素](https://facebook.github.io/react/docs/rendering-elements.html)是为了您使用这个属性，当location匹配的时候，你可以在一个函数中传递调用。`render`属性接收所有相同的[route props](#route-props)作为`component`渲染属性。

```js
// 方便的内联渲染
<Route path="/home" render={() => <div>Home</div>}/>

// 包裹/组合
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```

**警告:** `<Route component>` 优先于 `<Route render>` 所以不要在同一 `<Route>`上同时使用它们。

## children: func

有时您需要渲染不论路径是否与location匹配。在这些情况下，您可以使用函数`children`属性。它的工作方式和`render`完全一样，只是不论匹配与否它都被调用。

`children`渲染属性接收所有与[route props](#route-props)相同的属性作为`component`和`render`方法，但是当一条路由不能匹配URL时，`match`是`null`。这允许您根据路由是否匹配来动态调整UI。如果路径匹配，我们将添加一个`active`类：

```js
<ul>
  <ListItemLink to="/somewhere"/>
  <ListItemLink to="/somewhere-else"/>
</ul>

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)
```

这也可能对动画有帮助:

```js
<Route children={({ match, ...rest }) => (
  {/* 动画会一直渲染，所以你可以使用生命周期
      让它的child进或者出 */}
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```

**警告:** Both `<Route component>` and `<Route render>` 优先于 `<Route children>` ，所以不要在相同的 `<Route>`上使用超过1个。

## path: string

任何可以被[`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp)理解有效的URL路径。[`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp)是一个路径解析器。

```js
<Route path="/users/:id" component={User}/>
```
没有`path`的路由总是匹配的。

## exact: bool

精确匹配

当为`true`，路径完全与`location.pathname`相匹配时才算匹配成功。

```js
<Route exact path="/one" component={About}/>
```

| path | location.pathname | exact | matches? |
| :--- | :--- | :---: | :---: |
| `/one`  | `/one`  | `true` | yes |
| `/one`  | `/one/`  | `true` | yes |
| `/one`  | `/one/two`  | `true` | no |
| `/one`  | `/one`  | `false` | yes |
| `/one`  | `/one/`  | `false` | yes |
| `/one`  | `/one/two`  | `false` | yes |
| --  | -- | -- | -- |
| `/one/`  | `/one`  | `true` | yes |
| `/one/`  | `/one/`  | `true` | yes |
| `/one/`  | `/one/two`  | `true` | no |
| `/one/`  | `/one`  | `false` | yes |
| `/one/`  | `/one/`  | `false` | yes |
| `/one/`  | `/one/two`  | `false` | yes |


在exact或非exact模式下，`/one`和`/one/`都是等价的。而区别在于`/one/`、`/one/` 与`/one/two`是否匹配。

## strict: bool

严格匹配

当为`true`时，一条末尾有斜杠的`path`只匹配一个末尾有斜杠的`location.pathname`。当在`location.pathname`中有其他的URL段时，这些字段对它没有影响。

```js
<Route strict path="/one/" component={About}/>
```

| path | location.pathname | matches? |
| :---: | :---: | :---: |
| `/one/` | `/one` | no |
| `/one/` | `/one/` | yes |
| `/one/` | `/one/two` | yes |
| - | - |- |
| `/one` | `/one` | yes |
| `/one` | `/one/` | yes |
| `/one` | `/one/two` | yes |

从上可以看出，strict模式的匹配是单向的，它**只是针对于`path`中以`/`结尾的路径做限制**。也就是说，这个规则**对不以`/`结尾的路径不起作用**。

strict会先将`location.pathname`中的末尾变为`/`，如果以一个字符或者字符串结尾，会去掉这些字符，如：`/one/two`会被转为`/one/`。因此`/one/`和`/one`不匹配，`/one/`和`/one/two`是匹配的。

但此模式对`/`无用，因此`path='/'`与任何都是匹配的。唯一有用的是使用exact。

**警告:** `strict`可以被用来来强制执行一个没有末尾斜杠的`location.pathname`。为了做到这点，`strict`和`exact`都必须为`ture`。

```js
<Route exact strict path="/one" component={About}/>
```

| path | location.pathname | matches? |
| --- | --- | --- |
| `/one` | `/one` | yes |
| `/one` | `/one/` | no |
| `/one` | `/one/two` | no |
| `/one/` | `/one` | no |
| `/one/` | `/one/` | yes |
| `/one/` | `/one/two` | no |

两种模式一起用，就可以用来使匹配必须一模一样。对字符敏感，对末尾的`/`也敏感。

## location: object

位置

`<Route>`元素试图匹配它的`path`到当前的历史位置(通常是当前的浏览器URL)。
但是，一个具有不同`pathname`的[`location`](location.md)也可以通过匹配来传递。


这是有用的情况，当你需要匹配一个`<Route>`到一个不同于当前历史位置的位置时，如[动画过渡](https://reacttraining.com/react-router/web/example/animated-transitions)例子所示。


如果一个`<Route>`元素被包装在一个`<Switch>`中，并且匹配了传递到`<Switch>`的位置(或者当前的历史位置)，那么传递到`<Route>`的`location`属性，将被这个`<Switch>`的location所覆盖。( 鉴于[此处](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Switch.js#L51)).


## sensitive: bool

大小写敏感

当为`true`时，路径是区分大小写的

```js
<Route sensitive path="/one" component={About}/>
```

| path | location.pathname | sensitive | matches? |
| --- | --- | --- | --- |
| `/one`  | `/one`  | `true` | yes |
| `/One`  | `/one`  | `false` | no |

