<template>
  <div 
    ref="containerRef"
    class="virtual-list"
    @scroll="onScroll"
    :style="{ height: containerHeight + 'px' }"
  >
    <div 
      class="virtual-list-phantom"
      :style="{ height: totalHeight + 'px' }"
    ></div>
    
    <div 
      class="virtual-list-content"
      :style="{ transform: `translateY(${offsetY}px)` }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="getItemKey(item, startIndex + index)"
        class="virtual-list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        <slot :item="item" :index="startIndex + index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  getItemKey?: (_item: any, index: number) => string | number;
  buffer?: number;
}

const props = withDefaults(defineProps<Props>(), {
  getItemKey: (_item: any, index: number) => index,
  buffer: 5
});

const containerRef = ref<HTMLElement>();
const scrollTop = ref(0);

const totalHeight = computed(() => props.items.length * props.itemHeight);

const startIndex = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight) - props.buffer;
  return Math.max(0, start);
});

const endIndex = computed(() => {
  const visibleCount = Math.ceil(props.containerHeight / props.itemHeight);
  const end = startIndex.value + visibleCount + props.buffer * 2;
  return Math.min(props.items.length - 1, end);
});

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value + 1);
});

const offsetY = computed(() => startIndex.value * props.itemHeight);

function onScroll(event: Event) {
  const target = event.target as HTMLElement;
  scrollTop.value = target.scrollTop;
}

// Auto-scroll to bottom when new items are added
const lastItemCount = ref(props.items.length);
watch(() => props.items.length, (newLength) => {
  if (newLength > lastItemCount.value && containerRef.value) {
    // Check if user was near the bottom before adding new items
    const container = containerRef.value;
    const wasNearBottom = 
      container.scrollTop + container.clientHeight >= container.scrollHeight - 100;
    
    if (wasNearBottom) {
      // Scroll to bottom after Vue updates the DOM
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  }
  lastItemCount.value = newLength;
});

defineExpose({
  scrollToBottom() {
    if (containerRef.value) {
      containerRef.value.scrollTop = containerRef.value.scrollHeight;
    }
  },
  scrollToTop() {
    if (containerRef.value) {
      containerRef.value.scrollTop = 0;
    }
  }
});
</script>

<style scoped>
.virtual-list {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.virtual-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.virtual-list-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.virtual-list-item {
  display: flex;
  align-items: center;
}
</style>