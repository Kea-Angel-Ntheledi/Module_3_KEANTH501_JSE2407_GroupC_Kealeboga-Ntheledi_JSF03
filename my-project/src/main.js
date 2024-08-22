/**
 * Entry point of the Vue application.
 * This file sets up the Vue app, routing, state management, and external styles.
 */

import { createApp } from 'vue';
import App from './App.vue';
import routing from './router';
import { createPinia } from 'pinia'; 
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * Creates a new instance of the Pinia store for global state management.
 * @type {import('pinia').Pinia}
 */
const pinia = createPinia();

/**
 * Initializes the Vue application.
 * @type {import('vue').App<Element>}
 */
const app = createApp(App);

/**
 * Registers the Pinia store as a plugin to the Vue app.
 * Pinia allows for centralized state management across components.
 */
app.use(pinia);

/**
 * Registers the router as a plugin to the Vue app.
 * Routing manages navigation between different views/components.
 */
app.use(routing);

/**
 * Mounts the Vue application to the DOM element with id 'app'.
 * This renders the Vue component tree in the browser.
 */
app.mount('#app');
