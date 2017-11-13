---
components: Hidden
---

# Hidden

所有元素都是可见的，除非**它们被显式隐藏**。
为了简化与我们的[响应式断点](/layout/basics)的集成，这个组件可以用来隐藏任何内容，或者您可以与我们的[`Grid`](/layout/grid)组件一起使用它。

## 工作原理

Hidden 与一系列的断电一起工作。比如 `xsUp` 或者 `mdDown`, 或者 一个或多个断点。 比如： `only='sm'` 或 `only={['md', 'xl']}`。
可以同时使用范围和单独的断点来实现非常自定义的行为。

## 实现

### js

默认情况下，`js`实现被使用，基于使用观察屏幕尺寸的`withWidth()`高阶组件来响应式地隐藏内容。
除非遇到了断点，否则它不会渲染任何内容。

### css

对于使用服务器端渲染的用户，如果不想让浏览器在屏幕上重新排列内容，则可以设置`implementation="css"`。

## 断点 up

使用任何断点*up*属性，给定的子元素将会在屏幕尺寸在断点或者在断电之上的时候被隐藏。

{{demo='pages/layout/BreakpointUp.js'}}

## 断点 down

使用任何断点*down*属性，给定的子元素将会在屏幕尺寸在断点或者在断点之下的时候被隐藏。

{{demo='pages/layout/BreakpointDown.js'}}

## 断点 only

有两种方法可以使用`only`属性:
 - 列出一个单一的断点
 - 列出一个断点数组

{{demo='pages/layout/BreakpointOnly.js'}}

## 与网格集成

在不同的响应式断点中改变`Grid`是很常见的，在许多情况下，您需要隐藏其中的一些元素。
为了简便起见，您已经使用了`Grid`，您可以将`Hidden`的行为指定为`hidden`属性。

{{demo='pages/layout/GridIntegration.js'}}
