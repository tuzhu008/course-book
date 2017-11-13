# TypeScript

您可以将静态类型添加到JavaScript来提高开发人员的生产力和代码质量，这要感谢[TypeScript](https://www.typescriptlang.org/)。
看一看[Create React App with TypeScript](https://github.com/callemall/material-ui/tree/v1-beta/examples/create-react-app-with-typescript)的例子。

## `withStyles`的使用方法

在TypeScript中使用`withStyles`可能有些麻烦，因此值得展示一些示例。您可以首先调用`withStyles()`来创建一个装饰函数，如下:

```jsx
const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    padding: spacing.unit,
    background: palette.background,
    color: palette.primary,
  },
}));
```

然后，可以使用它来装饰无状态的函数化组件或类组件。假设我们有以下两种情况:

```jsx
interface Props {
  text: string;
  type: TypographyProps['type'];
  color: TypographyProps['color'];
}
```

函数化组件是直接了当的 :

```jsx
const DecoratedSFC = decorate<Props>(({ text, type, color, classes }) => (
  <Typography type={type} color={color} classes={classes}>
    {text}
  </Typography>
));
```

类组件要稍微麻烦一些. 由于[TypeScript的装饰支持的当前限制](https://github.com/Microsoft/TypeScript/issues/4881), `withStyles` 不能用作类修饰器。 我们可以这样修饰一个类组件:

```jsx
const DecoratedClass = decorate(
  class extends React.Component<Props & WithStyles<'root'>> {
    render() {
      const { text, type, color, classes } = this.props
      return (
        <Typography type={type} color={color} classes={classes}>
          {text}
        </Typography>
      )
    }
  }
);
```

注意，在类示例中，您不需要在调用`decorate`中注释`<Props>`，类型推断负责所有的事情。需要注意的一点是，如果您的样式组件除了`classes`之外**没有**额外的属性。最自然的事情就是写

```jsx
const DecoratedNoProps = decorate(
  class extends React.Component<WithStyles<'root'>> {
    render() {
      return (
        <Typography classes={this.props.classes}>
          Hello, World!
        </Typography>
      )
    }
  }
);
```

不幸的是，在这种情况下，TypeScript会推断错误的类型，当您要为这个组件创建一个元素时，您将会遇到麻烦。在这种情况下，您需要提供一个显式的`{}`类型参数，如:

```jsx
const DecoratedNoProps = decorate<{}>( // <-- note the type argument!
  class extends React.Component<WithStyles<'root'>> {
    render() {
      return (
        <Typography classes={this.props.classes}>
          Hello, World!
        </Typography>
      )
    }
  }
);
```

为了避免担心这种边缘情况，总是提供一个显式的类型参数到`decorate`是一个好习惯。
