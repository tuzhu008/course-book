Recompose
-----

[![build status](https://img.shields.io/travis/acdlite/recompose/master.svg?style=flat-square)](https://travis-ci.org/acdlite/recompose)
[![coverage](https://img.shields.io/codecov/c/github/acdlite/recompose.svg?style=flat-square)](https://codecov.io/github/acdlite/recompose)
[![code climate](https://img.shields.io/codeclimate/github/acdlite/recompose.svg?style=flat-square)](https://codeclimate.com/github/acdlite/recompose)
[![npm version](https://img.shields.io/npm/v/recompose.svg?style=flat-square)](https://www.npmjs.com/package/recompose)
[![npm downloads](https://img.shields.io/npm/dm/recompose.svg?style=flat-square)](https://www.npmjs.com/package/recompose)

Recompose 是适合于函数组件和高阶组件打造的功能腰带。把它想象成适合React的lodash。

[**完整的API文档**](docs/API.md) - 了解每一个助手

[**Recompose Base Fiddle**](https://jsfiddle.net/samsch/p3vsmrvo/24/) - 容易的方法:

```
npm install recompose --save
```

**📺 观看 Andrew's [talk on Recompose at React Europe](https://www.youtube.com/watch?v=zD_judE-bXk).**

### 相关模块

[**recompose-relay**](src/packages/recompose-relay) — 适用于Relay的Recompose helpers

## 你可以使用Recompose 来...

### ...将state提升到函数包装器

`withState()` 和 `withReducer()`助手提供一个种更好的方式来表达状态更新:

```js
const enhance = withState('counter', 'setCounter', 0)
const Counter = enhance(({ counter, setCounter }) =>
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
)
```

或者 with a Redux-style reducer:

```js
const counterReducer = (count, action) => {
  switch (action.type) {
  case INCREMENT:
    return count + 1
  case DECREMENT:
    return count - 1
  default:
    return count
  }
}

const enhance = withReducer('counter', 'dispatch', counterReducer, 0)
const Counter = enhance(({ counter, dispatch }) =>
  <div>
    Count: {counter}
    <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
    <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
  </div>
)
```

### ...执行最常见的React模式

Helpers like `componentFromProp()` 和 `withContext()`助手 将常见的React模式封装到一个简单的功能接口中:

```js
const enhance = defaultProps({ component: 'button' })
const Button = enhance(componentFromProp('component'))

<Button /> // renders <button>
<Button component={Link} /> // renders <Link />
```

```js
const provide = store => withContext(
  { store: PropTypes.object },
  () => ({ store })
)

// 适用于基础组件
// 应用程序的后代可以访问context.store
const AppWithContext = provide(store)(App)
```

### ...优化渲染性能

不需要编写一个新的类来实现`shouldComponentUpdate()`。Recompose的`pure()` 和 `onlyUpdateForKeys()`助手来帮你做这件事。

```js
// A component that is expensive to render
const ExpensiveComponent = ({ propA, propB }) => {...}

// 相同组件的优化版本, 使用了props的浅比较
// 和React.PureComponent的效果时一样的
const OptimizedComponent = pure(ExpensiveComponent)

// 更优化的是:只有在特定的prop键改变时才会更新
const HyperOptimizedComponent = onlyUpdateForKeys(['propA', 'propB'])(ExpensiveComponent)
```

### ...与其他库相互操作

Recompose 助手与外部库的集成非常好，如 Relay, Redux, and RxJS

```js
const enhance = compose(
  // 这是由recompose-relay提供的，Relay.createContainer()的Recompose友好版本。
  createContainer({
    fragments: {
      post: () => Relay.QL`
        fragment on Post {
          title,
          content
        }
      `
    }
  }),
  flattenProp('post')
)

const Post = enhance(({ title, content }) =>
  <article>
    <h1>{title}</h1>
    <div>{content}</div>
  </article>
)
```

### ...构建你自己的库

许多React库最终会一次又一次地实现相同的实用工具，就像`shallowEqual()`和`getDisplayName()`。Recompose为您提供这些实用工具。


```js
// 任何Recompose合模块都可以单独导入
import getDisplayName from 'recompose/getDisplayName'
ConnectedComponent.displayName = `connect(${getDisplayName(BaseComponent)})`

// 或者, 甚至更好的:
import wrapDisplayName from 'recompose/wrapDisplayName'
ConnectedComponent.displayName = wrapDisplayName(BaseComponent, 'connect')

import toClass from 'recompose/toClass'
// 将一个函数组件转换为一个类组件, 比如 所以可以给它一个ref。 返回的类组件像这样：
const ClassComponent = toClass(FunctionComponent)
```

### ...更多

## API 文档

[阅读它们](docs/API.md)

## Flow 支持

[阅读这个](types)

## 翻译

[繁体中文文档](https://github.com/neighborhood999/recompose)

## Why

忘了 ES6 class 和 `createClass()`吧。

一个惯用的React应用程序主要由许多函数组件构成。

```js
const Greeting = props =>
  <p>
    Hello, {props.name}!
  </p>
```

功能组件有几个关键优势:

- 他们可以防止滥用`setState()` API, 以props代替.
- 他们鼓励 ["smart" vs. "dumb" 组件模式](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
- 它们鼓励使用可复用和模块化的代码。
- 他们不鼓励那些做太多事情的复杂的、复杂的组件。
- 在将来，它们将允许React通过避免不必要的检查和内存分配来进行性能优化。

(注意，虽然Recompose推荐尽可能地使用函数组件，但是它仍可以与普通的React组件一同工作)

### 高阶组件让一切变得简单

大多数时候，当我们讨论在React中构成时，我们讨论的是组件的构成。例如，`<Blog>`组件可能由许多`<Post>`组件组成，而`<Post>`组件又是由许多`<Comment>`组件组成的。

Recompose的重点是另一个组成单元:**高阶组件**(HoCs)。HoCs是接受基本组件并返回带有附加功能的新组件的函数。它们可以用于将公共任务抽象为可重用的部分。

Recompose为创建高阶组件提供了一个辅助函数的工具箱。

## [我应该使用它吗?担心性能和其他问题](docs/performance.md)

## 用法

所有函数都可以在顶级export中使用。

```js
import { compose, mapProps, withState /* ... */ } from 'recompose'
```

**注意:** `react` is a _peer dependency_ of Recompose.  如果你正在使用 `preact`, 添加下面的代码到你的 `webpack.config.js`:

```js
resolve: {
  alias: {
    react: "preact"
  }
}
```

### 组合

Recompose助手被设计为可组合的:

```js
const BaseComponent = props => {...}

// 这很有用，但很乏味
let EnhancedComponent = pure(BaseComponent)
EnhancedComponent = mapProps(/*...args*/)(EnhancedComponent)
EnhancedComponent = withState(/*...args*/)(EnhancedComponent)

// 这样做来替代之前的做法
// 注意，下面的顺序与上面不一样，需要颠倒- props 流是从上到下的。因为要一层一层返回。
const enhance = compose(
  withState(/*...args*/),
  mapProps(/*...args*/),
  pure
)
const EnhancedComponent = enhance(BaseComponent)
```

从技术上讲，这也意味着您可以将它们作为装饰器使用(取自於你的決定):

```js
@withState(/*...args*/)
@mapProps(/*...args*/)
@pure
class Component extends React.Component {...}
```

### 优化包的大小

由于 `0.23.1`版本的 recompose 得到了 ES2015 模块的支持。 要減少包大小，你需要使用支持树摇晃的打包器像是如[webpack 2](https://github.com/webpack/webpack) 或 [Rollup](https://github.com/rollup/rollup).


#### 使用 babel-lodash-plugin

[babel-lodash-plugin](https://github.com/lodash/babel-plugin-lodash) 不仅限适用于 [lodash](https://github.com/lodash/lodash).  它可以与`recompose` 很好的工作.

这可以通过在`.babelrc`中更新`lodash`配置来完成。

```diff
 {
-  "plugins": ["lodash"]
+  "plugins": [
+    ["lodash", { "id": ["lodash", "recompose"] }]
+  ]
 }
```

在此之后，您可以像下面那样进行导入，而不需要实际包含整个库的内容。

```js
import { compose, mapProps, withState } from 'recompose'
```

## 谁在使用Recompose

如果您的公司或项目使用了Recompose，请通过[编辑](https://github.com/acdlite/recompose/wiki/Sites-Using-Recompose/_edit)wiki页面将其添加到[正式的用户列表](https://github.com/acdlite/recompose/wiki/Sites-Using-Recompose)中。

## Recipes的灵感
我们有一个社区驱动的 Recipes 页面。 这是一个分享和看到recompose模式灵感的地方。请新增到[Recipes](https://github.com/acdlite/recompose/wiki/Recipes).

## 反馈

项目仍处于早期阶段。如果你有建议，请提出问题或提交PR。 或者在 [Twitter](https://twitter.com/acdlite)上 @我 (Andrew Clark) .


## 获得帮助

**关于支持和使用的问题，像 “如何用Recompose来做X” 和 “我们的代码不能工作”, 请首先在 [StackOverflow 的Recompose标签](http://stackoverflow.com/questions/tagged/recompose?sort=votes&pageSize=50) 下提问.**

我们要求你这么做是StackOverflow可以让常见的可以被看到。不幸的是，在Github上好的答案可能会丢失。

有些问题需要很长时间才能得到答案。 **如果你的问题被关闭了或者你在StackOverflow上超过几天没有得到回复** 我们鼓励你发表一个与你的问题有关的issue。我们将关闭你的问题，但这将让人们有就会在repo看到你的问题并在StackOverflow上回答这个问题。

请原谅我们这么做，因为这不是issue tracker的主要目的。

### 帮助我们也帮助你

在这两个网站上，用一种易于阅读的方式来组织你的代码和问题，以吸引人们去回答它。例如，我们鼓励您在段落中使用语法高亮、缩进和分割文本。

请记住，人们会把他们的空闲时间用来帮助你。如果您提供相关库的版本和一个可运行的小项目来重现您的问题，那么您可以使它们变得更容易。您可以将代码放在[JSBin](http://jsbin.com) 上，或者在GitHub上进行更大的项目。确保所有必要的依赖项都在`package.json` 。因此，任何人都可以运行`npm install && npm start`并重现您的问题。