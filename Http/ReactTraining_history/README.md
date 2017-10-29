# history [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/ReactTraining/history/master.svg?style=flat-square
[build]: https://travis-ci.org/ReactTraining/history

[npm-badge]: https://img.shields.io/npm/v/history.svg?style=flat-square
[npm]: https://www.npmjs.org/package/history

[`history`](https://www.npmjs.com/package/history) 是一个JavaScript库，可以让您轻松地管理JavaScript运行的会话历史。`history`将不同环境中的差异抽象出来，并提供一个最小的API，让您能够管理历史堆栈、导航、确认导航，以及在会话之间保持状态。

## 安装

使用 [npm](https://www.npmjs.com/):

    $ npm install --save history

然后和 [webpack](https://webpack.github.io/)这样的模块打包器配合使用, 你也可以使用别的:

```js
// 使用 ES6 模块
import createHistory from 'history/createBrowserHistory'

// 使用 CommonJS 模块
var createHistory = require('history').createBrowserHistory
```

在 [unpkg](https://unpkg.com)UMD构建也可以使用：

```html
<script src="https://unpkg.com/history/umd/history.min.js"></script>
```

You can find the library on `window.History`.

## 使用方法

`history`根据您的环境，为创建`history`对象提供了3种不同的方法。

- `createBrowserHistory` 用在支持 [HTML5 history API](http://diveintohtml5.info/history.html) (参阅 [cross-browser 兼容性](http://caniuse.com/#feat=history))的现代浏览器中。
- `createMemoryHistory` 是一个被用做一个参考实现，并可以被用来在非DOM环境中使用，比如 [React Native](https://facebook.github.io/react-native/) 或者测试环境。
- `createHashHistory` 用于在遗留web浏览器中使用

根据您希望使用的方法来跟踪历史记录，您将从包的根目录(例如. `history/createBrowserHistory`)直接`import`（或者`require`）这些方法中的一个。本文档的其余部分使用`createHistory`这个术语来指代这些实现中的任何一种。

基本用法如下:

```js
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

// 获取当前location
const location = history.location

// 监听当前location的更改
const unlisten = history.listen((location, action) => {
  // location是一个对象， 比如 window.location
  console.log(action, location.pathname, location.state)
})

// 使用push, replace, and go 来进行导航
history.push('/home', { some: 'state' })

// 为了停止侦听，请调用从listen()返回的函数。
unlisten()
```
每个`create`方法的选项及其默认值都是:

```js
createBrowserHistory({
  basename: '',             // 应用程序的基URL(见下文)
  forceRefresh: false,      // 设置为true会强制刷新完整的页面
  keyLength: 6,             // location.key的长度
  // 用于用户确认导航的函数(见下文)
  getUserConfirmation: (message, callback) => callback(window.confirm(message)) //默认使用
})

createMemoryHistory({
  initialEntries: [ '/' ],  // history堆栈中的初始URL数组
  initialIndex: 0,          // 初始位置在 history堆栈中的索引
  keyLength: 6,             //  location.key的长度
  // 用于用户确认导航的函数. 是必须的
  // 如果从过渡钩子返回字符串提示符 (见下文)
  getUserConfirmation: null
})

createHashHistory({
  basename: '',             // 应用程序的基URL (见下文)
  hashType: 'slash',        // 使用的hash类型 (下下问)
  // 用于用户确认导航的函数(见下文)
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
})
```

### 属性

Each `history` object has the following properties:

- `history.length` - The number of entries in the history stack
- `history.location` - The current location (see below)
- `history.action` - The current navigation action (see below)

Additionally, `createMemoryHistory` provides `history.index` and `history.entries` properties that let you inspect the history stack.

### Listening

You can listen for changes to the current location using `history.listen`:

```js
history.listen((location, action) => {
  console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
  console.log(`The last navigation action was ${action}`)
})
```

The `location` object implements a subset of [the `window.location` interface](https://developer.mozilla.org/en-US/docs/Web/API/Location), including:

- `location.pathname` - The path of the URL
- `location.search` - The URL query string
- `location.hash` - The URL hash fragment

Locations may also have the following properties:

- `location.state` - Some extra state for this location that does not reside in the URL (supported in `createBrowserHistory` and `createMemoryHistory`)
- `location.key` - A unique string representing this location (supported in `createBrowserHistory` and `createMemoryHistory`)

The `action` is one of `PUSH`, `REPLACE`, or `POP` depending on how the user got to the current URL.

### Navigation

`history` objects may be used programmatically change the current location using the following methods:

- `history.push(path, [state])`
- `history.replace(path, [state])`
- `history.go(n)`
- `history.goBack()`
- `history.goForward()`
- `history.canGo(n)` (only in `createMemoryHistory`)

When using `push` or `replace` you can either specify both the URL path and state as separate arguments or include everything in a single location-like object as the first argument.

1. A URL path *or*
2. A location-like object with `{ pathname, search, hash, state }`

```js
// Push a new entry onto the history stack.
history.push('/home')

// Push a new entry onto the history stack with a query string
// and some state. Location state does not appear in the URL.
history.push('/home?the=query', { some: 'state' })

// If you prefer, use a single location-like object to specify both
// the URL and state. This is equivalent to the example above.
history.push({
  pathname: '/home',
  search: '?the=query',
  state: { some: 'state' }
})

// Go back to the previous history entry. The following
// two lines are synonymous.
history.go(-1)
history.goBack()
```

**Note:** Location state is only supported in `createBrowserHistory` and `createMemoryHistory`.

### Blocking Transitions

`history` lets you register a prompt message that will be shown to the user before location listeners are notified. This allows you to make sure the user wants to leave the current page before they navigate away.

```js
// Register a simple prompt message that will be shown the
// user before they navigate away from the current page.
const unblock = history.block('Are you sure you want to leave this page?')

// Or use a function that returns the message when it's needed.
history.block((location, action) => {
  // The location and action arguments indicate the location
  // we're transitioning to and how we're getting there.

  // A common use case is to prevent the user from leaving the
  // page if there's a form they haven't submitted yet.
  if (input.value !== '')
    return 'Are you sure you want to leave this page?'
})

// To stop blocking transitions, call the function returned from block().
unblock()
```

**Note:** You'll need to provide a `getUserConfirmation` function to use this feature with `createMemoryHistory` (see below).

### Customizing the Confirm Dialog

By default, [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) is used to show prompt messages to the user. If you need to override this behavior (or if you're using `createMemoryHistory`, which doesn't assume a DOM environment), provide a `getUserConfirmation` function when you create your history object.

```js
const history = createHistory({
  getUserConfirmation(message, callback) {
    // Show some custom dialog to the user and call
    // callback(true) to continue the transiton, or
    // callback(false) to abort it.
  }
})
```

### Using a Base URL

If all the URLs in your app are relative to some other "base" URL, use the `basename` option. This option transparently adds the given string to the front of all URLs you use.

```js
const history = createHistory({
  basename: '/the/base'
})

history.listen(location => {
  console.log(location.pathname) // /home
})

history.push('/home') // URL is now /the/base/home
```

**Note:** `basename` is not suppported in `createMemoryHistory`.

### Forcing Full Page Refreshes in createBrowserHistory

By default `createBrowserHistory` uses HTML5 `pushState` and `replaceState` to prevent reloading the entire page from the server while navigating around. If instead you would like to reload as the URL changes, use the `forceRefresh` option.

```js
const history = createBrowserHistory({
  forceRefresh: true
})
```

### Modifying the Hash Type in createHashHistory

By default `createHashHistory` uses a leading slash in hash-based URLs. You can use the `hashType` option to use a different hash formatting.


```js
const history = createHashHistory({
  hashType: 'slash' // the default
})

history.push('/home') // window.location.hash is #/home

const history = createHashHistory({
  hashType: 'noslash' // Omit the leading slash
})

history.push('/home') // window.location.hash is #home

const history = createHashHistory({
  hashType: 'hashbang' // Google's legacy AJAX URL format
})

history.push('/home') // window.location.hash is #!/home
```

## Thanks

A big thank-you to [Dan Shaw](https://www.npmjs.com/~dshaw) for letting us use the `history` npm package name! Thanks Dan!

Also, thanks to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to run our build in real browsers.
