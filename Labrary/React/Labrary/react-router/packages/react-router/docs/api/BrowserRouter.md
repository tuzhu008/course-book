## **`<BrowserRouter>`**
`<BrowserRouter>`是一种 `<Router>` ，它使用HTML5历史API(pushState, replaceState 和popstate event)来保持UI与URL的同步。

```js
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```
### **basename: string**


所有location的基URL。如果您的应用程序是在服务器上的子目录中提供的，那么您需要将其设置为子目录。一个格式正确的basename应该有一个头斜杠，但是没有尾斜杠。


```js
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // 渲染为 <a href="/calendar/today">
```
### **getUserConfirmation: func**

用于确认导航的函数。默认使用`window.confirm`。
```js
// 默认行为
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
```
### **forceRefresh: bool**

如果为true，路由器将在页面导航中使用完整的页面刷新。您可能只希望在不支持HTML5历史API的浏览器中这样做。

```js
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory}/>
```
### **keyLength: number**

`location.key`的长度，默认值为6

```js
<BrowserRouter keyLength={12}/>
```

### **children: node**
一个`单一的子元素`用来渲染