## **Redux 集成**

Redux是反应生态系统的重要组成部分。我们想让React Router和Redux的集成尽可能的无缝给想要同时使用两者的人来说。

### **被阻止的更新**

般来说，React Router和Redux能够很好的一起工作。有时，应用程序可以有一个组件在位置改变时不更新(子路由或活动导航链接不更新)。

如果发生这样的情况:

该组件通过connect()(Comp)连接到redux。该组件不是一个“route 组件”，也就是说，它不是这样渲染的: 
```
<Route component={SomeConnectedThing}/>
```
问题是Redux实现了`shouldComponentUpdate`，没有任何迹象表明，如果它没有收到来自路由器的props，一切就会发生变化。这是很容易解决的。找到连connect组件的地方，并将其封装在 `withRouter`中。


```js
// before
export default connect(mapStateToProps)(Something)

// after
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(Something))
```
### **深度集成**
有些人想:

* 使用store同步路由数据，并从store中访问
* 能够通过dispatch actions来进行导航
* 在Redux devtools中支持路由更改的时间旅行调试


所有这些都需要更深层次的整合。请注意，您不需要这种深度集成:


* 路由更改对时间旅行调试来说可能有问题
* 你可以将history对象传递给route组件来进行你的操作和当行，而不是dispatch actions来导航
* 路由数据已经是你的大部分组件的属性，不管它来自于store还是路由器都不会改变你的组件的代码。


然而，我们知道有些人对此有强烈的感觉，所以我们想要提供最好的深度整合方案。作为React Router的第4版，React Router Redux包是项目的一部分。请参阅它进行深度集成。

[React Router Redux](https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux)