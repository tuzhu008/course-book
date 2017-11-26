# 常见问题

坚持一个特定的问题?
首先检查一下这些常见的gotchas。

如果你仍然找不到你想要的东西，你可以在[gitter](https://gitter.im/callemall/material-ui)上询问社区。

关于怎样提问和其他非issues，请使用[StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) 代替 Github issues.。那里有一个名为`material-ui`的标签，你可以用来标记的问题 。

## 当一个modal被打开时，为什么fixed定位的元素素会移动?

当一个模态框被打开时，我们就会阻止滚动。
当模态框是唯一的交互内容时，它阻止与背景交互。

但是，删除滚动条可以使您的fixed定位的元素移动。
在这种情况下，您可以应用全局`.mui-fixed`类名，用来告诉Material-UI来处理这些元素。


## 我怎样才能禁用整个应用程序的连锁反应呢?

迄今为止最好的解决方案是为所有显示波纹的Material-UI组件编写包装组件。
连锁反应只来自`BaseButton`组件。

[您可以在以下链接中找到使用BaseButton组件](https://github.com/callemall/material-ui/search?utf8=%E2%9C%93&q=%22%2F%2F+%40inheritedComponent+ButtonBase%22)。然后，你所要做的就是提供`disableRipple`属性。

## 我们什么时候使用行内样式 vs `withStyles()`?

作为一个经验法则，只使用行内样式的动态样式属性。替代CSS提供了更多的优势。命名这些属性中的其中一些:
- auto-prefixing
- better debugging
- allow media queries
- allow keyframes

## 怎样组合`withStyles()` 和 `withTheme()` 高阶组件?

有很多不同的选择:

1. `withTheme` 选项:
```js
export default withStyles(styles, { withTheme: true })(Modal);
```
2. `compose()` 辅助函数:
```js
import { compose } from 'recompose';

export default compose(
  withTheme(),
  withStyles(styles)
)(Modal);
```
3. 原始函数连接:
```js
export default withTheme()(withStyles(styles)(Modal));
```

## Material-UI 真是太棒了。我怎样才能支持这个项目?

有很多方法可以支持我们。改善 [这个文档](https://github.com/callemall/material-ui/tree/v1-beta/docs)。帮助别人开始。 [传播这个词](https://twitter.com/MaterialUI)。回答 [StackOverflow 上的问题](https://stackoverflow.com/questions/tagged/material-ui).
