// Application configuration
export const APP_CONFIG = {
  // Chat configuration
  chat: {
    maxHistory: 100,
    typingSpeed: {
      min: 60,
      max: 180,
      default: 120
    },
    placeholderText: 'Message AI Mode UI...'
  },

  // Performance settings
  performance: {
    lazyImageLoading: true,
    enableMemoization: true,
    debounceDelay: 300,
    virtualScrollThreshold: 50,
    chunkLoadSize: 20
  },

  // UI configuration
  ui: {
    avatarService: 'https://ui-avatars.com/api/',
    placeholderImageService: 'https://placehold.co/',
    fallbackImages: {
      product: 'https://placehold.co/320x200?text=Product',
      user: 'https://ui-avatars.com/api/?name=User&background=6c757d&color=fff&size=28'
    },
    animations: {
      duration: 200,
      easing: 'ease-out'
    }
  },

  // Theme configuration
  theme: {
    storageKey: 'ai-mode-ui-theme',
    transitionDuration: '0.2s',
    autoDetectSystem: true
  },

  // Error handling
  errors: {
    retryAttempts: 3,
    timeoutMs: 10000,
    showDetails: false
  },

  // PWA settings
  pwa: {
    enableOfflineMode: true,
    cacheStrategy: 'network-first',
    updateCheckInterval: 60000 // 1 minute
  },

  // Development settings
  dev: {
    enableLogging: import.meta.env.DEV,
    showPerformanceMetrics: import.meta.env.DEV,
    enableMockDelay: import.meta.env.DEV
  }
} as const;

// Environment-specific overrides
if (import.meta.env.PROD) {
  // Production optimizations
  Object.assign(APP_CONFIG.performance, {
    debounceDelay: 200,
    virtualScrollThreshold: 100
  });
}

// Type-safe configuration access
export type AppConfig = typeof APP_CONFIG;