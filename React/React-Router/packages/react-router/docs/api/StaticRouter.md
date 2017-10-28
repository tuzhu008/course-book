# `<StaticRouter>`

`<StaticRouter>`是一个 [`<Router>`](Router.md)， 它永远不会改变位置.

这在服务器端渲染场景中非常有用，当用户实际上并没有单击，因此位置实际上不会发生变化。因此,名称:静态的。在简单的测试中，当您只需插入一个location并在渲染输出上进行断言时，它也很有用。

下面是一个示例node服务器，它为[`<Redirect>`](Redirect.md)s发送了一个302状态码，或者为其他请求发送常规HTML

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

服务器接收到的URL，在node服务器上可能是`req.url`。

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

一个用来渲染的[单一子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only)。