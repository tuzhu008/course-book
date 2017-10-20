# 简介

---

# 安装

```
npm install --save redux
```

---

# 创建store \(仓库\)

store是一个对象，一个应用中只能有唯一一个store。里面存放了所有的数据。

1、导入创建仓库的方法

```javascript
import  { createStore } from 'redux';
```

2、创建仓库

```javascript
let store = createStore(rootReducer, initialState)
```

* `rootReducer`  状态管理函数
* `initialState`  用来初始化state的参数，这个参数是**可选的**，如果省略，创建完成后仓库的state为`undefined`

在实际应用中，我们可以将接收到的服务器数据直接用于初始化仓库。

但到此为止有一个问题，创建仓库所需的`reducer`还未可知。

---

# Reducer

reducer是**绝对纯净**的函数。它用于接受当前的（旧的）`state` 和 `action`,然后返回一个新的`state`。

```javascript
function (state, action) {
    //doSomething
    return newState;
}
```

被称为reducer是因为其内部采用了[Array.prototype.reduce\(\)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)方法。

Redux中，state的更新都是靠reduxer中返回新的state来完成的。

一个仓库只有一个根reducer，根reducer可以根据需要拆分成更小的reducer。只要明白了reducer存在的原因——更新state,就明白了拆分reducer的原因也在此——state的拆分。**因为reducer只负责管理全局state中的一部分，每个reducer的**`state`**参数都是不同的，分别对应它管理的那一部分state数据**。

切记，不要在reducer里执行如下操作：

* 修改传入参数
* 执行有副作用的操作，如 API 请求和路由跳转
* 调用非纯函数，如`Date.now()`或`Math.random()`

上面的reducer函数还可以使用ES6的默认值语法来优化：

```javascript
function (state = defualtSate, action) {
    //doSomething
    return newState;
}
```

当reducer被调用时，若传入的`state === undefined`，那么state就会被赋予默认值。注意：**是全等。**

## redux自上而下调用reducer吗？

## state 状态

state是store中用来存放实际的数据。它可以是基本的数据类型，也可以是对象、数组、甚至是类似于[Immutable.js](http://facebook.github.io/immutable-js/)生成的数据结构。

state不是唯一的，它们以对象树的方式存放在这个单一的store中。

state 有三个API:

* getState\(\)  用来获取状态
* dispatch\(action\)  用来分发action
* subscribe\(listener\)  用来设置监听，它返回一个函数，用来取消监听。

从上面的API可以看到，state是没有setter方法的，因此它不能被直接修改。想要修改state只能返回一个新的state。

从控制台打印store:

![](/assets/QQ20171019-083843@2x.png)

## action

action是把数据从应用传到store的有效载荷，**是store数据的唯一来源**。action中包含了state更新的一切信息。

action只是一个普通的对象。基本结构：

```javascript
{
  type: 'ADD_TODO',
  text: 'I wanna go to PP'
}
```

action一定含有一个值为**字符串**的type属性，这个属性用来唯一标识了一个action,也表示将要执行的操作。

除了`type`属性外，action对象的结构可以自由增添。**但我们应该尽量减少在action中传递的数据**。

我们常把action的`type`使用`const`声明为一个常量。虽然这样做并不是必须的，但这个一个好的实践，有助于减少错误和便于团队开发。

```javascript
const ADD_TODO = 'ADD_TODO';
{
  type: ADD_TODO,
  text: 'I wanna go to PP'
}
```

在实际的项目中，这些action可能非常复杂和繁多，因此非常有必要对它进行管理。我们可以将`type`的常量声明全部都提取到一个单独的`actionTypes.js`文件中：

```javascript
export const ADD_TODO = 'ADD_TODO';

export const DELETE_TODO = 'DELETE_TODO';
```

在需要使用到`type`的文件内

```javascript
import * as types from './actionTypes'; // 这里的目录根据实际存放位置配置
```

修改之前的`actions.js`文件：

```javascript
import * as types from './actionTypes';

{
  type: types.ADD_TODO,
  text: 'I wanna go to PP'
}
```

由于action中包含了更新state所需数据，而这些数据不是固定的。比我我们要修改一个用户的昵称，这个昵称可以被随时修改，如果我们将action写死的话，这个昵称就无法改变了。因此我们想要动态生成这个action，函数这时候就排上用场了。这个函数被称为**actionc创建函数。**

```javascript
import * as types from './actionTypes';

function addTodo (text) {
    return {
      type: types.ADD_TODO,
      text // text: text的简写
    };
}
```

如此，我们每次只需要调用`addTodo(text)`就可以得到一个新的action。

---

# 触发更新

创建好了store，如何才能触发这些更新呢？**使用store的**`dispatch`**一个action**。

```javascript
store.dispatch(addTodo('I wanna go to bed'));
```

改变 store 内 state 的**惟一途径**是对它 dispatch 一个action。

# 数据流

Redux保持单向数据流，并且是严格。

Redux数据的生命周期：  
1. 调用 store.dispatch\(action\)  
1. Redux store 传入的 reducer 函数  
1. 根 reducer 把子 reducer 输出合并成一个单一的 state 树  
1. Redux store 保存了根 reducer 返回的完整 state 树

# 引入React项目

安装react-redux绑定库

```javascript
npm install --save react-redux
```

阅读更多关于[react-redux](https://github.com/tuzhu008/course-book/tree/master/React/react-redux)信息

## 引入容器`Provider`

`Provider`让Redux store可用,以使connect()在下面的组件层次结构中调用。

我们在应用的入口文件`index.js`中获取react-redux库的 `Provider`

```javascript
import { Provider } from 'react-redux';
```

`Provider`是一个容器组件

导入创建成功的store

```javascript
import store from './store/index';
```

然后使用`Provider`封装App组件：

```javascript
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
`index.js`如：
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/index';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

```
## `connect`

`connect`用来将一个React组件连接到React store。它返回一个新的,已连接的新组件。

引入`connect`
```javascript
import { connect } from 'react-redux';
```
