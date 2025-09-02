import { ref, computed } from 'vue';
import { APP_CONFIG } from '../config';

// Performance monitoring composable
export function usePerformance() {
  const performanceMetrics = ref({
    renderTime: 0,
    memoryUsage: 0,
    componentCount: 0
  });

  function measureRenderTime<T>(fn: () => T): T {
    if (!APP_CONFIG.dev.showPerformanceMetrics) {
      return fn();
    }

    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    performanceMetrics.value.renderTime = end - start;
    
    if (APP_CONFIG.dev.enableLogging) {
      console.log(`Render time: ${end - start}ms`);
    }
    
    return result;
  }

  function updateMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      performanceMetrics.value.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
    }
  }

  // Monitor memory usage periodically in development
  if (APP_CONFIG.dev.showPerformanceMetrics) {
    setInterval(updateMemoryUsage, 5000);
  }

  return {
    performanceMetrics: computed(() => performanceMetrics.value),
    measureRenderTime,
    updateMemoryUsage
  };
}

// Memoization helper for expensive computations
export function useMemoized<T extends (...args: any[]) => any>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T {
  if (!APP_CONFIG.performance.enableMemoization) {
    return fn;
  }

  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    // Prevent memory leaks by limiting cache size
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      if (firstKey) {
        cache.delete(firstKey);
      }
    }
    
    return result;
  }) as T;
}

// Debounced function helper
export function useDebounced<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = APP_CONFIG.performance.debounceDelay
): T {
  let timeoutId: ReturnType<typeof setTimeout>;

  return ((...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as T;
}

// Lazy loading helper for images
export function useLazyLoading() {
  const observer = ref<IntersectionObserver | null>(null);

  function setupLazyLoading(element: HTMLElement) {
    if (!APP_CONFIG.performance.lazyImageLoading) {
      return;
    }

    if (!observer.value) {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              observer.value?.unobserve(img);
            }
          }
        });
      });
    }

    observer.value.observe(element);
  }

  function cleanupLazyLoading() {
    observer.value?.disconnect();
    observer.value = null;
  }

  return {
    setupLazyLoading,
    cleanupLazyLoading
  };
}