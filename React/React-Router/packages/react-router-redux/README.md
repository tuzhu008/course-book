# react-router-redux

[![npm version](https://img.shields.io/npm/v/react-router-redux/next.svg?style=flat-square)](https://www.npmjs.com/package/react-router-redux)  [![npm downloads](https://img.shields.io/npm/dm/react-router-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-router-redux) [![build status](https://img.shields.io/travis/reactjs/react-router-redux/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-router-redux)

> **保持你的state与路由器同步** :sparkles:

这是一个测试版软件，它需要:

1. 一个工作示例
2. 有些人会去尝试，发现bugs
3. 使用devtools的策略
   - (这个问题描述了我们之前看到的即将到来的不同的方法)
   
## 版本


这个(react-router-redux 5.x)是用来与react-router 4.x一起使用的react-router-redux版本。
react-router 2.x and 3.x的用户想用react-router-redux的话，请参考[这个仓库库](https://github.com/reactjs/react-router-redux)

## 安装

```
npm install --save react-router-redux@next
npm install --save history
```

## 使用方法

以下是它的基本原理:

```js
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers' // 你保存在其他地方的reducers

// 创建一个您选择的history(在本例中我们使用的是浏览器历史)
const history = createHistory()

// 构建用于拦截和dispatch导航action的中间件
const middleware = routerMiddleware(history)

// 在`router`的关键字上添加reducer到store
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

// 现在您可以在任何地方dispatch导航操作了！
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter将从Provider自动使用store */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
```
