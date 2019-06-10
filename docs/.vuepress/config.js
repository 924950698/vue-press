module.exports = {
  base: '/vue-press/',
  title: '🚲 柳向东的 -- VuePress',
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
    sidebar: [
      {
        title: '入门',
        collapsable: false,
        children: [      // 子菜单
          '/install/install',   // 可在docs目录下创建install目录，此路径表示读取install目录下的README.md文件
        ]
      },
      {
        title: 'JavaScript',
        collapsable: false,
        children: [ 
          '/javascript/', 
          '/javascript1/', 
        ]
      },
    ]
   
  },
  markdown: { // markdown 插入代码时展示对应行数
    lineNumbers: true
  }
}