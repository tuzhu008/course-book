# `<Switch>`

`<Switch>`渲染第一个子[`<Route>`](Route.md)或与该位置匹配的[`<Redirect>`](Redirect.md)
**这和使用一堆`<Route>`有什么不一样呢?**

`<Switch>` 独特之处在于它只专门渲染一条路由。与之相反的是，未被`<Switch>`包裹情况下，每个匹配location的`<Route>`都会渲染:

```js
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

如果URL是 `/about`, 然后 `<About>`, `<User>`, 和 `<NoMatch>`都将被渲染，因为它们与路径相匹配。这是通过设计实现的，让我们可以有多种方式可以组合多个`<Route>`到我们的应用程序中，比如 侧边栏和面包屑导航，bootstrp选项卡，等等。

然而，偶尔，我们只需要选择一个`<Route>` 来渲染。如果我们在`/about`，我们不想匹配`/:user`(或显示我们的“404”页面)。`Switch`可以让我们办到：


```js
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

现在，如果我们在`/about`，`<Switch>`将开始查找匹配的`<Route>`，`<Route path="/about"/>`被匹配到， `<Switch>`会 **停止查找**并渲染`<About>`。类似地，如果我们在`/michael`，那么`<User>`将会被渲染。

这对于动画过渡也很有用，因为匹配到的`<Route>`将被渲染到与前一个相同的位置。

```html
<Fade>
  <Switch>
    {/* 这里只会有一个child */}
    <Route/>
    <Route/>
  </Switch>
</Fade>

<Fade>
  <Route/>
  <Route/>
  {/* 这里总会有两个孩子，一个可能会渲染为空值，从而让转换变得更麻烦 */}
</Fade>
```
# Switch props

## location: object

[`location`](location.md)对象被**用来匹配子元素**，而不是当前的历史位置(通常是当前的浏览器URL)。

## children: node

`<Switch>`的所有子元素应该是`<Route>`或者`<Redirect>`。
 只有第一个匹配当前location的子元素将被渲染。

`<Route>`是用它们`path`属性来匹配的。`<Redirect>`使用他们的`from`属性来匹配的。没有`path`的`<Route>`和没有`form`的`<Redirect>`会始终匹配当前位置。

当你将一个`<Redirect>`包含在`<Switch>`中的时候，它可以使用任意一个`<Route>`的loaction匹配属性：`path`、`exact`和`strict`。如果一个`location`属性被赋予到`<Switch>`上，它将覆盖匹配到的子元素的`location`属性。

```html
<Switch>
  <Route exact path="/" component={Home}/>

  <Route path="/users" component={Users}/>
  <Redirect from="/accounts" to="/users"/>

  <Route component={NoMatch}/>
</Switch>
```
