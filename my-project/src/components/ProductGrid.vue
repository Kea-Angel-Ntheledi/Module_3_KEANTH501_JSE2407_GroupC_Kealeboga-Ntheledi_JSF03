<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Iterate over products and display each one -->
    <div v-for="product in products" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <!-- Link to product details page -->
      <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
        <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
      </router-link>
      <div class="card-content p-4 flex flex-col flex-grow">
        <!-- Product title -->
        <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
        <!-- Product price -->
        <p class="text-gray-700 mb-2">${{ product.price }}</p>
        <!-- Product category -->
        <p class="text-gray-500 mb-2">{{ product.category }}</p>
        <!-- Product rating -->
        <div class="flex items-center mb-4">
          <svg v-for="index in Math.round(product.rating.rate)" :key="index" class="w-4 h-4 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 15l-3.09 1.63.58-3.38L3 8.65l3.41-.49L10 2l1.59 3.63L15 8.65l-3.49.5.58 3.38L10 15z"/>
          </svg>
          <span class="text-gray-700 ml-2">({{ product.rating.count }} reviews)</span>
        </div>
        <div class="mt-auto flex justify-evenly items-center">
          <!-- Toggle favorite button -->
          <button @click="toggleFavorite(product.id)" class="text-gray-500 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-gray-300': !isFavorite(product.id), 'text-red-500': isFavorite(product.id)}" class="w-6 h-6" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <!-- Add to cart button -->
          <button @click="addToCart(product.id)" class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200">
            Add To Cart +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define the props for the component
const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

// Reactive reference for favorites
const favorites = ref([]);

// Function to toggle favorite status
const toggleFavorite = (productId) => {
  const index = favorites.value.indexOf(productId);
  if (index > -1) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.push(productId);
  }
  // Save favorites to local storage
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

// Function to check if a product is a favorite
const isFavorite = (productId) => {
  return favorites.value.includes(productId);
};

// Function to add a product to the cart
const addToCart = (productId) => {
  // Implement your add to cart logic here
  console.log(`Product ${productId} added to cart`);
};

// Load favorites from local storage on component mount
onMounted(() => {
  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites);
  }
});
</script>

<style scoped>
.card-container {
  transition: box-shadow 0.3s ease;
}
</style>
