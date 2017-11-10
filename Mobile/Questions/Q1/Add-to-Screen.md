## IOS设备添加图标到主屏幕

创建一个 PNG 图片, 命名为 `apple-touch-icon.png` 或者 `apple-touch-icon-precomposed.png`, 放置在网站**根目录**即可.

指定图标路径

为页面指定一个图标路径, 在网页的 head 部分代码如下:
```html
<link rel="apple-touch-icon" href="/custom_icon.png"/>
```
为不同设备指定图标

在网页中为不同的设备指定特殊图标, 因为 iPhone 和 iPad 的图标尺寸不一样, 需要 sizes 属性来进行区分, 如果没有定义 sizes 属性, 默认 sizes 是 57 x 57. 代码如下:
```html
<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />
```

如果没有图片尺寸可以匹配设备图标的尺寸, 存在比设备图标大的图片, 将使用比设备图标尺寸略大的图片; 如果没有比设备图标大的图片, 则使用最大的图片.

如果没有在网页中指定图标路径, 将会在根目录搜寻以 apple-touch-icon... 和 apple-touch-icon-precomposed... 作为前缀的 PNG 图片. 假设现在有一个设备的图标大小是 57 x 57, 系统将按以下顺序搜寻图标:

1. apple-touch-icon-57x57-precomposed.png
2. apple-touch-icon-57x57.png
3. apple-touch-icon-precomposed.png
4. apple-touch-icon.png

## 为用户加上提示

通过添加一个JavaScript代码来邀请用户添加到主屏幕，该库使用了HTML5的本地存储跟踪是否已经显示过了，以避免重复出现。