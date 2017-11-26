---
components: Icon, SvgIcon
---

# Icons

Material [icons](https://material.io/guidelines/style/icons.html) 使用几何图形来形象化地表现核心思想，功能或者是主题。

## System icons

一个[system icon](https://material.io/guidelines/style/icons.html#icons-system-icons) 或者 UI icon,
象征着一个命令, 文件, 设备, 或者是目录.
System icons也被用来表示一些常见的操作，比如垃圾、打印和保存，通常在应用程序栏、工具栏、按钮和列表中都能找到。
谷歌提供了一套遵循这些指南的 [Material icons](https://material.io/icons/)。

Material-UI提供了两个租价来渲染系统图标：`Icon`用来渲染字体图标，`SvgIcon`用来渲染SVG 路径。


### Font Icons

`Icon`组件将显示来自任何支持连接（ligature）的图标字体的图标。

作为先决条件，必须包括它, 如提供
[Material icon font](http://google.github.io/material-design-icons/#icon-font-for-the-web)到你的项目中。

`Icon`将为Material图标字体设置正确的class名。对于其他字体，您必须图标组件的`className`属性来提供class名称。

为了使用图标，简单地将图标名称（字体连接）包裹在`Icon`组件中。
例如 `<Icon>star</Icon>`.

默认情况下，Icon会继承当前文本的颜色。
你可以随意选择icon颜色使用主题颜色属性中的一个：`accent`, `action`, `contrast`, `disabled`, `error`, & `primary`。

{{demo='pages/style/Icons.js'}}

### SVG Icons

`SvgIcon`组件使用了一个SVG `path`元素作为它的子元素，并将它转换成了一个显示这个路径的React组件，并允许图标对鼠标事件进行样式和响应。

由此产生的图标可以被用作，
或者作为使用图标的其他Material-UI的子元素。

{{demo='pages/style/SvgIcons.js'}}

在寻找SVG图标吗? 这里有很多项目。我们找到一个提供2000+非官方的Material Design 图标：
[https://materialdesignicons.com](https://materialdesignicons.com/).
你可以使用 [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) 这个原始的图标和Material-UI的集成项目。

### SVG Material icons

拥有实现自定义图标所需的构建块是很有趣的，但是预设呢?
我们提供一个单独的NPM包,
[material-ui-icons](https://www.npmjs.com/package/material-ui-icons),它包含了900+官方的material system icons：[material.io/icons](https://material.io/icons/)被转为了`SvgIcon`组件。

假如说你在寻找一个特定了的图标。你可以利用[material.io/icons](https://material.io/icons/)的**搜索栏**来寻找。
记住，我们的图标的名称是`PascalCase（首字母大写）`，例如
- [`alarm`](https://material.io/icons/#ic_alarm) 被暴露为 `material-ui-icons/Alarm`
- [`alarm off`](https://material.io/icons/#ic_alarm_off) 被暴露为`material-ui-icons/AlarmOff`

{{demo='pages/style/SvgMaterialIcons.js'}}
