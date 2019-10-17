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








