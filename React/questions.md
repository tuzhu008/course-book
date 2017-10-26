# Questions
## 如何引入CSS?
- 引入css文件
- 使用预处理器
- css模块化

## 用什么做Http请求？
- JQ
- axios
- fetch

## 项目目录结构
```js
shopping-cart
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── public
│   └── index.html 
└── src
    ├── actions //用于存放action文件夹
    │   └── index.js //actions
    ├── api
    │   ├── products.json
    │   └── shop.js
    ├── components //组件文件夹
    │   ├── Cart.js
    │   ├── Cart.spec.js
    ├── constants 
    │   └── ActionTypes.js //action.type
    ├── containers // 容器
    │   ├── App.js // 应用的最顶层组件
    │   ├── CartContainer.js // app下的connect容器,会在里面connect
    │   └── ProductsContainer.js // app下的connect容器,会在里面connect
    │   └── Root.js // 根组件，使用<Provider>组件包裹App组件
    ├── index.js // 入口文件 渲染Root组件
    └── reducers
        ├── cart.js
        ├── cart.spec.js
        ├── index.js // 组合reducers，导出rootReducer
        ├── index.spec.js
        ├── products.js
        └── products.spec.js

```