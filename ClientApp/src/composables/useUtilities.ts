import { ref, computed, onUnmounted } from 'vue';

// Network status monitoring
export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine);

  function updateNetworkStatus() {
    isOnline.value = navigator.onLine;
  }

  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);

  onUnmounted(() => {
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
  });

  return {
    isOnline: computed(() => isOnline.value),
    isOffline: computed(() => !isOnline.value)
  };
}

// Local storage with error handling
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storedValue = ref<T>(defaultValue);

  // Initialize from localStorage
  try {
    const item = localStorage.getItem(key);
    if (item) {
      storedValue.value = JSON.parse(item);
    }
  } catch (error) {
    console.warn(`Failed to read ${key} from localStorage:`, error);
  }

  // Save to localStorage
  function setValue(value: T) {
    try {
      storedValue.value = value;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  }

  // Remove from localStorage
  function removeValue() {
    try {
      localStorage.removeItem(key);
      storedValue.value = defaultValue;
    } catch (error) {
      console.warn(`Failed to remove ${key} from localStorage:`, error);
    }
  }

  return {
    value: computed(() => storedValue.value),
    setValue,
    removeValue
  };
}

// Intersection observer for visibility tracking
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) {
  const observer = ref<IntersectionObserver | null>(null);

  function observe(element: Element) {
    if (!observer.value) {
      observer.value = new IntersectionObserver(callback, options);
    }
    observer.value.observe(element);
  }

  function unobserve(element: Element) {
    observer.value?.unobserve(element);
  }

  function disconnect() {
    observer.value?.disconnect();
    observer.value = null;
  }

  onUnmounted(() => {
    disconnect();
  });

  return {
    observe,
    unobserve,
    disconnect
  };
}