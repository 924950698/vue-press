<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="hero-title">欢迎来到我的知识分享博客</h1>
      <p class="hero-subtitle">分享技术、记录生活、共同成长</p>
    </div>

    <div class="search-box">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索文章..."
        @keyup.enter="handleSearch"
        size="large"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
        <template #append>
          <el-button @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
    </div>

    <div class="featured-section">
      <h2 class="section-title">精选文章</h2>
      <div class="article-grid">
        <ArticleCard
          v-for="article in featuredArticles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>

    <div class="recent-section">
      <h2 class="section-title">最新文章</h2>
      <div class="article-list">
        <ArticleCard
          v-for="article in recentArticles"
          :key="article.id"
          :article="article"
          :compact="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticles } from '@/composables/useArticles'

const router = useRouter()
const searchKeyword = ref('')
const { articles } = useArticles()

const featuredArticles = computed(() => {
  return articles.value.filter(a => a.featured).slice(0, 6)
})

const recentArticles = computed(() => {
  return [...articles.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
})

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      name: 'Search',
      query: { q: searchKeyword.value }
    })
  }
}
</script>

<style scoped>
.home {
  animation: fadeIn 0.5s;
}

.hero-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
}

.search-box {
  margin-bottom: 40px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #2c3e50;
  border-left: 4px solid #667eea;
  padding-left: 16px;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 28px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>

