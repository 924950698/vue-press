module.exports = {
    title: '🚲 Allan_Liu的博客',
    description: 'Just playing around',
    base: '/',
    head: [
        ['link', { rel: 'icon', href: '/images/logo.jpeg' }]
    ],
    plugins: [
        '@vuepress/back-to-top',
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-160416965-1' // UA-00000000-0
            }
        ],
        '@vuepress/medium-zoom',
    ],
    themeConfig: {
      repo: '924950698',// 默认是 false, 设置为 true 来启用，右上角会出现 github 跳转链接
      lastUpdated: 'Last Updated', // 每个文档展示最近更新时间
      nav: [
          { text: '主页', link: '/' }
      ],
      sidebar:{
        '/guide/': [
          {
            title: 'python篇',
            collapsable: false,
            children: [      
              'python/study.md', 
              'python/pyapi.md', 
              'python/pymethods.md', 
              'python/pyfile.md', 
              'python/pyerror.md', 
            ]
          }
        //   {
        //     title: 'JavaScript篇',
        //     collapsable: false,
        //     children: [      
        //       'JavaScript/data', 
        //     ]
        //   },{
        //     title: 'React.js + egg.js',
        //     collapsable: false,
        //     children: [      
        //       'Reactjs/react1', //React服务端渲染   
        //     ]
        //   },{
        //     title: 'React篇',
        //     collapsable: false,
        //     children: [      
        //       'React/React-SSR', //React服务端渲染   
        //       // 'React/baseSkill',  //React基础技能篇
        //       // 'React/trialError', //React试错篇
        //       'React/hooks'       //React-Hooks篇  
        //     ]
        //   },{
        //     title: '前端性能篇',
        //     collapsable: false,
        //     children: [     
        //       'performanceOptimization/foreword.md',
        //       'performanceOptimization/netWork1.md',
        //       'performanceOptimization/netWork2.md',
        //       'performanceOptimization/localstorage1.md', // Http优化
        //       'performanceOptimization/localstorage2.md', // 本地存储优化
        //       'performanceOptimization/cdn.md', 
        //       'performanceOptimization/application1.md',
        //       'performanceOptimization/application2.md',
        //       'performanceOptimization/render1.md',
        //       'performanceOptimization/render2.md',
        //       // 'performanceOptimization/render3.md',
        //       // 'performanceOptimization/render4.md',
        //     ]
        //   },{
        //     title: 'Angular篇',
        //     collapsable: false,
        //     children: [
        //       'angular/install.md',
        //       'angular/angular1.md',
        //       'angular/angular2.md',
        //       'angular/angular3.md',
        //       'angular/angular4.md',
        //       'angular/angular5.md',
        //       'angular/angular7.md',
        //       'angular/angular8.md',
        //     ]
        //   },{
        //     title: '数据库篇',
        //     collapsable: false,
        //     children: [
        //       'database/mongodb1.md',
        //     ]
        //   },{
        //     title: '前端自动化篇',
        //     collapsable: false,
        //     children: [      
        //       'autoTest/lesson1', 
        //     ]
        //   },{
        //     title: '算法篇',
        //     collapsable: false,
        //     children: [  
        //       'arithmetic/array'
        //     ]
        //   },{
        //     title: 'typeScript篇',
        //     collapsable: false,
        //     children: [   
        //       'typeScript/foreword.md',
        //       'typeScript/types.md',
        //       'typeScript/interface.md',
        //       'typeScript/class.md',
        //       'typeScript/function.md',
        //     ]
        //   },
        //   {
        //       title: 'Docker篇',
        //       collapsable: false,
        //       children: [      
        //         'Docker/docker1',
        //       ]
        //   },{
        //     title: '小程序篇',
        //     collapsable: false,
        //     children: [
        //         'miniProgram/taro2.md',
        //         'miniProgram/taro.md',
        //         'miniProgram/taro1.md',
        //     ]
        // },{
        //     title: '正则篇',
        //     collapsable: false,
        //     children: [  
        //       'regexp/Regexp',
        //       'regexp/Regexp1',
        //       'regexp/Regexp2',
        //     ]
        //   },{
        //     title: '杂记录篇',
        //     collapsable: false,
        //     children: [      
        //       'jottings/https', //网络协议篇
        //       'jottings/fire',  // 火焰图
        //       'jottings/gitLab',  
        //       'jottings/gitHub',
        //     ]
        //   },
            // {
            //   title: '入门',
            //   collapsable: false,
            //   children: [         // 子菜单
            //     'install/test',   // 可在docs目录下创建install目录，此路径表示读取install目录下的README.md文件
            //   ]
            // },
            // {
            // {
            //   title: 'Experience篇',
            //   collapsable: false,
            //   children: [      
            //     'Experience/experience', 
            //   ]
            // },
              ]
          },
        },
    markdown: {  // markdown 插入代码时展示对应行数
        lineNumbers: true
    }
}