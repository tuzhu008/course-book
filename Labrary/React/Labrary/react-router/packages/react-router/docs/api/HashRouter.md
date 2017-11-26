# `<HashRouter>`
`<HashRouter>`是一个 `<Router>` ，它使用URL的hash部分(例如:window.location.hash)来保持UI与URL的同步。

**重要提示**: 

hash历史不支持`location.key`或`location.state`。在之前的版本中，我们试图对这种行为进行处理，但是有一些我们无法解决的问题。任何需要这种行为的代码或插件都不会起作用。由于此技术仅用于支持遗留浏览器，因此我们鼓励您将服务器配置为使用`<BrowserHistory>`代替。

```js
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App/>
</HashRouter>
```
## basename: string

所有location的基URL。一个格式正确的basename应该有一个头斜杠，但是没有尾斜杠。
````js
<HashRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="#/calendar/today">
````
## getUserConfirmation: func

用于确认导航的函数。默认使用`window.confirm`。

```js
// 默认行为
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<HashRouter getUserConfirmation={getConfirmation}/>
```
## hashType: string

用于`window.location.hash`的编码类型。可用值:


- **"slash"**：创建hash 如 `#/ and #/sunshine/lollipops`
- **"noslash"**：创建hash 如 `# and #sunshine/lollipops`
- **"hashbang"**：创建` “ajax crawlable”` (谷歌弃用) hash 如 `#!/ and #!/sunshine/lollipops`


默认值： `"slash"`

## children: node

一个用来渲染的`单一子元素`