# matchPath

`matchPath`是一个函数。它接收两个参数，`pathname`和`props`对象。返回值是一个经过匹配计算的match对象,未匹配到返回`null`。

它使您可以使用相同的匹配代码，`<Route>`在正常的渲染周期外使用，就像在服务器进行渲染之前收集数据依赖关系。

```js
import { matchPath } from 'react-router'

const match = matchPath('/users/123', {
  path: '/users/:id', 
  exact: true,
  strict: false
})
console.log(typeof(matchPath)); //function
console.log(match);
```
返回的match
```js
{
  isExact: true
  params: {id: "123"}
  path: "/users/:id"
  url: "/users/123"
}
```

## pathname

第一个参数是您想要匹配的路径名。如果您正在使用Node服务器,它将是`req.url`。

## props

第二个参数是定制匹配的props，它们和`Route`接收的`match` props是一样的

```js
{
  path, // like /users/:id
  strict, // optional, 默认值 false
  exact // optional, 默认值 false 只表示匹配模式，与match的isExact无关
}
```
props只接受这三个属性，其余的会被忽略，
