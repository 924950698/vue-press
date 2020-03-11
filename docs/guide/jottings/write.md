# 手写bind

https://www.jianshu.com/p/6d8250fcfc11
```
if(Function.prototype.bind === undefined){
    console.log('您的浏览器不支持bind方法! 开始使用手写bind功能!');
    Function.prototype.bind = function(obj){
        var arg1 = [].slice.call(arguments,1);  // 解释一下骚操作，用arg1 保留了 当函数调用bind方法时候传  入的参数，因为arguments是类数组对象，我们借用了数组的slice方法
        var fun = this; // fun —> bind调用者(也就是某个函数)
        return function(){
            fun.apply(obj,arg1.concat([].slice.call(arguments,1)));
            //  好像又引入了apply这种骚东西，是的后面我们再分析。
            //  这里返回了一个闭包函数， 里面可以使用 obj ， arg1 ， fun 这些变量，配合起来实现了bind
            //  感兴趣的朋友可以用ie8测试 bind已经生效了  
        }
}
}else{
    console.log('您的浏览器支持bind方法！')
}
```

# 手写promise
# 如何判断一个数组
```
方法一： 使用instanceof方法
instanceof 用于判断一个变量是否某个对象的实例，左边操作数是一个对象，右边操作数是一个函数对象或者函数构造器。原理是通过判断左操作数的对象的原型链上是否具有右操作数的构造函数的prototype属性。
a instanceof b?alert("true"):alert("false")  //注意b值是你想要判断的那种数据类型，不是一个字符串，比如Array。
举一个例子：
var arr=[];
console.log(arr instanceof Array) //返回true

方法二： 使用constructor方法
在W3C定义中的定义：constructor 属性返回对创建此对象的数组函数的引用，就是返回对象相对应的构造函数。从定义上来说跟instanceof不太一致，但效果都是一样的。
那么判断各种类型的方法：
console.log([].constructor == Array);  //true
console.log({}.constructor == Object);  //true
console.log("string".constructor == String); //true
console.log((123).constructor == Number);  //true
console.log(true.constructor == Boolean);  //true
注意：
使用instaceof和construcor,被判断的array必须是在当前页面声明的！

方法三： 使用Object.prototype.toString.call(arr) === '[object Array]'方法
function isArray(o) {
　　return Object.prototype.toString.call(o);
}
var arr=[2,5,6,8];
var obj={name:'zhangsan',age:25};
var fn = function () {}
console.log(isArray(arr)); //[object Array]
console.log(isArray(obj)); //[object Object]
console.log(isArray(fn));  //[object function]

方法四：ES5定义了Array.isArray:
Array.isArray([]) //true
```