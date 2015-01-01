realtime
========
### 疑问
socket.io realtime flot

在`socketio.js`里，为什么这种写法不可以：
```js
var handler = function(req, res){
```
而这种写法可以？
```js
//function handler (req, res){
```
两种定义函数的方式有什么区别？求解

### 答案
两种方式的微小差异：
1. 第一种方式是声明变量，需要先声明后使用，否则值为undefined
2. 第二种方式无此问题，函数声明，可以先使用后声明
`注意：“变量提升”，只是声明提前了，但值是undefined，如下面例子：`
```js
function foo(x) {
    console.log(tmp);//结果是undefined
    if (x > 100) {
        var tmp = x - 100;
    }   
}
foo(1000);
```
