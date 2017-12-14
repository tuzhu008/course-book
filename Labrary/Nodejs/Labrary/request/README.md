
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
- [Promises & Async/Await](#promises-asyncawait)
- [Forms](#forms)
- [HTTP 身份验证](#http-身份验证)
- [自定义 HTTP Headers](#自定义-http-headers)
- [认证签名（OAuth Signing）](#认证签名oauth-signing)
- [Proxies](#proxies)
- [UNIX Domain Sockets](#unix-domain-sockets)
- [TLS/SSL 协议](#tlsssl-协议)
- [对 HAR 1.2 的支持](#对-har-12-的支持)
- [**All Available Options**](#requestoptions-callback)
- [方便的方法](#方便的方法)
- [调试](#调试)
- [Timeouts](#timeouts)
- [示例](#示例)





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

- `uri` || `url` - 完全合格的 uri，或者一个来自 `url.parse()` 的已解析的 url 对象
- `baseUrl` - 一个完全合格的 uri，被用作基 url。 与 `request.defaults` 配合最有用处，例如，当想要对相同域名做很多次请求的时候。如果 `baseUrl` 是 `https://example.com/api/`，然后请求 `/end/point?test=true`，将获取 `https://example.com/api/end/point?test=true`。当给定了 `baseUrl`，`uri` 必须是一个字符串。
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
- `postambleCRLF` - 在 `multipart/form-data` 请求的边界之前添加一个newline/CRLF。
- `json` - 设置`body` 为知道的 JSON 表示，并添加 `Content-type: application/json` 头。另外，将响应主体解析为JSON。
- `jsonReviver` - 一个 [reviver function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) ，当解析一个 JSON 请求主体时，它将被传递给 `JSON.parse()` 。
- `jsonReplacer` - 一个 [replacer function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) ，当字符串化一个 JSON 请求主体时，它将被传递给 `JSON.stringify()`。



---

- `auth` - 一个哈希，包含值 `user` || `username`, `pass` || `password`, 和 `sendImmediately` (可选). 参见上面的文档。
- `oauth` - 用于OAuth HMAC-SHA1 签名的选项. 参见上面的文档。
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
- `forever` - 设为 `true` 以使用 [forever-agent](https://github.com/request/forever-agent) **注意：** 在 node 0.12+ 中默认为 `http(s).Agent({keepAlive:true})`
- `pool` - 一个描述用于请求的代理（agent）的对象。如果这个选项被省略，请求将使用全局代理(只要你的设置允许这样做)。否则请求将在池（pool）中搜索自定义代理。如果没有找到自定义的代理，就会创建一个新的代理并将其添加到池。**注意：** `pool` 仅在 `agent` 选项未被指定的时候使用。
  - A `maxSockets` 属性可以被提供到 `pool` 对象，用以为所有被创建的代理设置最大的套接字（sockets）数量。(例如: `pool: {maxSockets: Infinity}`).
  - 注意，如果你在一个循环中发送了多个请求并创建了多个新的 `pool` 对象，`maxSockets` 将不能按预期工作。为了解决这个问题，请同时使用  [`request.defaults`](#requestdefaultsoptions)与 pool 选项或者在循环之外创建一个池对象并设置 `maxSockets` 属性。
- `timeout` - 一个整数，包含等待服务器发送响应头(并启动响应体)的毫秒数，超过这个事件，则中止请求。注意，如果不能建立底层的 TCP 连接，那么操作系统范围（OS-wide）的 TCP 连接超时将超过 `timeout` 选项（[Linux 中默认值可以是 20-120 秒][linux-timeout]）。

[linux-timeout]: http://www.sekuda.com/overriding_the_default_linux_kernel_20_second_tcp_socket_connect_timeout

---

- `localAddress` - 用来绑定网络连接的本地接口。
- `proxy` - 使用的 HTTP 代理。支持使用 Basic Auth 的 代理 Auth，与 `url` 参数的支持完全相同(通过将认证信息嵌入到 `uri` 中)
- `strictSSL` - 如果为 `true`, 要求 SSL 证书是有效的。**注意：** 为了使用你自己的认证中心，您需要指定使用该 CA 作为选项创建的代理（agent）。
- `tunnel` - 控制 [HTTP `CONNECT` 隧道](https://en.wikipedia.org/wiki/HTTP_tunnel#HTTP_CONNECT_tunneling) 的行为，
  如下：
   - `undefined` (默认) - `true` 如果目的地是 `https`，`false` 其他情况
   - `true` - 通过向代理（proxy）发送一个 `CONNECT` 请求，始终通过隧道到达目的地
   - `false` - 作为一个 `GET` 请求（名词），请求（动词）目的地。
- `proxyHeaderWhiteList` - 一个 headers 白名单，用来发送一个隧道代理（tunneling proxy）。
- `proxyHeaderExclusiveList` - 一个 headers 白名单，只发送给一个隧道代理，而不是目的地。

---

- `time` - 如果为 `true`，请求-响应周期(包括所有重定向)都以毫秒级精度进行计时。在设置时，以下属性将被添加到响应对象:
  - `elapsedTime` Duration of the entire request/response in milliseconds (*已弃用*).
  - `responseStartTime` Timestamp when the response began (in Unix Epoch milliseconds) (*已弃用*).
  - `timingStart` 请求开始的时间戳 (in Unix Epoch milliseconds).
  - `timings` 事件相对于 `timingStart`的时间戳，毫秒级。 如果有重定向，这个属性反映了重定向链中的最终请求的时间(timings):
    - `socket` 一个相对时间戳，[`http`](https://nodejs.org/api/http.html#http_event_socket) 模块的  `socket` 事件触发的时间。当将套接字分配给请求时，就会发生这种情况。
    - `lookup` 一个相对时间戳，[`net`](https://nodejs.org/api/net.html#net_event_lookup) 模块的 `lookup` 事件触发的时间。这是在DNS被解析时发生的。
    - `connect`: 一个相对时间戳，[`net`](https://nodejs.org/api/net.html#net_event_connect) 模块的 `connect` 事件触发的时间 。当服务器承认TCP连接时，就会发生这种情况。
    - `response`: 一个相对时间戳，[`http`](https://nodejs.org/api/http.html#http_event_response) 模块的 `response` 事件触发的事件。当从服务器接收到第一个字节时，就会发生这种情况。
    - `end`: 一个相对时间戳，当接收到响应的最后一个字节时。
  - `timingPhases` 包含每个请求阶段的持续时间。如果有重定向，则属性反映重定向链中的最终请求的时间（timings）：
    - `wait`: 套接字初始化时长(`timings.socket`)
    - `dns`: DNS查询时长(`timings.lookup` - `timings.socket`)
    - `tcp`: TCP连接的持续时长 (`timings.connect` - `timings.socket`)
    - `firstByte`: HTTP服务器响应持续时长 (`timings.response` - `timings.connect`)
    - `download`: HTTP下载时长 (`timings.end` - `timings.response`)
    - `total`: 整个 HTTP 往返（round-trip）的持续时长 (`timings.end`)

- `har` - 一个 [HAR 1.2 请求对象](http://www.softwareishard.com/blog/har-12-spec/#request)，将从 HAR 格式处理为覆盖匹配值的选项 *(参见 [HAR 1.2 部分](#support-for-har-1.2) 获取细节)*
- `callback` - 在选项对象中另外传递请求的回调


这个回调有 3 个参数:

1. 一个 `error` 对象，发生错误时可用 (通常来自[`http.ClientRequest`](http://nodejs.org/api/http.html#http_class_http_clientrequest) 对象)
2. 一个 [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 对象 (响应对象)
3. 第三个是 `response` 主体 (`String` or `Buffer`, 或者 JSON 对象（如果提供了 `json` 选项）)

名称 | 类型 | 描述 | 默认值
---------|----------|---------|:---------:
 `uri` \|\| `url` | String \|\| Object | 完全合格的 uri，或者一个来自 `url.parse()` 的已解析的 url 对象 |-
`baseUrl`| String | 一个完全合格的 uri，被用作基 url。 与 `request.defaults` 配合最有用处，例如，当想要对相同域名做很多次请求的时候。如果 `baseUrl` 是 `https://example.com/api/`，然后请求 `/end/point?test=true`，将获取 `https://example.com/api/end/point?test=true`。当给定了 `baseUrl`，`uri` 必须是一个字符串。 |-
 `method` | String | http 方法 | `"GET"`
 `headers` | Object | http 头 | `{}`
 `qs` | Object | 包含被附加到 uri` 的查询字符串值。 | -
 `qsParseOptions` | Object | 包含传递到 [qs.parse](https://github.com/hapijs/qs#parsing-objects) 方法的一些选项。或者，使用这个格式 `{sep:';', eq:':', options:{}}` 传递选项给 [querystring.parse](https://nodejs.org/docs/v0.12.0/api/querystring.html#querystring_querystring_parse_str_sep_eq_options) | -
 `qsStringifyOptions` | Object | 包含传递到 [qs.stringify](https://github.com/hapijs/qs#stringifying) 方法的一些选项。或者使用这个格式 `{sep:';', eq:':', options:{}}` 传递选项给 [querystring.stringify](https://nodejs.org/docs/v0.12.0/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options) 方法。例如, 为了改变数组被转换为查询字符串的方式，使用 `qs` 模块传递  `arrayFormat` 选项(`indices|brackets|repeat` 中的一个 ) 。| -
 `useQuerystring` | Boolean | 若为 `true`, 使用 `querystring` 来字符串化和解析查询字符串，否则使用 `qs`。 (默认值: `false`) 。如果你需要数组被字符串化为 `foo=bar&foo=baz` 而不是默认的  `foo[0]=bar&foo[1]=baz`，请设置这个选项为 `true`。| `false`
 `body` | Buffer \|\| String \|\| ReadStram \|\| Json-Object| PATCH, POST 和 PUT 请求的实体主体 。 | -
 `form` | String \|\| Object | 当传递一个对象或者查询字符串时，它将 `body` 设置为一个值的查询字符串表示，并添加 `Content-type: application/x-www-form-urlencoded` 头。当没有传递选项时，将返回一个 `FormData` 实例(并被 pipe 到请求)。 | -
  `formData` |  | 用于传递 `multipart/form-data` 请求的数据。 | -
  `multipart` | Array | 包含了他们自己的头和 `body` 属性的对象数组。发送一个 `multipart/related` 请求。 | -
  `preambleCRLF` | Boolean | 在 `multipart/form-data` 请求的边界之前添加一个newline/CRLF。 | `false`
  `postambleCRLF` | Boolean | 在 `multipart/form-data` 请求的边界之前添加一个newline/CRLF。| `false`
  `json` | Boolean | 设置`body` 为知道的 JSON 表示，并添加 `Content-type: application/json` 头。另外，将响应主体解析为JSON。| `false`
  `jsonReviver` | Function | 一个 [reviver function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) ，当解析一个 JSON 请求主体时，它将被传递给 `JSON.parse()` 。 | -
  `jsonReplacer`| Function | 一个 [replacer function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) ，当字符串化一个 JSON 请求主体时，它将被传递给 `JSON.stringify()`。 | -
  `auth` |   | 一个哈希，包含值 `user` || `username`, `pass` || `password`, 和 `sendImmediately` (可选).  | -
  `oauth` |   |  用于OAuth HMAC-SHA1 签名的选项. | -
  `hawk` |   |  Hawk signing](https://github.com/hueniverse/hawk) 的选项。`credentials` 键必须包含必要的签名信息，[参见 hawk 文档获得更多细节](https://github.com/hueniverse/hawk#usage-example). |
  `aws`  | Object  | 包含 AWS 签名信息。 它应该有属性 `key`, `secret`, 和可选的 `session` (注意， 这只适用于需要会话作为规范（canonical）字符串的一部分的服务)。也需要 `bucket` 属性，除非你指定了 `bucket` 作为路径的一部分，或者不使用 bucket 的请求 (即 GET 服务)。如果想要使用 AWS 签名的第 4 个版本，将 `sign_version` 参数设置为 `4`，否则默认使用版本 2。 **注意:** 你首先需要使用 `npm install aws4` 安装它。  | -
  `httpSignature`  | Object  |  提供给使用 [Joyent 的库](https://github.com/joyent/node-http-signature) 的 [HTTP 签名方案](https://github.com/joyent/node-http-signature/blob/master/http_signing.md) 。 `keyId` 和 `key` 属性必须被指定。参见仓库文档获得更多选项。 |
  `followRedirect`  | Boolean \|\| Function  |  遵循 HTTP 3xx 响应作为重定向。该属性还可以作为一个函数实现，它将 `response` 对象作为单个参数，如果重定向应该继续则应该返回`true`，否则返回 `false`。 | `true`
  `followAllRedirects`  |  Boolean |  遵循 non-GET HTTP 3xx 响应作为重定向。| `false`
  `followOriginalHttpMethod`  |  Boolean | 默认情况下重定向到 HTTP 方法 GET。可以启用这个属性来重定向到原始的 HTTP 方法  | `false`
  `maxRedirects`  |  Number |  要执行的重定向的最大数量 | `10`
  `removeRefererHeader`  |  Boolean | 当重定向发生时，删除 referer 头。**注意**:如果为 `true`，在重定向链中，在初始请求中设置的 referer 头信息被保留。  | `false`
  `encoding` |  String  | encoding 被用到响应数据的 `setEncoding` 上。如果为 `null`，`body` 被作为一个 `Buffer` 返回。其他任何东西 **(包括 `undefined` 的默认值)** 都将作为 [encoding](http://nodejs.org/api/buffer.html#buffer_buffer) 参数被传递给 `toString()` (这意味着默认情况下是 `utf8`). (**注意:** 如果期望是二进制数据，你应该设置 `encoding: null`.)  | `utf8`
  `gzip` | Boolean  |  如果为 `true`，添加一个 `Accept-Encoding` 头，用来从服务器请求被压缩的内容编码(如果不是已经存在的话)。，并在响应中解码受支持的内容编码。**注意：** 响应内容的自动解码是在通过 `request` 返回的主体数据上执行的(通过 `request` 流并传递给回调函数)，但是没有在 `response` 流（从 `response` 事件中获得）上执行，这是未修改的 `http.IncomingMessage` 对象，它可能包含被压缩的数据。请参见下面的例子。 | `false`
  `jar`  |  Bealean |  如果为 `true`，记住 cookies，以供将来使用 | `false`
  `agent` |   |  `http(s).Agent` 实例 | -
  `agentClass` |   | 另外指定 agent 的类名  |-
  `agentOptions`  |   |  传递给 agent 的选项。 **注意：** 对于 HTTPS ，请参见 [tls API doc for TLS/SSL options](http://nodejs.org/api/tls.html#tls_tls_connect_options_callback) 和 [上面的文档](#using-optionsagentoptions).| -
  `forever` |  Boolean |  设为 `true` 以使用 [forever-agent](https://github.com/request/forever-agent) **注意：** 在 node 0.12+ 中默认为 `http(s).Agent({keepAlive:true})` | `false`
  `pool`  |  Object |  一个描述用于请求的代理（agent）的对象。如果这个选项被省略，请求将使用全局代理(只要你的设置允许这样做)。否则请求将在池（pool）中搜索自定义代理。如果没有找到自定义的代理，就会创建一个新的代理并将其添加到池。**注意：** `pool` 仅在 `agent` 选项未被指定的时候使用。 | -
  `timeout`  | Number  |  一个整数，包含等待服务器发送响应头(并启动响应体)的毫秒数，超过这个事件，则中止请求。注意，如果不能建立底层的 TCP 连接，那么操作系统范围（OS-wide）的 TCP 连接超时将超过 `timeout` 选项（[Linux 中默认值可以是 20-120 秒][linux-timeout]）。 | -
  `localAddress` |   |  用来绑定网络连接的本地接口。 | -
  `proxy` |   |  使用的 HTTP 代理。支持使用 Basic Auth 的 代理 Auth，与 `url` 参数的支持完全相同(通过将认证信息嵌入到 `uri` 中) |-
  `strictSSL`  |  Boolean | 如果为 `true`, 要求 SSL 证书是有效的。**注意：** 为了使用你自己的认证中心，您需要指定使用该 CA 作为选项创建的代理（agent）。  | `false`
  `tunnel`  |   | 控制 [HTTP `CONNECT` 隧道](https://en.wikipedia.org/wiki/HTTP_tunnel#HTTP_CONNECT_tunneling) 的行为。 | -
  `proxyHeaderWhiteList`  |   |  一个 headers 白名单，用来发送一个隧道代理（tunneling proxy）。 | -
  `proxyHeaderExclusiveList`  |   | 一个 headers 白名单，只发送给一个隧道代理，而不是目的地。 | -
  `time` | Boolean  |  如果为 `true`，请求-响应周期(包括所有重定向)都以毫秒级精度进行计时。在设置时，以下属性将被添加到响应对象: |-
  `har` | Object  |  一个 [HAR 1.2 请求对象](http://www.softwareishard.com/blog/har-12-spec/#request)，将从 HAR 格式处理为覆盖匹配值的选项 *(参见 [HAR 1.2 部分](#support-for-har-1.2) 获取细节)* | -
  `callback`  | Function  |  在选项对象中另外传递请求的回调,这个回调有 3 个参数。| -


[回到顶部 ->](#table-of-contents)



---

## 方便的方法

对于不同的 HTTP 方法和其他一些便利，也有一些简单的方法。


### request.defaults(options)

该方法将**返回一个包装器**，围绕常规请求API。它会将你传递给它的任何选项作为默认值。「译者注：也就是返回了一个将自定义设置作为默认值的包装器，当使用这个包装器进行其他的操作时，这些被设置的值都将是默认的。」

**注意:** `request.defaults()` **不会** 修改全局的请求 API；
相反, 它 **返回一个包装器** ，会将设置应用给它作为默认值。
**注意:** 你可以在包装器上调用 `.defaults()` ,这是从 `request.defaults` 返回的，添加/覆盖以前默认的默认值。

示例:
```js
//请求使用 baseRequest() 将设置 'x-token' 头
var baseRequest = request.defaults({
  headers: {'x-token': 'my-token'}
})

//请求使用 specialRequest() 将包含 在baseRequest 设置的 'x-token' 头
// 也会包含 'special' 头
var specialRequest = baseRequest.defaults({
  headers: {special: 'special value'}
})
```

### request.METHOD()

这些 HTTP 方法便利函数就像 `request()`，但是已经为您设置了一个默认的方法:

- *request.get()*: 默认为 `method: "GET"`.
- *request.post()*: 默认为 `method: "POST"`.
- *request.put()*: 默认为 `method: "PUT"`.
- *request.patch()*: 默认为 `method: "PATCH"`.
- *request.del() / request.delete()*: 默认为 `method: "DELETE"`.
- *request.head()*: 默认为 `method: "HEAD"`.
- *request.options()*: 默认为 `method: "OPTIONS"`.

### request.cookie()

创建一个新 cookie 的函数。

```js
request.cookie('key1=value1')
```
### request.jar()

创建一个新的 cookie jar 的函数。

```js
request.jar()
```

[回到顶部 ->](#table-of-contents)


---


## 调试

至少有三种方法可以调试 `request`的操作:

1. 启动 node 进程，如`NODE_DEBUG=request node script.js`
   (`lib,request,otherlib` works too).

2. 设置 `require('request').debug = true` 在任何时候 (这和方法1是一样的).

3. 使用 [request-debug module](https://github.com/request/request-debug) 来查看请求和响应头和主体。

[回到顶部 ->](#table-of-contents)


---

## Timeouts

大多数对外部服务器的请求都应该有一个超时，以防服务器没有及时响应。如果没有超时，您的代码可能会有一个套接字打开/消耗资源几分钟或更多。

有两种主要类型的超时:**连接超时**和**读取超时**。如果在您的客户端尝试建立到远程计算机的连接(对应于套接字上的 [connect() 调用][connect] )时，就会出现连接超时。任何时候服务器都太慢了，无法发送响应的一部分，就会出现读取超时。

这两种情况对于请求的错误有不同的影响，因此能够区分它们是很有用的。您可以通过检查 `err.code` 的 'ETIMEDOUT' 值来检测超时错误。此外，您可以通过检查`err.connect` 是否被设置为 `true`来检测超时是否是连接超时。

```js
request.get('http://10.255.255.1', {timeout: 1500}, function(err) {
    console.log(err.code === 'ETIMEDOUT');
    // Set to `true` 如果超时是一个连接超时，为 `true`，
    // 否则为 `false` 或者 `undefined`
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

为了向后兼容性，默认情况下不支持响应压缩。
要接受 经过 gzip 压缩的响应，将 `gzip` 选项设置为 `true`。
注意，通过 `request` 传递的主体数据会自动地解压缩，而响应对象未被修改，
如果服务器发送压缩的响应，则响应将会包含压缩的数据。

```js
  var request = require('request')
  request(
    { method: 'GET'
    , uri: 'http://www.google.com'
    , gzip: true
    }
  , function (error, response, body) {
      // body 是经过压缩的响应主体
      console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
      console.log('the decoded data is: ' + body)
    }
  )
  .on('data', function(data) {
    // 当收到数据时，对它进行解压
    console.log('decoded chunk: ' + data)
  })
  .on('response', function(response) {
    // 为修改 http.IncomingMessage 对象
    response.on('data', function(data) {
      // 接收到的压缩数据
      console.log('received ' + data.length + ' bytes of compressed data')
    })
  })
```

默认情况下，cookie 是禁用的(否则，它们将在后续请求中使用)。要启用 cookie，将 `jar` 设置为 `true`(在 `defaults` 或 `options`中)。

```js
var request = request.defaults({jar: true})
request('http://www.google.com', function () {
  request('http://images.google.com')
})
```

要使用自定义的 cookie jar (而不是 `request` 的全局 cookie jar)，将 `jar` 设置为 `request.jar()` 的实例。(在 `defaults` 或 `options` 中)

```js
var j = request.jar()
var request = request.defaults({jar:j})
request('http://www.google.com', function () {
  request('http://images.google.com')
})
```

或者

```js
var j = request.jar();
var cookie = request.cookie('key1=value1');
var url = 'http://www.google.com';
j.setCookie(cookie, url);
request({url: url, jar: j}, function () {
  request('http://images.google.com')
})
```

要使用自定义的 cookie 仓库（例如
[`FileCookieStore`](https://github.com/mitsuru/tough-cookie-filestore)，它支持从 JSON 文件中保存和恢复），将它作为一个参数传递给 `request.jar()`:

```js
var FileCookieStore = require('tough-cookie-filestore');
// 注意 - 目前的 'cookies.json' 文件必须存在！
var j = request.jar(new FileCookieStore('cookies.json'));
request = request.defaults({ jar : j })
request('http://www.google.com', function() {
  request('http://images.google.com')
})
```

该 cookie 仓库必须时一个 [`tough-cookie`](https://github.com/SalesforceEng/tough-cookie) 仓库，并且它必须支持同步操作。参见
[`CookieStore` API 文档](https://github.com/SalesforceEng/tough-cookie#cookiestore-api)
获取细节。

在请求后检查 cookie jar :

```js
var j = request.jar()
request({url: 'http://www.google.com', jar: j}, function () {
  var cookie_string = j.getCookieString(url); // "key1=value1; key2=value2; ..."
  var cookies = j.getCookies(url);
  // [{key: 'key1', value: 'value1', domain: "www.google.com", ...}, ...]
})
```

[回到顶部 ->](#table-of-contents)
