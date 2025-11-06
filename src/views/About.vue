<template>
  <div class="about-page">
    <div class="about-content">
      <div class="about-header">
        <h1 class="page-title">关于我</h1>
      </div>

      <div class="about-body">
        <div class="avatar-section">
          <el-avatar :size="120" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <h2>博主</h2>
          <p class="bio">热爱技术，热爱分享</p>
        </div>

        <div class="info-section">
          <h3>个人简介</h3>
          <p>
            欢迎来到我的个人知识分享博客！这里记录了我的学习历程、技术心得和生活感悟。
            希望通过分享，能够帮助到更多志同道合的朋友，也期待与大家一起交流学习。
          </p>

          <h3>技术栈</h3>
          <div class="tech-tags">
            <el-tag v-for="tech in techStack" :key="tech" size="large" class="tech-tag">
              {{ tech }}
            </el-tag>
          </div>

          <h3>联系方式</h3>
          <ul class="contact-list">
            <li>
              <el-icon><Message /></el-icon>
              <span>Email: example@email.com</span>
            </li>
            <li>
              <el-icon><Link /></el-icon>
              <span>GitHub: github.com/username</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Message, Link } from '@element-plus/icons-vue'

const techStack = [
  'Vue.js', 'React', 'Node.js', 'TypeScript',
  'Python', 'Java', 'MySQL', 'MongoDB',
  'Docker', 'Git', 'Linux'
]
</script>

<style scoped>
.about-page {
  animation: fadeIn 0.5s;
}

.about-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.about-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 24px;
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.about-body {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.avatar-section {
  text-align: center;
  padding: 20px;
}

.avatar-section h2 {
  margin: 16px 0 8px;
  color: #2c3e50;
}

.bio {
  color: #666;
  font-size: 16px;
}

.info-section h3 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 16px;
  border-left: 4px solid #667eea;
  padding-left: 12px;
}

.info-section p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 24px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.tech-tag {
  font-size: 14px;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: #555;
  font-size: 16px;
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
  .about-content {
    padding: 24px;
  }
}
</style>

