# API

在这份API 文档中,  **higher-order component** (HOC) 指的是接收一个单一React组件并返回一个新的React组件的函数。

```js
const EnhancedComponent = hoc(BaseComponent)
```

这种形式使HOC (有时候被称为 **enhancers（增强剂）**) 可以被组合:

```js
const composedHoc = compose(hoc1, hoc2, hoc3)

// 一样
const composedHoc = BaseComponent => hoc1(hoc2(hoc3(BaseComponent)))
```

大多数Recompose助手是 **返回高阶组件的函数**:

```js
const hoc = mapProps(ownerProps => childProps)
const EnhancedComponent = hoc(BaseComponent)

// 一样
const EnhancedComponent = mapProps(ownerProps => childProps)(BaseComponent)
```

有些, 像 `pure`函数, 是高阶组件本身:

```js
const PureComponent = pure(BaseComponent)
```

## TOC

* [高阶组件](#higher-order-components)
  + [`mapProps()`](#mapprops)
  + [`withProps()`](#withprops)
  + [`withPropsOnChange()`](#withpropsonchange)
  + [`withHandlers()`](#withhandlers)
  + [`defaultProps()`](#defaultprops)
  + [`renameProp()`](#renameprop)
  + [`renameProps()`](#renameprops)
  + [`flattenProp()`](#flattenprop)
  + [`withState()`](#withstate)
  + [`withStateHandlers()`](#withstatehandlers)
  + [`withReducer()`](#withreducer)
  + [`branch()`](#branch)
  + [`renderComponent()`](#rendercomponent)
  + [`renderNothing()`](#rendernothing)
  + [`shouldUpdate()`](#shouldupdate)
  + [`pure()`](#pure)
  + [`onlyUpdateForKeys()`](#onlyupdateforkeys)
  + [`onlyUpdateForPropTypes()`](#onlyupdateforproptypes)
  + [`withContext()`](#withcontext)
  + [`getContext()`](#getcontext)
  + [`lifecycle()`](#lifecycle)
  + [`toClass()`](#toclass)
* [静态属性助手](#static-property-helpers)
  + [`setStatic()`](#setstatic)
  + [`setPropTypes()`](#setproptypes)
  + [`setDisplayName()`](#setdisplayname)
* [实用工具](#utilities)
  + [`compose()`](#compose)
  + [`getDisplayName()`](#getdisplayname)
  + [`wrapDisplayName()`](#wrapdisplayname)
  + [`shallowEqual()`](#shallowequal)
  + [`isClassComponent()`](#isclasscomponent)
  + [`createSink()`](#createsink)
  + [`componentFromProp()`](#componentfromprop)
  + [`nest()`](#nest)
  + [`hoistStatics()`](#hoiststatics)
* [可观测的实用工具](#observable-utilities)
  + [`componentFromStream()`](#componentfromstream)
  + [`componentFromStreamWithConfig()`](#componentfromstreamwithconfig)
  + [`mapPropsStream()`](#mappropsstream)
  + [`mapPropsStreamWithConfig()`](#mappropsstreamwithconfig)
  + [`createEventHandler()`](#createeventhandler)
  + [`createEventHandlerWithConfig()`](#createeventhandlerwithconfig)
  + [`setObservableConfig()`](#setobservableconfig)

## Higher-order components

### `mapProps()`

```js
mapProps(
  propsMapper: (ownerProps: Object) => Object,
): HigherOrderComponent
```
接收一个函数，将所有者的props映射到一批新的props，然后被传递给基组件。

`mapProps()` 与函数化的实用工具库进行良好的组合，如 [lodash/fp](https://github.com/lodash/lodash/tree/npm/fp). 例如，Recompose并没有附带一个`omitProps()`函数，但是您可以使用lodash-fp的`omit()`轻松构建一个函数:

```js
const omitProps = keys => mapProps(props => omit(keys, props))

// 因为在lodash-fp中，这是相同的
const omitProps = compose(mapProps, omit)
```

### `withProps()`

```js
withProps(
  createProps: (ownerProps: Object) => Object | Object
): HigherOrderComponent
```

如同 `mapProps()`, 除了新创建的prop会与所有者props合并。

您可以直接传递一个props对象，而不是一个函数。在这种形式中，它类似于`defaultProps()`，除了提供的props比所有者的props更优先。


### `withPropsOnChange()`

```js
withPropsOnChange(
  shouldMapOrKeys: Array<string> | (props: Object, nextProps: Object) => boolean,
  createProps: (ownerProps: Object) => Object
): HigherOrderComponent
```

如同 `withProps()`, 除了只有当一个所有者的props的道具被`shouldMapOrKeys`改变指定时，才会创建新的props。这有助于确保`createProps()`内部的昂贵计算只有在必要时才会执行。

替代一个prop键数组，第一个参数也可以是一个接收当前的props和下一个props，然后返回一个布尔值的函数。这允许您自定义什么时候`createProps()`应该被调用。

### `withHandlers()`

```js
withHandlers(
  handlerCreators: {
    [handlerName: string]: (props: Object) => Function
  } |
  handlerCreatorsFactory: (initialProps) => {
    [handlerName: string]: (props: Object) => Function
  }
): HigherOrderComponent
```

获取处理程序创建者或工厂函数的对象映射。这些是高阶函数，它们接受一组props并返回一个函数处理程序:

这允许处理程序通过闭包来访问当前的props，而不需要更改它的签名。

处理程序被传递给基组件，作为不可变的props，它们的标识在整个渲染中被保留。这避免了一个常见的陷阱，即函数组件在函数体中创建处理程序，从而在每个渲染中都有一个新的处理程序，并在顺流而下的  `shouldComponentUpdate()`进行依赖于prop相等的优化。这是使用`withHandlers`来创建处理程序的主要原因，而不是使用`mapProps` 和 `withProps`，这将在每次更新时创建新的处理程序。

使用的例子:


```js
const enhance = compose(
  withState('value', 'updateValue', ''),
  withHandlers({
    onChange: props => event => {
      props.updateValue(event.target.value)
    },
    onSubmit: props => event => {
      event.preventDefault()
      submitForm(props.value)
    }
  })
)

const Form = enhance(({ value, onChange, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <label>Value
      <input type="text" value={value} onChange={onChange} />
    </label>
  </form>
)
```

### `defaultProps()`

```js
defaultProps(
  props: Object
): HigherOrderComponent
```

Specifies props to be passed by default to the base component. Similar to `withProps()`, except the props from the owner take precedence over props provided to the HoC.
指定在默认情况下传递给基组件的props。类似于`withProps()`,除了所有者的props优先于提供给HoC的props。

尽管它也有类似的效果，使用`defaultProps()`HoC是不同于在组件上直接设置静态`defaultProps` 属性的。


### `renameProp()`

```js
renameProp(
  oldName: string,
  newName: string
): HigherOrderComponent
```

重命名一个单一的prop.

### `renameProps()`

```js
renameProps(
  nameMap: { [key: string]: string }
): HigherOrderComponent
```
重命名多个prop，使用将旧prop名字映射到新prop的名字。

### `flattenProp()`

```js
flattenProp(
  propName: string
): HigherOrderComponent
```

Flattens a prop so that its fields are spread out into the props object.扁平化一个prop，使它的字段被分散到props对象中。

```js
const enhance = compose(
  withProps({
    object: { a: 'a', b: 'b' },
    c: 'c'
  }),
  flattenProp('object')
)
const Abc = enhance(BaseComponent)

// Base component receives props: { a: 'a', b: 'b', c: 'c', object: { a: 'a', b: 'b' } }
```

`flattenProp()`的一个用例是，当从Relay接收片段数据时。Relay片段作为一个props对象被传递，你通常想把它平铺到它的组成字段:

```js
// `post` prop是一个带有 title, author, 和 content 字段的对象。
const enhance = flattenProp('post')
const Post = enhance(({ title, content, author }) =>
  <article>
    <h1>{title}</h1>
    <h2>By {author.name}</h2>
    <div>{content}</div>
  </article>
)
```

### `withState()`

```js
withState(
  stateName: string,
  stateUpdaterName: string,
  initialState: any | (props: Object) => any
): HigherOrderComponent
```

向基本组件传递两个额外的prop:一个状态值和一个更新该状态值的函数。状态更新器具有以下签名:

```js
stateUpdater<T>((prevValue: T) => T, ?callback: Function): void
stateUpdater(newValue: any, ?callback: Function): void
```

第一个表单接受一个函数，该函数将前一个状态值映射到一个新的状态值。您可能想要使用这个状态更新器和`withHandlers()`来创建特定的更新器函数。例如，创建一个为组件添加基本计数功能的HoC:


```js
const addCounting = compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    increment: ({ setCounter }) => () => setCounter(n => n + 1),
    decrement: ({ setCounter }) => () =>  setCounter(n => n - 1),
    reset: ({ setCounter }) => () => setCounter(0)
  })
)
```

第二个表单接受一个单独的值，该值被用作新状态。

这两个表单都接受一个可选的第二个参数，一个回调函数，该函数将在`setState()`后执行完成并重新渲染组件。

初始状态值是**必需的**。它可以是状态值本身，也可以是给定初始props返回初始状态的函数。

### `withStateHandlers()`

```js
withStateHandlers(
  initialState: Object | (props: Object) => any,
  stateUpdaters: {
    [key: string]: (state:Object, props:Object) => (...payload: any[]) => Object
  }
)

```

以某种形式`(...payload: any[]) => Object`传递状态对象属性和不可变的更新函数到基本组件。

每个状态更新函数都接受state、props和有效负载，并且必须返回一个新的state或undefined。这个新state与以前的state是浅合并的。
返回未定义并不会导致组件重新渲染。

例子:

```js
  const Counter = withStateHandlers(
    ({ initialCounter = 0 }) => ({
      counter: initialCounter,
    }),
    {
      incrementOn: ({ counter }) => (value) => ({
        counter: counter + value,
      }),
      decrementOn: ({ counter }) => (value) => ({
        counter: counter - value,
      }),
      resetCounter: (_, { initialCounter = 0 }) => () => ({
        counter: initialCounter,
      }),
    }
  )(
    ({ counter, incrementOn, decrementOn, resetCounter }) =>
      <div>
        <Button onClick={() => incrementOn(2)}>Inc</Button>
        <Button onClick={() => decrementOn(3)}>Dec</Button>
        <Button onClick={resetCounter}>Reset</Button>
      </div>
  )
```

### `withReducer()`

```js
withReducer<S, A>(
  stateName: string,
  dispatchName: string,
  reducer: (state: S, action: A) => S,
  initialState: S | (ownerProps: Object) => S
): HigherOrderComponent
```


类似于`withState()`，但是状态更新是应用一个reducer函数。reducer是接收state和action的函数，并返回一个新状态。

向基本组件传递两个额外的props:一个状态值和一个dispatch方法。dispatch方法向reducer发送一个action，接着新的状态被应用。

### `branch()`

```js
branch(
  test: (props: Object) => boolean,
  left: HigherOrderComponent,
  right: ?HigherOrderComponent
): HigherOrderComponent
```

接收一个测试函数和两个高阶组件。测试函数从所有者传递props。如果它返回true，则将`left`高阶组件应用到`BaseComponent`;否则，将应用`right`高阶组件。如果没有提供`right`选项，则默认情况下会渲染包裹组件。

### `renderComponent()`

```js
renderComponent(
  Component: ReactClass | ReactFunctionalComponent | string
): HigherOrderComponent
```

获取一个组件并返回该组件的高阶组件版本。

这和另一个需要高阶组件的helper相结合很有用，比如`branch()`:

```js
// `isLoading()` 是一个函数，它返回一个组件是否处于加载状态。
const spinnerWhileLoading = isLoading =>
  branch(
    isLoading,
    renderComponent(Spinner) // `Spinner` 是一个React组件
  )

// 现在使用 `spinnerWhileLoading()`助手来添加一个loading spinner到任意基础组件。 
const enhance = spinnerWhileLoading(
  props => !(props.title && props.author && props.content)
)
const Post = enhance(({ title, author, content }) =>
  <article>
    <h1>{title}</h1>
    <h2>By {author.name}</h2>
    <div>{content}</div>
  </article>
)
```

### `renderNothing()`

```js
renderNothing: HigherOrderComponent
```

一个始终渲染`null`的高阶组件.

这对于结合其他高阶组件非常有用，如 `branch()`:

```js
// `hasNoData()`是一个函数，如果组件没有数据，它返回true 
const hideIfNoData = hasNoData =>
  branch(
    hasNoData,
    renderNothing
  )

// 现在使用 `hideIfNoData()`助手来隐藏任意基础组件
const enhance = hideIfNoData(
  props => !(props.title && props.author && props.content)
)
const Post = enhance(({ title, author, content }) =>
  <article>
    <h1>{title}</h1>
    <h2>By {author.name}</h2>
    <div>{content}</div>
  </article>
)
```

### `shouldUpdate()`

```js
shouldUpdate(
  test: (props: Object, nextProps: Object) => boolean
): HigherOrderComponent
```

[`shouldComponentUpdate()`](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate)的高阶组件版本。。测试函数接受当前的props和下一个props。


### `pure()`

```js
pure: HigherOrderComponent
```

阻止组件更新，除非一个prop发生了改变。使用`shallowEqual()`测试更改。
Prevents the component from updating unless a prop has changed. Uses `shallowEqual()` to test for changes.

### `onlyUpdateForKeys()`

```js
onlyUpdateForKeys(
  propKeys: Array<string>
): HigherOrderComponent
```

阻止组件更新，除非与某个给定键对应的一个prop更新了。使用`shallowEqual()`测试更改。

这是一个比使用PureRenderMixin的流行方式更优化的用法。流行的方式有`shouldPureComponentUpdate()`或者是Recompose自己的`pure()`助手，因为这些工具比较*每一个*prop，而只有`onlyUpdateForKeys()`只关心你指定的props。

示例:

```js
/**
 *如果所有者传递了不必要的props(例如，一个注释数组)，它不会导致浪费的渲染周期。
 *顺利进行了解构，因为很清楚哪些props是组件真正关心的。
 */
const enhance = onlyUpdateForKeys(['title', 'content', 'author'])
const Post = enhance(({ title, content, author }) =>
  <article>
    <h1>{title}</h1>
    <h2>By {author.name}</h2>
    <div>{content}</div>
  </article>
)
```

### `onlyUpdateForPropTypes()`

```js
onlyUpdateForPropTypes: HigherOrderComponent
```

就像`onlyUpdateForKeys()`一样工作，但是，会从基本组件的`propTypes` 推断出props键。与`setPropTypes()`一起使用。

如果基本组件没有任何`propTypes`，组件将永远不会收到任何更新。这可能不是预期的行为，因此会将警告打印到控制台。

```js
import PropTypes from 'prop-types'; // 你需要导入prop-types.查看https://facebook.github.io/react/docs/typechecking-with-proptypes.html

const enhance = compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired
  })
)

const Post = enhance(({ title, content, author }) =>
  <article>
    <h1>{title}</h1>
    <h2>By {author.name}</h2>
    <div>{content}</div>
  </article>
)
```

### `withContext()`

```js
withContext(
  childContextTypes: Object,
  getChildContext: (props: Object) => Object
): HigherOrderComponent
```

Provides context to the component's children. `childContextTypes` is an object of React prop types. `getChildContext()` is a function that returns the child context. Use along with `getContext()`.
为组件的子元素提供上下文。`childContextTypes`是一个React prop 类型的对象。`getChildContext()`是返回子上下文的函数。和`getContext()`一同使用。

### `getContext()`

```js
getContext(
  contextTypes: Object
): HigherOrderComponent
```

从上下文获取值并将它们作为props传递。和`withContext()`一同使用。

### `lifecycle()`

```js
lifecycle(
  spec: Object,
): HigherOrderComponent
```
[`React.Component()`](https://facebook.github.io/react/docs/react-api.html#react.component)的高阶组件版本。它支持整个`Component`API，除了`render()`方法，默认情况下它是实现了的(如果指定，则覆盖;一个错误将被记录到控制台)。如果您需要访问组件生命周期方法，那么您应该使用这个帮助器作为一个escape hatch。

生命周期方法中的任何通过使用setState发生的状态更改，都将被传播到被包裹的组件作为props。


### `toClass()`

```js
toClass: HigherOrderComponent
```

获取一个函数组件并将其包裹在一个类中。这可以被用作为对需要向组件添加ref的库的回退方案，比如Relay。

如果基本组件已经是一个类，那么它将返回给定的组件。

## Static property helpers

静态属性助手

这些函数看起来就像高阶组件助手，— they are curried and component-last。然而，它们不是返回一个新组件，而是通过设置或覆盖一个静态属性来改变基本组件。

### `setStatic()`

```js
setStatic(
  key: string,
  value: any
): HigherOrderComponent
```

在基本组件上分配一个值到一个静态属性。

### `setPropTypes()`

```js
setPropTypes(
  propTypes: Object
): HigherOrderComponent
```

分配到基础组件上的`propTypes`属性。

### `setDisplayName()`

```js
setDisplayName(
  displayName: string
): HigherOrderComponent
```
分配到基础组件上的 `displayName`属性。

## Utilities

实用工具

Recompose还包括一些不是高阶组件的附加助手，但仍然有用。

### `compose()`

```js
compose(...functions: Array<Function>): Function
```

用来将多个高阶组件组合成一个高阶组件。这与Redux中的同名函数或lodash的`flowRight()`完全相同。

### `getDisplayName()`

```js
getDisplayName(
  component: ReactClass | ReactFunctionalComponent
): string
```

返回一个React组件的显示名称。落回到`'Component'`。

### `wrapDisplayName()`

```js
wrapDisplayName(
  component: ReactClass | ReactFunctionalComponent,
  wrapperName: string
): string
```

返回一个被包裹的React组件的显示名。例如，如果`component`的显示名是`'Post'`，而`wrapperName`是`'mapProps'`，则返回值是`'mapProps(Post)'`。大多数Recompose高阶组件使用了`wrapDisplayName()`。

### `shallowEqual()`

```js
shallowEqual(a: Object, b: Object): boolean
```

如果对象是浅相等的，则返回true。

### `isClassComponent()`

```js
isClassComponent(value: any): boolean
```

如果给定的值是一个React组件类，则返回true。

### `createSink()`

```js
createSink(callback: (props: Object) => void): ReactClass
```

创建一个不渲染任何东西(null)的组件，但在接收新props时调用一个回调。

### `componentFromProp()`

```js
componentFromProp(propName: string): ReactFunctionalComponent
```

创建一个组件，它接受一个组件作为一个prop，然后用剩下的props来渲染它。

例子:

```js
const enhance = defaultProps({ component: 'button' })
const Button = enhance(componentFromProp('component'))

<Button foo="bar" /> // renders <button foo="bar" />
<Button component="a" foo="bar" />  // renders <a foo="bar" />
<Button component={Link} foo="bar" />  // renders <Link foo="bar" />
```

### `nest()`

```js
nest(
  ...Components: Array<ReactClass | ReactFunctionalComponent | string>
): ReactClass
```

通过在前一个内部嵌套来组成组件。例如:通过嵌套之前的在函数里的每一个组件来组合组件，例如

```js
// 给定组件 A, B, 和 C
const ABC = nest(A, B, C)
<ABC pass="through">Child</ABC>

// 与这样效果一样
<A pass="through">
  <B pass="through">
    <C pass="through">
      Child
    </C>
  </B>
</A>
```

### `hoistStatics()`

```js
hoistStatics(hoc: HigherOrderComponent): HigherOrderComponent
```

增加一个高阶组件，使之可以被使用，它将非React静态属性从基础组件复制到新组件。这对于使Recompose和像Relay一起使用很有帮助的。

注意，这只能升高*非React*静态属性。下面的静态属性将不会被升高:`childContextTypes`, `contextTypes`, `defaultProps`, `displayName`, `getDefaultProps`, `mixins`, `propTypes`, 和 `type`。下面的原生静态方法也会被忽略:`name`, `length`, `prototype`, `caller`, `arguments`, 和 `arity`.

## Observable utilities

可观测的实用工具

事实证明，大部分的React组件API都可以用可观察的方式表示:

- 代替 `setState()`, 组合多个流在一起。
- 代替`getInitialState()`, 使用 `startWith()` 或者 `concat()`.
- 替代 `shouldComponentUpdate()`, 使用 `distinctUntilChanged()`, `debounce()`, 等等.

其他好处包括:

- state和props没有区别
- 一切都是流（stream）。
- 无需担心来自事件侦听器的取消订阅。订阅是为您处理的。
- 横向数据加载非常简单——只需将props流与外部流结合起来。
- 访问可观察库的生态系统，如RxJS。


**Recompose的可观测使用工具可以配置来与其他可观测或类流库一同工作。  查看 [`setObservableConfig()`](#setobservableconfig) 下面的细节**

### `componentFromStream()`

```js
componentFromStream(
  propsToReactNode: (props$: Observable<object>) => Observable<ReactNode>
): ReactComponent
```

创建一个React组件，将一个可观察的props流映射到一个React节点(vdom)流。

你可以把`propsToReactNode`看作是一个函数`f`,这样

```js
const vdom$ = f(props$)
```
`props$`是props流，而`vdom`则是React节点流。这个公式类似于将React视图看作一个函数，它通常被认为是：

```
v = f(d)
```

例如:

```js
const Counter = componentFromStream(props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler()
  const { handler: decrement, stream: decrement$ } = createEventHandler()
  const count$ = Observable.merge(
      increment$.mapTo(1),
      decrement$.mapTo(-1)
    )
    .startWith(0)
    .scan((count, n) => count + n, 0)

  return props$.combineLatest(
    count$,
    (props, count) =>
      <div {...props}>
        Count: {count}
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
  )
})
```

### `componentFromStreamWithConfig()`

```js
componentFromStreamWithConfig<Stream>(
  config: {
    fromESObservable<T>: ?(observable: Observable<T>) => Stream<T>,
    toESObservable<T>: ?(stream: Stream<T>) => Observable<T>,
  }
) => (
  propsToReactNode: (props$: Stream<object>) => Stream<ReactNode>
): ReactComponent
```

替代 `componentFromStream()`，它接受一个可观察的配置，并返回一个自定义的使用指定的可观察库的 `componentFromStream()`。如果您想要避免使用`setobserveconfig()`的全局状态，则建议使用此选项。 

**注意:下面的配置模块没有包含在主导出中。您必须分别导入它们，如示例所示**

#### RxJS

```js
import rxjsConfig from 'recompose/rxjsObservableConfig'
const componentFromStream = componentFromStreamWithConfig(rxjsConfig)
```

#### RxJS 4 (legacy)

```js
import rxjs4Config from 'recompose/rxjs4ObservableConfig'
const componentFromStream = componentFromStreamWithConfig(rxjs4Config)
```

#### most

```js
import mostConfig from 'recompose/mostObservableConfig'
const componentFromStream = componentFromStreamWithConfig(mostConfig)
```

#### xstream

```js
import xstreamConfig from 'recompose/xstreamObservableConfig'
const componentFromStream = componentFromStreamWithConfig(xstreamConfig)
```

#### Bacon

```js
import baconConfig from 'recompose/baconObservableConfig'
const componentFromStream = componentFromStreamWithConfig(baconConfig)
```

#### Kefir

```js
import kefirConfig from 'recompose/kefirObservableConfig'
const componentFromStream = componentFromStreamWithConfig(kefirConfig)
```

#### Flyd

```js
import flydConfig from 'recompose/flydObservableConfig'
const componentFromStream = componentFromStreamWithConfig(flydConfig)
```

### `mapPropsStream()`

```js
mapPropsStream(
  ownerPropsToChildProps: (props$: Observable<object>) => Observable<object>,
  BaseComponent: ReactElementType
): ReactComponent
```

`componentFromStream()`的高阶组件版本 —
它接收一个函数，这个函数将一个可观察到的所有者props流映射到子props流，而不是直接映射到一个React节点的流。然后将子props传递给一个基本组件。

您可能希望使用该版本与其他重新组合的高阶组件助手进行互操作。

### `mapPropsStreamWithConfig()`
```js
mapPropsStreamWithConfig<Stream>(
  config: {
    fromESObservable<T>: ?(observable: Observable<T>) => Stream<T>,
    toESObservable<T>: ?(stream: Stream<T>) => Observable<T>,
  },
) => (
  ownerPropsToChildProps: (props$: Stream<object>) => Stream<object>,
  BaseComponent: ReactElementType
): ReactComponent
```

替代`mapPropsStream()`，它接受一个可观察的配置，并返回一个定制的使用指定的可观察库的`mapPropsStream()`它。见`componentFromStreamWithConfig()`上面的。

```js
const enhance = mapPropsStream(props$ => {
  const timeElapsed$ = Observable.interval(1000)
  return props$.combineLatest(timeElapsed$, (props, timeElapsed) => ({
    ...props,
    timeElapsed
  }))
})

const Timer = enhance(({ timeElapsed }) =>
  <div>Time elapsed: {timeElapsed}</div>
)
```

### `createEventHandler()`

```js
createEventHandler<T>(): {
  handler: (value: T) => void,
  stream: Observable<T>
}
```

返回具有属性`handler`和流的`stream`。`stream`是一个可观察的序列，`handler`是一个将新值推入序列的函数。用于创建像onClick这样的事件处理程序，像`onClick`。

### `createEventHandlerWithConfig()`
```js
createEventHandlerWithConfig<T>(
  config: {
    fromESObservable<T>: ?(observable: Observable<T>) => Stream<T>,
    toESObservable<T>: ?(stream: Stream<T>) => Observable<T>,
  }
) => (): {
  handler: (value: T) => void,
  stream: Observable<T>
}
```

替代`createEventHandler()` ，它接收一个可观测的配置，返回一个自定义的使用特定可观测库的`createEventHandler()` 。见 `componentFromStreamWithConfig()` 上.

### `setObservableConfig()`

```js
setObservableConfig<Stream>({
  fromESObservable<T>: ?(observable: Observable<T>) => Stream<T>,
  toESObservable<T>: ?(stream: Stream<T>) => Observable<T>
})
```

**注意: `setObservableConfig()` 使用全局状态，如果在一个旨在共享的程序包中使用，可能会破坏应用程序。 见`componentFromStreamWithConfig()` 和 `mapPropsStreamWithConfig()` 作为包作者的备选方案.**

Observables in Recompose are plain objects that conform to the [ES Observable proposal](https://github.com/zenparsing/es-observable). Usually, you'll want to use them alongside an observable library like RxJS so that you have access to its suite of operators. By default, this requires you to convert the observables provided by Recompose before applying any transforms:
Recompose中的可观测物是符合[ES 可观测提议](https://github.com/zenparsing/es-observable)的普通对象。通常，您需要将它们与RxJS这样的可观察库一起使用，这样您就可以访问它的操作符组了。默认情况下，这要求您在应用任何转换（transforms）之前转换（convert）由Recompose提供的可观察对象。

```js
mapPropsStream(props$ => {
  const rxjsProps$ = Rx.Observable.from(props$)
  // ...现在你可以使用 map, filter, scan, 等等.
  return transformedProps$
})
```

这很快就会变得乏味。胜于为每个流分别执行这个转换，`setObservableConfig()` 设置一个可自动应用的全局可观察转换。

```js
import Rx from 'rxjs'
import { setObservableConfig } from 'recompose'

setObservableConfig({
  // Converts a plain ES observable to an RxJS 5 observable
  fromESObservable: Rx.Observable.from
})
```

In addition to `fromESObservable`, the config object also accepts `toESObservable`, which converts a stream back into an ES observable. Because RxJS 5 observables already conform to the ES observable spec, `toESObservable` is not necessary in the above example. However, it is required for libraries like RxJS 4 or xstream, whose streams do not conform to the ES observable spec.
除了`fromESObservable`之外，配置对象还接受`toESObservable`，它将一个流转换回一个ES可观察对象。因为RxJS 5的可见观察对象已经符合了ES可观察的规范，所以在上面的例子中，`toESObservable`并不是必需的。但是，像RxJS 4或xstream这样的库是必需的，它们的流不符合ES可观察的规范。

幸运的是，您可能不需要担心如何为您最喜欢的流库配置Recompose，因为Recompose为您提供了一个简单的配置。

**注意: 下面的配置模块没有包含在主导出中。您必须分别导入它们，如示例所示.**

#### RxJS

```js
import rxjsconfig from 'recompose/rxjsObservableConfig'
setObservableConfig(rxjsconfig)
```

#### RxJS 4 (legacy)

```js
import rxjs4config from 'recompose/rxjs4ObservableConfig'
setObservableConfig(rxjs4config)
```

#### most

```js
import mostConfig from 'recompose/mostObservableConfig'
setObservableConfig(mostConfig)
```

#### xstream

```js
import xstreamConfig from 'recompose/xstreamObservableConfig'
setObservableConfig(xstreamConfig)
```

#### Bacon

```js
import baconConfig from 'recompose/baconObservableConfig'
setObservableConfig(baconConfig)
```

#### Kefir

```js
import kefirConfig from 'recompose/kefirObservableConfig'
setObservableConfig(kefirConfig)
```

#### Flyd

```js
import flydConfig from 'recompose/flydObservableConfig'
setObservableConfig(flydConfig)
```
