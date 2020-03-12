# 网络层优化 - 请求层

## 第一章  webpack性能调优 <br>
<b>Http优化：减少请求次数； 减少单次请求花费的时间</b><br>
这两个问题直指我们日常开发中的常见操作——资源的压缩与合并。就是我们每天用的构建工具霸主：webpack

<b>webpack优化瓶颈在两个方面：</b>
1. webpack 的构建过程太花时间
2. webpack 打包的结果体积太大

```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

解决：减少loader做太多事情 --- 以babel-loader为例子
每个项目都会用到babel-loader加载器，它是强大，但也是慢的。
我们最常用的就是使用include和exclude来避免不必要的转移（比如：node——modules）。但是，通过限定文件，带来的性能提升是有限的。除此之外，我们可以开启缓存，将转译记过缓存至系统文件，至少可以将bable-loader的工作效率提升两倍。```loader: 'babel-loader?cacheDirectory=true'```

<br> <b>不要放过第三方库</b>
第三方库以 node_modules 为代表，它们庞大得可怕，却又不可或缺。
于对效率的考虑，我们这里为大家推荐 DllPlugin。

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。

用 DllPlugin 处理文件，要分两步走：

基于 dll 专属的配置文件，打包 dll 库
基于 webpack.config.js 文件，打包业务代码

以一个基于 React 的简单项目为例，我们的 dll 的配置文件可以编写如下：
```
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
      // 依赖的库数组
      vendor: [
        'prop-types',
        'babel-polyfill',
        'react',
        'react-dom',
        'react-router-dom',
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.DllPlugin({
        // DllPlugin的name属性需要和libary保持一致
        name: '[name]_[hash]',
        path: path.join(__dirname, 'dist', '[name]-manifest.json'),
        // context需要和webpack.config.js保持一致
        context: __dirname,
      }),
    ],
}
```

<b>Happypack——将 loader 由单进程转为多进程</b>
webpack 是单线程的，就算此刻存在多个任务，你也只能排队一个接一个地等待处理。这是 webpack 的缺点，好在我们的 CPU 是多核的，Happypack 会充分释放 CPU 在多核并发方面的优势，帮我们把任务分解给多个子进程去并发执行，大大提升打包效率。

只需要我们把对 loader 的配置转移到 HappyPack 中去就好，我们可以手动告诉 HappyPack 我们需要多少个并发的进程：
```
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        loader: 'happypack/loader?id=happyBabel',
        ...
      },
    ],
  },
  plugins: [
    ...
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  ],
}

```




2. 构建结果体积压缩
<b>文件结构可视化，找出导致体积过大的原因</b>
这里为大家介绍一个非常好用的包组成可视化工具——[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)，配置方法和普通的 plugin 无异，它会以矩形树图的形式将包内各个模块的大小和依赖关系呈现出来，格局如官方所提供这张图所示：
![165d838010b20a4c.gif](https://i.loli.net/2020/03/09/DZeAWIXLmK5Qosk.gif)

在使用时，我们只需要将其以插件的形式引入：
```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

3. 删除冗余代码
一个比较典型的应用，就是 Tree-Shaking。
这里我们以当下接受度较高的 UglifyJsPlugin 为例，看一下如何在压缩过程中对碎片化的冗余代码（如 console 语句、注释等）进行自动化删除：
```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
 plugins: [
   new UglifyJsPlugin({
     // 允许并发
     parallel: true,
     // 开启缓存
     cache: true,
     compress: {
       // 删除所有的console语句    
       drop_console: true,
       // 把使用多次的静态值自动定义为变量
       reduce_vars: true,
     },
     output: {
       // 不保留注释
       comment: false,
       // 使输出的代码尽可能紧凑
       beautify: false
     }
   })
 ]
}

```

4. 按需加载
按需加载的思想：<br>

一次不加载完所有的文件内容，只加载此刻需要用到的那部分（会提前做拆分）
<br>当需要更多内容时，再对用到的内容进行即时加载

5. HTTP 压缩 和 Gzip 压缩原理

HTTP 压缩就是以缩小体积为目的，对 HTTP 内容进行重新编码的过程。<br>
Gzip 的内核就是 Deflate，目前我们压缩文件用得最多的就是 Gzip。可以说，Gzip 就是 HTTP 压缩的经典例题。


## 第二章 图片的优化

<b> 不同业务场景下的图片方案选型 </b><br>
二进制位数与色彩的关系: 在计算机中，像素用二进制数来表示。不同的图片格式中像素与二进制位数之间的对应关系是不同的。一个像素对应的二进制位数越多，它可以表示的颜色种类就越多，成像效果也就越细腻，文件体积相应也会越大。<br>

一个二进制位表示两种颜色（0|1 对应黑|白），如果一种图片格式对应的二进制位数有 n 个，那么它就可以呈现 2^n 种颜色。
<br>

时下应用较为广泛的 Web 图片格式有 JPEG/JPG、PNG、WebP、Base64、SVG 等，我制作了一个表格，方便大家记录他们之间的区别：

|  类型  | .jpg   |  .png  | .svg  | base64 |WebP |
|  ----  | ----   |  ----  | ----  |----  | --- |
|  特点  | 有损压缩；色彩丰富 |  无损压缩、质量高、体积大、支持透明| 可缩放矢量图形；图片可无限放大而不失真；体积小；兼容性好 | 文本文件、依赖编码、小图标解决方案 | Google 专为 Web 开发的一种旨在加快图片加载速度的图片格式，它支持有损压缩和无损压缩 |
|  适用场景  | 大的背景图、轮播图或 Banner 图 |  呈现小的 Logo、颜色简单且对比强烈的图片或背景  | 1. 写代码一样定义 SVG，把它写在 HTML 里、成为 DOM 的一部分，<br>2. 把对图形的描述写入以 .svg 为后缀的独立文件 | 非常小的 Logo |  WebP 像 JPEG 一样对细节丰富的图片信手拈来，像 PNG 一样支持透明，像 GIF 一样可以显示动态图片——它集多种图片文件格式的优点于一身 |
|  缺陷  | 1. 处理矢量图形和 Logo 等线条感较强、颜色对比强烈的图像时，会比较模糊；<br>2. 不支持透明度处理 |  体积太大  | 1. 设计SVG可能会变得复杂<br>2. 在某些版本过低的浏览器上无法呈现<br>3. 电子邮件客户端支持有限 | Base64 编码后，图片大小会膨胀为原文件的 4/3（这是由 Base64 的编码原理决定的）| 兼容性不好 |