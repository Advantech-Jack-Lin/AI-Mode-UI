<template>
  <div class="media-gallery">
    <div v-for="(item, i) in data" :key="i" class="media-item">
      <img v-if="item.type === 'image'" :src="item.url" :alt="item.alt || 'image'" />
      <video v-else-if="item.type === 'video'" controls :src="item.url"></video>
      <audio v-else-if="item.type === 'audio'" controls :src="item.url"></audio>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: Array<{ type: string; url: string; alt?: string }> }>();
</script>

<style scoped>
.media-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.media-item img,
.media-item video,
.media-item audio {
  max-width: 240px;
  border-radius: 8px;
}
</style>
