# 使用方法

Material-UI 组件是独立工作的.
**他们是自支持的**, 它们将注入并只注入需要显示的样式。他们不依赖类似[normalize.css](https://github.com/necolas/normalize.css/)这样的任何全局的风格。
您可以使用我们的文档中所演示的任何组件。
请参阅每个组件的[演示页面](/demos/app-bar/)，以了解如何导入它们。

## 快速开始

下面时一个快速开始的案例, **这是你所需要的**:

```jsx
import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';

function App() {
  return (
    <Button raised color="primary">
      Hello World
    </Button>
  );
}

render(<App />, document.querySelector('#app'));
```

是的，这是你真正需要开始的，正如你在现场和互动演示中看到的那样:

{{demo='pages/getting-started/Usage.js'}}

## 下一步

现在您已经了解了基本设置。是时候表演真正的技术了：
- 如何提供 [Material Design 字体和 排版](/style/typography).
- 如何利用我们的 [主题化的解决方案](/customization/themes).
- 如何 [覆盖](customization/overrides) 我们的组件的外观和感觉。
