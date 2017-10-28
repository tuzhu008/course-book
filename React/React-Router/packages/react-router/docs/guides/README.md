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
}

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

const Licence = () => (
    <div>
        <h2>Licence</h2>
    </div>
);

const App = () => (
    <Router>
        <div>
            <ul>
                <li><Link to=''></Link></li>
                <li><Link></Link></li>
                <li><Link></Link></li>
            </ul>
        </div>
    </Router>
);
```




