import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

/**
 * Initializes and mounts the Vue application.
 * @function
 * @returns {void}
 */
createApp(App)
  .use(router)
  .mount('#app');
