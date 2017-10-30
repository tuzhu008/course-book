
基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用。
## <font color=#D02B34> **引入**
### <font color=#08A3E4> **1、npm**

```
npm install axios --save-dev
```
axios是不能够像vuex和vue-router一样注入各个字组件中的。所以不能在`main.js`中，是**无效**的：

```
import axios from 'axios';

new Vue ({
	el: 'app',
	axios
});
```
只能在需要Http请求的组件中导入

```
import axios from 'axios';
export default({
	mounted () {
		console.log(typeof(axios)); //function
	}
});
```

###<font color=#08A3E4> **2、CDN**

在main.js头部或者需要服务的组件中插入。
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
这里只是示例，URL有效性并未验证，请自行寻找。

##<font color=#D02B34> **请求类型**

###<font color=#08A3E4> **1、GET**

###<font color=#08A3E4> **2、POST**
###<font color=#08A3E4> **3、PUT**
put查询的时候是按照路由的方式来的，而axios的`params`参数是作为查询的参数，会拼接为`notes/?id=12123`的形式，put需求的是`notes/id`所以url要自己拼接。因此params参数只适用于GET,POST,HEAD
###<font color=#08A3E4> **4、PATCH**
###<font color=#08A3E4> **5、DELETE**

```js
axios({
	//删除的时候不加?id=
    url: 'http://localhost:9090/notes/' + note.id, 
    method: 'DELETE'
  })
  .then((res) => {
      console.log('删除成功');
    }, (res) => {
      console.log('删除失败');
    })
  .catch((res) => {
      console.log('抛出错误');
    });
```

###<font color=#08A3E4> **6、HEAD**
##<font color=#D02B34> **请求配置**

```
{
  // `url` 是用于请求的服务器URL
  url: '/user',

  // `method` 是在发出请求时使用的请求方法
  method: 'get', // 默认

  // `baseURL` 会作为 `url`的前缀， 除非 `url` 是绝对路径. 
  // 设置baseURL以传递相对url是很方便的。
  // 对当前实例有效
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在发送到服务器之前对请求数据进行更改
  // 这只适用于请求方法的“PUT”、“POST”和“PATCH”
  // 数组中的最后一个函数必须返回一个字符串或一个ArrayBuffer
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],

  // `transformResponse` 允许在响应的数据被创建前对它进行更改
  // 它将被传递到 then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` 是要发送的自定义消息头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是要用请求发送的URL参数
  //源码中拼接为？id=12345&
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个可选的函数，用于序列化 `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求体发送的数据
  // 只适用于请求方法： 'PUT', 'POST', and 'PATCH'
  // 当没有设置 `transformRequest` 时, 必须是一个字符串，ArrayBuffer或者一个哈希
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时前的毫秒数。
  // 如果请求的时间超过超时，则请求将被中止。
  timeout: 1000,

  // `withCredentials` 表示是否跨站点访问控制请求
  // 应该使用凭证来做
  withCredentials: false, // default

  // `adapter` 允许定制处理请求，使测试更容易。
  // 调用 `resolve` 或者 `reject` ，提供一个有效的响应 supply  (见 [response docs](#response-api)).
  adapter: function (resolve, reject, config) {
    /* ... */
  },

  // `auth` 表示应该使用HTTP基本身份验证，并提供凭证。
  // 这将设置一个授权标头，覆盖任何现有的
  // `Authorization` 你已经使用 `headers`自定义了头部.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  }

  // `responseType` 表示服务器将响应的数据类型
  // 可选项有 'arraybuffer', 'blob', 'document', 'json', 'text'
  responseType: 'json', // 默认

	  // `xsrfCookieName` 是用于xsrf标记的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是携带xsrf令牌值的http头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `progress` 允许处理'POST' 和 'PUT uploads'的上传进度事件
  // 以及 'GET' 下载
  progress: function(progressEvent) {
    // Do whatever you want with the native progress event
  }
}
```
##<font color=#D02B34> **响应的数据结构**
响应的数据包括下面的信息：

```
{
  // `data` 是服务器提供的响应
  data: {},

  // `status` 是来自服务器响应的HTTP状态代码
  status: 200,

  // `statusText` 是来自服务器响应的HTTP状态消息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为axios提供的请求配置信息
  config: {}
}
```

##<font color=#D02B34> **二级标题**
###<font color=#08A3E4> **三级标题**
####<font color=#1D8C20>**四级标题**
<font size=5 color=red>**注：**