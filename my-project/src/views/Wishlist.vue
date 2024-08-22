<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Loop through favorite products and display each one -->
    <div v-for="product in favoriteProducts" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:border-black hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
        <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
      </router-link>
      <div class="card-content p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
        <p class="text-gray-700 mb-2 font-bold">${{ product.price }}</p>
        <p class="text-blue-500">{{ product.category }}</p>
        <p class="text-gray-700 mb-4">
          Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
        </p>
        <div class="mt-auto flex justify-evenly items-center">
          <!-- Favorite toggle button -->
          <button @click="toggleFavorite(product.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-gray-300': !isFavorite(product.id), 'text-red-500': isFavorite(product.id)}" class="w-6 h-6" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <!-- Add to cart button -->
          <button 
            @click="addToCart(product)"
            class="bg-blue-900 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

/**
 * @fileoverview This component displays the user's favorite products and allows them to toggle favorites or add products to the cart.
 * @module Wishlist
 */

/**
 * A reactive reference holding the user's favorite products.
 * @type {import('vue').Ref<Array<Object>>}
 */
const favoriteProducts = ref([]);

/**
 * Loads the user's favorite product IDs from localStorage and fetches the corresponding product details from the API.
 * @async
 * @function loadFavorites
 * @returns {Promise<void>}
 */
const loadFavorites = async () => {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    const favoriteIds = JSON.parse(storedFavorites);
    favoriteProducts.value = await fetchProductsByIds(favoriteIds);
  }
};

/**
 * Fetches product details for the given array of product IDs.
 * @async
 * @function fetchProductsByIds
 * @param {Array<string|number>} ids - Array of product IDs to fetch details for.
 * @returns {Promise<Array<Object>>} - Array of product objects corresponding to the provided IDs.
 */
const fetchProductsByIds = async (ids) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const allProducts = response.data;
    return allProducts.filter(product => ids.includes(product.id));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

/**
 * Toggles the favorite status of a product by adding or removing it from the favorites list stored in localStorage.
 * @function toggleFavorite
 * @param {string | number} productId - The ID of the product to toggle as a favorite.
 * @returns {void}
 */
const toggleFavorite = (productId) => {
  let favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favoriteIds.includes(productId)) {
    favoriteIds = favoriteIds.filter(id => id !== productId);
  } else {
    favoriteIds.push(productId);
  }

  localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  loadFavorites();
};

/**
 * Checks if a product is marked as a favorite.
 * @function isFavorite
 * @param {string | number} productId - The ID of the product to check.
 * @returns {boolean} - True if the product is a favorite, false otherwise.
 */
const isFavorite = (productId) => {
  const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
  return favoriteIds.includes(productId);
};

/**
 * Adds a product to the cart stored in localStorage.
 * @function addToCart
 * @param {Object} product - The product object to add to the cart.
 * @returns {void}
 */
const addToCart = (product) => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const index = cartItems.findIndex(item => item.id === product.id);
  if (index === -1) {
    cartItems.push({ ...product, quantity: 1 });
  } else {
    cartItems[index].quantity += 1;
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
};

/**
 * Lifecycle hook that runs when the component is mounted.
 * It loads the user's favorite products.
 */
onMounted(() => {
  loadFavorites();
});
</script>

<style scoped>
/* Scoped styles for Wishlist component */
</style>
