# Taro 框架开发小程序环境配置

 <b>1. 环境配置：</b>

```
    # 使用 npm 安装 CLI
    $ npm install -g @tarojs/cli
    # OR 使用 yarn 安装 CLI
    $ yarn global add @tarojs/cli
    # OR 安装了 cnpm，使用 cnpm 安装 CLI
    $ cnpm install -g @tarojs/cli

    安装后执行 taro -v 查看是否成功
```

    [详情见Taro官网](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)



<b>2. 创建Taro项目：</b>

```
如果安装过程出现sass相关的安装错误，请在安装mirror-config-china后重试。
$ npm install -g mirror-config-china

使用命令创建模板项目
taro init myApp

之后会有项目配置选择提示，根据自己项目的需求选择就可以
```

::: tip 提示
<b>建议：</b> 本地环境安装<b> yarn、cnpm、npm</b>这三种包管理工具。<br/>
官方提示：Taro安装使用的工具按照 <b> yarn>cnpm>npm</b> 顺序进行检测。<br/>
而直接使用npm下载依赖或插件会遇到问题。
:::


<b>3.  Taro项目运行： </b>

![微信图片_20200524194022.png](https://i.loli.net/2020/05/24/DuaA41BHCsUp7E3.png)

上图是已经可以运行的Taro项目，可以看到它的package.json有比较多的执行命令。这是因为目前当前taro的版本（V2.2.6）的官方已经支持构建以下九种的小程序

![微信图片_20200524194450.png](https://i.loli.net/2020/05/24/xqaeRFVbAotXzDI.png)


<b>4.  开发工具下载： </b>

Taro 需要运行不同的命令，将 Taro 代码编译成不同端的代码，然后在对应的开发工具中查看效果。<br/>这里我们选择其中的两种：

    [微信小程序开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

    [头条小程序开发工具](https://microapp.bytedance.com/dev/cn/mini-app/develop/developer-instrument/developer-instrument-update-and-download)

    
<b>5.  插件使用： </b>

这里使用的是list-view插件，提供了下拉刷新，上拉加载等功能
安装完依赖后，在项目中使用插件：

```
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import ListView, { LazyBlock } from "taro-listview";
import './index.scss'

const blankList = [
    {
        author: {},
        title: "this is a example"
    },
    {
        author: {},
        title: "this is a example"
    },
    {
        author: {},
        title: "this is a example"
    },
    {
        author: {},
        title: "this is a example"
    }
];

let pageIndex = 1;

export default class Index extends Component {

    state = {
        isLoaded: false,
        error: false,
        hasMore: true,
        isEmpty: false,
        list: blankList
    };


    getData = async (pIndex = pageIndex) => {
        if (pIndex === 1) this.setState({ isLoaded: false });
        const {
            data: { data }
        } = await Taro.request({
            url: "https://cnodejs.org/api/v1/topics",
            data: {
                limit: 10,
                page: pIndex
            }
        });
        console.log({ data });
        return { list: data, hasMore: true, isLoaded: pIndex === 1 };
    };

    componentDidMount() {
        this.refList.fetchInit();
    }

    pullDownRefresh = async () => {
        pageIndex = 1;
        const res = await this.getData(1);
        this.setState(res);
    };

    onScrollToLower = async fn => {
        const { list } = this.state;
        const { list: newList, hasMore } = await this.getData(++pageIndex);
        this.setState({
            list: list.concat(newList),
            hasMore
        });
        fn();
    };

    refList = {};

    insRef = node => {
        this.refList = node;
    };

    config: Config = {
        navigationBarTitleText: '首页'
    }

    render() {
        const { isLoaded, error, hasMore, isEmpty, list } = this.state;
        return (
            <View className="skeleton lazy-view">
                <ListView
                    lazy
                    ref={node => this.insRef(node)}
                    isLoaded={isLoaded}
                    isError={error}
                    hasMore={hasMore}
                    style={{ height: "100vh" }}
                    isEmpty={isEmpty}
                    onPullDownRefresh={this.pullDownRefresh}
                    onScrollToLower={this.onScrollToLower}
                    lazyStorage='lazyView'
                >
                    {list.map((item, index) => {
                        return (
                            <View className="item skeleton-bg" >
                                {/* <LazyBlock current={index} className="avatar"> */}
                                <Image
                                    className="avatar skeleton-radius"
                                    src={item.author.avatar_url}
                                />
                                {/* </LazyBlock> */}
                                <View className="title skeleton-rect">{item.title}</View>
                            </View>
                        );
                    })}
                </ListView>
            </View>
        );
    }
}

```

现在我们以微信为例，预览一下效果：：

![1590322082789.gif](https://i.loli.net/2020/05/24/kH3slXfrUItFaSM.gif)


