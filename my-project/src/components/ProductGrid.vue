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
          <button @click="toggleFavorite(product)">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

const favorites = ref([]);

onMounted(() => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log("Stored favorites on mount:", storedFavorites);
  favorites.value = storedFavorites;
});

const toggleFavorite = (product) => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = storedFavorites.findIndex(item => item.id === product.id);

  if (index > -1) {
    storedFavorites.splice(index, 1);
  } else {
    storedFavorites.push(product);
  }

  localStorage.setItem('favorites', JSON.stringify(storedFavorites));
  favorites.value = storedFavorites;
  console.log("Updated favorites:", storedFavorites);
};

const isFavorite = (productId) => {
  return favorites.value.some(product => product.id === productId);
};
</script>
