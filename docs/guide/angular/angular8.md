# Angular基础知识 （4-2）

<h3> 1. 组件的封装、组件之间的数据传递</h3>

执行```ng g component xxx```, 就会默认在app路径下注册组件，并在app.module.ts中引入地址。

<b>组件之间的通讯会有3种关系:</b>

1. 父子关系
2. 兄弟关系
3. 没有直接关系

通常采用下列方式处理(某些方式是框架特有)组件间的通讯, 如下:

1. 父子组件之间的交互(@Input/@Output/模板变量/@ViewChild)
2. 非父子组件(Service/localStorage)
3. 还可以利用Session等服务器端的解决方法


<b> 1-1 父子组件数据传递</b>

:::tip 1-1-1 在父组件设置子组件上面的的属性

通过@input绑定子组件的属性,注意属性得是公开public的,私有private属性是无法传递的

es6新语法get/set.为属性提供了一个方便习惯的读/写方式, 拦截属性的存取行为。

在父组件设置该属性,就能够通过set方法来修改,从而实现在父组件设置子组件属性

代码如下
:::

子组件header.component.ts:

![](https://user-gold-cdn.xitu.io/2020/3/22/17102f3f57bce321?w=1023&h=622&f=png&s=37449)

父组件app.component.html:
![](https://user-gold-cdn.xitu.io/2020/3/22/17102f431fc28e1a?w=710&h=260&f=png&s=8712)

:::tip 1-1-2 父组件直接调用子组件的方法
    
通过模板内部定义子组件变量,在父组件上可以直接调用子组件的方法,如下:

:::

子组件header.component.ts:

![](https://user-gold-cdn.xitu.io/2020/3/23/1710307b99f7bbd1?w=930&h=670&f=png&s=53032)

父组件app.component.html:

![](https://user-gold-cdn.xitu.io/2020/3/23/1710308985473fdb?w=880&h=245&f=png&s=23391)


:::tip 1-1-3 父组件接受子组件派发的事件
    
通过@Output在子组件绑定一个事件发射器,在父组件通过事件绑定监听该事件

这样在子组件派发一个事件,父组件就能够收到。如下

:::

子组件footer.component.ts:

![](https://user-gold-cdn.xitu.io/2020/3/23/171030ab961597d5?w=919&h=536&f=png&s=44792)

父组件app.component.html:

![](https://user-gold-cdn.xitu.io/2020/3/23/171030b98baef7b7?w=906&h=243&f=png&s=22484)

















<h3>2. 组件的生命周期 </h3>

<h3>3. 服务 service </h3>

<h3>4. 路由 </h3>