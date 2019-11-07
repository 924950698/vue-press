module.exports = {
  title: '🚲 踩坑侠的--“军火库”',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/images/logo.jpeg' }]
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
          title: '入门',
          collapsable: false,
          children: [         // 子菜单
            'install/test',   // 可在docs目录下创建install目录，此路径表示读取install目录下的README.md文件
          ]
        },{
          title: '手写实现篇',
          collapsable: false,
          children: [  
            'writePart/write'
          ]
        },{
          title: 'JavaScript篇',
          collapsable: false,
          children: [      
            'JavaScript/data', 
          ]
        },
        // {
        //   title: '正则篇',
        //   collapsable: false,
        //   children: [  
        //     'JavaScript/Regexp',
        //     'JavaScript/class',
        //     'JavaScript/function',
        //     'JavaScript/interface',
        //   ]
        // },
        {
          title: 'typeScript篇',
          collapsable: false,
          children: [     
            'typeScript/types.md',
            'typeScript/interface.md',
            'typeScript/class.md',
            'typeScript/function.md',
          ]
        },
        {
          title: 'gitLab篇',
          collapsable: false,
          children: [      
            'gitLab/gitLab',  
            'gitLab/gitHub'
          ]
        },{
          title: 'React篇',
          collapsable: false,
          children: [      
            'React/React-SSR', //React服务端渲染   
            'React/baseSkill',  //React基础技能篇
            'React/trialError', //React试错篇
            'React/hooks'       //React-Hooks篇  
          ]
        },{
          title: 'Https篇',
          collapsable: false,
          children: [      
            'Https/https', //网络协议篇
          ]
        },{
          title: 'Linux篇',
          collapsable: false,
          children: [      
            'Linux/fire', 
          ]
        },{
          title: 'Experience篇',
          collapsable: false,
          children: [      
            'Experience/experience', 
          ]
        },
      ]
    } 
  },
  markdown: {  // markdown 插入代码时展示对应行数
    lineNumbers: true
  }
}