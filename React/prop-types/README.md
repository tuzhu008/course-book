# prop-types

适用于 React props 和 类似对象的运行时类型检查

您可以使用prop-types来记录所传递给组件的属性的预期类型。React(可能还有其他库——查看checkPropTypes()
参考下面的参考资料)将检查传递给您的组件的props的
定义，如果不匹配，则在开发中发出警告。

## 安装

```shell
npm install --save prop-types
```

## 导入

```js
import PropTypes from 'prop-types'; // ES6
var PropTypes = require('prop-types'); // ES5 with npm
```

### CDN

如果您喜欢将`prop-types`在您的应用程序中排除并通过`window.PropTypes`全局使用它在，`prop-types`包提供单文件发行版，它托管在以下的CDNs:

* [**unpkg**](https://unpkg.com/prop-types/)
```html
<!-- 开发版本 -->
<script src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>

<!-- 生产版本 -->
<script src="https://unpkg.com/prop-types@15.6/prop-types.min.js"></script>
```

* [**cdnjs**](https://cdnjs.com/libraries/prop-types)
```html
<!-- 开发版本 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.0/prop-types.js"></script>

<!-- 生产版本 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.0/prop-types.min.js"></script>
```

使用版本号来加载特定版本的`prop-types`替换`15.6.0`。

## 使用方法

PropTypes最初是作为React核心模块的一部分公开的，并且通常用于React组件。下面是一个使用PropTypes和React组件的例子，它还提供了不同的验证器:

```js
import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // ... do things with the props
  }
}

MyComponent.propTypes = {
  // 你可以声明一个prop是一个特定的JS原始类型
  // 默认情况下，他们都是可选的
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何东西都可以被渲染: numbers, strings, elements 或者 一个包含这些类型的array（或者是fragment[片段]）
  optionalNode: PropTypes.node,

  //一个React元素.
  optionalElement: PropTypes.element,

  // 你还可以声明一个prop是一个类的实例。这使用的是JS的 instanceof 操作符
  optionalMessage: PropTypes.instanceOf(Message),

  // 您可以通过将其视为enum来确保您的prop仅限于特定的值。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个可以是多种类型的对象
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 一种特定类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 具有特定类型属性值的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 一个特定形式的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 您可以使用 isRequired 将上述任何一种链接在一起，以确保在不提供该prop的情况下发出警告。
  requiredFunc: PropTypes.func.isRequired,

  // 任何数据类型的值
  requiredAny: PropTypes.any.isRequired,

  //您还可以指定一个自定义的验证器。如果验证失败，它应该返回一个错误对象。不要`console.warn`，抛出，因为这在`oneOfType`中是行不通的。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 您还可以向`arrayOf`和`objectOf`提供一个自定义的验证器。
  // 如果验证失败，它应该返回一个错误对象。 验证器将调用数组或对象中的每个键。
  // 验证器的前两个参数是数组或对象本身，以及当前项的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

参考[React 文档](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) 获得更多信息。

## 从React.PropTypes迁移

看看 [从React.PropTypes迁移](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes) 获得更多关于如何从`React.PropTypes`迁移到`prop-types`的细节。

注意： 这篇博客文章 **提到一个可以自动执行转换的codemod脚本**.

下面还有重要的注释。

## 如何依赖这个包?

对于应用程序，我们建议将其与版本一起放在`package.json`的`dependencies`中

例如:

```js
  "dependencies": {
    "prop-types": "^15.5.7" 
  }
```

对于库, 我们也建议将其放在`dependencies`中:

```js
  "dependencies": {
    "prop-types": "^15.5.7" 
  },
  "peerDependencies": {
    "react": "^15.5.0" 
  }
```

**注意:** 在15.5.7之前版本中有一些已知的问题，所以我们推荐使用它作为最低版本。

确保版本范围使用了caret(`^`)，因此可以广泛地使用npm来有效地复制包。

对于您的组件的UMD捆绑包，请确保在构建中**不**包含`PropTypes`。通常这是通过把它标记为一个外部的(具体情况取决于你的打包器)，就像你的React一样。

## 兼容性

### React 0.14

这个包与**React 0.14.9**是兼容的。与0.14.8(一年前发布的)相比，0.14.9没有其他的变化，所以应该是一个无痛的升级。

```shell
# 注意: 只有在你仍然使用React 0.14的时候才运行这个！
npm install --save react@^0.14.9 react-dom@^0.14.9
```

### React 15+

这个包与**React 15.3.0**和更高版本兼容。

```
npm install --save react@^15.3.0 react-dom@^15.3.0
```

### 在其他React版本上会发生什么?

即使开发人员没有做错任何事情，它也会输出警告信息。不幸的是，除了更新React到15.3.0或更高版本之外，没有任何解决方案，如果使用的是React0.14，则是0.14.9。

## 区别`React.PropTypes`: 不调用验证器函数

首先，**which version of React are you using**?您可能会看到这个消息，因为组件库已经更新了使用`prop-types`包，但是您的React版本与它是不兼容的。有关更多细节，请参见[上面的部分](#兼容性)(兼容性)。

你使用的是0.14.9还是比React15.3.0更高的版本?继续读下去。

当您将组件迁移到使用独立的`prop-types`时，**如果您直接调用它们，所有验证器函数都将开始抛出一个错误**。这确保没有人在生产代码中依赖于它们，并且可以安全地将它们的实现去掉以优化包的大小。


这样的代码仍然很好:

```js
MyComponent.propTypes = {
  myProp: PropTypes.bool
};
```

但是，像这样的代码不能与`prop-types`包一起工作:

```js
// Will not work with `prop-types` package!
var errorOrNull = PropTypes.bool(42, 'myProp', 'MyComponent', 'prop');
```

它会抛出一个错误：

```
直接调用PropTypes验证器不受`prop-types`包的支持。
使用PropTypes.checkPropTypes()来调用它们。
```

(如果您看到这个消息的**警告**而不是错误，请检查[上面的关于兼容性的部分](#compatibility))

这是一种新的行为，当你从`React.PropTypes`迁移到`prop-types`时，你只会遇到它。对于绝大多数的组件,这并不重要,如果你没有在你的组件看到[警告](https://facebook.github.io/react/warnings/dont-call-proptypes.html),您的代码是安全的迁移。这并不是React中一个突发的变化，因为您只是通过显式地将导入更改为使用`prop-types`来选择组件的更改。如果你暂时需要旧的行为，你可以继续使用`React.PropTypes`直到React 16。

**如果你需要手动触发验证**, 调用 `PropTypes.checkPropTypes()`。与验证器本身不同，这个函数在生产中是安全的，因为它将被一个空函数所替代:

```js
// Works with standalone PropTypes
PropTypes.checkPropTypes(MyComponent.propTypes, props, 'prop', 'MyComponent');
```
更多信息请参见下面。

**你可能也会看到这个错误** ，如果您从您自己的自定义`PropTypes`验证器中调用一个`PropTypes`s验证器。在本例中，修复(fix)的目的是确保将所有参数传递给内部函数。[在这个页面](https://facebook.github.io/react/warnings/dont-call-proptypes.html#fixing-the-false-positive-in-third-party-proptypes)有一个更深入的解释如何修理它的例子。或者，你可以暂时保持使用`React.PropTypes`直到React16，它才会发出警告，在这种情况下，它仍然会发出警告。

如果使用像Browserify或Webpack的打包器,别忘了[按以下指示](https://facebook.github.io/react/docs/installation.html#development-and-production-versions)来在开发或生产模式中正确打包应用程序。否则，您将向您的用户发送不必要的代码。

## PropTypes.checkPropTypes

React将自动检查您在组件上设置的propTypes，但是如果你使用了没有React的PropTypes，然后你可能想要手动调用`PropTypes.checkPropTypes`,像这样:

```js
const myPropTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  // ... 定义你的prop验证器
};

const props = {
  name: 'hello', // 有效
  age: 'world', // 无效
};

// 比方说，你的组件被称为MyComponent

// 适用于独立PropTypes
PropTypes.checkPropTypes(myPropTypes, props, 'prop', 'MyComponent');
// 这将会发出如下警告:
// Warning: Failed prop type: Invalid prop `age` of type `string` supplied to `MyComponent`, expected `number`.
```
