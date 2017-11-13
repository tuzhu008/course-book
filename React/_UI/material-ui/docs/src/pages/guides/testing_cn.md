# 测试

## 内部测试

我们认真对待测试。我们已经编写并维护了**大量的**测试，所以我们可以
对组件进行可靠的迭代。例如,[Argos-CI](https://www.argos-ci.com/callemall/material-ui)提供的视觉回归测试已被证明是非常有用的。
想要了解更多关于我们的内部测试,你可以看一看[README](https://github.com/callemall/material-ui/blob/v1-beta/test/README.md)。


[![Coverage Status](https://img.shields.io/codecov/c/github/callemall/material-ui/v1-beta.svg)](https://codecov.io/gh/callemall/material-ui/branch/v1-beta)

## 用户空间

在用户空间中编写测试怎么样?Material-UI样式化基础结构在enzyme之上使用了一些辅助函数，使过程更容易。
如果你愿意的话，你可以利用这些辅助函数。


### 浅渲染

浅渲染对于约束你自己将组件作为测试单元进行测试是很有用的。这也确保您的测试不会间接地断言子组件的行为。
我们暴露一个`createShallow()`函数来应对这种情况。但是，大多数情况下，您很可能不需要它。创建浅渲染是为了单独地测试组件。这意味着不泄漏子实现细节，例如上下文。

### 完整的DOM渲染

完整的DOM渲染对于使用那些可能与DOM API交互的组件，或者可能需要完整的生命周期来完全测试组件(例如， `componentDidMount` 等等)。
我们暴露`createMount()`函数来应对这种情况。

### 渲染为字符串

渲染为字符串对于测试服务器上使用的组件的行为是很有用的。
您可以利用它来维护生成的HTML字符串。
我们暴露`createRender()`这个函数来应对这个情况。


## API

### `createShallow([options]) => shallow`

用需要的上下文生成一个增强的浅函数。
Generate an enhanced shallow function with the needed context.
请参考 [enzyme的API文档](http://airbnb.io/enzyme/docs/api/shallow.html)获取更多`shallow` 函数的细节.


#### 参数

1. `options` (*Object* [optional])
  - `options.shallow` (*Function* [optional]): 增强的浅函数, 它默认使用 **enzyme**.
  - `options.untilSelector` (*String* [optional]): 递归地渲染子元素直到找到所提供的选择器。这对于深入挖掘高阶组件是很有用的。
  - `options.dive` (*Boolean* [optional]): Shallow 渲染当前包装器的一个非DOM子元素，并在结果中返回一个包装器。 
  - 其他的键被转发到`enzyme.shallow()`的选项参数中

#### 返回值

`shallow` (*shallow*): 一个浅函数

#### 示例

```js
import { createShallow } from 'material-ui/test-utils';

describe('<MyComponent />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<MyComponent />);
  });
});
```

### `createMount([options]) => mount`

用需要的上下文生成一个增强的挂载函数。

请参阅 [enzyme的API文档](http://airbnb.io/enzyme/docs/api/mount.html) 获得更多`mount` 函数的细节.

#### 参数

1. `options` (*Object* [optional])
  - `options.mount` (*Function* [optional]):增强的挂载函数, 默认使用 **enzyme**.
  - 其他的键被转发到 `enzyme.mount()`的选项参数.

#### 返回值

`mount` (*mount*): 一个挂载函数

#### 示例

```js
import { createMount } from 'material-ui/test-utils';

describe('<MyComponent />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = mount(<MyComponent />);
  });
});
```

### `createRender([options]) => render`

使用需要的上下文生成一个渲染为字符串的函数
参阅 [enzyme的API文档](http://airbnb.io/enzyme/docs/api/render.html) 获取`render` 函数的更多细节.

#### 参数

1. `options` (*Object* [optional])
  - `options.render` (*Function* [optional]): 增强的render函数, 默认使用 **enzyme**.
  - 其他的键被转发到 `enzyme.render()`的选项参数.

#### 返回值

`render` (*Function*): 一个渲染为字符串的函数。

#### 示例

```js
import { createRender } from 'material-ui/test-utils';

describe('<MyComponent />', () => {
  let render;

  before(() => {
    render = createRender();
  });

  it('should work', () => {
    const wrapper = render(<MyComponent />);
  });
});
```
