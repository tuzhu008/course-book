# rem
基于html `font-size`的大小单位。1rem = font-size
rem的原理就在于等比缩放，而rem就是这个缩放因子。

原始尺寸rem=100，3rem = 300.
当在另一台设备上，要将此元素设置为200时，1rem = 200。只需要修改rem的值。rem的值是基于html的fontsize，也就是document元素的fonysize。因此只要去设置fontsize的大小，rem也随之改变。这时候fontsize设置为(200/300)*100。

等比缩放，这是一个相对值。这些缩放都是参考个元素在设计图上的比例来的。因此，在进过缩放之后，这些元素在新的页面上所占比例也跟原来原比例相同。


## 移动端基于rem响应式
动态设置html的font-size
参见[rem.js](./rem.js)

[手机端页面自适应解决方案](http://www.jianshu.com/p/985d26b40199)