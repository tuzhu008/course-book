---
components: FormControl, FormHelperText, Input, InputAdornment, InputLabel, TextField
---

# Text Fields

文本字段

[Text fields](https://material.io/guidelines/components/text-fields.html) 允许用户输入文本，通常以表单形式出现。
用户可以输入文本、数字或混合格式的输入。

## TextField

`TextField`包装器组件是一个完整的表单控件，包括标签、输入和帮助文本。

{{demo='pages/demos/text-fields/TextFields.js'}}

## Components

组件

`TextField`由较小的组件组成(`FormControl`, `InputLabel`, `Input`, 和 `FormHelperText`)，您可以直接利用这些组件来定制表单输入。

您可能还注意到，TextField组件中缺少一些原生HTML输入属性。
这是故意为之的。
组件负责处理最常用的属性，然后由用户使用下面的演示中所示的底层组件。不过，如果您想避免一些样板文件，您可以使用`inputProps` (和 `InputProps`, `InputLabelProps` 属性)。

{{demo='pages/demos/text-fields/ComposedTextField.js'}}

## Layout

布局

`TextField`，`FormControl`允许`margin`的规范来改变输入框的垂直间隔。使用
`none`(默认)不会将边距（margin）应用到`FormControl`上，而`dense`和`normal`会同时改变其他样式来符合规范。

{{demo='pages/demos/text-fields/TextFieldMargins.js'}}

## Input Adornments （输入框装饰）

`Input`允许`InputAdornment`的装饰品。
这些可以用来为输入添加前缀、后缀或操作。

{{demo='pages/demos/text-fields/InputAdornments.js'}}

## Inputs

{{demo='pages/demos/text-fields/Inputs.js'}}

## Formatted inputs (格式化输入)

我们演示了如何使用第三方库来 [格式化您的输入](https://material.io/guidelines/components/text-fields.html#text-fields-input-types)。在这里，我们使用的是[react-text-mask](https://github.com/text-mask/text-mask) 和[react-number-format](https://github.com/s-yadav/react-number-format)库。


{{demo='pages/demos/text-fields/FormattedInputs.js'}}

## Customized inputs (自定义输入)

您一直在阅读我们的[覆盖文档页面](/customization/overrides)，但是您没有信心跳进去吗?这里有一个例子，说明如何将输入的主要颜色从"primary"转换为紫色。没有限制。

{{demo='pages/demos/text-fields/CustomizedInputs.js'}}
