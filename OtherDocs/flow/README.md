# Flow [![Build Status](https://travis-ci.org/facebook/flow.svg?branch=master)](https://travis-ci.org/facebook/flow) [![Windows Build Status](https://ci.appveyor.com/api/projects/status/thyvx6i5nixtoocm/branch/master?svg=true)](https://ci.appveyor.com/project/Facebook/flow/branch/master)

Flow 是一个JavaScript的静态类型检查器。了解更多关于FLow, 请查看 [flow.org](https://flow.org/)。

关于这个项目的背景,请阅读[this overview](https://flow.org/en/docs/lang/).

## 需求

Flow 工作环境:

* Mac OS X
* Linux (64-bit)
* Windows (64-bit)

每一个平台都有[二进制发型版本](https://github.com/facebook/flow/releases)，你也可以从源代码构建它在其中任何一个。

## 安装 Flow

Flow很容易安装:你所需要的只是在你的路径上的`flow`二进制，你就可以开始工作了。


### 为每个项目安装Flow

推荐安装流的方法是通过[`flow-bin`](https://www.npmjs.com/package/flow-bin)`npm`的包。添加`flow-bin`到你的项目的`package.json`中：

- 提供了更流畅的升级体验，因为根据您检查的版本，正确版本的Flow是自动使用的。
- 安装Flow作为你的`npm install` 工作流的一部分
- 让你在不同的项目中使用不同版本的Flow

```
npm install --save-dev flow-bin
node_modules/.bin/flow
```

### 全局安装Flow

尽管不推荐，但是您也可以在全局上安装Flow(例如，可能您不使用`npm`或`package.json`)。

全局安装的最佳方式是通过`flow-bin`:

```
npm install -g flow-bin
flow # make sure `npm bin -g` is on your path
```

在 Mac OS X系统中,你可以通过[Homebrew](http://brew.sh/) 包管理器安装Flow:

```
brew update
brew install flow
```

您还可以通过OCaml [OPAM](https://opam.ocaml.org) 包管理器来构建和安装Flow。因为Flow有一些non-OCaml依赖,需要使用[`depext`](https://opam.ocaml.org/doc/FAQ.html#Somepackagefailduringcompilationcomplainingaboutmissingdependenciesquotm4quotquotlibgtkquotetc)包,像一样:


```
opam install depext
opam depext --install flowtype
```

如果你没有足够的新版本的OCaml来编译Flow，你也可以使用OPAM来引导一个现代版本。通过[二进制包](http://opam.ocaml.org/doc/Install.html#InstallOPAMin2minutes)安装适用于您的操作系统的OPAM，运行:

```
opam init --comp=4.03.0
opam install flowtype
eval `opam config env`
flow --help
```


## 起步

开始使用Flow非常简单.

- 通过在项目的根中运行以下命令来初始化FLow
```
flow init
```

- 将以下内容添加到您想要检查的所有文件的顶部
``` javascript
/* @flow */
```

- 看看有什么神奇的事情发生：
```
flow check
```

在 https://flow.org 上可以找到更详细的文档和许多示例。

## 构建 Flow

Flow是在OCaml(OCaml 4.03.0或更高)中写的。你可以遵循[ocaml.org](https://ocaml.org/docs/install.html)在Mac OS X和Linux安装OCaml。

例如，在Ubuntu 16.04和类似的系统上:

```
sudo apt-get install opam
opam init --comp 4.03.0
```

在 OS X上, 使用 [brew 包管理器](http://brew.sh/):

```
brew install opam
opam init --comp 4.03.0
```

然后，重新启动shell并安装这些额外的库:

```
opam update
opam pin add flowtype . -n
opam install --deps-only flowtype
```


一旦有了这些依赖关系，构建Flow就只需要运行

```
make
```

这将生成一个包含`flow`二进制的`bin`文件夹。

为了创建flow.js流动文件，您首先需要安装js_of_ocaml:

```
opam install -y js_of_ocaml
```

在那之后,使创建 flow.js 很容易:

```
make js
```

新的`flow.js`文件也会在`bin`文件夹中。

*注意: 此时，OCaml依赖阻止我们向[npm](http://npmjs.org)添加Flow。如果你需要一个npm二进制包装器，请尝试[flow-bin](https://www.npmjs.org/package/flow-bin) 。*

Flow还可以将其解析器编译成JavaScript。 [阅读这里](src/parser/README.md).

## 在Windows上构建Flow

This is a little more complicated. Here is a process that works, though it probably can be simplified.

The general idea is that we build in Cygwin, targeting mingw. This gives us a binary that works even outside of Cygwin.

### Install Cygwin
1. Install Cygwin 64bit from https://cygwin.com/install.html
2. In powershell, run `iex ((new-object net.webclient).DownloadString("https://raw.githubusercontent.com/ocaml/ocaml-ci-scripts/master/appveyor-install.ps1"))` which will likely run a cygwin setup installer with a bunch of cygwin packages and stuff. This helps make sure that every package that opam needs is available.

### Install Opam
1. Open the cygwin64 terminal
2. Download opam with `curl -fsSL -o opam64.tar.xz https://github.com/fdopen/opam-repository-mingw/releases/download/0.0.0.1/opam64.tar.xz`
3. `tar -xf opam64.tar.xz`
4. `cd opam64.tar.xz`
5. Install opam `./install.sh`
6. Initialize opam to point to a mingw fork: `opam init -a default "https://github.com/fdopen/opam-repository-mingw.git" --comp "4.03.0+mingw64c" --switch "4.03.0+mingw64c"`
7. Make sure opam stuff is in your path: ```eval `opam config env` ```

### Install Flow
1. Clone flow: `git clone https://github.com/facebook/flow.git`
2. `cd flow`
3. Tell opam to use this directory as the flowtype project: `opam pin add flowtype . -n`
4. Install system dependencies `opam depext -u flowtype`
5. Install Flow's dependencies `opam install flowtype --deps-only`
6. We need these too: `opam install camlp4 ocp-build`
7. Finally, build Flow: `make all-ocp`

## 使用来自JavaScript的FLow解析器

当Flow在OCaml中被写就的时候,其解析器可以作为compiled-to-JavaScript模块发布到npm,名叫[flow-parser](https://www.npmjs.com/package/flow-parser)。大多数终端用户
不需要直接使用这个解析器* *(而且应该从npm上安装[flow-bin](https://www.npmjs.org/package/flow-bin) ),但利用解析
流类型的JavaScript的JavaScript包可以使用它来生成带有注释类型的Flow的语法树。

## 运行测试

为了运行测试, 首先使用`make`来编译流。然后运行  `bash ./runtests.sh bin/flow`

这是一个`make test`目标--编译和运行测试。

要运行测试的一个子集，您可以传递第二个参数给`runtests.sh`文件。

例如: `bash runtests.sh bin/flow class | grep -v 'SKIP'`

## 加入Flow社区
* 网站: [https://flow.org/](https://flow.org/)
* irc: #flowtype on Freenode
* Twitter: follow [@flowtype](https://twitter.com/flowtype) and [#flowtype](https://twitter.com/hashtag/flowtype) to keep up with the latest Flow news.
* Stack Overflow: Ask a question with the [flowtype tag](http://stackoverflow.com/questions/tagged/flowtype)

## License
Flow is MIT-licensed ([LICENSE](http://github.com/facebook/flow/blob/master/LICENSE)). The [website](https://flow.org/) and [documentation](https://flow.org/en/docs/) are licensed under the Creative Commons Attribution 4.0 license ([website/LICENSE-DOCUMENTATION](https://github.com/facebook/flow/blob/master/website/LICENSE-DOCUMENTATION)).
