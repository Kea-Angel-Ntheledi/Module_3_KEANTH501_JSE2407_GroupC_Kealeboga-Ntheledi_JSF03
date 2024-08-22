<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-for="product in products" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border border-gray-400 p-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:scale-105 duration-300 flex flex-col h-full">
      <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
        <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
      </router-link>
      <div class="card-content p-4 flex flex-col flex-grow border">
        <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
        <p class="text-gray-700 mb-2 font-bold">${{ product.price }}</p>
        <p class="text-gray-500">{{ product.category }}</p>
        <p class="text-gray-700 mb-4">
          Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
        </p>
        <div class="mt-auto flex justify-evenly items-center">
          <button @click="toggleFavorite(product.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-gray-300': !isFavorite(product.id), 'text-red-500': isFavorite(product.id)}" class="w-6 h-6" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <button 
            @click="addToCart(product)"
            class="bg-gray-900 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showLoginPopup" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div class="bg-white p-8 rounded shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Log In First</h2>
      <p class="mb-4">You need to log in to add items to the cart.</p>
      <button @click="closeLoginPopup" class="bg-gray-800 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

/**
 * @typedef {Object} Product
 * @property {number} id - The product ID.
 * @property {string} image - The URL of the product image.
 * @property {string} title - The title of the product.
 * @property {number} price - The price of the product.
 * @property {string} category - The category of the product.
 * @property {Object} rating - The rating object.
 * @property {number} rating.rate - The rating score.
 * @property {number} rating.count - The number of reviews.
 */

/**
 * Props received from the parent component.
 */
const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

/**
 * @description State for tracking favorite products.
 * @type {import('vue').Ref<number[]>}
 */
const favorites = ref([]);

/**
 * @description State for tracking cart items.
 * @type {import('vue').Ref<Object[]>}
 */
const cart = ref([]);

/**
 * @description State for controlling the login popup visibility.
 * @type {import('vue').Ref<boolean>}
 */
const showLoginPopup = ref(false);

/**
 * Fetch data from local storage for favorites and cart when the component is mounted.
 */
onMounted(() => {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
  }
});

/**
 * @function toggleFavorite
 * @description Adds or removes a product from the favorites list.
 * @param {number} productId - The ID of the product to toggle.
 */
const toggleFavorite = (productId) => {
  const index = favorites.value.indexOf(productId);
  if (index > -1) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.push(productId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

/**
 * @function isFavorite
 * @description Checks if a product is in the favorites list.
 * @param {number} productId - The ID of the product to check.
 * @returns {boolean} Whether the product is in the favorites list or not.
 */
const isFavorite = (productId) => {
  return favorites.value.includes(productId);
};

/**
 * @function addToCart
 * @description Adds a product to the cart, if the user is authenticated.
 * If not authenticated, shows a login prompt.
 * @param {Product} product - The product to add to the cart.
 */
const addToCart = (product) => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    showLoginPopup.value = true;
    return;
  }

  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cartItems.findIndex(item => item.id === product.id);
  if (index > -1) {
    cartItems[index].quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

/**
 * @function closeLoginPopup
 * @description Closes the login popup.
 */
const closeLoginPopup = () => {
  showLoginPopup.value = false;
};
</script>

<style scoped>
.card-container {
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #cbd5e0; /* gray-400 */
}
</style>
