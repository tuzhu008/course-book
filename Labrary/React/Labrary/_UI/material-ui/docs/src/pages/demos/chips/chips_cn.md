---
components: Chip
---

# Chips

芯片

[Chips](https://www.google.com/design/spec/components/chips.html)在小块中表示复杂的实体，例如联系人。

虽然这里作为独立组件被包含在这里，但最常见的用法是某种形式的输入框，因此这里演示的一些行为没有在上下文中显示。

## Chip

芯片的例子，使用图像Avatar，SVG图标Avatar，字母和（字符串）Avatar
- Chips 带有`onClick`属性的芯片定义了focus、hover、和click时的外观
- Chips 带有`onRequestDelete`属性的芯片将显示一个删除图标,在悬停时改变外观。


{{demo='pages/demos/chips/Chips.js'}}

## Chip array (卡片组)
一个从值数组中渲染多个芯片的例子。
移除一个芯片将它从数组中删除。注意,因为没有定义
`onClick`属性，芯片可以被聚焦，但不会
点击或触摸时获得深度。[译者注：不会改变外观]

{{demo='pages/demos/chips/ChipsArray.js'}}
