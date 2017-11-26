![Semantic](http://semantic-ui.com/images/logo.png)

# Semantic UI

[![Join the chat at https://gitter.im/Semantic-Org/Semantic-UI](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Semantic-Org/Semantic-UI?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![CDNJS](https://img.shields.io/cdnjs/v/semantic-ui.svg)](https://cdnjs.com/libraries/semantic-ui/)

Semantic是一个语义化的UI框架。

关键特性

* 50+ UI 元素
* 3000 + CSS 变量
* 3 Levels of variable inheritance (类似于SublimeText)3级变量继承
* 为响应式设计的EM值构建
* 友好的Flexbox支持


Semantic允许开发人员快速构建漂亮的网站，使用**简洁的HTML**、**直观的javascript**和**简化的调试**，帮助前端开发成为一种令人愉快的体验。Semantic被设计为响应式的，它允许你的网站在多个设备上进行扩展。Semantic是现成的，并与诸如**React****Angular**、**Meteor**、**Ember**,等框架进行合作，这意味着您可以将它与任何这些框架集成在一起，以便于组织你的程序逻辑和UI层。

## 2.2 发布

Semantic UI `2.2` 现在是可用的(June 2016). 读读[有什么新鲜事](http://www.semantic-ui.com/introduction/new.html) 。

从`1.x` 的迁移信息可以在 [2.0 发布说明](https://github.com/Semantic-Org/Semantic-UI/blob/master/RELEASE-NOTES.md#version-200---march-xx-2015)找到

## 用户支持

请帮我们保持issue的条理性。 对于所有不包括具体内容的问题 [JSFiddle 测试用例](https://jsfiddle.net/ca0rovs3/) (错误报告), 或者功能请求请使用我们的用户论坛[http://forums.semantic-ui.com](http://forums.semantic-ui.com) 来讨论.

访问我们的 [贡献指南](https://github.com/Semantic-Org/Semantic-UI/blob/master/CONTRIBUTING.md) 了解更多关于GitHub问题的信息。

## 安装

#### 推荐安装
```bash
npm install semantic-ui  # 使用主题，导入build/watch任务到您自己的gulpfile文件中。
```

Semantic UI包含一个交互式安装程序，用于帮助设置您的项目
![Getting Started](https://dl.dropboxusercontent.com/u/2657007/install.gif)

* 关于设置的更多细节，请访问 [快速开始指南](http://semantic-ui.com/introduction/getting-started.html).
* 想要了解更多主题信息， 请阅读 [主题指南](http://www.semantic-ui.com/usage/theming.html)

#### 额外的版本

环境 | 安装脚本 | Repo
--- | --- | --- |
CSS Only | `npm install semantic-ui-css` | [CSS Repo](https://github.com/Semantic-Org/Semantic-UI-CSS)
[LESS](https://github.com/less/less.js/) Only | `npm install semantic-ui-less` | [LESS Repo](https://github.com/Semantic-Org/Semantic-UI-LESS)
[LESS](https://github.com/less/less.js/) plugin | `npm install less-plugin-semantic-ui` | [LESS Plugin Repo](https://github.com/bassjobsen/less-plugin-semantic-ui/)
[EmberJS](http://emberjs.com/) | `ember install:addon semantic-ui-ember` | [Ember Repo](https://github.com/Semantic-Org/Semantic-UI-Ember)
|[Meteor](https://www.meteor.com/) - [LESS](https://github.com/less/less.js/) | `meteor add semantic:ui` | [Meteor Repo](https://github.com/Semantic-Org/Semantic-UI-Meteor) |
|[Meteor](https://www.meteor.com/) - CSS | `meteor add semantic:ui-css` | [CSS Repo](https://github.com/Semantic-Org/Semantic-UI-CSS) |
[Bower](http://bower.io/) | `bower install semantic-ui` |

看看我们的 [集成 wiki](https://github.com/Semantic-Org/Semantic-UI/wiki/Integration)获取更多选项。

#### 浏览器支持

* 最后两版的FF, Chrome, Safari Mac
* IE 11+
* Android 4.4+, Chrome for Android 44+
* iOS Safari 7+
* Microsoft Edge 12+

尽管一些组件可以在 IE9下工作, [grids](http://semantic-ui.com/collections/grid.html) 和其他[flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes) 组件是不被IE9支持的，并且可能不能正确的出现。 

## 生态

#### 获得帮助
请 **不要 post**使用方法的问题到 GitHub Issues.这些类型的问题请访问我们的[Gitter 聊天室](https://gitter.im/Semantic-Org/Semantic-UI), [Semantic UI 论坛](http://forums.semantic-ui.com) 或者 [StackOverflow](http://stackoverflow.com/questions/tagged/semantic-ui).

#### 提交bug和增强功能
[GitHub Issues](https://github.com/Semantic-Org/Semantic-UI/issues) 是为了建议增强功能和报告错误。在提交bug之前，请确保您执行以下操作:
* 查看 [贡献指南](https://github.com/Semantic-Org/Semantic-UI/blob/master/CONTRIBUTING.md) 获取关于我们的发布周期的信息。
* [Fork 这个样板 JSFiddle](https://jsfiddle.net/ca0rovs3/) 来为您的bug创建一个测试用例。如果一个bug在文档中是显而易见的，那么作为一个测试用例就可以了，只要能清楚地说明如何重现这个问题。只有包含测试用例的bug才可以被检验。


#### Pull 请求

在添加拉请求时，一定要合并到[next](https://github.com/Semantic-Org/Semantic-UI/tree/next) 分支. 如果您需要在接下来的发布中展示一个修复，你可以使用 [这个 JSFiddle](https://jsfiddle.net/ca0rovs3/)


#### 国际化

* **中文** 中国的镜像站点请访问[semantic-ui中文](http://www.semantic-ui.cn).
* **Right-to-Left (RTL)** 通过从安装脚本中选择`rtl`，可以使用我们的构建工具创建RTL版本。
* **翻译** 帮助翻译 [Wiki 指南](https://github.com/Semantic-Org/Semantic-UI/wiki/Translating-Semantic-UI-Docs)。

#### 资源

资源 | 描述
--- | --- |
Bugs & 特性请求 |  所有的bug提交 **需要** 一个测试用例的链接 和 重现问题的一组步骤。你可以用[JSFiddle](https://jsfiddle.net/ca0rovs3/)来做一个测试用例, 然后提交你的 [错误报告到GitHub Issues](https://github.com/Semantic-Org/Semantic-UI/issues)
即时聊天| 加入[Gitter.im Room](https://gitter.im/Semantic-Org/Semantic-UI)
留言板 | [ProjectTalk董事会](http://www.projecttalk.io/boards/Semantic-Org%2FSemantic-UI)
新闻更新| 在[semantic-ui.com](http://www.semantic-ui.com)注册来获取更新
额外的资源  | 在 [StackOverflow](http://stackoverflow.com/questions/tagged/semantic-ui)提交问题 或者 询问 我们的[Google Group](https://groups.google.com/forum/#!forum/semantic-ui)

#### 帮助的地方

Project | 怎么帮助 | 下一个步骤
--- | --- | --- |
Localization本地化 | 帮助我们将 Semantic UI 翻译成你的语言 | [加入我们的翻译团队](https://github.com/Semantic-Org/Semantic-UI/wiki/Translating-Semantic-UI-Docs)
[SCSS](http://sass-lang.com/) | SASS 需要PR来支持内部变量`@import` | [添加Pull请求](https://github.com/sass/sass/pulls) for [#739](https://github.com/sass/sass/issues/739#issuecomment-73984809)
[Angular](https://angularjs.org/) | 帮助开发Angular绑定 | Reach Out on [GitHub Issues](https://github.com/Semantic-Org/Semantic-UI-Angular/issues/8)
指南 & 教程 | 帮助编写使用指南和教程 | [加入讨论](https://github.com/Semantic-Org/Semantic-UI/issues/1571)

#### 接触

如果你想开始一场关于semantic的对话,可以给我发邮件 [jack@semantic-ui.com](mailto:jack@semantic-ui.com)

[![Flattr This](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=jlukic&url=https%3A%2F%2Fgithub.com%2Fjlukic%2FSemantic-UI)

<a href="http://packagequality.com/#?package=semantic-ui"><img src="http://npm.packagequality.com/badge/semantic-ui.png"/></a>
