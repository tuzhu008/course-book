Redux DevTools
=========================

为[Redux](https://github.com/reactjs/redux)定制的一个实时编辑的时间旅行环 。 

> 注意，来自[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)这个仓库中的实现是不同的。关于浏览器扩展，请参考后者。

### 内容列表

- [特性](#特性)
- [概述](#概述)
- [浏览器扩展](#浏览器扩展)
- [设置说明](#设置说明)
- [自定义监视器](#自定义监视器)
- [License](#license)

[![build status](https://img.shields.io/travis/gaearon/redux-devtools/master.svg?style=flat-square)](https://travis-ci.org/gaearon/redux-devtools)
[![npm version](https://img.shields.io/npm/v/redux-devtools.svg?style=flat-square)](https://www.npmjs.com/package/redux-devtools)
[![npm downloads](https://img.shields.io/npm/dm/redux-devtools.svg?style=flat-square)](https://www.npmjs.com/package/redux-devtools)
[![redux channel on discord](https://img.shields.io/badge/discord-redux@reactiflux-738bd7.svg?style=flat-square)](https://discord.gg/0ZcbPKXt5bWb10Ma)

![](http://i.imgur.com/J4GeW0M.gif)

### 特性

* 让你检查每个state和action载荷
* 让你通过“cancelling”动作回到过去
* 如果您更改了reducer代码，则将重新对每个“staged”操作求值。
* 如果reducers抛出，你会看到在什么时候发生了这样的动作，以及错误是什么
* 用`persistState()`存储增强器，您可以跨页面重载持久化调试会话

### 概述

Redux DevTools是一个开发时间包，它为您的Redux开发工作流程提供了电源。注意在生产中去掉它的代码(请参阅 [walkthrough](./docs/Walkthrough.md)了解更多)!要使用Redux DevTools，您需要选择一个“monitor”——一个作为DevTools的UI的响应组件。不同的任务和工作流程需要不同的UI，因此在这方面，Redux DevTools的构建是灵活的。我们建议使用[LogMonitor](https://github.com/gaearon/redux-devtools-log-monitor)检查状态和时间旅行,并把它包裹在[`DockMonitor`](https://github.com/gaearon/redux-devtools-dock-monitor)里面来在屏幕上快速移动它。

如果你来这里寻找什么“Reset”,“Revert”,“Sweep”或“Commit”按钮,查看[the `LogMonitor` 文档](https://github.com/gaearon/redux-devtools-log-monitor/blob/master/README.md#features).

### 浏览器扩展

如果你不想麻烦地安装Redux DevTools将它集成到您的项目,可以考虑使用Chrome和Firefox地[Redux DevTools 扩展](https://github.com/zalmoxisus/redux-devtools-extension)。它提供了对最流行的监视器的访问，易于配置来过滤操作，并且不需要安装任何包。

请参阅[使用文档](../redux-devtools-extension)以获得更多信息。
### 设置说明

阅读安装方式[walkthrough](./docs/Walkthrough.md)来获取集成说明和使用示例(`<DevTools>`组件、`DevTools.instrument()`，从生产构建中排除，gotchas)。

### 运行示例

克隆项目:

```
git clone https://github.com/gaearon/redux-devtools.git
cd redux-devtools
```

根目录运行`npm install`来安装依赖：
```
npm install
```

现在你可以打开example文件夹并运行 `npm install`：
```
cd examples/counter # or examples/todomvc
npm install
```

最后，在页面上运行开发服务器:
```
npm start
open http://localhost:3000
```

尝试在日志中单击actions，或者在reducers中更改一些代码。您应该看到action日志在每个代码更改中被重新计算。

尝试打开`http://localhost:3000/?debug_session=123`，单击around，然后点击refresh。您应该看到，所有actions都已从本地存储中恢复。

### 自定义监视器

**DevTools接受monitor组件，这样您就可以构建一个完全定制的UI。** [`LogMonitor`](https://github.com/gaearon/redux-devtools-log-monitor) 和 [`DockMonitor`](https://github.com/gaearon/redux-devtools-dock-monitor) 这只是可能的例子。

**[我邀请您为Redux DevTools构建一个自定义监视器！](https://github.com/gaearon/redux-devtools/issues/3)**

一些关于定制监控的疯狂想法:

* 一个滑动条可以让你在计算状态之间跳跃
* 一个应用内层显示了应用中的最后N个状态 (e.g. for animation)
* 一个像接口时间机器，比如你的应用的最后N个状态在不同的Z层上
* 你可以自由地提出并实现你自己的！检查 [`LogMonitor`](https://github.com/gaearon/redux-devtools-log-monitor) `propTypes` 来看看你能做什么。

事实上，其中一些已经实现了:

#### [滑块监控器](https://github.com/calesce/redux-slider-monitor)

![](https://camo.githubusercontent.com/47a3f427c9d2e0c763b74e33417b3001fe8604b6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f662e636c2e6c792f6974656d732f3149335032323243334e3252314d3279314b33622f53637265656e2532305265636f7264696e67253230323031352d31322d3232253230617425323030372e3230253230504d2e6769663f763d3162363236376537)

#### [检查员](https://github.com/alexkuz/redux-devtools-inspector)

![](http://i.imgur.com/fYh8fk5.gif)

#### [Diff监控](https://github.com/whetstone/redux-devtools-diff-monitor)

![](https://camo.githubusercontent.com/c2c0ba1ad82d003b5386404ae09c00763d73510c/687474703a2f2f692e696d6775722e636f6d2f72764352394f512e706e67)

#### [滤过性的日志监控](https://github.com/bvaughn/redux-devtools-filterable-log-monitor/)

![redux-devtools-filterable-log-monitor](https://cloud.githubusercontent.com/assets/29597/12440009/182bb31c-beec-11e5-8fd0-bdda48e646b2.gif)

#### [图表监控](https://github.com/romseguy/redux-devtools-chart-monitor)

![redux-devtools-chart-monitor](http://i.imgur.com/MSgvU6l.gif)

#### [过滤操作](https://github.com/zalmoxisus/redux-devtools-filter-actions)

(没有UI但是可以包装其他的监视器)

<img src='http://i.imgur.com/TlqnU0J.png' width='400'>

#### [Dispatch](https://github.com/YoruNoHikage/redux-devtools-dispatch)

![redux-devtools-dispatch](https://cloud.githubusercontent.com/assets/969003/12874321/2c3624ec-cdd2-11e5-9856-fd7e24efb8d5.gif)

#### Keep them coming!

创建一个PR来添加您的自定义监视器。

### License

MIT
