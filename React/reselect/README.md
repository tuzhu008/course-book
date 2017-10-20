# Reselect
[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

为React提供简单的“选择器”库。本库受到[NuclearJS](https://github.com/optimizely/nuclear-js.git)中的getters,
[re-frame](https://github.com/Day8/re-frame)中的[subscriptions](https://github.com/Day8/re-frame#just-a-read-only-cursor)和来自
[speedskater](https://github.com/speedskater)的这个 
[proposal](https://github.com/gaearon/redux/pull/169)等的启发 .

* 选择器可以计算派生的数据，允许Redux存储尽可能少的state。
* 选择器是有效的。除非其中一个参数发生变化，否则选择器不会重新计算。
* 选择器是可组合。它们可以用作其他选择器的输入。

```js
import { createSelector } from 'reselect'

const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }
```

## Table of Contents

- [安装](#安装)
- [案例](#案例)
  - [缓存选择器的动机](#缓存选择器的动机)
  - [创建一个缓存的选择器](#创建一个缓存的选择器)
  - [组合选择器](#组合选择器)
  - [连接一个选择器到Redux Store](#连接一个选择器到redux)
  - [在选择器中访问React Props](#在选择器中访问react-props)
  - [在多个组件之间共享带Props的选择器](#在多个组件之间共享带props的选择器)
- [API](#api)
  - [`createSelector`](#createselectorinputselectors--inputselectors-resultfunc)
  - [`defaultMemoize`](#defaultmemoizefunc-equalitycheck--defaultequalitycheck)
  - [`createSelectorCreator`](#createselectorcreatormemoize-memoizeoptions)
  - [`createStructuredSelector`](#createstructuredselectorinputselectors-selectorcreator--createselector)
- [FAQ](#faq)
  - [当输入状态发生变化时，为什么我的选择器不进行重新计算?](#q-why-isnt-my-selector-recomputing-when-the-input-state-changes)
  - [当输入状态保持不变时，为什么选择器重新计算?](#q-why-is-my-selector-recomputing-when-the-input-state-stays-the-same)
  - [我可以使用Reselect而不用Redux吗?](#q-can-i-use-reselect-without-redux)
  - [默认的内存化函数是不好的，我可以使用另一个吗?](#q-the-default-memoization-function-is-no-good-can-i-use-a-different-one)
  - [如何测试选择器?](#q-how-do-i-test-a-selector)
  - [如何创建一个接受一个参数的选择器?](#q-how-do-i-create-a-selector-that-takes-an-argument)
  - [如何同时Reselect与Immutable.js?](#q-how-do-i-use-reselect-with-immutablejs)
  - [我可以在多个组件之间共享一个选择器吗?](#q-can-i-share-a-selector-across-multiple-components)
  - [Are there TypeScript typings?](#q-are-there-typescript-typings)
  - [如何制作一个咖喱选择器?](#q-how-can-i-make-a-curried-selector)

- [Related 项目](#related-projects)
- [授权](#license)

## 安装
    npm install reselect

## 案例

如果你喜欢视频教程，你可以在[这儿](https://www.youtube.com/watch?v=6Xwo5mVxDqI)找到.

### 缓存选择器的动机

> 本节中的案例基于 [React TodoList 示例](http://redux.js.org/docs/basics/UsageWithReact.html).

#### `containers/VisibleTodoList.js`

```js
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

在上面的例子中，`mapStateToProps`调用`getVisibleTodos`来计算`todos`。这很好，但是有一个缺点:每次更新状态树时都要计算`todos`。如果状态树很大，或者计算成本很高，那么在每次更新时重复计算可能会导致性能问题。Reselect可以帮助避免这些不必要的重新计算。

### 创建一个缓存的选择器

我们希望用一个缓存起来的选择器来替换`getVisibleTodos`，这个选择器会在`state.todos`值或者`state.visibilityFilter`变化时重新计算`todos`，但在变化发生在状态树的其他（不相关的）部分时不重新计算。

Reselect提供了一个函数`createSelector`用于创建缓存选择器。`createSelector`接受了一个输入选择器数组和一个转换函数作为其参数。如果Redux状态树发生了变化，导致输入选择器的值发生变化，那么选择器将使用输入选择器的值作为参数调用它的转换函数，并返回结果。如果输入选择器的值与之前对选择器的调用相同，它将返回之前计算的值，而不是调用转换函数。

让我们定义一个名为`getVisibleTodos`的缓存选择器来替换上面的非记忆化版本:

#### `selectors/index.js`

```js
import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```

在上面的例子中, `getVisibilityFilter` 和 `getTodos`是输入选择器。它们被创建为普通的非内存选择器函数，因为它们不转换所选择的数据。另一方面，`getVisibleTodos`是一个缓存选择器。它将`getVisibilityFilter`和`getTodos`作为输入选择器，并使用一个转换函数来计算经过过滤的todos列表。

### 组合选择器

一个缓存选择器本身可以作为另一个内存选择器的一个输入选择器。下面是`getVisibleTodos`作为一个选择器的输入选择器，它通过关键字进一步过滤todos:

```js
const getKeyword = (state) => state.keyword

const getVisibleTodosFilteredByKeyword = createSelector(
  [ getVisibleTodos, getKeyword ],
  (visibleTodos, keyword) => visibleTodos.filter(
    todo => todo.text.includes(keyword)
  )
)
```

### 连接一个选择器到redux
如果你使用 [React Redux](https://github.com/reactjs/react-redux),你可以在`mapStateToProps()`里将选择器作为常规函数调用：

#### `containers/VisibleTodoList.js`

```js
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../selectors'

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

### 在选择器中访问React Props

> 这一节将向我们的应用程序引入一个假设的扩展，允许它支持多个Todo列表。请注意，这个扩展的完整实现需要对reducers、组件、actions等的更改，这些更改与讨论的主题不直接相关，并且为了简洁而省略了。

到目前为止，我们只看到选择器接收Redux store state作为参数，但是选择器也可以接收props。

这里时一个`App` 组件，它渲染三个`VisibleTodoList`组件，每个`VisibleTodoList`都有一个`listId`的属性:

#### `components/App.js`

```js
import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <VisibleTodoList listId="1" />
    <VisibleTodoList listId="2" />
    <VisibleTodoList listId="3" />
  </div>
)
```

每个`VisibleTodoList`容器应该根据`listId`属性的值选择一个不同的状态，因此让我们修改`getVisibilityFilter`和`getTodos`来接受一个props参数:

#### `selectors/todoSelectors.js`

```js
import { createSelector } from 'reselect'

const getVisibilityFilter = (state, props) =>
  state.todoLists[props.listId].visibilityFilter

const getTodos = (state, props) =>
  state.todoLists[props.listId].todos

const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_COMPLETED':
        return todos.filter(todo => todo.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }
)

export default getVisibleTodos
```

`props` 可以从`mapStateToProps`传递到`getVisibleTodos`:

```js
const mapStateToProps = (state, props) => {
  return {
    todos: getVisibleTodos(state, props)
  }
}
```

现在，`getVisibleTodos`可以访问`props`，一切看起来都很正常

**但是这有一个问题？**

使用带有`VisibleTodoList`容器的多个实例的`getVisibleTodos`选择器将不能正确地缓存:

#### `containers/VisibleTodoList.js`

```js
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../selectors'

const mapStateToProps = (state, props) => {
  return {
    // 警告: 下面的选择器不能正确地进行缓存
    todos: getVisibleTodos(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

使用`createSelector`创建的选择器有一个缓存大小为1，当它的参数集与之前的参数集相同时，只返回缓存的值。如果我们轮流渲染`<VisibleTodoList listId="1" />`和`<VisibleTodoList listId="2" />`，共享选择器将轮流接收 `{listId: 1}` and `{listId: 2}` 作为它们的 `props` 参数。这将导致每次调用的参数不同，所以选择器将总是重新计算而不是返回缓存的值。在下一节中，我们将了解如何克服这一限制。

### 在多个组件之间共享带Props的选择器

> 本节中的示例需要Redux v4.3.0或更高版本

> 另一种方法是 [re-reselect](https://github.com/toomuchdesign/re-reselect)

当传入`props`时，在多个`VisibleTodoList`组件之间共享一个选择器，**并且**保留缓存，每个组件的实例都需要它自己的选择器的私有副本。

让我们创建一个名为`makeGetVisibleTodos`的函数，它将在每次调用`getVisibleTodos`选择器时返回一个新的副本:

#### `selectors/todoSelectors.js`

```js
import { createSelector } from 'reselect'

const getVisibilityFilter = (state, props) =>
  state.todoLists[props.listId].visibilityFilter

const getTodos = (state, props) =>
  state.todoLists[props.listId].todos

const makeGetVisibleTodos = () => {
  return createSelector(
    [ getVisibilityFilter, getTodos ],
    (visibilityFilter, todos) => {
      switch (visibilityFilter) {
        case 'SHOW_COMPLETED':
          return todos.filter(todo => todo.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(todo => !todo.completed)
        default:
          return todos
      }
    }
  )
}

export default makeGetVisibleTodos
```

我们还需要一种方法，将容器的每个实例都提供给它自己的私有选择器。`mapstatetoprop`的`connect`参数可以帮助解决这个问题。

**如果`connect`提供的`mapstatetoprop`参数返回一个函数而不是一个对象，这个函数将被用于为容器的每个实例创建一个单独的`mapStateToProps`函数。**

在下面的示例中，`makeMapStateToProps`创建了一个新的`getVisibleTodos`选择器，并返回一个`mapStateToProps`函数，该函数具有对新选择器的独有的访问权:

```js
const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos()
  const mapStateToProps = (state, props) => {
    return {
      todos: getVisibleTodos(state, props)
    }
  }
  return mapStateToProps
}
```

如果我们通过`makeMapStateToProps`来`connect`，`VisibleTodosList`容器的每个实例都将使用一个私有的`getVisibleTodos`选择器来获得它自己的`mapStateToProps`函数。记忆化现在都可以正确地工作，而不用考虑`VisibleTodoList`容器的渲染顺序。

#### `containers/VisibleTodoList.js`

```js
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { makeGetVisibleTodos } from '../selectors'

const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos()
  const mapStateToProps = (state, props) => {
    return {
      todos: getVisibleTodos(state, props)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

## API

### createSelector(...inputSelectors | [inputSelectors], resultFunc)

Takes one or more selectors, or an array of selectors, computes their values and passes them as arguments to `resultFunc`.

`createSelector` determines if the value returned by an input-selector has changed between calls using reference equality (`===`). Inputs to selectors created with `createSelector` should be immutable.

Selectors created with `createSelector` have a cache size of 1. This means they always recalculate when the value of an input-selector changes, as a selector only stores the preceding value of each input-selector.

```js
const mySelector = createSelector(
  state => state.values.value1,
  state => state.values.value2,
  (value1, value2) => value1 + value2
)

// You can also pass an array of selectors
const totalSelector = createSelector(
  [
    state => state.values.value1,
    state => state.values.value2
  ],
  (value1, value2) => value1 + value2
)
```

It can be useful to access the props of a component from within a selector. When a selector is connected to a component with `connect`, the component props are passed as the second argument to the selector:

```js
const abSelector = (state, props) => state.a * props.b

// props only (ignoring state argument)
const cSelector =  (_, props) => props.c

// state only (props argument omitted as not required)
const dSelector = state => state.d

const totalSelector = createSelector(
  abSelector,
  cSelector,
  dSelector,
  (ab, c, d) => ({
    total: ab + c + d
  })
)

```

### defaultMemoize(func, equalityCheck = defaultEqualityCheck)

`defaultMemoize` memoizes the function passed in the func parameter. It is the memoize function used by `createSelector`.

`defaultMemoize` has a cache size of 1. This means it always recalculates when the value of an argument changes.

`defaultMemoize` determines if an argument has changed by calling the `equalityCheck` function. As `defaultMemoize` is designed to be used with immutable data, the default `equalityCheck` function checks for changes using reference equality:

```js
function defaultEqualityCheck(currentVal, previousVal) {
  return currentVal === previousVal
}
```

`defaultMemoize` can be used with `createSelectorCreator` to [customize the `equalityCheck` function](#customize-equalitycheck-for-defaultmemoize).

### createSelectorCreator(memoize, ...memoizeOptions)

`createSelectorCreator` can be used to make a customized version of `createSelector`.

The `memoize` argument is a memoization function to replace `defaultMemoize`.

The `...memoizeOptions` rest parameters are zero or more configuration options to be passed to `memoizeFunc`. The selectors `resultFunc` is passed as the first argument to `memoize` and the `memoizeOptions` are passed as the second argument onwards:

```js
const customSelectorCreator = createSelectorCreator(
  customMemoize, // function to be used to memoize resultFunc
  option1, // option1 will be passed as second argument to customMemoize
  option2, // option2 will be passed as third argument to customMemoize
  option3 // option3 will be passed as fourth argument to customMemoize
)

const customSelector = customSelectorCreator(
  input1,
  input2,
  resultFunc // resultFunc will be passed as first argument to customMemoize
)
```

Internally `customSelector` calls the memoize function as follows:

```js
customMemoize(resultFunc, option1, option2, option3)
```

Here are some examples of how you might use `createSelectorCreator`:

#### Customize `equalityCheck` for `defaultMemoize`

```js
import { createSelectorCreator, defaultMemoize } from 'reselect'
import isEqual from 'lodash.isEqual'

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

// use the new "selector creator" to create a selector
const mySelector = createDeepEqualSelector(
  state => state.values.filter(val => val < 5),
  values => values.reduce((acc, val) => acc + val, 0)
)
```

#### Use memoize function from lodash for an unbounded cache

```js
import { createSelectorCreator } from 'reselect'
import memoize from 'lodash.memoize'

let called = 0
const hashFn = (...args) => args.reduce(
  (acc, val) => acc + '-' + JSON.stringify(val),
  ''
)
const customSelectorCreator = createSelectorCreator(memoize, hashFn)
const selector = customSelectorCreator(
  state => state.a,
  state => state.b,
  (a, b) => {
    called++
    return a + b
  }
)
```

### createStructuredSelector({inputSelectors}, selectorCreator = createSelector)

`createStructuredSelector` is a convenience function for a common pattern that arises when using Reselect. The selector passed to a `connect` decorator often just takes the values of its input-selectors and maps them to keys in an object:

```js
const mySelectorA = state => state.a
const mySelectorB = state => state.b

// The result function in the following selector
// is simply building an object from the input selectors
const structuredSelector = createSelector(
   mySelectorA,
   mySelectorB,
   mySelectorC,
   (a, b, c) => ({
     a,
     b,
     c
   })
)
```

`createStructuredSelector` takes an object whose properties are input-selectors and returns a structured selector. The structured selector returns an object with the same keys as the `inputSelectors` argument, but with the selectors replaced with their values.

```js
const mySelectorA = state => state.a
const mySelectorB = state => state.b

const structuredSelector = createStructuredSelector({
  x: mySelectorA,
  y: mySelectorB
})

const result = structuredSelector({ a: 1, b: 2 }) // will produce { x: 1, y: 2 }
```

Structured selectors can be nested:

```js
const nestedSelector = createStructuredSelector({
  subA: createStructuredSelector({
    selectorA,
    selectorB
  }),
  subB: createStructuredSelector({
    selectorC,
    selectorD
  })
})

```

## FAQ

### Q: Why isn’t my selector recomputing when the input state changes?

A: Check that your memoization function is compatible with your state update function (i.e. the reducer if you are using Redux). For example, a selector created with `createSelector` will not work with a state update function that mutates an existing object instead of creating a new one each time. `createSelector` uses an identity check (`===`) to detect that an input has changed, so mutating an existing object will not trigger the selector to recompute because mutating an object does not change its identity. Note that if you are using Redux, mutating the state object is [almost certainly a mistake](http://redux.js.org/docs/Troubleshooting.html).

The following example defines a simple selector that determines if the first todo item in an array of todos has been completed:

```js
const isFirstTodoCompleteSelector = createSelector(
  state => state.todos[0],
  todo => todo && todo.completed
)
```

The following state update function **will not** work with `isFirstTodoCompleteSelector`:

```js
export default function todos(state = initialState, action) {
  switch (action.type) {
  case COMPLETE_ALL:
    const areAllMarked = state.every(todo => todo.completed)
    // BAD: mutating an existing object
    return state.map(todo => {
      todo.completed = !areAllMarked
      return todo
    })

  default:
    return state
  }
}
```

The following state update function **will** work with `isFirstTodoCompleteSelector`:

```js
export default function todos(state = initialState, action) {
  switch (action.type) {
  case COMPLETE_ALL:
    const areAllMarked = state.every(todo => todo.completed)
    // GOOD: returning a new object each time with Object.assign
    return state.map(todo => Object.assign({}, todo, {
      completed: !areAllMarked
    }))

  default:
    return state
  }
}
```

If you are not using Redux and have a requirement to work with mutable data, you can use `createSelectorCreator` to replace the default memoization function and/or use a different equality check function. See [here](#use-memoize-function-from-lodash-for-an-unbounded-cache) and [here](#customize-equalitycheck-for-defaultmemoize) for examples.

### Q: Why is my selector recomputing when the input state stays the same?

A: Check that your memoization function is compatible with your state update function (i.e. the reducer if you are using Redux). For example, a selector created with `createSelector` that recomputes unexpectedly may be receiving a new object on each update whether the values it contains have changed or not. `createSelector` uses an identity check (`===`) to detect that an input has changed, so returning a new object on each update means that the selector will recompute on each update.

```js
import { REMOVE_OLD } from '../constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
    timestamp: Date.now()
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
  case REMOVE_OLD:
    return state.filter(todo => {
      return todo.timestamp + 30 * 24 * 60 * 60 * 1000 > Date.now()
    })
  default:
    return state
  }
}
```

The following selector is going to recompute every time REMOVE_OLD is invoked because Array.filter always returns a new object. However, in the majority of cases the REMOVE_OLD action will not change the list of todos so the recomputation is unnecessary.

```js
import { createSelector } from 'reselect'

const todosSelector = state => state.todos

export const visibleTodosSelector = createSelector(
  todosSelector,
  (todos) => {
    ...
  }
)
```

You can eliminate unnecessary recomputations by returning a new object from the state update function only when a deep equality check has found that the list of todos has actually changed:

```js
import { REMOVE_OLD } from '../constants/ActionTypes'
import isEqual from 'lodash.isEqual'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
    timestamp: Date.now()
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
  case REMOVE_OLD:
    const updatedState =  state.filter(todo => {
      return todo.timestamp + 30 * 24 * 60 * 60 * 1000 > Date.now()
    })
    return isEqual(updatedState, state) ? state : updatedState
  default:
    return state
  }
}
```

Alternatively, the default `equalityCheck` function in the selector can be replaced by a deep equality check:

```js
import { createSelectorCreator, defaultMemoize } from 'reselect'
import isEqual from 'lodash.isEqual'

const todosSelector = state => state.todos

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

// use the new "selector creator" to create a selector
const mySelector = createDeepEqualSelector(
  todosSelector,
  (todos) => {
    ...
  }
)
```

Always check that the cost of an alternative `equalityCheck` function or deep equality check in the state update function is not greater than the cost of recomputing every time. If recomputing every time does work out to be the cheaper option, it may be that for this case Reselect is not giving you any benefit over passing a plain `mapStateToProps` function to `connect`.

### Q: Can I use Reselect without Redux?

A: Yes. Reselect has no dependencies on any other package, so although it was designed to be used with Redux it can be used independently. It is currently being used successfully in traditional Flux apps.

> If you create selectors using `createSelector` make sure its arguments are immutable.
> See [here](#createselectorinputselectors--inputselectors-resultfunc)

### Q: How do I create a selector that takes an argument?

A: Keep in mind that selectors can access React props, so if your arguments are (or can be made available as) React props, you can use that functionality. [See here](#accessing-react-props-in-selectors) for details.

Otherwise, Reselect doesn't have built-in support for creating selectors that accepts arguments, but here are some suggestions for implementing similar functionality...

If the argument is not dynamic you can use a factory function:

```js
const expensiveItemSelectorFactory = minValue => {
  return createSelector(
    shopItemsSelector,
    items => items.filter(item => item.value > minValue)
  )
}

const subtotalSelector = createSelector(
  expensiveItemSelectorFactory(200),
  items => items.reduce((acc, item) => acc + item.value, 0)
)
```

The general consensus [here](https://github.com/reactjs/reselect/issues/38) and [over at nuclear-js](https://github.com/optimizely/nuclear-js/issues/14) is that if a selector needs a dynamic argument, then that argument should probably be state in the store. If you decide that you do require a selector with a dynamic argument, then a selector that returns a memoized function may be suitable:

```js
import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

const expensiveSelector = createSelector(
  state => state.items,
  items => memoize(
    minValue => items.filter(item => item.value > minValue)
  )
)

const expensiveFilter = expensiveSelector(state)

const slightlyExpensive = expensiveFilter(100)
const veryExpensive = expensiveFilter(1000000)
```

### Q: The default memoization function is no good, can I use a different one?

A: We think it works great for a lot of use cases, but sure. See [these examples](#customize-equalitycheck-for-defaultmemoize).

### Q: How do I test a selector?

A: For a given input, a selector should always produce the same output. For this reason they are simple to unit test.

```js
const selector = createSelector(
  state => state.a,
  state => state.b,
  (a, b) => ({
    c: a * 2,
    d: b * 3
  })
)

test("selector unit test", () => {
  assert.deepEqual(selector({ a: 1, b: 2 }), { c: 2, d: 6 })
  assert.deepEqual(selector({ a: 2, b: 3 }), { c: 4, d: 9 })
})
```

It may also be useful to check that the memoization function for a selector works correctly with the state update function (i.e. the reducer if you are using Redux). Each selector has a `recomputations` method that will return the number of times it has been recomputed:

```js
suite('selector', () => {
  let state = { a: 1, b: 2 }

  const reducer = (state, action) => (
    {
      a: action(state.a),
      b: action(state.b)
    }
  )

  const selector = createSelector(
    state => state.a,
    state => state.b,
    (a, b) => ({
      c: a * 2,
      d: b * 3
    })
  )

  const plusOne = x => x + 1
  const id = x => x

  test("selector unit test", () => {
    state = reducer(state, plusOne)
    assert.deepEqual(selector(state), { c: 4, d: 9 })
    state = reducer(state, id)
    assert.deepEqual(selector(state), { c: 4, d: 9 })
    assert.equal(selector.recomputations(), 1)
    state = reducer(state, plusOne)
    assert.deepEqual(selector(state), { c: 6, d: 12 })
    assert.equal(selector.recomputations(), 2)
  })
})
```

Additionally, selectors keep a reference to the last result function as `.resultFunc`. If you have selectors composed of many other selectors this can help you test each selector without coupling all of your tests to the shape of your state.

For example if you have a set of selectors like this:

**selectors.js**
```js
export const firstSelector = createSelector( ... )
export const secondSelector = createSelector( ... )
export const thirdSelector = createSelector( ... )

export const myComposedSelector = createSelector(
  firstSelector,
  secondSelector,
  thirdSelector,
  (first, second, third) => first * second < third
)
```

And then a set of unit tests like this:

**test/selectors.js**

```js
// tests for the first three selectors...
test("firstSelector unit test", () => { ... })
test("secondSelector unit test", () => { ... })
test("thirdSelector unit test", () => { ... })

// We have already tested the previous
// three selector outputs so we can just call `.resultFunc`
// with the values we want to test directly:
test("myComposedSelector unit test", () => {
  // here instead of calling selector()
  // we just call selector.resultFunc()
  assert(myComposedSelector.resultFunc(1, 2, 3), true)
  assert(myComposedSelector.resultFunc(2, 2, 1), false)
})
```

Finally, each selector has a `resetRecomputations` method that sets
recomputations back to 0.  The intended use is for a complex selector that may
have many independent tests and you don't want to manually manage the
computation count or create a "dummy" selector for each test.

### Q: How do I use Reselect with Immutable.js?

A: Selectors created with `createSelector` should work just fine with Immutable.js data structures.

If your selector is recomputing and you don't think the state has changed, make sure you are aware of which Immutable.js update methods **always** return a new object and which update methods only return a new object **when the collection actually changes**.

```js
import Immutable from 'immutable'

let myMap = Immutable.Map({
  a: 1,
  b: 2,
  c: 3
})

 // set, merge and others only return a new obj when update changes collection
let newMap = myMap.set('a', 1)
assert.equal(myMap, newMap)
newMap = myMap.merge({ 'a', 1 })
assert.equal(myMap, newMap)
// map, reduce, filter and others always return a new obj
newMap = myMap.map(a => a * 1)
assert.notEqual(myMap, newMap)
```

If a selector's input is updated by an operation that always returns a new object, it may be performing unnecessary recomputations. See [here](#q-why-is-my-selector-recomputing-when-the-input-state-stays-the-same) for a discussion on the pros and cons of using a deep equality check like `Immutable.is` to eliminate unnecessary recomputations.

### Q: Can I share a selector across multiple components?

A: Selectors created using `createSelector` only have a cache size of one. This can make them unsuitable for sharing across multiple components if the arguments to the selector are different for each instance of the component. There are a couple of ways to get around this:

* Create a factory function which returns a new selector for each instance of the component. There is built-in support for factory functions in React Redux v4.3 or higher. See [here](#sharing-selectors-with-props-across-multiple-components) for an example.

* Create a custom selector with a cache size greater than one.

### Q: Are there TypeScript Typings?

A: Yes! They are included and referenced in `package.json`. They should Just Work™.

### Q: How can I make a [curried](https://github.com/hemanth/functional-programming-jargon#currying) selector?

A: Try these [helper functions](https://github.com/reactjs/reselect/issues/159#issuecomment-238724788) courtesy of [MattSPalmer](https://github.com/MattSPalmer)

## Related Projects

### [re-reselect](https://github.com/toomuchdesign/re-reselect)

Enhances Reselect selectors by wrapping `createSelector` and returning a memoized collection of selectors indexed with the cache key returned by a custom resolver function.

Useful to reduce selectors recalculation when the same selector is repeatedly called with one/few different arguments.

### [reselect-map](https://github.com/HeyImAlex/reselect-map)

Can be useful when doing **very expensive** computations on elements of a collection because Reselect might not give you the granularity of caching that you need. Check out the reselect-maps README for examples.

**The optimizations in reselect-map only apply in a small number of cases. If you are unsure whether you need it, you don't!**

## License

MIT

[build-badge]: https://img.shields.io/travis/reactjs/reselect/master.svg?style=flat-square
[build]: https://travis-ci.org/reactjs/reselect

[npm-badge]: https://img.shields.io/npm/v/reselect.svg?style=flat-square
[npm]: https://www.npmjs.org/package/reselect

[coveralls-badge]: https://img.shields.io/coveralls/reactjs/reselect/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/reactjs/reselect
