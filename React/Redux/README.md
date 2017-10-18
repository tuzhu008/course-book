# 简介

---

# 安装

```
npm install --save redux
```

---

# 使用

## 创建仓库

1、导入创建仓库的方法

```
import  { createStore } from 'redux';1、
```

2、创建仓库

```
let store = createStore(reducer, initialState)
```

* reducer  状态管理函数
* initialState  用来初始化state的参数，这个参数是**可选的**，如果省略，创建完成后仓库的state为undefined

在实际应用中，我们可以将接收到的服务器数据直接用于初始化仓库。

但到此为止有一个问题，创建仓库所需的reducer还未可知。

## Reducer

reducer是**绝对纯净**的函数。它用于接受当前的（旧的）state 和 action,然后返回一个新的state。整个Redux state的更新都是靠reduxer返回新的state来完成的。

