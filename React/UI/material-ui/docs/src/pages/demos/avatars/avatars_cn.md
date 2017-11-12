---
components: Avatar
---

# Avatars

Avatars意为替身，在这则为头像。如QQ或者微信的头像。在所有的material design中都发现了Avatars，从表格到对话菜单都有使用。

## image avatars（图片头像）

可以通过将标准 `img`标签的属性`src`或`srcSet`传递到组件中创建图像avatars。

{{demo='pages/demos/avatars/ImageAvatars.js'}}

## Icon avatars （图标头像）

将一个icon组件传递作为`children`来创建Icon avatars。

{{demo='pages/demos/avatars/IconAvatars.js'}}

## Letter avatars（文字头像）

Avatars可以包含简单的字符，它将使用这些字符作为`children`来创建一个Avatars。

{{demo='pages/demos/avatars/LetterAvatars.js'}}
