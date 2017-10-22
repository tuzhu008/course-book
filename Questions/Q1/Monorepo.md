## 什么是monorepo?

最近在逛github时，偶然发现react-router这个开源项目的repository目录结构很奇怪。

![](/assets/monorepo-1.png)


根目录下没有src之类的源码目录，也没有test这类的存放单元测试的目录，只有一个packages目录。顺着目录往下看，发现readme中写道 ：

这个repository是一个我们用Lerna管理的monorepo。实际上，我们往npm上发布的几个package都来自于同一个codebase,包括......

通常，当我们的项目不断的迭代更新的时候，我们会根据业务或者是功能又或者是方便复用某些代码模块，把一个大的codebase拆成一些独立的package或是module，再将这些功能独立的package分别放入单独的repository中进行维护。可以简单地称这种方式为multiple repositories。而monorepo则是一种相反的做法，它提倡将所有的相关package都放入一个repository来管理。显然，把辛苦抽出来的代码再放回一个repository中，会让repository变得臃肿，你可能认为这是一个很糟糕的做法。但是这样做的开源项目和公司并不算少

### 谁在使用monorepo

Babel是一个Java编译器，它可以帮助你将你写的一些带有Java新特性，而本地浏览器环境尚未支持的代码变为向下兼容的版本。因此，你可以没有多少顾虑地使用新的Java语法和特性来提升编程的体验和效率。

Babel官方维护了众多独立的plugin、polyfill、preset，但并未按照传统，将这些独立的模块分别放入不同的repo。而是遵循了monorepo的方式，将它们放入一个相同的repo中。因为Babel认为，有效的组织一个多模块，多repo的项目，就像是尝试教一个刚出生的婴儿骑自行车一样。
Juggling a multimodule project over multiple repos is like trying to teach a newborn baby how to ride a bike.

所以，Babel也采用了lerna来管理自己的monorepo。



![](/assets/monorepo-2.png)

无独有偶，Cycle.js（一个函数式和响应式Java框架）的作者André Staltz也摒弃了一个package一个repo的做法，将Cycle.js的众多package迁移到了一个monorepo中。他也认为，管理多个repo并不是件有意思的事情。多个repo意味着有多个地方需要处理issue，保持多个repo的issue标签统一，管理很多PR和git钩子等等。

Managing multiple repos isn’t that fun. Multiple repos means multiple places to manage issues, manage issue labels (and making them consistent across repos), manage PRs, git hooks for conventions, etc.

André Staltz并没有使用lerna之类的工具来实现自己的monorepo，他自己通过Bash s采用了类似于Lerna管理项目的结构，实现了monorepo。

除了Babel和Cycle.js以外，React、Angular、Meteor、Ember，还包括国内饿了么的mint-ui等等开源项目，以及一些公司如Google、Facebook、BBC等也都采用了monorepo。
### 优点和缺点

看来已经有不少人正在使用monorepo，那么monorepo有什么优点呢。
* 单个的lint，build，test和release流程
* 统一的地方处理issue
* 不用到处去找自己项目的repo
* 方便管理版本和dependencies
* 跨项目的操作和修改变得容易
* 方便生成总的changelog

缺点呢
* repo的体积变得很大
* 安全问题，如何管理权限？

### 工具

[Lerna](https://github.com/lerna/lerna)和Builder这两个工具都可以帮助你管理monorepo。


## 总结
如果你想要一个monorepo，除了Lerna、Builder，还可以像André Staltz一样自己用脚本来实现。

当项目大到需要拆分成多个package时，使用monorepo不失为一种具有很多优势的管理方式。
