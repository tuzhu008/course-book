## **快速开始**

开始一个React网络应用最简单的方法是使用一个叫做[Create React App](https://github.com/facebookincubator/create-react-app)的工具，一个有大量社区帮助的Facebook项目。

如果你还没有安装，你可以先安装一个create-react-app，然后再用它来做一个新的项目。

```
npm install -g create-react-app
create-react-app demo-app
cd demo-app
```
### **安装**
React Router DOM [被发布到npm](https://www.npmjs.com/package/react-router-dom)，所以你可以用 npm 或 [yarn](https://yarnpkg.com/zh-Hans/) 来安装它。
```
yarn add react-router-dom
// or, if you're not using yarn
npm install react-router-dom
```
现在你可以复制/粘贴任何一个例子到`src/app.js`。这是最基本的一个:
```js
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
export default BasicExample
```
现在你已经准备好修改了。路由快乐!