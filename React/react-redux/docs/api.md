## API

<a id="provider"></a>
### `<Provider store>`

让Redux store可用,以使connect()在下面的组件层次结构中调用。通常，在没有包装一个父组件或祖先组件到`<Provider>`里情况下，您是不能使用`connect()`的。

如果您*确实*需要，您可以手动将`store`作为一个`props`传递到每一个被`connect()`的组件中，但是我们只建议在单元测试中为存根`store`这样做，或者在非完全React的代码库中这样做。通常情况下，您应该使用该程序。

#### Props

* `store` (*[Redux Store](http://cn.redux.js.org//docs/basics/Store.html)*): 应用程序中只有有一个单一的store.
* `children` (*React元素*) 根组件

#### 案例

##### Vanilla React

```js
ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
  rootEl
)
```

##### React Router

```js
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
```


<a id="connect"></a>
### `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

连接一个React组件到Redux store. `connect`是`connectAdvanced`的外观，为最常见的用例提供了一个方便的API。

它不修改传递给它的组件类;相反，它**返回**一个新的、连接的组件类，供您使用。

<a id="connect-arguments"></a>
#### Arguments

* [`mapStateToProps(state, [ownProps]): stateProps`] \(*函数*): 如果指定了这个参数，新组件将订阅Redux store的更新。这意味着任何时候store更新, `mapStateToProps` 都将被调用. `mapstatetoprop`的结果必须是一个简单的对象，它将被合并到组件的props中。如果您不想订阅store更新，可以通过`null`或`undefined`替代`mapStateToProps`。

如果你的`mapStateToProps`函数声明为两个参数,它将使用store state作为第一个参数和传递给连接组件的props作为第二个参数被调用,并且无论什么时候连接组件收到新的props（经过浅比较的）它都将被重新调用。(第二个参数按惯例通常是将其作为`ownProps`。)

  >注意: 在高级场景中，需要对渲染性能进行更多的控制，`mapStateToProps()`也可以返回一个函数。在本例中，*该函数*将被作为`mapStateToProps()`使用到特定的组件实例。这允许您对每个实例的进行记忆化（也就是缓存结果）。您可以参考[#279](https://github.com/reactjs/react-redux/pull/279)和测试它添加更多的细节。大多数应用都不需要这样做。

  >`mapStateToProps`函数接受整个Redux store的state的作为单一参数，并返回一个作为props被传递的对象。它通常被称为**选择器**。有效地利用[重新选择](https://github.com/reactjs/reselect)来有效地组合选择器和[计算导出的数据](http://redux.js.org/docs/recipes/ComputingDerivedData.html)。

* [`mapDispatchToProps(dispatch, [ownProps]): dispatchProps`] \(*对象* 或者 *函数*): 如果一个对象被传递，它内部的每个函数都被假定为Redux action 创建者。一个具有相同函数名的对象，但是将每个action创建者封装到一个`dispatch`调用中，这样它们就可以直接被调用，将被合并到组件的props中。

   如果一个函数被传递，它将作为第一个参数被`dipatch`。您需要返回一个对象，该对象以某种方式使用分派来以您自己的方式绑定动作创建者。你可以按你的方式来返回一个以某种方式使用`dispatch`来绑定action创建者的对象，(提示:您可以使用Redux中的 [bindActionCreators()](http://reactjs.github.io/redux/docs/api/bindActionCreators.html) 助手。)
  

  如果您的`mapDispatchToProps`函数被声明为带两个参数，那么`dispatch`将作为第一个参数被调用，并且props作为第二个参数传递给连接组件，当连接的组件接收到新的props时，函数将被重新调用。(第二个参数通常是按惯例将其作为`ownProps`。)


  如果您不提供自己的`mapDispatchToProps`函数或包含action创建者的对象，那么默认的`mapDispatchToProps`实现只将`dispatch`注入到你的组件的props中。

  >注意: 在高级场景中，需要对渲染性能进行更多的控制，`mapDispatchToProps()`也可以返回一个函数。在本例中，*该函数*将作为一个`mapDispatchToProps()`被用于特定的组件实例。这允许您执行每个实例的记忆化。您可以参考[# 279](https://github.com/reactjs/react-redux/pull/279)和测试它添加更多的细节。大多数应用都不需要这样。

* [`mergeProps(stateProps, dispatchProps, ownProps): props`] \(*函数*): 如果指定了，它将传递`mapStateToProps()`、`mapDispatchToProps()`的结果，以及父母的props。从它返回的普通对象将作为props传递到它的包裹组件。您可以指定这个函数来选择一个基于props的状态的一部分，或者将action创建者绑定到一个来自props的特定的变量上。如果你省略了它，默认使用`Object.assign({}, ownProps, stateProps, dispatchProps)`。

* [`options`] *(对象)* 如果指定了，进一步定制连接器的行为。除了可传递到`connectAdvanced()`的选项之外(见下面的)，`connect()`接受这些额外的选项:
  * [`pure`] *(布尔值)*: 为真,如果相关的props/state对象在它们各自的相等性检查中保持相等，`connect()`将避免重新渲染和调用`mapStateToProps`, `mapDispatchToProps`, 和 `mergeProps` 。假设包裹组件是一个“pure(纯)”组件，并且不依赖于任何输入或状态，除了它的props和所选的Redux store的state。默认值:`true`
  * [`areStatesEqual`] *(函数)*: 当 `pure`为真时， 将传入的store state与之前的值进行比较 默认值: `全等 (===)`
  * [`areOwnPropsEqual`] *(函数)*: 当 `pure`为真时， 将传入的props与之前的值进行比较 默认值: `相等 (==）`
  * [`areStatePropsEqual`] *(函数)*: 当 `pure`为真时，将 `mapStateToProps` 的结果和之前的值进行比较，默认值: `相等 (==）`
  * [`areMergedPropsEqual`] *(函数)*:当 `pure`为真时，将】 `mergeProps`的结果和之前的值进行比较， 默认值: `shallowEqual`
  * [`storeKey`] *(字符串)*: 它是读取store上下文的关键。如果您处于不明智的位置————拥有多个store，那么您可能只需要这样做。 默认值: `'store'`

<a id="connect-arguments-arity"></a>
##### Propsmapstatetoprop和mapDispatchToProps的参数数量决定了他们能不能接受own

> 注意: 如果函数的正式定义包含一个强制参数(函数的长度为1)，`ownProps` **不能被传递** 到 `mapStateToProps` 和 `mapDispatchToProps`。 比如, 像下面这样定义的函数不会接收`ownProps`作为第二个参数：
```javascript
function mapStateToProps(state) {
  console.log(state); // state
  console.log(arguments[1]); // undefined
}
```
```javascript
const mapStateToProps = (state, ownProps = {}) => {
  console.log(state); // state
  console.log(ownProps); // undefined
}
```
没有强制参数或两个参数的函数 **可以接收** `ownProps`.
```javascript
const mapStateToProps = (state, ownProps) => {
  console.log(state); // state
  console.log(ownProps); // ownProps
}
```
```javascript
function mapStateToProps() {
  console.log(arguments[0]); // state
  console.log(arguments[1]); // ownProps
}
```
```javascript
const mapStateToProps = (...args) => {
  console.log(args[0]); // state
  console.log(args[1]); // ownProps
}
```

<a id="connect-optimizing"></a>
##### 当`pure`选项为真时优化连接

当`pure`选项为真, `connect`执行几个相等检查，以避免对`mapStateToProps`、`mapDispatchToProps`、`mergeProps`以及最后的`render`的不必要的调用。这其中包括了`areStatesEqual`, `areOwnPropsEqual`, `areStatePropsEqual`, 和 `areMergedPropsEqual`。虽然默认值可能是99%的情况，但是您可能希望用自定义实现来覆盖它们，以优化性能或其他原因。下面是几个例子:

* 如果您的`mapStateToProps`函数的计算开销很大，并且你只关心state中的一小部分，那么您可能希望重写`areStatesEqual`。例如:`areStatesEqual: (next, prev) => prev.entities.todos === next.entities.todos`;这将有效地忽略对所有内容的状态更改。

* 如果您有不纯的，改变store state的reducers，您可能希望覆盖`areStatesEqual`来总是返回false(`areStatesEqual: () => false`)。(这也可能会影响其他的相等检查，取决于您的`mapStateToProps`函数。)

* You may wish to override `areOwnPropsEqual` as a way to whitelist incoming props. You'd also have to implement `mapStateToProps`, `mapDispatchToProps` and `mergeProps` to also whitelist props. (It may be simpler to achieve this other ways, for example by using [recompose's mapProps](https://github.com/acdlite/recompose/blob/master/docs/API.md#mapprops).)

* You may wish to override `areStatePropsEqual` to use `strictEqual` if your `mapStateToProps` uses a memoized selector that will only return a new object if a relevant prop has changed. This would be a very slight performance improvement, since would avoid extra equality checks on individual props each time `mapStateToProps` is called.

* You may wish to override `areMergedPropsEqual` to implement a `deepEqual` if your selectors produce complex props. ex: nested objects, new arrays, etc. (The deep equal check should be faster than just re-rendering.)

#### Returns

A higher-order React component class that passes state and action creators into your component derived from the supplied arguments. This is created by `connectAdvanced`, and details of this higher-order component are covered there.

<a id="connect-examples"></a>
#### Examples

##### Inject just `dispatch` and don't listen to store

```js
export default connect()(TodoApp)
```

##### Inject all action creators  (`addTodo`, `completeTodo`, ...) without subscribing to the store

```js
import * as actionCreators from './actionCreators'

export default connect(null, actionCreators)(TodoApp)
```

##### Inject `dispatch` and every field in the global state

>Don’t do this! It kills any performance optimizations because `TodoApp` will rerender after every state change.  
>It’s better to have more granular `connect()` on several components in your view hierarchy that each only  
>listen to a relevant slice of the state.

```js
export default connect(state => state)(TodoApp)
```

##### Inject `dispatch` and `todos`

```js
function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps)(TodoApp)
```

##### Inject `todos` and all action creators

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps, actionCreators)(TodoApp)
```

##### Inject `todos` and all action creators (`addTodo`, `completeTodo`, ...) as `actions`

```js
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

#####  Inject `todos` and a specific action creator (`addTodo`)

```js
import { addTodo } from './actionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTodo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

#####  Inject `todos` and specific action creators (`addTodo` and `deleteTodo`) with shorthand syntax
```js
import { addTodo, deleteTodo } from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

const mapDispatchToProps = {
  addTodo,
  deleteTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

##### Inject `todos`, todoActionCreators as `todoActions`, and counterActionCreators as `counterActions`

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

##### Inject `todos`, and todoActionCreators and counterActionCreators together as `actions`

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

##### Inject `todos`, and all todoActionCreators and counterActionCreators directly as props

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

##### Inject `todos` of a specific user depending on props

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state, ownProps) {
  return { todos: state.todos[ownProps.userId] }
}

export default connect(mapStateToProps)(TodoApp)
```

##### Inject `todos` of a specific user depending on props, and inject `props.userId` into the action

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
  })
}

export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)
```

##### Factory functions
Factory functions can be used for performance optimizations

```js
import { addTodo } from './actionCreators'

function mapStateToPropsFactory(initialState, initialProps) {
  const getSomeProperty= createSelector(...);
  const anotherProperty = 200 + initialState[initialProps.another];
  return function(state){
    return {
      anotherProperty,
      someProperty: getSomeProperty(state),
      todos: state.todos
    }
  }
}

function mapDispatchToPropsFactory(initialState, initialProps) {
  function goToSomeLink(){
    initialProps.history.push('some/link');
  }
  return function(dispatch){
    return {
      addTodo
    }
  }
}


export default connect(mapStateToPropsFactory, mapDispatchToPropsFactory)(TodoApp)
```

<a id="connectAdvanced"></a>
### `connectAdvanced(selectorFactory, [connectOptions])`

Connects a React component to a Redux store. It is the base for `connect()` but is less opinionated about how to combine `state`, `props`, and `dispatch` into your final props. It makes no assumptions about defaults or memoization of results, leaving those responsibilities to the caller.

It does not modify the component class passed to it; instead, it *returns* a new, connected component class for you to use.

<a id="connectAdvanced-arguments"></a>
#### Arguments

* `selectorFactory(dispatch, factoryOptions): selector(state, ownProps): props` \(*Function*): Initializes a selector function (during each instance's constructor). That selector function is called any time the connector component needs to compute new props, as a result of a store state change or receiving new props. The result of `selector` is expected to be a plain object, which is passed as the props to the wrapped component. If a consecutive call to `selector` returns the same object (`===`) as its previous call, the component will not be re-rendered. It's the responsibility of `selector` to return that previous object when appropriate.

* [`connectOptions`] *(Object)* If specified, further customizes the behavior of the connector.

  * [`getDisplayName`] *(Function)*: computes the connector component's displayName property relative to that of the wrapped component. Usually overridden by wrapper functions. Default value: `name => 'ConnectAdvanced('+name+')'`

  * [`methodName`] *(String)*: shown in error messages. Usually overridden by wrapper functions. Default value: `'connectAdvanced'`

  * [`renderCountProp`] *(String)*: if defined, a property named this value will be added to the props passed to the wrapped component. Its value will be the number of times the component has been rendered, which can be useful for tracking down unnecessary re-renders. Default value: `undefined`

  * [`shouldHandleStateChanges`] *(Boolean)*: controls whether the connector component subscribes to redux store state changes. If set to false, it will only re-render on `componentWillReceiveProps`. Default value:  `true`

  * [`storeKey`] *(String)*: the key of props/context to get the store. You probably only need this if you are in the inadvisable position of having multiple stores. Default value: `'store'`

  * [`withRef`] *(Boolean)*: If true, stores a ref to the wrapped component instance and makes it available via `getWrappedInstance()` method. Default value: `false`
 
  * Addionally, any extra options passed via `connectOptions` will be passed through to your `selectorFactory` in the `factoryOptions` argument.

<a id="connectAdvanced-returns"></a>
#### Returns

A higher-order React component class that builds props from the store state and passes them to the wrapped component. A higher-order component is a function which accepts a component argument and returns a new component.

##### Static Properties

* `WrappedComponent` *(Component)*: The original component class passed to `connectAdvanced(...)(Component)`.

##### Static Methods

All the original static methods of the component are hoisted.

##### Instance Methods

###### `getWrappedInstance(): ReactComponent`

Returns the wrapped component instance. Only available if you pass `{ withRef: true }` as part of the `options` argument.

#### Remarks

* Since `connectAdvanced` returns a higher-order component, it needs to be invoked two times. The first time with its arguments as described above, and a second time, with the component: `connectAdvanced(selectorFactory)(MyComponent)`.

* `connectAdvanced` does not modify the passed React component. It returns a new, connected component, that you should use instead.

<a id="connectAdvanced-examples"></a>
#### Examples

##### Inject `todos` of a specific user depending on props, and inject `props.userId` into the action
```js
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'

function selectorFactory(dispatch) {
  let ownProps = {}
  let result = {}
  const actions = bindActionCreators(actionCreators, dispatch)
  const addTodo = (text) => actions.addTodo(ownProps.userId, text)
  return (nextState, nextOwnProps) => {
    const todos = nextState.todos[nextOwnProps.userId]
    const nextResult = { ...nextOwnProps, todos, addTodo }
    ownProps = nextOwnProps
    if (!shallowEqual(result, nextResult)) result = nextResult
    return result
  }
}
export default connectAdvanced(selectorFactory)(TodoApp)
```

<a id="createProvider"></a>
### `createProvider([storeKey])`

Creates a new `<Provider>` which will set the Redux Store on the passed key of the context. You probably only need this if you are in the inadvisable position of having multiple stores. You will also need to pass the same `storeKey` to the `options` argument of [`connect`](#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

<a id="createProvider-arguments"></a>
#### Arguments

* [`storeKey`] (*String*): The key of the context on which to set the store. Default value: `'store'`

#### Examples
Before creating multiple stores, please go through this FAQ: [Can or should I create multiple stores?](http://redux.js.org/docs/faq/StoreSetup.html#can-or-should-i-create-multiple-stores-can-i-import-my-store-directly-and-use-it-in-components-myself)

```js
import {connect, createProvider} from 'react-redux'

const STORE_KEY = 'componentStore'

export const Provider = createProvider(STORE_KEY)

function connectExtended(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options = {}
) {
  options.storeKey = STORE_KEY
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )
}

export {connectExtended as connect}
```
Now you can import the above `Provider` and `connect` and use them.
