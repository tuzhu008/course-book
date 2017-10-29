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


它也存在于`history.location`，但你不应该使用它，因为它是可变的。您可以在[history](./history.md)中读到更多关于它的信息。


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

// 但你可以使用一个location来代替
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

