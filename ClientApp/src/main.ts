import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import App from './App.vue'
import { registerServiceWorker } from './config/pwa'

const app = createApp(App);

// Register PWA service worker
registerServiceWorker();

// Global error handler
app.config.errorHandler = (err, _instance, info) => {
  console.error('Global error:', err, info);
  // Could send to error tracking service here
};

app.mount('#app')
