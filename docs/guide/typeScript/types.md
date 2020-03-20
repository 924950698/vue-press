# 定义类型

类型推断机制， 初始化什么类型， 数据就是什么类型

```
// 布尔类型
let isDone:boolean = true;

// 字符串类型
let str:string = 'abc';

// 数字类型
let num:number = 10;  //支持进制数

// 数组类型 
let arr:number[] = [1, 2, 3];  //数字类型的数组
let arrStr:string[] = ['a', 'b'];  //字符串类型的数组
// 另外一种方法
let arr2:Array<number> = [1, 2 ,3];

// 元祖 typle （多种类型混合到一种类型中）
// 比如：数组中包括字符串 和 数字
let per:[number, string];
per = [1, 'a'];  // 注意：要按照声明时的顺序赋值

// 枚举 enum （ts对js扩展的体现）
enum Season{Spring, Summer, Autumn, Winter }; //声明一个枚举类型，并且里面有4个值
let season:Season = Season.Spring;

enum Season1{Spring=1, Summer=3, Autumn=5, Winter=7 }; // 下标初始值改成1

let season1:string = Season1[1] // 把Season中下标1的spring赋值到season1中并且改为string类型
// 并且，赋值之前的类型只能继承下来,不能改变

// 任意值 any （开发中不确定类型时，多用到）
let a:number = 10;
let b:any = 4; b = 'string'; // 类型为any时，可以再赋值为别的类型

// null 和 undefined 其他类型的子类型
let c:undefined = undefined; c = 10 //可以把null和undefied类型的变量赋值给其他类型
```