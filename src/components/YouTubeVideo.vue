<template>
  <div class="youtube-video-wrapper">
    <div class="video-container">
      <iframe
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="youtube-iframe"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  videoId: {
    type: String,
    required: true
  }
})

const videoUrl = computed(() => {
  // 支持完整 URL 或视频 ID
  let id = props.videoId
  if (id.includes('youtube.com') || id.includes('youtu.be')) {
    // 提取视频 ID
    const match = id.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    if (match) {
      id = match[1]
    }
  }
  return `https://www.youtube.com/embed/${id}`
})
</script>

<style scoped>
.youtube-video-wrapper {
  width: 100%;
  margin: 32px 0;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
</style>

