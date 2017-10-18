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
* initialState  用来初始化state的参数

在实际应用中，我们可以将接收到的服务器数据直接用于初始化仓库

