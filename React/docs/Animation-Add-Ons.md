# Animation Add-Ons

> **注意：**<br>
>`ReactTransitionGroup` 和 `ReactCSSTransitionGroup` 已经搬迁到`react-transition-group`，它是由社区维护的。 其1.x分支与现有的插件完全兼容。请在新库中提交bug和特性请求。

`ReactTransitionGroup`附加组件是一个低阶的动画API，`ReactCSSTransitionGroup`是一个轻松实现基础的CSS动画和过渡的附加组件。

## 安装
```bash
npm install react-addons-css-transition-group --save
```

## 高阶 API: `ReactCSSTransitionGroup`
`ReactCSSTransitionGroup`是一个基于`ReactTransitionGroup`的高阶AIP，当一个React组件进入或者离开DOM时，它是一个执行CSS过渡的一个简单方法。它受到了[ng-animate](https://docs.angularjs.org/api/ngAnimate)库的启发。 

### 导入
```js
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 
// with npm
```

```js
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
```

> **注意：**<br>
>你必须提供唯一的key到每个`ReactCSSTransitionGroup`的子组件上，即使只渲染单个组件。这将使React知道哪一个该进入，哪一个该离开或者保持不变。

在这个组件中，当一个新的子组件被添加到`ReactCSSTransitionGroup`时，新添加的组件将会获得一个`example-enter`的class,`example-enter-active`将在下一刻添加到它上面。这是基于一个`transitionName`属性的约定。

您可以使用这些类来触发一个CSS动画或过渡。例如，尝试添加这个CSS并添加一个新的列表项:
```css
.example-enter {
  opacity: 0.01;
}

.example-enter.example-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}

.example-leave {
  opacity: 1;
}

.example-leave.example-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}
```

您会注意到，在CSS和render方法中都需要指定动画的持续时间。这告诉React何时移除动画类，如果元素正在离开，何时将它从DOM中移除。

### Animate 初始挂载


`ReactCSSTransitionGroup` 提供了可选的属性`transitionAppear`,用来在组件初始挂载时添加额外的过渡阶段。在初始挂载时通常不存在过渡阶段，因为transitionAppear的默认值是`false`。下面是一个例子，它通过了传递属性设置了`transitionAppear`值为`true`。

```js
render() {
  return (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <h1>Fading at Initial Mount</h1>
    </ReactCSSTransitionGroup>
  );
}

```

在初始挂载期间，`ReactCSSTransitionGroup`将获得`example-appear`css类，在下一刻`example-appear-active`将被添加到它上边儿。

```css
.example-appear {
  opacity: 0.01;
}

.example-appear.example-appear-active {
  opacity: 1;
  transition: opacity .5s ease-in;
}
```

在初始挂载时，所有的`ReactCSSTransitionGroup`子元素都将出现，但是不会进入。然而，所有的子元素稍后都会被添加到现有的`ReactCSSTransitionGroup`，但他们只会进入不会出现。

>Note: <br>
`transitionAppear`属性在v0.13版本时被添加到`ReactCSSTransitionGroup` 。为了保持向后兼容性,它的默认值被设置为`false`。然而，`transitionEnter`和`transitionLeave`的默认值都为`true`，所以你必须指定`transitionEnterTimeout`和`transitionLeaveTimeout`。如果你不需要进入或者离开动画，传递`transitionEnter={false}` 或者 `transitionLeave={false}`。

### 自定义动画类


还可以为过渡中的每个步骤使用自定义类名。不要将一个字符串传递给`transitionName`，您可以传递一个包含`enter`和`leave`类名的对象，或者一个包含`enter`、`enter-active`、`leave-active`和`leave`类名的对象。如果只提供了`enter`和`leave`类，那么将会以类名末尾附加`-active`的形式来确定`enter-active`和 `leave-active`。下面是使用自定义类的两个例子:
```js
// ...
<ReactCSSTransitionGroup
  transitionName={ {
    enter: 'enter',
    enterActive: 'enterActive',
    leave: 'leave',
    leaveActive: 'leaveActive',
    appear: 'appear',
    appearActive: 'appearActive'
  } }>
  {item}
</ReactCSSTransitionGroup>

<ReactCSSTransitionGroup
  transitionName={ {
    enter: 'enter',
    leave: 'leave',
    appear: 'appear'
  } }>
  {item2}
</ReactCSSTransitionGroup>
// ...
```

### Animation Group必须挂载在工作中

为了让它对子元素应用过度，必须在DOM中挂载`ReactCSSTransitionGroup`，或者必须将`transitionAppear`设置为`true`。

下面的例子是行不通的，因为`ReactCSSTransitionGroup`是和新添加项一块儿被挂载的，而不是将新项挂载在它之中。将此与上面的`Getting Started`进行比较，以查看差异。

```js
render() {
  const items = this.state.items.map((item, i) => (
    <div key={item} onClick={() => this.handleRemove(i)}>
      <ReactCSSTransitionGroup transitionName="example">
        {item}
      </ReactCSSTransitionGroup>
    </div>
  ));

  return (                                       
    <div>
      <button onClick={this.handleAdd}>Add Item</button>
      {items}
    </div>
  );
}
```

### Animating One or Zero Items

在上面的例子中，我们将一个项目列表渲染给了`ReactCSSTransitionGroup`。然而，`ReactCSSTransitionGroup`的子元素也可以是一个或零个项目。这使得将单个元素的`enter`或`leave`变得有可能。类似地，您可以对一个新元素进行动画，以替换当前元素。例如，我们可以实现一个简单的图像轮播:
```js
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function ImageCarousel(props) {
  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="carousel"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        <img src={props.imageSrc} key={props.imageSrc} />
      </ReactCSSTransitionGroup>
    </div>
  );
}
```
### 禁用动画


如果需要，可以禁用动画`enter`或`leave`动画。例如，有时您可能需要`enter`动画，而不需要`leave`动画，但是在删除您的DOM节点之前，`ReactCSSTransitionGroup`需要等待一个动画来完成。你可以添加`transitionEnter={false}` 或者 `transitionLeave={false}`属性到`ReactCSSTransitionGroup`来禁用动画。

>注意:<br>
当使用了`ReactCSSTransitionGroup`时，当过渡结束或在动画中执行更复杂的逻辑时，您的组件无法得到通知。如果您想要更细粒度的控制，您可以使用低阶的`ReactTransitionGroup` API，它提供了自定义过渡所需的钩子。

## 低阶 API: `ReactTransitionGroup`

导入
```js
import ReactTransitionGroup from 'react-addons-transition-group' // ES6
var ReactTransitionGroup = require('react-addons-transition-group') // ES5 with npm
```

`ReactTransitionGroup`是动画的基础。当子元素被声明添加或删除时(如上面的例子中所示)，就会调用特殊的生命周期钩子。

- [componentWillAppear](#componentwillappear)
- [componentDidAppear](#componentdidappear)
- [componentWillEnter](#componentwillenter)
- [componentDidEnter](#componentdidenter)
- [componentWillLeave](#componentwillleave)
- [componentDidLeave](#componentdidleave)

### 渲染一个不同的组件
默认情况下，`ReactTransitionGroup`会被渲染为一个`span`。你可以提供一个`component`属性改变这个行为。例如，我们将它渲染为一个`<ul>`:
```js
<ReactTransitionGroup component="ul">
  {/* ... */}
</ReactTransitionGroup>
```

任何附加的、用户定义、属性将成为渲染的组件的属性。例如，下面是如何使用CSS类渲染一个`<ul>`的:
```js
<ReactTransitionGroup component="ul" className="animated-list">
  {/* ... */}
</ReactTransitionGroup>
```


每个React能股渲染的DOM组件都是可用的。但是，组件不需要是DOM组件。它可以是你想要的任何React组件，甚至是你自己写的。只需要写`component={List}`，你的组件就将接收`this.props.children`。

### 渲染一个单一子元素



人们经常使用`ReactTransitionGroup`来让单一子元素的挂载和卸载动起来，比如一个可折叠的面板。通常情况下，`ReactTransitionGroup`将所有的子元素都封装在一个`span`内(或者如上所述的一个定制组件)。这是因为任何React组件都必须返回一个根元素，而这个规则对`ReactTransitionGroup`也不例外。

但是，如果您只需要在`ReactTransitionGroup`渲染单一子元素，那么您可以完全避免将其封装在一个`<span>`或任何其他DOM组件中。要做到这一点，请创建一个自定义组件，直接渲染这第一个孩子到它：
```js
function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
```


现在你可以在`<ReactTransitionGroup>`指定`FirstChild` 作为 `component` 属性，避免返回的DOM中的任何包装器:

```js
<ReactTransitionGroup component={FirstChild}>
  {someCondition ? <MyComponent /> : null}
</ReactTransitionGroup>
```

他唯一的工作是当你的单一子元素动画进出的时候，比如一个可折叠的面板。这种方法在给多个子元素提供动画或者用另一个子元素替换这个单一子元素的时候是行不通的，比如图像轮播。对于一个图像轮播，当当前的图像是动画滚出的时候，另一个图像将会动画滚进，因此，`<ReactTransitionGroup>`需要给它们一个公共的DOM父元素。您无法避免多个子元素的包装器，但是您可以使用如上所述的`component`属性来定制包装器。

### **Reference**

#### `componentWillAppear()`
```js
componentWillAppear(callback)
```

这是与在`TransitionGroup`中添加的组件初始挂载时的`componentDidMount()`同时被调用的。它将阻止其他动画在调用`callback`之前发生。它只会在一个`TransitionGroup`初始渲染时被调用。
#### `componentDidAppear()`

```js
componentDidAppear()
```
这是在传递给`componentWillAppear`的`callback`被调用之后调用的。
#### `componentWillEnter()`
```
componentWillEnter(callback)
```

这是与`TransitionGroup`中添加的组件初始挂载时的`componentDidMount()`同时被调用的。它将阻止其他动画在调用回调之前发生。它不会在一个`TransitionGroup`初始渲染时被调用。

#### `componentDidEnter()`

```
componentDidEnter()
```
这是在传递给`componentWillEnter`的`callback`被调用之后调用的。

#### `componentWillLeave()`

```
componentWillLeave(callback)
```

当子元素从`ReactTransitionGroup`中被移除时，就会被调用。虽然子元素已经被移除了，但是在调用回调之前，`ReactTransitionGroup`将会让它们保持在DOM中。

#### `componentDidLeave()`
```
componentDidLeave()
```
当`willLeave`的`callback`被调用时调用(与`componentWillUnmount()`同时)。