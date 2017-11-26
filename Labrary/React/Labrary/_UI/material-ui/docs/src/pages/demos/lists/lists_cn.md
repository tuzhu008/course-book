---
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Lists

列表

[Lists](https://material.io/guidelines/components/lists.html) 将多行项垂直地表示为一个单一的连续的元素。

列表是由连续的行列组成的。每行包含一个磁砖。主要动作填充了磁砖，补充动作用图标和文字表示。

列表最适合于类似的数据类型。

### Simple List （简单的列表）

{{demo='pages/demos/lists/SimpleList.js'}}

### Folder List （文件夹列表）

{{demo='pages/demos/lists/FolderList.js'}}

### Inset List （嵌入列表）

{{demo='pages/demos/lists/InsetList.js'}}

### Nested List （嵌套列表）

{{demo='pages/demos/lists/NestedList.js'}}

### Pinned Subheader List （固定小标题列表）

在滚动时，子标题仍然被固定在屏幕的顶部，直到被下一个子标题推下屏幕。

这个特性依赖于CSS的粘性定位。
不幸的是，我们所支持的所有浏览器都[没有实现](https://caniuse.com/#search=sticky)。当不支持时，我们默认禁用`disableSticky`。

{{demo='pages/demos/lists/PinnedSubheaderList.js'}}

## List Controls （列表控件）

### Checkbox （复选框）

复选框可以是主操作，也可以是次要动作。

复选框是列表项的主要操作和状态指示器。注释按钮是一个次要动作和一个单独的目标。

{{demo='pages/demos/lists/CheckboxList.js'}}

复选框是列表项的次操作和一个单独的目标：

{{demo='pages/demos/lists/CheckboxListSecondary.js'}}

### Switch （开关）

开关是次要动作和一个单独的目标。
{{demo='pages/demos/lists/SwitchListSecondary.js'}}

## Interactive （交互）

下面是一个互动演示，可以让你探索不同设置的视觉效果:
{{demo='pages/demos/lists/InteractiveList.js'}}
