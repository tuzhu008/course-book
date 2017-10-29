# match

`match`对象包含关于`<Route path>`如何与URL匹配的信息。`match`对象包含以下属性:

  - `params` - (object) 从URL中解析的键/值对，对应路径的动态字段
  - `isExact` - (boolean) `true` 如果整个URL是完全匹配的(没有尾字符)，则为true，否则为false
  - `path` - (string) 用于匹配的路径模式。 用于构建嵌套的嵌套`<Route>`
  - `url` - (string) URL被匹配到的部分。 用于构建嵌套的嵌套 `<Link>`

您可以在不同的地方访问`match`对象:

- [Route component](./Route.md#component) 中作为 `this.props.match`
- [Route render](./Route.md#render-func) 中作为 `({ match }) => ()`
- [Route children](./Route.md#children-func) 中作为 `({ match }) => ()`
- [withRouter](./withRouter.md) 中作为 `this.props.match`
- [matchPath](./matchPath.md) 中作为 返回值

如果一个Route没有`path`，因此总是匹配，那么您将得到最接近的父匹配。同样适用于`withRouter`。

