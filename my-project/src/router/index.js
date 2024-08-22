import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ProductDetail from '../views/ProductDetails.vue';
import Wishlist from '../views/Wishlist.vue';
import Cart from '../views/Cart.vue';

/**
 * @typedef {Object} Route
 * @property {string} path - The URL path.
 * @property {string} name - The name of the route.
 * @property {Object} component - The component to render when the route is matched.
 * @property {boolean} [props] - If true, route params will be passed as props to the component.
 * @property {Object} [meta] - Additional meta information for the route.
 * @property {boolean} [meta.requiresAuth] - Indicates if authentication is required for the route.
 */

/**
 * @description Array of route definitions for the application.
 * @type {Route[]}
 */
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/product/:id', name: 'product', component: ProductDetail, props: true, meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'wishlist', component: Wishlist },
  { path: '/cart', name: 'cart', component: Cart }
];

/**
 * @description Creates a new Vue Router instance with the specified history mode and routes.
 * @returns {import('vue-router').Router} Vue Router instance.
 */
const router = createRouter({
  history: createWebHistory('/'),  // Updated to use a static base URL
  routes
});

/**
 * @description Global navigation guard that checks authentication before navigating to a route.
 * If the route requires authentication and the user is not logged in, they are redirected to the login page.
 * @param {import('vue-router').RouteLocationNormalized} to - The target route being navigated to.
 * @param {import('vue-router').RouteLocationNormalized} from - The current route being navigated from.
 * @param {Function} next - The function to call to resolve the navigation.
 */
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('jwt');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    // Store the intended path and redirect to login
    localStorage.setItem('redirectPath', to.fullPath);
    next('/login');
  } else {
    next();
  }
});

export default router;
