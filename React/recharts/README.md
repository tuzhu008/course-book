# Recharts

[![Rocket.Chat](https://demo.rocket.chat/images/join-chat.svg)](https://demo.rocket.chat/channel/recharts)
[![Build Status](https://travis-ci.org/recharts/recharts.svg)](https://travis-ci.org/recharts/recharts)
[![Coverage Status](https://coveralls.io/repos/recharts/recharts/badge.svg?branch=master&service=github)](https://coveralls.io/github/recharts/recharts?branch=master)
[![npm version](https://badge.fury.io/js/recharts.svg)](http://badge.fury.io/js/recharts)
[![npm downloads](https://img.shields.io/npm/dm/recharts.svg?style=flat-square)](https://www.npmjs.com/package/recharts)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/recharts/recharts/raw/master/LICENSE)

## 简介

Recharts 是使用[React](https://facebook.github.io/react/) 和 [D3](http://d3js.org)**重新定义**的图表库。
这个库的主要目的是帮助您在不需要任何痛苦的情况下，在React应用程序中编写图表。Recharts的主要原则是:

1. **Simply** 使用React组件进行部署
1. **Native** 支持SVG, 轻量级依赖于一些D3子模块
1. **Declarative** 组件, 图表组件纯粹是演示性的

## 例如

```jsx
<LineChart
  width={400}
  height={400}
  data={data}
  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
>
  <XAxis dataKey="name" />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
  <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
</LineChart>
```

所有Recharts的组件都是明确分离的。line线图由x轴、工具提示、网格和线项组成，每一个都是独立的反应组件。组件的清晰分离和组成是一个原理图。lineChart是由 x 轴, 工具提示, 网格, 和 行项目, 以及每个项构成的，他们都是一个独立的React组件。组件的清晰地分离和组合是Recharts遵循的一个原则。

## 安装

### npm

NPM是开始使用Recharts最容易和最快速的方法。在构建单页应用程序(spa)时，它也是推荐的安装方法。它很好地与一个常见的模块打包器一起使用，例如Webpack。


```sh
# 最新稳定
$ npm install recharts
```


### umd

UMD构建也可以在unpkg.com上找到:


```html
 <script src="https://unpkg.com/recharts/umd/Recharts.min.js"></script>
```

然后你就可以在`window.Recharts`找到这个库.

### dev build

```sh
$ git clone https://github.com/recharts/recharts.git
$ cd recharts
$ npm install
$ npm run build
```

## Demo

To examine the demos in your local build, execute


```sh
$ npm run[-script] demo
```

and then browse to http://localhost:3000

## 模块格式

- [babel-plugin-recharts](https://github.com/recharts/babel-plugin-recharts) 我们可以只引入需要的组件，以达到减小项目体积的目的。

## 官网
[recharts](http://recharts.org/#/zh-CN/guide)