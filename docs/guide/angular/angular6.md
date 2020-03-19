# Angualr 动画 （3-1）

<b> Animate 函数 </b>

Animate 规定了具体怎么过度，时间、速度等
Animate 有多个重载形式

添加类库： ``` npm i --save @angular/animations ```

在根模块中导入 ``` import { BrowserAnimationsModule } from '@angular/platform-broeser/animations' ```

<b> state 、transition 属性的用法：</b>

![](https://user-gold-cdn.xitu.io/2020/3/17/170e6cbbcb7348b6?w=791&h=422&f=png&s=310374)

<b> 缓动动画 </b>

![](https://user-gold-cdn.xitu.io/2020/3/17/170e6d18b637e7d1?w=849&h=453&f=png&s=422746)

类似Css3 ，使用keyfarmes 定义关键帧

使用[cubic-bezier 函数](https://cubic-bezier.com/#.17,.67,.83,.67) 设置模型值。

在[easeInOutSine](https://easings.net/)中查看缓动值。