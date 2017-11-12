# Color

material design中的[Color](https://material.io/guidelines/style/color.html)受到大胆的色彩与柔和的环境、深邃的阴影和明亮的高光相结合的启发。

## Color Palette （颜色调色板）

### 重要术语

#### Hues/Shades

hue/shade 时调色板中的一个单一的颜色。

#### Palette

palette是一组hues的集合。默认情况下，Material-UI 使用的所有调色板都是从material design规范构建的。有效的调色板包括：

### 示例

这个颜色的调色板包括主要的和强调的颜色，可以用来说明或彰显你的品牌颜色。
它们被设计来和谐地工作。

例如，你可以用红色来表示:
```js
import { red, purple } from 'material-ui/colors';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
```

{{demo='pages/style/Color.js'}}

## Color system

在Material Design中，**主要颜色**指的是在你的应用中出现频率最高的颜色。第二种颜色指的是用来强调用户界面关键部分的颜色。**次要颜色**指的是一种用来强调用户界面关键部分的颜色。

从Material Design调色板中使用颜色是可选的。
你可以在[这里](https://material.io/guidelines/style/color.html#color-color-system)了解到更多.

## Color schemes（颜色计划）

这些是一些可以用来制作调色板的很棒的工具的链接:

- [www.materialpalette.com](https://www.materialpalette.com)
- [mcg.mbitson.com/](http://mcg.mbitson.com/)
