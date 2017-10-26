## API

<a id="provider"></a>
### `<Provider>`

让Redux store可用,以使`connect()`在下面的组件层次结构中调用。通常，在没有包装一个父组件或祖先组件到`<Provider>`里情况下，您是不能使用`connect()`的。

如果您*确实*需要，您可以手动将`store`作为一个`props`传递到每一个被`connect()`的组件中，但是我们只建议在单元测试中为存根`store`这样做，或者在非完全React的代码库中这样做。通常情况下，您应该使用该程序。

#### Props

* `store` (*[Redux Store](http://www.redux.org.cn/docs/basics/Store.html)*): 应用程序中只有有一个单一的store.
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

<hr>

<a id="connect"></a>
### `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

连接一个React组件到Redux store。`connect`是`connectAdvanced`的外观，为最常见的用例提供了一个方便的API。

它不修改传递给它的组件类;相反，它**返回**一个新的、连接的组件类，供您使用。

<a id="connect-arguments"></a>
#### Arguments 参数

* [`mapStateToProps(state, [ownProps]): stateProps`] \(*函数*): 将store中的state映射到组件的props中。
```javascript
function mapStateToProps(state) {
  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
  };
}
```
有时候我们只需要state数据的一部分，我们还可以在`mapStateToProp`中我们对需要的数据进行过滤：
```javascript
// 过滤todos
function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
}

// 将过滤后的数据映射到props
function mapStateToProps(state) {
  return {
    todos: selectTodos(state.todo, state.visibilityFilter);
    visibilityFilter: state.visibilityFilter
  };
}
```

如果指定了这个参数，新组件将订阅Redux store的更新。这意味着任何时候store更新，`mapStateToProps` 都将被调用。 `mapStateToProps`的结果必须是一个简单的对象，它将被合并到组件的props中。如果您不想订阅store更新，可以通过`null`或`undefined`替代`mapStateToProps`。

如果你的`mapStateToProps`函数声明为两个参数,它使用store state作为第一个参数和传递给连接组件的props作为第二个参数被调用,并且无论什么时候连接组件收到新的props（经过浅比较的）它都将被重新调用。(第二个参数按惯例通常是将其作为`ownProps`。)

  >注意: 在高级场景中，需要对渲染性能进行更多的控制，`mapStateToProps()`也可以返回一个函数。在本例中，*该函数*将被作为`mapStateToProps()`使用到特定的组件实例，而不是每个实例。这允许您对每个实例的进行记忆化（也就是缓存结果）。您可以参考[#279](https://github.com/reactjs/react-redux/pull/279)和测试它添加更多的细节。大多数应用都不需要这样做。[参考实例](https://github.com/tuzhu008/course-book/tree/master/React/reselect#在多个组件之间共享带props的选择器)

  >`mapStateToProps`函数接受整个Redux store的state作为单一参数，并返回一个对象来作为props被传递的。它通常被称为**选择器**。利用[Reselect库](https://github.com/reactjs/reselect)来有效地组合选择器和[计算导出的数据](http://redux.js.org/docs/recipes/ComputingDerivedData.html)。

* [`mapDispatchToProps(dispatch, [ownProps]): dispatchProps`] \(*对象* 或者 *函数*): 如果传入的是一个对象，它内部的每个函数都被假定为Redux action创建者。

如下,addTodo是一个普通action,调用connect:
```js
// 传入的是一个对象
const Root = connect(mapStateToProps, { addTodo })(App);
```
一个具有相同函数名的对象，但是将每个action创建者封装到一个`dispatch`调用中，这样它们就可以直接被调用，将被合并到组件的props中。
```js
// 经过封装的action
export boundAddTodo = (text) => dispatch(addTodo(text));
```
调用connect:
```js
const Root = connect(mapStateToProps, { boundAddTodo })(App);
```
   如果传入的是一个函数，这个函数接受`dispatch`作为第一个参数。您需要返回一个对象，该对象以某种方式使用分派来以您自己的方式绑定动作创建者。你可以按你的方式来返回一个以某种方式使用`dispatch`来绑定action创建者的对象，(提示:您可以使用Redux中的 [bindActionCreators()](http://www.redux.org.cn/docs/api/bindActionCreators.html) 助手。
   )
  ```js
  function mapDispatchToProps (dispatch) {
    return { 
      actions: bindActionCreators    (actionCreators, dispatch) }
}

  export default connect(mapStateToProps, mapDispatchToProps)(App);
  ```


  如果您的`mapDispatchToProps`函数被声明为带两个参数，那么`dispatch`将作为第一个参数，并且props作为第二个参数传递给连接组件，当连接的组件接收到新的props时，函数将被重新调用。(第二个参数通常是按惯例将其作为`ownProps`。)


  如果您不提供自己的`mapDispatchToProps`函数或包含action创建者的对象，那么**默认**的`mapDispatchToProps`实现只将`dispatch`注入到你的组件的props中。

  >注意: 在高级场景中，需要对渲染性能进行更多的控制，`mapDispatchToProps()`也可以返回一个函数。在本例中，*该函数*将作为一个`mapDispatchToProps()`被用于特定的组件实例。这允许您执行每个实例的记忆化。您可以参考[# 279](https://github.com/reactjs/react-redux/pull/279)和测试它添加更多的细节。大多数应用都不需要这样。

* [`mergeProps(stateProps, dispatchProps, ownProps): props`] \(*函数*): 如果指定了，它将传递`mapStateToProps()`、`mapDispatchToProps()`的结果，以及父母的props作为参数。从它返回的普通对象将作为props传递到它的包裹组件。您可以指定这个函数来选择一个基于props的状态的一部分，或者将action创建者绑定到一个来自props的特定的变量上。如果你省略了它，默认使用`Object.assign({}, ownProps, stateProps, dispatchProps)`。

* [`options`] *(对象)* 如果指定了，进一步定制连接器的行为。除了可传递到`connectAdvanced()`的选项之外(见下面的)，`connect()`接受这些额外的选项:
  * [`pure`] *(布尔值)*: 为真,如果相关的props/state对象在它们各自的相等性检查中保持相等，`connect()`将避免重新渲染和调用`mapStateToProps`, `mapDispatchToProps`, 和 `mergeProps` 。假设包裹组件是一个“pure(纯)”组件，并且不依赖于任何输入或状态，除了它的props和所选的Redux store的state。默认值:`true`
  * [`areStatesEqual`] *(函数)*: 当 `pure`为真时， 将传入的store state与之前的值进行比较 默认值: `全等 (===)`
  * [`areOwnPropsEqual`] *(函数)*: 当 `pure`为真时， 将传入的props与之前的值进行比较 默认值: `相等 (==）`
  * [`areStatePropsEqual`] *(函数)*: 当 `pure`为真时，将 `mapStateToProps` 的结果和之前的值进行比较，默认值: `相等 (==）`
  * [`areMergedPropsEqual`] *(函数)*:当 `pure`为真时，将】 `mergeProps`的结果和之前的值进行比较， 默认值: `shallowEqual`
  * [`storeKey`] *(字符串)*: 它是读取store上下文的关键。如果您处于不明智的位置————拥有多个store，那么您可能只需要这样做。 默认值: `'store'`

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
没有强制参数或两个参数的函数 **可以接收** `ownProps`.
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
##### 当`pure`选项为真时优化连接

当`pure`选项为真, `connect`执行几个相等检查，以避免对`mapStateToProps`、`mapDispatchToProps`、`mergeProps`以及最后的`render`的不必要的调用。这其中包括了`areStatesEqual`, `areOwnPropsEqual`, `areStatePropsEqual`, 和 `areMergedPropsEqual`。虽然默认值可能是99%的情况，但是您可能希望用自定义实现来覆盖它们，以优化性能或其他原因。下面是几个例子:

* 如果您的`mapStateToProps`函数的计算开销很大，并且你只关心state中的一小部分，那么您可能希望重写`areStatesEqual`。例如:`areStatesEqual: (next, prev) => prev.entities.todos === next.entities.todos`;这将有效地忽略对所有内容的状态更改。

* 如果您有不纯的，改变store state的reducers，您可能希望覆盖`areStatesEqual`来总是返回false(`areStatesEqual: () => false`)。(这也可能会影响其他的相等检查，取决于您的`mapStateToProps`函数。)

* 您可能希望重写`areOwnPropsEqual`，作为一种将传入的props进行白名单的方法。您还必须使`mapStateToProps`、`mapDispatchToProps`和`mergeProps`同时实现白名单。(可能更简单的实现这一其他方面,例如通过使用[重组的mapProps](https://github.com/acdlite/recompose/blob/master/docs/API.md#mapProps)。

* 如果你的`mapstatetoprop`使用了一个在相关的prop发生了变化，仅返回一个新的对象的记忆体选择器，你可能会想要重写`areStatePropsEqual`来使用`strictEqual`。这将是一个非常轻微的性能改进，因为每次调用`mapstatetoprop`时，都会避免对个别的props进行额外的相等检查。

* 如果您的选择器产生复杂的props，您可能希望覆盖`areMergedPropsEqual`来实现一个`deepEqual(深度相等）`。比如，嵌套对象、新数组等(深度相等的检查应该比重新渲染的速度更快。)

#### Returns

一个高阶React组件类，它将state和action创建者从提供的参数中传递给您的组件。这是由`connectAdvanced`创建的，并且这个高阶组件的详细资料在这里被覆盖。

<a id="connect-examples"></a>
#### 案例

##### 只注入 `dispatch` 不监听 store

```js
export default connect()(TodoApp)
```

##### 注入所有action创建者  (`addTodo`, `completeTodo`, ...)并不订阅 store

```js
import * as actionCreators from './actionCreators'

export default connect(null, actionCreators)(TodoApp)
```

##### 在全局state中注入`dispatch`和每个字段

>不要这样做!它会破坏任何性能优化，因为`TodoApp`会在每次状态更改之后重新渲染<br>
>最好有更细粒度的`connect()`在视图层次结构中的几个组件上<br>
>监听state的相关部分

```js
export default connect(state => state)(TodoApp)
```

##### 注入 `dispatch` 和 `todos`

```js
function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps)(TodoApp)
```

##### 注入 `todos` 和所有action创建者

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps, actionCreators)(TodoApp)
```

##### 注入 `todos` 和所有创建者 (`addTodo`, `completeTodo`, ...) 作为 `actions`

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

#####  注入 `todos` 和 指定的action创建者 (`addTodo`)

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

#####  使用简写语法注入 `todos` 和 指定的action创建者 (`addTodo` 和 `deleteTodo`)
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

##### 注入 `todos`, todoActionCreators as `todoActions`, and counterActionCreators as `counterActions`

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

##### 注入 `todos`,  todoActionCreators 和 counterActionCreators 一起作为 `actions`

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

##### 注入 `todos`, 所有 todoActionCreators 和 counterActionCreators 直接作为 props

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

##### 根据props注入特定用户的`todos`

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state, ownProps) {
  return { todos: state.todos[ownProps.userId] }
}

export default connect(mapStateToProps)(TodoApp)
```

##### 根据props注入特定用户的`todos`,并且注入`props.userId`到action
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
工厂函数可以用来做性能优化

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
<hr>

<a id="connectAdvanced"></a>
### `connectAdvanced(selectorFactory, [connectOptions])`

将一个React组件连接到Redux store。它是`connect()`的基础但是，对于如何将`state`、`props`和`dispatch`结合到最后的props中去，却不那么固执己见。它不假定对结果的默认或内存化，将这些责任留给调用者。

它不修改传递给它的组件类;相反，它*返回*一个新的、连接的组件类，供您使用。

<a id="connectAdvanced-arguments"></a>
#### Arguments

* `selectorFactory(dispatch, factoryOptions): selector(state, ownProps): props` \(*函数*): 初始化一个选择器函数(在每个实例的构造函数中)。当连接器组件需要计算新的props，这个选择器函数就会被调用，因为它是store state更改或接收新props的结果。`selector`的结果将是一个简单的对象，它作为对包裹组件的props被传递。如果对`selector`的连续调用的返回值与先前调用的返回值相同(`===`)，则组件将不会被重新渲染。`selector`在适当的时候返回之前的对象是负责的。

* [`connectOptions`] *(对象)* 如果指定了，进一步定制连接器的行为。

  * [`getDisplayName`] *(函数)*: 计算连接器组件的displayName属性与包裹组件的相对属性。通常被包装器函数覆盖。 默认值: `name => 'ConnectAdvanced('+name+')'`

  * [`methodName`] *(字符串)*: 展示在错误信息中. 通常被包装器函数覆盖. 默认值: `'connectAdvanced'`

  * [`renderCountProp`] *(字符串)*: 如果定义了，命名为这个值的属性将被添加到传递给包裹组件的props中。它的值将是组件被渲染的次数，这对于跟踪不必要的重新渲染非常有用。默认值:`undefined`

  * [`shouldHandleStateChanges`] *(布尔值)*: controls whether the connector component subscribes to redux store state changes. If set to false, it will only re-render on `componentWillReceiveProps`. Default value:  `true`
  控制 连接器组件是否订阅redux store state更改。如果设置为false,它只会在`componentWillReceiveProps`返回true时重新渲染。默认值:`true`

  * [`storeKey`] *(字符串)*: 它是获得store上下文或者prosp的关键。如果您处于不明智的位置——拥有多个存储空间，那么您可能只需要这样做。默认值: `'store'`

  * [`withRef`] *(布尔值)*: 如果为true, 将一个ref存储到包裹组件实例中，并通过`getWrappedInstance()`方法使其可用。默认值：`false`
 
  * 此外, 任何额外的选项通过 `connectOptions` 在 `factoryOptions` 参数中被传递到`selectorFactory`。

<a id="connectAdvanced-returns"></a>
#### Returns

一个高阶React组件类，它构建来自store state的props，并将它们传递给包裹组件。一个高阶组件是一个接受组件参数并返回一个新组件的函数。

##### 静态属性

* `WrappedComponent` *(组件)*: 最初的组件类被传递到 `connectAdvanced(...)(Component)`.

##### 静态方法

所有的原始静态方法都被hoisted。

##### 实例方法

###### `getWrappedInstance(): ReactComponent`

返回包裹组件示例。当你传递 `{ withRef: true }` 作为`options` 参数的一部分的时候可用.

#### Remarks讲话

* 由于`connectAdvanced`返回一个高阶组件，所以需要被调用两次。第一次使用上面描述的参数，第二次使用组件:`connectAdvanced(selectorFactory)(MyComponent)`。

* `connectAdvanced`不修改传递的React组件。它返回一个新的、连接的组件，您应该使用它来替代。

<a id="connectAdvanced-examples"></a>
#### 案例

##### 根据props注入特定用户的`todos`，并且注入`props.userId`到action中
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

创建一个新`<Provider>`，它将在传递的上下文关键字上设置Redux store。如果您处于不明智的位置——拥有多个存储空间，那么您可能只需要这样做。您还需要将相同的`storeKey`传递给[`connect`_](#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)的`options`参数

<a id="createProvider-arguments"></a>
#### Arguments

* [`storeKey`] (*字符串*):它是设置store上下文的关键。默认值: `'store'`

#### 案例
在 创建多个store之前, 请通过这个常见问题解答: [可以创建多个store吗？](http://redux.js.org/docs/faq/StoreSetup.html#can-or-should-i-create-multiple-stores-can-i-import-my-store-directly-and-use-it-in-components-myself)

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
现在您可以导入上面的`Provider`并`connect`并使用它们。
