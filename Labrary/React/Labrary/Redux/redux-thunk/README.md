Redux Thunk
=============

Thunk  是一个Redux [中间件](http://redux.js.org/docs/advanced/Middleware.html)

[![build status](https://img.shields.io/travis/gaearon/redux-thunk/master.svg?style=flat-square)](https://travis-ci.org/gaearon/redux-thunk) 
[![npm version](https://img.shields.io/npm/v/redux-thunk.svg?style=flat-square)](https://www.npmjs.com/package/redux-thunk)
[![npm downloads](https://img.shields.io/npm/dm/redux-thunk.svg?style=flat-square)](https://www.npmjs.com/package/redux-thunk)

```js
npm install --save redux-thunk
```

## 注意 2.x 的更新

 今天的大多数教程都假设是Redux Thunk 1.x。所以当你用2.x运行他们的代码时，你可能会遇到一个问题。
**如果你在CommonJS环境中使用Redux Thunk 2.x , [不要忘了添加`.default`到导入语句中](https://github.com/gaearon/redux-thunk/releases/tag/v2.0.0):**

```diff
- var ReduxThunk = require('redux-thunk')
+ var ReduxThunk = require('redux-thunk').default
```

如果使用 ES 模块, 这样做就好了:

```js
import ReduxThunk from 'redux-thunk' // no changes here 😀
```

另外, 从 2.x起， 我们也支持 [UMD build](https://npmcdn.com/redux-thunk@2.0.1/dist/redux-thunk.min.js):

```js
var ReduxThunk = window.ReduxThunk.default
```

正如您所看到的，它在句末也需要`.default`

## 为什么需要它？

如果你不确定是否需要它，那你可能不需要。

**[请阅读这篇关于Redux thunks的深入介绍。](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)**

## 动机

Redux Thunk [中间件](https://github.com/reactjs/redux/blob/master/docs/advanced/Middleware.md) 允许您编写返回一个函数而不是一个action的action creators。thunk可以用来延迟dispatch一个action，或者只在满足特定条件的情况下才进行dispatch。内部函数接收store的方法`dispatch`和`getState`作为参数。

一个action creator，返回一个函数来执行异步dispatch:

```js
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // 你可以dispatch同步或者异步
      dispatch(increment());
    }, 1000);
  };
}
```
一个action creator，返回一个函数来执行有条件的dispatch:


```js
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```

## 什么是thunk?!

[thunk](https://en.wikipedia.org/wiki/Thunk)是一个函数，它包装一个表达式来延迟它的求值。

```js
// 计算 1 + 2 是 立即执行的
// x === 3
let x = 1 + 2;

// 计算 of 1 + 2 是 延迟的
// 稍后可以调用foo来执行计算
// foo就是一个 thunk!
let foo = () => 1 + 2;
```


## 安装

```
npm install --save redux-thunk
```

然后, 使用 [`applyMiddleware()`](http://redux.js.org/docs/api/applyMiddleware.html)来启用 Redux Thunk
```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// 注意: 这个 API 需要 redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

## 构成

内部函数的返回值都将作为`dispatch`本身的返回值而可用。这对于编排一个异步控制流是很方便的，因为这些thunk action creators会互相dispatch，并返回Promise来等待对方完成:

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// 注意: 这个 API 需要 redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

function fetchSecretSauce() {
  return fetch('https://www.google.com/search?q=secret+sauce');
}

// 到目前为止你看到的都是一些普通的action creator。
// 它们返回的action可以在没有任何中间件的情况下被dispatch。
//但是，它们只表示“事实”，而不是“异步流”。

function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce
  };
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error
  };
}

function withdrawMoney(amount) {
  return {
    type: 'WITHDRAW',
    amount
  };
}

// 即使没有中间件，您也可以dispatch一个action:
store.dispatch(withdrawMoney(100));

// 但是当你需要启动一个异步action时，你会怎么做呢?
// 例如一个API调用，或者一个路由器转换

// 遇到 thunks.
// thunk 是一个函数，它返回一个函数
// 下面的就是一个thunk.

function makeASandwichWithSecretSauce(forPerson) {

  // 反转控制!
  // 返回一个接受`dispatch`参数的函数，这样我们就可以稍后进行dispatch。
  // Thunk 中间件知道怎么返回一个thunk异步action到 action列表中。

  return function (dispatch) {
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
}

// Thunk中间件让我们可以像dispatch普通action一样的方式来dispatch thunk异步action

store.dispatch(
  makeASandwichWithSecretSauce('Me')
);

// 它甚至会从dispatch里返回thunk的返回值，因此只要thunk里面返回的是一个Promise,那我们就可以链接。
// 意思有两点: dispatch可以返回一个thunk的返回值
// 这个返回值是一个Promise，那么就可以接续链接
store.dispatch(
  makeASandwichWithSecretSauce('My wife')
).then(() => {
  console.log('Done!');
});

// 事实上，我们可以嵌套dipatch action creaters,我可以用Promise来建立我的控制流程。

function makeSandwichesForEverybody() {
  return function (dispatch, getState) {
    if (!getState().sandwiches.isShopOpen) {

      // 你不需要返回Promise，但这是一个很方便的约定,因此，调用者可以在异步dispatch结果上调用.then()。

      return Promise.resolve();
    }

    // 我们可以同时dispatch普通的actions和其他thunks,这让我们可以在单个流中组合异步操作。

    return dispatch(
      makeASandwichWithSecretSauce('My Grandma')
    ).then(() =>
      Promise.all([
        dispatch(makeASandwichWithSecretSauce('Me')),
        dispatch(makeASandwichWithSecretSauce('My wife'))
      ])
    ).then(() =>
      dispatch(makeASandwichWithSecretSauce('Our kids'))
    ).then(() =>
      dispatch(getState().myMoney > 42 ?
        withdrawMoney(42) :
        apologize('Me', 'The Sandwich Shop')
      )
    );
  };
}

// 和对于服务端渲染非常有用，因为我们可以等待，知道数据可用为止，然后异步渲染应用

store.dispatch(
  makeSandwichesForEverybody()
).then(() =>
  response.send(ReactDOMServer.renderToString(<MyApp store={store} />))
);

// 我还可以从一个组件dispatch一个thunk异步action。
// 任何时候它的props更改都会加载丢失的数据。

import { connect } from 'react-redux';
import { Component } from 'react';

class SandwichShop extends Component {
  componentDidMount() {
    this.props.dispatch(
      makeASandwichWithSecretSauce(this.props.forPerson)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forPerson !== this.props.forPerson) {
      this.props.dispatch(
        makeASandwichWithSecretSauce(nextProps.forPerson)
      );
    }
  }

  render() {
    return <p>{this.props.sandwiches.join('mustard')}</p>
  }
}

export default connect(
  state => ({
    sandwiches: state.sandwiches
  })
)(SandwichShop);
```

## 注入一个自定义参数

从 2.1.0起, Redux Thunk支持使用`withExtraArgument`函数来注入一个自定义参数 :

```js
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
)

// 然后
function fetchUser(id) {
  return (dispatch, getState, api) => {
    // 你可以使用自定义参数了
  }
}
```
要传递多个东西，只需将它们封装在一个对象中，并使用解构:

```js
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument({ api, whatever }))
)

// 然后
function fetchUser(id) {
  return (dispatch, getState, { api, whatever }) => {
    // 你可以在这里使用api和其他东西
  }
}
```


## License

MIT
