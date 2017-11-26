# API


我们已经学到了很多关于人们如何使用Material-UI的知识。
1.x.x重写允许我们完全重新考虑我们的组件API。

> API设计很困难，因为你可以让它看起来简单，但实际上它错综复杂，或者让它实际很简单，但是看起来很复杂。

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

As Sebastian Markbage [指出](http://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html)，没有抽象比错误的抽象更好。
我们提供了低阶组件来最大化组合功能。

## 组成

您可能已经注意到我们的API在关于组合组件方面还存在一些不一致。
为了提供一些透明性，我们在设计API时使用了以下规则:

1. 使用`children`属性是和React进行组合的惯用方法。
2. 有时我们只需要一个有限的子组合，例如当我们不需要允许子顺序排列时。
在这种情况下，提供显式属性使实现更简单、更有性能;例如，`<Tab />`使用一个`icon`和`label`属性。
3. API 一致性问题。

## 规则

除了以上的组合平衡之外，我们还执行以下规则:

### 传播

提供的未登记的属性被传播到根元素。例如，将`className`属性应用到根。

现在，假设您想禁用`MenuItem`上的波纹。
你可以利用这种传播行为:
```jsx
<MenuItem disableRipple />
```
`disableRipple` 属性将沿着这个路径传递: [`MenuItem`](/api/menu-item) > [`ListItem`](/api/list-item) > [`ButtonBase`](/api/button-base).

### 原生属性

我们避免记录DOM所支持的原生属性，类似 `className`.

### Classes

所有的组件接受一个`classes`属性来定制样式。

### 内部组件

内部组件有:
- 当用户可能需要调整内部render方法的组件时，他们自己的`xxxProps`属性。例如，我们暴露了`inputProps`和`InputProps`属性。
- 当`classes`还不够时，它们自己的`xxxClassName`属性。
- 当它们是抽象的关键时，它们自己的扁平属性。例如，我们暴露了一个`value`属性。
- 当用户可能需要执行强制操作时，他们自己的`xxxRef`属性。
  例如，我们暴露了一个`inputRef`属性来访问`Input`组件上的原生的`input`。
  你会发现一个`rootRef`属性，该属性被作为`ref`，来对组件的根元素的引用。

### 属性命名


布尔类型属性的名称应该根据默认值来选择。我们遵循HTML规范。[译者注：提供了名称的时候为true，却省时为false]
例如，input元素上的`disabled`属性。这个选择允许使用速记符号。


### 可控制组件

大多数可控组件都是通过`value`和`onChange`属性来控制的。
但是，我们也使用`open`/`onRequestClose`组合来显示相对状态。
