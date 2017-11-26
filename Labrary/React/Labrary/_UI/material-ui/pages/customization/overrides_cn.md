# Overrides

As components evolve in different contexts, Material-UI supports four different types of customization needs going from **the most specific** to **the most generic**:
随着组件在不同的上下文中不断发展，Material-UI支持四种不同类型的定制需求，从**最具体**到最通用的:

1. [一次性情况的特定变异（Specific variation for a one-time situation）](#1-specific-variation-for-a-one-time-situation)
2. [组件的特定变异(Specific variation of a component)](#2-specific-variation-of-a-component) 在不同的上下文中重用
4. [Material Design 变异](#3-material-design-variations) 例如button组件
3. [用户全局主题变异(User global theme variation)](#4-user-global-theme-variation)

## 1. Specific variation for a one-time situation

一次性情况的特定变异

在某些特定情况下你可能需要改变组件的样式。对于这些情况，你可以使用以下解决方案：

### 使用class 名覆盖

第一种覆盖组件样式的方法是使用**类名**。每个组件都提供一个`className`属性。这些属性总是应用于根元素。

在`<head />`的底部使用`<link />`引入Material-UI，这样的Material-UI注入CSS来设置一个组件的样式具有最高的优先级。

这样，我们确保组件总是正确地渲染。
想了解更多，请参阅 文档的[CSS 注入顺序
](/customization/css-in-js#css-injection-order) 章节

{{demo='pages/customization/OverridesClassNames.js'}}

### 使用classes覆盖

当`className`属性还不够，您又需要访问更深层的元素时，您可以利用`classes`属性来定制靠Material-UI为给定组件注入的所有CSS。
这些classes的列表在**组件API**部分中被记录。
例如，您可以查看一下[Button CSS API](/api/button#css-api)
除此之外,你还可以看看[实现细节](https://github.com/callemall/material-ui/blob/v1-beta/src/Button/Button.js)。


示例:

{{demo='pages/customization/OverridesClasses.js'}}

### 使用行内样式覆盖

第二种覆盖组件样式的方法是使用**行内样式**处理。
每一个组件都提供一个`style`属性。这些属性总是被应用到根元素。

你不用担心CSS的特殊性，因为行内样式的优先级高于常规CSS。


{{demo='pages/customization/OverridesInlineStyle.js'}}

## 2. Specific variation of a component

组件的特定变异

你可能需要创建一个组件的变异，并在不同的上下文中使用它，例如产品页的一个色彩斑斓的按钮。但是你可能想要保持你的代码 [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

最好的方法是遵循选项1，然后利用React的组合功能，将定制组件导出到任何需要的地方。

{{demo='pages/customization/OverridesComponent.js'}}

## 3. Material Design variations

 Material Design 设计变异

Material Design文档中有不同的变异的某些组件，比如按钮是如何以不同的形状出现的:
 [flat](https://material.io/guidelines/components/buttons.html#buttons-flat-buttons), [raised](https://material.io/guidelines/components/buttons.html#buttons-raised-buttons), [floating](https://material.io/guidelines/components/buttons-floating-action-button.html) 和更多。

Material-UI试图实现所有这些变异。请参阅[支持的组件](/getting-started/supported-components)文档，以了解所有受Material Design组件支持的组件的当前状态。

## 4. User global theme variation

用户全局主题变异。

为了促进一致性和整体管理用户界面，Material-UI提供了应用全局变化的机制。您可以调整[配置变量](/customization/themes#configuration-variables)

### Customizing all instances of a component type

自定义组件类型的所有实现

当配置变量不够强大时，您可以利用`theme`的`overrides`键来潜在地改变由Material-UI注入到DOM中的每一种样式。
想了解更多，请参阅 [文档的主题部分](/customization/themes#customizing-all-instances-of-a-component-type).