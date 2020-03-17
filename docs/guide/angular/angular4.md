# Angular Material (2-3)

<b> 1. [Material UI组件库](https://material.io/) </b>

约束条件：不适合做定制性很强的风格

安装：``` npm i --save @angular/material@2.0.0.7 ```

Side Nav 侧边栏导航

在根模块 app.module.ts引入 MdsideModule

可以引入内建主题

|  类型  | SideNav   |  toolbar  | 
|  ----  | ----   |  ----  | 
|  用途  |   侧边栏导航，同时可以作为容器 | 用于头部、标题栏 |
|侧滑模式| over、push、side | - |
| 使用技巧| 一般和```<md-sidenav-container>```联合使用| 通过```<md-toolbar-row>```支持多行 | 

