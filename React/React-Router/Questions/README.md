# 使用React-router遇到的问题

## 页面锚点导航

### 方案一：为锚点添加点击事件
```js
scrollToAnchor = (anchorName) => {
    if(anchorName) {
      let anchorEle = document.getElementById(anchorName);
      if(anchorEle) {
        anchorEle.scrollIntoView();
      }
    }
  }  
```
添加点击
```html
<a onClick={()=> scrollToAnchor(name)}>click me </a>
```
