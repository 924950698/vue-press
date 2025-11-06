<template>
  <div class="article-detail">
    <div v-if="article" class="article-content-wrapper">
      <div class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="meta-item">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(article.date) }}
          </span>
          <span class="meta-item" v-if="article.category">
            <el-icon><Folder /></el-icon>
            <router-link :to="`/category/${article.category}`" class="category-link">
              {{ article.category }}
            </router-link>
          </span>
          <span class="meta-item" v-if="article.views !== undefined">
            <el-icon><View /></el-icon>
            {{ article.views }} 次阅读
          </span>
        </div>
        <div class="article-tags" v-if="article.tags && article.tags.length">
          <el-tag
            v-for="tag in article.tags"
            :key="tag"
            @click="goToTag(tag)"
            class="tag-item"
            effect="plain"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>

      <div class="article-body">
        <!-- 文章内容 -->
        <div class="article-content" v-html="article.content"></div>

        <!-- YouTube 视频 -->
        <YouTubeVideo
          v-for="(video, index) in article.videos"
          :key="index"
          :video-id="video"
          class="video-embed"
        />
      </div>

      <div class="article-footer">
        <div class="navigation">
          <el-button
            v-if="prevArticle"
            @click="goToArticle(prevArticle.id)"
          >
            <template #icon><ArrowLeft /></template>
            上一篇: {{ prevArticle.title }}
          </el-button>
          <el-button
            v-if="nextArticle"
            @click="goToArticle(nextArticle.id)"
          >
            <template #icon><ArrowRight /></template>
            下一篇: {{ nextArticle.title }}
          </el-button>
        </div>
      </div>
    </div>

    <el-empty v-else description="文章不存在" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, Folder, View, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import YouTubeVideo from '@/components/YouTubeVideo.vue'
import { useArticles } from '@/composables/useArticles'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()
const { articles } = useArticles()

const articleId = parseInt(route.params.id)
const article = computed(() => articles.value.find(a => a.id === articleId))

const sortedArticles = computed(() => {
  return [...articles.value].sort((a, b) => new Date(b.date) - new Date(a.date))
})

const currentIndex = computed(() => {
  return sortedArticles.value.findIndex(a => a.id === articleId)
})

const prevArticle = computed(() => {
  if (currentIndex.value > 0) {
    return sortedArticles.value[currentIndex.value - 1]
  }
  return null
})

const nextArticle = computed(() => {
  if (currentIndex.value < sortedArticles.value.length - 1) {
    return sortedArticles.value[currentIndex.value + 1]
  }
  return null
})

const formatDate = (date) => {
  return dayjs(date).format('YYYY年MM月DD日')
}

const goToTag = (tag) => {
  router.push(`/tag/${tag}`)
}

const goToArticle = (id) => {
  router.push(`/article/${id}`)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.article-detail {
  max-width: 900px;
  margin: 0 auto;
  animation: fadeIn 0.5s;
}

.article-content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.article-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 24px;
  margin-bottom: 32px;
}

.article-title {
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  color: #666;
  font-size: 14px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.category-link {
  color: #667eea;
  text-decoration: none;
}

.category-link:hover {
  text-decoration: underline;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  cursor: pointer;
}

.article-body {
  margin-bottom: 40px;
}

.video-embed {
  margin: 32px 0;
}

.article-footer {
  border-top: 2px solid #f0f0f0;
  padding-top: 24px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.navigation .el-button {
  flex: 1;
  text-align: left;
  white-space: normal;
  height: auto;
  padding: 12px 16px;
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
  .article-content-wrapper {
    padding: 24px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .navigation {
    flex-direction: column;
  }
}
</style>

