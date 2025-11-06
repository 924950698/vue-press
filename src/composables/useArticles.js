import { ref, computed } from 'vue'

// 示例文章数据
const articlesData = ref([
  {
    id: 1,
    title: 'Vue 3 组合式 API 深入理解',
    description: '详细介绍 Vue 3 组合式 API 的使用方法和最佳实践，帮助开发者更好地理解和使用 Vue 3 的新特性。',
    content: `
      <h2>什么是组合式 API？</h2>
      <p>组合式 API 是 Vue 3 引入的新特性，它提供了一种更灵活的方式来组织组件代码。通过组合式 API，我们可以将相关的逻辑组合在一起，而不是按照选项类型（data、methods、computed 等）来组织。</p>
      
      <h2>为什么需要组合式 API？</h2>
      <p>在大型组件中，选项式 API 会导致逻辑分散，难以维护。组合式 API 通过逻辑组合，让代码更加清晰和可维护。</p>
      
      <h2>使用示例</h2>
      <pre><code>import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    return {
      count,
      doubleCount
    }
  }
}</code></pre>
    `,
    date: '2024-01-15',
    category: '前端开发',
    tags: ['Vue', 'JavaScript', '前端'],
    image: 'https://picsum.photos/800/400?random=1',
    featured: true,
    views: 1234,
    videos: ['dQw4w9WgXcQ'] // YouTube 视频 ID
  },
  {
    id: 2,
    title: 'Node.js 性能优化技巧',
    description: '分享一些实用的 Node.js 性能优化技巧，包括事件循环、内存管理、异步处理等方面的优化方法。',
    content: `
      <h2>事件循环优化</h2>
      <p>Node.js 的事件循环是单线程的，理解事件循环的工作原理对于性能优化至关重要。</p>
      
      <h2>内存管理</h2>
      <p>合理管理内存可以避免内存泄漏，提高应用性能。</p>
      
      <h2>异步处理</h2>
      <p>正确使用异步操作可以避免阻塞事件循环，提高应用的并发处理能力。</p>
    `,
    date: '2024-01-10',
    category: '后端开发',
    tags: ['Node.js', '性能优化', '后端'],
    image: 'https://picsum.photos/800/400?random=2',
    featured: true,
    views: 987,
    videos: []
  },
  {
    id: 3,
    title: 'MySQL 索引优化实战',
    description: '通过实际案例讲解 MySQL 索引的创建、使用和优化策略，帮助开发者写出更高效的 SQL 查询。',
    content: `
      <h2>索引基础</h2>
      <p>索引是数据库中提高查询性能的重要工具。理解索引的工作原理是优化的基础。</p>
      
      <h2>索引类型</h2>
      <p>MySQL 支持多种索引类型，包括 B-Tree、Hash、Full-Text 等，选择合适的索引类型很重要。</p>
      
      <h2>优化策略</h2>
      <p>通过分析慢查询日志，找出性能瓶颈，然后针对性地优化索引。</p>
    `,
    date: '2024-01-05',
    category: '数据库',
    tags: ['MySQL', '数据库', '优化'],
    image: 'https://picsum.photos/800/400?random=3',
    featured: false,
    views: 756,
    videos: []
  },
  {
    id: 4,
    title: '算法与数据结构：二分查找详解',
    description: '深入讲解二分查找算法的原理、实现和应用场景，包括各种变体形式。',
    content: `
      <h2>算法原理</h2>
      <p>二分查找是一种高效的查找算法，时间复杂度为 O(log n)。</p>
      
      <h2>实现方法</h2>
      <pre><code>function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}</code></pre>
      
      <h2>应用场景</h2>
      <p>二分查找适用于有序数组的查找问题，也可以用于解决一些复杂的算法问题。</p>
    `,
    date: '2024-01-01',
    category: '算法',
    tags: ['算法', '数据结构', 'JavaScript'],
    image: 'https://picsum.photos/800/400?random=4',
    featured: true,
    views: 543,
    videos: []
  },
  {
    id: 5,
    title: 'Docker 容器化部署实践',
    description: '介绍如何使用 Docker 容器化应用，包括 Dockerfile 编写、镜像构建和容器编排等。',
    content: `
      <h2>Docker 基础</h2>
      <p>Docker 是一个开源的应用容器引擎，可以让开发者打包应用及其依赖到容器中。</p>
      
      <h2>Dockerfile 编写</h2>
      <pre><code>FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]</code></pre>
      
      <h2>容器编排</h2>
      <p>使用 Docker Compose 可以轻松管理多容器应用。</p>
    `,
    date: '2023-12-28',
    category: '工具',
    tags: ['Docker', 'DevOps', '部署'],
    image: 'https://picsum.photos/800/400?random=5',
    featured: false,
    views: 432,
    videos: []
  },
  {
    id: 6,
    title: '我的编程学习之路',
    description: '分享从零开始学习编程的经历和心得体会，希望能给初学者一些启发和帮助。',
    content: `
      <h2>初入编程</h2>
      <p>刚开始学习编程时，一切都是那么新鲜和有趣。从 Hello World 开始，一步步探索编程的世界。</p>
      
      <h2>遇到的挑战</h2>
      <p>学习过程中遇到了很多困难，但每一次解决问题都让我成长。</p>
      
      <h2>持续学习</h2>
      <p>编程是一个需要持续学习的领域，保持好奇心和学习热情很重要。</p>
    `,
    date: '2023-12-25',
    category: '生活',
    tags: ['生活', '学习', '感悟'],
    image: 'https://picsum.photos/800/400?random=6',
    featured: false,
    views: 321,
    videos: []
  }
])

export function useArticles() {
  const categories = computed(() => {
    const cats = new Set()
    articlesData.value.forEach(article => {
      if (article.category) {
        cats.add(article.category)
      }
    })
    return Array.from(cats)
  })

  const tags = computed(() => {
    const tagSet = new Set()
    articlesData.value.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => tagSet.add(tag))
      }
    })
    return Array.from(tagSet)
  })

  return {
    articles: articlesData,
    categories,
    tags
  }
}

