<template>
  <div class="file-download-list">
    <a
      v-for="file in data"
      :key="file.name"
      class="file-item"
      :href="file.url"
      download
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 2a1 1 0 011 1v12.59l3.3-3.3a1 1 0 011.4 1.42l-5 5a1 1 0 01-1.4 0l-5-5a1 1 0 011.4-1.42l3.3 3.3V3a1 1 0 011-1z"
        />
        <path
          d="M5 20a1 1 0 011-1h12a1 1 0 011 1 1 1 0 01-1 1H6a1 1 0 01-1-1z"
        />
      </svg>
      {{ file.name }}
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: Array<{ name: string; url: string }> }>();
</script>

<style scoped>
.file-download-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--app-card-bg);
  border: 1px solid var(--app-border);
  border-radius: 8px;
  color: var(--app-text);
  text-decoration: none;
  transition: background 0.2s ease;
}

.file-item:hover {
  background: var(--app-hover);
}
</style>
