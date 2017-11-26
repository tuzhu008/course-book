## **代码分割**

网络的一大特点是，我们不需要让访问者在他们使用之前下载整个应用程序。你可以把代码分解成递增地下载应用程序，虽然还有其他的工具来完成这个工作，但是我们会在这个指南中使用Webpack和bundle加载器。

这是你现在使用的网站代码分裂的方式：`<Bundle>`。最值得注意的是，路由器实际上与这个没有任何关系。当你“在某条路由”时，这仅仅意味着“你正在渲染一个组件”。因此，当用户导航到它时，我们可以创建一个加载动态导入的组件。这种方法适用于你的应用程序的任何部分。

```js
import loadSomething from 'bundle-loader?lazy!./Something'

<Bundle load={loadSomething}>
  {(mod) => (
    // do something w/ the module
  )}
</Bundle>
```
如果这个模块是一个组件，我们可以在这里渲染它:
```
<Bundle load={loadSomething}>
  {(Comp) => (Comp
    ? <Comp/>
    : <Loading/>
  )}
</Bundle>
```
这个组件使用一个名为`load`的prop，我们从webpack 包加载器中获得。我们马上就会讲到为什么要用这个。当组件装载或获得一个新的load prop时，它将调用load，然后将返回值放置在state中。最后，它在render中和模块一起返回。

```js
import React, { Component } from 'react'

class Bundle extends Component {
  state = {
    // "module"的简称， 在js中它是一个关键字，因此简写为“mod”
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default Bundle
```
您会注意到，在这个模块被获取到之前，任何renders上，render会返回一个空的`state.mod`。这很重要，所以你可以向用户表明我们在等着什么。

**Why bundle loader, and not import()?**

我们已经使用它很多年了，它还在继续工作，而TC39继续提供官方动态导入。最新的建议是[`import()`](https://github.com/tc39/proposal-dynamic-import)，我们可以调整我们的`Bundle`组件以使用`import()`: 

```
<Bundle load={() => import('./something')}>
  {(mod) => ()}
</Bundle>
```
包加载器的另一个巨大好处是，它第二次以同步方式回调，这可以防止每次访问代码分割屏幕时刷新这个正在加载的屏幕。

不管您导入的方式是什么，它的思想都是一样的:当它渲染时，处理代码加载一个组件。现在，您所做的只是在您想要动态加载代码的地方渲染一个`<Bundle>`。

### **渲染完成后加载**

当你着手处理一个新的屏幕时，`Bundle`组件非常适合加载，但是在后台预加载应用程序的其他部分也是很有好处的。

```js
import loadAbout from 'bundle-loader?lazy!./loadAbout'
import loadDashboard from 'bundle-loader?lazy!./loadDashboard'

// 组件加载模块进行初始访问
const About = (props) => (
  <Bundle load={loadAbout}>
    {(About) => <About {...props}/>}
  </Bundle>
)

const Dashboard = (props) => (
  <Bundle load={loadDashboard}>
    {(Dashboard) => <Dashboard {...props}/>}
  </Bundle>
)

class App extends React.Component {
  componentDidMount() {
    // preloads the rest
    loadAbout(() => {})
    loadDashboard(() => {})
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Route path="/about" component={About}/>
        <Route path="/dashboard" component={Dashboard}/>
      </div>
    )
  }
}
```

你的应用程序的加载时间和数量是你自己的决定。它不需要与特定的路由联系起来。也许你只是想在用户不活跃的时候才去做，也许只有当他们访问某个路由时，也许你想在初始渲染之后预加载应用程序的其他部分:
```
ReactDOM.render(<App/>, preloadTheRestOfTheApp)
```

### **代码分割 + 服务器渲染**

我们尝试了几次失败了。我们学到了什么:

1. 在服务器上需要同步模块解析，这样就可以在初始呈现中获得这些包。
1. 在渲染之前，您需要加载客户端中涉及到的服务器渲染的所有包，以便客户端渲染结果与服务器渲染结果相同。(最棘手的部分，我认为这是可能的，但这是我放弃的地方。)
1. 你需要对客户端应用程序的其余部分进行异步解析。

我们确定google在没有服务器渲染的情况下为我们的站点提供了足够的索引，所以我们放弃了它，转而支持代码分割+服务工作者缓存。祝那些尝试服务器渲染，代码分割 应用的人获得成功。