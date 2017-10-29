# `<Redirect>`

渲染一个`<Redirect>`将导航到一个新的位置。新的位置将覆盖历史堆栈中的当前位置，就像服务器端重定向(HTTP 3xx)那样。

```js
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```
# Props

## to: string

重定向到的URL，[_`path-to-regexp`_](https://www.npmjs.com/package/path-to-regexp) 能解析的任何有效的URL路径。`to`里面使用的所有URL参数必须被`from`覆盖。因为它只是重定向而已。

```js
<Redirect to="/somewhere/else"/>
```

## to: object

用来重定向的location。`pathname`可以是任何能被 [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 解析的路径。

```js
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>
```

## push: bool

当为`true`时，重定向将推动一个新的条目进入历史，而不是取代当前的条目。

```js
<Redirect push to="/somewhere/else"/>
```

## from: string

一个路径名，用来表示从哪里重定向。它是任何可以被[`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 解析的有效URL路径。所有匹配的URL参数都提供给`to`中的模式。在`to`中必须包含所使用的所有参数。`to`中未使用的附加参数被忽略。

当它在`<Switch>`中渲染一个`<Redirect>`时，这只能用于匹配一个location。参见 [`<Switch children>`](./Switch.md#children-node)

```js
<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  <Route path='/new-path' component={Place}/>
</Switch>
```

```js
//含匹配参数的重定向
<Switch>
  <Redirect from='/users/:id' to='/users/profile/:id'/>
  <Route path='/users/profile/:id' component={Profile}/>
</Switch>
```
