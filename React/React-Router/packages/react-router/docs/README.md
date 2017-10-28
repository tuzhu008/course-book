# **中文文档**

版本：4.x

## [指南](./guides)：
* [设计理念](./guides/Philosophy.md)
* [快速开始](./guides/QuickStart.md)
* [服务器渲染](./guides/ServerRendering.md)
* [代码分割](./guides/CodeSplitting.md)
* [滚动复位](./guides/ScrollRestoration.md)
* [测试](./guides/Testing.md)
* [集成Redux](./guides/ReduxIntegration.md)
* [静态路由](./guides/StaticRoutes.md)
* [处理更新阻塞](./guides/DealingWithUpdateBlocking.md)

## [API](./api)
* [`<BrowserRouter>`](./api/browserrouter.md)
    - basename: string
    - getUserConfirmation: func
    - forceRefresh: bool
    - keyLength: number
    - children: node
* [`<HashRouter>`](./api/hashrouter.md)
    - basename: string
    - getUserConfirmation: func
    - hashType: string
    - children: node
* [`<Link>`](./api/link.md)
    - to: string
    - to: object
    - replace: bool
* [`<NavLink>`](./api/navlink.md)
    - activeClassName: string
    - activeStyle: object
    - exact: bool
    - strict: bool
    - isActive: func
    - location: object
* [`<Prompt>`](./api/prompt.md)
* [`<MemoryRouter>`](./api/memoryrouter.md)
    - initialEntries: array
    - initialIndex: number
    - getUserConfirmation: func
    - keyLength: number
    - children: node
* [`<Redirect>`](./api/redirect.md)
    - to: string
    - to: object
    - push: bool
    - from: string
* [`<Route>`](./api/route.md)
    - Route render methods
    - Route props
    - component
    - render: func
    - children: func
    - path: string
    - exact: bool
    - strict: bool
    - location: object
* [`<Router>`](./api/router.md)
    - history: object
    - children: node
* [`<StaticRouter>`](./api/staticrouter.md)
    - basename: string
    - location: string
    - location: object
    - context: object
    - children: node
* [`<Switch>`](./api/switch.md)
    - Switch props
* [`history`](./api/history.md)
    - history is mutable
* [`location`](./api/location.md)
* [`match`](./api/match.md)
* [`matchPath`](./api/matchpath.md)
    - pathname
    - props
* [`withRouter`](./api/withrouter.md)
    - Component.WrappedComponent
    - wrappedComponentRef: func