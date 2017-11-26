## **`<BrowserRouter>`**
`<BrowserRouter>`是一种 `<Router>` ，它使用HTML5历史API(pushState, replaceState 和popstate event)来保持UI与URL的同步。

```js
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```
### **basename: string**


所有location的基URL。如果您的应用程序是在服务器上的子目录中提供的，那么您需要将其设置为子目录。一个格式正确的basename应该有一个头斜杠，但是没有尾斜杠。


```js
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // 渲染为 <a href="/calendar/today">
```
### **getUserConfirmation: func**

用于确认导航的函数。默认使用`window.confirm`。
```js
// 默认行为
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
```
### **forceRefresh: bool**

如果为true，路由器将在页面导航中使用完整的页面刷新。您可能只希望在不支持HTML5历史API的浏览器中这样做。

```js
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory}/>
```
### **keyLength: number**

`location.key`的长度，默认值为6

```js
<BrowserRouter keyLength={12}/>
```

### **children: node**
一个`单一的子元素`用来渲染
# `<HashRouter>`
`<HashRouter>`是一个 `<Router>` ，它使用URL的hash部分(例如:window.location.hash)来保持UI与URL的同步。

**重要提示**: 

hash历史不支持`location.key`或`location.state`。在之前的版本中，我们试图对这种行为进行处理，但是有一些我们无法解决的问题。任何需要这种行为的代码或插件都不会起作用。由于此技术仅用于支持遗留浏览器，因此我们鼓励您将服务器配置为使用`<BrowserHistory>`代替。

```js
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App/>
</HashRouter>
```
## basename: string

所有location的基URL。一个格式正确的basename应该有一个头斜杠，但是没有尾斜杠。
````js
<HashRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="#/calendar/today">
````
## getUserConfirmation: func

用于确认导航的函数。默认使用`window.confirm`。

```js
// 默认行为
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<HashRouter getUserConfirmation={getConfirmation}/>
```
## hashType: string

用于`window.location.hash`的编码类型。可用值:


- **"slash"**：创建hash 如 `#/ and #/sunshine/lollipops`
- **"noslash"**：创建hash 如 `# and #sunshine/lollipops`
- **"hashbang"**：创建`“ajax crawlable”` (谷歌弃用) hash 如 `#!/ and #!/sunshine/lollipops`


默认值： `"slash"`

## children: node

一个用来渲染的`单一子元素`
# `<Link>`

在应用程序中提供声明性的、可访问的导航

```js
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
```
## to: string

链接到的路径名或位置。
```js
<Link to="/courses"/>
```
## to: object
链接到的位置。
```js
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```
## replace: bool
当为true时，单击该链接将替代history堆栈中的当前条目，而不是添加一个新条目。

```
<Link to="/courses" replace />
```
# `<MemoryRouter>`

`<MemoryRouter>`是一个[`<Router>`](Router.md)，它将你的“URL”的历史保存在内存中(不读或写地址栏)。在测试和非浏览器环境中很有用，如[React Native](https://facebook.github.io/react-native/)

```js
import { MemoryRouter } from 'react-router'

<MemoryRouter>
  <App/>
</MemoryRouter>
```

## initialEntries: array
初始化条目

history堆栈中的一个`location`数组。它们可能是具有`{ pathname, search, hash, state }`或简单字符串URLs的成熟location对象。

```js
<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>
```

## initialIndex: number

初始location在`initialEntries`数组中的索引。

## getUserConfirmation: func


用于确认导航的函数。当您配合一个[`<Prompt>`](./Prompt.md)直接使用`<MemoryRouter>`时您必须使用这个选项。

## keyLength: number

`location.key`的长度，默认值为6

```js
<MemoryRouter keyLength={12}/>
```

## children: node

一个[单一子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only) 用来渲染。
# `<NavLink>`

`<NavLink>`是一个特殊版本的`<Link>`。当它与当前的URL匹配时，它将为渲染的元素添加样式属性。

```js
import { NavLink } from 'react-router-dom'

<NavLink to="/about">About</NavLink>
```
## activeClassName: string

当`<NavLink>`是激活状态，这个class会赋予这个元素。默认是激活状态。这将与className属性一起使用。

```js
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```
## activeStyle: object
当`<NavLink>`是激活状态时，这个style对象会被应用到元素。

```js
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```
## exact: bool

当为true时，则只有在location**完全**匹配时才会应用激活的class/style。

```js
<NavLink
  exact
  to="/profile"
>Profile</NavLink>
```
## strict: bool


当为true时，在确定该位置是否与当前URL匹配时，将考虑位置路径名的末尾斜杠。请参阅 [`<Route strict>`](./Route.md#strict)获取更多信息

```js
<NavLink
  strict
  to="/events/"
>Events</NavLink>
```
## isActive: func

一个函数，返回值是bool类型。用于添加额外的逻辑，以确定链接是否是激活的。如果您想要做更多的事情，而不是验证该链接的路径名与当前URL的路径名匹配，那么就应该使用该方法。
```js
// only consider an event active if its event id is an odd number只有当事件id为奇数时才考虑事件活动
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink
  to="/events/123"
  isActive={oddEvent}
>Event 123</NavLink>·
```
## location: object

`isActive`比较当前的历史位置(通常是当前的浏览器URL)。为了与不同的位置进行比较，可以传入一个`location`

# `<Prompt>`

用于在离开页面之前提示用户。当您的应用程序进入一个状态，该状态应该防止用户导航(就像表单被填满了)，这时渲染一个`<Prompt>`。

```js
import { Prompt } from 'react-router'

<Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
```

## message: string

当用户试图导航时，用于提示用户的信息。

```js
<Prompt message="Are you sure you want to leave?"/>
```

## message: func

用户试图导航到的下一个`location`和`action`时被调用。返回一个字符串以向用户显示提示，或者返回`true`以便允许过度。

```js
<Prompt message={location => (
  `Are you sure you want to go to ${location.pathname}?`
)}/>
```

## when: bool

有条件地渲染一个`<Prompt>`，你可以总是渲染它，但传递`when={true}` 或者 `when={false}`来允许或阻止导航。

```js
<Prompt when={formIsHalfFilledOut} message="Are you sure?"/>
```
# `<Redirect>`

渲染一个`<Redirect>`将导航到一个新的位置。新的位置将覆盖历史堆栈中的当前位置，就像服务器端重定向(HTTP 3xx)那样。

```js
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

## to: string

重定向到的URL，[`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 能解析的任何有效的URL路径。`to`里面使用的所有URL参数必须被`from`覆盖。因为它只是重定向而已。

```js
<Redirect to="/somewhere/else"/>
```

## to: object

用来重定向的location。`pathname`可以是任何能被 [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 解析的路径。

```js
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>
```

## push: bool

当为`true`时，重定向将推动一个新的条目进入历史，而不是取代当前的条目。

```js
<Redirect push to="/somewhere/else"/>
```

## from: string

一个路径名，用来表示从哪里重定向。它是任何可以被[`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 解析的有效URL路径。所有匹配的URL参数都提供给`to`中的模式。在`to`中必须包含所使用的所有参数。`to`中未使用的附加参数被忽略。

当它在`<Switch>`中渲染一个`<Redirect>`时，这只能用于匹配一个location。参见 [`<Switch children>`](./Switch.md#children-node)

```js
<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  <Route path='/new-path' component={Place}/>
</Switch>
```

```js
//含匹配参数的重定向
<Switch>
  <Redirect from='/users/:id' to='/users/profile/:id'/>
  <Route path='/users/profile/:id' component={Profile}/>
</Switch>
```
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

如果应用的location是`/news`，那么UI层次结构将会是:

```html
<div>
  <!-- react-empty: 1 -->
  <NewsFeed/>
</div>
```

"react-empty"注释只是React的`null`渲染的实现细节。但就我们的目的而言，这是有益的。从技术上来说，Route组件即使它渲染为`null`，它也始终是“被渲染”的。一旦应用程序location与路由的路径，您的组件就会被渲染。
## Route 渲染方法

`<Route>`有三种渲染方法:

- [`<Route component>`](#component)
- [`<Route render>`](#render-func)
- [`<Route children>`](#children-func)

每种方法在不同的情况下都很有用。你应该只使用这些props的其中的一种。参见下面的解释，了解为什么你有3个选项。大多数情况下，您将使用`component`。

## Route props

三个 [渲染方法](#route-render-methods)将被传递到相同的三个路由props：

- [match](./match.md)
- [location](./location.md)
- [history](./history.md)

## component

只有当location匹配时才渲染一个React组件。它将会使用[route props](#route-props)来渲染。

```js
<Route path="/user/:username" component={User}/>

// match参数将被从路由接收到的props解构出来
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```

当你使用`component`(而不是`render`或`children`,在下文)路由器使用[`React.createElement`](https://facebook.github.io/react/docs/react-api.html#createelement)从给定的组件创建一个新的[React元素](https://facebook.github.io/react/docs/rendering-elements.html)。这意味着，如果您为`component`属性提供了一个内联函数，那么每次渲染您都将创建一个新的组件。这将导致现有组件的**卸载**和新组件的**安装**，而不是仅仅**更新**现有组件。当使用内联函数的内联函数时，使用`render`或`children`属性(下文)。
## render: func

这样就可以方便地进行内联渲染和包装，而不必考虑上面所述的不需要的重新加载。

取代创建一个新的[React元素](https://facebook.github.io/react/docs/rendering-elements.html)是为了您使用这个属性，当location匹配的时候，你可以在一个函数中传递调用。`render`属性接收所有相同的[route props](#route-props)作为`component`渲染属性。

```js
// 方便的内联渲染
<Route path="/home" render={() => <div>Home</div>}/>

// 包裹/组合
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

有时您需要渲染不论路径是否与location匹配。在这些情况下，您可以使用函数`children`属性。它的工作方式和`render`完全一样，只是不论匹配与否它都被调用。

`children`渲染属性接收所有与[route props](#route-props)相同的属性作为`component`和`render`方法，但是当一条路由不能匹配URL时，`match`是`null`。这允许您根据路由是否匹配来动态调整UI。如果路径匹配，我们将添加一个`active`类：

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

**警告:** Both `<Route component>` and `<Route render>` 优先于 `<Route children>` ，所以不要在相同的 `<Route>`上使用超过1个。

## path: string

任何可以被[`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp)理解有效的URL路径。[`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp)是一个路径解析器。

```js
<Route path="/users/:id" component={User}/>
```
没有`path`的路由总是匹配的。

## exact: bool

精确匹配

当为`true`，路径完全与`location.pathname`相匹配时才算匹配成功。

```js
<Route exact path="/one" component={About}/>
```

| path | location.pathname | exact | matches? |
| :---: | :---: | :---: | :---: |
| `/one`  | `/one/two`  | `true` | no |
| `/one`  | `/one/two`  | `false` | yes |

## strict: bool

严格匹配

当为`true`时，一条末尾有斜杠的`path`只匹配一个末尾有斜杠的`location.pathname`。当在`location.pathname`中有其他的URL段时，这些字段对它没有影响。

```js
<Route strict path="/one/" component={About}/>
```

| path | location.pathname | matches? |
| :---: | :---: | :---: |
| `/one/` | `/one` | no |
| `/one/` | `/one/` | yes |
| `/one/` | `/one/two` | yes |

**警告:** `strict`可以被用来来强制执行一个没有末尾斜杠的`location.pathname`。为了做到这点，`strict`和`exact`都必须为`ture`。

```js
<Route exact strict path="/one" component={About}/>
```

| path | location.pathname | matches? |
| --- | --- | --- |
| `/one` | `/one` | yes |
| `/one` | `/one/` | no |
| `/one` | `/one/two` | no |

## location: object

位置

`<Route>`元素试图匹配它的`path`到当前的历史位置(通常是当前的浏览器URL)。
但是，一个具有不同`pathname`的[`location`](location.md)也可以通过匹配来传递。


这是有用的情况，当你需要匹配一个`<Route>`到一个不同于当前历史位置的位置时，如[动画过渡](https://reacttraining.com/react-router/web/example/animated-transitions)例子所示。


如果一个`<Route>`元素被包装在一个`<Switch>`中，并且匹配了传递到`<Switch>`的位置(或者当前的历史位置)，那么传递到`<Route>`的`location`属性，将被这个`<Switch>`的location所覆盖。( 鉴于[此处](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Switch.js#L51)).


## sensitive: bool

大小写敏感

当为`true`时，路径是区分大小写的

```js
<Route sensitive path="/one" component={About}/>
```

| path | location.pathname | sensitive | matches? |
| --- | --- | --- | --- |
| `/one`  | `/one`  | `true` | yes |
| `/One`  | `/one`  | `false` | no |

# `<Router>`
所有路由器组件的通用低级接口。通常，应用程序会使用其中一个高级路由器：

- [`<BrowserRouter>`](../../../react-router-dom/docs/api/BrowserRouter.md)
- [`<HashRouter>`](../../../react-router-dom/docs/api/HashRouter.md)
- [`<MemoryRouter>`](./MemoryRouter.md)
- [`<NativeRouter>`](../../../react-router-native/docs/api/NativeRouter.md)
- [`<StaticRouter>`](./StaticRouter.md)

使用低级的`<Router>`最常见用例是
将自定义的history与Redux或Mobx同步。请注意，这并不需要使用状态管理libs与React Router一起使用，它只用于深度集成。

```js
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>
```

## history: object

[`history`](https://github.com/ReactTraining/history) 是示意用于导航的对象。

```js
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
<Router history={customHistory}/>
```

## children: node


[单一子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only) 用来渲染。

```js
<Router>
  <App/> // App作为这个单一的子元素
</Router>
```
# `<StaticRouter>`

`<StaticRouter>`是一个 [`<Router>`](Router.md)， 它永远不会改变位置.

这在服务器端渲染场景中非常有用，当用户实际上并没有单击，因此位置实际上不会发生变化。因此,名称:静态的。在简单的测试中，当您只需插入一个location并在渲染输出上进行断言时，它也很有用。

下面是一个示例node服务器，它为[`<Redirect>`](Redirect.md)s发送了一个302状态码，或者为其他请求发送常规HTML

```js
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

createServer((req, res) => {

  // 这个上下文对象包含渲染的结果
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  )

  // 如果 <Redirect> 被使用，context.url 将包含URL来进行重定向
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(html)
    res.end()
  }
}).listen(3000)
```

## basename: string

所有location的基本URL。一个格式正确的basename应该有一个头斜杠，但是没有尾斜杠。

```js
<StaticRouter basename="/calendar">
  <Link to="/today"/> // renders <a href="/calendar/today">
</StaticRouter>
```

## location: string

服务器接收到的URL，在node服务器上可能是`req.url`。

```js
<StaticRouter location={req.url}>
  <App/>
</StaticRouter>
```

## location: object

一个形如 `{ pathname, search, hash, state }`的location对象

```js
<StaticRouter location={{ pathname: '/bubblegum' }}>
  <App/>
</StaticRouter>
```

## context: object

一个普通的JavaScript对象。在渲染期间，组件可以向对象添加属性来存储渲染的相关信息。

```js
const context = {}
<StaticRouter context={context}>
  <App />
</StaticRouter>
```

当`<Route>`匹配时，它将把context对象传递给它渲染的组件作为组件的`staticContext`属性。查看 [服务器渲染指南](../../../react-router-dom/docs/guides/server-rendering.md) 了解如何做这个的更多信息。

在渲染之后，可以使用这些属性来配置服务器的响应

```js
if(context.status === '404') {
  // ...
}
```

## children: node

一个用来渲染的[单一子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only)。
# `<Switch>`

渲染第一个子[`<Route>`](Route.md)或与该位置匹配的[`<Redirect>`](Redirect.md)
**这和使用一堆`<Route>`有什么不一样呢?**

`<Switch>` 独特之处在于它只专门渲染一条路由。与之相反的是，未被`<Switch>`包裹情况下，每个匹配location的`<Route>`都会渲染:

```js
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

如果URL是 `/about`, 然后 `<About>`, `<User>`, 和 `<NoMatch>`都将被渲染，因为它们与路径相匹配。这是通过设计实现的，让我们可以有多种方式可以组合多个`<Route>`到我们的应用程序中，比如 侧边栏和面包屑导航，bootstrp选项卡，等等。

然而，偶尔，我们只需要选择一个`<Route>` 来渲染。如果我们在`/about`，我们不想匹配`/:user`(或显示我们的“404”页面)。`Switch`可以让我们办到：


```js
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

现在，如果我们在`/about`，`<Switch>`将开始查找匹配的`<Route>`，`<Route path="/about"/>`被匹配到， `<Switch>`会停止查找并渲染`<About>`。类似地，如果我们在`/michael`，那么`<User>`将会被渲染。

这对于动画过渡也很有用，因为匹配到的`<Route>`将被渲染到与前一个相同的位置。

```js
<Fade>
  <Switch>
    {/* 这里只会有一个child */}
    <Route/>
    <Route/>
  </Switch>
</Fade>

<Fade>
  <Route/>
  <Route/>
  {/* 这里总会有两个孩子，一个可能会渲染为空值，从而让转换变得更麻烦 */}
</Fade>
```

## location: object

[`location`](location.md)对象被用来匹配子元素，而不是当前的历史位置(通常是当前的浏览器URL)。

## children: node

`<Switch>`的所有子元素应该是`<Route>`或者`<Redirect>`。
 只有第一个匹配当前location的子元素将被渲染。

`<Route>`是用它们`path`属性来匹配的。`<Redirect>`使用他们的`from`属性来匹配的。没有任何路径支持或没有任何的支持，将始终与当前的位置相匹配。没有`path`的`<Route>`和没有`form`的`<Redirect>`会始终匹配当前位置。

当你将一个`<Redirect>`包含在`<Switch>`中的时候，它可以使用任意一个`<Route>`的loaction来匹配`path`、`exact`和`strict`这些属性。如果一个`location`属性被赋予到`<Switch>`上，它将覆盖匹配到的子元素的`location`属性。

```js
<Switch>
  <Route exact path="/" component={Home}/>

  <Route path="/users" component={Users}/>
  <Redirect from="/accounts" to="/users"/>

  <Route component={NoMatch}/>
</Switch>
```
# context.router

React Router 使用 `context.router` 来方便`<Router>`和它的后代[`<Route>`](Route.md)、[`<Link>`](../../../react-router-dom/docs/api/Link.md)s, [`<Prompt>`](Prompt.md)s, 等等进行通信。

`context.router`不应该被认为是公共的API。 因为它身是一个实验性的API，在未来的React中可能会发生变化, 你应该避免在你的组件中直接访问 `this.context.router` 。相反，您可以通过传递给您的[`<Route>`](Route.md)组件或包装在[`withRouter`](withRouter.md)中的组件的props来访问我们在上下文环境中存储的变量。
# history

术语“history”和“`history`对象”在这个文档是指[the `history` package](https://github.com/ReactTraining/history),这是React Router的两个主要依赖中的一个（除了React本身）,并在各种环境中提供了几个不同的管理会话历史的Javascript的实现。

以下术语也被使用:

- **"browser history"**：一个特定于DOM的实现，在支持HTML5 history API的web浏览器中很有用
- **"hash history"**：用于遗留web浏览器的特定于DOM的实现
- **"memory history"**：内存中的history实现，在测试和非DOM环境中很有用，比如React Native

`history`对象通常具有以下属性和方法:

- `length` - (number) history堆栈中的条目数
- `action` - (string) 当前的动作 (`PUSH`, `REPLACE`, or `POP`)
- `location` - (object) 当前位置。可能有以下属性:
  - `pathname` - (string) URL的路径
  - `search` - (string) URL查询字符串
  - `hash` - (string) URL的hash片段
  - `state` - (string) 所提供的特定位置的状态。举例来说，当这个location被推到堆栈上时，`push(path, state)`。只有在浏览器和内存history中才可用。
- `push(path, [state])` - (function) 将一个新条目添加到history堆栈中
- `replace(path, [state])` - (function) 替换history堆栈上的当前条目
- `go(n)` - (function) 在shistory堆栈中按条目移动n个指针
- `goBack()` - (function) 相当于 `go(-1)`
- `goForward()` - (function) 相当于 `go(1)`
- `block(prompt)` - (function) 防止导航 (参见 [ history 文档](https://github.com/ReactTraining/history#blocking-transitions))

## history是可变的

history对象是可变的。例如:
在此之前，推荐从[`<Route>`](./Route.md)的`render`的props访问[`location`](./location.md)（`({location} =>{})`），而不是从`history.location`。这确保了您对React的设想在生命周期钩子中是正确的。例如:
```js
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // will be true
    const locationChanged = nextProps.location !== this.props.location

    // 错误的, **永远**都是错误的，因为history是可变的。
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}

<Route component={Comp}/>
```

根据您所使用的实现，还可能出现其他属性。请参考[ history文档](https://github.com/ReactTraining/history#properties)获得更多信息。[中文文档](/Http/ReactTraining_history/README.md)
# location

Location代表了应用现在的位置，你想要它去哪里，或者甚至它过去在哪儿。它看起来像这样:

```js
{
  key: 'ac3df4', // 不是HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

路由器会在几个地方提供一个location对象:

- [Route component](./Route.md#component) 中作为 `this.props.location`
- [Route render](./Route.md#render-func) 中作为 `({ location }) => ()`
- [Route children](./Route.md#children-func) 中作为 `({ location }) => ()`
- [withRouter](./withRouter.md) 中作为 `this.props.location`


它也在`history.location`被发现。但你不应该使用它，因为它是可变的。您可以在[history](./history.md)中读到更多关于它的信息。


location对象永远不会发生突变，因此您可以在生命周期钩子中使用它，以确定什么时候进行导航，这对数据获取和动画非常有用。

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // navigated!
  }
}
```
您可以提供locations，而不是字符串来导航的各个地方:

- Web [Link to](../../../react-router-dom/docs/api/Link.md#to)
- Native [Link to](../../../react-router-native/docs/api/Link.md#to)
- [Redirect to](./Redirect.md#to)
- [history.push](./history.md#push)
- [history.replace](./history.md#push)

通常你只是使用一个字符串，但是如果你需要添加一些"location 状态"，这将是可用的。每当应用程序返回到特定的位置，你可以使用一个location对象替代这些字符串。如果您希望基于导航历史而不是仅仅路径(像模态框)来分支UI，这是非常有用的。

```jsx
// 通常需要这样
<Link to="/somewhere"/>

// 但你可以使用一个location来代替
const location = {
  pathname: '/somewhere'
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```

最后，您可以将一个location传递给以下组件:

- [Route](./Route.md#location)
- [Switch](./Switch.md#location)

这将阻止他们在路由器的状态中使用实际的位置。这对于动画和正在等待的导航是很有用的，或者任何时候您想要欺骗组件，渲染它们到不同的位置，而不是实际的位置。

# match

`match`对象包含关于`<Route path>`如何与URL匹配的信息。`match`对象包含以下属性:

  - `params` - (object) 从URL中解析的键/值对，对应路径的动态字段
  - `isExact` - (boolean) `true` 如果整个URL是匹配的(没有尾字符)
  - `path` - (string) 用于匹配的路径模式。 用于构建嵌套的嵌套`<Route>`
  - `url` - (string) URL被匹配到的部分。 用于构建嵌套的嵌套 `<Link>`

您可以在不同的地方访问`match`对象:

- [Route component](./Route.md#component) 中作为 `this.props.match`
- [Route render](./Route.md#render-func) 中作为 `({ match }) => ()`
- [Route children](./Route.md#children-func) 中作为 `({ match }) => ()`
- [withRouter](./withRouter.md) 中作为 `this.props.match`
- [matchPath](./matchPath.md) 中作为 the return value

如果一个Route没有`path`，因此总是匹配，那么您将得到最接近的父匹配。同样适用于`withRouter`。

# matchPath

这使您可以使用相同的匹配代码，`<Route>`在正常的渲染周期外使用，就像在服务器进行渲染之前收集数据依赖关系。

```js
import { matchPath } from 'react-router'

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
})
```

## pathname

第一个参数是您想要匹配的路径名。如果您正在使用Node服务器,它将是`req.url`。

## props

第二个参数是定制匹配的props，它们和`Route`接收的匹配props是一样的

```js
{
  path, // like /users/:id
  strict, // optional, defaults to false
  exact // optional, defaults to false
}
```
# withRouter

您可以通过`withRouter`高阶组件访问[`history`](./history.md)对象的属性和最近的[`<Route>`](./Route.md)的 [`match`](./match.md)。`withRouter`将在它每次渲染时将已经更新的`match`、`location`和`history`属性传递到包裹组件。

```js
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// 一个简单的组件，显示当前位置的路径名
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <div>You are now at {location.pathname}</div>
    )
  }
}

// 创建一个“connected”的新路由器组件(借用redux术语)
// ShowTheLocation是一个“connected”组件
const ShowTheLocationWithRouter = withRouter(ShowTheLocation)
```

#### 重要提示

`withRouter`不订阅location 改变，就像React Redux的`connect`不订阅状态改变一样。而不是在位置更改从`<Router>`组件中传播出来之后，重新渲染。这意味着除非父组件重新渲染，否则`withRouter`**不会**在路由转换上重新渲染。如果您正在使用`withRouter`从靠`shouldComponentUpdate`被屏蔽来阻止更新，那么`withRouter`将会包裹实现了`shouldComponentUpdate`组件，这是很重要的。例如，在使用Redux时:

```js
// 这就在shouldComponentUpdate
withRouter(connect(...)(MyComponent))
// 或者
compose(
  withRouter,
  connect(...)
)(MyComponent)

// 这没有
connect(...)(withRouter(MyComponent))
// 或者
compose(
  connect(...),
  withRouter
)(MyComponent)
```

参阅 [本指南](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md) 获取更多信息。[中文指南](../docs/guides/blocked-updates.md)。

#### 静态方法和属性

包裹组件的所有非React的静态方法和的属性都被自动复制到"connected"组件。

## Component.WrappedComponent

包裹组件在返回的组件上被暴露为`WrappedComponent`属性，这是可以使用的
用于单独测试组件，以及其他方面。

```js
// MyComponent.js
export default withRouter(MyComponent)

// MyComponent.test.js
import MyComponent from './MyComponent'
render(<MyComponent.WrappedComponent location={{...}} ... />)
```

## wrappedComponentRef: func

将作为`ref`属性传递给包裹组件的一个函数。

```js
class Container extends React.Component {
  componentDidMount() {
    this.component.doSomething()
  }

  render() {
    return (
      <MyComponent wrappedComponentRef={c => this.component = c}/>
    )
  }
}
```