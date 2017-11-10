# 引导用户添加到主屏幕

这是移动设备相关的脚本，它会自动显示一个覆盖的消息，鼓励用户将web应用程序添加到主屏幕上。兼容iOS 6+和Android版Chrome。

## 安装

添加 `addtohomescreen.css` 和 `addtohomescreen.js` 到你项目的入口html文件中（index.html）。然后尽快调用`addToHomescreen();` 例如：

```html
<head>
<title>Add To Home</title>
...
<link rel="stylesheet" type="text/css" href="../../style/addtohomescreen.css">
<script src="../../src/addtohomescreen.js"></script>
<script>
addToHomescreen();
</script>
</head>
```

更多的, 资询 [项目网站](http://cubiq.org/add-to-home-screen).



## Git地址：
[add-to-homescreen](https://github.com/cubiq/add-to-homescreen)