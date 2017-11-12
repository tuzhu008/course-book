# 服务端渲染

服务器端渲染最常见的用例是，当用户(或搜索引擎爬虫)首先请求我们的应用时，处理*初始渲染*。
当服务器接收到请求时，它将所需的组件(s)渲染为一个HTML字符串，然后将其作为响应发送给客户端。
从这一点开始，客户端接管了渲染任务。


## 服务器上的Material-UI

Material-UI是从服务器渲染的限制开始设计的，但是用户需要确保它是正确的集成的。
我们必须向页面提供所需的样式。
重要的是，我们为页面提供所需的CSS，否则页面只会呈现HTML，然后等待由客户端注入的CSS，导致它闪烁。
为了向客户端注入样式，我们需要:

1. 在每个请求上创建一个新鲜的、新的`sheetsRegistry`和`theme`实例。
2. Render the React tree with the server-side API and the instance.使用服务器端API和实例渲染React树。
3. 将CSS从`sheetsRegistry`中取出
4. 将CSS传递给客户端。

在客户端，在删除服务器端注入的CSS之前，将再次注入CSS。

## 设置

在下面的菜谱中，我们将讨论如何设置服务器端渲染。

### 服务端

下面是我们的服务器端将是什么样子的概要。
我们要建立一个使用[app.use](http://expressjs.com/en/api.html)的[Express 中间件](http://expressjs.com/en/guide/using-middleware.html)来处理所有来到我们服务器的请求。
如果您对Express或中间件不熟悉，只要知道服务器接收到请求，我们的handleRender函数就会被调用。


`server.js`

```js
import path from 'path';
import express from 'express';
import React from 'react';
import App from './App';

// 我们将在后面的部分中填充这些内容。
function handleRender(req, res) {
  /* ... */
}

function renderFullPage(html, preloadedState) {
  /* ... */
}

const app = express();

// 每当服务器端接收到请求时，就会触发这一过程。
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### 处理请求

第一件事就是为每一个请求创建一个新的`sheetsRegistry` 和 `theme`实例。

渲染的时候，我们将包裹`<App />`，我们的根组件进一个`<JssProvider />`和`<MuiThemeProvider />`来使`sheetsRegistry` 和 `theme`对组件树中的所有组件都是可用的。

服务器端渲染的关键步骤是在将组件发送到客户端**之前**，渲染组件的初始HTML。为此,我们使用[ReactDOMServer.renderToString()](https://facebook.github.io/react/docs/react-dom-server.html)。

然后我们使用`sheetsRegistry.toString()`从我们的`sheetsRegistry`中获得CSS。我们将在`renderFullPage`函数中看到它是如何传递的。

```js
import { renderToString } from 'react-dom/server'
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
// import rtl from 'jss-rtl'; // in-case you're supporting rtl
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { green, red } from 'material-ui/colors';

function handleRender(req, res) {
  // 创建一个 sheetsRegistry 实例.
  const sheetsRegistry = new SheetsRegistry();

  // 创建一个 theme 示例.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  // 配置 JSS
  const jss = create(preset());
  // const jss = create({ plugins: [...preset().plugins, rtl()] }); // in-case you're supporting rtl

  jss.options.createGenerateClassName = createGenerateClassName;

  // 渲染一个组件为字符串.
  const html = renderToString(
    <JssProvider registry={sheetsRegistry} jss={jss}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  )

  // 从sheetsRegistry 攫取CSS
  const css = sheetsRegistry.toString()

  // 发送被如安然的页面返回给客户端
  res.send(renderFullPage(html, css))
}
```

### 注入初始组件 HTML 和 CSS


服务器端的最后一步是将初始组件HTML和CSS注入到客户端渲染的模板中。

```js
function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
      </body>
    </html>
  `;
}
```

### 客户端

客户端很简单。我们所要做的就是删除服务器端生成的CSS。
让我们来看看我们的客户端文件:

`client.js`

```jsx
import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';
import App from './App';

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App {...this.props} />
  }
}

// 创建 theme 实例.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
});

render(
  <MuiThemeProvider theme={theme}>
    <Main />
  </MuiThemeProvider>,
  document.querySelector('#root'),
);
```
