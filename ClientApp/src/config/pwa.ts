// Progressive Web App configuration
export const PWA_CONFIG = {
  name: 'AI Mode UI',
  short_name: 'AI Mode UI',
  description: 'A Vue 3 + Bootstrap 5 AI streaming interface demo',
  theme_color: '#58a6ff',
  background_color: '#ffffff',
  display: 'standalone',
  start_url: '/',
  icons: [
    {
      src: '/icon-192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icon-512.png', 
      sizes: '512x512',
      type: 'image/png'
    }
  ]
} as const;

// Service Worker registration
export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  }
}