---
components: GridList, GridListTile, GridListTileBar, ListSubheader, IconButton
---

# Grid List

[Grid lists](https://www.google.com/design/spec/components/grid-lists.html)
是标准列表视图的另一种选择。
s网格列表由排列在垂直和水平布局的单元格的重复模式组成。

网格列表最好用于类似的数据类型。
它们有助于提高对所包含内容的视觉理解。

## 只有图片的Grid list

可滚动的图片`GridList`示例.

{{demo='pages/demos/grid-list/ImageGridList.js'}}

## 带标题栏的Grid list

这个例子演示了使用`GridListTileBar`来为每个`GridListTile`添加一个覆盖物。
覆盖物可以容纳`title`、`subtitle`和二次操作——在本例中是`IconButton`。

{{demo='pages/demos/grid-list/TitlebarGridList.js'}}

## Advanced Grid list （高级Grid list）

这个例子演示了“特色（featured）”的瓷砖，使用了`rows`和`cols`属性来调整瓷砖的大小，以及`padding`属性来调整间距。
这些瓷砖有一个定制的标题栏，放置在顶部，并带有一个自定义的渐变`titleBackground`。
第二个动作`IconButton`位于左侧。

{{demo='pages/demos/grid-list/AdvancedGridList.js'}}

## Single line Grid list （单行Grid list）

这个例子演示了一个水平可滚动的单行网格列表。
水平滚动的网格列表是不受鼓励的，因为滚动妨碍了典型的阅读模式，影响了理解。
一个值得注意的例外是水平滚动的单行的图片网格列表，比如一个画廊。

{{demo='pages/demos/grid-list/SingleLineGridList.js'}}
