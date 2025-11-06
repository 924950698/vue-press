<template>
  <div class="article-card" :class="{ compact: compact }">
    <router-link :to="`/article/${article.id}`" class="card-link">
      <div class="card-image" v-if="article.image">
        <img :src="article.image" :alt="article.title" />
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ article.title }}</h3>
        <p class="card-description" v-if="article.description">
          {{ article.description }}
        </p>
        <div class="card-meta">
          <span class="meta-item">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(article.date) }}
          </span>
          <span class="meta-item" v-if="article.category">
            <el-icon><Folder /></el-icon>
            {{ article.category }}
          </span>
        </div>
        <div class="card-tags" v-if="article.tags && article.tags.length">
          <el-tag
            v-for="tag in article.tags.slice(0, 3)"
            :key="tag"
            size="small"
            class="tag-item"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { Calendar, Folder } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
</script>

<style scoped>
.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #999;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-item {
  font-size: 12px;
}

/* 紧凑模式 */
.article-card.compact {
  display: flex;
  flex-direction: row;
}

.article-card.compact .card-image {
  width: 200px;
  height: 150px;
  flex-shrink: 0;
}

.article-card.compact .card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .article-card.compact {
    flex-direction: column;
  }
  
  .article-card.compact .card-image {
    width: 100%;
    height: 200px;
  }
}
</style>

