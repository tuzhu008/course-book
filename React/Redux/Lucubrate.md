## 初始化的时候每个reducer都会执行三次？

开始使用默认值初始化两次，然后再使用connect时传递的state初始化一次。


## 每次dispatch action的时候都会触发每个reducer?
    每次都会遍历顶级reducer，然后根据需要再调用子reducer

## reducer如何分割？
```js
const reducerA = function(state={},action) {
    return {
        reducerB,
        reducerC
    }
}
```
reducerA代表的数据是由reducerB和reducerC所组成的，reducerA的数据结构则为
```js
{
    reducerB: reducerB,
    reducerC: reducerC
}
```
如果在在原始数据中，数据的结构跟reducer的名称是不相符合的如：
```js
{
    dateB: {},
    dataC: {}
}
```
那么，就要改写reducerA的写法
```js
const reducerA = function(state={},action) {
    return {
        dataB: reducerB,
        dataC: reducerC
    }
}
```
或者
```js
const reducerA = combineReducers({
    dataB: reducerB,
    dataC: reducerC
});
```
**因此**，分隔reducer的依据时根据数据结构来的，在返回结构代表了state的结构。