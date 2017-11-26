# 我应该使用这个? 性能和其他问题

我相信使用高阶组件助手会使组件更精巧、更集中(focused)的，并且提供比使用class更好的编程模型，像是 mapProps() 或 shouldUpdate() - 它們本質不是 class-y。

话虽如此，对现有API的任何抽象都将带来权衡。在向树中引入新组件时，会出现性能开销。我怀疑这一成本与通过使用`shouldComponentUpdate()`阻止子树进行重新渲染所获得的收益相比，可以忽略不计。——Recompose用它的`shouldUpdate()`和`onlyUpdateForKeys()` 助手使这变得容易。在将来，我会做一些基准测试，这样我们就能知道我们在做什么。

然而，许多Recompose的高阶组件助手是使用无状态函数组件实现的，而不是类组件。最终，React将包括对无状态组件的优化。在此之前，我们可以利用引用透明性来进行自己的优化。换句话说，从无状态函数中创建一个元素实际上等同于调用函数并返回它的输出。

\* *无状态的函数组件在访问上下文或使用默认的props时，不具有明显的透明性;我们通过检查`contextTypes`和`defaultProps`的存在来检测它。*

为了实现这一点，Recompose使用了`createElement()`的一个特殊版本，这个版本将返回无状态函数的输出，而不是创建一个新元素。对于类组件，它使用内建的`React.createElement()`。

我不会推荐在你的应用中大多数都是无状态函数组件的这种方法。首先，你失去了使用JSX的能力，除非你使用了monkey-patch `React.createElement()`，这是个坏主意。第二，你会失去惰性求值。考虑一下这两个组件之间的差异，因为`Comments`是一个无状态的函数组件:

```js
// 使用惰性求值
const Post = ({ title, content, comments, showComments }) => {
  const theComments = <Comments comments={comments} />;
  return (
    <article>
      <h1>title</h1>
      <div>{content}</div>
      {showComments ? theComments : null}
    </article>
  );
});

// 未使用惰性求值
const Post = ({ title, content, comments, showComments }) => {
  const theComments = Comments({ comments });
  return (
    <article>
      <h1>title</h1>
      <div>{content}</div>
      {showComments ? theComments : null}
    </article>
  );
});
```

在第一个示例中，`Comments`函数用于创建一个React元素，并且只有当`showComments`为真时React才会对其进行计算。在第二个示例中，不管`showComments`的值是什么，`Comments`函数都会在每个`Post`的渲染中进行计算。这可以通过将`Comments`调用放入三元运算语句中来解决，但是很容易忽略这种区别，并造成性能问题。作为一般规则，您应该始终创建一个元素。

那么为什么Recompose会打破这个规则呢?因为它是一个实用工具库，而不是一个应用程序。正如lodash将for循环作为其助手函数的实现细节一样，这对于Recompose避免中间的React元素作为(临时的)性能优化来说是好的。
