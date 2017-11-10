# 移动端遮罩层滚动问题
## 需求
1. body限制为屏幕大小，禁止滚动
1. 遮罩层取消时恢复滚动位置
1. 遮罩层正常滚动
1. 遮罩层为手机浏览器窗口大小

## 实现
参考[这个博客](https://uedsky.com/2016-06/mobile-modal-scroll/)

打开：
1. 使用闭包记录当前的scrollTop数值
1. 在mask时为body添加特定的class
1. 设置body元素的style.top为-scrollTop的值，这样就保证了页面body位置保持不变。

关闭：
1. 移除class
1. 恢复scrollTop值

由于使用了新标准[document.scrollingElement](https://developer.mozilla.org/en/docs/Web/API/document/scrollingElement)，因此需要引入polyfill:[polyfill document.scrollingElement.js](https://github.com/yangg/scrolling-element)

```bash
npm install scrolling-element --save
```
在需要的位置引入：
```js
import 'scrolling-element'
```

然后在管理遮罩层开闭的层上添加代码：
```js
/**
  * ModalHelper helpers resolve the modal scrolling issue on mobile devices
  * https://github.com/twbs/bootstrap/issues/15852
  * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
  */
var ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-op
```
这里可以看到，引入了`modal-open`这个样式，因此需要在css样式表中设置`body.modal-open`:
```css
body.modal-open {
    position: fiex;
    width: 100%;
}
```
然后根据需求，在合适的时机调用这两个函数：
```js
ModalHelper.afterOpen();
ModalHelper.beforeClose();
```

遮罩层样式设置：
```css
.mask {
    width: 100%;
    position: fixed;
    // 下面两句就保证了遮罩层高度为浏览器高度。
    top: 0;
    bottom: 0;
    overflow: scroll;
}
```