import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Path to Home.vue
import ProductDetail from '../views/ProductDetails.vue';
 // Path to ProductDetail.vue

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


