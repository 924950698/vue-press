# 定义类

```
class Person {
    //成员：
    // 属性：
    name: string;
    // 构造函数
    constructor(nameNew:string){
        this.name = nameNew;
    }
    // 方法
    info(){
        return this.name;
    }
}

//实例化一个Person对象
let person = new Person("小明"); 

// 继承 封装 多态
// 子类继承父类
class Animal{
    // 可见度 
    public name: string; // 可以在声明的外部访问
    private sex: string; // 不可以在声明的外部访问
    protected age: number; // 可以在派生类 — 子类中访问
}

class Cat extends Animal{

}
```