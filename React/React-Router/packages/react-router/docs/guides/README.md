# 中文中教程

## 安装

```
npm install react-router-dom
```
## 起步

导入路由器相关组件
```js
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const License = () => (
    <div>
        <h2>License</h2>
    </div>
);

const App = () => (
    <Router>
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/license'>License</Link></li>
            </ul>
            <Route path='/' component={Home} exact />
            <Route path='/about' component={About} />
            <Route path='/license' component={License} />
        </div>
    </Router>
);

export default App;
```
运行之后，如下图：

![](/assets/React/react-router_1.png)

v4版的React Router是一款动态路由器，设计思想是将所有的东西都看作是React组件。

`<Router>`是低阶的路由器组件

`<Route>`组件用来将匹配到的UI渲染到这里

`<Link>`组件用来添加导航，在dom中被渲染为a标签



