# 安装

Material-UI 是一个可用的 [npm package](https://www.npmjs.org/package/material-ui).

## npm

安装并将依赖信息保存到你的 `package.json` 文件中, 运行:

```
npm install material-ui@next --save
```

## Roboto Font

记住，设计 Material-UI 使用了 [Roboto](http://www.google.com/fonts/specimen/Roboto)
字体。所以一定要遵守 [这些说明](/style/typography#general).

## Icon 字体

为了使用字体`Icon`组件，或者直接在组件中使用icon名称(连接)
来支持它们,你必须首先添加[Material icons](https://material.io/icons/)字体。
这里有[一些介绍](http://google.github.io/material-design-icons/#icon-font-for-the-web)
如何做到这事。

## SVG Icons

为了能够使用预先构建的SVG Material icons,例如在[组件demos](/demos/app-bar/)中找到，
你必须安装[material-ui-icons](https://www.npmjs.org/package/material-ui-icons)包：

```
npm install material-ui-icons
```

这个包替换了先前包含在Material-UI中的`svg-icons`。