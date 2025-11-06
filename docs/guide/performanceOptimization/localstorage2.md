# 存储篇优化 - 本地缓存

<b> 前言： 从 Cookie 到 Web Storage、IndexedDB </b>

随着移动网络的发展与演化，我们手机上现在除了有原生 App，还能跑“WebApp”——它即开即用，用完即走。WebApp 优异的性能表现，要归功于浏览器存储技术的广泛应用——这其中除了我们上节提到的缓存，本地存储技术也功不可没。

<h3>第一章 Cookie的由来</h3>

Cookie的本职工作并非存储，而是“维持状态”。

在Web端早期时，Http被设计成无状态协议，服务器接受并返回客户端资源。故事就结束了，并没有留下关于客户端的任何信息。那么下次请求的时候，怎么让客户端知道 “我是我” 呢？

这样的背景下，Cookie应用而生。

简单的说Cookie就是存储在浏览器上的一个小小的文本文件，它附着在Http请求上，在浏览器和服务器之间“飞来飞去”。它可以携带信息，当服务器检查Cookie时，便可以获取客户端状态。

关于 Cookie 的详细内容，我们可以在 Chrome 的 Application 面板中查看到：

![](https://i.loli.net/2020/03/11/H3ijKLWBOl4dFeM.png)

如大家所见，<b> Cookie 以键值对的形式存在。 </b>

<font size=4><b>Cookie的性能劣势</b></font>

1. <b>Cookie 最大体积不得超过4Kb </b>
2. <b>过量的Cookie带来巨大的性能浪费 </b>

Cookie 是紧跟域名的。我们通过响应头里的 Set-Cookie 指定要存储的 Cookie 值。默认情况下，domain 被设置为设置 Cookie 页面的主机名，我们也可以手动设置 domain 的值：
``` Set-Cookie: name=xiuyan; domain=xiuyan.me ```

3. <b>同一个域名下的所有请求，都会携带 Cookie。</b>

大家试想，如果我们此刻仅仅是请求一张图片或者一个 CSS 文件，我们也要携带一个 Cookie 跑来跑去（关键是 Cookie 里存储的信息我现在并不需要），随着请求的叠加，这样的不必要的 Cookie 带来的开销将是无法想象的。

随着前端应用复杂度的提高，Cookie 也渐渐演化为了一个“存储多面手”——它不仅仅被用于维持状态，还被塞入了一些乱七八糟的其它信息，被迫承担起了本地存储的“重任”。在没有更好的本地存储解决方案的年代里，Cookie 小小的身体里承载了 4KB 内存所不能承受的压力。

为了弥补 Cookie 的局限性，让“专业的人做专业的事情”，Web Storage 出现了。

<h3>第二章 Web Storage登场</h3>

- 存储容量大： Web Storage 根据浏览器的不同，存储容量可以达到 5-10M 之间。
- 仅位于浏览器端，不与服务端发生通信。


<b> Web Storage 核心 API 使用示例 </b>

Web Storage 保存的数据内容和 Cookie 一样，是文本内容，以键值对的形式存在。Local Storage 与 Session Storage 在 API 方面无异，这里我们以 localStorage 为例：

1. 存储数据：setItem()   ``` localStorage.setItem('user_name', 'xiuyan') ```
2. 读取数据： getItem()     ``` localStorage.getItem('user_name') ```
3. 删除某一键名对应的数据： removeItem()     ``` localStorage.removeItem('user_name') ```
4. 清空数据记录：clear()     ``` localStorage.clear() ```

<b> 应用场景 </b>
<b> Local Storage </b>

Local Storage 在存储方面没有什么特别的限制，理论上 Cookie 无法胜任的、可以用简单的键值对来存取的数据存储任务，都可以交给 Local Storage 来做。

这里给大家举个例子，考虑到 Local Storage 的特点之一是持久，有时我们更倾向于用它来存储一些内容稳定的资源。比如图片内容丰富的电商网站会用它来存储 Base64 格式的图片字符串：

![微信图片_20200311093106.png](https://i.loli.net/2020/03/11/MQF5LNjugkBUVGf.png)

有的网站还会用它存储一些不经常更新的 CSS、JS 等静态资源。

<b> Session Storage </b>

Session Storage 更适合用来存储生命周期和它同步的<b>会话级别</b>的信息。这些信息只适用于当前会话，当你开启新的会话时，它也需要相应的更新或释放。比如微博的 Session Storage 就主要是存储你本次会话的浏览足迹：

![微信图片_20200311093246.png](https://i.loli.net/2020/03/11/jpHKFJrcNz8oaIh.png)

lasturl 对应的就是你上一次访问的 URL 地址，这个地址是即时的。当你切换 URL 时，它随之更新，当你关闭页面时，数据自动销毁。这样的数据用 Session Storage 来处理再合适不过。

这样看来，Web Storage 确实也够强大了。那么 Web Storage 是否能 hold 住所有的存储场景呢？

答案是否定的。大家也看到了，Web Storage 是一个从定义到使用都非常简单的东西。它使用键值对的形式进行存储，这种模式有点类似于对象，却甚至连对象都不是——它只能存储字符串，要想得到对象，我们还需要先对字符串进行一轮解析。

说到底，Web Storage 是对 Cookie 的拓展，它只能用于存储少量的简单数据。当遇到大规模的、结构复杂的数据时，Web Storage 也爱莫能助了。这时候我们就要清楚我们的终极大 boss——IndexedDB！


<h3>第三章 终极形态：IndexedDB</h3>

IndexedDB 是一个<b>运行在浏览器上的非关系型数据库。</b> 既然是数据库了，那就不是 5M、10M 这样小打小闹级别了。理论上来说，IndexedDB 是没有存储上限的（一般来说不会小于 250M）。它不仅可以存储字符串，还可以存储二进制数据。

IndexedDB 从推出之日起，其优质教程就层出不绝，我们今天不再着重讲解它的详细操作。接下来，我们遵循 MDN 推荐的操作模式，通过一个基本的 IndexedDB 使用流程，旨在对 IndexedDB 形成一个感性的认知：

1. 打开/创建一个 IndexedDB 数据库（当该数据库不存在时，open 方法会直接创建一个名为 xiaoceDB 新数据库）。

```
  // 后面的回调中，我们可以通过event.target.result拿到数据库实例
  let db
  // 参数1位数据库名，参数2为版本号
  const request = window.indexedDB.open("xiaoceDB", 1)
  // 使用IndexedDB失败时的监听函数
  request.onerror = function(event) {
     console.log('无法使用IndexedDB')
   }
  // 成功
  request.onsuccess  = function(event){
    // 此处就可以获取到db实例
    db = event.target.result
    console.log("你打开了IndexedDB")
  }
```

2. 创建一个 object store（object store 对标到数据库中的“表”单位）。
```
    // onupgradeneeded事件会在初始化数据库/版本发生更新时被调用，我们在它的监听函数中创建object store
    request.onupgradeneeded = function(event){
    let objectStore
    // 如果同名表未被创建过，则新建test表
    if (!db.objectStoreNames.contains('test')) {
        objectStore = db.createObjectStore('test', { keyPath: 'id' })
    }
    }  
```

3. 构建一个事务来执行一些数据库操作，像增加或提取数据等。
```
 // 创建事务，指定表格名称和读写权限
  const transaction = db.transaction(["test"],"readwrite")
  // 拿到Object Store对象
  const objectStore = transaction.objectStore("test")
  // 向表格写入数据
  objectStore.add({id: 1, name: 'xiuyan'})
```

4. 通过监听正确类型的事件以等待操作完成。

```
 // 操作成功时的监听函数
  transaction.oncomplete = function(event) {
    console.log("操作成功")
  }
  // 操作失败时的监听函数
  transaction.onerror = function(event) {
    console.log("这里有一个Error")
  }
```

<b> IndexedDB 的应用场景 </b>

通过上面的示例大家可以看出，在 IndexedDB 中，我们可以创建多个数据库，一个数据库中创建多张表，一张表中存储多条数据——这足以 hold 住复杂的结构性数据。IndexedDB 可以看做是 LocalStorage 的一个升级，当数据的复杂度和规模上升到了 LocalStorage 无法解决的程度，我们毫无疑问可以请出 IndexedDB 来帮忙。

浏览器缓存/存储技术的出现和发展，为我们的前端应用带来了无限的转机。近年来基于缓存/存储技术的第三方库层出不绝，此外还衍生出了 [PWA](https://lavas.baidu.com/pwa) 这样优秀的 Web 应用模型。可以说，现代前端应用，尤其是移动端应用，之所以可以发展到在体验上叫板 Native 的地步，主要就是仰仗缓存/存储立下的汗马功劳。