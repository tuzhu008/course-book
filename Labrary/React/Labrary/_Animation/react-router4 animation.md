# React-Router 4 与ReactCSSTransitionGroup

先安装[react-router 4](/React/React-Router)
```bash
npm install react-router-dom --save
```

## 方案一：ReactCSSTransitionGroup

安装 [react-addons-css-transition-group](/React/docs/Animation-Add-Ons.md)

```bash
npm install react-addons-css-transition-group --save
```

```js
class Fade extends Component {

    render() {
        return (
            <Route render={({location}) => (
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={5000}
                    transitionLeaveTimeout={5000}
                >
                    {React.cloneElement(this.props.children, {location: location, key: location.key})}
                </ReactCSSTransitionGroup>
            )}/>
        );
    }
}
```
通过将整个`Switch`封装在一个管理`CSSTransitionGroup`的组件中来实现这个效果。`CSSTransitionGroup`需要同时渲染两条`Route`，以便在他们之间使用动。，所以它需要处在更高的层级上。
在上面的代码中，使用了一个始终匹配的Route来渲染`ReactCSSTransitionGroup`组件,用来处理更新被阻止的问题。

```html
const App = () => (
  <Router >
    <div className='App'>
      <Navbar/>
        <Fade>
          <Switch>
            <Route exact path="/home" component={Home}  key='dsada'/>
            <Route exact path="/newest" component={Newest}  key='ddd'/>
          </Switch>
        </Fade>
    </div>
  </Router>
);
```

再来看个直观一些的：
```html
<!--用于包装ReactCSSTransitionGroup，实现效果-->
<Route render={({location}) => (
    <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={5000}
        transitionLeaveTimeout={5000}
    >
        <!--接收最新的location，传递给子组件进行重新渲染，并设置唯一的key-->
        <Switch location={location} key={location.key}>
        <Route exact path="/home" component={Home}  key='dsada'/>
        <Route exact path="/newest" component={Newest}  key='ddd'/>
        </Switch>
    </ReactCSSTransitionGroup>
)}/>
```