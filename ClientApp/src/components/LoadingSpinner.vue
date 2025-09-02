<template>
  <div class="loading-spinner" :class="{ 'loading-inline': inline }">
    <div class="spinner" :style="{ width: size, height: size }">
      <svg viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="31.416"
          stroke-dashoffset="31.416"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            values="0 31.416;15.708 15.708;0 31.416"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            values="0;-15.708;-31.416"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
    <p v-if="message && !inline" class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
  size?: string;
  inline?: boolean;
}

withDefaults(defineProps<Props>(), {
  message: 'Loading...',
  size: '24px',
  inline: false
});
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}

.loading-inline {
  flex-direction: row;
  padding: 0.5rem;
  gap: 0.5rem;
}

.spinner {
  color: var(--app-primary);
  animation: spin 1s linear infinite;
}

.spinner svg {
  width: 100%;
  height: 100%;
}

.loading-message {
  color: var(--app-muted);
  font-size: 0.875rem;
  margin: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>