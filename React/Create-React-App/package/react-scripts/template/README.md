这个项目是由 [Create React App][1] 引导的.

下面你将找到一些关于如何执行常见任务的信息。 <br>
你可以找到这个指南的最新版本 [here][2].

## 包含内容

- [ 更新到最新版本 ][3] 
- [ 发送反馈 ][4] 
- [ 文件夹结构 ][5] 
- [ 可用脚本 ][6] 
  - [npm start][7]
  - [npm test][8]
  - [npm run build][9]
  - [npm run eject][10]
- [支持的语言特性和兼容的旧设备][11]
- [编辑器高亮][12]
- [在编辑器显示 Lint 输出][13]
- [编辑器调试][14]
- [自动格式化代码][15]
- [改变页面`<title>`][16]
- [安装依赖][17]
- [导入组件][18]
- [代码分割][19]
- [添加样式表][20]
- [后处理 CSS][21]
- [添加CSS预处理器 (Sass, Less etc.)][22]
- [添加 Images, Fonts, 和 Files][23]
- [使用`public` 文件夹][24]
  - [改变 HTML][25]
  - [添加模块系统外的资源][26]
  - [何时使用 `public` 文件夹][27]
- [使用全局变量][28]
- [添加 Bootstrap][29]
  - [使用自定义主题][30]
- [添加 Flow][31]
- [添加自定义环境变量][32]
  - [在HTML中引用环境变量][33]
  - [在Shell中添加临时环境变量][34]
  - [在 `.env`中添加开发环境变量][35]
- [使用修饰符吗?][36]
- [ 与API后端集成 ][37]
  - [Node][38]
  - [Ruby on Rails][39]
- [在开发中代理 API 请求][40]
  - [出现”Invalid Host Header" 错误后配置代理][41]
  - [手动配置代理][42]
  - [配置一个Websocket代理][43]
- [在开发中使用 HTTPS][44]
- [在服务器中生成动态 `<meta>` 标签][45]
- [预渲染到静态HTML 文件][46]
- [ 从服务器向页面中注入数据 ][47]
- [运行测试][48]
  - [文件名的约定][49]
  - [命令行接口][50]
  - [版本控制一体化][51]
  - [编写测试][52]
  - [测试组件][53]
  - [使用三方断言库][54]
  - [初始化测试环境][55]
  - [聚焦和排除测试][56]
  - [覆盖率报告][57]
  - [持续集成][58]
  - [禁用 jsdom][59]
  - [快照测试][60]
  - [编辑器集成][61]
- [隔离开发组件][62]
  - [开始使用故事书][63]
  - [开始使用Styleguidist][64]
- [制作一个渐进的 Web App][65]
  - [选择缓存][66]
  - [首先考虑][67]
  - [渐进的 Web App Metadata][68]
- [分析包的大小][69]
- [部署][70]
  - [静态服务器][71]
  - [其他解决方案][72]
  - [ 使用客户端路由服务应用程序 ][73]
  - [Building的相对路径][74]
  - [Azure][75]
  - [Firebase][76]
  - [GitHub Pages][77]
  - [Heroku][78]
  - [Netlify][79]
  - [Now][80]
  - [S3 and 云字体][81]
  - [Surge][82]
- [高级配置][83]
- [故障排除][84]
  - [`npm start` 没有发生变化][85]
  - [`npm test` hangs on macOS Sierra][86]
  - [`npm run build` 过早退出][87]
  - [`npm run build` 在 Heroku上发生错误][88]
  - [`npm run build` 在 minify发生错误][89]
  - [Moment.js locales 消失][90]
- [Something Missing?][91]

## Updating to New Releases
更新到新版本。
Create React App 分为两个包:

* `create-react-app` 是一个全局命令行工具，用于创建新项目.
* `react-scripts` 是生成的项目中的一个开发依赖关系(已包含).

你几乎不需要更新 `create-react-app` 本身: 它把所有的设置都委托给了 `react-scripts`.

当你运行 `create-react-app`, 它总是使用最新版的 `react-scripts`来创建项目， 这样你就可以自动获得新创建的应用程序的所有新功能和改进。

将现有的项目更新为一个新版本的 `react-scripts`, [打开更新日志][92], 找到你目前正在做的版本(如果你不确定，打开文件夹检查 `package.json`文件), 并为新版本应用迁移说明.

大多数情况下， `react-scripts` 版本 在 `package.json` 中，在此目录下运行 `npm install` 就够了,但是还是需要参考一下 [changelog][93] 来获得潜在的破坏性的改变。

我们承诺保持最低限度的改变 ，这样你就可以毫无痛苦地升级`react-scripts` 

## Sending Feedback
发送反馈。
我们总是开放 [your feedback][94].

## Folder Structure
文件夹结构
创建完成后, 你的项目大概是这样的:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

对于要构建的项目 ** 这些文件必须以确切的文件名存在**:

* `public/index.html`  是页面模板;
* `src/index.js` 是 JavaScript 入口点.

您可以删除或重命名其他文件.

你可以在 `src`里面创建子目录. 为更快的重建, 只有在 `src` 里的文件是由Webpack处理的.<br>
你需要 ** 把JS和CSS文件放在`src`里面 **, 否则 Webpack 不会看到它们.

只有 `public` 里的文件才能被 `public/index.html`使用.<br>
下面是使用JavaScript和HTML的资源的阅读说明.

但是，您可以创建更多的顶级目录 <br>
它们不会被包含在生产构建中所以你可以用它们来做文档.

## Available Scripts
可用的脚本
在项目目录中，您可以运行:

### `npm start`

在开发模式下运行应用.<br>
打开 [http://localhost:3000][95] 在浏览器中查看

如果你进行编辑，页面会重新加载.<br>
您还将在控制台中看到任何lint错误.

### `npm test`

在交互式观察模式下启动测试运行程序.<br>
请参阅 [运行测试][96] 部分以获得更多信息.

### `npm run build`

构建生产模式的应用到 `build` 文件夹.<br>
它在生产模式中正确地捆绑了响应，并优化了构建以获得最佳性能.

构建是缩小的，文件名包括散列。 <br>
你的应用已经准备好部署了！

参阅 [deployment部署][97] 以获取更多信息。

### `npm run eject`

**注意: 这是一个单向操作.一旦 `eject`,就无法返回!**

如果您对构建工具和配置选项不满意，您可以随时`eject`。该命令将从您的项目中删除单个构建依赖项。

相反，它会将所有的配置文件和传递依赖项(Webpack、Babel、ESLint等)复制到你的项目中，这样你就可以完全控制它们了。除`eject`之外的所有命令仍然有效，但是它们将指向复制的脚本，以便您可以对它们进行调整。在这一点上，你k可以按自己的来.

你不需要使用 `eject`. 精心设计的特性集适合于小型和中型部署，您不应该感到有义务使用该特性。但是我们知道，如果您不能在准备好时定制它，那么这个工具就不会有用了。

## Supported Language Features and Polyfills
支持的语言特性和兼容
这个项目支持最新的JavaScript标准的超集。 <br>
除了 [ES6][98] 语法特性,它还支持:

* [Exponentiation Operator][99] 求幂运算符 (ES2016).
* [Async/await][100] 异步(ES2017).
* [Object Rest/Spread Properties][101] (stage 3 proposal).
* [Dynamic import()][102] 动态导入(stage 3 proposal)
* [类和静态属性][103]  class 和 const (part of stage 3 proposal).
* [JSX][104] and [Flow][105] 语法.

了解更多[不同方案阶段 ][106].

尽管我们建议使用的是实验性的，但Facebook在产品代码中大量使用这些功能， 所以我们打算提供 [codemods代码插件][107] 如果这些建议中的任何一项在未来改变.

注意 ** 这个项目只包括一些ES6 [兼容][108]**:

* [`Object.assign()`][109] via [`object-assign`][110].
* [`Promise`][111] via [`promise`][112].
* [`fetch()`][113] via [`whatwg-fetch`][114].

如果您使用其他需要的ES6+特性 **实时运行支持** (例如 `Array.from()` or `Symbol`), 确保您已经手动地包含了适当的兼容，或者您所针对的浏览器已经支持它们了。

## Syntax Highlighting in the Editor
编辑器语法高亮
要在您最喜欢的文本编辑器中配置突出显示的语法, 前往 [相关的Babel文档页面][115] 并遵循指示. 一些受欢迎的编辑器被涵盖。

## Displaying Lint Output in the Editor
编辑器显示Lint输出
> 注意: 在 `react-scripts@0.2.0` 和更高版本上，这个特性是可用的 <br>
> 它只能在 npm 3 或更高版本上工作.

一些编辑器, 包括 Sublime Text, Atom, 和 Visual Studio Code, 都提供ESlint插件。.

它们不是用来做衬线的。您应该在终端和浏览器控制台中看到linter输出。但是，如果您希望在编辑器中出现lint结果，那么您可以执行一些额外的步骤.

您需要为您的编辑器首先安装一个ESLint插件. 然后添加一个文件叫做 `.eslintrc` 的文件到项目根目录:

```js
{
  "extends": "react-app"
}
```

现在您的编辑器应该报告linting警告.

注意， 即使你进一步编辑的你的 `.eslintrc` 文件，这些改变 **编辑器的集成**. 它们不会影响终端和浏览器内的lint输出。这是因为，创建响应应用程序有意提供了一套最小的规则集，可以找到常见的错误。

如果您想为您的项目强制执行编码风格，请参考使用 [Prettier][116] 而不是ESLint样式规则
## Debugging in the Editor
编辑器调试
**这个特性目前只支持[Visual Studio Code][117] 和 [WebStorm][118].**

Visual Studio Code 和 WebStorm 支持Create React App 进行调试. 这使您可以作为开发人员在不离开编辑器的情况下编写和调试您的React代码，最重要的是，它使您能够拥有一个持续的开发工作流程，在这种情况下，上下文切换是最小的，因为您不必在工具之间切换。

### Visual Studio Code

你需要安装最新版本的 [VS Code][119] and VS Code [Chrome调试器扩展][120].

然后把下面的代码块加入到 `launch.json` 文件中 ，然后将其放入到应用根目录的`.vscode` 文件夹.

```json
{
  "version": "0.2.0",
  "configurations": [{
    "name": "Chrome",
    "type": "chrome",
    "request": "launch",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceRoot}/src",
    "userDataDir": "${workspaceRoot}/.vscode/chrome",
    "sourceMapPathOverrides": {
      "webpack:///src/*": "${webRoot}/*"
    }
  }]
}
```
> 注意: 如果通过[HOST 或 PORT 环境变量][121] 进行调整，URL可能会有所不同 

Start your app by running `npm start`, and start debugging in VS Code by pressing `F5` or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor. 运行`npm start`启动你的应用程序，并通过按`F5`或单击绿色调试图标开始在VS代码中进行调试。现在，您可以编写代码、设置断点、对代码进行更改，并从编辑器中调试新修改的代码。

### WebStorm

你需要安装 [WebStorm][122] 和 [JetBrains IDE Support][123] 的Chrome扩展。
在WebStorm的 `Run` 菜单中选择`Edit Configurations...`. 然后单击 `+` 并选择 `JavaScript Debug`. 将 `http://localhost:3000` 粘贴在URL字段中，并保存配置. 

> 注意: 如果通过[HOST 或 PORT 环境变量][124] 进行调整，URL可能会有所不同 .

运行 `npm start`开启应用, 然后在 macOS 上按 `^D` 或者在Windows and Linux上按 `F9` 或绿色调试按钮来在WebStorm中开始调试。

The same way you can debug your application in IntelliJ IDEA Ultimate, PhpStorm, PyCharm Pro, and RubyMine. 
同样的方法，你可以在IntelliJ IDEA Ultimate, PhpStorm, PyCharm Pro, and RubyMine中调试你的应用
## Formatting Code Automatically
自动格式化
Prettier 是一个固定风格的代码格式器，支持 JavaScript, CSS and JSON. 使用Prettier 你可以在你书写的时候自动格式化代码以保证项目的整体风格。查看 [Prettier's GitHub page][125] 以获取更多信息, 还有 [page to see it in action][126].

当我们在git中提交提交时，要格式化我们的代码，我们需要安装以下依赖项:

```sh
npm install --save husky lint-staged prettier
```

或者你可以使用 `yarn`:

```sh
yarn add husky lint-staged prettier
```

* `husky`让我们很容易就可以使用githooks，就好像它们是npm脚本一样。
* `lint-staged`允许我们在git中运行脚本文件. 查看 [关于 lint-staged的博客文章][127]来了解更多信息.
* `prettier` 是我们在提交之前运行的JavaScript格式化程序.

现在，我们可以通过向`package.json`中添加几行来确保每个文件都被格式化。

将下面几行添加到 `scripts`中:

```diff
  "scripts": {
+   "precommit": "lint-staged",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

接下来我们添加 'lint-staged' 片段到 `package.json`,比如:

```diff
  "dependencies": {
    // ...
  },
+ "lint-staged": {
+   "src/**/*.{js,jsx,json,css}": [
+     "prettier --single-quote --write",
+     "git add"
+   ]
+ },
  "scripts": {
```

现在，当你提交一个提交时，Prettier会自动地格式化已修改的文件。 你可以运行 `./node_modules/.bin/prettier --single-quote --write "src/**/*.{js,jsx}"` 来对整个项目进行第一次格式化.

Next you might want to integrate Prettier in your favorite editor. Read the section on [Editor Integration][128] on the Prettier GitHub page 接下来，您可能希望在您最喜欢的编辑器中集成Prettier。在Prettier GitHub页面上阅读[Editor Integration][129]一节.

## Changing the Page `<title>`
改变页面的`<title>`
您可以在生成的项目的`public`文件夹中找到源HTML文件。你可以编辑标签中的`<title>`，将标题从“React App”更改为其他任何东西。

请注意，通常情况下，您不会经常在`public`中编辑文件。例如，[添加一个样式表][130]是在不涉及HTML的情况下完成的。

您需要根据内容动态更新页面标题，您可以使用浏览器[`document.title`][131] API。对于更复杂的场景，当您想要更改来自React组件的标题时，您可以使用[React Helmet][132]，一个第三方库。

如果您在生产中使用定制服务器，并希望在发送到浏览器之前修改标题，那么您可以在[这一节][133]中遵循建议。或者，您可以将每个页面预先构建为一个静态HTML文件，然后加载JavaScript包，[这里][134]已经介绍了。

## Installing a Dependency
安装依赖
生成的项目包括作为依赖项的React和ReactDOM。它还包括一组用于Create React App作为开发依赖的脚本。您还可以使用`npm`安装其他依赖项(例如，响应路由器):

```sh
npm install --save react-router
```

你还可以使用 `yarn`:

```sh
yarn add react-router
```

它适用于任何库，而不仅仅是 `react-router`.

## Importing a Component
导入组件
这个项目设置支持ES6模块，这样感谢Babel.<br>
你仍然可以使用 `require()` 和 `module.exports`, 我们推荐使用 [`import` 和`export`][135] instead.

例如:

### `Button.js`

```js
import React, { Component } from 'react';

class Button extends Component {
  render() {
    // ...
  }
}

export default Button; // Don’t forget to use export default!
```

### `DangerButton.js`


```js
import React, { Component } from 'react';
import Button from './Button'; // Import a component from another file

class DangerButton extends Component {
  render() {
    return <Button color="red" />;
  }
}

export default DangerButton;
```

请注意 [默认和命名导出的区别][136]. 这是一个常见的错误来源.


我们建议，当一个模块只导出一个东西(例如，一个组件)时，您将坚持使用默认的导入和导出。这就是当你使用`export default Button` and `import Button from './Button'`所得到的结果。

 命名导出对于导出几个函数的实用程序模块非常有用。一个模块*最多可能有一个默认的导出*，以及您所喜欢的许多命名导出。

了解更多关于ES6模块的信息:

* [ 什么时候用大括号?][137]
* [ 探索ES6:模块 ][138]
* [ 理解ES6:模块 ][139]

## Code Splitting
代码分割
在用户可以使用之前，先不要下载整个应用程序，而代码分裂则允许你将代码分成小块，然后按需加载。

这个项目设置支持通过[动态 `import()`][140]进行代码分割。它的[建议][141]在第三阶段。`import()`函数式表单以模块名作为参数，并返回一个始终解析模块名称空间对象的[`Promise`][142]。

例如:

### `moduleA.js`

```js
const moduleA = 'Hello';

export { moduleA };
```
### `App.js`

```js
import React, { Component } from 'react';

class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch(err => {
        // Handle failure
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```

This will make `moduleA.js` and all its unique dependencies as a separate chunk that only loads after the user clicks the 'Load' button.

You can also use it with \` syntax if you prefer it.
`这将使`moduleA.js\`及其所有独特的依赖项作为单独的块，只有在用户点击“Load”按钮后才会加载。

如果您愿意，也可以使用`async` / `await`语法

### With React Router
React路由
如果您正在使用React Router，请参阅[ 本教程 ][143]，了解如何使用代码与之分离。您可以在这里[这里][144] 找到GitHub的GitHub库.

## Adding a Stylesheet

这个项目设置使用 [Webpack][145]来处理所有的资产。Webpack提供了一种自定义的“扩展”`import` 概念，超越了JavaScript的概念。为了表示JavaScript文件依赖于CSS文件，您需要**从JavaScript文件中导入CSS**:

### `Button.css`

```css
.Button {
  padding: 20px;
}
```

### `Button.js`

```js
import React, { Component } from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

class Button extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className="Button" />;
  }
}
```

**这不是React必须的** 但是很多人觉得这个功能很方便。您可以阅读此方法的好处[here][146]。然而，你应该意识到，这使得你的代码迁移到其他构建工具和浏览器比Webpack更不方便。  

In development, expressing dependencies this way allows your styles to be reloaded on the fly as you edit them. In production, all CSS files will be concatenated into a single minified `.css` file in the build output. 在开发中，通过这种方式表示依赖关系，在编辑它们时，可以让您的样式重新加载。在生产过程中，所有CSS文件都将被连接到构建输出的一个单一的小`css`文件中。

如果您关心的是使用Webpack-specific的语义，那么您可以将所有CSS放到`src/index.css`中。它仍然是从`src/index.js`导入的，但是如果您以后迁移到不同的构建工具，您可以删除该导入.

## Post-Processing CSS
后处理CSS
这个项目设置了你的CSS，并通过[ 自动调整器 ][147]自动添加了供应商前缀，这样你就不用担心它了。

比如:

```css
.App {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

变这样:

```css
.App {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
```

如果你因为某些原因需要禁用自动浅醉 , [遵循本节][148].

## Adding a CSS Preprocessor (Sass, Less etc.)
添加CSS预处理器
一般来说, 我们建议您不要在不同的组件上重用相同的CSS类。例如，不使用 `.Button`css类在`<AcceptButton>` 和 `<RejectButton>` 组件上。我们建议创建一个`<Button>`组件使用它自己的`.Button`样式。这样 `<AcceptButton>` 和 `<RejectButton>` 都可以被渲染 (但 [不是继承][149]).

遵循这个规则通常会使CSS预处理器变得不那么有用，因为诸如mixin和嵌套之类的特性被组件组合所取代。但是，如果您觉得它很有价值，您可以集成一个CSS预处理器。在这一过程中，我们将使用Sass，但你也可以使用Less，或者另一种选择。

首先，我们为Sass安装命令行接口:

```sh
npm install --save node-sass-chokidar
```

你也可以使用 `yarn`:

```sh
yarn add node-sass-chokidar
```

然后在 `package.json`, 添加下列几行到 `scripts`:

```diff
   "scripts": {
+    "build-css": "node-sass-chokidar src/ -o src/",
+    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom",
```

> 注意: 使用不同的预处理器, 依照你的预处理器文档替换 `build-css` 和 `watch-css` 命令。

现在你可以重命名为 `src/App.css` 到 `src/App.scss` 并运行`npm run watch-css`. 观察者会在`src`的子目录中找到每个Sass文件，并在它旁边创建相应的CSS文件，在我们的例子中，重写`src/app.css`。  从 `src/App.js` 加载 `src/App.css`, 样式成为应用程序的一部分. 现在,您可以编辑 `src/App.scss`, and `src/App.css` 将重建.

为了在Sass文件之间共享变量，你可以使用Sass的导入。例如, `src/App.scss`和其他组件样式文件可以包括`@import "./shared.scss";` 与变量定义.

为了在不使用相对路径的情况下导入文件，您可以向`package.json`中的命令添加`--include-path`选项。

```
"build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
```

这将允许你进行导入

```scss
@import 'styles/_colors.scss'; // assuming a styles directory under src/
@import 'nprogress/nprogress'; // importing a css file from the nprogress node module
```

此时，您可能想要从源控件中删除所有的CSS文件，并添加`src/**/*.css`到你的`.gitignore`文件。将构建产品保持在源代码控制之外通常是一种很好的做法。 

作为最后一步，您可能会发现运行 `npm start`时同时运行`watch-css` 很方便，`build-css` 作为`npm run build`的一部分运行也很方便。您可以使用`&&`操作符按顺序执行两个脚本。但是，没有一个跨平台的方法可以并行运行两个脚本，因此我们将为这个安装一个包: 

```sh
npm install --save npm-run-all
```

也可以使用 `yarn`:

```sh
yarn add npm-run-all
```

然后我们更改 `start` 和 `build` 脚本来包含CSS 预处理器指令:

```diff
   "scripts": {
     "build-css": "node-sass-chokidar src/ -o src/",
     "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
-    "start": "react-scripts start",
-    "build": "react-scripts build",
+    "start-js": "react-scripts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build": "npm run build-css && react-scripts build",
     "test": "react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
   }
```

现在运行 `npm start` 和 `npm run build` 还会构建Sass文件.

**为什么需要 `node-sass-chokidar`?**

`node-sass` 据报告有以下问题:

- `node-sass --watch` 在虚拟机或者docker使用时，在一定情况下会有*性能问题*

- Infinite styles compiling [^1939](https://github.com/facebookincubator/create-react-app/issues/1939)

- `node-sass` 检测文件夹中的新文件时会出现问题 [^1891](https://github.com/sass/node-sass/issues/1891)

 `node-sass-chokidar` 是用来解决这些问题的.

## Adding Images, Fonts, and Files
添加图片，字体和文件
使用Webpack，使用像图像和字体这样的静态资产与CSS类似
你可以**在一个JavaScript模块中`import` 一个文件**. 这就是告诉Webpack将这个文件包含在包中. 与 CSS 导入不同, 导入文件会给你一个字符串值.该值是您可以在代码中引用的最终路径，例如图像的`src`属性或链接到PDF的`href`。

为了减少对服务器的请求数量，导入小于10,000字节的图像会返回一个[数据URI][150]而不是路径。这适用于以下文件扩展:bmp、gif、jpg、jpeg和png。 SVG文件被排除在 [^1153](https://github.com/facebookincubator/create-react-app/issues/1153).

例如:

```js
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

 这确保了在构建项目时，Webpack将正确地将这些图像移动到构建文件夹中，并为我们提供正确的路径。

这也适用于CSS:

```css
.Logo {
  background-image: url(./logo.png);
}
```

Webpack在CSS中找到了所有相关的模块引用(它们从`./`开始)，并从编译后的包中替换它们。如果您输入错误或意外删除一个重要文件，您将看到一个编译错误，就像导入一个不存在的JavaScript模块时一样。编译后的包的最终文件名是由Webpack从内容哈希生成的。如果未来文件的内容发生变化，Webpack将在生产中给它一个不同的名字，这样你就不需要担心长期的资产缓存。

请注意，这也是Webpack的一个自定义特性。

**这不是React必须的**但是很多人都喜欢它(而且它的反应是用类似的图像机制).<br>
下一节将描述处理静态资产的另一种方法.

## Using the `public` Folder
使用`public`文件夹
> 注意: 这个特性要在 `react-scripts@0.5.0` 和更高的版本才可用

### Changing the HTML
改变HTML
`public` 文件夹包含HTML文件，你可以对它进行调整。例如 [设置页面title][151].
带有编译后代码的`script`标签会在构建过程中自动添加到HTML中

### Adding Assets Outside of the Module System
添加模块系统之外的资源。

你也可以添加其他资源到`public`文件夹

Note that we normally encourage you to `import` assets in JavaScript files instead.注意，我们通常建议你在JavaScript文件中`import`资源
例如, 参阅这一小节 [添加样式表][152] and [添加图像和字体文件][153].
这种机制提供了许多好处:

* 脚本和样式表被缩小并绑定在一起，以避免额外的网络请求.
* 丢失的文件会导致编译错误，而不是用户的404错误.
* 结果文件名包括内容散列，所以您不需要担心浏览器缓存它们的旧版本.

然而，有一个可以用来在模块系统之外添加资产的**escape hatch**

如果你把一个文件放到`public`文件夹里，它就**不会**被Webpack处理。相反，它将被原封不动地复制到构建文件夹中。要在公共文件夹中引用资产，需要使用一个名为`PUBLIC_URL`的特殊变量。

在 `index.html`里, 你可以这样使用:

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
```

只有在 `public` 文件夹的文件才可以被 `%PUBLIC_URL%` 前缀访问. 如果你需要从`src` 或者 `node_modules`使用文件, 您必须在那里复制它，以显式地指定您的意图，使该文件成为构建的一部分。

当您运行`npm run build`时，Create React App将以正确的绝对路径替代`%PUBLIC_URL%`，这样您的项目即使使用客户端路由或在非根URL上托管它也可以工作。

在 JavaScript 代码中,你可以使用 `process.env.PUBLIC_URL` 类似的目录:

```js
render() {
  // 注意: 这是一个 escape hatch，应谨慎使用!
  // 通常我们建议使用`import`来获取资产url
  // 正如上面所描述的“添加图片和字体” section.
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />;
}
```

请记住这种方法的缺点:

* `public`文件夹中的所有文件都不会被处理或缩小。
* 在编译时不会调用丢失的文件，并且会导致用户404错误。.
* 结果文件名不会包含内容散列，所以您需要添加查询参数，或者在每次更改时重命名它们.

### When to Use the `public` Folder
当你使用`public`文件夹

通常我们建议 从JavaScript导入 [样式表][154], [图片和字体][155]
`public`文件夹对于一些不太常见的情况是很有用的:

* 您需要一个在构建输出中具有特定名称的文件，例如[`manifest.webmanifest`][156].
* 有成千上万的图像需要动态地引用它们的路径.
* 你想要在包代码外包含一个小脚本如 [`pace.js`][157] 
* 一些库可能与Webpack不兼容，你没有其他选择，而是把它作为一个`script`标签.

注意 如果您添加了一个声明全局变量的`<script>`，那么您还需要阅读下一节使用它们的内容。

## Using Global Variables
使用全局变量

当您在HTML文件中包含一个定义了全局变量并试图在代码中使用其中一个变量的脚本时，linter将会报错，因为它看不到变量的定义。

您可以通过从`window`对象中显式地读取全局变量来避免这一点。:

```js
const $ = window.$;
```

这很明显，你是故意使用全局变量而不是因为一个输入错误.

或者，您可以强制linter通过在任何一行后面添加`// eslint-disable-line`忽略任何一行

## Adding Bootstrap
添加Bootstrap

您不必跟React一块儿使用[React Bootstrap][158]，但是它是一个流行的库，用于将引导Bootstrap和React应用集成在一起。如果你需要它，你可以通过以下步骤来集成它:

从npm安装React Bootstrap and Bootstrap。React Bootstrap不包括引导程序CSS所以这也需要安装:

```sh
npm install --save react-bootstrap bootstrap@3
```

你也可以使用 `yarn`:

```sh
yarn add react-bootstrap bootstrap@3
```

导入 Bootstrap CSS 和 可选的 Bootstrap 主题 CSS 在 `src/index.js` 文件的头部:

```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//把其他的导入放在下面，这样你的组件的CSS就会优先于默认样式。
```

导入必须的 React Bootstrap 组件 在 `src/App.js` 文件 或者自定义组件文件中:

```js
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
```

现在，您已经准备好在组件层次结构的render方法中使用导入的React Bootstrap组件。这是一个示例应用程序。[`App.js`][159]是一个使用了React Bootstrap重做的例子

### Using a Custom Theme

使用自定义主题

有时您可能需要调整Bootstrap视觉样式(或等效包)<br>
We我们建议采用以下方法: 

* 创建一个新的包，它取决于您希望定制的包, 比如. Bootstrap.
* 添加必要的构建步骤来调整主题，并在npm上发布您的包.
* 安装自己的主题npm包作为应用程序的依赖项.

这是一个跟着这些步奏来添加[自定义 Bootstrap][160]的例子

## Adding Flow

添加Flow

Flow是一种静态类型检查器，它可以帮助您编写bug更少的代码. 如果你对它又新的认识，参阅这篇 [在JavaScript中使用static类型][161]

最新版的[Flow][162] 与Create React App 一同工作，开箱即用。

添加Flow到Create React App 项目, 遵循以下步骤:

1. 运行 `npm install --save flow-bin` (或者 `yarn add flow-bin`).
2. 添加 `"flow": "flow"` 到`package.json` 文件的 `scripts`
3. 运行 `npm run flow init` (或者 `yarn flow init`) 来创建一个[`.flowconfig` 文件][163] 到根目录.
4. 添加 `// @flow` 到任何你想进行类型检查的文件(例如, 到 `src/App.js`).

现在你可以运行 `npm run flow` (或者 `yarn flow`) 来检查文件的类型错误.

您可以选择使用IDE [Nuclide][164] 来获得更好的体验

在未来，我们计划将其更紧密地整合到Create React App中

想了解更多关于Flow, 请参阅 [这份文档][165].

## Adding Custom Environment Variables

添加自定义环境变量

> 注意: 这个特性需要在 `react-scripts@0.2.3` 和 更高的版本.

您的项目可以使用在您的环境中声明的变量，就像在您的JS文件中本地声明的那样。默认情况下，将为您定义`NODE_ENV`，以及从其他环境变量开始
`REACT_APP_`。

**环境变量是在构建期间内嵌套的**. 由于Create React App生成一个静态HTML/CSS/JS包，所以它不可能在运行时读取它们。要在运行时读取它们，需要将HTML加载到服务器上的内存中，并在运行时替换占位符，就像这里[描述][166]所描述的那样。另外，你可以在任意时间，在服务器上重构应用程序。

> 注意: 你必须从`REACT_APP_`开始创建自定义环境变量。除 `NODE_ENV`之外的任何其他变量都将被忽略[在机器上公开一个可能具有相同名称的私有密匙][167]. 更改任何环境变量将要求您在运行时重新启动开发服务器。

这些环境变量将被定义在`process.env`上。例如, 有一个名为 `REACT_APP_SECRET_CODE` 的环境变量将被暴露在你的JS中作为 `process.env.REACT_APP_SECRET_CODE`.

还有一个特殊的内置环境变量，名为`NODE_ENV`。您可以从`process.env.NODE_ENV`读取它。当您运行`npm start`时，它总是等于`'development'`，当您运行`npm test`时，它总是等于`'test'`，当您运行`npm run build`来生成一个生产包时，它总是等于`'production'`。您不能手动地覆盖`NODE_ENV`。这可以防止开发人员意外地将开发过程部署到生产环境中。

这些环境变量可以根据项目的位置有条件地显示信息
部署或使用在版本控制之外的敏感数据。

First, you need to have environment variables defined. For example, let’s say you wanted to consume a secret defined
in the environment inside a `<form>`首先，您需要定义环境变量。例如，假设你想要在`<form>`内部环境中消费一个定义在环境中的秘密:

```jsx
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
      </form>
    </div>
  );
}
```

在构建时, `process.env.REACT_APP_SECRET_CODE` 将被替换为 `REACT_APP_SECRET_CODE` 环境变量的当前值. 请记住 `NODE_ENV` 变量的值将被自动设置.

当您在浏览器中加载应用程序并检查`<input>`时，您将看到它的值设置为`abcdef`，粗体文本将显示在使用`npm start`时所提供的环境

```html
<div>
  <small>You are running this application in <b>development</b> mode.</small>
  <form>
    <input type="hidden" value="abcdef" />
  </form>
</div>
```

上面的表单正在从环境中寻找一个名为`REACT_APP_SECRET_CODE`的变量。为了使用这个值，我们需要在环境中定义它。这可以通过两种方式实现:要么在shell中，要么在
一个`.env`的文件。这两种方法都将在接下来的几节中进行描述。

对`NODE_ENV`的访问也可以有条件地执行操作:

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

当您使用`npm run build`编译应用时，压缩步骤将会去掉这个条件，结果包将会更小。

### Referencing Environment Variables in the HTML
在HTML中引用环境变量

> 注意: 这个特性需要在 `react-scripts@0.9.0` 和更高版本上使用.

你也可以在 `public/index.html`中使用`REACT_APP_`开始访问环境变量. 例如:

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

注意 以上部分的警告适用于:

* 除了几个内置变量外 (`NODE_ENV` 和 `PUBLIC_URL`), 变量名必须命名为以`REACT_APP_` 开头。
* 环境变量是在构建时注入的. 如果你需要在运行时注入, [遵循这个方法][168].

### Adding Temporary Environment Variables In Your Shell
在Shell中添加临时环境变量

定义环境变量可以在OSes之间有所不同。同样重要的是要知道这种方式是暂时，对shell会话的生命周期来说。

#### Windows (cmd.exe)

```cmd
set REACT_APP_SECRET_CODE=abcdef&&npm start
```

(注意: 缺少空格是故意的)

#### Linux, macOS (Bash)

```bash
REACT_APP_SECRET_CODE=abcdef npm start
```

### Adding Development Environment Variables In `.env`
在`.env`中添加开发环境变量
> 注意: 这个特性需要 `react-scripts@0.5.0` 和更高版本.

要定义永久环境变量，需要在项目的根目录中创建一个名为`.env`的文件:

```
REACT_APP_SECRET_CODE=abcdef
```

`.env` 文件 **应该被** 检入到源代码控制中 (除了 `.env*.local`).

#### What other `.env` files are can be used?
其他一些可以使用`.env`文件吗？
> 注意: 这个特性 **在 `react-scripts@1.0.0` 和更高版本中可以使用**.

* `.env`: 默认.
* `.env.local`: 本地覆盖. **这个文件被加载到除测试之外的所有环境中.**
* `.env.development`, `.env.test`, `.env.production`: 特定环境的设置.
* `.env.development.local`, `.env.test.local`, `.env.production.local`: 本地覆盖的特定环境的设置.

左边的文件比右边的文件更重要:

* `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
* `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
* `npm test`: `.env.test.local`, `.env.test`, `.env` (注意 `.env.local` 这里没有)

如果机器没有显式地设置这些变量，这些变量将充当默认值。更多细节请参阅[dotenv 文档][169] 

> 注意: 如果您正在为开发定义环境变量，那么您的CI 和/或 托管平台最有可能需要这些定义。参考他们的文档如何做到这一点。例如，请参阅[Travis CI][170] 或者 [Heroku][171]。

## Can I Use Decorators?
我能使用修饰符吗？

许多流行的库在他们的文档中使用[修饰符][172]。<br>
Create React App 暂时不支持装饰语法 因为:

* 这是一个实验性的提议，并且会受到改变
* 目前的规范版本没有得到Babel的官方支持。
* 如果规范改变了，我们就不能写codemod因为我们在Facebook内部不使用它们.

然而，在许多情况下，您可以在没有修饰符的情况下重写基于修饰符的代码。<br>
请参阅这两个线程以供参考:

* [^214](https://github.com/facebookincubator/create-react-app/issues/214)
* [^411](https://github.com/facebookincubator/create-react-app/issues/411)

当规范达到稳定阶段时，Create React App将添加装饰支持。

## Integrating with an API Backend
与后端API集成

这些教程将帮助您将应用程序与在另一个端口上运行的后端API进行集成，
使用`fetch()`来访问它。

### Node
参阅 [本教程][173].
您可以找到它的GitHub库 [here][174].

### Ruby on Rails

参阅 [本教程][175].
您可以找到它的GitHub库 [here][176].

## Proxying API Requests in Development

开发模式下代理API请求
> 注意: 这个特性需要 `react-scripts@0.2.3` 和更高版本.

人们通常会从相同的主机和端口作为后端实现来服务前端React应用程序。<br>
例如，在应用程序部署之后，生产设置可能是这样的:

```
/             - 静态服务器使用React应用返回index.html
/todos        - 静态服务器使用React应用返回index.html
/api/todos    - 静态服务器使用后端实现处理任何 /api/* 请求
```

这样的设置是**不**需要的。但是，如果您**确实**有这样的设置，那么编写像`fetch('/api/todos')`这样的请求是很方便的，无需担心在开发期间将它们重定向到另一个主机或端口。

要告诉开发服务器在开发中将任何未知的请求代理到您的API服务器，请在您的包中添加一个`proxy`字段在你的`package.json`,例如: 

```js
  "proxy": "http://localhost:4000",
```

这样，当你在开发中`fetch('/api/todos')`,开发服务器将识别,这不是一个静态的资产,并将代理你的请求`http://localhost:4000/api/todos`作为后备。开发服务器**只会**尝试在它的`Accept`头中向代理发送没有`text/html`的请求。

方便的是，这避免了在开发过程中出现[CORS 问题][177]和错误消息。:

```
Fetch API 不能加载 http://localhost:4000/api/todos.在请求的资源上没有出现 'Access-Control-Allow-Origin' 头. 因此源 'http://localhost:3000' 是不被允许访问的。 如果一个不透明的响应满足您的需要，那么将请求的模式设置为“no-cors”，以获取禁用CORS的资源。
```

请记住，`proxy`只对开发有影响(在`npm start`时)，并且由您来确保像`/api/todos`这样的URL在生产中指向正确的东西。您不需要使用`/api`前缀。任何未被识别的请求，如果没有一个`text/html` accept标头，都将被重定向到指定的`proxy`。

`proxy`选项支持HTTP、HTTPS和WebSocket连接。
如果`proxy`选项对您来说**不够**灵活，或者您可以:

* [配置你自己的代理][178]
* 在您的服务器上启用CORS ([这里是关于 Express 怎么运行的][179]).
* 使用 [环境变量][180] 将正确的服务器主机和端口注入到您的应用中

### "Invalid Host Header" Errors After Configuring Proxy
在出现“Invalid Host Header”错误之后配置代理
当你启用 `proxy` 选项, 您可以选择更严格的主机检查. 这是必要的，因为将后端开放给远程主机使您的计算机容易受到DNS重新绑定攻击。这个问题在[这篇文章][181] 和 [这个问题][182]中得到解释.

在`localhost`上开发时，这不会影响到您，但是如果您像[这里描述][183]的那样远程开发，在启用`proxy`选项后，您将在浏览器中看到这个错误:

> Invalid Host header

无效的主机头部<br>
为了解决这个问题，您可以在项目根目录的一个名为`.env.development`的文件中指定您的公共开发主机:

```
HOST=mypublicdevhost.com
```

如果您现在重新启动开发服务器并从指定的主机加载应用程序，那么它应该可以工作。

如果您仍然有问题，或者如果您使用的是像云编辑器这样的更奇特的环境，那么您可以通过添加一行到`.env.development.local`来完全绕过主机检查。**请注意，这是危险的，并将您的机器暴露在恶意网站的远程代码执行中**:

```
# 注意: 这是危险的!
# 它将你的机器暴露在你访问的网站上.
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

我们不推荐这种方法.

### Configuring the Proxy Manually
手动配置代理
> 注意: 这个特性需要 `react-scripts@1.0.0` 和更高的版本.

如果`proxy`选项对您不够灵活，您可以以以下形式指定一个对象（在`package.json`中）.<br>
您还可以指定任何配置值[`http-proxy-middleware`][184] 或者 [`http-proxy`][185] 支持.
```js
{
  // ...
  "proxy": {
    "/api": {
      "target": "<url>",
      "ws": true
      // ...
    }
  }
  // ...
}
```

All requests matching this path will be proxies, no exceptions. This includes requests for `text/html`, which the standard `proxy` option does not proxy.所有匹配这条路径的请求都将是代理，无一例外。这包括对`text/html`的请求，标准的`proxy`选项不代理。

如果需要指定多个代理，可以通过指定附加的条目来实现。
匹配是正则表达式，因此您可以使用regexp来匹配多个路径。
```js
{
  // ...
  "proxy": {
    // Matches any request starting with /api
    "/api": {
      "target": "<url_1>",
      "ws": true
      // ...
    },
    // Matches any request starting with /foo
    "/foo": {
      "target": "<url_2>",
      "ssl": true,
      "pathRewrite": {
        "^/foo": "/foo/beta"
      }
      // ...
    },
    // Matches /bar/abc.html but not /bar/sub/def.html
    "/bar/[^/]*[.]html": {
      "target": "<url_3>",
      // ...
    },
    // Matches /baz/abc.html and /baz/sub/def.html
    "/baz/.*/.*[.]html": {
      "target": "<url_4>"
      // ...
    }
  }
  // ...
}
```

### Configuring a WebSocket Proxy
配置一个WebSocket 代理

在设置WebSocket代理时，需要注意一些额外的注意事项.

如果你使用的是WebSocket引擎，比如[Socket.io][186]，你必须有一个可以用作代理目标的Socket.io服务器运行。Socket.io不能使用标准的WebSocket服务器。具体地说,别指望Socket.io与[the websocket.org echo test][187]一起工作

有一些很好的文档可以用来[设置 Socket.io 服务器][188].

标准WebSocket**将**与一个标准的WebSocket服务器以及websocket.org的echo测试一起工作。您可以使用像[ws][189]这样的库来使用服务器，在[浏览器中使用原生的WebSocket][190]。

无论哪种方式，您都可以在`package.json`中手动代理WebSocket请求:

```js
{
  // ...
  "proxy": {
    "/socket": {
      // 兼容的WebSocket服务器
      "target": "ws://<socket_url>",
      // 告诉 http-proxy-middleware 这是一个 WebSocket 代理.
      //也允许您在没有附加HTTP请求的情况下代理WebSocket请求
      // https://github.com/chimurai/http-proxy-middleware#external-websocket-upgrade
      "ws": true
      // ...
    }
  }
  // ...
}
```

## Using HTTPS in Development

在开发中使用HTTPS
> 注意: 这个特性需要 `react-scripts@0.4.0` 和更高的版本.

You may require the dev server to serve pages over HTTPS. One particular case where this could be useful is when using [the "proxy" feature][191] to proxy requests to an API server when that API server is itself serving HTTPS.您可能需要开发服务器通过HTTPS来服务页面。其中一个特别的例子是，当这个API服务器本身在服务HTTPS时，使用[the "proxy" 特性][191]来代理请求到一个API服务器。

To do this, set the `HTTPS` environment variable to `true`, then start the dev server as usual with `npm start`要做到这一点，请将`HTTPS`环境变量设置为`true`，然后在`npm start`时启动dev服务器::

#### Windows (cmd.exe)

```cmd
set HTTPS=true&&npm start
```

(注意: 缺少空格是故意的.)

#### Linux, macOS (Bash)

```bash
HTTPS=true npm start
```

请注意，服务器将使用自签名证书，因此在访问页面时，您的web浏览器几乎肯定会显示警告.

## Generating Dynamic `<meta>` Tags on the Server

在服务器上生成动态`<meta>`标签

由于Create React App不支持服务器渲染，所以您可能想知道如何使`<meta>`标签动态并反映当前的URL。为了解决这个问题，我们建议在HTML中添加占位符，如下:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta property="og:title" content="__OG_TITLE__">
    <meta property="og:description" content="__OG_DESCRIPTION__">
```

然后，在服务器上，不管您使用的后端是什么，您都可以读取`index.html`到内存中，并替换`__OG_TITLE__`, `__OG_DESCRIPTION__`和任何其他占位符，这些占位符都依赖于当前的URL。只需确保对插入的值进行消毒和转义，这样它们就可以安全地嵌入到HTML中了

如果您使用一个Node服务器，您甚至可以共享客户端和服务器之间的路由匹配逻辑。然而，在简单的情况下，复制它也可以很好地工作。

## Pre-Rendering into Static HTML Files
预渲染到静态HTML文件

如果您使用静态托管提供程序来托管您的`build`，那么您可以使用[react-snapshot][192]来为您的应用程序中的每个路由或相关链接生成HTML页面。当JavaScript包加载时，这些页面将无缝地变得活跃，或者“水化”。

在静态托管之外也有机会使用此功能，在生成和缓存路由时，可以减轻服务器的压力。

预渲染的主要好处是，不管你的JavaScript包是否成功下载，你都可以使用HTML payload—regardless获得每个页面的核心内容。它还增加了应用程序的每条路径都被搜索引擎接收的可能性。

你可以读更多关于 [零配置 预渲染 (也称为snapshotting快照)][193].

## Injecting Data from the Server into the Page
从服务器向页面中注入数据

与上一节类似，您可以在HTML中留下一些占位符，例如，注入全局变量。:

```js
<!doctype html>
<html lang="en">
  <head>
    <script>
      window.SERVER_DATA = __SERVER_DATA__;
    </script>
```

然后，在服务器上，您可以在发送响应之前使用真实数据的JSON替换`__SERVER_DATA__`。然后，客户端代码可以读取`window.SERVER_DATA`来使用它。**请确保[在将JSON发送给客户端之前对它进行消毒][194]，因为它使您的应用程序容易受到XSS攻击**。
## Running Tests
运行测试

> 注意: 这个特性需要 `react-scripts@0.3.0` 和更高版本.<br>
> [阅读迁移指南，了解如何在旧项目中启用它!][195]

Create React App使用[Jest][196]作为它的测试运行程序。为了准备这次整合，我们做了一个[重大的修改][197]，如果你在几年前听到了不好的事情，再试一次。

Jest是一个基于Node的运行程序。这意味着测试总是在Node环境中运行，而不是在真正的浏览器中运行。这让我们能够实现快速的迭代速度和防止碎片化。

虽然Jest提供了浏览器全球化，例如基于[jsdom][198]的`window`，但它们只是近似真正的浏览器行为。Jest的目的是用于对逻辑和组件进行单元测试，而不是DOM特性

我们建议您在需要的时候使用一个单独的工具来进行端到端测试。它们超出了Create React App的范围。

### Filename Conventions
文件名的约定

将查找带有以下流行命名约定的测试文件::

* 在 `__tests__` 文件夹中带`.js` 后缀的文件.
* 带`.test.js` 后缀的文件.
* 带`.spec.js` 后缀的文件.

`.test.js` / `.spec.js` 文件 (或者 `__tests__` 文件夹)可以位于`src`文件夹下的任何深度的位置。

我们建议将测试文件(或`__tests__`文件夹)放在它们正在测试的代码旁边，这样相对的导入就会比较短。例如,如果`App.test.js`和`App.js`在同一个文件夹中，测试只需要从`import App from './App'`而不是一个长的相对路径。在较大的项目中，还可以帮助更快地找到测试。

### Command Line Interface
命令行接口

当你运行`npm test`, Jest将在观察模式中启动。每次您保存一个文件时，它都会重新运行测试，就像`npm start`重新编译代码一样。

The watcher includes an interactive command-line interface with the ability to run all tests, or focus on a search pattern. It is designed this way so that you can keep it open and enjoy fast re-runs. You can learn the commands from the “Watch Usage” note that the watcher prints after every run观察者包括一个交互式命令行接口，它可以运行所有测试，或者关注一个搜索模式。它是这样设计的，这样你就可以保持它的开放性，并享受快速的重新运行。您可以从“观察使用”中注意到每一次运行后观察者的输出:

![Jest 观察模式][image-1]

### Version Control Integration
版本控制

默认情况下，当您运行`npm test`时，Jest将只运行与上次提交后更改的文件相关的测试。这是一种优化设计，可以让您的测试运行得很快，而不管您有多少测试。但是，它假设您不经常提交不通过测试的代码。

Jest总是会明确地提到，它只运行与上次提交后更改的文件相关的测试。您还可以在观察模式中按下`a`，强制Jest运行所有测试。

Jest将始终运行在[continuous integration][199]服务器上的所有测试，或者如果项目不在Git或Mercurial存储库中。

### Writing Tests

编写测试

创建测试, 使用测试和它的代码的名字添加 `it()` (或者 `test()`) 。 您可以选择将它们包装为`describe()`逻辑分组的块，但这既不是必需的，也不是建议的。

Jest提供了内置的用于断言的`expect()`全局函数。一个基本的测试可以是这样的:

```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

所有的 `expect()` 匹配器都被Jest支持[广泛地记录在这里][200].<br>
你也可以使用 [`jest.fn()` and `expect(fn).toBeCalled()`][201] 来创建 “spies” 或 模拟 functions.

### Testing Components
测试组件

有一个广泛的组件测试技术。它们的范围从一种“冒烟测试”，验证组件在不抛出的情况下渲染，到对某些输出进行浅渲染和测试，到完整的渲染和测试组件的生命周期和状态变化。

不同的项目根据组件变更的频繁程度和它们包含多少逻辑来选择不同的测试权衡。如果您还没有决定测试策略，我们建议您首先为您的组件创建简单的烟雾测试:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
```

这个测试挂载一个组件并确保它没有仍渲染。这样的测试可以很简单的提供大量价值，所以它们可以作为一个很好的起点,你可以在`src/App.test.js`中找到这些测试。

当您遇到由更改组件引起的bug时，您将获得更深入的了解，其中哪些部分值得在您的应用程序中进行测试。这可能是引入更具体的测试来断言特定的期望输出或行为的好时机。

If you’d like to test components in isolation from the child components they render, we recommend using [`shallow()` rendering API][202] from [Enzyme][203]. To install it, run:如果您想要对组件进行单独的测试，那么就可以从它们渲染的子组件中进行测试。那么我们建议从 [Enzyme][203]里使用[`shallow()` rendering API][202] 。安装它,运行:

```sh
npm install --save enzyme react-test-renderer
```

你也可以使用 `yarn`:

```sh
yarn add enzyme react-test-renderer
```

你也可以用它来写一份烟雾测试:

```js
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});
```

不像之前的使用`ReactDOM.render()`的烟雾测试，这个测试仅渲染了`<App>`并没有深入。例如，即使`<App>`本身渲染了一个抛出的`<Button>`，这个测试也会通过。浅渲染对于独立的单元测试来说是很好的，但是您可能仍然需要创建一些完整的渲染测试，以确保组件能够正确地集成。Enzyme支持[使用 `mount()`来完整渲染][204]，你也可以用它来测试状态变化和组件生命周期。

为了更多的测试技术，您可以阅读[Enzyme文档][205]。Enzyme文档使用 Chai 和 Sinon 来断言，但你不需要使用它们，因为Jest提供了内置的`expect()`和`jest.fn()` for spies。

这里有一个来自Enzyme文档的例子，它断言特定的输出，为使用Jest匹配器重写:

```js
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome to React</h2>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});
```

所有的Jest匹配器被 [广泛记录在这里][206].<br>
不过如果你想，你也可以使用像[Chai][207]三方断言插件。

另外，您可能会发现[jest-enzyme][208]使用可读的匹配器来帮助简化您的测试。上面`contains`代码可以用最简单的酶来编写。

```js
expect(wrapper).toContainReact(welcome)
```

启用这个, 需要安装 `jest-enzyme`:

```sh
npm install --save jest-enzyme
```

你也可以使用 `yarn`:

```sh
yarn add jest-enzyme
```

在 [`src/setupTests.js`][209]中导入它，使它在每个测试中都可用:

```js
import 'jest-enzyme';
```

### Using Third Party Assertion Libraries
使用三方断言库

We recommend that you use `expect()` for assertions and `jest.fn()` for spies. If you are having issues with them please [file those against Jest][210], and we’ll fix them. We intend to keep making them better for React, supporting, for example, [pretty-printing React elements as JSX][211].我们建议您使用`expect()`来断言和`jest.fn()`来spies。如果你有关于它们的问题，请[把这些问题提交给我们][210]，我们会解决的。我们打算继续让它们更好服务于React，例如，[如同JSX，美观地输出React元素][211]

然而, 如果您使用其他的库, 例如 [Chai][212] and [Sinon][213], 或者，如果你有现成的代码，你想要移植过来，你可以像这样导入它们::

```js
import sinon from 'sinon';
import { expect } from 'chai';
```

然后像往常一样在你的测试中使用它们。

### Initializing Test Environment

初始化测试环境
> 注意: 这个特性需要 `react-scripts@0.4.0` 和更高版本.

如果您的应用程序使用了您需要在测试中模拟的浏览器API，或者在运行您的测试之前需要一个全局设置，那么添加一个`src/setupTests.js`到您的项目。在运行您的测试之前，它将被自动执行

例如:

#### `src/setupTests.js`
```js
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock
```

### Focusing and Excluding Tests

聚焦和排除测试

你可以将`it()`替换为`xit()`来从被执行的测试中暂时排除一个测试<br>
同样,`fit()`让您在不运行任何其他测试的情况下专注于一个特定的测试

### Coverage Reporting
覆盖率报告

Jest有一个集成的覆盖报告，它与ES6很好地工作，并且不需要配置<br>
运行 `npm test -- --coverage` (注意 在中间有一个额外的 `--` ) 来包含一个像这样的报告:

![覆盖率报告][image-2]

注意，测试运行的速度要慢得多，因此建议将其与正常工作流程分开运行。.

### Continuous Integration

持续集成

在默认情况下，`npm test`用交互式CLI运行监视者。但是，您可以强制它运行一次测试，并通过设置一个名为`CI`的环境变量来完成该过程。

在使用`npm run build`创建程序的构建时，默认情况下不会检查您的应用程序。与`npm test`一样，您可以通过设置环境变量`CI`来强制构建执行一个linter警告检查。如果遇到任何警告，则构建失败。

流行的CI服务器已经默认设置了环境变量`CI`但是您也可以自己这样做:

### On CI servers
#### Travis CI

1. 在 [Travis 开始][214] 后，使用Travis同步你的Github仓库  您可能需要在您的[profile][215] 页面中手动初始化一些设置 .
2. 添加 `.travis.yml` 文件到git仓库.
```
language: node_js
node_js:
  - 6
cache:
  directories:
    - node_modules
script:
  - npm run build
  - npm test
```
1. 使用git push 触发第一个构建.
2. 如果需要，你可以[自定义Travis CI Build][216] .

#### CircleCI

跟随 [this article][217] 来设置一个 Create React App 项目的 CircleCI

### On your own environment
##### Windows (cmd.exe)

```cmd
set CI=true&&npm test
```

```cmd
set CI=true&&npm run build
```

(注意: 缺少空格是故意的.)

##### Linux, macOS (Bash)

```bash
CI=true npm test
```

```bash
CI=true npm run build
```

测试命令将迫使Jest运行一次测试，而不是启动监视程序

>  如果您发现自己经常在开发过程中这样做，请[提交问题][218]，告诉我们您的用例，因为我们想让观察者有好的经验，并且愿意改变它的工作方式以适应更多的工作流程。

构建命令将检查linter警告，如果找到了，就会失败。

### Disabling jsdom

默认情况下, 项目生成的 `package.json` 就像这样:

```js
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom"
```

如果您知道没有一个测试依赖于[jsdom][219]，那么您可以安全地删除`--env=jsdom`，您的测试将运行得更快:

```diff
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
-   "test": "react-scripts test --env=jsdom"
+   "test": "react-scripts test"
```

为了帮助你下定决定，这里有一个api列表 **需要 jsdom**:

* 任何像 `window` 和 `document`的浏览器全局变量
* [`ReactDOM.render()`][220]
* [`TestUtils.renderIntoDocument()`][221] ([a shortcut][222] for the above)
* [`mount()`][223] in [Enzyme][224]

与此形成鲜明对比的是, 以下API**不需要jsdom** :

* [`TestUtils.createRenderer()`][225] (前渲染)
* [`shallow()`][226] in [Enzyme][227]

最后，对于[快照测试][228]，也不需要jsdom.

### Snapshot Testing
快照测试

快照测试是Jest的一个特性，它自动生成组件的文本快照，并将其保存在磁盘上，因此如果UI输出发生更改，您将得到通知，而无需手工编写组件输出的任何断言。[请阅读有关快照测试的更多信息][229]

### Editor Integration
编辑器集成

如果你使用 [Visual Studio Code][230], 这里是一个[Jest 扩展][231] 它能与 Create React App 一起工作. 它与创建反应应用程序一起工作。在使用文本编辑器时，这提供了许多类似于理想的功能:显示带有潜在失败消息的测试运行状态，并自动启动和停止监视程序，并提供一个单击快照更新。

![Jest VS代码预览][image-3]

## Developing Components in Isolation

隔离开发组件

通常，在一个应用中，你有很多UI组件，每个组件都有很多不同的状态。
例如，一个简单的按钮组件可以有以下几个状态:

* 在一个常规状态下，有一个文本标签.
* 禁用状态.
* 加载状态.

通常，在不运行示例应用程序或一些示例的情况下，很难看到这些状态。

默认情况下，Create React App 不包含任何工具, 但你可以很容易地添加 [Storybook for React][232] ([source][233]) 或者 [React Styleguidist][234] ([source][235]) 到你的项目. **这些是第三方工具，可以让你开发组件，并将它们的状态与你的应用隔离开来**.

![Storybook for React Demo][image-4]

你也可以将你的故事书或风格指南作为一个静态应用来部署，这样，你的团队中的每个人都可以查看和审查不同状态的UI组件，而无需启动后台服务器或在应用中创建账户。

### Getting Started with Storybook
开始使用故事书

Storybook是一个用于React UI组件的开发环境。它允许您浏览一个组件库，查看每个组件的不同状态，并交互式地开发和测试组件。

首先, 全局安装npm包

```sh
npm install -g @storybook/cli
```

然后在你的应用目录下运行下面的命令

```sh
getstorybook
```

然后，按照屏幕上的说明进行操作.

阅读更多关于React Storybook:

* 截屏视频: [开始使用 React Storybook][236]
* [GitHub Repo][237]
* [文档][238]
* 使用 Storybook + addon/storyshot[快照测试 UI][239]

### Getting Started with Styleguidist
开始使用Styleguidist

Styleguidist结合了一个样式指南，所有的组件都放在一个单独的页面上，其中包含了它们的支持文档和使用示例，并且具有单独开发组件的环境，类似于故事书。在Styleguidist中，您可以在Markdown中编写示例，其中每个代码片段都被呈现为一个可实时编辑的游乐场。

首先安装Styleguidist:

```sh
npm install --save react-styleguidist
```

你也可以使用 `yarn`:

```sh
yarn add react-styleguidist
```

然后添加这些脚本到 `package.json`:

```diff
   "scripts": {
+    "styleguide": "styleguidist server",
+    "styleguide:build": "styleguidist build",
     "start": "react-scripts start",
```

然后在你的应用文件夹运行下面的指令：:

```sh
npm run styleguide
```

然后，按照屏幕上的说明操作.

阅读更多关于React Styleguidist:

* [GitHub Repo][240]
* [文档][241]

## Making a Progressive Web App
制作一个渐进的网页应用

默认情况下，生产构建是一个完全功能的、离线优先的[渐进 Web App][242].

渐进网页应用比传统网页更快、更可靠，并且提供了一种引人入胜的移动体验:

 * 所有静态站点资源都被缓存，以便您的页面在后续访问时快速加载，而不管网络连接(比如2G或3G)。更新是在后台下载的。
 * 无论网络状态如何，你的应用都能工作，即使离线。这意味着你的用户可以在1万英尺的高空使用你的应用.
 * 在移动设备上，你的应用可以直接添加到用户的主屏幕、应用图标等等。您还可以使用web**推送通知**重新吸引用户。这就消除了对应用商店的需求.

[`sw-precache-webpack-plugin`][243]被集成到生产配置中，它会负责生成一个服务工作者文件,这个文件将自动预先缓存所有本地资源，并在部署更新时保持更新。
这个服务工作者将使用一个 [缓存优先策略][244]来处理所有的对本地资源的请求，包含初始HTML， 确保你的网络应用程序是可靠的，即使是在一个缓慢或不可靠的网络上。

### Opting Out of Caching
选择的缓存

如果您不希望在您初始的生产部署之前启用服务人员，然后取消调用If you would prefer not to enable service workers prior to your initial
production deployment, 那么取消从[`src/index.js`][245]调用`serviceWorkerRegistration.register()`。

如果您以前在您的生产部署中启用了服务人员，并且已经决定要禁用所有现有的用户，
你可以在[`src/index.js`][246] 里调用`serviceWorkerRegistration.unregister()`替换调用`serviceWorkerRegistration.register()`来完成。
在用户访问一个页面之后 `serviceWorkerRegistration.unregister()`,
这个服务工作者将被注销. 注意 that 取决于 `/service-worker.js` 是怎样被服务的,缓存失效可能需要24个小时。

### Offline-First Considerations
离线优先注意事项
1. Service workers [需要 HTTPS][247],尽管为了促进本地测试，这一政策
[不适用于 `localhost`][248].如果您的生产web服务器不支持HTTPS，那么服务工作者注册将会失败，但你的其他网页应用仍将保持功能。

2. Service workers 在所有的web浏览器中 [目前不被支持][249]
Service worker登记在不被支持的浏览器上 [不会被尝试][250]

3. Service worker 仅在 [生产环境]中启用[251],
例如  `npm run build`的输出. 建议你不要在开发环境中启用离线的服务工作人员，因为它可能导致在使用之前缓存的资源时会感到沮丧，并且不包括你在本地更改过的最新的资源。也就是说当你本地的资源已经更新时，这个缓存的资源不会得到更新，并且在使用的时候还是使用的缓存资源。

4. If you *need* to test your offline-first service worker locally, build
the application (using `npm run build`) and run a simple http server from your
build directory. After running the build script, `create-react-app` will give
instructions for one way to test your production build locally and the [deployment instructions][252] have
instructions for using other methods. \*Be sure to always use an
incognito window to avoid complications with your browser cache.\*

5. 如果你 *需要* 在本地测试你的离线优先的服务工作者， 构建这个应用程序 (使用 `npm run build`) 并从你的构建目录运行一个简单的http服务器。 在运行构建脚本之后, `create-react-app` 将会给一个在本地测试你的生产构建的说明，并且 [部署说明][252] 包含其他使用方法的说明. \*一定要经常使用匿名窗口以避免浏览器缓存的复杂性。\*

6. 如果可能，配置你的生产环境来服务于`service-worker.js` [禁用HTTP缓存][253].如果这是不可能的—例如，[GitHub Pages][254],  不允许你修改HTTP缓存默认的10分钟的生命周期，然后注意，如果你访问你的生产站点，然后在`service-worker.js`从HTTP缓存中过期之前再次访问，你会从服务器工作者得到先前缓存的资源。如果你有一个需要立即显示的更新的生产部署，执行一个shift-refresh(什么是shift-refresh，就是按着shift键再点击刷新按钮或者F5键刷新，区别在于这样会先清除缓存) 将暂时禁用服务器工作者，并且从网络检索所有资源。

7. 用户并不总是熟悉离线优先的web应用。 它会有很用
[让用户知道][255]当服务器工作者已经完成填充你的缓存时
(显示一个"这个web应用可以离线使用!" 的信息) 并且让他们知道服务器工作者什么时候什么时候获取最新的更新，这些更新将会在下次加载页面的时候被应用。(显示一个 "新内容可用，请刷新." 的信息).显示此消息目前作为开发人员的一个练习，但作为一个起点，你可以使逻辑包含在[`src/registerServiceWorker.js`][256]中，哪一个演示哪些服务工作者生命周期事件，以侦听每一个事件场景，作为缺省的，只是将适当的消息记录到JavaScript控制台。 

8. 默认情况下，生成的服务工作者文件将不截取或缓存任何跨域交通，就像HTTP[API 请求][257]，图片，或者从不同的域加载的嵌入。如果你想为这些请求使用一个运行时缓存策略，你可以[`eject`]，然后在[`webpack.config.prod.js`][260]的`SWPrecacheWebpackPlugin`小节中配置[`runtimeCaching`][259]选项

### Progressive Web App Metadata

渐进的Web应用元数据

默认的配置包含一个web应用清单文件，位于[`public/manifest.json`][261]，这个文件使你可以自定义应用程序的详细信息。

当用户在Android上使用Chrome或Firefox将一个网页应用添加他们的主屏幕上时，
，[`manifest.json`][262]中的元数据决定了当web应用程序显示时，什么图标、名称和品牌颜色将被使用。

[Web App Manifest指南][263]提供更多关于每个字段意思的上下文，以及您的自定义会怎样影响你的用户体验。

## Analyzing the Bundle Size
分析包的大小

[Source map 资源管理器][264]使用source maps分析JavaScript包的大小。这这有助于你理解代码在哪里变得膨胀。

添加Source map资源管理器到 Create React App 项目, 遵循下面的步骤:

```sh
npm install --save source-map-explorer
```

你也可以使用 `yarn`:

```sh
yarn add source-map-explorer
```

然后在 `package.json`中, 添加下面的行到`scripts`:

```diff
   "scripts": {
+    "analyze": "source-map-explorer build/static/js/main.*",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom",
```

然后就可以运行生产构建，接着运行analyze脚本来分析包的大小：
```
npm run build
npm run analyze
```

## Deployment

部署
`npm run build` 在生产构建时会创建一个 `build` 目录. 设置您最喜欢的HTTP服务器，以便访问您的站点的访问者为`index.html`服务,并且请求像`/static/js/main.<hash>.js`这样的静态路径会和`/static/js/main.<hash>.js`文件的内容一起被提供 。

### Static Server
静态服务器

对于使用[Node][265]环境的最简单的方法是安装[serve][266]来处理:

```sh
npm install -g serve
serve -s build
```

上面显示的最后一个命令将在端口**5000**上为您的静态站点提供服务。与许多[serve][267]的内部设置一样，端口可以使用`-p`或`--port`标记进行调整。

运行此命令以获得可用选项的完整列表:

```sh
serve -h
```

### Other Solutions
其他的解决方案

为了在生产中运行一个Create React App项目，您不一定需要一个静态服务器。它与现有的动态服务器可以很好地集成在一起。

下面是一个使用 [Node][268] 和 [Express][269]的例子:

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
```

您的服务器软件的选择也不重要。由于Create React App完全是平台无关的，所以不需要显式地使用Node。

带有静态资源的`build`文件夹是Create React App**惟一输出**

但是，如果使用客户端路由，这还不够。如果你想在单页应用中支持像`/todo/42`这样的url，请阅读下一节。

### Serving Apps with Client-Side Routing
使用客户端路由服务应用程序

在底层，如果使用HTML5的[`pushState` history API][270] (例如, [React Router][271] with `browserHistory`), 许多静态文件服务器将会失败. 例如，如果您使用的是React Router和`/todo/42`的路由，开发服务器将会对`localhost:3000/todo/42`做出响应，但是对于一个生产构建的服务将不会这样做。 

This is because when there is a fresh page load for a `/todos/42`, the server looks for the file `build/todos/42` and does not find it. The server needs to be configured to respond to a request to `/todos/42` by serving `index.html`. For example, we can amend our Express example above to serve `index.html` for any unknown paths:这是因为当`/todo/42`有一个新的页面加载时，服务器查找文件`build/todo/42`，并且没有找到它。服务器需要配置为通过服务`index.html`来响应对`/todo/42`的请求。例如，我们可以修改上面的Express示例来服务`index.html`，用于任何未知路径:

```diff
 app.use(express.static(path.join(__dirname, 'build')));

-app.get('/', function (req, res) {
+app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
```

如果你使用[Apache HTTP Server][272]，你需要在`public`文件夹创建一个`.htaccess`文件，像这样

```
    Options -MultiViews
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.html [QSA,L]
```

在运行`npm run build`时，它将被复制到`build`文件夹中。

如果你使用 [Apache Tomcat][273],你需要跟随 [这个Stack Overflow 回答][274].

现在，对`/todo/42`的请求将在开发和生产中得到正确的处理。

在生产构建和支持[service workers][275]的浏览器中，服务工作者将自动处理所有的导航请求，例如`/todo/42`，通过提供您的`index.html`的缓存副本。
服务工作者导航路由可以被[`eject`ing][276]配置或禁用，然后修改
[' navigateFallback '][277]和`SWPreachePlugin` [configuration][279]的[' navigateFallbackWhitelist '][278]选项。

### Building for Relative Paths
构建的相对路径

默认情况下，如果你的应用托管在服务器根目录，Create React App会生成一个 g偶见版本。<br>
要覆盖这个，请在`package.json`中指定`homepage`主页。 例如:

```js
  "homepage": "http://mywebsite.com/relativepath",
```

这将让Create React App正确地推断在生成的HTML文件中使用的根路径。

**注意**: If you are using `react-router@^4`, you can root `<Link>`s using the `basename` prop on any `<Router>`.<br>
More information [here][280].如果你使用 `react-router@^4`,你可以在任何`<Router>`上使用`basename`属性来为 `<Link>`指定根。也就是`basename`是下属`Link`标签的路径前缀。

更多信息情查阅[这里][280]<br>
<br>
例如:
```js
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="/calendar/today">
```

#### Serving the Same Build from Different Paths
从不同的路径中提供相同的构建

> 注意: 这个特性需要 `react-scripts@0.9.0` 和更高版本.

如果您没有使用HTML5 `pushState` history API，或者根本不使用客户端路由，那么就没有必要指定您的应用程序将提供的URL。相反，你可以把它放在你的`package.json`中:

```js
  "homepage": ".",
```

这使得可以明确所有的资源相对于`index.html`的相对路径。 然后你就可以将你的应用从`http://mywebsite.com` 移动到`http://mywebsite.com/relativepath` 或者甚至在不重新构建的情况下移动到 `http://mywebsite.com/relative/path`。因为是相对路径，所以整体移动项目文件夹对它并无影响。

### [Azure][281]

查看 [这个][282] 博客查看怎样将你的React应用贴到微软的Azure.(微软的云平台)

### [Firebase][283]

如果你还未运行`npm install -g firebase-tools`安装Firebase脚手架工具，请安装它。注册一个[Firebase 账号][284]并创建一个新项目。使用刚才创建的账号运行`firebase login`进行登录。

然后从你的项目根目录运行`firebase init`命令。 你需要选择 **Hosting: Configure and deploy Firebase Hosting sites** 并且选择你之前的步奏中创建的Firebase项目. 你需要同意 `database.rules.json` 被创建, 选择 `build` 作为公共目录, 然后需要通过回复`y`来同意**Configure as a single-page app**，配置为一个单页应用。

```sh
    === Project Setup

    First, let's associate this project directory with a Firebase project.
    You can create multiple project aliases by running firebase use --add,
    but for now we'll just set up a default project.

    ? What Firebase project do you want to associate as default? Example app (example-app-fd690)

    === Database Setup

    Firebase Realtime Database Rules allow you to define how your data should be
    structured and when your data can be read from and written to.

    ? What file should be used for Database Rules? database.rules.json
    ✔  Database Rules for example-app-fd690 have been downloaded to database.rules.json.
    Future modifications to database.rules.json will update Database Rules when you run
    firebase deploy.

    === Hosting Setup

    Your public directory is the folder (relative to your project directory) that
    will contain Hosting assets to uploaded with firebase deploy. If you
    have a build process for your assets, use your build's output directory.

    ? What do you want to use as your public directory? build
    ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
    ✔  Wrote build/index.html

    i  Writing configuration info to firebase.json...
    i  Writing project information to .firebaserc...

    ✔  Firebase initialization complete!
```

现在，在你使用`npm run build`创建了一个生产构建之后，你可以运行`firebase deploy`来部署它。

```sh
    === Deploying to 'example-app-fd690'...

    i  deploying database, hosting
    ✔  database: rules ready to deploy.
    i  hosting: preparing build directory for upload...
    Uploading: [==============================          ] 75%✔  hosting: build folder uploaded successfully
    ✔  hosting: 8 files uploaded successfully
    i  starting release process (may take several minutes)...

    ✔  Deploy complete!

    Project Console: https://console.firebase.google.com/project/example-app-fd690/overview
    Hosting URL: https://example-app-fd690.firebaseapp.com
```

参阅 [添加 Firebase到你的JavaScript项目][285]，获得更多信息.

### [GitHub Pages][286]
GitHub页面
> 注意: 这个特性需要 `react-scripts@0.2.0` 和更高.

#### Step 1: Add `homepage` to `package.json`

**下面的步骤很重要!**<br>
**如果你跳过它，你的应用就不能正确部署.**

打开 `package.json` 并添加 `homepage` 字段:

```js
  "homepage": "https://myusername.github.io/my-app",
```

Create React App 使用 `homepage` 字段来确定构建的HTML文件的根URL

#### Step 2: 安装 `gh-pages` 并且添加 `deploy` 到 `package.json`的`scripts` 段落

现在，无论何时运行`npm run build`，您都会看到一个关于如何部署到GitHub Pages的备忘单。

在 [https://myusername.github.io/my-app][287] 发布它, run:

```sh
npm install --save gh-pages
```

你也可以使用 `yarn`:

```sh
yarn add gh-pages
```

添加下面的脚本到你的 `package.json`:

```diff
  "scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

`predeploy` 脚本将在`deploy`运行之前自动运行。

#### Step 3: 运行`npm run deploy`部署站点

然后运行 :

```sh
npm run deploy
```

#### Step 4: 确保你的项目设置使用了`gh-pages`

最后, 确保 **GitHub Pages** 选项在你的github项目设置里是使用`gh-pages`分支:

<img src="http://i.imgur.com/HUjEr9l.png" width="500" alt="gh-pages branch setting">

#### Step 5: 可选的, 配置域

你可以在Github Pages添加`CNAME`文件到`public`文件夹来配置一个自定义的域。

#### 客户端路由注意事项

GitHub Pages 不支持在底层上使用HTML5 `pushState` history API的路由(例如, React Router 使用 `browserHistory`).这是因为当一个url像`http://user.github.io/todomvc/todos/42`的新页面加载时，`/todos/42`是一个前端路由，Github Pages服务器会返回404,因为它不知道`/todos/42`为何物。如果你想添加一个路由到Github Pages托管的项目，这儿有两个解决方案:

* 你可以从使用HTML5 history API切换到使用哈希的路由。如果你使用React Router,你可以切换到`hashHistory`来实现这个效果，但是URL会因此变得很长也更详细 (例如, `http://user.github.io/todomvc/#/todos/42?_k=yknaj`). [阅读更多][288] 关于在React Router中不同的history实现
* 另外,你可以使用一个技巧来教 GitHub Pages 通过使用特殊的重定向参数重定向到`index.html`页面来处理404。你需要在部署你的项目之前添加一个包含重定向代码的`404.html`文件到`build`文件夹，并且你需要添加处理重定向参数的代码到`index.html`。你可以找到对这种技术的详细解释[在这个指南][289].

### [Heroku][290]

使用[Heroku Buildpack for Create React App][291].<br>
你可参阅 [零配置部署 React][292].

#### Resolving Heroku Deployment Errors
解决Heroku部署错误

有时候 `npm run build`在本地正常工作，但在通过Heroku部署时出现错误。以下是一些常见的情况。

##### "Module not found: Error: Cannot resolve 'file' or 'directory'"

如果你得到像这样的错误:

```
remote: Failed to create a production build. Reason:
remote: Module not found: Error: Cannot resolve 'file' or 'directory'
MyDirectory in /tmp/build_1234/src
```

这意味着您需要确保您导入的文件或目录的大小写与您在文件系统或GitHub上所看到的文件相匹配

这很重要，因为Linux(Heroku使用的操作系统)是很敏感的。因此，`MyDirectory`和`myDirectory`是两个不同的目录，因此，即使项目是在本地构建的，不同的情况也会破坏Heroku远程上的`import` 语句。

##### "Could not find a required file."

如果排除或忽略包中的必要文件，就会看到类似的错误:

```
remote: Could not find a required file.
remote:   Name: `index.html`
remote:   Searched in: /tmp/build_a2875fc163b209225122d68916f1d4df/public
remote:
remote: npm ERR! Linux 3.13.0-105-generic
remote: npm ERR! argv "/tmp/build_a2875fc163b209225122d68916f1d4df/.heroku/node/bin/node" "/tmp/build_a2875fc163b209225122d68916f1d4df/.heroku/node/bin/npm" "run" "build"
```

在本例中，确保该文件与它的字母大小写，并且在本地不会被忽略`.gitignore`或`~ / .gitignore_global`。

### [Netlify][293]

**手动部署Netlify的CDN:**

```sh
npm install netlify-cli
netlify deploy
```

选择 `build` 作为部署文件夹.

**To setup continuous delivery设置持续交付:**

有了这个设置，当你推到git或打开一个拉取请求时，Netlify将会构建和部署。:

1. [开始一个新的netlify项目][294]
2. 选择您的Git托管服务并选择您的存储库
3. 点击 `Build your site`

**支持客户端路由:**

为了支持 `pushState`,请使用下面的重写规则创建一个`public/_redirects`文件 :

```
/*  /index.html  200
```

当你构建这个项目时，Create React App将把`public`文件夹的内容放到构建输出中。

### [Now][295]

Now offers a zero-configuration single-command deployment. You can use `now` to deploy your app for free.现在提供了一个零配置的单命令部署。你可以使用`now`来免费部署你的应用了。

1. 安装 `now` 命令行工具， 通过推荐的 [desktop tool][296] 或者 通过 node的`npm install -g now`命令 .

2. 使用 `npm run build`来构建你的应用.

3. 运行`cd build`来移步到构建目录.

4. 从构建目录运行 `now --name your-project-name` . 你将在输出中看到 **now.sh** URL ，像这样:

	```
	> Ready! https://your-project-name-tpspyhtdtk.now.sh (copied to clipboard)
	```

	当构建完成时，将该URL粘贴到浏览器中，您将看到已部署的应用程序。

可用的细节在[这篇文章中.][297]

### [S3][298] and [CloudFront][299]

查看 [博客][300] 关于怎样部署你的React应用到亚马逊网络服务器S3和CloudFront

### [Surge][301]

如果您还没有运行`npm install -g surge`，那么安装这个Surge CLI。运行`surge`命令，登录您或创建一个新帐户。

当被问及项目路径时，请确保指定`build`文件夹，例如::

```sh
       project path: /path/to/project/build
```

注意，为了支持使用HTML5 `push HTML5` API的路由，你可能想要在部署Surge之前，在你的构建文件夹重命名`index.html`为`200.html`这是 [确保每个URL都返回到该文件][302].

## Advanced Configuration
高级配置

您可以通过在shell中设置环境变量或者[.env][303]来调整各种开发和生产设置。

Variable | Development | Production | Usage
:--- | :---: | :---: | :---
BROWSER | :white\_check\_mark: | :x: | 默认情况下，Create React App会打开默认的系统浏览器，在macOS上支持Chrome。指定一个[浏览器][304]来覆盖该行为，或者将其设置为none，以完全禁用该行为。如果您需要自定义浏览器的启动方式，则可以指定一个node脚本。任何传递给`npm start`的参数都将传递给该脚本，而您的应用程序的url将是最后一个参数。您的脚本的文件名必须有`.js`扩展。
HOST | :white\_check\_mark: | :x: | 默认情况下，开发web服务器绑定到`localhost`。您可以使用这个变量来指定一个不同的主机。
PORT | :white\_check\_mark: | :x: | 默认情况下，开发web服务器将尝试侦听端口3000或提示您尝试下一个可用的端口。您可以使用这个变量来指定一个不同的端口
HTTPS | :white\_check\_mark: | :x: | 当设置为`true`时，Create React App将在`https`模式下运行开发服务器。
PUBLIC\_URL | :x: | :white\_check\_mark: | Create React App假设您的应用程序位于服务web服务器的根目录或[`package.json` (`homepage`)][305]中指定的子路径。通常，Create React App忽略主机名。您可以使用该变量强制将资源按原样引用到您提供的url(包括主机名)。当使用CDN来托管您的应用程序时，这可能特别有用。
CI | :large\_orange\_diamond: | :white\_check\_mark: | 当设置为`true`时，Create React App将警告作为构建中的失败。它还使测试运行者不监视。大多数CIs默认设置此标志。
REACT\_EDITOR | :white\_check\_mark: | :x: | 当一个应用程序在开发中崩溃时，您将看到一个错误在可点击的堆栈跟踪上叠加。当你点击它时，Create React App会尝试根据当前正在运行的进程来确定你正在使用的编辑器，并打开相关的源文件。您可以[发送一个pull请求来检测您选择编辑器][306]。设置这个环境变量会覆盖自动检测。如果您这样做，请确保您的系统[PATH][307]环境变量指向您的编辑器的bin文件夹。
CHOKIDAR\_USEPOLLING | :white\_check\_mark: | :x: | 当设置为`true`时，观察者在VM中以轮询模式中运行是必要的。如果`npm start`没有检测到变化，那么就使用这个选项。
GENERATE\_SOURCEMAP | :x: | :white\_check\_mark: | 当设置为`false`时，source maps不是为生产构建生成的。这就解决了一些小型机器上的OOM问题。

## Troubleshooting
故障排除
### `npm start` doesn’t detect changes
`npm start`没有检测到变化

当您在`npm start`运行时保存文件，浏览器应该使用更新后的代码进行刷新<br>
如果没有如愿发生，尝试以下方法之一:

* 如果你的项目在Dropbox的云文件夹，尝试移动它。
* 如果观察者没有看到一个名为`index.js`的文件，并且你用文件夹的名字来引用它，你[需要重新启动观察者][308]，因为一个Webpack bug。
* 一些像Vim和IntelliJ这样的编辑器有一个“安全的写”功能，它现在可以打破观察者。您需要禁用它。按照下面的说明来[“调整你的文本编辑器”][309]。
* 如果您的项目路径包含括号，尝试将项目移到没有它们的路径中。 这是由于一个[Webpack watcher bug][310].
* 在 Linux 和 macOS上, 你可能需要 [调整系统设置][311]来允许更多的观察者。
* 如果项目在虚拟机中运行，比如(a Vagrant provisioned)VirtualBox，就在你的项目目录创建一个 `.env`文件，如果它不存在的话，并添加`CHOKIDAR_USEPOLLING=true`到它里面。这确保下次运行`npm start`时，观察者在VM中使用轮询模式。

如果这些解决方案中没有一个能帮助请[在这个帖子中][312]留言。

### `npm test` hangs on macOS Sierra
`npm test`挂在macOS Sierra上

If you run `npm test` and the console gets stuck after printing `react-scripts test --env=jsdom` to the console there might be a problem with your [Watchman][313] installation as described in [facebookincubator/create-react-app#713][314].如果你运行`npm test`，控制台在打印`react-scripts test --env=jsdom`到控制台后会卡住，这可能是你的[Watchman][313]安装有问题，就像[facebookincubator/create-react-app#713][314]描述。

我们建议在您的项目中删除`node_modules`，并先运行`npm install`(或者`yarn`)。如果没有帮助，您可以尝试在这些问题中提到的众多解决方案中找到一个:

* [facebook/jest#1767][315]
* [facebook/watchman#358][316]
* [ember-cli/ember-cli#6259][317]

据报道，安装Watchman4.7.0或更新补丁将解决这个问题。如果你使用[Homebrew][318]，你可以运行这些命令来更新它:

```
watchman shutdown-server
brew update
brew reinstall watchman
```

你可以在 Watchman 文档页面找到[其他的安装方法][319].

如果这仍然没有帮助, 尝试运行 `launchctl unload -F ~/Library/LaunchAgents/com.github.facebook.watchman.plist`.

还有报道称，卸载Watchman就解决了这个问题。所以如果没有其他的帮助，把它从你的系统中移除，再试一次。

### `npm run build` exits too early
`npm run build`过早退出

据报道，`npm run build`在内存有限的机器上可能会失败，并且没有交换空间，这在云环境中是很常见的。即使是小的项目，这个命令也可以使系统中的RAM使用率增加几百兆字节，所以如果您的可用内存不足1 GB，那么您的构建很可能会失败，伴随以下消息中:

>  构建失败是因为流程过早退出。这可能意味着系统内存耗尽或者某个在进程中被称为`kill -9`.

如果您完全确定您没有终止进程，那么考虑在您正在构建的机器上[增加一些交换空间][320]，或者在本地构建项目。

### `npm run build` fails on Heroku
`npm run build`在Heroku上发生错误

这可能是带有大小写敏感文件名的问题。
请参考[这个小节][321].

### Moment.js locales are missing
Moment.js locales丢失

如果你使用 [Moment.js][322], 您可能会注意到，默认情况下只有英语语言环境可用。这是因为地区文件很大，您可能只需要[Moment.js提供的所有地区][323]的一个子集。

添加一个具体的Moment.js地区到你的包，你需要显示地导入它.<br>
例如:

```js
import moment from 'moment';
import 'moment/locale/fr';
```

如果以这种方式导入多个地区，您可以通过使用地区名称调用`moment.locale()`来在它们之间进行切换:

```js
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/es';

// ...

moment.locale('fr');
```

这只适用于以前明确导入的地区。

### `npm run build` fails to minify
`npm run build` 压缩失败

您可能偶尔会发现您所依赖的包需要编译或为非浏览器环境提供代码。<br>
这在生态系统中被认为是很糟糕的做法，在Create React App中并没有一个escape hatch(逃生出口)
<br>
To resolve this:
1. 打开一个关于依赖关系的问题跟踪器的问题，并要求该包发布预编译(保留ES6模块).
2. Fork 这个包并且发布一个更正的版本.
3. 如果依赖项足够小，可以将其复制到`src/`文件夹中，并将其作为应用程序代码进行处理.

## Something Missing?
遗漏？

如果你有更多关于“How To”的而这个页面没有的出现的想法, [让我知道][324] 或者 [贡献你的力量!][325]

[1]:	https://github.com/facebookincubator/create-react-app
[2]:	https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
[3]:	#updating-to-new-releases
[4]:	#sending-feedback
[5]:	#folder-structure
[6]:	#available-scripts
[7]:	#npm-start
[8]:	#npm-test
[9]:	#npm-run-build
[10]:	#npm-run-eject
[11]:	#supported-language-features-and-polyfills
[12]:	#syntax-highlighting-in-the-editor
[13]:	#displaying-lint-output-in-the-editor
[14]:	#debugging-in-the-editor
[15]:	#formatting-code-automatically
[16]:	#changing-the-page-title
[17]:	#installing-a-dependency
[18]:	#importing-a-component
[19]:	#code-splitting
[20]:	#adding-a-stylesheet
[21]:	#post-processing-css
[22]:	#adding-a-css-preprocessor-sass-less-etc
[23]:	#adding-images-fonts-and-files
[24]:	#using-the-public-folder
[25]:	#changing-the-html
[26]:	#adding-assets-outside-of-the-module-system
[27]:	#when-to-use-the-public-folder
[28]:	#using-global-variables
[29]:	#adding-bootstrap
[30]:	#using-a-custom-theme
[31]:	#adding-flow
[32]:	#adding-custom-environment-variables
[33]:	#referencing-environment-variables-in-the-html
[34]:	#adding-temporary-environment-variables-in-your-shell
[35]:	#adding-development-environment-variables-in-env
[36]:	#can-i-use-decorators
[37]:	#integrating-with-an-api-backend
[38]:	#node
[39]:	#ruby-on-rails
[40]:	#proxying-api-requests-in-development
[41]:	#invalid-host-header-errors-after-configuring-proxy
[42]:	#configuring-the-proxy-manually
[43]:	#configuring-a-websocket-proxy
[44]:	#using-https-in-development
[45]:	#generating-dynamic-meta-tags-on-the-server
[46]:	#pre-rendering-into-static-html-files
[47]:	#injecting-data-from-the-server-into-the-page
[48]:	#running-tests
[49]:	#filename-conventions
[50]:	#command-line-interface
[51]:	#version-control-integration
[52]:	#writing-tests
[53]:	#testing-components
[54]:	#using-third-party-assertion-libraries
[55]:	#initializing-test-environment
[56]:	#focusing-and-excluding-tests
[57]:	#coverage-reporting
[58]:	#continuous-integration
[59]:	#disabling-jsdom
[60]:	#snapshot-testing
[61]:	#editor-integration
[62]:	#developing-components-in-isolation
[63]:	#getting-started-with-storybook
[64]:	#getting-started-with-styleguidist
[65]:	#making-a-progressive-web-app
[66]:	#opting-out-of-caching
[67]:	#offline-first-considerations
[68]:	#progressive-web-app-metadata
[69]:	#analyzing-the-bundle-size
[70]:	#deployment
[71]:	#static-server
[72]:	#other-solutions
[73]:	#serving-apps-with-client-side-routing
[74]:	#building-for-relative-paths
[75]:	#azure
[76]:	#firebase
[77]:	#github-pages
[78]:	#heroku
[79]:	#netlify
[80]:	#now
[81]:	#s3-and-cloudfront
[82]:	#surge
[83]:	#advanced-configuration
[84]:	#troubleshooting
[85]:	#npm-start-doesnt-detect-changes
[86]:	#npm-test-hangs-on-macos-sierra
[87]:	#npm-run-build-exits-too-early
[88]:	#npm-run-build-fails-on-heroku
[89]:	#npm-run-build-fails-to-minify
[90]:	#momentjs-locales-are-missing
[91]:	#something-missing
[92]:	https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md
[93]:	https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md
[94]:	https://github.com/facebookincubator/create-react-app/issues
[95]:	http://localhost:3000
[96]:	#running-tests
[97]:	#deployment
[98]:	https://github.com/lukehoban/es6features
[99]:	https://github.com/rwaldron/exponentiation-operator
[100]:	https://github.com/tc39/ecmascript-asyncawait
[101]:	https://github.com/sebmarkbage/ecmascript-rest-spread
[102]:	https://github.com/tc39/proposal-dynamic-import
[103]:	https://github.com/tc39/proposal-class-public-fields
[104]:	https://facebook.github.io/react/docs/introducing-jsx.html
[105]:	https://flowtype.org/
[106]:	https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
[107]:	https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb
[108]:	https://en.wikipedia.org/wiki/Polyfill
[109]:	https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
[110]:	https://github.com/sindresorhus/object-assign
[111]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[112]:	https://github.com/then/promise
[113]:	https://developer.mozilla.org/en/docs/Web/API/Fetch_API
[114]:	https://github.com/github/fetch
[115]:	https://babeljs.io/docs/editors
[116]:	https://github.com/jlongster/prettier
[117]:	https://code.visualstudio.com
[118]:	https://www.jetbrains.com/webstorm/
[119]:	https://code.visualstudio.com
[120]:	https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome
[121]:	#advanced-configuration
[122]:	https://www.jetbrains.com/webstorm/
[123]:	https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji
[124]:	#advanced-configuration
[125]:	https://github.com/prettier/prettier
[126]:	https://prettier.github.io/prettier/
[127]:	https://medium.com/@okonetchnikov/make-linting-great-again-f3890e1ad6b8
[128]:	https://github.com/prettier/prettier#editor-integration
[129]:	https://github.com/prettier/prettier#editor-integration
[130]:	#adding-a-stylesheet
[131]:	https://developer.mozilla.org/en-US/docs/Web/API/Document/title
[132]:	https://github.com/nfl/react-helmet
[133]:	#generating-dynamic-meta-tags-on-the-server
[134]:	#pre-rendering-into-static-html-files
[135]:	http://exploringjs.com/es6/ch_modules.html
[136]:	http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281
[137]:	http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281
[138]:	http://exploringjs.com/es6/ch_modules.html
[139]:	https://leanpub.com/understandinges6/read#leanpub-auto-encapsulating-code-with-modules
[140]:	http://2ality.com/2017/01/import-operator.html#loading-code-on-demand
[141]:	https://github.com/tc39/proposal-dynamic-import
[142]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[143]:	http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
[144]:	https://github.com/AnomalyInnovations/serverless-stack-demo-client/tree/code-splitting-in-create-react-app
[145]:	https://webpack.js.org/
[146]:	https://medium.com/seek-ui-engineering/block-element-modifying-your-javascript-components-d7f99fcab52b
[147]:	https://github.com/postcss/autoprefixer
[148]:	https://github.com/postcss/autoprefixer#disabling
[149]:	https://facebook.github.io/react/docs/composition-vs-inheritance.html
[150]:	https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
[151]:	#changing-the-page-title
[152]:	#adding-a-stylesheet
[153]:	#adding-images-fonts-and-files
[154]:	#adding-a-stylesheet
[155]:	#adding-images-fonts-and-files
[156]:	https://developer.mozilla.org/en-US/docs/Web/Manifest
[157]:	http://github.hubspot.com/pace/docs/welcome/
[158]:	https://react-bootstrap.github.io
[159]:	https://gist.githubusercontent.com/gaearon/85d8c067f6af1e56277c82d19fd4da7b/raw/6158dd991b67284e9fc8d70b9d973efe87659d72/App.js
[160]:	https://medium.com/@tacomanator/customizing-create-react-app-aa9ffb88165
[161]:	https://medium.com/@preethikasireddy/why-use-static-types-in-javascript-part-1-8382da1e0adb
[162]:	http://flowtype.org/
[163]:	https://flowtype.org/docs/advanced-configuration.html
[164]:	https://nuclide.io/docs/languages/flow/
[165]:	https://flowtype.org/
[166]:	#injecting-data-from-the-server-into-the-page
[167]:	https://github.com/facebookincubator/create-react-app/issues/865#issuecomment-252199527
[168]:	#generating-dynamic-meta-tags-on-the-server
[169]:	https://github.com/motdotla/dotenv
[170]:	https://docs.travis-ci.com/user/environment-variables/
[171]:	https://devcenter.heroku.com/articles/config-vars
[172]:	https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
[173]:	https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
[174]:	https://github.com/fullstackreact/food-lookup-demo
[175]:	https://www.fullstackreact.com/articles/how-to-get-create-react-app-to-work-with-your-rails-api/
[176]:	https://github.com/fullstackreact/food-lookup-demo-rails
[177]:	http://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations
[178]:	#configuring-the-proxy-manually
[179]:	http://enable-cors.org/server_expressjs.html
[180]:	#adding-custom-environment-variables
[181]:	https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
[182]:	https://github.com/webpack/webpack-dev-server/issues/887
[183]:	https://github.com/facebookincubator/create-react-app/issues/2271
[184]:	https://github.com/chimurai/http-proxy-middleware#options
[185]:	https://github.com/nodejitsu/node-http-proxy#options
[186]:	https://socket.io/
[187]:	http://websocket.org/echo.html
[188]:	https://socket.io/docs/
[189]:	https://github.com/websockets/ws
[190]:	https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
[191]:	#proxying-api-requests-in-development
[192]:	https://www.npmjs.com/package/react-snapshot
[193]:	https://medium.com/superhighfives/an-almost-static-stack-6df0a2791319
[194]:	https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0
[195]:	https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md#migrating-from-023-to-030
[196]:	https://facebook.github.io/jest/
[197]:	https://facebook.github.io/jest/blog/2016/09/01/jest-15.html
[198]:	https://github.com/tmpvar/jsdom
[199]:	#continuous-integration
[200]:	http://facebook.github.io/jest/docs/expect.html
[201]:	http://facebook.github.io/jest/docs/expect.html#tohavebeencalled
[202]:	http://airbnb.io/enzyme/docs/api/shallow.html
[203]:	http://airbnb.io/enzyme/
[204]:	http://airbnb.io/enzyme/docs/api/mount.html
[205]:	http://airbnb.io/enzyme/
[206]:	http://facebook.github.io/jest/docs/expect.html
[207]:	http://chaijs.com/
[208]:	https://github.com/blainekasten/enzyme-matchers
[209]:	#initializing-test-environment
[210]:	https://github.com/facebook/jest/issues/new
[211]:	https://github.com/facebook/jest/pull/1566
[212]:	http://chaijs.com/
[213]:	http://sinonjs.org/
[214]:	https://docs.travis-ci.com/user/getting-started/
[215]:	https://travis-ci.org/profile
[216]:	https://docs.travis-ci.com/user/customizing-the-build/
[217]:	https://medium.com/@knowbody/circleci-and-zeits-now-sh-c9b7eebcd3c1
[218]:	https://github.com/facebookincubator/create-react-app/issues/new
[219]:	https://github.com/tmpvar/jsdom
[220]:	https://facebook.github.io/react/docs/top-level-api.html#reactdom.render
[221]:	https://facebook.github.io/react/docs/test-utils.html#renderintodocument
[222]:	https://github.com/facebook/react/blob/34761cf9a252964abfaab6faf74d473ad95d1f21/src/test/ReactTestUtils.js#L83-L91
[223]:	http://airbnb.io/enzyme/docs/api/mount.html
[224]:	http://airbnb.io/enzyme/index.html
[225]:	https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
[226]:	http://airbnb.io/enzyme/docs/api/shallow.html
[227]:	http://airbnb.io/enzyme/index.html
[228]:	http://facebook.github.io/jest/blog/2016/07/27/jest-14.html
[229]:	http://facebook.github.io/jest/blog/2016/07/27/jest-14.html
[230]:	https://code.visualstudio.com
[231]:	https://github.com/orta/vscode-jest
[232]:	https://storybook.js.org
[233]:	https://github.com/storybooks/storybook
[234]:	https://react-styleguidist.js.org/
[235]:	https://github.com/styleguidist/react-styleguidist
[236]:	https://egghead.io/lessons/react-getting-started-with-react-storybook
[237]:	https://github.com/storybooks/storybook
[238]:	https://storybook.js.org/basics/introduction/
[239]:	https://github.com/storybooks/storybook/tree/master/addons/storyshots
[240]:	https://github.com/styleguidist/react-styleguidist
[241]:	https://react-styleguidist.js.org/docs/getting-started.html
[242]:	https://developers.google.com/web/progressive-web-apps/
[243]:	https://github.com/goldhand/sw-precache-webpack-plugin
[244]:	https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network
[245]:	src/index.js
[246]:	src/index.js
[247]:	https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#you_need_https
[248]:	http://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http/34161385#34161385
[249]:	https://jakearchibald.github.io/isserviceworkerready/
[250]:	src/registerServiceWorker.js
[251]:	#deployment
[252]:	#deployment
[253]:	http://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours
[254]:	#github-pages
[255]:	https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux#inform_the_user_when_the_app_is_ready_for_offline_consumption
[256]:	src/registerServiceWorker.js
[257]:	#integrating-with-an-api-backend
[258]:	#npm-run-eject
[259]:	https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject
[260]:	../config/webpack.config.prod.js
[261]:	public/manifest.json
[262]:	public/manifest.json
[263]:	https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
[264]:	https://www.npmjs.com/package/source-map-explorer
[265]:	https://nodejs.org/
[266]:	https://github.com/zeit/serve
[267]:	https://github.com/zeit/serve
[268]:	https://nodejs.org/
[269]:	http://expressjs.com/
[270]:	https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries
[271]:	https://github.com/ReactTraining/react-router
[272]:	https://httpd.apache.org/
[273]:	http://tomcat.apache.org/
[274]:	https://stackoverflow.com/a/41249464/4878474
[275]:	https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[276]:	#npm-run-eject
[277]:	https://github.com/GoogleChrome/sw-precache#navigatefallback-string
[278]:	https://github.com/GoogleChrome/sw-precache#navigatefallbackwhitelist-arrayregexp
[279]:	../config/webpack.config.prod.js
[280]:	https://reacttraining.com/react-router/web/api/BrowserRouter/basename-string
[281]:	https://azure.microsoft.com/
[282]:	https://medium.com/@to_pe/deploying-create-react-app-on-microsoft-azure-c0f6686a4321
[283]:	https://firebase.google.com/
[284]:	https://console.firebase.google.com/
[285]:	https://firebase.google.com/docs/web/setup
[286]:	https://pages.github.com/
[287]:	https://myusername.github.io/my-app
[288]:	https://reacttraining.com/react-router/web/api/Router
[289]:	https://github.com/rafrex/spa-github-pages
[290]:	https://www.heroku.com/
[291]:	https://github.com/mars/create-react-app-buildpack
[292]:	https://blog.heroku.com/deploying-react-with-zero-configuration
[293]:	https://www.netlify.com/
[294]:	https://app.netlify.com/signup
[295]:	https://zeit.co/now
[296]:	https://zeit.co/download
[297]:	https://zeit.co/blog/unlimited-static
[298]:	https://aws.amazon.com/s3
[299]:	https://aws.amazon.com/cloudfront/
[300]:	https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af
[301]:	https://surge.sh/
[302]:	https://surge.sh/help/adding-a-200-page-for-client-side-routing
[303]:	#adding-development-environment-variables-in-env
[304]:	https://github.com/sindresorhus/opn#app
[305]:	#building-for-relative-paths
[306]:	https://github.com/facebookincubator/create-react-app/issues/2636
[307]:	https://en.wikipedia.org/wiki/PATH_(variable)
[308]:	https://github.com/facebookincubator/create-react-app/issues/1164
[309]:	https://webpack.js.org/guides/development/#adjusting-your-text-editor
[310]:	https://github.com/webpack/watchpack/issues/42
[311]:	https://webpack.github.io/docs/troubleshooting.html#not-enough-watchers
[312]:	https://github.com/facebookincubator/create-react-app/issues/659
[313]:	https://facebook.github.io/watchman/
[314]:	https://github.com/facebookincubator/create-react-app/issues/713
[315]:	https://github.com/facebook/jest/issues/1767
[316]:	https://github.com/facebook/watchman/issues/358
[317]:	https://github.com/ember-cli/ember-cli/issues/6259
[318]:	http://brew.sh/
[319]:	https://facebook.github.io/watchman/docs/install.html#build-install
[320]:	https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04
[321]:	#resolving-heroku-deployment-errors
[322]:	https://momentjs.com/
[323]:	https://momentjs.com/#multiple-locale-support
[324]:	https://github.com/facebookincubator/create-react-app/issues
[325]:	https://github.com/facebookincubator/create-react-app/edit/master/packages/react-scripts/template/README.md

[image-1]:	http://facebook.github.io/jest/img/blog/15-watch.gif
[image-2]:	http://i.imgur.com/5bFhnTS.png
[image-3]:	https://cloud.githubusercontent.com/assets/49038/20795349/a032308a-b7c8-11e6-9b34-7eeac781003f.png
[image-4]:	http://i.imgur.com/7CIAWpB.gif