---
components: Tooltip
---

# Tooltips

工具提示

[tooltips](https://material.io/guidelines/components/tooltips.html#)是当用户悬停、关注或触摸某个元素时出现的文本标签。

## Simple Tooltips （简单的工具提示）

{{demo='pages/demos/tooltips/SimpleTooltips.js'}}

## Positioned Tooltips （定位工具提示）

`Tooltip`有12个位置可以选择。
它们没有方向箭头;相反，它们依赖于从源头发出的运动来传达方向。

{{demo='pages/demos/tooltips/PositionedTooltips.js'}}

## Controlled Tooltips （受控工具提示）

{{demo='pages/demos/tooltips/ControlledTooltips.js'}}

## Showing and hiding （显示和隐藏）

当用户的鼠标悬停在元素上时，tooltip立即显示，当用户的鼠标离开时立即隐藏。显示或隐藏tooltip的延迟可以通过属性`enterDelay` 和 `leaveDelay`.来添加。

在移动设备上，当用户对元素进行长按并隐藏了1500ms之后，工具提示就会显示出来。您可以使用`disableTriggerTouch`禁用该特性。
