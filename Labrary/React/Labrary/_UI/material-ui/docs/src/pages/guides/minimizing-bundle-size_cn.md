# 最小化包大小

为了方便起见，Material-UI在顶级的`material-ui`导入上暴露了它的全部API。
如果你有树摇晃（tree shaking）正在工作，这将会很好。

但是，在您的构建链中不支持或配置树摇晃的情况下，**这会导致整个库及其依赖项被包含在**从顶级包导入的代码的客户包中。

你有两种选择来克服这种情况:

## Option 1

你可以从`material-ui/`直接导入来避免使用未使用的模块。 例如:

```js
import { Button, TextField } from 'material-ui';
```

使用下面的方式代替

```js
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
```

以这种方式提供的公共API被定义为从顶级`material-ui`模块中导入可用的集合。任何不能通过顶级`material-ui`模块获得的东西都是一个**私有API**，并且在没有通知的情况下会发生变化。


## Option 2

另一种选择是像下面这样继续使用缩短的导入，但是仍然有优化包的大小，这要归功于一个 **Babel plugin**:

```js
import { Button, TextField } from 'material-ui';
```

选择下列插件之一:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是可定制的，并且可以使用Material-UI来进行足够的调整工作
- [babel-transform-imports](https://bitbucket.org/amctheatres/babel-transform-imports) 有跟`babel-plugin-import` 不同的api,但是效果时一样的。
- [babel-plugin-direct-import](https://github.com/umidbekkarimov/babel-plugin-direct-import) 自动扫描导出的模块，因此在大多数情况下不需要配置它就可以工作。
- [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) 它的目标是用所有的`package.json`来解决这个问题。

**重要提示**: 这两个选项都*应该是临时的*，直到您在项目中添加了树摇晃功能。
