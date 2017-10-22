# **中文文档**

版本：4.x

## 指南：
* [设计理念](/React/React-Router/docs/guide/Philosophy.md)
* [快速开始](/React/React-Router/docs/guide/QuickStart.md)
* [服务器渲染](/React/React-Router/docs/guide/ServerRendering.md)
* [代码分割](/React/React-Router/docs/guide/CodeSplitting.md)
* [滚动复位](/React/React-Router/docs/guide/ScrollRestoration.md)
* [测试](/React/React-Router/docs/guide/Testing.md)
* [集成Redux](/React/React-Router/docs/guide/ReduxIntegration.md)
* [静态路由](/React/React-Router/docs/guide/StaticRoutes.md)
* [处理更新阻塞](/React/React-Router/docs/guide/DealingWithUpdateBlocking.md)

## [API](./api)
* `<BrowserRouter>`
    - basename: string
    - getUserConfirmation: func
    - forceRefresh: bool
    - keyLength: number
    - children: node
* `<HashRouter>`
    - basename: string
    - getUserConfirmation: func
    - hashType: string
    - children: node
* `<Link>`
    - to: string
    - to: object
    - replace: bool
* `<NavLink>`
    - activeClassName: string
    - activeStyle: object
    - exact: bool
    - strict: bool
    - isActive: func
    - location: object
* `<Prompt>`
* `<MemoryRouter>`
    - initialEntries: array
    - initialIndex: number
    - getUserConfirmation: func
    - keyLength: number
    - children: node
* `<Redirect>`
    - to: string
    - to: object
    - push: bool
    - from: string
* `<Route>`
    - Route render methods
    - Route props
    - component
    - render: func
    - children: func
    - path: string
    - exact: bool
    - strict: bool
    - location: object
* `<Router>`
    - history: object
    - children: node
* `<StaticRouter>`
    - basename: string
    - location: string
    - location: object
    - context: object
    - children: node
* `<Switch>`
    - Switch props
* `history`
    - history is mutable
* `location`
* `match`
* `matchPath`
    - pathname
    - props
* `withRouter`
    - Component.WrappedComponent
    - wrappedComponentRef: func