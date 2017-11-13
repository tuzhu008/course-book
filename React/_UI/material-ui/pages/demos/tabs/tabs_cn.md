---
components: Tabs, Tab
---

# Tabs

选项卡

[Tabs](https://material.io/guidelines/components/tabs.html) 使在不同的视图之间进行探索和切换是很容易的。

## Basic Tabs （基本选项卡）

没有修饰的选项卡：

{{demo='pages/demos/tabs/BasicTabs.js'}}

### Wrapped Labels （带标签）

长标签将自动包装在选项卡上。如果标签太长，标签就会溢出，文本就不会显示出来。

{{demo='pages/demos/tabs/BasicTabsWrappedLabel.js'}}

## Fixed Tabs （固定选项卡）

固定的选项卡应该被使用在数量有限的选项卡，并且当一致的放置将有助于肌肉记忆。

### Full width （全宽）

`fullWidth`属性应该被用于较小的视图。
这个demo使用
This demo also uses [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views)来动画过渡选项卡，并允许选项卡在触摸设备上滑动。 

{{demo='pages/demos/tabs/FullWidthTabs.js'}}

### Centered （居中的）

`centered`属性应该被用于比较大的视图。

{{demo='pages/demos/tabs/CenteredTabs.js'}}

## Scrollable Tabs

滚动选项卡

### Automatic Scroll Buttons （自动滚动按钮）

左和右滚动按钮将自动显示在桌面上，隐藏在移动设备上。(基于视窗的宽度)

{{demo='pages/demos/tabs/ScrollableTabsButtonAuto.js'}}

### Forced Scroll Buttons （强制滚动按钮）

无论viewport宽度如何，左和右滚动按钮都将显示出来。

{{demo='pages/demos/tabs/ScrollableTabsButtonForce.js'}}

### Prevent Scroll Buttons （阻止滚动按钮）

左和右滚动按钮将永远不会出现。所有滚动必须通过用户代理滚动机制(如左/右滑动、shift-鼠标滚轮等)启动。


{{demo='pages/demos/tabs/ScrollableTabsButtonPrevent.js'}}

## Icon Tabs （图标选项卡）

选项卡标签可以是所有的图标，也可以是所有的文本。

{{demo='pages/demos/tabs/IconTabs.js'}}
{{demo='pages/demos/tabs/IconLabelTabs.js'}}

## Disabled Tab （禁用选项卡）

设置`disabled`属性来禁用。

{{demo='pages/demos/tabs/DisabledTabs.js'}}
