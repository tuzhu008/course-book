---
components: FormControl, FormGroup, FormLabel, FormControlLabel, RadioGroup, Checkbox, Radio, Switch
---

# Selection Controls

选择控件

[Selection controls](https://material.io/guidelines/components/selection-controls.html)允许用户选择选项。

这一指南涵盖了三种类型的选择控件:

- **复选框**允许从集合中选择多个选项。
- **单选按钮**允许从集合中选择单个选项。
- **开关**允许选择开启或关闭。

## Checkboxes （复选框）

复选框允许用户从一个集合中选择多个选项。

如果你有多个选项出现在列表中，你可以通过使用复选框而不是开关来保存空间。

如果您有一个选项，请避免使用复选框，而是使用一个开关。

{{demo='pages/demos/selection-controls/Checkboxes.js'}}

`FormGroup`是一种有用的包装器，用于分组选择控制组件，这些组件提供了更简单的API。

{{demo='pages/demos/selection-controls/CheckboxesGroup.js'}}

## Radio Buttons （单选按钮）

单选按钮允许用户从一个集合中选择一个选项。如果你认为用户需要同时看到所有可用选项，可以使用单选按钮进行选择。

否则，请考虑下拉菜单，它使用的空间比显示所有选项要少。

`RadioGroup`是一种有用的包装器，用于对提供更简单的API的`Radio`组件进行分组，并对该组进行适当的键盘访问。

{{demo='pages/demos/selection-controls/RadioButtonsGroup.js'}}

`Radio` 在没有包装器的时候也可以独立使用。

{{demo='pages/demos/selection-controls/RadioButtons.js'}}

## Switches （开关）

On/off 开关切换一个单一设置选项的状态。开关控件的选项，以及它所在的状态，应该从相应的行内标签中清除。

{{demo='pages/demos/selection-controls/Switches.js'}}

归功于`FormControlLabel` 组件，`Switch`也可以用于标签描述。

{{demo='pages/demos/selection-controls/SwitchLabels.js'}}

