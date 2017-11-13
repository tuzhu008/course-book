# Right-to-left


要更改 Material-UI组件的方向，您必须遵循以下步骤:
## 步骤

### 1. HTML

确保`dir="rtl"`被设置在**body**上，否则本地组件和门户网站将会中断。

### 2. Theme

设置`direction: 'rtl'` 在你的自定义主体上

### 3. jss-rtl

我们依赖于JSS插件来翻转样式: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

在内部，当`direction: 'rtl'`设置在主题上时，我们可以动态地启用这个插件。

 [CSS-in-JS 文档](/customization/css-in-js#opting-out-of-rtl-transformation) 解释一下这个插件是如何工作的。 阅读[plugin README](https://github.com/alitaheri/jss-rtl) 来了解它时如何工作的。

一旦您用这个插件创建了一个新的JSS实例，您就需要让它对组件树中的所有组件都可用。我们有一个 [`<JssProvider />`](https://github.com/cssinjs/react-jss) 组件来做这个:

```jsx
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

// Configure JSS
const jss = create({ plugins: [...preset().plugins, rtl()] });
jss.options.createGenerateClassName = createGenerateClassName;

function RTL(props) {
  return (
    <JssProvider jss={jss}>
      {props.children}
    </JssProvider>
  );
}
```

## Demo

*使用左上角的方向切换按钮来翻转整个文档*

{{demo='pages/guides/Direction.js'}}
