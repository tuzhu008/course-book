# **Fetch**

这个文档是 [WHATWG fetch规范.
](https://fetch.spec.whatwg.org/)可兼容旧浏览器的部分。

使用简介 (使用参数链接来查找更多):

```js
fetch(url, options).then(function(response) {
  // handle HTTP response
}, function(error) {
  // handle network error
})
```
更多用例:
```js
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin" //同域
}).then(function(response) {
  response.status     //=> number 100–599
  response.statusText //=> String
  response.headers    //=> Headers
  response.url        //=> String

  return response.text()
}, function(error) {
  error.message //=> String
})
```
## **Request**

简介: `new Request(url, options)`

Request 代表通过`fetch()`执行的HTTP请求。通常，一个Request不需要手动构造，因为在调用`fetch()`时，它是在内部实例化的。

###** URL ([Request](#request)or string)**

正在获取的资源的URL。通常，这是一个没有主机组件的绝对URL。比如：`/path`。如果URL有另一个站点的主机， 请求是按照[CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)执行的。

任何非Request对象将被转换成一个字符串,使它能够传递一个[URL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)的一个实例,例如。

可以使用另一个Request实例来初始化请求，以替代URL。在这种情况下，URL和其他选项是从提供的Request对象继承的。

### **Options**

- `method` (String) - HTTP 请求方法. 默认: "GET"
- `body` (String, body types) - HTTP请求主体
- `headers` (Object, Headers) - 默认: {}
- `credentials` (String) - 身份验证凭证模式. 默认: "omit"
  - `omit` - 在请求中不包括身份验证凭证(例如. cookies) 
  - `same-origin` - 在相同站点的请求中包含凭据
  - `include` - 在所有站点的请求中包含凭据


### **Body types**
|          Class      |                     Default Content-Type        |
| :-----------------: | -----------------------------------------------:|
| String              |              text/plain;charset=UTF-8           |
| [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)     | application/x-www-form-urlencoded;charset=UTF-8 |
| [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)            |              multipart/form-data                |
| [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)                |    inherited from the blob.type property        |
| [ArrayBuffer ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)        |                                                 |
| [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)            |                                                 |
| [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)            |                                                 |

其他数据结构需要预先编码为上述类型之一。例如，jsonify(data)可以用于将数据结构序列化为JSON字符串。

请注意，HTTP服务器通常要求与主体一起发布的请求也通过`Content-Type`的请求头指定它们的类型。也就时同时指定body和headers。

```js
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

## **Response**

Response表示来自服务器的HTTP响应。通常情况下，响应不是手动构造的，但是可以作为对已resolved的promise回调的参数。
```js
fetch('/users.html')
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    document.body.innerHTML = body
  })
```

### **Properties**

- status (number) - HTTP响应码，范围在 100–599
- statusText (String) - 服务器报告的状态文本, 例如 "Unauthorized"
- ok (boolean) - HTTP为 2xx时为 true
- headers (Headers)
- url (String)

### **Body methods**

访问响应主体的每个方法都返回一个Promise，当相关的数据类型就绪时，这个承诺将被resolve。

- `text()` - 将响应文本作为字符串生成
- `json()` - 返回JSON.parse(responseText)的结果，也就是将Json解析为普通对象
- `blob()` - 产生一个 [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
- `arrayBuffer()` - 产生一个 [ArrayBuffer ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- `formData()` - 产生 [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) ，这可以被转发到另一个请求中

### **Other response methods**

- `clone()`
- `Response.error()`
- `Response.redirect()`

## **Headers**

简介: `new Headers(hash)`

Headers表示一组请求/响应的HTTP头。它允许用名称对大小写不敏感的查找，也可以合并单个头的多个值。

### **Methods**

- `has(name)` (boolean)
- `get(name)` (String)
- `set(name, value)`
- `append(name, value)`
- `delete(name)`
- `orEach(function(value, name){ ... }, [thisContext])`

## **Error**

如果存在网络错误或HTTP请求无法实现的另一个原因（被阻止），fetch()承诺将被拒绝，并引用该错误。

注意，在HTTP 4xx或5xx服务器响应的情况下，这个承诺**不会**被拒绝。这个承诺将会像HTTP 2xx一样得到解决。在已解析的回调中，检查`response.status`,将服务器错误的条件处理添加到您的代码中。
```js
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

或者
```

fetch(...).then(function(response) {
  if (response.ok) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
})
```
## **警告**

`fetch`不能兼容整个标准。 一些显著的差异包括:

- 无法 [设置重定向模式](https://github.com/github/fetch/issues/137)
- 无法 [改变缓存指令](https://github.com/github/fetch/issues/438#issuecomment-261272466)
- 无法 [禁用同源cookies](https://github.com/github/fetch/pull/56#issuecomment-68835992)