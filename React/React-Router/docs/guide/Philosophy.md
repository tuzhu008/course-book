## **设计理念**

本指南的目的是解释当使用React Router时的思维模式。我们称它为“动态路由”，这与您可能更熟悉的“静态路由”非常不同。

### **静态路由**

如果您使用过Rails、Express、Ember、Angular等，那么您使用的是静态路由。在这些框架中，在进行任何渲染之前，您将您的路由声明为应用程序初始化的一部分。React Router v4 之前也是静态的(主要是)。让我们来看看如何配置express中的路由:
```js
app.get('/', handleIndex)
app.get('/invoices', handleInvoices)
app.get('/invoices/:id', handleInvoice)
app.get('/invoices/:id/edit', handleInvoiceEdit)

app.listen()
```
请注意，在应用程序监听之前如何声明路由。我们使用的客户端路由器是相似的。在Angular中，你先声明你的路由，然后在渲染前将它们导入到顶级的AppModule：

```js
const appRoutes: Routes = [
  { path: 'crisis-center',
    component: CrisisListComponent
  },
  { path: 'hero/:id',
    component: HeroDetailComponent
  },
  { path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})

export class AppModule { }

```

Ember有一条传统的路由。js文件，构建为您读取和导入到应用程序。同样，这是在你的应用渲染之前发生的。
```js
Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('rentals', function() {
    this.route('show', { path: '/:rental_id' });
  });
});

export default Router
```

尽管API不同，但它们都共享“静态路由”的模型。React Router在v4以前也一直引入这一模型。要想成功地使用React Router，你需要忘记所有这些！

### **背景**

坦率地说，我们对我们在React Router v2上做出的方向感到非常沮丧。我们(Michael和Ryan)感觉受到API的限制，认识到我们正在重新实现部分React(生命周期，等等)，并且它与React的组合UI的思维模式不一致。

我们在一家酒店的走廊里走着，讨论如何处理这件事。我们互相询问:“如果我们用我们在讲习班里教授的模式来构建路由器，会是什么样子?”

在开发中这只是一个时间的问题，我们有了一个验证概念，我们知道这就是我们想要的路由器的特性。我们最终得到的API并不是React的“outside”，它是由其他的React组合而成的API，或者是自然地形成的。我们认为你会喜欢的。

### **动态路由**

当我们说动态路由时，我们的意思是，路由选择发生在你的应用正在渲染的时候，而不是在一个正在运行的应用程序之外的配置或惯例。这意味着几乎所有的东西都是在React Router中的一个组件。下面是对API的60秒回顾，看看它是如何工作的:

首先，为目标环境抓取一个路由器组件，然后将它渲染在你的应用程序的顶部。

```js
// react-native
import { NativeRouter } from 'react-router-native'

// react-dom (what we'll use here)
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), el)
Next, grab the link component to link to a new location:const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
)
```
最后，当用户访问`/dashboard`时，渲染一个路由来显示UI。
```js
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard}/>
    </div>
  </div>
)
```
该路径将渲染 `<Dashboard {...props}/> `。props是一些路由器详细的东西，看起来像是`{ match, location, history }`。如果用户不在`/dashboard`，则该路径将渲染null。差不多就是这样了。
### **嵌套路由**

许多路由器都有一些“嵌套路由”的概念。如果您使用过v4之前版本的React Router，您会知道它也有！当您从静态路由配置到动态的、已渲染的路由时，您如何“嵌套路由”?那么，如何嵌套一个`div`呢?


 ```js
 const App = () => (
  <BrowserRouter>
    {/* 这里是一个div */}
    <div>
      {/* 这里时一个路由 */}
      <Route path="/tacos" component={Tacos}/>
    </div>
  </BrowserRouter>
)

//当路由匹配到 `/tacos`， 渲染这个组件
const Tacos  = ({ match }) => (
  // 这里是一个嵌套的div
  <div>
    {/* 这里时一个嵌套路由,
        match.url 帮我们制作一个相对路径 */}
    <Route
      path={match.url + '/carnitas'}
      component={Carnitas}
    />
  </div>
)

```
看到路由器没有“嵌套”API了吗?路由只是一个组件，就像div一样，为了嵌套路由或div，你只是……去做吧。

Let’s get trickier.

### **响应式路由**

考虑一个用户导航到`/invoices`。你的应用程序可以适应不同的屏幕大小，它们有一个狭窄的视图，因此你只需要向他们显示`invoices`列表和一个`invoice dashboard`的链接。他们可以从它们导航到更深处。

```
Small Screen
url: /invoices

+----------------------+
|                      |
|      Dashboard       |
|                      |
+----------------------+
|                      |
|      Invoice 01      |
|                      |
+----------------------+
|                      |
|      Invoice 02      |
|                      |
+----------------------+
|                      |
|      Invoice 03      |
|                      |
+----------------------+
|                      |
|      Invoice 04      |
|                      |
+----------------------+
```
在更大的屏幕上，我们想要显示一个主细节视图，导航栏在左边，`dashboard`或特定的`invoices`显示在右边。
```
Large Screen
url: /invoices/dashboard

+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |   Unpaid:             5   |
+----------------------+                           |
|                      |   Balance:   $53,543.00   |
|      Invoice 01      |                           |
|                      |   Past Due:           2   |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |                           |
|                      |   +-------------------+   |
+----------------------+   |                   |   |
|                      |   |  +    +     +     |   |
|      Invoice 03      |   |  | +  |     |     |   |
|                      |   |  | |  |  +  |  +  |   |
+----------------------+   |  | |  |  |  |  |  |   |
|                      |   +--+-+--+--+--+--+--+   |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```
Now pause for a minute and think about the `/invoices` url for both screen sizes. Is it even a valid route for a large screen? What should we put on the right side?现在暂停一分钟，考虑一下两个屏幕大小的`/invoices`url。它甚至是一个大屏幕的有效路径吗?我们应该把什么放在右边呢?

```
Large Screen
url: /invoices
+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 01      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |             ???           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 03      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```
在大屏幕上，`/invoices`不是一条有效的路线，但是在一个小屏幕上是！为了让事情变得更有趣，你可以考虑一个人拥有巨大的电话。他们可以在纵向定向中查看`/invoices`，然后将手机旋转到横向。突然之间，我们有了足够的空间来显示主细节UI，所以您应该马上**重定向**！React Router之前的版本的静态路由并没有一个可组合的答案来应对这个。然而，当路由是动态的时候，您可以声明地编写这个功能。如果您开始将路由看作是UI，而不是静态配置，那么您的直觉将会引导您执行以下代码:

```js
const App = () => (
  <AppLayout>
    <Route path="/invoices" component={Invoices}/>
  </AppLayout>
)

const Invoices = () => (
  <Layout>

    {/* 始终显示这个导航 */}
    <InvoicesNav/>

    <Media query={PRETTY_SMALL}>
      {screenIsSmall => screenIsSmall
        // 小屏幕没有重定向
        ? <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard}/>
            <Route path="/invoices/:id" component={Invoice}/>
          </Switch>
        // 大屏幕执行：
        : <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard}/>
            <Route path="/invoices/:id" component={Invoice}/>
            <Redirect from="/invoices" to="/invoices/dashboard"/>
          </Switch>
      }
    </Media>
  </Layout>
)
```

当用户将手机从竖屏转到横屏时，这段代码将自动重定向到dashboard。根据用户手中移动设备的动态特性，有效路由的设置会发生变化。

这只是一个例子。我们还可以讨论很多其他的问题，但我们会用这个建议来**总结**:为了让你的直觉与反应路由器一致，考虑组件，而不是静态路由。考虑一下如何用响应的声明性可组合性来解决问题，因为几乎每一个“React Router问题”都可能是一个“React问题”。