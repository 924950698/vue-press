# 定义函数

```
// 为函数定义类型
function sum(x:number, y:number): number{
    return x + y;
}

// 完整的类型
// number类型变量的定义
let num:number = 10;

// 函数类型变量的定义
let mySum:(x:number, y:number) =>number =   // 指定返回值的类型为number
    function(x:number, y:number): number{
        return x + y;
    }
// 函数由两部分构成：参数的类型 和 函数返回值的类型
// x 和 y 是参数的名字 number是参数的类型
// =>number指的是函数返回值的类型

// 当函数无返回值时，使用void关键字
function test(a: string):void {

}

// 可选形参
// 函数有两个形参b和c, 其中b时可选项, c是必选项，可选项要放在必选项后面
function test2(c:number, b?: number): void{
    console.log(c);
    if(b)  {
        console.log(b)
    }
}
test2(10);
```