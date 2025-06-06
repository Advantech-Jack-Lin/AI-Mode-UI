<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ChatPanel from './components/ChatPanel.vue';
import ArtifactsPane from './components/ArtifactsPane.vue';
import ThemeToggle from './components/ThemeToggle.vue';

const isDark = ref(false); // Default to light theme
function toggleTheme() {
  isDark.value = !isDark.value;
  updateThemeClasses();
}

function updateThemeClasses() {
  document.documentElement.setAttribute('data-bs-theme', isDark.value ? 'dark' : 'light');
  document.body.className = isDark.value ? 'bg-dark text-light' : 'bg-light text-dark';
}

onMounted(() => {
  updateThemeClasses();
});
</script>

<template>
  <div :class="['app-root', isDark ? 'theme-dark' : 'theme-light']">
    <!-- Header -->
    <header class="app-header">
      <div class="header-left">
        <div class="app-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h1 class="app-title">AI Mode UI</h1>
      </div>
      <div class="header-right">
        <ThemeToggle :isDark="isDark" @toggle="toggleTheme" />
        
      </div>
    </header>

    <!-- Main Layout -->
    <div class="main-layout">
      <div class="chat-sidebar">
        <ChatPanel />
      </div>
      <div class="content-area">
        <ArtifactsPane />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-root {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--app-bg);
  color: var(--app-text);
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.app-header {
  height: 60px;
  background: var(--app-header-bg);
  border-bottom: 1px solid var(--app-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-icon {
  color: var(--app-primary);
}

.app-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--app-text);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--app-border);
}

/* Main Layout */
.main-layout {
  display: flex;
  height: calc(100vh - 60px);
  width: 100%;
  flex: 1;
}

.chat-sidebar {
  width: 320px;
  min-width: 320px;
  max-width: 320px;
  height: 100%;
  background: var(--app-sidebar-bg);
  border-right: 1px solid var(--app-border);
  overflow: hidden;
}

.content-area {
  flex: 1;
  height: 100%;
  background: var(--app-bg);
  overflow: hidden;
}

/* Theme Variables */
.theme-dark {
  --app-bg: #0d1117;
  --app-text: #f0f6fc;
  --app-header-bg: #161b22;
  --app-sidebar-bg: #0d1117;
  --app-border: #30363d;
  --app-primary: #58a6ff;
  --app-secondary: #8b949e;
  --app-muted: #6e7681;
  --app-card-bg: #161b22;
  --app-hover: #21262d;
}

.theme-light {
  --app-bg: #ffffff;
  --app-text: #24292f;
  --app-header-bg: #f6f8fa;
  --app-sidebar-bg: #ffffff;
  --app-border: #d0d7de;
  --app-primary: #0969da;
  --app-secondary: #656d76;
  --app-muted: #8c959f;
  --app-card-bg: #ffffff;
  --app-hover: #f3f4f6;
}
</style>
