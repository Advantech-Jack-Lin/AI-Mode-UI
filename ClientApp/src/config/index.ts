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
    debounceDelay: 300
  },

  // UI configuration
  ui: {
    avatarService: 'https://ui-avatars.com/api/',
    placeholderImageService: 'https://placehold.co/',
    fallbackImages: {
      product: 'https://placehold.co/320x200?text=Product',
      user: 'https://ui-avatars.com/api/?name=User&background=6c757d&color=fff&size=28'
    }
  },

  // Theme configuration
  theme: {
    storageKey: 'ai-mode-ui-theme',
    transitionDuration: '0.2s'
  },

  // Error handling
  errors: {
    retryAttempts: 3,
    timeoutMs: 10000
  },

  // Development settings
  dev: {
    enableLogging: import.meta.env.DEV,
    showPerformanceMetrics: import.meta.env.DEV
  }
} as const;

// Type-safe configuration access
export type AppConfig = typeof APP_CONFIG;