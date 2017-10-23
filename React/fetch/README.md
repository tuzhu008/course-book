# window.fetch polyfill

`fetch()`函数是一种基于Promise的机制，用来在浏览器中以编程的方式做网络请求。这个项目是一个实现标准的[Fetch 规范][]的一个子集的polyfill，足以使`fetch`成为可行的，
能够在传统的web应用程序中，替代大多数使用XMLHttpRequest的情况。

这个项目遵循[开源][]。通过参与,你也可以维护这段代码。

## Table of Contents

* [先读读这个](#先读读这个)
* [安装](#安装)
* [用法](#用法)
  * [HTML](#html)
  * [JSON](#json)
  * [Response metadata](#response-metadata)
  * [Post form](#post-form)
  * [Post JSON](#post-json)
  * [File upload](#file-upload)
  * [警告](#警告)
    * [处理HTTP错误状态](#处理HTTP错误状态s)
    * [发送cookies](#发送cookies)
    * [接收cookies](#接收cookies)
    * [获得响应URL](#获得响应URL)
* [支持的浏览器](#支持的浏览器)

## 先读读这个

* 如果你相信你发现了`fetch`在Chrome或火狐浏览器中的一个错误
  请 **不要在仓库中打开一个问题**. 这个项目是一个
  _polyfill_, 由于Chrome和Firefox都各自实现了`windows.fetch`
函数，项目中没有代码实际上对这些浏览器没有任何影响
。详细查看[支持的浏览器](#支持的浏览器)信息。
【译者注：】也就是说，产生问题，不要随便修改仓库，这可能不是fetch本身的错。

* 如果你在**向另一个领域提出请求**时遇到了麻烦(一个不同的
子域名或端口号也构成了另一个域),请再去熟悉关于
[CORS][]请求的所有复杂性和限制。 因为CORS需要服务器实现
特殊的HTTP响应头信息，设置或调试通常是非常重要的。CORS是
完全由浏览器的内部机制处理的，polyfill并不能做什么。

* 如果你通过`fetch`请求在**维护用户会话**或[CSRF][]保护方面遇到困难，请确保您已经阅读并理解了
[发送cookies](#发送cookies)部分。`fetch`并不能发送cookie，除非你要求。

* 这个项目**无法在Node环境工作**。这是用于web浏览器。您应该确保您的应用程序不会尝试打包并在服务器上运行这个。

* 若果你有一个关于`fetch`特性的好的想法，**提交你的特性请求**到[规范仓库](https://github.com/whatwg/fetch/issues)。我们只添加特性和API作为[Fetch 规范][]一部分。

## 安装

* `npm install whatwg-fetch --save`; 或者

* `bower install fetch`; 或者

* `yarn add whatwg-fetch`.

你还需要为[老旧浏览器](http://caniuse.com/#feat=promises)添加一个Promise polyfill。我们推荐[taylorhakes/promise-polyfill](https://github.com/taylorhakes/promise-polyfill)，因为它不仅小，而且Promises/A+ 兼容性好。

要使用webpack，在您的应用程序入口之前，在`entry`配置选项中添加这个包：

```javascript
entry: ['whatwg-fetch', ...]
```
为了能够正常使用Babel 和 ES2015+，请确保导入这个文件：

```javascript
import 'whatwg-fetch'
```

## 用法

polyfill支持的更全面的API，请[参考](./API.md)
https://github.github.io/fetch/.

### HTML

```javascript
fetch('/users.html')
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    document.body.innerHTML = body
  })
```

### JSON

```javascript
fetch('/users.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

### Response metadata

```javascript
fetch('/users.json').then(function(response) {
  console.log(response.headers.get('Content-Type'))
  console.log(response.headers.get('Date'))
  console.log(response.status)
  console.log(response.statusText)
})
```

### Post form

```javascript
var form = document.querySelector('form')

fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```

### Post JSON

```javascript
fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```

### File upload

```javascript
var input = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('file', input.files[0])
data.append('user', 'hubot')

fetch('/avatars', {
  method: 'POST',
  body: data
})
```

### 警告

The `fetch` specification differs from `jQuery.ajax()` in mainly two ways that
bear keeping in mind:
`fetch`规范与`jQuery.ajax()`不同主要有两种方式


* 从 `fetch()`返回的Promise **在Http错误状态时不会reject**，即使响应是HTTP 404或500。相反，它会正常地resolve，它只会在网络故障或任何阻止请求完成的情况下reject
。
* 默认情况下，`fetch`**不会发送或者接收任何来自于服务器cookies**，如果站点依赖于一个用户session，则会导致未经身份验证的请求。参见[发送cookies](#发送cookies)来如何选择cookie处理。

#### 处理HTTP错误状态

在HTTP错误状态下，来拥有`fetch` Promise reject，即，在任何非2xx上
状态，定义一个自定义的响应处理程序:

```javascript
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error 
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
```

#### 发送cookies

为了自动为当前域发送cookie, 必须提供`credentials` 选项:

```javascript
fetch('/users', {
  credentials: 'same-origin'
})
```

"same-origin" 值使 `fetch` 的行为与XMLHttpRequest 处理cookie的行为相似。否者, cookies不会被发送, 这些请求中的结果不保存身份验证会话。

为了能进行[CORS][]请求, 使用“include”值来允许发送凭据到
其他领域:

```javascript
fetch('https://example.com:1234/users', {
  credentials: 'include'
})
```

#### 接收cookies

与XMLHttpRequest一样，从服务器返回的`Set-Cookie`响应头是一个[forbidden header name][]，因此不能通过代码`response.headers.get()`来实现读取。相反，它是浏览器的责任，它会设置的新cookie(如果适用于当前的URL)。除非他们
只有http，新的cookie将通过`document.cookie`提供。

记住，`fetch`的默认行为是完全忽略`Set-Cookie`
头完全。要选择接受来自服务器的cookie，您必须使用
`credentials`选项。

#### 获得响应URL

由于XMLHttpRequest的限制，在老的浏览器上的HTTP重定向之后，`response.url`值可能不是可靠的。
。

解决方案是，在可能发生的任何重定向之后，配置服务器来设置响应HTTP头`X-Request-URL`到当前URL。无条件地设置它是安全的。

``` ruby
# Ruby on Rails controller example
response.headers['X-Request-URL'] = request.url
```

如果在Firefox < 32, Chrome < 37, Safari, or IE.需要可靠的`response.url`，这个服务器方案是必要的。

## 支持的浏览器

- Chrome
- Firefox
- Safari 6.1+
- Internet Explorer 10+

注意:Chrome、Firefox、Microsoft Edge和Safari等现代浏览器都有本地实现的`window.fetch`。因此，来自这个polyfill的代码不会对这些浏览器有任何影响。如果你认为你遇到了错误
，`window.fetch` 是在这些浏览器中如何实现的，您应该琢磨
这是一个浏览器厂商的问题，而不是这个项目。


  [Fetch 规范]: https://fetch.spec.whatwg.org
  [开源]: http://todogroup.org/opencodeofconduct/#fetch/opensource@github.com
  [cors]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
    "Cross-origin resource sharing"
  [csrf]: https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet
    "Cross-site request forgery"
  [forbidden header name]: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
