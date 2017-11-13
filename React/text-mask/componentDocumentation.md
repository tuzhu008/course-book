# Text Mask 文档

* Text Mask 接受以下值:
  * [`mask`](#mask) (array 或者 function)
  * [`guide`](#guide) (boolean)
  * [`placeholderChar`](#placeholderchar) (string)
  * [`keepCharPositions`](#keepcharpositions) (boolean)
  * [`pipe`](#pipe) (function)
  * [`showMask`](#showmask) (boolean)
* [包含 `conformToMask`](#included-conformtomask)
* 已知的问题
  * [支持的 `<input>` 类型](#supported-input-types)

## `mask`

`mask` 是一个数组或函数，它定义了用户输入将被屏蔽的方式。

### `mask` 数组

在Text Mask中定义一个掩码的方法是通过一个数组。

数组中的每个元素都必须是一个字符串或一个正则表达式。每个字符串都是mask中的一个固定字符
每个正则表达式都是一个接受用户输入的占位符(placeholder)。

正则表达式将用于测试用户输入，允许它或拒绝它。

例如，美国电话号码`(555) 392-4932`的mask，可以是这样的：

```js
['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
```

这意味着在第一个占位符中，用户只能输入1到9之间的数字，而占位符之后只有一个数字。

任何有效的正则表达式都应该起作用。

注意: 可以将mask设为`false`来完全禁用屏蔽。

### `mask` 函数

你可以传递一个函数作为`mask`。在每次输入值改变时，这个函数将接收用户输入。这个函数返回一个如上面描述的`mask`数组：


```js
var mask = function(rawValue) {
  // 添加逻辑生成你的mask数组
  return [ /*返回你的mask数组*/ ]
}
```

当我们想要格式化未知长度的用户输入时，这个特性非常有用。例如，将数字格式化为货币或将字符串格式化为电子邮件地址mask。

对于一个mask函数的示例，请参阅源代码
[`createNumberMask`](https://github.com/text-mask/text-mask/blob/master/addons/src/createNumberMask.js),
这是一个[文本 Mask 插件](https://github.com/text-mask/text-mask/tree/master/addons/#readme).

<p align="center">
<img src="assets/dynamicMask.gif"/>
</p>

注意: 可以从mask函数中返回`false`来完全禁用屏蔽。

## `guide`

`guide` 是一个布尔值，它告诉组件是否处于**引导**或**没有引导**模式。

**默认为 `true` **

<table>
<tbody>
<tr>
<th>引导模式</th>
<th>非引导模式</th>
</tr>

<tr>
<td>
<p align="center">
<img src="assets/guideMode.gif"/>
</p>

<p>
当 <code>guide</code> is <code>true</code>, Text Mask 总是显示占位符字符和非占位符字符。
</p>
</td>

<td>
<p align="center">
<img src="assets/noGuideMode.gif"/>
</p>

</p>
当 <code>guide</code> is <code>false</code>, Text Mask 不要打印出占位符字符，只在用户输入时才会添加mask字符。
</p>
</td>
</tr>
</tbody>
</table>

## `placeholderChar`

占位符字符表示mask中可以标记的位置。默认占位符
性格是下划线`_`。

例如...

```js
['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
```
 
...用户会填写 `(___) ___-____`.

您可以传递一个不同的占位符字符。 例如,unicode字符`U+2000`
使上面的mask看起来像`(   )    -    `。在JavaScript中，您将传递这样的unicode字符
为`'\ u2000'`。

&#x1F4CD; **注意**: 你不能使用一个有占位符字符的mask。那是因为默认的占位符字符是`_`，你不能有一个看起来像`_111_`的mask，除非你传递的`placeholderChar`不是`_`并且不存于你的mask里面。

## `keepCharPositions`

`keepCharPositions` 改变Text Mask 组件的一般行为。

**默认为`false`**,

<table>
<tbody>
<tr>
<th><code>keepCharPositions</code> 被设置为 <code>true</code></th>
<th><code>keepCharPositions</code> 被设置为<code>false</code></th>
</tr>

<tr>
<td>
<p align="center">
<img src="assets/keepCharPositionsTrue.gif"/>
</p>

<p>
当为 <code>true</code>时，添加或删除字符不会影响现有字符的位置。
</p>
</td>

<td>
<p align="center">
<img src="assets/keepCharPositionsFalse.gif"/>
</p>

</p>
当为 <code>false</code>时，添加字符会导致现有字符的前进，删除字符使现有的字符后退。
</p>
</td>
</tr>
</tbody>
</table>

## `pipe`

您可以提供一个`pipe` 函数，它将使您有机会修改合格的值，在这个值被显示在屏幕上之前。

 `pipe` 函数接收:

1. `conformedValue`
1. `config`

`conformedValue`是用户在它已经合格之后输入的值。`config`是一个对象，它包含用于Text Mask的所有用户配置(本页详细说明)。

`pipe` 函数必须返回下面中的一种：`false`, `string`, or `object`.

返回`false`来拒绝新的合格值并保持输入字段不改变。

如果`pipe`在不添加新字符的情况下修改字符串，例如，更改字母大小写或删除字符，它应该返回修改后的字符串。

如果`pipe`将新字符添加到字符串中，那么它必须返回一个带有以下键的对象:

1. `value`: 新的字符串
1. `indexesOfPipedChars`: 整数数组，其中包含所有被`pipe`添加到合格值的字符的索引。

一个pipe的案例, 查看这个代码
[`createAutoCorrectedDatePipe`](https://github.com/text-mask/text-mask/blob/master/addons/src/createAutoCorrectedDatePipe.js)
这是一个[Text Mask 插件](https://github.com/text-mask/text-mask/tree/master/addons/#readme).


## `showMask`

`showMask` 是一个布尔值，它告诉Text Mask组件，
当输入框元素值为空时，在常规占位符的地方将其作为占位符显示。

---

## 包含 `conformToMask`

[`conformToMask`](https://github.com/text-mask/text-mask/blob/master/core/src/conformToMask.js)是一个函数，Text Mask用来将文本转换为给定的mask。

#### 导入它

为了方便，它包含在Text Mask组件中。所以你可以从Text Mask包中导入它

```js
import textMask, {conformToMask} from 'where-you-import-text-mask-from' 
```

#### 使用

`conformToMask` 接收三个参数:

* text (string) (必须)
* [mask](#mask) (array) (必须)
* config (object) (可选)

`config` 是 [这些值](https://github.com/text-mask/text-mask/blob/master/core/src/conformToMask.js#L9-L14).
链接的变量名与上述文档中所描述的属性具有相似的名称。所以你可以
通过阅读上面的文档了解每个的情况。

`conformToMask`的返回值是一个下面形式的对象，

```json
{
  "conformedValue": "(123) 123-1234",
  "meta": {
    "someCharsRejected": false
  }
}
```

因此，使用`conformToMask`的一种方法如下:

```js
var phoneNumber = '5551234444'
var phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

var conformedPhoneNumber = conformToMask(
  phoneNumber,
  phoneNumberMask,
  {guide: false}
)

console.log(conformedPhoneNumber.conformedValue) // prints (555) 123-4444
```

---

## 已知的错误

### 支持的 `<input>` 类型

请注意，Text Mask支持输入类型有`text`, `tel`, `url`, `password`, 和 `search`。由于浏览器API的限制，不能支持其他输入类型，如`email` 或 `number`。然而，可以通过组合适当的输入mask，让用户在输入类型为`text`中输入电子邮件或数字看起来时正常的。