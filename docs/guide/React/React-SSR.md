# React-SSR 服务器端渲染

## 一 React-SSR 和 React-CSR（浏览器端渲染）区别：
1. 服务器端渲染：在服务器端生成HTML，浏览器端直接渲染。
2. 浏览器端渲染：浏览器端请求bundle.js，然后渲染。
3. 下面给大家上传一张对比图：
![](https://i.loli.net/2019/06/14/5d0352b89f1c994323.png)

## 二 React-SSR的优点：
1. 有利于SEO
2. 减少首屏加载时间

## 三 SSR和CSR的渲染流程对比：
1. 先上SSR的渲染流程
![](https://i.loli.net/2019/06/14/5d038148a137961858.png)

2. 接下来是CSR的渲染流程：
![](https://i.loli.net/2019/06/14/5d03816f4ea4e47365.png)

## 四 为什么会用到同构：
1. SSR是由服务器直接返回已经生成好的HTML文档。正是因为服务器端只能返回HTML，而用户的点击事件需要的Js操作，还是要在浏览器端加载的。
2. 什么是同构？<br />
同构是指一套代码在服务器端和浏览器端各构建一遍。(比如SSR服务器端只构建HTMl，浏览器端只构建JS逻辑。)
3. SSR渲染流程如下：<br />
服务器端运行react代码，渲染出HTML ----》<br />
发送HTMl给浏览器端  -----》 <br />
浏览器端接收内容展示 -----》 <br />
加载js文件 ----》 <br />
js中的react代码在浏览器端重新执行 -----》<br />
js中的react代码接管页面操作（完毕）<br />

## 6-3 axios中的instance的使用
![WechatIMG7.jpeg](https://i.loli.net/2019/10/17/BJHxDisRypYEhqN.jpg)
当前代码中，在containers/Home/store/actions.js路径的异步请求中，会有很多类似Home的组件，假如每个组件都这样发送请求不利于项目的维护性。那应该怎样解决呢？<br>
<b>解决办法：</b>为了项目的维护性，决定创建一个接口请求的文件request.js。这里就用到了axios的instance。
先附上instance的使用说明：
![instance.png](https://i.loli.net/2019/10/17/CMzJgXaK942qujH.png)

创建一个axios实例，baseURL参数来接收地址（以浏览器端为例，服务器端同理）：

![WechatIMG5.png](https://i.loli.net/2019/10/17/abEj2wU4FrLRyhm.png)

再来看actions.js文件，代码简化，只需要根据server的值来判断调用哪个实例即可。
![WechatIMG6.jpeg](https://i.loli.net/2019/10/17/FNJrBj68To4iE9Q.jpg)



## 6-4 react-redux中的withExtraArgument

需要接收“是否为服务端”的布尔值，再发送请求来判断当前使用的路径（服务端路径为全路径，浏览器端路径为相对路径）。<br>这样每个接口在浏览器端和服务器端发送请求时，都需要传值，做出判断后决定调用哪个路径，复杂且容易出错。


## 6-5 renderRoutes方法实现对多级路由的支持 <br>（当页面访问/根路径开头的地址时，默认加载一级路由 Head组件）
<b> 思考：</b><br>在Home组件和Login组件中，Head组件分别被引入了两次。如果有更多的页面都需要加载Head组件，写的代码会比较冗余。怎么解决呢？<br>这个时候，就会用到<b>多级路由</b>的概念。如下图所示：

![1.jpeg](https://i.loli.net/2019/10/15/mg1M8cZLV6owyA2.jpg)
多级路由的核心思想就是：使用react-router-config插件中的renderRoutes方法。<br>
<b>首先渲染一级路由，当进入二级路由时，把二级路由的信息带到对应的组件里去，在App.js组件通过props.route.routes获取二级路由的信息。</b>

## 6-6 登陆功能的制作（动态显示导航栏）

