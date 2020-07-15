# Taro 小程序架构设计

1. 项目结构目录：
<br> 
<img src="https://i.loli.net/2020/07/15/g4djDNwMluKXYHI.png" width = "225" height = auto alt="图片名称" align=center />

<b> assets </b> 存放静态资源，主要是图片。不过由于小程序对体积大小比较重视，建议转为base64 或者 https 形式。<br> 

<b>components</b> 存放小程序通用组件<br> 

<b>constants</b>  重点说：
<img src="https://i.loli.net/2020/07/15/Axlp9VoK6NSrRC4.png" width = "165" height = auto alt="图片名称" align=top /><br> 
  <i>constants.ts文件：</i> 用于存放项目中对一些固定的常量，比如课程类型，课程简称， token有效期时间， loading动画等 <br> 
  <i>network.config.ts文件：</i> 用于存放接口地址。所有接口地址放在一个文件维护。原因：有时候，后台服务升级或者服务切换，需要改接口地址。只需要改这一个文件即可。如果写在请求中，改动的文件会很多。<br> 
  <i>router.config.ts文件：</i> 用于存放路由地址，所有页面的路由地址集中管理。<br> 
  <i>storage.config.ts文件：</i> 用于存放本地缓存方法中的key值，将字符串存到对象中的key。统一维护，便于管理<br> 

<b>page</b> 存放按照模块、业务功能划分的页面 <br> 

<b>service</b> 存放封装的接口请求方法。重点说：
<img src="https://i.loli.net/2020/07/15/EkenQJ9Y76RSj2p.png" width = "205" height = auto alt="图片名称" align=top /><br> 
<i>BaseRequest.ts文件：</i> 项目中封装的接口通用请求方法，存放于此。包括：request请求参数、通用返回参数、封装的请求主体方法、常用的get、 post 、 put请求方法、抛错方法、服务器需要的参数（时间戳等）<br> 
<i>storage.service.ts文件：</i> 本地缓存读取、写入的一些方法。此处的key值是storage.config.ts赋值的常量<br> 
<i>其它文件：</i>其余的文件是各个页面封装的接口的请求方法。注意写好注释和文档地址。<br> 

<b>store</b>  维护全局变量的数据管理仓库。当全局变量在项目中任何一个地方改变值，各级页面都应获取最新值。<br> 

<b>utils</b> 存放一些通用的方法。<br> 
<i>router.ts文件：</i>从taro路由跳转的基础上封装一些路由跳转的方法。因为小程序对路由的页面层级有一定的要起。所以，在选择页面跳转时，应该选择适当的方法。<br>
<i>util.ts文件：</i>封装符合业务逻辑的一些常用的方法。包括，时间、日期的格式化、toast提示、loading、机型判断、号码验证、学季等<br>

<b>app.tsx</b> 类似微信小程序的json文件，一些项目配置，插件引入在此文件中开发。<br>
<b>app.scss</b> 全局scss样式<br>
<b>index.html</b>根页面<br>

