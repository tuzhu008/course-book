# Create React App [![Build Status][image-1]][1]

Create React apps with no build configuration.
创建一个没有构建配置的React应用。

* [起步][2] – 怎样创建一个新应用.
* [用户指南][3] – 怎样使用Create-React-App引导开发应用 .

Create React App 可以在 macOS, Windows, and Linux.上运行<br>
如果有东西不工作， 请 [提问][4].

## 概述

```sh
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
```

然后打开[http://localhost:3000/][5] 就能看到新创建的应用了.<br>
当您准备好部署到生产环境时, 使用`npm run build`创建一个经过压缩的包.

<img src='https://camo.githubusercontent.com/506a5a0a33aebed2bf0d24d3999af7f582b31808/687474703a2f2f692e696d6775722e636f6d2f616d794e66434e2e706e67' width='600' alt='npm start'>

### 立即开始

你 **不** 需要安装或配置像Webpac或Babel这样的工具。<br>
它们是预配置和隐藏的因此你可以专注于代码。

只需要创建一个项目，你就可以开始了。

## 起步

### 安装

全局安装:

```sh
npm install -g create-react-app
```

**你需要在设备已经安装node \>= 6 **. 你可以使用 [nvm][6] 在Node不同的版本间轻松切换.

**这个工具不处理Node后端**. 这个Node 仅需要安装Create-React-App 本身。

### 创建一个应用

运行下面代码，创建一个新应用:

```sh
create-react-app my-app
cd my-app
```

它将在当前目录下创建一个名为 `my-app` 的应用.<br>
在该目录, 它将生成初始的项目结构并安装传递依赖项:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

没有配置或复杂的文件结构, 只需要创建应用所需的文件.<br>
安装完成后，你可以在项目文件夹中运行一些命令:

### `npm start` or `yarn start`

在开发模式下运行应用程序.<br>
打开 [http://localhost:3000][7] 在浏览器中查看.

如果您对代码进行更改，页面将自动重新加载.<br>
你将在控制台中看到构建错误和lint警告.

<img src='https://camo.githubusercontent.com/41678b3254cf583d3186c365528553c7ada53c6e/687474703a2f2f692e696d6775722e636f6d2f466e4c566677362e706e67' width='600' alt='Build errors'>

### `npm test` or `yarn test`

以交互模式运行测试监视者.<br>
默认情况下，运行与上次提交后更改的文件相关的测试.

[Read more about testing.][8]

### `npm run build` or `yarn build`

构建产品应用到 `build` 文件夹.<br>
它在生产模式中正确地捆绑了响应，并优化了构建以获得最佳性能.

构建是缩小的，文件名包括哈希表.<br>
默认情况下，它还 [includes a service worker][9] 以便您的应用程序在未来访问时从本地缓存加载.

到此，你的应用已经准备好了.

## 用户指南

[用户指南][10] 包含不同主体的信息, 比如:

- [Updating to New Releases  更新到最新版本][11]
- [Folder Structure 文件夹结构][12]
- [Available Scripts 可用的脚本][13]
- [Supported Language Features and Polyfills 支持的语言特性和兼容的旧环境][14]
- [Syntax Highlighting in the Editor 编辑器的语法高亮显示 ][15]
- [Displaying Lint Output in the Editor 在编辑器中显示lint输出][16]
- [Formatting Code Automatically 自动格式化代码][17]
- [Debugging in the Editor 在编辑器中调试 ][18]
- [Changing the Page `<title>` 改变页面的`<title>`][19]
- [Installing a Dependency 安装一个依赖][20]
- [Importing a Component 导入一个组件][21]
- [Code Splitting 代码分割][22]
- [Adding a Stylesheet 添加一个样式表][23]
- [Post-Processing CSS 后处理的CSS ][24]
- [Adding a CSS Preprocessor (Sass, Less etc.) 添加一个CSS预处理器][25]
- [Adding Images, Fonts, and Files 添加图像、字体和文件 ][26]
- [Using the `public` Folder 使用`public`文件夹][27]
- [Using Global Variables 使用全局变量][28]
- [Adding Bootstrap 添加Bootstrap][29]
- [Adding Flow 添加Flow][30]
- [Adding Custom Environment Variables 添加自定义的环境变量][31]
- [Can I Use Decorators?  我可以使用修饰符吗？][32]
- [Integrating with an API Backend  与后端API集成][33]
- [Proxying API Requests in Development 在开发中代理API请求][34]
- [Using HTTPS in Development 在开发中使用HTTPS][35]
- [Generating Dynamic `<meta>` Tags on the Server 在服务器上生成动态的`<meta>`标签][36]
- [Pre-Rendering into Static HTML Files 预渲染到静态HTML文件][37]
- [Running Tests 运行测试][38]
- [Developing Components in Isolation 独立开发组件][39]
- [Making a Progressive Web App 制作一个渐进的网页应用][40]
- [Analyzing the Bundle Size 分析包的大小][41]
- [Deployment 部署][42]
- [Advanced Configuration 高级配置][43]
- [Troubleshooting 故障][44]

在项目文件夹中会创建一个用户指南`README.md`的副本。

## 如何更新版本?

请参考 [用户指南][45] 来获得信息.

## Philosophy

* **一个依赖:** 只有一个构建依赖关系.它使用了 Webpack, Babel, ESLint, 和其他一些项目, 但在他们上面提供了一个紧密的体验。

* **不需要配置:** 你不需要配置任何东西. 开发和生产构建的良好配置都是为您处理的，因此您可以专注于编写代码.

* **没有锁定:** 您可以在任何时候“弹出”到自定义设置。运行一个命令，所有配置和构建依赖项都将直接移动到您的项目中，在离开的地方也可以接着编写。 

## 为什么使用它?

**如果你开始** 伴随 React, 使用 `create-react-app` 来自动构建的应用. 没有配置文件, `react-scripts` 是`package.json`中唯一的额外构建依赖。你的环境将会有你构建一个现代的React应用所需的一切:

* React, JSX, ES6, and Flow 语法支持.
* ES6以外的语言附加，比如 object spread operator.
* 常见错误的开发服务.
* 从JavaScript直接导入CSS和image文件.
* 自动添加 CSS前缀, 所以不需要手动添加`-webkit` 或者 其他前缀.
*  `build` 脚本使用sourcemaps来打包 JS, CSS, and images 来构建产品.
* 首先 [service worker][46] 和 一个 [web app manifest][47], 汇集所有的[渐进网页应用][48] 标准.

** 这个特性集是有意限制的**. 它不支持高级功能，比如服务器渲染或CSS模块. 该工具 **不可配置** 因为当用户可以对任何东西进行调整时，很难提供一套完整的体验和简单的更新。

**你不需要使用这个.** 从历史上来看，人们很容易[ 逐渐采用 ][49]React.然而每天许多人都从头创建一个单页React应用。我们已经听到 [loud][50] 和 [clear][51]， 这个过程很容易出错，特别是如果这是你第一个JavaScript构建的堆栈。这个项目试图找出一种开始开发React应用程序的好方法。

### 转为自定义设置

**如果你是一个重度用户** 你不喜欢默认的配置, 您可以从该工具中“eject”并将其用作样板生成器 .

运行 `npm run eject` 将所有配置文件和传递依赖项(Webpack、Babel、ESLint等)复制到您的项目中，这样您就可以完全控制它们了。. 像 `npm start` and `npm run build` 这样的命令仍然有效，但他们会指向复制的脚本，这样你就可以对他们进行调整。在这点上，你可以按你的来。

**注意: 这是一个单向操作. 一旦 `eject`, 就不能回去了!**

你不需要使用 `eject`. 精心设计的特性集适合于小型和中型部署, 你不应该觉得必须得使用这个功能. 但是我们知道如果你不能在你准备好它的时候对它进行定制，那么这个工具就没有用处了.

## 局限性

目前的一些特性 **不被支持**:

* 服务端渲染.
* 一些实验语法扩展 (比如 修饰符).
* CSS 模块 (see [^2285](https://github.com/facebookincubator/create-react-app/pull/2285)).
* 直接导入 LESS 或者 Sass ([但你仍可以使用它们][52]).
* 热加载组件.

如果它们是稳定的，它们中的一些可能会在将来被添加进来，它们对大多数的React应用程序有用，不与现有的工具冲突，也不引入额外的配置..

## 内部结构?

Create React App 所使用的工具需要更改。
目前它包含了许多非常好的社区项目，比如:

* [webpack][53] with [webpack-dev-server][54], [html-webpack-plugin][55] and [style-loader][56]
* [Babel][57] 使用ES6和Facebook使用的扩展 (JSX, [object spread][58], [class properties][59])
* [Autoprefixer  自动前缀][60]
* [ESLint][61]
* [Jest][62]
* and others.

他们都提供传递依赖的npm 包.

## 贡献

我们很乐意在 `create-react-app`上帮你的忙! 查看 [CONTRIBUTING.md][63] 了解更多关于我们正在寻找什么以及如何开始的信息.

## React Native

寻找类似的东西, 但对 React Native来说?<br>
查看 [创建 React Native 应用][64].

## 感谢

我们感谢现有相关项目的作者，他们的想法和合作:

* [@eanplatter][65]
* [@insin][66]
* [@mxstbr][67]

## 替代选择

如果您不同意这个项目中所做的选择，那么您可能想要尝试使用不同的折衷方案.<br>
一些更受欢迎的和积极维护的:

* [insin/nwb][68]
* [mozilla-neutrino/neutrino-dev][69]
* [jaredpalmer/razzle][70]
* [NYTimes/kyt][71]
* [zeit/next.js][72]
* [gatsbyjs/gatsby][73]
* [electrode-io/electrode][74]

值得注意的选择还包括:

* [enclave][75]
* [motion][76]
* [quik][77]
* [sagui][78]
* [roc][79]
* [aik][80]
* [react-app][81]
* [dev-toolkit][82]
* [sku][83]
* [gluestick][84]

你也可以直接使用像 [webpack][85] 和 [Browserify][86] 这样的模块打包器.<br>
React 文档 包括 [a walkthrough][87]这个主题.

[1]:	https://travis-ci.org/facebookincubator/create-react-app
[2]:	#%E8%B5%B7%E6%AD%A5
[3]:	https://github.com/tuzhu008/course/blob/master/create-react-app/package/react-scripts/template/README.md
[4]:	https://github.com/facebookincubator/create-react-app/issues/new
[5]:	http://localhost:3000/
[6]:	https://github.com/creationix/nvm#installation
[7]:	http://localhost:3000
[8]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests
[9]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app
[10]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
[11]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases
[12]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#folder-structure
[13]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#available-scripts
[14]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills
[15]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#syntax-highlighting-in-the-editor
[16]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#displaying-lint-output-in-the-editor
[17]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#formatting-code-automatically
[18]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#debugging-in-the-editor
[19]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#changing-the-page-title
[20]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#installing-a-dependency
[21]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#importing-a-component
[22]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting
[23]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-stylesheet
[24]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#post-processing-css
[25]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc
[26]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-images-fonts-and-files
[27]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder
[28]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-global-variables
[29]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-bootstrap
[30]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-flow
[31]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
[32]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#can-i-use-decorators
[33]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#integrating-with-an-api-backend
[34]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development
[35]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-https-in-development
[36]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#generating-dynamic-meta-tags-on-the-server
[37]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#pre-rendering-into-static-html-files
[38]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests
[39]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#developing-components-in-isolation
[40]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app
[41]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#analyzing-the-bundle-size
[42]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment
[43]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#advanced-configuration
[44]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#troubleshooting
[45]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases
[46]:	https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[47]:	https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
[48]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app
[49]:	https://www.youtube.com/watch?v=BF58ZJ1ZQxY
[50]:	https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4
[51]:	https://twitter.com/thomasfuchs/status/708675139253174273
[52]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc
[53]:	https://webpack.js.org/
[54]:	https://github.com/webpack/webpack-dev-server
[55]:	https://github.com/ampedandwired/html-webpack-plugin
[56]:	https://github.com/webpack/style-loader
[57]:	http://babeljs.io/
[58]:	https://github.com/sebmarkbage/ecmascript-rest-spread/commits/master
[59]:	https://github.com/jeffmo/es-class-public-fields
[60]:	https://github.com/postcss/autoprefixer
[61]:	http://eslint.org/
[62]:	http://facebook.github.io/jest
[63]:	CONTRIBUTING.md
[64]:	https://github.com/react-community/create-react-native-app/
[65]:	https://github.com/eanplatter
[66]:	https://github.com/insin
[67]:	https://github.com/mxstbr
[68]:	https://github.com/insin/nwb
[69]:	https://github.com/mozilla-neutrino/neutrino-dev
[70]:	https://github.com/jaredpalmer/razzle
[71]:	https://github.com/NYTimes/kyt
[72]:	https://github.com/zeit/next.js
[73]:	https://github.com/gatsbyjs/gatsby
[74]:	https://github.com/electrode-io/electrode
[75]:	https://github.com/eanplatter/enclave
[76]:	https://github.com/steelbrain/pundle/tree/master/packages/motion
[77]:	https://github.com/satya164/quik
[78]:	https://github.com/saguijs/sagui
[79]:	https://github.com/rocjs/roc
[80]:	https://github.com/d4rkr00t/aik
[81]:	https://github.com/kriasoft/react-app
[82]:	https://github.com/stoikerty/dev-toolkit
[83]:	https://github.com/seek-oss/sku
[84]:	https://github.com/TrueCar/gluestick
[85]:	http://webpack.js.org
[86]:	http://browserify.org/
[87]:	https://reactjs.org/docs/installation.html#development-and-production-versions

[image-1]:	https://travis-ci.org/facebookincubator/create-react-app.svg?branch=master