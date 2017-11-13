---
components: Typography
---

# Typography（排版）

太多的类型尺寸和样式会破坏任何布局。
[排版比例](https://material.google.com/style/typography.html#typography-styles)有一组有限的类型尺寸，它们与布局网格一起工作得很好。

## 通常情况

Material-UI不会自动加载*Roboto*字体。
开发人员负责加载应用程序中使用的所有字体。
Roboto字体有一些简单的入门方法。
## Roboto Font CDN

下面显示的是一种用于从CDN上加载Roboto字体的link标记。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```
## 使用 [npm](https://www.npmjs.com/)安装

您可以通过在终端中键入下面的命令来安装它:

`npm install typeface-roboto --save`

然后，您可以将它导入您的入口点。

```js
import 'typeface-roboto'
```
更多信息请查阅 [typeface](https://www.npmjs.com/package/typeface-roboto) 项目.

## 组件

{{demo='pages/style/Types.js'}}

## CSS in JS

在某些情况下，您可能无法使用`Typography`组件。
希望您能够利用主题的`typography`键。

{{demo='pages/style/TypographyTheme.js'}}
