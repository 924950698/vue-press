# React-SSR 服务器端渲染 [源码链接](https://github.com/924950698/React-SSR)

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
当前代码中，当前containers/Home/store/actions.js路径下发送的异步请求比较复杂，一个项目中会有很多类似Home的组件，每个组件都这样发送请求不利于项目的维护性。那应该怎样解决呢？<br>
<b>解决办法：</b>为了项目后期的维护性，决定创建一个接口请求的文件request.js。这里就用到了axios的instance。
先附上instance的使用说明：
![instance.png](https://i.loli.net/2019/10/17/CMzJgXaK942qujH.png)

创建一个axios实例，baseURL参数来规定统一的前缀（以浏览器端为例，服务器端同理）：

![WechatIMG5.png](https://i.loli.net/2019/10/17/abEj2wU4FrLRyhm.png)

再来看actions.js文件，代码简化，只需要根据server的值来判断调用哪个实例即可。
![WechatIMG6.jpeg](https://i.loli.net/2019/10/17/FNJrBj68To4iE9Q.jpg)

## 6-4 react-redux中的withExtraArgument
还是在Home组件下的actions.js文件中，每一个请求数据的方法中都要区分是服务器发的请求还是浏览器发的请求，需要接受一个server参数（“是否为服务端”的布尔值）。再发送请求来判断当前使用的路径（服务端路径为全路径，浏览器端路径为相对路径）。<br>后期接口增多，这种办法就比较不靠谱了。那么，怎样能够简化呢？
在Home的index.js文件中，getHomeList的请求方法分别是：
1. 服务端时，在```Home.loadData```中发送请求，接收到返回数据时会改变服务器端的store。
2. 浏览器端时，在```componentDidMount```中发送的请求，接收到数据后会改变浏览器端的store。

此时整体流程：页面渲染时，执行Home的index走到上面的两个钩子函数，<br />```Home.loadData```去全局store中调用服务端的getStore方法；同时dispatch触发getHomeList方法。<br />接收到返回数据后传递给store，Home/index通过react-redux的mapStateToProps接收，实现数据的传递。

此时在全局store中，<b>改变服务器端的store内容，一定要使用serverAxios;改变浏览器端的store内容，一定要使用clientAxios。</b>
这时我们可以使用react-thunk中的withExtraArgument方法：
![WechatIMG9.png](https://i.loli.net/2019/10/17/M9gF3z6b5DCxHot.png)

在全局的store中添加withExtraArgument方法：
![WechatIMG8.jpeg](https://i.loli.net/2019/10/17/DOMZoH3pfGx5qd6.jpg)

在Home组件的action异步请求中可以接收到3个参数，第3个参数就是当前分别对应（服务端 / 客户端）的axios的实例：
![WechatIMG10.jpeg](https://i.loli.net/2019/10/17/PWgjzwSKDq9nHXs.jpg)

## 6-5 renderRoutes方法实现对多级路由的支持 <br>（当页面访问/根路径开头的地址时，默认加载一级路由 Head组件）
<b> 思考：</b><br>在Home组件和Login组件中，Head组件分别被引入了两次。如果有更多的页面都需要加载Head组件，写的代码会比较冗余。怎么解决呢？<br>这个时候，就会用到<b>多级路由</b>的概念。如下图所示：

![1.jpeg](https://i.loli.net/2019/10/15/mg1M8cZLV6owyA2.jpg)
多级路由的核心思想就是：使用react-router-config插件中的renderRoutes方法。<br>
<b>首先渲染一级路由，当进入二级路由时，把二级路由的信息带到对应的组件里去，在App.js组件通过props.route.routes获取二级路由的信息。</b>

## 6-6 登陆功能的制作（动态显示导航栏）
想实现当用户登陆时可以动态显示导航栏的方法：
在Header组件中新建一个store，在reducer中模拟接口返回状态，并将header的store注入到全局的store中。此时在Head的index文件中使用react-redux的mapState接收store返回的登陆状态。根据这个状态来动态显示导航栏。
![WechatIMG11.jpeg](https://i.loli.net/2019/10/17/3hysr9iNYLgmP8R.jpg)

## 6-7 登陆接口打通
在Header组件中写一个store，来请求isLogin接口。根据接口返回的数据来判断Head组件显示的导航栏。
将获取用户登陆状态的接口放在了App.js中，在页面访问跟路径的时候，App就应该去请求当前登陆状态了，而不是放在Heade中请求。

## 6-8 登陆状态切换
开发登陆，登出功能。在action中做接口请求，在index中调用action的方法。
问题：每次刷新页面的时候，登陆状态一直在改变。原因：
![WechatIMG12.jpeg](https://i.loli.net/2019/10/17/xtDRWQu1LCaZVmq.jpg)

## 6-9 解决登陆cookie传递问题
上面问题主要原因就是在Node中间层做转发的时候，没有携带cookie，在server中的request.js文件中，导出一个函数，携带上cookie即可。
![WechatIMG13.png](https://i.loli.net/2019/10/18/3bKBnufelgoFjGS.png)

## 6-10 翻译列表页面制作
回顾如何在ssr中开发一个页面？
1. 先在router。js中添加路由
2. 在创建一个页面级别的组件，创建一个index.js，调用store中的内容，回顾react-redux的流程。
3. 接口数据可以渲染到页面上以后，结合业务逻辑做一下权限判断。

## 7-1 secret 值统一管理
创建config文件，实现secret 值统一管理

## 7-2 借助context实现404页面功能
在做服务端渲染，当一个页面不存在时，我们要使其返回的状态码Status为404。怎样实现？<br >
解决：当服务端准备好所有数据以后，server下的index文件会调用utils里的render函数，render函数进行路由传递的时候，会传一个context进去。核心思想还是借助context进行区分页面，如果是404就更改其状态码，如果不是则直接跳转。

## 7-3 实现服务器端301重定向
未登录的情况下，当在浏览器中的地址后输入traslation路径时，页面上显示的还是未登录页面，但是查看网页源代码还是会跳转到translation页面。这是因为服务器端没有做重定向。那应该怎么解决呢？
解决：在服务器端遇到上述的情况时，staticRouter结合renderRouters时发现redirect会在context中添加一段代码。可以利用这段代码中的action值来进行301重定向的判断。

## 7-4 数据请求失败的情况下，promise的处理
服务端渲染，在请求首页的时候，会请求多个接口。因为用到的promise.all()方法，当一个接口报错时，整个all方法都不会执行then方法。页面都会不显示。此时，在给promise.all()传值的参数中座一层promise判断，使其无论时then还是catch都会返回结果，这样就一定会执行promise.all方法了。

## 8-1 如何支持css样式修饰
在浏览器端和服务端分别使用不同的loader来进行样式处理，在服务端使用isomorphic-style-loader处理css样式。

## 8-2 如何实现css样式的服务器端渲染
在network中勾选disable cache时，刷新页面会明显抖动，原因是服务端没有进行css样式加载。
解决：在服务端渲染时，用componentWillMount中判断当前的执行环境是不是服务器端，是的话，就把当前的css样式注入到context中。
在untils中可以通过context拿到注入的样式，然后进行加载。

## 8-3 多组件中的样式如何整合
将多个组件中的样式存到数组变量中，在服务器端加载时，使用不同的样式。

## 8-4 Loadata方法潜在问题修正
在router.js中，Home.loadata方法与组件真正导出的组件不一致（经过connect连接以后组件发生了改变）。解决方法：将connect方法赋值给变量。

## 8-5 使用高阶组件精简代码
将每个组件下的样式代码整合到一个公共的样式文件中。在高阶组件文件中导出一个函数，在这个函数中反会一个组件（这个组件是对当前的组件和样式进行渲染）
然后在各个组件中将多余的代码（CompenentWillMount）进行删除。使用高阶组件。

## 8-6 列表样式优化
列表样式风格统一

## 9-1 什么是服务端渲染，为什么服务端渲染对seo更加友好？
seo是serch engine optimization 搜索引擎优化

## 9-2 Title和Description的真正作用
这俩者并不能提高搜索引擎排名，但是可以提高网站转换率。

## 9-3 如何做好SEO？
网站3大核心：
1. 多媒体（图片）， 
2. 文字，
3. 连接（内链，外链）

优化：图片高清，内链（网站内部跳转）相关性强，外联（外部网站跳自己网站）越多越有影响力

## 9-4 React-Helmet的使用
定制每个页面的Title和Description。
引入React-Helmet，可以将title和Description放在其中，书写代码，浏览器端可以正常显示。
服务器端需要另外的操作（查看源代码时服务器端没有显示title和meta的内容），utils文件中调用renderStatic()方法，可以获取到在浏览器端的title和meta（Description是写在meta标签中的）标签内容。从而实现服务端渲染。

## 9-6 使用预渲染解决seo优化
使用prerender再启一台服务器进行预渲染。用ngix代理检测是用户访问，还是搜索引擎爬虫范围跟，如果是用户直接访问react服务器，如果是爬虫则访问prerender服务器。
