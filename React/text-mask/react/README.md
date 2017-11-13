# React Input Mask

## 起步

首先，安装它。

```bash
npm i react-text-mask --save
```

然后引入使用它.

```js
var React = require('react')
var MaskedInput = require('react-text-mask')

var MyComponent = React.createClass({
  render() {
    return (
      <div>
        <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
      </div>
    )
  }
})
```

`<MaskedInput/>`与`<input/>`元素的是完全兼容的。所以,你可以
传递给它的CSS clsss，placeholder属性，等等。

例如，以下是可以正常工作的:

```js
<MaskedTextInput
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  className="form-control"
  placeholder="Enter a phone number"
  guide={false}
  id="my-input-id"
/>
```

## 文档

想了解更多关于你可以传递给组件的`props`的信息
 查看 [这个文档](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme).
 [中文文档](../componentDocumentation.md)

## 示例

要查看运行代码的示例，请遵循以下步骤:

1. 克隆仓库, `git clone git@github.com:text-mask/text-mask.git`
1. `cd text-mask`
1. `npm install`
1. `npm run react:dev`
1. Open [http://localhost:3000](http://localhost:3000)

这个例子的代码是 [`react/example`](https://github.com/text-mask/text-mask/tree/master/react/example).

## 贡献

我们会喜欢一些贡献！看看[this document](https://github.com/text-mask/text-mask/blob/master/howToContribute.md#readme)
