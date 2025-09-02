<template>
  <div class="error-boundary">
    <div class="error-content">
      <div class="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h3 class="error-title">{{ title }}</h3>
      <p class="error-message">{{ message }}</p>
      <div class="error-details" v-if="showDetails && details">
        <details>
          <summary>Technical Details</summary>
          <pre>{{ details }}</pre>
        </details>
      </div>
      <div class="error-actions">
        <button class="btn btn-primary" @click="$emit('retry')">
          Try Again
        </button>
        <button class="btn btn-outline-secondary" @click="$emit('dismiss')">
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AppError } from '../types';

interface Props {
  error?: AppError | null;
  title?: string;
  message?: string;
  showDetails?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  message: 'An unexpected error occurred. Please try again.',
  showDetails: false
});

defineEmits<{
  retry: [];
  dismiss: [];
}>();

const details = computed(() => {
  if (props.error) {
    return JSON.stringify(props.error, null, 2);
  }
  return null;
});
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
  background: var(--app-bg);
  border: 1px solid var(--app-border);
  border-radius: 12px;
}

.error-content {
  text-align: center;
  max-width: 400px;
}

.error-icon {
  color: #dc3545;
  margin-bottom: 1rem;
}

.error-title {
  color: var(--app-text);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.error-message {
  color: var(--app-muted);
  margin-bottom: 1.5rem;
}

.error-details {
  text-align: left;
  margin-bottom: 1.5rem;
}

.error-details summary {
  cursor: pointer;
  color: var(--app-muted);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.error-details pre {
  background: var(--app-card-bg);
  border: 1px solid var(--app-border);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.75rem;
  overflow-x: auto;
  color: var(--app-text);
}

.error-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--app-primary);
  color: white;
  border: 1px solid var(--app-primary);
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-outline-secondary {
  background: transparent;
  color: var(--app-muted);
  border: 1px solid var(--app-border);
}

.btn-outline-secondary:hover {
  background: var(--app-hover);
  color: var(--app-text);
}
</style>