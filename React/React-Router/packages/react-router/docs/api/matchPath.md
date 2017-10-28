# matchPath

这使您可以使用相同的匹配代码，`<Route>`在正常的渲染周期外使用，就像在服务器进行渲染之前收集数据依赖关系。

```js
import { matchPath } from 'react-router'

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
})
```

## pathname

第一个参数是您想要匹配的路径名。如果您正在使用Node服务器,它将是`req.url`。

## props

第二个参数是定制匹配的props，它们和`Route`接收的匹配props是一样的

```js
{
  path, // like /users/:id
  strict, // optional, defaults to false
  exact // optional, defaults to false
}
```
