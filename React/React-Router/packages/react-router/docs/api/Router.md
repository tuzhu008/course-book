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
