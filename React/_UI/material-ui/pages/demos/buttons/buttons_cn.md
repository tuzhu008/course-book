---
components: Button, IconButton, ButtonBase
---

# Buttons

当用户触碰到[Buttons](https://material.io/guidelines/components/buttons.html) 时，交流就会发生。

Material按钮在按压时会引发凃墨反应。
它们可以显示文本、图像或两者。
扁平按钮和凸起按钮是最常用的类型。

## Flat Buttons（扁平按钮）

扁平按钮是只包含文字的按钮。
它们可以用于对话框、工具栏或内联。
它们不会提升，但会在按压时充满色彩。

{{demo='pages/demos/buttons/FlatButtons.js'}}

## Raised Buttons （凸起按钮）

上升的按钮是矩形的按钮。
它们可以内联地使用。他们在按压时提升和显示凃墨反应。

{{demo='pages/demos/buttons/RaisedButtons.js'}}

## Floating Action Buttons （浮动的操作按钮）


浮动操作按钮表示应用程序中的主要操作。
它的形状就像一个漂浮在UI之上的圆圈图标，它在获得焦点上有一个凃墨反应，并在选择时提升。
当被按压时，它可能包含更多相关的动作。

每个屏幕上只推荐一个浮动操作按钮来表示最常见的操作。

{{demo='pages/demos/buttons/FloatingActionButtons.js'}}

## Icon Buttons （图标按钮）

图标按钮通常在应用程序栏和工具栏中找到。

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.
图标也适用于切换按钮，它允许选择或取消选择，例如添加或删除一个星星到一个项上。

{{demo='pages/demos/buttons/IconButtons.js'}}

### 带图标和标签的Buttons
有时你可能想要有图标的按钮来增强应用程序的用户体验，因为人们比纯文本更能识别logo。例如，如果你有一个删除按钮，你可以用一个垃圾箱图标来标记它。

{{demo='pages/demos/buttons/IconLabelButtons.js'}}

## Complex Buttons（复杂的按钮）
扁平按钮、凸起按钮、浮动动作按钮和图标按钮都是在同一个组件上构建的:`ButtonBase`。
您可以利用这个低阶组件来构建自定义的交互。

{{demo='pages/demos/buttons/ButtonBases.js'}}
