# 应用篇 - 懒加载

::: tip 优化首屏体验 —— Lazy-Load初探 

一些其他常见的优化手段。 
::: 

<H3>Lazy-Load 探讨</h3>

Lazy-Load，翻译过来是“懒加载”。它是针对图片加载时机的优化：在一些图片量比较大的网站（比如电商网站首页，或者团购网站、小游戏首页等），如果我们尝试在用户打开页面的时候，就把所有的图片资源加载完毕，那么很可能会造成白屏、卡顿等现象，因为图片真的太多了，一口气处理这么多任务，浏览器做不到啊！

其实，在用户点开页面的瞬间，呈现给他的只有屏幕的一部分（我们称之为首屏）。只要我们可以在页面打开的时候把首屏的图片资源加载出来，用户就会认为页面是没问题的。至于下面的图片，我们完全可以等用户下拉的瞬间再即时去请求、即时呈现给他。这样一来，性能的压力小了，用户的体验却没有变差——这个延迟加载的过程，就是 Lazy-Load。

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Lazy-Load</title>
  <style>
    .img {
      width: 200px;
      height:200px;
      background-color: gray;
    }
    .pic {
      // 必要的img样式
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="img">
      // 注意我们并没有为它引入真实的src
      <img class="pic" alt="加载中" data-src="./images/1.png">
    </div>
    <div class="img">
      <img class="pic" alt="加载中" data-src="./images/2.png">
    </div>
    <div class="img">
      <img class="pic" alt="加载中" data-src="./images/3.png">
    </div>
    <div class="img">
      <img class="pic" alt="加载中" data-src="./images/4.png">
    </div>
    <div class="img">
      <img class="pic" alt="加载中" data-src="./images/5.png">
    </div>
     <div class="img">
      <img class="pic" alt="加载中" data-src="./images/6.png">
    </div>
     <div class="img">
      <img class="pic" alt="加载中" data-src="./images/7.png">
    </div>
     <div class="img">
      <img class="pic" alt="加载中" data-src="./images/8.png">
    </div>
     <div class="img">
      <img class="pic" alt="加载中" data-src="./images/9.png">
    </div>
     <div class="img">
      <img class="pic" alt="加载中" data-src="./images/10.png">
    </div>
  </div>
</body>
</html>

```
在懒加载的实现中，有两个关键的数值：<b>一个是当前可视区域的高度，另一个是元素距离可视区域顶部的高度。</b>

当前可视区域的高度， 在和现代浏览器及 IE9 以上的浏览器中，可以用 window.innerHeight 属性获取。在低版本 IE 的标准模式中，可以用 document.documentElement.clientHeight 获取，这里我们兼容两种情况：

``` const viewHeight = window.innerHeight || document.documentElement.clientHeight ```

而元素距离可视区域顶部的高度，我们这里选用 getBoundingClientRect() 方法来获取返回元素的大小及其相对于视口的位置。

::: tip 对此 MDN 给出了非常清晰的解释：
该方法的返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合, 即：是与该元素相关的 CSS 边框集合 。
<br>
 DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right 和 bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
:::

其中需要引起我们注意的就是 left、top、right 和 bottom，它们对应到元素上是这样的：

![微信图片_20200312143923.png](https://i.loli.net/2020/03/12/AjGpykzFQtEeY4u.png)

```
<script>
    // 获取所有的图片标签
    const imgs = document.getElementsByTagName('img')
    // 获取可视区域的高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight
    // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
    let num = 0
    function lazyload(){
        for(let i=num; i<imgs.length; i++) {
            // 用可视区域高度减去元素顶部距离可视区域顶部的高度
            let distance = viewHeight - imgs[i].getBoundingClientRect().top
            // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
            if(distance >= 0 ){
                // 给元素写入真实的src，展示图片
                imgs[i].src = imgs[i].getAttribute('data-src')
                // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
                num = i + 1
            }
        }
    }
    // 监听Scroll事件
    window.addEventListener('scroll', lazyload, false);
</script>
```

<b> 小结 </b>

本节我们实现出了一个最基本的懒加载功能。但是大家要注意一点：这个 scroll 事件，是一个危险的事件——它太容易被触发了。试想，用户在访问网页的时候，是不是可以无限次地去触发滚动？尤其是一个页面死活加载不出来的时候，疯狂调戏鼠标滚轮（或者浏览器滚动条）的用户可不在少数啊！

::: warning 注意 
再回头看看我们上面写的代码。按照我们的逻辑，用户的每一次滚动都将触发我们的监听函数。函数执行是吃性能的，频繁地响应某个事件将造成大量不必要的页面计算。因此，我们需要针对那些有可能被频繁触发的事件作进一步地优化。这里就引出了我们下一节的两位主角——throttle 与 debounce。
:::