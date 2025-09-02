import { ref, computed, watch } from 'vue';
import type { ThemeMode, ThemeConfig } from '../types';

// Theme configurations
const LIGHT_THEME: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: '#58a6ff',
    background: '#ffffff',
    text: '#24292f',
    border: '#d0d7de',
    cardBackground: '#f6f8fa',
    sidebarBackground: '#f6f8fa',
    headerBackground: '#f6f8fa',
    muted: '#656d76',
    hover: '#f3f4f6'
  }
};

const DARK_THEME: ThemeConfig = {
  mode: 'dark',
  colors: {
    primary: '#58a6ff',
    background: '#0d1117',
    text: '#f0f6fc',
    border: '#30363d',
    cardBackground: '#161b22',
    sidebarBackground: '#0d1117',
    headerBackground: '#161b22',
    muted: '#6e7681',
    hover: '#21262d'
  }
};

const THEME_STORAGE_KEY = 'ai-mode-ui-theme';

// Private reactive state
const _currentMode = ref<ThemeMode>('light');

export function useTheme() {
  const currentTheme = computed(() => 
    _currentMode.value === 'dark' ? DARK_THEME : LIGHT_THEME
  );

  const isDark = computed(() => _currentMode.value === 'dark');
  const isLight = computed(() => _currentMode.value === 'light');

  function setTheme(mode: ThemeMode): void {
    _currentMode.value = mode;
    applyThemeToDocument(currentTheme.value);
    saveThemePreference(mode);
  }

  function toggleTheme(): void {
    setTheme(_currentMode.value === 'dark' ? 'light' : 'dark');
  }

  function applyThemeToDocument(theme: ThemeConfig): void {
    // Update Bootstrap theme
    document.documentElement.setAttribute('data-bs-theme', theme.mode);
    
    // Update body classes
    document.body.className = theme.mode === 'dark' 
      ? 'bg-dark text-light' 
      : 'bg-light text-dark';
    
    // Update CSS custom properties
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--app-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  }

  function loadThemePreference(): void {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        _currentMode.value = saved;
      } else {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        _currentMode.value = prefersDark ? 'dark' : 'light';
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
      _currentMode.value = 'light';
    }
  }

  function saveThemePreference(mode: ThemeMode): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }

  function initializeTheme(): void {
    loadThemePreference();
    applyThemeToDocument(currentTheme.value);
    
    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        _currentMode.value = e.matches ? 'dark' : 'light';
      }
    });
  }

  // Watch for theme changes and apply them
  watch(currentTheme, (newTheme) => {
    applyThemeToDocument(newTheme);
  }, { deep: true });

  return {
    currentTheme: computed(() => currentTheme.value),
    currentMode: computed(() => _currentMode.value),
    isDark,
    isLight,
    setTheme,
    toggleTheme,
    initializeTheme
  };
}

// Create a singleton instance for global theme management
export const globalTheme = useTheme();