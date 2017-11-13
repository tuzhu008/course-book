---
components: Menu, MenuItem, MenuList
---

# Menus

菜单

[Menus](https://material.io/guidelines/components/menus.html)在一个临时material表上显示一个选择列表。

菜单出现在与按钮、动作或其他控件的交互上。它们显示了一个选项列表，每一行都有一个选项。

如果不适用于某个上下文，则菜单项可能会被禁用。上下文菜单根据应用程序的当前状态动态更改它们可用的菜单项。

在应用程序中，菜单不应该被用作导航的主要方法。


## Simple menus （简单菜单）

默认情况下，在锚元素上打开简单的菜单(这个选项可以通过属性来改变)。当靠近屏幕边缘时，简单的菜单垂直重新排列，使所有菜单项都是完全可见的。

在理想情况下，选择一个选项应该立即提交选项并关闭菜单。

**消除歧义**:与简单的菜单相比，简单的对话框可以提供与列表项可用选项相关的附加细节，或者提供与主任务相关的导航或正交操作。尽管它们可以显示相同的内容，但是简单的菜单比简单的对话框更受欢迎，因为简单的菜单对用户当前的上下文没有太大的干扰。


{{demo='pages/demos/menus/SimpleMenu.js'}}

## Selected menus （选择菜单）

如果用于项目选择，当打开时，简单的菜单会尝试将当前选中的菜单项与锚元素垂直对齐。当前选中的菜单项是使用`selected`属性来设置的。

{{demo='pages/demos/menus/SimpleListMenu.js'}}

如果一个简单的菜单中的文本包装到第二行，那么使用一个简单的对话框代替。简单的对话框可以有不同高度的行。

## Max height menus （最大高度菜单）

如果菜单的高度阻止了所有菜单项的显示，菜单可以在内部滚动。

{{demo='pages/demos/menus/LongMenu.js'}}

## MenuList composition （MenuList组合）

`Menu`组件在内部使用`Popover`组件。
但是，您可能想使用不同的定位策略，或者不阻塞滚动。
为了满足这些需求，我们暴露了一个您可以组合的`MenuList`组件。

`MenuList`组件的主要职责是处理焦点。
{{demo='pages/demos/menus/MenuListComposition.js'}}
