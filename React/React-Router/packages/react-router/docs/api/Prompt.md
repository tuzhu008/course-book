# `<Prompt>`

用于在离开页面之前提示用户。当您的应用程序进入一个状态，该状态应该防止用户导航(就像表单被填满了)，这时渲染一个`<Prompt>`。

```js
import { Prompt } from 'react-router'

<Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
```

## message: string

当用户试图导航时，用于提示用户的信息。

```js
<Prompt message="Are you sure you want to leave?"/>
```

## message: func

用户试图导航到的下一个`location`和`action`时被调用。返回一个字符串以向用户显示提示，或者返回`true`以便允许过度。

```js
<Prompt message={location => (
  `Are you sure you want to go to ${location.pathname}?`
)}/>
```

## when: bool

有条件地渲染一个`<Prompt>`，你可以总是渲染它，但传递`when={true}` 或者 `when={false}`来允许或阻止导航。

```js
<Prompt when={formIsHalfFilledOut} message="Are you sure?"/>
```
