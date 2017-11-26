# React使用经验

## 动态增删CSS

- 使用模板字符串
```js
className = {`todo-item ${this.props.completed?' completed':''}`}
```
`this.props.completed`为真的时候返回一个叫` completed`的字符串，注意空格。
