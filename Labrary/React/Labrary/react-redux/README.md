React Redux中文文档
=========================

React与 [Redux](https://github.com/reactjs/redux). 的官方绑定方案

有效、灵活.

[![build status](https://img.shields.io/travis/reactjs/react-redux/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-redux) [![npm version](https://img.shields.io/npm/v/react-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-redux)
[![npm downloads](https://img.shields.io/npm/dm/react-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-redux)
[![redux channel on slack](https://img.shields.io/badge/slack-redux@reactiflux-61DAFB.svg?style=flat-square)](http://www.reactiflux.com)


## 安装


React Redux 需要 **React 0.14 或者更高版本.**

```
npm install --save react-redux
```

假设您使用的是 [npm](http://npmjs.com/) 包管理器，其中有一个模块打包器，比如[Webpack](https://webpack.js.org/) 或者 [Browserify](http://browserify.org/) 以使用[CommonJS 模块](http://webpack.github.io/docs/commonjs.html)。


如果您还没有使用[npm](http://npmjs.com/)或现代模块打包器，并且更喜欢使用一个单文件[UMD](https://github.com/umdjs/umd)构建，使您可以使用一个全局对象，那么您可以从[cdnjs](https://cdnjs.com/libraries/react-redux)中获取一个预构建版本。对于任何严肃的应用程序，我们都**不推荐**这种方法，因为大多数与Redux互补的库只在[npm](http://npmjs.com/)上可用。

## React Native

从React Native 0.18起，React Redux 5.x可以与React Native一起工作。如果你有任何关于React Redux 5.x在React Native上问题，运行`npm ls react`并你没有将 React 重复安装到你的`node_modules`。我们建议您最好使用`npm@3.x`来避免这些问题。

如果您使用的是较早版本的React Native，由于 [这个问题](https://github.com/facebook/react-native/issues/2985)，则需要继续使用[React Redux 3.x 版本 和文档](https://github.com/reactjs/react-redux/tree/v3.1.0) 

## 文档

- [Redux: 搭配React](http://www.redux.org.cn/docs/basics/UsageWithReact.html)
- [API](docs/api.md#api)
  - [`<Provider store>`](docs/api.md#provider-store)
  - [`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`](docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
- [故障排除](docs/troubleshooting.md#troubleshooting)

## 它是如何工作的?

我们在 [这个源代码集(需要科学上网)](https://www.youtube.com/watch?v=VJ38wSFbM3A).  中深入研究了React Redux是如何工作的。
欢迎加入!

## 许可证

MIT
