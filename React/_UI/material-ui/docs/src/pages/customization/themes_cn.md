# 主题

主题让你在应用中应用一致的色调。
它允许您为您的项目的**定制所有设计基调**，以满足您的业务或品牌的特定需求。

主题指定了表面的黑暗程度、阴影的层次、油墨元素的适当不透明度等。
为了促进应用程序之间的一致性，可以从轻和暗的主题中选择。
底层我们使用[jss](https://github.com/cssinjs/jss)

# 主题供应者

为了注入主题到你的应用程序中，你需要使用`<MuiThemeProvider />` 组件。  但是，这是可选的，Material-UI组件带有一个默认的主题。
我们依赖于React的上下文特性。

确保 `<MuiThemeProvider />` 是您想要定制的组件的父类。
[阅读这个API段落](#muithemeprovider)以了解更多.

## 配置变量

更改配置变量是最有效地将Material-UI与您的需求相匹配的方法。默认情况下，您的 Material-UI应用程序将使用light主题。

### 调色板

#### 意图化

颜色意图化是将调色板映射到应用程序中给定的意图。

我们展示了以下的颜色意图化:

- primary - 用于为用户表示主要界面元素
- secondary - 用于为用户表示次要的界面元素
- error - 用于为用户表示需要小心的界面元素

调色板使用的是带有`A`前缀(`A200`等)颜色的调色，其他意图的色调没有前缀。
如果你想知道更多关于颜色的信息, 你可以查看[ color 段落](/style/color)。

#### 示例

{{demo='pages/customization/Palette.js'}}

### Typography

太多的类型尺寸和样式会破坏任何布局。
我们使用 **一组类型尺寸集合** ，他们和布局网格一起工作很好。
这些尺寸被用在我们的组件中。

请看下面的关于更改默认值的例子，比如字体。
如果想要了解更多，请查看 [ typography 段落](/style/typography).

{{demo='pages/customization/TypographyTheme.js'}}

#### 字体尺寸

Material-UI 为字体尺寸使用rem单位。

浏览器html元素默认的字体尺寸为`16px`。
浏览器有一个改变这个值的选项。
rem单位使我们能够适应用户的设置。
这个单位的选择会带来更好的用户体验。

由于各种原因，用户改变字体大小设置，从紧张的视力到为设备选择最优设置，它可以在大小和观看距离上有很大的不同。

例如，您可能希望在使用[10px simplification](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/)值时更改该值

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*您需要将上面的CSS应用到该页面的html元素中，以查看下面的演示正确呈现*

{{demo='pages/customization/FontSizeTheme.js'}}

### Dark/light 主题

你可以设置`type` 为 `dark`来更改主题为深色

{{demo='pages/customization/DarkTheme.js'}}

### 其他变量

我们尝试通过添加更多的变量来使实现标准化:typography、breakpoints、transitions等等。您可以看到在默认值下的主题对象是什么样子。

如果你想了解更多，我们建议你看一看[`material-ui/style/createMuiTheme.js`](https://github.com/callemall/material-ui/blob/v1-beta/src/styles/createMuiTheme.js).

{{demo='pages/customization/ThemeDefault.js'}}

### 业务变量

当你自己的组件使用我们的[样式解决方案](/customization/css-in-js)，你也可以利用这个主题。为主题添加额外的变量是很方便的，因此您可以在任何地方使用它们。
例如:

{{demo='pages/customization/BusinessVariables.js'}}

## 自定义所有组件类型的实例

当配置变量不够强大时，您可以利用
`theme`的`overrides`的键，以潜在地改变由Material-UI注入到DOM中的每一种风格。
这是一个非常强大的功能。


{{demo='pages/customization/OverridesTheme.js'}}

每个组件的这些定制点的列表在**组件 API**章节中被记录。
例如， 你可以看看[Button](/api/button#css-api).
另外, 你总可以看一看[实现](https://github.com/callemall/material-ui/blob/v1-beta/src/Button/Button.js).

## 访问组件中的主题

You might need to access the theme variables inside your React components.
Let's say you want to display the value of the primary color, you can use the `withTheme()` Higher-order Component to do so. Here is an example:
您可能需要访问您的React组件内部的主题变量。
假设您想要显示primary色调的值，您可以使用`withTheme()`高阶组件来办到。这是一个例子:

{{demo='pages/customization/WithTheme.js'}}

## 嵌套的主题

我们的主题解决方案非常灵活，您可以嵌套多个主题提供程序。
在处理应用程序的不同区域时，这一点非常有用。

{{demo='pages/customization/Nested.js'}}

## API

### `<MuiThemeProvider />`

该组件使用一个`theme`属性。
它使这个`theme`在React树上是可用的，这要归功于React上下文。
该组件最好在**组件树的根目录**中使用。
你可以看到完整的属性 API 在 [这个专门的页面](/api/mui-theme-provider).

#### 示例

```jsx
import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Root from './Root';

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  );
}

render(<App />, document.querySelector('#app'));
```

### `createMuiTheme(options) => theme`

基于接收到的options创建一个主题。

#### 参数

1. `options` (*Object*): 获取一个不完整的主题对象并添加缺失的部分。

#### 返回值

`theme` (*Object*): 一个完整的，可以使用的主题对象。

#### 示例

```js
import { createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```

### `withTheme()(Component) => Component`

提供`theme`对象作为输入组件的属性。

#### 参数

1. `Component`: 将被包装的组件。

#### 返回值

`Component`: 新创建的组件

#### 示例

```js
import { withTheme } from 'material-ui/styles'

export default withTheme()(MyComponent);
```
