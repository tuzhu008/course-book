---
components: Grow, Popover
---

# Popovers

弹窗

`Popover`可以用来在另一个元素上面显示一些内容。

## Anchor playground

使用单选按钮来调整`anchorOrigin`和`transformOrigin`位置。
您也可以将`anchorReference`设置为`anchorPosition`或`anchorEl`。
当它是`anchorPosition`时，组件将会，而不是`anchorEl`，
参考你可以调整的`anchorPosition`属性来设置
弹出窗口的位置。

{{demo='pages/demos/popovers/AnchorPlayground.js'}}

## Mouse over interaction （鼠标交互）

我们演示了如何使用`Popover组件以及[react-popper](https://github.com/souporserious/react-popper)包来实现一个基于mouse over事件的弹窗行为。

{{demo='pages/demos/popovers/MouseOverPopover.js'}}
