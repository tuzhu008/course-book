---
components: Grid
---

# Grid

材料设计的响应式UI是基于12列的网格布局。
这个网格在布局之间创建视觉一致性，同时灵活地允许各种设计。

## 工作原理

使用`<Grid />`组件来实现网格系统：
- 它使用 [CSS的 Flexible Box 模块](https://www.w3.org/TR/css-flexbox-1/) 来实现高灵活性.
- 它有两个类型的布局： *containers* 和 *items*.
- Item宽度设置为百分比，因此它们总是相对于它们的父元素而言是流动的和变化大小的。
- Item有填充，以创建各个Item之间的间隔。
- 有五个网格中断点: xs, sm, md, lg, 和 xl.

## 间距

响应式网格聚焦于一致的间距宽度，而不是列宽。
Material design的边距（margin）和列遵循一个**8dp**平方的基准网格。
间距可以是8、16、24或40dp宽。

{{demo='pages/layout/SpacingGrid.js'}}

## Full-width vs Centered

**Full-width grids**: 使用流体列和断点来确定什么时候需要改变布局。

{{demo='pages/layout/FullWidthGrid.js'}}

**Centered grids**: 当所有的列(加上一个定义的边距)不再适合屏幕时，使用固定的列并重新排列布局。

{{demo='pages/layout/CenteredGrid.js'}}

## 交互式

下面是一个交互式的演示，可以让你探索不同设置的视觉效果:

{{demo='pages/layout/InteractiveGrid.js'}}

## 自动布局

自动布局使 *items*公平地共享可用的空间。
这也意味着你可以设置一个*item*的宽度，其他的也会自动调整大小。

{{demo='pages/layout/AutoGrid.js'}}

## 局限性

有一个局限是使用负边距来实现item间间隔。
如果一个负边距超出了`<body />`的范围，就会出现水平滚动。
有3个可用的工作区:
1. 不使用间距特性，并在用户层设置`spacing={0}`上实现它。
2. 在父元素中添加一个填充（padding），至少是间隔值。
```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={40}>
        //...
      </Grid>
    </div>
  </body>
```
3. 在父元素上添加 `overflow-x: hidden;` 
