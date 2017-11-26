# history

术语“history”和“`history`对象”在这个文档是指[the `history` package](https://github.com/ReactTraining/history),这是React Router的两个主要依赖中的一个（除了React本身）,并在各种环境中提供了几个不同的管理会话历史的Javascript的实现。

以下术语也被使用:

- **"browser history"**：一个特定于DOM的实现，在支持HTML5 history API的web浏览器中很有用
- **"hash history"**：用于遗留web浏览器的特定于DOM的实现
- **"memory history"**：内存中的history实现，在测试和非DOM环境中很有用，比如React Native

`history`对象通常具有以下属性和方法:

- `length` - (number) history堆栈中的条目数
- `action` - (string) 当前的动作 (`PUSH`, `REPLACE`, or `POP`)
- `location` - (object) 当前位置。可能有以下属性:
  - `pathname` - (string) URL的路径
  - `search` - (string) URL查询字符串
  - `hash` - (string) URL的hash片段
  - `state` - (string) 所提供的特定位置的状态。举例来说，当这个location被推到堆栈上时，`push(path, state)`。只有在浏览器和内存history中才可用。
- `push(path, [state])` - (function) 将一个新条目添加到history堆栈中
- `replace(path, [state])` - (function) 替换history堆栈上的当前条目
- `go(n)` - (function) 在shistory堆栈中按条目移动n个指针
- `goBack()` - (function) 相当于 `go(-1)`
- `goForward()` - (function) 相当于 `go(1)`
- `block(prompt)` - (function) 防止导航 (参见 [ history 文档](https://github.com/ReactTraining/history#blocking-transitions))

## history是可变的

history对象是可变的。例如:
在此之前，推荐从[`<Route>`](./Route.md)的`render`的props访问[`location`](./location.md)（`({location} =>{})`），而不是从`history.location`。这确保了您对React的设想在生命周期钩子中是正确的。例如:
```js
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // will be true
    const locationChanged = nextProps.location !== this.props.location

    // 错误的, **永远**都是错误的，因为history是可变的。
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}

<Route component={Comp}/>
```

根据您所使用的实现，还可能出现其他属性。请参考[ history文档](https://github.com/ReactTraining/history#properties)获得更多信息。[中文文档](/Http/ReactTraining_history/README.md)
