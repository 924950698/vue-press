<template>
  <div class="search-page">
    <div class="search-header">
      <h1 class="page-title">搜索结果</h1>
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

    <div class="search-results">
      <p v-if="searchKeyword" class="result-count">
        找到 {{ searchResults.length }} 篇相关文章
      </p>

      <div class="articles-container">
        <ArticleCard
          v-for="article in searchResults"
          :key="article.id"
          :article="article"
        />
        
        <el-empty
          v-if="searchKeyword && searchResults.length === 0"
          description="没有找到相关文章"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticles } from '@/composables/useArticles'

const route = useRoute()
const { articles } = useArticles()
const searchKeyword = ref('')

onMounted(() => {
  if (route.query.q) {
    searchKeyword.value = route.query.q
  }
})

const searchResults = computed(() => {
  if (!searchKeyword.value.trim()) {
    return []
  }

  const keyword = searchKeyword.value.toLowerCase()
  return articles.value.filter(article => {
    return (
      article.title.toLowerCase().includes(keyword) ||
      article.description?.toLowerCase().includes(keyword) ||
      article.content?.toLowerCase().includes(keyword) ||
      article.tags?.some(tag => tag.toLowerCase().includes(keyword))
    )
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
})

const handleSearch = () => {
  // 搜索逻辑已通过 computed 实现
}
</script>

<style scoped>
.search-page {
  animation: fadeIn 0.5s;
}

.search-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
}

.result-count {
  color: #666;
  margin-bottom: 24px;
  font-size: 16px;
}

.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
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
  .articles-container {
    grid-template-columns: 1fr;
  }
}
</style>

