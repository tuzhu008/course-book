![Async Logo](https://raw.githubusercontent.com/caolan/async/master/logo/async-logo_readme.jpg)

[![Build Status via Travis CI](https://travis-ci.org/caolan/async.svg?branch=master)](https://travis-ci.org/caolan/async)
[![NPM version](https://img.shields.io/npm/v/async.svg)](https://www.npmjs.com/package/async)
[![Coverage Status](https://coveralls.io/repos/caolan/async/badge.svg?branch=master)](https://coveralls.io/r/caolan/async?branch=master)
[![Join the chat at https://gitter.im/caolan/async](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/caolan/async?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![libhive - Open source examples](https://www.libhive.com/providers/npm/packages/async/examples/badge.svg)](https://www.libhive.com/providers/npm/packages/async)
[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/async/badge?style=rounded)](https://www.jsdelivr.com/package/npm/async)


Async 是一个实用程序模块，它为使用[异步 JavaScript](http://caolan.github.io/async/global.html) 提供了直接、强大的函数。尽管最初设计用于与 [Node.js](https://nodejs.org/) 一起使用，使用 `npm install --save async` 进行安装。 它也可以直接在浏览器中使用。

获取英文原版文档, 请访问 <https://caolan.github.io/async/>

获取中文文档, 请访问 <https://tuzhu008.github.io/async_cn/>

*获取 Async v1.5.x 版本的文档，请移步 [HERE](https://github.com/caolan/async/blob/v1.5.2/README.md)*


```javascript
// 关于使用 Node式 的回调 —— 回调函数作为最后一个参数，回调函数的第一参数为 Error对象
var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
var configs = {};

async.forEachOf(obj, (value, key, callback) => {
    fs.readFile(__dirname + value, "utf8", (err, data) => {
        if (err) return callback(err);
        try {
            configs[key] = JSON.parse(data);
        } catch (e) {
            return callback(e);
        }
        callback();
    });
}, err => {
    if (err) console.error(err.message);
    // configs 现在是 JSON 数据的一个映射
    doSomethingWith(configs);
});
```

```javascript
// ...或者 ES2017 async 函数
async.mapLimit(urls, 5, async function(url) {
    const response = await fetch(url)
    return response.body
}, (err, results) => {
    if (err) throw err
    // results 现在是一个响应主体数组。
    console.log(results)
})
```
