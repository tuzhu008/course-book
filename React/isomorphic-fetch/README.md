isomorphic-fetch [![Build Status](https://travis-ci.org/matthew-andrews/isomorphic-fetch.svg?branch=master)](https://travis-ci.org/matthew-andrews/isomorphic-fetch)
================

Fetch 为 node and Browserify建立。建立在 [GitHub's WHATWG Fetch polyfill](https://github.com/github/fetch)基础上，参考[文档](../fetch/README.md)。

## 警告

- 这将把`fetch`作为全局添加，使其API在客户端和服务器之间保持一致。
- 你必须带上自己的ES6 Promise 兼容的polyfill，我推荐[es6-promise](https://github.com/jakearchibald/es6-promise).

为了[易于维护和向后兼容的原因][why polyfill], 这个库将一直是一个polyfill。作为一种“安全”的替代方法，它不改变全局，考虑[fetch-ponyfill][].

[why polyfill]: https://github.com/matthew-andrews/isomorphic-fetch/issues/31#issuecomment-149668361
[fetch-ponyfill]: https://github.com/qubyte/fetch-ponyfill

## 安装

### NPM

```sh
npm install --save isomorphic-fetch es6-promise
```

### Bower

```sh
bower install --save isomorphic-fetch es6-promise
```

## 用法

```js
require('es6-promise').polyfill();
require('isomorphic-fetch');

fetch('//offline-news-api.herokuapp.com/stories')
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function(stories) {
		console.log(stories);
	});
```

## License

All open source code released by FT Labs is licenced under the MIT licence. Base on [the fine work by](https://github.com/github/fetch/pull/31) **[jxck](https://github.com/Jxck)**.
