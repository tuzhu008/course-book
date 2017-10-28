## 服务器渲染

在服务器上渲染的情况略有不同，因为它都是无状态的。基本的思想是，我们将这个应用程序包装在一个无状态的`<StaticRouter>`下，而不是一个`<BrowserRouter>`。我们从服务器传递请求的url，这样路由就可以匹配，我们将在下文中讨论一个上下文prop。

```js
// 客户端
<BrowserRouter>
  <App/>
</BrowserRouter>

// 服务器 (非完整)
<StaticRouter
  location={req.url}
  context={context}
>
  <App/>
</StaticRouter>
```
当您在客户端上渲染一个`<Redirect>`时，浏览器的history会发生变化，我们会得到新的屏幕。在静态服务器环境中，我们不能改变应用程序的状态。相反，我们使用上下文prop来找出渲染的结果是什么。如果我们找到一个`context.url`，然后我们知道应用程序被重定向。这允许我们从服务器发送正确的重定向。
```js
const context = {}
const markup = ReactDOMServer.renderToString(
  <StaticRouter
    location={req.url}
    context={context}
  >
    <App/>
  </StaticRouter>
)

if (context.url) {
  // Somewhere a `<Redirect>` was rendered
  redirect(301, context.url)
} else {
  // we're good, send the response
}
```
### **添加应用程序特定的上下文信息**

路由器只会添加`context.url`。但是你可能想要一些重定向到`301`和其他`302`。或者，如果某个特定的UI分支被渲染，那么您可能会发送一个`404`响应，或者如果他们未被授权，发送一个`401`。上下文prop是你的，所以你可以修改它。这里有一种区分`301`和`302`重定向的方法:

```js
const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // 客户端上没有 `staticContext` , 所以我们需要防范这个问题
    if (staticContext)
      staticContext.status = status
    return <Redirect from={from} to={to}/>
  }}/>
)

// 在你应用的某个地方
const App = () => (
  <Switch>
    {/* some other routes */}
    <RedirectWithStatus
      status={301}
      from="/users"
      to="/profiles"
    />
    <RedirectWithStatus
      status={302}
      from="/courses"
      to="/dashboard"
    />
  </Switch>
)

// 在服务器上
const context = {}

const markup = ReactDOMServer.renderToString(
  <StaticRouter context={context}>
    <App/>
  </StaticRouter>
)

if (context.url) {
  // 可以使用我们在RedirectWithStatus中添加的`context.status` 
  redirect(context.status, context.url)
}
```
### **`404`，`401`，或任何其他状态**

我们可以做和上面一样的事情。创建一个组件，添加一些上下文，并将其渲染在应用程序的任何地方，以获得不同的状态代码。
```js
const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)
```

现在，您可以在应用程序的、您希望将状态码添加到staticContext中的 【任何地方】 渲染一个Status。

```js
const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
)

// somewhere else
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/dashboard" component={Dashboard}/>
  <Route component={NotFound}/>
</Switch>
```
Putting it all together
This isn’t a real app, but it shows all of the general pieces you’ll need to put it all together.
### **把它放在一起**
这不是一个真正的应用，但它展示了你需要把所有的通用部分放在一起。

```js
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

createServer((req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
    res.end()
  }
}).listen(3000)
```
And then the client:

```js
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('app'))
```
### **数据加载**

关于数据加载，有很多不同的方法，目前还没有明确的最佳实践，所以我们试图用任何一种方法来组合，而不是针对其中一种或另一种方法。我们相信路由器能够适应你的应用程序的限制。

主要的限制是在渲染之前要加载数据。React Router导出了它在内部使用的`matchPath`静态函数来匹配`locations`和`routes`。您可以在服务器上使用这个函数来帮助确定在渲染之前您的数据依赖项是什么。

The gist of this approach relies on a static route config used to both render your routes and match against before rendering to determine data dependencies.该方法的要点依赖于一个静态路由配置，该配置用于在渲染数据依赖性之前，同时渲染您的路由和匹配。

```js
const routes = [
  { path: '/',
    component: Root,
    loadData: () => getSomeData(),
  },
  // etc.
]
Then use this config to render your routes in the app:

import { routes } from './routes'

const App = () => (
  <Switch>
    {routes.map(route => (
      <Route {...route}/>
    ))}
  </Switch>
)
Then on the server you’d have something like:

import { matchPath } from 'react-router-dom'

// inside a request
const promises = []
// use `some` to imitate `<Switch>` behavior of selecting only
// the first to match
routes.some(route => {
  // use `matchPath` here
  const match = matchPath(req.url, route)
  if (match)
    promises.push(route.loadData(match))
  return match
})

Promise.all(promises).then(data => {
  // do something w/ the data so the client
  // can access it then render the app
})
```

最后，客户端需要获取数据。再说一遍，我们不是在为你的应用程序开一个数据加载模式，但这些是你需要实现的触点。

您可能对我们的React Router配置包感兴趣，以帮助数据加载和使用静态路由配置的服务器渲染。