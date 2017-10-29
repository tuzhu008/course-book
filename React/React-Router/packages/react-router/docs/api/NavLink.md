# `<NavLink>`

`<NavLink>`是一个特殊版本的`<Link>`。当它与当前的URL匹配时，它将为渲染的元素添加样式属性。

```js
import { NavLink } from 'react-router-dom'

<NavLink to="/about">About</NavLink>
```
## activeClassName: string

当`<NavLink>`是激活状态，这个class会赋予这个元素。默认是激活状态。这将与className属性一起使用。

```js
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```
## activeStyle: object
当`<NavLink>`是激活状态时，这个style对象会被应用到元素。

```js
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```
## exact: bool

默认值： `false`

当为true时，则只有在location**完全**匹配时才会应用激活的class/style。

默认值：`false`

```js
<NavLink
  exact
  to="/profile"
>Profile</NavLink>
```
| to | location.pathname | exact | matches? |
| :--- | :--- | :---: | :---: |
| `/one`  | `/one`  | `true` | yes |
| `/one`  | `/one/`  | `true` | yes |
| `/one`  | `/one/two`  | `true` | no |
| `/one`  | `/one`  | `false` | yes |
| `/one`  | `/one/`  | `false` | yes |
| `/one`  | `/one/two`  | `false` | yes |
| --  | -- | -- | -- |
| `/one/`  | `/one`  | `true` | yes |
| `/one/`  | `/one/`  | `true` | yes |
| `/one/`  | `/one/two`  | `true` | no |
| `/one/`  | `/one`  | `false` | yes |
| `/one/`  | `/one/`  | `false` | yes |
| `/one/`  | `/one/two`  | `false` | yes |

从上可以看到，exact模式的匹配是双向的，exact只代表`to`和`location.pathname`之间的比较模式。A与B进行匹配和B和A进行匹配是等价的。

## strict: bool

默认值：`false`

当为true时，在确定`to`中的位置是否与当前URL匹配时，将考虑位置路径名的末尾斜杠。请参阅 [`<Route strict>`](./Route.md#strict)获取更多信息

```js
<NavLink
  strict
  to="/events/"
>Events</NavLink>
```
| to | location.pathname | matches? |
| :---: | :---: | :---: |
| `/one/` | `/one` | no |
| `/one/` | `/one/` | yes |
| `/one/` | `/one/two` | yes |
| - | - |- |
| `/one` | `/one` | yes |
| `/one` | `/one/` | yes |
| `/one` | `/one/two` | yes |

从上可以看出，strict模式的匹配是单向的，它**只是针对于`to`中以`/`结尾的路径做限制**。也就是说，这个规则**对不以`/`结尾的路径不起作用**。

strict会先将`location.pathname`中的末尾变为`/`，如果以一个字符或者字符串结尾，会去掉这些字符，如：`/one/two`会被转为`/one/`。因此`/one/`和`/one`不匹配，`/one/`和`/one/two`是匹配的。

但此模式对`/`无用，`to='/'`任何都匹配。



## isActive: func

一个函数，返回值是bool类型。用于添加额外的逻辑，以确定链接是否是激活的。如果您想要做更多的事情，而不是验证该链接的路径名与当前URL的路径名匹配，那么就应该使用该方法。

接收match、location等作为参数，不是一个对象，所以不需要解构`{ match, location }`。
```js
// only consider an event active if its event id is an odd number只有当事件id为奇数时才考虑事件活动
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink
  to="/events/123"
  isActive={oddEvent}
>Event 123</NavLink>·
```
## location: object

`isActive`比较当前的历史位置(通常是当前的浏览器URL)。为了与不同的位置进行比较，可以传入一个`location`

```js
<NavLink 
  to='/two'
  isActive={(match, location) => {
    //do Something
    //这里接收到的location是当前的location
  }}
  loaction={oneLocating}>
  Two
  </NavLink>
```
当指定了location属性的时候，默认的当前的location就会被覆盖掉。也就是isActive的函数中接收到的location就是这个属性指定的location。

当指定了location属性，isActive的函数接收的match会变为null?