
# Request - 简化的 HTTP 客户端

[![npm package](https://nodei.co/npm/request.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/request/)

[![Build status](https://img.shields.io/travis/request/request/master.svg?style=flat-square)](https://travis-ci.org/request/request)
[![Coverage](https://img.shields.io/codecov/c/github/request/request.svg?style=flat-square)](https://codecov.io/github/request/request?branch=master)
[![Coverage](https://img.shields.io/coveralls/request/request.svg?style=flat-square)](https://coveralls.io/r/request/request)
[![Dependency Status](https://img.shields.io/david/request/request.svg?style=flat-square)](https://david-dm.org/request/request)
[![Known Vulnerabilities](https://snyk.io/test/npm/request/badge.svg?style=flat-square)](https://snyk.io/test/npm/request)
[![Gitter](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat-square)](https://gitter.im/request/request?utm_source=badge)


## 使用极其简单

Request 被设计成最简单的方式来进行 http 调用。它支持HTTPS 并且默认会跟踪重定向。

```js
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // 如果发生错误，打印错误
  console.log('statusCode:', response && response.statusCode); // 如果收到响应，就打印响应状态代码
  console.log('body:', body); // 为 Google 主页打印HTML。
});
```


## 内容列表

- [Streaming](#streaming)
- [Promises & Async/Await](#promises--asyncawait)
- [Forms](#forms)
- [HTTP Authentication](#http-authentication)
- [Custom HTTP Headers](#custom-http-headers)
- [OAuth Signing](#oauth-signing)
- [Proxies](#proxies)
- [Unix Domain Sockets](#unix-domain-sockets)
- [TLS/SSL Protocol](#tlsssl-protocol)
- [Support for HAR 1.2](#support-for-har-12)
- [**All Available Options**](#requestoptions-callback)


Request 还提供了一些[方便的方法](#方便的方法)，比如`request.defaults` 和 `request.post`，有大量的[使用示例](#示例)和几个[调试技术](#调试)。

---


## Streaming

您可以使用管道（pipe）将任何响应的可读流对接到一个文件流中。

```js
request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
```

你也可以将一个文件流对接到一个 PUT 或者 POST 请求。该方法还将检查文件扩展名，以将文件扩展映射到content-types(在本例中是`application/json`)，并在 PUT 请求中使用适当的`content-type` (如果 headers 还没有提供的话)。


```js
fs.createReadStream('file.json').pipe(request.put('http://mysite.com/obj.json'))
```

Request 也可以 `pipe` 到它自己。当这样做， `content-type` and `content-length` 会被保存到 PUT headers 中。

```js
request.get('http://google.com/img.png').pipe(request.put('http://mysite.com/img.png'))
```

当收到一个响应，Request 会发送一个 "response" 事件。 `response` 参数将会是 [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 的一个实例。

```js
request
  .get('http://google.com/img.png')
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  })
  .pipe(request.put('http://mysite.com/img.png'))
```

当正在进行流式请求的时候，为了能简单地处理错误，在使用 `pipe` 前监听 `error` 事件：

```js
request
  .get('http://mysite.com/doodle.png')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('doodle.png'))
```

现在，来点花哨的。

```js
http.createServer(function (req, resp) {
  if (req.url === '/doodle.png') {
    if (req.method === 'PUT') {
      req.pipe(request.put('http://mysite.com/doodle.png'))
    } else if (req.method === 'GET' || req.method === 'HEAD') {
      request.get('http://mysite.com/doodle.png').pipe(resp)
    }
  }
})
```

你也可以从 `http.ServerRequest` 实例 `pipe()` ，以及 `pipe()` 到 http.ServerResponse` 实例。HTTP method, headers, 和 entity-body 数据将被发送。 这意味着，你不需要担心安全性地问题，可以这样做：

```js
http.createServer(function (req, resp) {
  if (req.url === '/doodle.png') {
    var x = request('http://mysite.com/doodle.png')
    req.pipe(x)
    x.pipe(resp)
  }
})
```

由于 `pipe()` 在 ≥ Node 0.5.x 的版本中会返回目的流，因此你可以用一个行代理。:)

```js
req.pipe(request('http://mysite.com/doodle.png')).pipe(resp)
```

另外，这些新功能与 request 之前的特性没有任何冲突，只是扩展了它们。

```js
var r = request.defaults({'proxy':'http://localproxy.com'})

http.createServer(function (req, resp) {
  if (req.url === '/doodle.png') {
    r.get('http://google.com/doodle.png').pipe(resp)
  }
})
```

你仍然可以使用中间代理，request 仍然遵循 HTTP 转发，等等。

[回到顶部 ->](#table-of-contents)


---


## Promises & Async/Await

`request` 生来就支持 streaming 和 callback 接口。如果你想要 `request` 返回一个 Promise 代替，你可以为 `request` 使用一个另外地接口包装器。如果您喜欢使用 Promise，或者使用 ES2017 中的 `async`/`await`，那么这些包装器是有用的。

request 团队提供了几个可选的接口，包括：
- [`request-promise`](https://github.com/request/request-promise) (使用 [Bluebird](https://github.com/petkaantonov/bluebird) Promises)
- [`request-promise-native`](https://github.com/request/request-promise-native) (使用 native Promises)
- [`request-promise-any`](https://github.com/request/request-promise-any) (使用 [any-promise](https://www.npmjs.com/package/any-promise) Promises)


[回到顶部 ->](#table-of-contents)


---


## Forms

`request` 支持 `application/x-www-form-urlencoded` 和 `multipart/form-data` 表单上传。对于 `multipart/related` 指的是 `multipart` API.


#### application/x-www-form-urlencoded (URL-Encoded Forms)

URL-encoded forms 很简单。

```js
request.post('http://service.com/upload', {form:{key:'value'}})
// or
request.post('http://service.com/upload').form({key:'value'})
// or
request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
```


#### multipart/form-data (多部分表单上传)

对于 `multipart/form-data` 我们使用 [@felixge](https://github.com/felixge) 的 [form-data](https://github.com/form-data/form-data) 库。对于大多数情况，您可以通过 `formData` 选项传递您的上传表单数据。

```js
var formData = {
  // 传递一个简单的键值对
  my_field: 'my_value',
  // 通过 Buffers 传递数据
  my_buffer: new Buffer([1, 2, 3]),
  // 通过 Streams 传递数据
  my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
  // 传递多个值 /w 一个数组
  attachments: [
    fs.createReadStream(__dirname + '/attachment1.jpg'),
    fs.createReadStream(__dirname + '/attachment2.jpg')
  ],
  // 使用一个样式为 {value: DATA, options: OPTIONS} 的 'options' 对象传递可选的元数据（meta-data）。
  // 用例: 对于某些类型的流, 你需要手动地提供的 "file"-相关信息。
  // 查看 `form-data` README 以获得更多关于选项（options）的更多信息: https://github.com/form-data/form-data
  custom_file: {
    value:  fs.createReadStream('/dev/urandom'),
    options: {
      filename: 'topsecret.jpg',
      contentType: 'image/jpeg'
    }
  }
};
request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
```

对于高级的情况，您可以通过 `r.form()` 访问表单数据对象本身。这是可以修改的，直到在事件循环的下一个循环中触发请求。(注意，这个调用 `form()` 将为该请求清除当前设置的表单数据。)

```js
// 注意: 高级用例, 对于普通使用请查看上面的 'formData' 用法。
var r = request.post('http://service.com/upload', function optionalCallback(err, httpResponse, body) {...})
var form = r.form();
form.append('my_field', 'my_value');
form.append('my_buffer', new Buffer([1, 2, 3]));
form.append('custom_file', fs.createReadStream(__dirname + '/unicycle.jpg'), {filename: 'unicycle.jpg'});
```
参见 [form-data README](https://github.com/form-data/form-data) 获取更多信息和示例。


#### multipart/related

「不同的 HTTP 实现中的一些变体」在 「`multipart/related` (使用 multipart 选项)的边界之前或之后，或在之前和之后」需要一个 「newline/CRLF」。在 .NET WebAPI version 4.0 中这是可以被观测到的。您可以通过将它们作为 `true` 传递给您的请求选项来打开一个 boundary preambleCRLF 或 postamble

```js
  request({
    method: 'PUT',
    preambleCRLF: true,
    postambleCRLF: true,
    uri: 'http://service.com/upload',
    multipart: [
      {
        'content-type': 'application/json',
        body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
      },
      { body: 'I am an attachment' },
      { body: fs.createReadStream('image.png') }
    ],
    // 或者传递一个包含额外选项的对象。
    multipart: {
      chunked: false,
      data: [
        {
          'content-type': 'application/json',
          body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
        },
        { body: 'I am an attachment' }
      ]
    }
  },
  function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Upload successful!  Server responded with:', body);
  })
```

[回到顶部 ->](#table-of-contents)


---


## HTTP 身份验证

```js
request.get('http://some.server.com/').auth('username', 'password', false);
// 或者
request.get('http://some.server.com/', {
  'auth': {
    'user': 'username',
    'pass': 'password',
    'sendImmediately': false
  }
});
// 或者
request.get('http://some.server.com/').auth(null, null, true, 'bearerToken');
// 或者
request.get('http://some.server.com/', {
  'auth': {
    'bearer': 'bearerToken'
  }
});
```

如果传递一个选项对象，`auth`应该一个包含下面这些值的哈希：

- `user` || `username`
- `pass` || `password`
- `sendImmediately` (optional)
- `bearer` (optional)

方法表单接受参数
`auth(username, password, sendImmediately, bearer)`.

`sendImmediately` 默认为 `true`， 这将导致发送一个基本的或不记名身份验证头。
如果 `sendImmediately` 为 `false`，然后，`request` 将在收到来自服务器的 `401` 响应后使用适当的身份验证头进行重试(必须包含 `WWW-Authenticate` 头
指示所需的身份验证方法).

注意： 还可以使用 URL 本身指定基本身份验证，详细的信息 [RFC 1738](http://www.ietf.org/rfc/rfc1738.txt)。 
在主机名`@` 标志之前，简单地传递`user:password`:

```js
var username = 'username',
    password = 'password',
    url = 'http://' + username + ':' + password + '@some.server.com';

request({url: url}, function (error, response, body) {
   // Do more stuff with 'body' here
});
```

摘要身份认证（Digest authentication）是被支持的，当它仅在 `sendImmediately` 设置为 `false`工作；
否则，`request` 将在初始请求时发送一个基本的身份验证，这可能会导致请求失败。

不记名身份验证 (Bearer authentication) 是被支持的，当 `bearer`的值是可用的时候被激活。
`bearer`的值可以是一个 `String` 或者 一个返回`String` 的 `Function`。
如果与 `defaults` 结合，使用一个函数来提供不记名令牌（token）是特别有用的。
因为它允许单个函数在发送请求时提供最后一个已知的令牌，或者动态计算一个令牌。

[回到顶部 ->](#table-of-contents)


---


## 自定义 HTTP Headers

HTTP Headers, 如 `User-Agent`, 可以在 `options` 对象中设置。
在下面的示例中，我们调用 github API 来找出 request 仓库的 stars 和 forks 的数量。
这需要一个自定义的 `User-Agent` 头和 https。

```js
var request = require('request');

var options = {
  url: 'https://api.github.com/repos/request/request',
  headers: {
    'User-Agent': 'request'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
  }
}

request(options, callback);
```

[回到顶部 ->](#table-of-contents)


---


## 认证签名（OAuth Signing）

[OAuth version 1.0](https://tools.ietf.org/html/rfc5849) 被支持。默认的签名算法是
[HMAC-SHA1](https://tools.ietf.org/html/rfc5849#section-3.4.2):

```js
// OAuth1.0 - 3-legged 服务端流程 (Twitter example)
// step 1
var qs = require('querystring')
  , oauth =
    { callback: 'http://mysite.com/callback/'
    , consumer_key: CONSUMER_KEY
    , consumer_secret: CONSUMER_SECRET
    }
  , url = 'https://api.twitter.com/oauth/request_token'
  ;
request.post({url:url, oauth:oauth}, function (e, r, body) {

  //理想情况下，您可以将主体放在响应中，并构造一个用户单击的 URL(如按钮上的符号)。
  //验证器只有在用户通过了twitter的验证（他们正在授权你的应用程序）后的响应中才可用。

  // step 2
  var req_data = qs.parse(body)
  var uri = 'https://api.twitter.com/oauth/authenticate'
    + '?' + qs.stringify({oauth_token: req_data.oauth_token})
  // 将用户重定向到授权 uri

  // step 3
  // 在用户被重定向回服务器之后
  var auth_data = qs.parse(body)
    , oauth =
      { consumer_key: CONSUMER_KEY
      , consumer_secret: CONSUMER_SECRET
      , token: auth_data.oauth_token
      , token_secret: req_data.oauth_token_secret
      , verifier: auth_data.oauth_verifier
      }
    , url = 'https://api.twitter.com/oauth/access_token'
    ;
  request.post({url:url, oauth:oauth}, function (e, r, body) {
    // 准备代表用户签署已签名的请求
    var perm_data = qs.parse(body)
      , oauth =
        { consumer_key: CONSUMER_KEY
        , consumer_secret: CONSUMER_SECRET
        , token: perm_data.oauth_token
        , token_secret: perm_data.oauth_token_secret
        }
      , url = 'https://api.twitter.com/1.1/users/show.json'
      , qs =
        { screen_name: perm_data.screen_name
        , user_id: perm_data.user_id
        }
      ;
    request.get({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, user) {
      console.log(user)
    })
  })
})
```

对于 [RSA-SHA1 signing](https://tools.ietf.org/html/rfc5849#section-3.4.3), 对 OAuth 选项对象进行以下更改:
* 传递  `signature_method : 'RSA-SHA1'`
* 替代 `consumer_secret`，指定一个 `private_key` 字符串到
  [PEM format](http://how2ssl.com/articles/working_with_pem_files/) 中

对于 [PLAINTEXT signing](http://oauth.net/core/1.0/#anchor22), 对 OAuth 选项对象进行以下更改:
* 传递 `signature_method : 'PLAINTEXT'`

通过查询参数或在 oauth1 规范的[消费者请求参数](http://oauth.net/core/1.0/#consumer_req_param)部分中描述的一个post主体发送 OAuth 参数:
* 传递 `transport_method : 'query'` 或 `transport_method : 'body'` 到 OAuth
  选项对象中。
* `transport_method` 默认为 `'header'`

为了使用[请求主体哈希](https://oauth.googlecode.com/svn/spec/ext/body_hash/1.0/oauth-bodyhash.html) 你可以
* 手动地生成主体哈希并传递它作为一个字符串`body_hash: '...'`
* 传递 `body_hash: true` 来自动生成主体哈希。

[回到顶部 ->](#table-of-contents)


---


## Proxies

如果指定了一个 `proxy` 选项，那么请求(以及随后的任何重定向)将通过连接到代理服务器来发送。

如果您的端点是一个 `https` url，并且您正在使用一个代理，那么请求将*首先*发送一个 `CONNECT` 请求到代理服务器，然后使用所提供的连接连接到端点。

也就是说，首先它会发出这样的请求:

```
HTTP/1.1 CONNECT endpoint-server.com:80
Host: proxy-server.com
User-Agent: whatever user agent you specify
```

然后，代理服务器在端口 80 上对 `endpoint-server` 进行 TCP 连接，并返回一个看起来像这样的响应:

```
HTTP/1.1 200 OK
```

此时，连接将被打开，客户端将直接与 `endpoint-server.com` 机器进行通信。

查看 [关于 HTTP 隧道的维基百科页面](https://en.wikipedia.org/wiki/HTTP_tunnel)
获取更多信息。

在默认情况下，当代理 `http` 流量时，请求将简单地创建一个标准的代理 `http`请求。这是通过将请求的初始行的 `url` 部分作为端点的完全限定的 url 来完成的。

例如，它将发出一个看起来像这样的单一请求:

```
HTTP/1.1 GET http://endpoint-server.com/some-url
Host: proxy-server.com
Other-Headers: all go here

request body or whatever
```

由于纯粹的 "http over http" 隧道没有提供额外的安全性或其他特性，因此在这种情况下使用明确的 HTTP 代理通常更简单。但是，如果您希望强制使用隧道代理，那么您可以将 `tunnel` 选项设置为 `true`。

您还可以通过显式地设置 `tunnel : false` 来创建一个标准的代理 `http` 请求，但是**请注意，这将允许代理查看目标服务器的进出（to/from）流量(吞吐量)**。


You can also make a standard proxied `http` request by explicitly setting
`tunnel : false`, but **note that this will allow the proxy to see the traffic
to/from the destination server**.

如果您使用的是一个隧道代理，您可以设置 `proxyHeaderWhiteList` 来与代理共享某些头部。

您还可以设置 `proxyHeaderExclusiveList` 来共享某些特定的只使用代理，而不使用目的地主机的头。

默认情况下，这个集合是:

```
accept
accept-charset
accept-encoding
accept-language
accept-ranges
cache-control
content-encoding
content-language
content-length
content-location
content-md5
content-range
content-type
connection
date
expect
max-forwards
pragma
proxy-authorization
referer
te
transfer-encoding
user-agent
via
```

注意，在使用隧道代理时，`proxy-authorization` 头和来自自定义 `proxyHeaderExclusiveList` 的任何头都**不会**发送到端点服务器，而是只发送到代理服务器。


### 使用环境变量控制代理行为

`request` 遵循下面的环境变量:

 * `HTTP_PROXY` / `http_proxy`
 * `HTTPS_PROXY` / `https_proxy`
 * `NO_PROXY` / `no_proxy`

When `HTTP_PROXY` / `http_proxy` are set, they will be used to proxy non-SSL requests that do not have an explicit `proxy` configuration option present. Similarly, `HTTPS_PROXY` / `https_proxy` will be respected for SSL requests that do not have an explicit `proxy` configuration option. It is valid to define a proxy in one of the environment variables, but then override it for a specific request, using the `proxy` configuration option. Furthermore, the `proxy` configuration option can be explicitly set to false / null to opt out of proxying altogether for that request.

当设置了 `HTTP_PROXY` / `http_proxy` 时，它们将被用于代理「非 SSL」请求，这些请求没有显式的 `proxy` 配置选项。类似地，对于没有显式 `proxy` 配置选项的 SSL 请求，将遵循 `HTTPS_PROXY` / `https_proxy` 。在其中一个环境变量中定义一个代理是有效的，但是使用 `proxy` 配置选项将其覆盖到一个特定的请求。此外，`proxy` 配置选项可以显式地设置为 false/null，从而完全退出代理。

`request` 还可以意识到 `NO_PROXY`/`no_proxy` 环境变量。这些变量提供了一种粒度的方法，可以在每个主机基础上选择代理。它应该包含一个逗号分隔的主机列表，以选择退出代理。在使用特定的目标端口时，也可以选择代理。最后，该变量可能被设置为 `*` 以退出其他环境变量的隐式代理配置。

下面是一些有效的 `no_proxy` 值的例子:

 * `google.com` - 不将 HTTP/HTTPS 请求代理到 Google。
 * `google.com:443` - 不将 HTTPS 请求代理到 Google，但是可以将 HTTP 请求代理到 Google。
 * `google.com:443, yahoo.com:80` - 不将 HTTPS 请求代理到 Google，但是可以将 HTTP 请求代理到 Yahoo!
 * `*` - 完全忽略 `https_proxy`/`http_proxy` 环境变量。

[回到顶部 ->](#table-of-contents)


---


## UNIX Domain Sockets

`request` 支持向[UNIX Domain Sockets](https://en.wikipedia.org/wiki/Unix_domain_socket) 发出请求。要制作一个，请使用下面的 URL 方案:

```js
/* 模式 */ 'http://unix:SOCKET:PATH'
/* 示例 */ request.get('http://unix:/absolute/path/to/unix.socket:/request/path')
```

注意: `SOCKET` 路径被认为是对于主机文件系统的根是绝对路径。

[回到顶部 ->](#table-of-contents)


---


## TLS/SSL 协议

TLS/SSL 协议选项，如 `cert`, `key` 和 `passphrase`，可以直接在 `options` 对象中、`options` 对象的 `agentOptions` 属性中、`options` 对象的 `agentOptions`属性中，或者甚至是`https.globalAgent.options` 中设置。
请记住，尽管 `agentOptions` 允许使用更广泛的配置，但是推荐的方法是直接通过 `options` 对象，因为在已代理的环境中使用 `agentOptions` 或 `https.globalAgent.options` 不会采用相同的方式(因为数据经过 TLS 连接而不是 http/https 代理)。


```js
var fs = require('fs')
    , path = require('path')
    , certFile = path.resolve(__dirname, 'ssl/client.crt')
    , keyFile = path.resolve(__dirname, 'ssl/client.key')
    , caFile = path.resolve(__dirname, 'ssl/ca.cert.pem')
    , request = require('request');

var options = {
    url: 'https://api.some-server.com/',
    cert: fs.readFileSync(certFile),
    key: fs.readFileSync(keyFile),
    passphrase: 'password',
    ca: fs.readFileSync(caFile)
};

request.get(options);
```

### 使用 `options.agentOptions`

在下面的示例中，我们调用一个API，它需要客户端 SSL 证书(以 PEM 格式)，并使用 passphrase 保护的私钥(以PEM格式)，并禁用 SSLv3 协议:

```js
var fs = require('fs')
    , path = require('path')
    , certFile = path.resolve(__dirname, 'ssl/client.crt')
    , keyFile = path.resolve(__dirname, 'ssl/client.key')
    , request = require('request');

var options = {
    url: 'https://api.some-server.com/',
    agentOptions: {
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
        // 在使用 PFX 或者 PKCS12 格式的私钥，证书和 CA 证书时，使用 `pfx` 属性替换 `cert` 和 `key` 
        // pfx: fs.readFileSync(pfxFilePath),
        passphrase: 'password',
        securityOptions: 'SSL_OP_NO_SSLv3'
    }
};

request.get(options);
```

它只能通过指定 `secureProtocol` 来强制使用 SSLv3。

```js
request.get({
    url: 'https://api.some-server.com/',
    agentOptions: {
        secureProtocol: 'SSLv3_method'
    }
});
```

可以接受其他证书，而不是通常允许的证书颁发机构(CAs)签署的证书。例如，当使用自签名证书时，这是很有用的。为了 require 一个不同的根证书，您可以通过将 CA 的证书文件的内容添加到  `agentOptions` 来指定签名CA。域名出品的证书必须由指定的根证书签署：

```js
request.get({
    url: 'https://api.some-server.com/',
    agentOptions: {
        ca: fs.readFileSync('ca.cert.pem')
    }
});
```

[回到顶部 ->](#table-of-contents)


---

## 对 HAR 1.2 的支持

`options.har` 属性将覆盖值:`url`, `method`, `qs`, `headers`, `form`, `formData`, `body`, `json`，以及构造多部分数据（multipart data），并在 `request.postData.params[].fileName` 没有匹配 `value` 的情况下从磁盘读取文件。

验证步骤将检查 HAR Request 格式是否符合最新的规范(v1.2)，如果不匹配，则跳过解析。

```js
  var request = require('request')
  request({
    // 将被忽略
    method: 'GET',
    uri: 'http://www.google.com',

    // HTTP Archive Request Object
    har: {
      url: 'http://www.mockbin.com/har',
      method: 'POST',
      headers: [
        {
          name: 'content-type',
          value: 'application/x-www-form-urlencoded'
        }
      ],
      postData: {
        mimeType: 'application/x-www-form-urlencoded',
        params: [
          {
            name: 'foo',
            value: 'bar'
          },
          {
            name: 'hello',
            value: 'world'
          }
        ]
      }
    }
  })

  // 一个 POST 请求清北发送到 http://www.mockbin.com
  // 带一个 application/x-www-form-urlencoded 主体:
  // foo=bar&hello=world
```

[回到顶部 ->](#table-of-contents)


---

## request(options, callback)

第一个参数可以是一个 `url`，也可以是一个 `options` 对象。唯一必须的选项是 `uri`;其他都是可选的。

- `uri` || `url` - 完全合格的 uri，或者一个来自 `url.parse()` 的已解析的 url
- `baseUrl` - 一个完全合格的 uri，被用作基 url。fully qualified uri string used as the base url. 与 `request.defaults` 配合最有用处，例如，当想要对相同域名做很多次请求的时候。如果 `baseUrl` 是 `https://example.com/api/`，然后请求 `/end/point?test=true`，将获取 `https://example.com/api/end/point?test=true`。当给定了 `baseUrl`，`uri` 必须是一个字符串。
- `method` - http method (default: `"GET"`)
- `headers` - http headers (default: `{}`)

---

- `qs` - 对象。包含被附加到 uri` 的查询字符串值。
- `qsParseOptions` - 对象。包含传递到 [qs.parse](https://github.com/hapijs/qs#parsing-objects) 方法的一些选项。或者，使用这个格式 `{sep:';', eq:':', options:{}}` 传递选项给 [querystring.parse](https://nodejs.org/docs/v0.12.0/api/querystring.html#querystring_querystring_parse_str_sep_eq_options)
- `qsStringifyOptions` - 对象。包含传递到 [qs.stringify](https://github.com/hapijs/qs#stringifying) 方法的一些选项。或者使用这个格式 `{sep:';', eq:':', options:{}}` 传递选项给 [querystring.stringify](https://nodejs.org/docs/v0.12.0/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options) 方法。例如, 为了改变数组被转换为查询字符串的方式，使用 `qs` 模块传递  `arrayFormat` 选项(`indices|brackets|repeat` 中的一个 ) 。
- `useQuerystring` - 布尔值。若为 `true`, 使用 `querystring` 来字符串化和解析查询字符串，否则使用 `qs`。 (默认值: `false`) 。如果你需要数组被字符串化为 `foo=bar&foo=baz` 而不是默认的  `foo[0]=bar&foo[1]=baz`，请设置这个选项为 `true`。

---

- `body` - PATCH, POST 和 PUT 请求的实体主体 。必须是一个 `Buffer`, `String` 或者 `ReadStream`。如果 `json` 为 `true`，`body` 必须是一个可序列化为JSON的对象。
- `form` - 当传递一个对象或者查询字符串时，它将 `body` 设置为一个值的查询字符串表示，并添加 `Content-type: application/x-www-form-urlencoded` 头。当没有传递选项时，将返回一个 `FormData` 实例(并被 pipe 到请求)。参见上面的 [Forms](#forms) 部分。
- `formData` - 用于传递 `multipart/form-data` 请求的数据。参见上面的 [Forms](#forms) 部分。
- `multipart` - 包含了他们自己的头和 `body` 属性的对象数组。发送一个 `multipart/related` 请求。 参见上面的 [Forms](#forms) 部分。
  - 或者，您可以传入一个 `{chunked: false, data: []}` 来指示在何处使用 `chunked` 来指定请求是否以 [分块传输编码(chunked transfer encoding)](https://en.wikipedia.org/wiki/Chunked_transfer_encoding) 发送。在非块的请求中，不允许带有主体流的数据项。
- `preambleCRLF` - 在 `multipart/form-data` 请求的边界之前添加一个newline/CRLF。
- `postambleCRLF` - 在 `multipart/form-data` 请求的边界结束处添加一个 newline/CRLF。
- `json` - 设置`body` 为知道的 JSON 表示，并添加 `Content-type: application/json` 头。另外，将响应主体解析为JSON。
- `jsonReviver` - 一个 [reviver function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) ，当解析一个 JSON 请求主体时，它将被传递给 `JSON.parse()` 。
- `jsonReplacer` - 一个 [replacer function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) ，当字符串化一个 JSON 请求主体时，它将被传递给 `JSON.stringify()`。

---

- `auth` - 一个哈希，包含值 `user` || `username`, `pass` || `password`, 和 `sendImmediately` (可选). 参见上面的文档。
- `oauth` - OAuth HMAC-SHA1 签名的选项. 参见上面的文档。
- `hawk` - [Hawk signing](https://github.com/hueniverse/hawk) 的选项。`credentials` 键必须包含必要的签名信息，[参见 hawk 文档获得更多细节](https://github.com/hueniverse/hawk#usage-example).
- `aws` - `object`，包含 AWS 签名信息。 它应该有属性 `key`, `secret`, 和可选的 `session` (注意， 这只适用于需要会话作为规范（canonical）字符串的一部分的服务)。也需要 `bucket` 属性，除非你指定了 `bucket` 作为路径的一部分，或者不使用 bucket 的请求 (即 GET 服务)。如果想要使用 AWS 签名的第 4 个版本，将 `sign_version` 参数设置为 `4`，否则默认使用版本 2。 **注意:** 你首先需要使用 `npm install aws4` 安装它。
- `httpSignature` - 一些选项，提供给使用 [Joyent 的库](https://github.com/joyent/node-http-signature) 的 [HTTP 签名方案](https://github.com/joyent/node-http-signature/blob/master/http_signing.md) 。 `keyId` 和 `key` 属性必须被指定。参见仓库文档获得更多选项。

---

- `followRedirect` - 遵循 HTTP 3xx 响应作为重定向(默认值: `true`)。该属性还可以作为一个函数实现，它将 `response` 对象作为单个参数，如果重定向应该继续则应该返回`true`，否则返回 `false`。 
- `followAllRedirects` - 遵循 non-GET HTTP 3xx 响应作为重定向 (默认值: `false`)
- `followOriginalHttpMethod` - 默认情况下重定向到 HTTP 方法 GET。可以启用这个属性来重定向到原始的 HTTP 方法(默认: `false`)
- `maxRedirects` - 要执行的重定向的最大数量 (默认值: `10`)
- `removeRefererHeader` - 当重定向发生时，删除 referer 头(默认值：`false`)。**注意**:如果为 `true`，在重定向链中，在初始请求中设置的 referer 头信息被保留。

---

- `encoding` - encoding 被用到响应数据的 `setEncoding` 上。如果为 `null`，`body` 被作为一个 `Buffer` 返回。其他任何东西 **(包括 `undefined` 的默认值)** 都将作为 [encoding](http://nodejs.org/api/buffer.html#buffer_buffer) 参数被传递给 `toString()` (这意味着默认情况下是 `utf8`). (**注意:** 如果期望是二进制数据，你应该设置 `encoding: null`.)
- `gzip` - 如果为 `true`，添加一个 `Accept-Encoding` 头，用来从服务器请求被压缩的内容编码(如果不是已经存在的话)。，并在响应中解码受支持的内容编码。**注意：** 响应内容的自动解码是在通过 `request` 返回的主体数据上执行的(通过 `request` 流并传递给回调函数)，但是没有在 `response` 流（从 `response` 事件中获得）上执行，这是未修改的 `http.IncomingMessage` 对象，它可能包含被压缩的数据。请参见下面的例子。
- `jar` - 如果为 `true`，记住 cookies，以供将来使用(或者定义你的自定义 cookie jar；请参见下面的例子。)

---

- `agent` - `http(s).Agent` 实例
- `agentClass` - 另外指定 agent 的类名
- `agentOptions` - 传递给 agent 的选项。 **注意：** 对于 HTTPS ，请参见 [tls API doc for TLS/SSL options](http://nodejs.org/api/tls.html#tls_tls_connect_options_callback) 和 [上面的文档](#using-optionsagentoptions).
- `forever` - set to `true` to use the [forever-agent](https://github.com/request/forever-agent) **Note:** Defaults to `http(s).Agent({keepAlive:true})` in node 0.12+
- `pool` - an object describing which agents to use for the request. If this option is omitted the request will use the global agent (as long as your options allow for it). Otherwise, request will search the pool for your custom agent. If no custom agent is found, a new agent will be created and added to the pool. **Note:** `pool` is used only when the `agent` option is not specified.
  - A `maxSockets` property can also be provided on the `pool` object to set the max number of sockets for all agents created (ex: `pool: {maxSockets: Infinity}`).
  - Note that if you are sending multiple requests in a loop and creating
    multiple new `pool` objects, `maxSockets` will not work as intended. To
    work around this, either use [`request.defaults`](#requestdefaultsoptions)
    with your pool options or create the pool object with the `maxSockets`
    property outside of the loop.
- `timeout` - integer containing the number of milliseconds to wait for a
server to send response headers (and start the response body) before aborting
the request. Note that if the underlying TCP connection cannot be established,
the OS-wide TCP connection timeout will overrule the `timeout` option ([the
default in Linux can be anywhere from 20-120 seconds][linux-timeout]).

[linux-timeout]: http://www.sekuda.com/overriding_the_default_linux_kernel_20_second_tcp_socket_connect_timeout

---

- `localAddress` - local interface to bind for network connections.
- `proxy` - an HTTP proxy to be used. Supports proxy Auth with Basic Auth, identical to support for the `url` parameter (by embedding the auth info in the `uri`)
- `strictSSL` - if `true`, requires SSL certificates be valid. **Note:** to use your own certificate authority, you need to specify an agent that was created with that CA as an option.
- `tunnel` - controls the behavior of
  [HTTP `CONNECT` tunneling](https://en.wikipedia.org/wiki/HTTP_tunnel#HTTP_CONNECT_tunneling)
  as follows:
   - `undefined` (default) - `true` if the destination is `https`, `false` otherwise
   - `true` - always tunnel to the destination by making a `CONNECT` request to
     the proxy
   - `false` - request the destination as a `GET` request.
- `proxyHeaderWhiteList` - a whitelist of headers to send to a
  tunneling proxy.
- `proxyHeaderExclusiveList` - a whitelist of headers to send
  exclusively to a tunneling proxy and not to destination.

---

- `time` - if `true`, the request-response cycle (including all redirects) is timed at millisecond resolution. When set, the following properties are added to the response object:
  - `elapsedTime` Duration of the entire request/response in milliseconds (*deprecated*).
  - `responseStartTime` Timestamp when the response began (in Unix Epoch milliseconds) (*deprecated*).
  - `timingStart` Timestamp of the start of the request (in Unix Epoch milliseconds).
  - `timings` Contains event timestamps in millisecond resolution relative to `timingStart`. If there were redirects, the properties reflect the timings of the final request in the redirect chain:
    - `socket` Relative timestamp when the [`http`](https://nodejs.org/api/http.html#http_event_socket) module's `socket` event fires. This happens when the socket is assigned to the request.
    - `lookup` Relative timestamp when the [`net`](https://nodejs.org/api/net.html#net_event_lookup) module's `lookup` event fires. This happens when the DNS has been resolved.
    - `connect`: Relative timestamp when the [`net`](https://nodejs.org/api/net.html#net_event_connect) module's `connect` event fires. This happens when the server acknowledges the TCP connection.
    - `response`: Relative timestamp when the [`http`](https://nodejs.org/api/http.html#http_event_response) module's `response` event fires. This happens when the first bytes are received from the server.
    - `end`: Relative timestamp when the last bytes of the response are received.
  - `timingPhases` Contains the durations of each request phase. If there were redirects, the properties reflect the timings of the final request in the redirect chain:
    - `wait`: Duration of socket initialization (`timings.socket`)
    - `dns`: Duration of DNS lookup (`timings.lookup` - `timings.socket`)
    - `tcp`: Duration of TCP connection (`timings.connect` - `timings.socket`)
    - `firstByte`: Duration of HTTP server response (`timings.response` - `timings.connect`)
    - `download`: Duration of HTTP download (`timings.end` - `timings.response`)
    - `total`: Duration entire HTTP round-trip (`timings.end`)

- `har` - a [HAR 1.2 Request Object](http://www.softwareishard.com/blog/har-12-spec/#request), will be processed from HAR format into options overwriting matching values *(see the [HAR 1.2 section](#support-for-har-1.2) for details)*
- `callback` - alternatively pass the request's callback in the options object

The callback argument gets 3 arguments:

1. An `error` when applicable (usually from [`http.ClientRequest`](http://nodejs.org/api/http.html#http_class_http_clientrequest) object)
2. An [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) object (Response object)
3. The third is the `response` body (`String` or `Buffer`, or JSON object if the `json` option is supplied)

[回到顶部 ->](#table-of-contents)


---

## 方便的方法

There are also shorthand methods for different HTTP METHODs and some other conveniences.


### request.defaults(options)

This method **returns a wrapper** around the normal request API that defaults
to whatever options you pass to it.

**Note:** `request.defaults()` **does not** modify the global request API;
instead, it **returns a wrapper** that has your default settings applied to it.

**Note:** You can call `.defaults()` on the wrapper that is returned from
`request.defaults` to add/override defaults that were previously defaulted.

For example:
```js
//requests using baseRequest() will set the 'x-token' header
var baseRequest = request.defaults({
  headers: {'x-token': 'my-token'}
})

//requests using specialRequest() will include the 'x-token' header set in
//baseRequest and will also include the 'special' header
var specialRequest = baseRequest.defaults({
  headers: {special: 'special value'}
})
```

### request.METHOD()

These HTTP method convenience functions act just like `request()` but with a default method already set for you:

- *request.get()*: Defaults to `method: "GET"`.
- *request.post()*: Defaults to `method: "POST"`.
- *request.put()*: Defaults to `method: "PUT"`.
- *request.patch()*: Defaults to `method: "PATCH"`.
- *request.del() / request.delete()*: Defaults to `method: "DELETE"`.
- *request.head()*: Defaults to `method: "HEAD"`.
- *request.options()*: Defaults to `method: "OPTIONS"`.

### request.cookie()

Function that creates a new cookie.

```js
request.cookie('key1=value1')
```
### request.jar()

Function that creates a new cookie jar.

```js
request.jar()
```

[回到顶部 ->](#table-of-contents)


---


## 调试

There are at least three ways to debug the operation of `request`:

1. Launch the node process like `NODE_DEBUG=request node script.js`
   (`lib,request,otherlib` works too).

2. Set `require('request').debug = true` at any time (this does the same thing
   as #1).

3. Use the [request-debug module](https://github.com/request/request-debug) to
   view request and response headers and bodies.

[回到顶部 ->](#table-of-contents)


---

## Timeouts

Most requests to external servers should have a timeout attached, in case the
server is not responding in a timely manner. Without a timeout, your code may
have a socket open/consume resources for minutes or more.

There are two main types of timeouts: **connection timeouts** and **read
timeouts**. A connect timeout occurs if the timeout is hit while your client is
attempting to establish a connection to a remote machine (corresponding to the
[connect() call][connect] on the socket). A read timeout occurs any time the
server is too slow to send back a part of the response.

These two situations have widely different implications for what went wrong
with the request, so it's useful to be able to distinguish them. You can detect
timeout errors by checking `err.code` for an 'ETIMEDOUT' value. Further, you
can detect whether the timeout was a connection timeout by checking if the
`err.connect` property is set to `true`.

```js
request.get('http://10.255.255.1', {timeout: 1500}, function(err) {
    console.log(err.code === 'ETIMEDOUT');
    // Set to `true` if the timeout was a connection timeout, `false` or
    // `undefined` otherwise.
    console.log(err.connect === true);
    process.exit(0);
});
```

[connect]: http://linux.die.net/man/2/connect

## 示例

```js
  var request = require('request')
    , rand = Math.floor(Math.random()*100000000).toString()
    ;
  request(
    { method: 'PUT'
    , uri: 'http://mikeal.iriscouch.com/testjs/' + rand
    , multipart:
      [ { 'content-type': 'application/json'
        ,  body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
        }
      , { body: 'I am an attachment' }
      ]
    }
  , function (error, response, body) {
      if(response.statusCode == 201){
        console.log('document saved as: http://mikeal.iriscouch.com/testjs/'+ rand)
      } else {
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
    }
  )
```

For backwards-compatibility, response compression is not supported by default.
To accept gzip-compressed responses, set the `gzip` option to `true`. Note
that the body data passed through `request` is automatically decompressed
while the response object is unmodified and will contain compressed data if
the server sent a compressed response.

```js
  var request = require('request')
  request(
    { method: 'GET'
    , uri: 'http://www.google.com'
    , gzip: true
    }
  , function (error, response, body) {
      // body is the decompressed response body
      console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
      console.log('the decoded data is: ' + body)
    }
  )
  .on('data', function(data) {
    // decompressed data as it is received
    console.log('decoded chunk: ' + data)
  })
  .on('response', function(response) {
    // unmodified http.IncomingMessage object
    response.on('data', function(data) {
      // compressed data as it is received
      console.log('received ' + data.length + ' bytes of compressed data')
    })
  })
```

Cookies are disabled by default (else, they would be used in subsequent requests). To enable cookies, set `jar` to `true` (either in `defaults` or `options`).

```js
var request = request.defaults({jar: true})
request('http://www.google.com', function () {
  request('http://images.google.com')
})
```

To use a custom cookie jar (instead of `request`’s global cookie jar), set `jar` to an instance of `request.jar()` (either in `defaults` or `options`)

```js
var j = request.jar()
var request = request.defaults({jar:j})
request('http://www.google.com', function () {
  request('http://images.google.com')
})
```

OR

```js
var j = request.jar();
var cookie = request.cookie('key1=value1');
var url = 'http://www.google.com';
j.setCookie(cookie, url);
request({url: url, jar: j}, function () {
  request('http://images.google.com')
})
```

To use a custom cookie store (such as a
[`FileCookieStore`](https://github.com/mitsuru/tough-cookie-filestore)
which supports saving to and restoring from JSON files), pass it as a parameter
to `request.jar()`:

```js
var FileCookieStore = require('tough-cookie-filestore');
// NOTE - currently the 'cookies.json' file must already exist!
var j = request.jar(new FileCookieStore('cookies.json'));
request = request.defaults({ jar : j })
request('http://www.google.com', function() {
  request('http://images.google.com')
})
```

The cookie store must be a
[`tough-cookie`](https://github.com/SalesforceEng/tough-cookie)
store and it must support synchronous operations; see the
[`CookieStore` API docs](https://github.com/SalesforceEng/tough-cookie#cookiestore-api)
for details.

To inspect your cookie jar after a request:

```js
var j = request.jar()
request({url: 'http://www.google.com', jar: j}, function () {
  var cookie_string = j.getCookieString(url); // "key1=value1; key2=value2; ..."
  var cookies = j.getCookies(url);
  // [{key: 'key1', value: 'value1', domain: "www.google.com", ...}, ...]
})
```

[回到顶部 ->](#table-of-contents)
