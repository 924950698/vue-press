<template>
  <div class="main-layout">
    <!-- 左侧导航栏 -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="sidebar-header">
        <h1 v-if="!isCollapsed" class="site-title">知识分享</h1>
        <el-button
          :icon="isCollapsed ? 'Expand' : 'Fold'"
          circle
          text
          @click="toggleSidebar"
          class="collapse-btn"
        />
      </div>
      
      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: $route.path === item.path }"
        >
          <el-icon class="nav-icon">
            <component :is="item.icon" />
          </el-icon>
          <span v-if="!isCollapsed" class="nav-text">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="categories-section" v-if="!isCollapsed">
          <h3>分类</h3>
          <div class="category-tags">
            <el-tag
              v-for="category in categories"
              :key="category"
              @click="goToCategory(category)"
              class="category-tag"
              effect="plain"
            >
              {{ category }}
            </el-tag>
          </div>
        </div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { House, Document, Search, InfoFilled } from '@element-plus/icons-vue'

const router = useRouter()
const isCollapsed = ref(false)

const menuItems = [
  { path: '/', name: '首页', icon: 'House' },
  { path: '/articles', name: '文章列表', icon: 'Document' },
  { path: '/search', name: '搜索', icon: 'Search' },
  { path: '/about', name: '关于', icon: 'InfoFilled' }
]

const categories = ['前端开发', '后端开发', '数据库', '算法', '工具', '生活']

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const goToCategory = (category) => {
  router.push(`/category/${category}`)
}
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.site-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: white;
}

.collapse-btn {
  color: white;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  margin: 4px 10px;
  border-radius: 8px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
}

.nav-icon {
  font-size: 20px;
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.nav-text {
  font-size: 16px;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.categories-section h3 {
  font-size: 14px;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-tag {
  cursor: pointer;
  transition: all 0.3s;
}

.category-tag:hover {
  transform: translateY(-2px);
}

.main-content {
  flex: 1;
  margin-left: 260px;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
}

.sidebar-collapsed ~ .main-content {
  margin-left: 80px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
  }
  
  .sidebar-collapsed {
    width: 80px;
  }
  
  .main-content {
    margin-left: 80px;
  }
  
  .sidebar-collapsed ~ .main-content {
    margin-left: 80px;
  }
}
</style>

