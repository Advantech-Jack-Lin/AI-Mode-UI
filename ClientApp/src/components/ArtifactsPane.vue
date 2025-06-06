<template>
  <div class="artifacts-pane">
    <!-- Header with tabs -->

    <!-- Content area -->
    <div class="artifacts-content">
      <div v-if="Object.keys(artifactData).length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.5">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div class="empty-message">
          <h3>No artifacts yet</h3>
          <p>Start a conversation to generate interactive content, visualizations, and more.</p>
        </div>
      </div>

      <div v-else :class="['artifacts-grid', `view-${activeTab}`,
  Object.keys(artifactData).some(k => k === 'ProductCard' || k === 'prod_cards') ? 'product-row' : '']">
        <div 
          v-for="(data, key) in artifactData" 
          :key="key" 
          class="artifact-card"
        >
          
          <div class="artifact-content">
            <component
              :is="artifactRegistry[key]"
              :data="data"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { artifactData } from '../composables/useStreamHub';
import { artifactRegistry } from '../artifactRegistry';

const activeTab = ref('grid');

const viewTabs = [
  { 
    id: 'list', 
    label: 'List', 
    icon: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' }, 
      h('path', { d: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' })
    )
  },
  { 
    id: 'grid', 
    label: 'Grid', 
    icon: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' }, 
      h('path', { d: 'M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z' })
    )
  },
  { 
    id: 'masonry', 
    label: 'Masonry', 
    icon: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' }, 
      h('path', { d: 'M3 3v8h4V3H3zm6 0v12h4V3H9zm6 0v6h4V3h-4zM3 13v8h4v-8H3zm12 0v8h4v-8h-4z' })
    )
  }
];

function getArtifactType(key: string) {
  const typeMap: Record<string, string> = {
    'ProductCard': 'Product',
    'ChartComponent': 'Chart',
    'TableComponent': 'Table',
    'CodeBlock': 'Code'
  };
  return typeMap[key] || 'Artifact';
}
</script>

<style scoped>
.artifacts-pane {
  height: 100%;
  width: 100%;
  background: var(--app-bg);
  display: flex;
  flex-direction: column;
}

/* Header */
.artifacts-header {
  padding: 24px;
  border-bottom: 0px solid var(--app-border);
  background: var(--app-bg);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.artifacts-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.artifacts-title h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--app-text);
  margin: 0;
}

.artifact-count {
  background: var(--app-primary);
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
}

.view-tabs {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex: 1;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: var(--app-card-bg);
  color: var(--app-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: var(--app-hover);
  color: var(--app-text);
}

.tab-btn.active {
  background: var(--app-primary);
  color: white;
  border-color: var(--app-primary);
}

/* Content */
.artifacts-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  text-align: center;
}

.empty-icon {
  color: var(--app-muted);
  margin-bottom: 16px;
}

.empty-message h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--app-text);
  margin: 0 0 8px 0;
}

.empty-message p {
  font-size: 14px;
  color: var(--app-muted);
  margin: 0;
  max-width: 400px;
}

/* Artifacts Grid */
.artifacts-grid {
  display: grid;
  gap: 20px;
}

/* Horizontal scroll for product cards */
.artifacts-grid.product-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;   /* allow wrapping */
  gap: 20px;
  padding-bottom: 8px;
}

.artifacts-grid.product-row .artifact-card {
  min-width: 320px;
  flex: 0 0 auto;
}

.artifacts-grid.view-list {
  grid-template-columns: 1fr;
}

.artifacts-grid.view-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.artifacts-grid.view-masonry {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: masonry; /* Future CSS feature */
}

.artifact-card {
  background: var(--app-card-bg);
  border: 0px solid var(--app-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.artifact-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--app-bg);
  border-bottom: 1px solid var(--app-border);
}

.artifact-type {
  font-size: 12px;
  font-weight: 600;
  color: var(--app-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.artifact-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--app-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--app-hover);
  color: var(--app-text);
}

.artifact-content {
  padding: 0px;
}

/* List view specific styles */
.view-list .artifact-card {
  display: flex;
  flex-direction: row;
}

.view-list .artifact-header {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  width: 120px;
  flex-shrink: 0;
}

.view-list .artifact-content {
  flex: 1;
}
</style>
