<template>
  <div class="articles-page">
    <div class="page-header">
      <h1 class="page-title">所有文章</h1>
      <div class="filter-bar">
        <el-select
          v-model="selectedCategory"
          placeholder="选择分类"
          clearable
          @change="handleFilter"
          style="width: 200px"
        >
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          />
        </el-select>
        <el-select
          v-model="sortBy"
          placeholder="排序方式"
          @change="handleFilter"
          style="width: 150px; margin-left: 12px"
        >
          <el-option label="最新" value="date" />
          <el-option label="标题" value="title" />
        </el-select>
      </div>
    </div>

    <div class="articles-container">
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.id"
        :article="article"
      />
      
      <el-empty
        v-if="filteredArticles.length === 0"
        description="暂无文章"
      />
    </div>

    <div class="pagination" v-if="filteredArticles.length > 0">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredArticles.length"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticles } from '@/composables/useArticles'

const { articles, categories } = useArticles()
const selectedCategory = ref('')
const sortBy = ref('date')
const currentPage = ref(1)
const pageSize = ref(12)

const filteredArticles = computed(() => {
  let result = [...articles.value]

  // 分类筛选
  if (selectedCategory.value) {
    result = result.filter(a => a.category === selectedCategory.value)
  }

  // 排序
  if (sortBy.value === 'date') {
    result.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (sortBy.value === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return result.slice(start, end)
})

const handleFilter = () => {
  currentPage.value = 1
}

const handlePageChange = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.articles-page {
  animation: fadeIn 0.5s;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.filter-bar {
  display: flex;
  align-items: center;
}

.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
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
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

