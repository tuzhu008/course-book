---
components: Drawer
---

# Drawer

抽屉

[Drawer](https://material.io/guidelines/patterns/navigation-drawer.html)从侧面滑过来。
这是一个在Google apps中发现的常见模式，并遵循列表的边框和度量。

## Temporary drawer （临时抽屉）

临时的导航抽屉可以打开或关闭。在默认情况下，在选择一个部分之前，这个抽屉会暂时打开所有其他内容。

可以通过单击叠加或按Esc键取消这个抽屉。
当一个项目被选中时，它会关闭，通过控制`open`属性来处理。

{{demo='pages/demos/drawers/TemporaryDrawer.js'}}

## Permanent drawer （永久的抽屉）

永久的导航抽屉总是可见的，固定在左侧边缘，与内容或背景相同。他们不能被关闭。

永久的导航抽屉是桌面推荐的默认设置。

{{demo='pages/demos/drawers/PermanentDrawer.js'}}

## Persistent drawer （持续的抽屉）

持续的导航抽屉可以打开或关闭。
这个抽屉与内容的表面高度相同。
它在默认情况下关闭，并通过选择菜单图标打开，并在用户关闭之前保持打开状态。
抽屉的状态被记住，从动作到动作，再会话到会话。

当抽屉在页面网格之外打开时，抽屉会强制其他内容改变大小，并适应较小的视图。

对于所有大于移动的尺寸，持久的导航抽屉都是可接受的。
对于具有多级层次结构的应用程序，它们不推荐使用向上箭头导航。

{{demo='pages/demos/drawers/PersistentDrawer.js'}}

## Mini variant drawer （迷你变体抽屉）

在这种变化中，持久的导航抽屉改变了它的宽度。
它的休眠状态就像一个迷你抽屉，与内容一样，被应用程序栏夹住。
当扩展时，它将作为标准的持久化导航抽屉。

对于需要快速选择访问内容的应用程序部分，推荐使用mini变种。


{{demo='pages/demos/drawers/MiniDrawer.js'}}

## Responsive drawer （响应式抽屉）

`Hidden`响应式辅助组件允许根据屏幕宽度显示不同类型的抽屉。
一个`temporary`抽屉被显示在小屏幕上，而一个`permanent`抽屉则显示在更大的屏幕上。

{{demo='pages/demos/drawers/ResponsiveDrawer.js'}}
