# `<MemoryRouter>`

`<MemoryRouter>`是一个[`<Router>`](Router.md)，它将你的“URL”的历史保存在内存中(不读或写地址栏)。在测试和非浏览器环境中很有用，如[React Native](https://facebook.github.io/react-native/)

```js
import { MemoryRouter } from 'react-router'

<MemoryRouter>
  <App/>
</MemoryRouter>
```

## initialEntries: array
初始化条目

history堆栈中的一个`location`数组。它们可能是具有`{ pathname, search, hash, state }`或简单字符串URLs的成熟location对象。

```js
<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>
```

## initialIndex: number

初始location在`initialEntries`数组中的索引。

## getUserConfirmation: func


用于确认导航的函数。当您配合一个[`<Prompt>`](./Prompt.md)直接使用`<MemoryRouter>`时您必须使用这个选项。

## keyLength: number

`location.key`的长度，默认值为6

```js
<MemoryRouter keyLength={12}/>
```

## children: node

一个[单一子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only) 用来渲染。
