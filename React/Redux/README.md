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

```
import  { createStore } from 'redux';
```

2、创建仓库

```
let store = createStore(reducer, initialState)
```

* reducer  状态管理函数
* initialState  用来初始化state的参数，这个参数是**可选的**，如果省略，创建完成后仓库的state为undefined

在实际应用中，我们可以将接收到的服务器数据直接用于初始化仓库。

但到此为止有一个问题，创建仓库所需的reducer还未可知。

---

# Reducer

reducer是**绝对纯净**的函数。它用于接受当前的（旧的）state 和 action,然后返回一个新的state。

## state 状态

state是store中用来存放实际的数据的对象。state不是唯一的，它们以对象树的方式存放在这个单一的store中。

state 有三个API:

* getState\(\)  用来获取状态
* dispatch\(action\)  用来分发action
* subscribe\(listener\)  用来设置监听，它返回一个函数，用来取消监听。

从上面的API可以看到，state是没有setter方法的，因此它不能被

## action

整个Redux state的更新都是靠reduxer返回新的state来完成的。

一个仓库只有一个根reducer

