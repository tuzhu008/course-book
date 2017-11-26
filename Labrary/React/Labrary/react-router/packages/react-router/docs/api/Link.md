# `<Link>`

在应用程序中提供声明性的、可访问的导航

```js
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
```
## to: string

链接到的路径名或位置。
```js
<Link to="/courses"/>
```
## to: object
链接到的位置。
```js
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```
## replace: bool
当为true时，单击该链接将替代history堆栈中的当前条目，而不是添加一个新条目。

```
<Link to="/courses" replace />
```