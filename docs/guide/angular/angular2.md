# Angular 项目结构 (2-1)

<b> 1. taskmgr项目目录结构 </b>

![](https://user-gold-cdn.xitu.io/2020/3/16/170e391bdcfbb4c4?w=672&h=572&f=png&s=375667)

<b> 整理：</b>

```
项目       
│
└─── 根模块 
│   
└─── 核心模块 (非特性模块)
|    └── 服务模块
|    └── Reducer 模块
|    └── Effects 模块
|
└─── 共享模块
     └── 登录模块
     |    └──登录 / 注册
     |
     └── 项目模块（懒加载）
     |    └── 项目列表 / 项目卡片 / 增 改 删 操作 / 邀请成员等
     |   
     └── 任务模块（懒加载）
     |    └── 任务主视图 / 任务分组列表 / 任务列表 / 任务条目等
     |
     └── 日历模块（懒加载）
          └── 日历视图
```

<b> 2. 创建项目 </b>

ng new taskmgr -si --style=scss <br>
不支持-si简写的话：
ng new taskmgr --skip-install --style=scss 


<b> 3. 开发模块</b>
- 先下载依赖：npm install 
- 创建核心模块： ng g m core <br>
  m: module
```
规则：如何让 core模块 在系统中只加载一次 ？
解决：反依赖注入 
    SkipSelf() 正常情况会反复引用CoreModule，该次注入避免陷入无限循环。 
    Optional() 第一次加载CoreModule时，如果没有，就构造该函数；
                                        如果有，就继续往下执行；

如图：
```
![](https://user-gold-cdn.xitu.io/2020/3/16/170e3927c5781b1d?w=790&h=223&f=png&s=115211)

- 创建共享模块： ng g m share  把某些模块导入并导出，比如CommomModule,当某个组件需要该模块时，只需要导入 ShareModule。 如图：
    
![](https://user-gold-cdn.xitu.io/2020/3/16/170e39df86ee1330?w=732&h=206&f=png&s=102792)  

- 在appModule中，导入coreModule。 如图：

![](https://user-gold-cdn.xitu.io/2020/3/16/170e39d045b9effc?w=739&h=234&f=png&s=117876)

<b> 4. 领域关系 - 项目对象关系 </b>

一个任务可以有多个用户； <br >
一个用户可以有多个任务









