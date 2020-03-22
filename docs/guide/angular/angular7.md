# Angular 依赖注入 （4-1）

<h3>1. 什么是依赖性注入？ </h3>

是一种设计模式，依赖性注入框架

 <b>Angular提供的依赖注入框架 </b>

- 依赖注入：先有依赖，后有注入
- 把依赖写在contructor里，同时在providers里做配置。 
- 依赖写完后，angular会自动注入。
- 这时，保证组件必备有一个@Injectable修饰符

<h3>2. 依赖注入的两种方式： </h3>

 <b>起因：</b> Products 组件里面放了product相关的各种信息，
但是这些信息不是被这个组件独享的，
我们想到这些组件是公共的，我们应该把它放到service里。

<b>1. 创建：</b>我们通过```Ng g service/product``` 命令创建了一个product服务。 
并把公用的数据类型和方法放在了其中。

<b>2. 依赖：(自己写依赖)（全局配置）</b> 下面把这个服务提供给别的组件使用，在app.moduls里面做配置，写在providers里面。 ``` providers:[ ProductService ] ``` 所有的组件都可以使用该服务了。

<b>3. 注入：（Angular负责注入）</b>在需要使用的组件的 constructor 中接收。
``` constructor(productService: productService) {} ``` 

什么是依赖注入？组件在实例化的过程中，依赖外部的某个服务，Angular负责将该服务注入。

依赖需要手动声明，注入是Angular自动化的。

<b>4. 依赖注入的另一种方式：(局部配置)</b> 在当前组件的```@Component({})``` 中注入 ``` providers:[ ProductService ] ```

::: tip 关于 局部注入（组件注入）的注意：
1. 组件注入方式别的组件无法使用。
2. 组件注入的优先级高于全局注入的优先级
::: 

<b> 默认方式(useClass)： </b>

此时，假如productService升级，app.module.ts中随之改变：

```
providers: [
    {
        provide: ProductService,      // services的标识符
        useClass: OtherProductService  //  provide的具体注入值， 注入名称依然是ProductService 
    }
]
```

<b> 工程模式(useFactory): </b>

```
providers: [
    {
        provide: TestService,    
        useFactory: factoryFunc  
    }
]
```

<b> 与useClass的区别：需要手动创建 factoryFunc 函数， 给到 useFactory </b>

```

// 传入的参数不同，返回的值不同。像一个工厂
export const factoryFunc = () => {  
    return new TestService();
}

```


<b> 参数订阅 和 参数快照 </b>

一旦当前页面被执行，就可以从constructor中依赖注入的变量中取参数，两种方式。参数订阅 和 参数快照。

<b>

订阅：时时更新

快照：某一时刻的照片，不会时时更新

</b>




