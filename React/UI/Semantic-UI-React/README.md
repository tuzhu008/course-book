![Semantic](http://semantic-ui.com/images/logo.png)

# **Semantic UI React**

# 【介绍】
Semantic UI React是官方对[Semantic UI](https://semantic-ui.com/)进行的React集成。

- 释放jQuery
- 声明式API
- Augmentation 
- Shorthand Props 速记的属性
- Sub Components 子组件
- Auto Controlled State 自动控制状态

安装介绍请移步[使用方法](#【使用方法】)
## **释放jQuery**

jQuery是一个DOM操作库。它向DOM读取和写入。React使用虚拟DOM(真实DOM的JavaScript表示)。React只对写补丁来更新DOM，但不会从它读取。

将实际的DOM操作与React的虚拟DOM保持同步是不可行的。因此，所有jQuery函数化的东西都在React中被重新实现。

## **声明式API**

声明式api提供了健壮的特性和属性验证。
```html
<Rating rating={1} maxRating={5} />
```
被渲染为：
```html
<div
  class="ui rating"
  data-rating="1"
  data-max-rating="5"
>
</div>
```

```html
<Button size='small' color='green'>
  <Icon name='download' />
  Download
</Button>
```
被渲染为：
```html
<button class="ui small green button">
  <i class="download icon"></i>
  Download
</button>

```

## **Augmentation**

控制渲染的HTML标记，或将一个组件渲染为另一个组件。额外的属性被传递给你正在渲染的组件。

Augmentation是强大的。您可以在不添加额外的嵌套组件的情况下组合组件特性和属性。这对于使用`MenuLinks`和`react-router`是很重要的。

```html
<Header as='h3'>
  Learn More
</Header>
```
渲染为：
```html
<h3 class="ui header">
  Learn More
</h3>
```
```js
import { Link } from 'react-router-dom'

<Menu>
  <Menu.Item as={Link} to='/home'>
    Home
  </Menu.Item>
</Menu>
```

被渲染为：
```html
div class="ui menu">
  <a class="item" href="/home">
    Home
  </a>
</div>
```
## **Shorthand Props**

Shorthand props为您生成标记，使许多用例成为轻而易举的事。所有的对象属性都在子组件上传播。

### **子对象数组**

带有重复子元素的组件接受普通对象的数组。Facebook喜欢使用context来处理父-子耦合问题，我们也是如此。


```js
const panels = [{
  title: 'What is a dog?',
  content: '...',
  }, {
  title: 'What kinds are there?',
  content: '...',
}]
<Accordion panels={panels} />

```
渲染为：

```html
<div class="ui accordion">
  <div class="title">
    <i class="dropdown icon"></i></i>
    What is a dog?
  </div>
  <div class="content">
    <p></p...>...</p>
  </div>
  <div class="title">
    <i class="dropdown icon"></i></i>
    What kinds are there?
  </div>
  <div class="content">
    <p></p...>...</p>
  </div>
</div>
```
### **icon={...}**

`icon` 属性是许多组件的标配。它接受一个Icon名称、一个Icon对象或者是`<Icon/>`实例

```html
<Message
  success
  icon='thumbs up'
  header='Nice job!'
  content='Your profile is complete.'
/>
```
渲染为：
```html

<div class="ui success message">
  <i class="thumbs up icon"></i>
  <div class="content">
    <div class="header">
      Nice job!
    </div>
    Your profile is complete.
  </div>
</div>
```
### **image={...}**

`image`属性是许多组件的标配。它可以接受一个image `src`，一个image props对象，或者一个`<Image />`实例。

```JS

<Label image='veronika.jpg' />
Rendered HTML
```
渲染为：

```html
<div class="ui image label">
  <img src="veronika.jpg">
</div>
```
## **子组件**

子组件可以让您完全访问标记。这对于定制组件的灵活性非常重要。

```html
<Message icon>
  <Icon name='circle notched' loading />
  <Message.Content>
    <Message.Header>
      Just one second
    </Message.Header>
    We're fetching that content for you.
  </Message.Content>
</Message>
```
渲染 HTML
```html
<div class="ui icon message">
  <i class="loading circle notched icon"></i>
  <div class="content">
    <div class="header">
      Just one second
    </div>
    We're fetching that content for you.
  </div>
</div>
```

## **自动控制State**

React[有受控和不受控](http://www.css88.com/react/docs/forms.html#controlled-components)的组件的概念。


我们的有状态组件自我管理它们的状态，而不需要连接。下拉菜单打开，没有连接`onClick`到`open`属性。该值也在内部存储，不需要将`onChange`连接到`value`。

如果您添加了一个`value`属性或一个`open`属性，下拉委托控制一个属性到你的值。其他的属性仍然是自动控制的。混合和匹配任意数量的受控和不受控制的属性。添加或移除属性来在任何时间添加或移除控制。一切都只是工作。

看看我们的[AutoControlledComponent](https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/lib/AutoControlledComponent.js)，看看这是怎么做的。查看文档试着把它试一试。

<hr>

# 【使用方法】

## **javascript**

可以通过NPM来安装Semantic UI React包
```bash
$ yarn add semantic-ui-react
$ npm install semantic-ui-react --save
```

安装Semantic UI React来为你的组件提供JavaScript。你也需要包含一个样式表来为你的组件提供样式。这是组件框架的典型模式，例如Semantic UI或Bootstrap。

您选择在项目中包含样式表的方法将取决于您需要的定制级别。

### 示例

有关如何导入和使用Semantic UI React的示例，请单击任意示例旁边的代码图标。以下是一些直接链接:

- Button
- List
- Card
- Modal

## **CSS**

### **内容分发网络(CDN)**

可以通过在您的`index.html`文件中包含一个Semantic UI CSN连接，来使用默认的Semantic UI样式表。

这是开始使用Semantic UI React的最快方法。您将无法用该方法使用自定义主题。
```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
```
### **Semantic UI CSS 包**

Semantic UI CSS包与主Semantic UI库自动同步，提供了一个轻量级的CSS的Semantic UI版本。

可以使用NPM在您的项目中安装一个包。您将无法用该方法使用自定义主题。

```bash
$ npm install semantic-ui-css --save
```
安装完成后，你需要在你的`index.js`文件中引入这个压缩版的CSS。

```
import 'semantic-ui-css/semantic.min.css';
```
### **Semantic UI package**

安装完整版的Semantic UI包。

Semantic UI包括了Gulp的构建工具，这样您的项目就可以保留自己的主题更改，允许您自定义样式变量。

[这里](https://semantic-ui.com/usage/theming.html)提供了关于 Semantic UI中的主题的详细文档。
```bash
$ yarn add semantic-ui --dev
$ npm install semantic-ui --save-dev
```
在使用Gulp构建项目之后，您需要在`index.js`中包含缩小的CSS文件。
```js
import '../semantic/dist/semantic.min.css';
```
## **打包器**

Semantic UI React得到了所有现代JavaScript打包器的完整支持。我们它们中的一些做了一些例子。您可以将它们作为您的项目的起点。

#### Webpack 1

Webpack 1完整地支持Semantic UI React，但是我们不建议使用它，因为它是被**弃用**的。请确保您在发布前将您的应用程序在生产模式中进行构建，它将`propTypes`从您的构建中去掉。

由于Webpack 1不支持树握手（shaking），所以我们建议在您的构建中使用`babel-plugin-lodash`。您可以在Semantic UI React的`example`目录中找到示例配置。

[![](https://img.shields.io/badge/Github-Example%20configuration-brightgreen.svg)](https://github.com/Semantic-Org/Semantic-UI-React/tree/master/examples/webpack1)
[![](https://img.shields.io/badge/Github-babel--plugin--lodash-brightgreen.svg)](https://github.com/lodash/babel-plugin-lodash)

#### Webpack 2

Webpack 2完全支持Semantic UI React，它也支持树握手。请确保您在发布前将您的应用程序构建到生产模式中，它将从您的构建中去除`propTypes`。

>Webpack 2树握手并不能完全消除未使用的导出，有很多问题都是长期存在:
>
>[webpack/webpack#1750](https://github.com/webpack/webpack/issues/1750)<br>
[webpack/webpack#2867](https://github.com/webpack/webpack/issues/2867)<br>
[webpack/webpack#2899](https://github.com/webpack/webpack/issues/2899)<br>
[webpack/webpack#3092](https://github.com/webpack/webpack/issues/3092)<br>
>
>Semantic UI React imports不会被优化，所以我们建议在您的构建中使用`babel-plugin-lodash`。您可以在示例目录中找到示例配置。

[![](https://img.shields.io/badge/Github-Example%20configuration-brightgreen.svg)](https://github.com/Semantic-Org/Semantic-UI-React/tree/master/examples/webpack2)
[![](https://img.shields.io/badge/Github-babel--plugin--lodash-brightgreen.svg)](https://github.com/lodash/babel-plugin-lodash)

<hr>

## 详细教程
[访问官网](https://react.semantic-ui.com/introduction)