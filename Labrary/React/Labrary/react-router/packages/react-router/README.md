# react-router

为 [React](https://facebook.github.io/react)而生的声明式路由。

## 安装

使用 [npm](https://www.npmjs.com/):

    $ npm install --save react-router

**注意:** 这个包提供了React Router的核心路由功能，但是您可能不想直接安装它。如果您正在编写一个将在浏览器中运行的应用程序，那么您应该安装`react-router-dom`。类似地，如果您正在编写一个React Native应用程序，则应该安装`react-router-native`。这两种设备都将安装`react-router`作为其依赖项。


然后用像[webpack](https://webpack.github.io/)这样的模块打包器，使用你的其他任何东西:
```js
// 使用 ES6 模块
import { Router, Route, Switch } from 'react-router'

// 使用 CommonJS 模块
var Router = require('react-router').Router
var Route = require('react-router').Route
var Switch = require('react-router').Switch
```

UMD构建也可以使用 [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-router/umd/react-router.min.js"></script>
```

你可以在 `window.ReactRouter`找到文库 .

## 问题

如果你发现了一个bug,请发给我们在[GitHub上的问题跟踪器](https://github.com/ReactTraining/react-router/issues).

## 关于作者

React Router 是由 [React Training](https://reacttraining.com)建立和维护的。
