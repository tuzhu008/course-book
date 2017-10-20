# Reselect
[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

这是为React提供简单的“选择器”库。本库受到[NuclearJS](https://github.com/optimizely/nuclear-js.git)中的getters,
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
> 这个实现的核心思想是利用了闭包，在函数内部返回一个保持对这个函数作用域内的资源引用的函数。
## API

### createSelector(...inputSelectors | [inputSelectors], resultFunc)

接收一个或多个输入选择器，或一个选择器数组，计算它们的值，并将它们作为参数传递给`resultFunc`。

`createSelector`确定输入选择器返回的值是否在使用引用相等(`===`)的调用之间进行了更改。使用`createSelector`创建的选择器的输入应该是不可变的。

使用`createSelector`创建的选择器的缓存大小为1。这意味着当输入选择器的值发生变化时，它们总是重新计算，因为选择器只存储每个输入选择器前一个值。

```js
const mySelector = createSelector(
  state => state.values.value1,
  state => state.values.value2,
  (value1, value2) => value1 + value2
)

// 你也可以传递一个选择器数组
const totalSelector = createSelector(
  [
    state => state.values.value1,
    state => state.values.value2
  ],
  (value1, value2) => value1 + value2
)
```

从选择器中访问组件的props是很有用的。当一个选择器连接到一个带有`connect`的组件时，组件的props将作为第二个参数传递给选择器:

```js
const abSelector = (state, props) => state.a * props.b

// 只有props (忽略 state 参数)
const cSelector =  (_, props) => props.c

// 只有state (props 参数被省略了，它不是必须的)
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

`defaultMemoize` 存储传递过来的函数到fun参数中。它是被`createSelector`使用的存储函数。

`defaultMemoize` 的缓存大小为1. 这意味着当一个参数的值发生变化时，它总是重新计算。

defaultMemoize`通过调用`equalityCheck`函数来确定一个参数是否发生了变化。由于`defaultMemoize`被设计用于与不可变数据一起使用，默认的`equalityCheck`函数使用引用全等来检查更改。:

```js
function defaultEqualityCheck(currentVal, previousVal) {
  return currentVal === previousVal
}
```

`defaultMemoize` 可以被 `createSelectorCreator` 用来 [自定义 `equalityCheck` 函数](#customize-equalitycheck-for-defaultmemoize).

### createSelectorCreator(memoize, ...memoizeOptions)

`createSelectorCreator` 可以用来自定义一个 `createSelector`.

`memoize`是一个用来替换`defaultMemoize`的存储函数

`...memoizeOptions` 展开参数有0个或者多个配置选项，它们被传递到`memoizeFunc`。选择器 `resultFunc`作为第一个参数被传递到`memoize`，而`memoizeOptions`作为第二个参数被传递：

```js
const customSelectorCreator = createSelectorCreator(
  customMemoize, // 这个函数被用来缓存resultFunc
  option1, // option1 将作为第二个参数被传递到customMemoize
  option2, // option1 将作为第三个参数被传递到customMemoize
  option3 // option1 将作为第四个参数被传递到customMemoize
)

const customSelector = customSelectorCreator(
  input1,
  input2,
  resultFunc // resultFunc 将被作为第一个参数传递给customMemoize
)
```

在内部， `customSelector`调用memoize function:

```js
customMemoize(resultFunc, option1, option2, option3)
```

下面是一些例子，教你如何使用`createSelectorCreator`:

#### Customize `equalityCheck` for `defaultMemoize`
为`defaultMemoize`自定义`equalityCheck`
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
使用来自lodash的memoize函数来进行无限缓存
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

`createStructuredSelector` 对于在使用Reselect时出现的常见模式，是一个方便的函数。传递给`connect`装饰器的选择器通常只获取其输入选择器的值并将其映射到对象中的键:

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

`createStructuredSelector`选择器接受一个对象，它的属性是输入选择器，并返回一个结构化的选择器。这个结构化选择器返回一个与`inputselector`参数相同的对象，但是这个选择器替换了它们的值.

```js
const mySelectorA = state => state.a
const mySelectorB = state => state.b

const structuredSelector = createStructuredSelector({
  x: mySelectorA,
  y: mySelectorB
})

const result = structuredSelector({ a: 1, b: 2 }) // will produce { x: 1, y: 2 }
```

结构化的选择器可以是嵌套的:

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
常见问题解答
### Q: Why isn’t my selector recomputing when the input state changes?
当输入状态发生变化时，为什么我的选择器不进行重新计算?

A: 检查您的记忆化函数是否与您的状态更新函数兼容(例如，reducer,如果您使用Redux)。例如，使用`createSelector`创建的选择器使用状态更新函数来修改现有对象，而不是每次都创建一个新对象，那么它将不能正常工作，。`createSelector`使用身份检查(`===`)来检测输入是否发生了变化，因此对现有对象进行变异不会触发选择器重新计算，因为对对象进行变异不会改变其标识。注意，如果使用Redux，对状态对象进行修改[几乎肯定是错误的](http://redux.js.org/docs/Troubleshooting.html).

下面的例子定义了一个简单的选择器，它判断todos数组中的第一个todo项是否已经完成:

```js
const isFirstTodoCompleteSelector = createSelector(
  state => state.todos[0],
  todo => todo && todo.completed
)
```

以下状态更新函数将**无法**和`isFirstTodoCompleteSelector`正常工作

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

以下状态更新函数将和`isFirstTodoCompleteSelector`正常工作

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

如果您没有使用Redux，并且需要使用可变数据，那么您可以使用`createSelectorCreator`来替换默认的记忆化 function，或者使用一个不同的相等检查函数。 查阅 [here](#use-memoize-function-from-lodash-for-an-unbounded-cache) 和 [here](#customize-equalitycheck-for-defaultmemoize) 的示例

### Q: Why is my selector recomputing when the input state stays the same?

当输入状态保持不变时，为什么选择器重新计算?

A: 检查你的记忆化函数与你的状态更新函数兼容(例如，reducer,如果你使用的是Redux)。例如，一个由`createSelector`创建的选择器可能会在每次更新中接收到一个新对象，不管它所包含的值是否发生了变化。`createSelector`使用身份检查(`===`)来检测输入是否发生了变化，因此在每次更新中返回一个新对象意味着选择器将在每次更新中重新计算。

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

上面的选择器将重新计算当每次`REMOVE_OLD`被调用时，因为 `Array.filter`总是返回一个新对象。然而，在大多数情况下，`REMOVE_OLD`操作不会改变todos的列表，因此重新计算是不必要的.

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

您可以在只有当一个深度的相等检查发现todos的列表实际上已经改变了，才通过从状态更新函数中返回一个新对象来消除不必要的重新计算:

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

或者，选择器中默认的`equalityCheck`函数可以被一个深度的相等检查代替:

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

始终检查，在状态更新函数中的一个替代的`equalityCheck`函数或深度相等检查的成本是否大于每次重新计算的成本。如果每次重新计算都是更便宜的选择，那么在这种情况下，Reselect不会给您带来任何好处，因为通过的`mapStateToProps`函数来`connect`更简单。

### Q: Can I use Reselect without Redux?
我可以使用Reselect，而不需要Redux
A: 是的。Reselect对任何其他的包都没有依赖性，因此尽管它被设计为与Redux一起使用，但是它可以独立使用。它目前在传统的Flux应用中被成功使用

> 如果你使用 `createSelector`创建了选择器，请确保它的参数是不可变的.
> 参阅 [here](#createselectorinputselectors--inputselectors-resultfunc)

### Q: How do I create a selector that takes an argument?
如何创建一个接收一个参数的选择器
A: 请记住，选择器可以访问React props，因此，如果您的参数是(或可作为)React props，那么您可以使用该功能。 [获取更多信息](#accessing-react-props-in-selectors) 

另外，Reselect对于创建接受参数的选择器并没有内置的支持，但是这里有一些实现类似功能的建议...

如果参数不是动态的你可以使用工厂函数:

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

普遍的共识 [here](https://github.com/reactjs/reselect/issues/38) 和 [over at nuclear-js](https://github.com/optimizely/nuclear-js/issues/14)如果选择器需要动态参数，那么该参数应该是store中的state。如果您决定需要一个带有动态参数的选择器，那么返回一个存储函数的选择器可能是合适的:

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
默认的记忆函数是不好，我可以用另一个吗?
A: 我们认为它对很多用例都很有用, 但你可以选择使用其他的. 参阅 [这些例子](#customize-equalitycheck-for-defaultmemoize).

### Q: How do I test a selector?
如何测试选择器
A: 对于给定的输入，选择器应该总是产生相同的输出。由于这个原因，他们很容易进行单元测试.

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

每个选择器都有一个`recomputations`方法，该方法将返回被重新计算的次数。它有可能对于检查一个选择器的记忆化函数是否正确地与状态更新函数一起工作(例如，reducer,如果您使用Redux)：

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

Additionally, selectors keep a reference to the last result function as `.resultFunc`. If you have selectors composed of many other selectors this can help you test each selector without coupling all of your tests to the shape of your state此外，选择器保留对最后一个结果函数的引用作为`.resultFunc`。如果您的选择器由许多其他选择器组成，这可以帮助您测试每个选择器，而不需要将所有的测试与state的模型耦合.

例如，如果你有一组这样的选择器:

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

然后是这样的一组单元测试:

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
computation count or create a "dummy" selector for each test.最后，每个选择器都有一个`resetRecomputations`方法，用来将重计算次数重置为0。它的用途是用于一个复杂的选择器
，这个选择器可能有很多独立的测试，并且你不想手动管理计算计数或为每个测试创建一个“dummy”选择器

### Q: How do I use Reselect with Immutable.js?
如何将Reselect与Immutable.js一同使用
A: 使用`createSelector`创建的选择器可以与Immutable.js的数据结构配合使用。

如果您的选择器是重新计算，并且您不认为状态发生了变化，请确保您知道哪个Immutable.js更新方法**总是**返回一个新对象，哪个方法在当集合实际发生变化时返回一个新对象。
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

如果一个选择器的输入被一个总是返回一个新对象的操作所更新，那么它可能会执行不必要的重新计算。 参考 [here](#q-why-is-my-selector-recomputing-when-the-input-state-stays-the-same) 了解关于为了消除不必要的重新计算使用像`Immutable.is`库一样进行深度相等检查的利弊的讨论。

### Q: Can I share a selector across multiple components?
能否在多个组件之间共享一个选择器

A: 使用`createSelector`创建的选择器的缓存大小为1。如果选择器的参数对于组件的每个实例都是不同的，那么这就使得它们不适合跨多个组件共享。有很多方法可以解决这个

* 创建一个工厂函数，该函数为每个组件实例返回一个新的选择器。在响应Redux v4.3或更高版本中，有内置的对工厂功能的支持 查看 [这个示例](#sharing-selectors-with-props-across-multiple-components)

* 创建一个缓存大小大于1的的自定义选择器。

### Q: Are there TypeScript Typings?

A: 是的! 它们包含在`package.json`中。 他们应该工作™.

### Q: 怎么创建一个 [curried](https://github.com/hemanth/functional-programming-jargon#currying) 选择器?

A: 尝试这些  经由 [MattSPalmer](https://github.com/MattSPalmer)提供的[帮助 函数](https://github.com/reactjs/reselect/issues/159#issuecomment-238724788)

## 相关项目

### [re-reselect](https://github.com/toomuchdesign/re-reselect)


通过包装`createSelector`来增强Reselect选择器，并返回由一个自定义解析器函数返回的cache键所索引的选择器。

当相同的选择器被重复地调用一个/几个不同的参数时，可以减少选择器重新计算。

### [reselect-map](https://github.com/HeyImAlex/reselect-map)

在对元素集合进行**非常昂贵**的计算时，可能会很有用，因为Reselect可能不会给您所需的缓存粒度。请查看reselect-maps的README。

**reselect-map中所做的优化只适用于少数情况。如果你不确定是否需要它，你就不需要！**

## License

MIT

[build-badge]: https://img.shields.io/travis/reactjs/reselect/master.svg?style=flat-square
[build]: https://travis-ci.org/reactjs/reselect

[npm-badge]: https://img.shields.io/npm/v/reselect.svg?style=flat-square
[npm]: https://www.npmjs.org/package/reselect

[coveralls-badge]: https://img.shields.io/coveralls/reactjs/reselect/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/reactjs/reselect
