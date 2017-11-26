## **Scroll 复位**

在早期版本的“React Router”中，我们为滚动复位提供了开箱即用的支持，从那时起人们就一直在要求它。希望这个文档能够帮助您获得滚动条和路由所需的内容。

浏览器开始时history.pushState来处理历史上的滚动复位。他们用同样的方式处理自己的问题，用标准的浏览器导航来处理。它已经在chrome中运行了，它真的很棒。[这是滚动复位的规范](https://majido.github.io/scroll-restoration-proposal/history-based-api.html#web-idl)。

因为浏览器已经开始处理“默认情况”，而且应用程序有不同的滚动需求(比如这个网站！)，我们不使用默认的滚动管理。这个指南可以帮助你实现任何你想要的滚动需求。

### **滚动到顶部**

大多数时候，你需要的是“滚动到顶部”，因为你有一个很长的内容页，当你导航到它时，它会一直滚动下去。使用一个<ScrollToTop>组件来处理是很简单的。它每次导航都将向上滚动窗口。一定要把它包在 `withRouter`中，让它可以访问路由器的props:

```js
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
```
然后将它渲染在你的应用程序的顶部，但是在路由器下面
```js
const App = () => (
  <Router>
    <ScrollToTop>
      <App/>
    </ScrollToTop>
  </Router>
)

// 或者只是把它呈现在你想要的任何地方，但只是一个 :)
<ScrollToTop/>
```
如果你有一个连接到路由器的标签界面，那么你可能不希望在切换选项卡时滚动到顶部。相反，在您需要的特定位置上，如何使用`<ScrollToTopOnMount>`?
```js
class ScrollToTopOnMount extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}

class LongContent extends Component {
  render() {
    <div>
      <ScrollToTopOnMount/>
      <h1>Here is my long content page</h1>
    </div>
  }
}

// somewhere else
<Route path="/long-content" component={LongContent}/>
```
这里，当路径匹配到长内容时，会渲染长内容组件，这时候会渲染`<ScrollToTopOnMount/>`,它的声明周期函数就会被执行，就会滚动到顶部了。
### **通用解决方案**

对于一般的解决方案(以及浏览器开始实现的功能)，我们将讨论两件事:

- 在导航栏上滚动，这样你就不会启动一个新的屏幕滚动到底部

- 恢复窗口的滚动位置，并在“后退”和“前进”的点击(但不是链接点击！)时溢出元素（overflow elements）

我们一度想要发布一个通用的API。下面是我们的方向:
```js
<Router>
  <ScrollRestoration>
    <div>
      <h1>App</h1>

      <RestoredScroll id="bunny">
        <div style={{ height: '200px', overflow: 'auto' }}>
          I will overflow
        </div>
      </RestoredScroll>
    </div>
  </ScrollRestoration>
</Router>
```
首先，`ScrollRestoration`会在导航时滚动窗口。其次，它会使用`location.key`保存窗口滚动位置和`RestoredScroll`组件的滚动位置到`sessionStorage`。然后，当`ScrollRestoration`或`RestoredScroll`组件挂载时，它们可以从`sessionsStorage`中查找它们的位置。

对我来说，最棘手的是定义一个“选择退出”的API，在我不想让窗口滚动被管理的时候可以退出。例如，如果您在页面内容中有一些浮动的选项卡导航，那么您可能不希望滚动到顶部(这些选项卡可能会从视图中滚动)。

当我现在得知chrome为我们管理滚动位置,我意识到不同的应用程序有不同的滚动需求,我有点失去了信念,那些我们需要提供一些东西尤其是当人们只是想滚动到顶部(你看到是自己直接添加到您的应用程序)。

基于这一点，我们不再有足够的强烈的感觉来完成这项工作(就像你，我们的时间有限！)但是，我们愿意帮助任何想要实现通用解决方案的人。


