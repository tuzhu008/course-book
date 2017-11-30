# 笔记

* 模块初始化

模块只会执行一次初始化。一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。同一模块多次导出的对象都指向同一地址。

```js
var module_A = require('./app.js');
var module_B = require('./app.js');

module_A === module_B // true
```

* index.js

当模块的文件名是`index.js`，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此接着上例，以下两条语句等价。

```js
var cat = require('/home/user/lib/cat');
var cat = require('/home/user/lib/cat/index');
```

* 模块查找路径

如果运行安装在 `/home/user/apps/my_app`目录中的应用程序，Node 会首先在`/home/user/apps/my_app/node_modules` 目录中查找模块， 如果没找到就查找其上一级的`node_modules`目录， 最后在全局模式下的包安装目录`node_modules`中寻找。也就是说Node 在解析包依赖关系时， 以本地模式安装的包优先级高于以全局模式安装的包。 



