#### 请注意

对于如何提问和其他非问题（issues），
请使用[StackOverflow](http://stackoverflow.com/questions/tagged/material-ui)而不是Github的issues。有一个StackOverflow标签名为“material-ui”，你可以用它来标记你的问题。

# [Material-UI@v1-beta](https://material-ui-next.com/)
[![npm package](https://img.shields.io/npm/v/material-ui/next.svg)](https://www.npmjs.org/package/material-ui)
[![CircleCI](https://img.shields.io/circleci/project/github/callemall/material-ui/v1-beta.svg)](https://circleci.com/gh/callemall/material-ui/tree/v1-beta)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-f81a65.svg)](https://gitter.im/callemall/material-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://img.shields.io/codecov/c/github/callemall/material-ui/v1-beta.svg)](https://codecov.io/gh/callemall/material-ui/branch/v1-beta)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1320/badge)](https://bestpractices.coreinfrastructure.org/projects/1320)

[![PeerDependencies](https://img.shields.io/david/peer/callemall/material-ui.svg)](https://david-dm.org/callemall/material-ui#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/callemall/material-ui.svg)](https://david-dm.org/callemall/material-ui)
[![DevDependencies](https://img.shields.io/david/dev/callemall/material-ui.svg)](https://david-dm.org/callemall/material-ui#info=devDependencies&view=list)

> Material-UI 是一组 [React](http://facebook.github.io/react/) 组件，它实现了 
[Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html)
规范.

## 安装

Material-UI 是一个可用的 [npm package](https://www.npmjs.org/package/material-ui).

**稳定的渠道**
```sh
npm install material-ui
```

**预发布渠道**
```sh
npm install material-ui@next
```
请注意，`@next`只会指向预发布;要获得最新的稳定版本，请使用` @latest`代替。

**最新稳定版本**
```sh
npm install material-ui@latest
```

## 用法

这里有一个快速开始的例子，这是你需要的:

```jsx
import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';

function App() {
  return (
    <Button>
      Hello World
    </Button>
  );
}

render(<App />, document.querySelector('#app'));
```

## 示例

您是否正在寻找一个开始的示例项目?

[我们托管了一些](https://github.com/callemall/material-ui/blob/v1-beta/docs/src/pages/getting-started/examples.md).

## 文档

查阅我们的[文档网站](https://material-ui-next.com/).

## 贡献

我们会非常感激您做的任何 [贡献](https://github.com/callemall/material-ui/blob/v1-beta/CONTRIBUTING.md)

## 更新日志

最近的更新?
请阅读 [更新日志](https://github.com/callemall/material-ui/releases).

## 路线图

未来的计划和高优先级的特性和增强可以在 [ROADMAP.md](https://github.com/callemall/material-ui/blob/v1-beta/ROADMAP.md) 文件中找到。

## 鸣谢

[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)

非常感谢[BrowserStack](https://www.browserstack.com/)为我们提供在真实浏览器上测试的基础设施。

## License

This project is licensed under the terms of the
[MIT license](https://github.com/callemall/material-ui/blob/v1-beta/LICENSE).
