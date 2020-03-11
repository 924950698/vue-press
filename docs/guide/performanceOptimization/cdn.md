# CDN小结

<b>CDN 的缓存与回源机制解析</b>

CDN: Content Delivery Network，即内容分发网络。指的是一组分布在各个地区的服务器。这些服务器存储着数据的副本，因此服务器可以根据哪些服务器与用户距离最近，来满足数据的请求。 CDN 提供快速服务，较少受高流量影响。

<b>为什么要用CDN？</b>

缓存、本地存储带来的性能提升，是只在“获取资源并存起来”以后做提升。而提升首次请求响应的能力，还需要用到CDN。

<b>CDN如何工作的？</b>

此时有一位北京的用户向我请求资源。在网络带宽小、用户访问量大的情况下，杭州的这一台服务器或许不那么给力，不能给用户非常快的响应速度。于是我灵机一动，把这批资源 copy 了一批放在北京的机房里。当用户请求资源时，就近请求北京的服务器，北京这台服务器低头一看，这个资源我存了，离得这么近，响应速度肯定噌噌的！那如果北京这台服务器没有 copy 这批资源呢？它会再向杭州的根服务器去要这个资源。在这个过程中，北京这台服务器就扮演着 CDN 的角色

<b>CDN的核心功能特写</b>

CDN 的核心点有两个，<b>一个是缓存，一个是回源。</b>

这两个概念都非常好理解。对标到上面描述的过程，“缓存”就是说我们把资源 copy 一份到 CDN 服务器上这个过程，“回源”就是说 CDN 发现自己没有这个资源（一般是缓存的数据过期了），转头向根服务器（或者它的上层服务器）去要这个资源的过程。

<b> CDN 与前端性能优化</b>

CDN 往往被用来存放静态资源。上文中我们举例所提到的“根服务器”本质上是业务服务器，它的核心任务在于生成动态页面或返回非纯静态页面，这两种过程都是需要计算的。业务服务器仿佛一个车间，车间里运转的机器轰鸣着为我们产出所需的资源；相比之下，CDN 服务器则像一个仓库，它只充当资源的“栖息地”和“搬运工”。

所谓“静态资源”，就是像 JS、CSS、图片等<b>不需要业务服务器进行计算即得的资源</b>。而“动态资源”，顾名思义是需要<b>后端实时动态生成的资源</b>，较为常见的就是 JSP、ASP 或者依赖服务端渲染得到的 HTML 页面。

什么是“非纯静态资源”呢？它是指<b>需要服务器在页面之外作额外计算的 HTML 页面</b>。具体来说，当我打开某一网站之前，该网站需要通过权限认证等一系列手段确认我的身份、进而决定是否要把 HTML 页面呈现给我。这种情况下 HTML 确实是静态的，但它<b>和业务服务器的操作耦合</b>，我们把它丢到CDN 上显然是不合适的。

<b> CDN 的实际应用 </b>

静态资源本身具有访问频率高、承接流量大的特点，因此静态资源加载速度始终是前端性能的一个非常关键的指标。CDN 是静态资源提速的重要手段，在许多一线的互联网公司，“静态资源走 CDN”并不是一个建议，而是一个规定。

比如以淘宝为代表的阿里系产品，就遵循着这个“规定”。
打开淘宝首页，我们可以在 Network 面板中看到，“非纯静态”的 HTML 页面，是向业务服务器请求来的：

![微信图片_20200311130954.png](https://i.loli.net/2020/03/11/Y3GrvQb6zLs5EUZ.png)

我们点击 preview，可以看到业务服务器确实是返回给了我们一个尚未被静态资源加持过的简单 HTML 页面，所有的图片内容都是先以一个 div 占位：

![微信图片_20200311131031.png](https://i.loli.net/2020/03/11/7rUZPH1x5juBEAm.png)

相应地，我们随便点开一个静态资源，可以看到它都是从 CDN 服务器上请求来的。

比如说图片：

![微信图片_20200311131114.png](https://i.loli.net/2020/03/11/2dx9f7OmRg5EMoC.png)

再比如 JS、CSS 文件：

![微信图片_20200311131136.png](https://i.loli.net/2020/03/11/1XVerRDnZks8ozv.png)

![微信图片_20200311131139.png](https://i.loli.net/2020/03/11/c8i3BVbaWfES17j.png)


<b> CDN 优化细节</b>

如何让 CDN 的效用最大化？这又是需要前后端程序员一起思考的庞大命题。它涉及到 CDN 服务器本身的性能优化、CDN 节点的地址选取等。但我们今天不写高深的论文，只谈离前端最近的这部分细节：CDN 的域名选取。

大家先回头看一下我刚刚选取的淘宝首页的例子，我们注意到业务服务器的域名是这个：

``` www.taobao.com```

而 CDN 服务器的域名是这个：

``` g.alicdn.com ```

同一个域名下的请求会不分青红皂白地携带 Cookie，而静态资源往往并不需要 Cookie 携带什么认证信息。把静态资源和主页面置于不同的域名下，完美地避免了不必要的 Cookie 的出现！

看起来是一个不起眼的小细节，但带来的效用却是惊人的。以电商网站静态资源的流量之庞大，如果没把这个多余的 Cookie 拿下来，不仅用户体验会大打折扣，每年因性能浪费带来的经济开销也将是一个非常恐怖的数字。

如此看来，性能优化还真是要步步为营！

![微信图片_20200311085822.png](https://i.loli.net/2020/03/11/qj3f6rEitGD5T4C.png)