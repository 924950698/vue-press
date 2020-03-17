# Angular UI组件  (2-2)

<b> 1. 将header/footer/sidebar组件添加到核心组件 </b>

执行命令：``` ng g c core/header --skipTests=false```   

g: generate  创建 产生 .vt 及物动词指的是这类词性的单词后面可以直接加物品的名称，也就是名词。

--skipTests=false   不使用测试 （已经不兼容部分旧API）

同样的方法建立footer和sidebar

创建以后，会自动在core模块下引入

需要手动在exports 数组中导出

此时应该可以正常访问页面

<b> 2. 编写样式 </b> 

src目录下的 styles.scss 编写全局的样式

设置 撑满容器等

介绍flex布局


