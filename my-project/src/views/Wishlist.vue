<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Your Wishlist</h1>
    <div v-if="favoriteProducts.length === 0">
      <p>Your wishlist is empty.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="product in favoriteProducts" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4">
        <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
          <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
        </router-link>
        <div class="card-content p-4 flex flex-col">
          <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
          <p class="text-gray-700 mb-2 font-bold">${{ product.price }}</p>
          <p class="text-gray-500">{{ product.category }}</p>
          <!-- Check if product.rating and product.rating.rate exist before displaying them -->
          <p v-if="product.rating" class="text-gray-700 mb-4">
            Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
          </p>
          <p v-else class="text-gray-700 mb-4">No rating available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const favoriteProducts = ref([]);

onMounted(() => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log("Favorites in Wishlist:", storedFavorites);
  favoriteProducts.value = storedFavorites;
});
</script>
