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

每个 `history`对象都有下面这些属性： 

- `history.length` - history 堆栈的条目数
- `history.location` - 当前的location (见下文)
- `history.action` - 当前的导航动作(见下文)



另外, `createMemoryHistory` 提供 `history.index` 和 `history.entries`属性，让你能检查history堆栈。

### 监听

你可以使用`history.listen`来监听当前location的变化：

```js
history.listen((location, action) => {
  console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
  console.log(`The last navigation action was ${action}`)
})
```

`location`实现了[_`window.location` 接口_](https://developer.mozilla.org/en-US/docs/Web/API/Location)的一个子集

- `location.pathname` - URL的路径
- `location.search` - URL的查询字符串
- `location.hash` - URL hash 片段


Locations也可以有下列属性：

- `location.state` - 这个location的额外状态不存在于URL中(`createBrowserHistory` 和 `createMemoryHistory`中支持这个属性)
- `location.key` - 表示该位置的唯一字符串 (`createBrowserHistory` 和 `createMemoryHistory`支持该属性)

`action` 的值是 `PUSH`、 `REPLACE`、 `POP` 它们当中的一个，取决于用户是如何到达当前URL的。

### 导航

`history`对象可以以编程方式使用以下方法更改当前位置:

- `history.push(path, [state])`
- `history.replace(path, [state])`
- `history.go(n)`
- `history.goBack()`
- `history.goForward()`
- `history.canGo(n)` (仅支持在`createMemoryHistory`使用)

当使用`push`或`replace`时，可以将URL路径和状态指定为单独的参数，或者将所有内容都包含在一个单一的类似location的对象中，作为第一个参数。

1. 一个URL路径 *or*
2. 一个类location对象 `{ pathname, search, hash, state }`

```js
// 推入一个新条目到history堆栈 顶部.
history.push('/home')

// 推入一条含有查询字符串和一些状态的新条目到history堆栈顶部
//位置state不会出现在URL中。
history.push('/home?the=query', { some: 'state' })

// 如果愿意，你可以使用一个类location对象来指定URL和state。
// 这与上面的例子是等价的。
history.push({
  pathname: '/home',
  search: '?the=query',
  state: { some: 'state' }
})

// 退回到以前的history条目
// 下面两行代码是等价的
history.go(-1)
history.goBack()
```

**注意:** Location state 仅在`createBrowserHistory` 和 `createMemoryHistory`被支持。

### 阻止过度

`history`允许您注册一个提示消息，消息会在位置侦听器收到通知之前，将显示给用户。这使您可以在跳转之前确保 用户的确想离开当前页面。

```js

// 注册一个简单的提示信息，它将在用户从当前页面跳转以前之前显示
const unblock = history.block('Are you sure you want to leave this page?')

// 或者使用一个在需要时返回消息的函数。
history.block((location, action) => {

  // location和action参数表明我们正在过渡的locaio以及我们怎么到达那里

  // 一个常见的用例是防止用户离开页面，如果他们还没有提交表单的话。
  if (input.value !== '')
    return 'Are you sure you want to leave this page?'
})

// 为了停止阻塞，调用从block()返回的函数。
unblock()
```

**注意:** 
使用`getUserConfirmation`时，你需要提供一个`getUserConfirmation`方法来使用这个特性（见下文）。

### 自定义 Confirm 对话框
默认情况下, 使用[`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) 来显示提示信息给用户。如果你需要覆盖这个行为 (或者你正在使用 `createMemoryHistory`，一个不假定为DOM的环境)，在你想要创建你的history对象时，请提供一个`getUserConfirmation` 函数。


```js
const history = createHistory({
  getUserConfirmation(message, callback) {
    //给用户显示一些自定义对话框并调用 callback(true)来继续过度，或者调用callback(false)来中止。
  }
})
```

### 使用 基URL

如果你的应用程序的URLs都是相对于一些其他"基" URL，请使用`basename`选项。这个选项透明地将给定的字符串添加到您使用的所有URL的前面。

```js
const history = createHistory({
  basename: '/the/base'
})

history.listen(location => {
  console.log(location.pathname) // /home
})

history.push('/home') // 现在URL是 /the/base/home
```

**注意:** `createMemoryHistory`不支持`basename`.

### 在createBrowserHistory中强制完整页面刷新


默认情况下，`createBrowserHistory`使用HTML5的`pushState`和`replaceState`来阻止当在导航时从服务器重新加载整个页面

```js
const history = createBrowserHistory({
  forceRefresh: true
})
```

### 在createHashHistory中修改Hash类型


默认情况下，`createHashHistory`在基于hash的URLs上使用一个头`slash`。你可以使用`hashType`来使用不一样的hash片段

```js
const history = createHashHistory({
  hashType: 'slash' // 默认值
})

history.push('/home') // window.location.hash 是 #/home

const history = createHashHistory({
  hashType: 'noslash' // 省略头 slash
})

history.push('/home') // window.location.hash 是#home

const history = createHashHistory({
  hashType: 'hashbang' // Google的遗留AJAX URL格式
})

history.push('/home') // window.location.hash 是#!/home
```

## 致谢

非常感谢[Dan Shaw](https://www.npmjs.com/~dshaw) 允许我们使用`history` npm 包名！ Thanks Dan!

也谢谢 [BrowserStack](https://www.browserstack.com/)为我们在实际浏览器中运行我们的构建的提供基础设施的支持。
