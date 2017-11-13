# Vue Input Mask

## 开始

首先安装它

```bash
npm i vue-text-mask --save
```

如下使用：

```html
<template>
  <div>
    <label>Phone Number</label>
    <masked-input
      type="text"
      name="phone"
      class="form-control"
      v-model="phone"
      :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
      :guide="false"
      placeholderChar="#">
    </masked-input>
  </div>
</template>

<script>
  import MaskedInput from 'vue-text-mask'

  export default {
    name: 'name',

    components: {
      MaskedInput
    },

    data () {
      return {
        phone: ''
      }
    }
  }
</script>
```

您也可以在全局范围内定义组件:

```js
import Vue from 'vue'
import MaskedInput from 'vue-text-mask'

Vue.component('masked-input', MaskedInput);
```

`<masked-input>`本质上是一个被包裹的`<input>`元素-因此它支持所有的常规输入属性(type, placeholder, class,等等)。它是兼容v-model 2-way双向绑定,对任何[text mask props](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme)的改变都是被动的。

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
