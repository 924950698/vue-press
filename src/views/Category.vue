<template>
  <div class="category-page">
    <div class="page-header">
      <h1 class="page-title">
        <el-icon><Folder /></el-icon>
        {{ category }}
      </h1>
      <p class="page-subtitle">共 {{ filteredArticles.length }} 篇文章</p>
    </div>

    <div class="articles-container">
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.id"
        :article="article"
      />
      
      <el-empty
        v-if="filteredArticles.length === 0"
        description="该分类下暂无文章"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Folder } from '@element-plus/icons-vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticles } from '@/composables/useArticles'

const route = useRoute()
const category = route.params.category
const { articles } = useArticles()

const filteredArticles = computed(() => {
  return articles.value
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<style scoped>
.category-page {
  animation: fadeIn 0.5s;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-subtitle {
  color: #666;
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

