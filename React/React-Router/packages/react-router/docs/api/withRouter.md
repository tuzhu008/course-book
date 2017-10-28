# withRouter

您可以通过`withRouter`高阶组件访问[`history`](./history.md)对象的属性和最近的[`<Route>`](./Route.md)的 [`match`](./match.md)。`withRouter`将在它每次渲染时将已经更新的`match`、`location`和`history`属性传递到包裹组件。

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

`withRouter`不订阅location 改变，就像React Redux的`connect`不订阅状态改变一样。而不是在位置更改从`<Router>`组件中传播出来之后，重新渲染。这意味着除非父组件重新渲染，否则`withRouter`**不会**在路由转换上重新渲染。如果您正在使用`withRouter`从靠`shouldComponentUpdate`被屏蔽来阻止更新，那么`withRouter`将会包裹实现了`shouldComponentUpdate`组件，这是很重要的。例如，在使用Redux时:

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

参阅 [本指南](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md) 获取更多信息。[中文指南](../docs/guides/blocked-updates.md)。

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

将作为`ref`属性传递给包裹组件的一个函数。

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
