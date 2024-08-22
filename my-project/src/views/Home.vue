<template>
  <div class="container mx-auto p-6">
    <div class="mt-4 flex justify-between items-center flex-wrap mb-4">
      <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <div class="flex items-center mb-2 sm:mb-0">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border p-2 rounded-l"
        />
        <button
          @click="searchProducts"
          class="bg-white text-black border border-l-0 p-2 rounded-r"
        >
          Search
        </button>
      </div>

      <select v-model="sortOrder" class="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="default">Default</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>

    <Loading v-if="loading" />
    <ProductGrid :products="filteredProducts" v-else />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Loading from '../components/Loading.vue';
import ProductGrid from '../components/ProductGrid.vue';

/**
 * Home Component
 *
 * This component displays a list of products, allowing users to filter by category, search, and sort by price.
 * It fetches products and categories from the Fake Store API and renders a ProductGrid component with the filtered products.
 */

/**
 * Reactive reference to store the list of products.
 * @type {import('vue').Ref<Array<Object>>}
 */
const products = ref([]);

/**
 * Reactive reference to store the list of categories.
 * @type {import('vue').Ref<Array<string>>}
 */
const categories = ref([]);

/**
 * Reactive reference for the search query.
 * @type {import('vue').Ref<string>}
 */
const searchQuery = ref('');

/**
 * Reactive reference for the selected category.
 * @type {import('vue').Ref<string>}
 */
const selectedCategory = ref('');

/**
 * Reactive reference for the selected sort order.
 * Possible values: 'asc', 'desc', 'default'.
 * @type {import('vue').Ref<string>}
 */
const sortOrder = ref('');

/**
 * Reactive reference to track the loading state.
 * @type {import('vue').Ref<boolean>}
 */
const loading = ref(true);

/**
 * Fetch products from the Fake Store API.
 * This function retrieves the list of products and updates the `products` reference.
 * @async
 * @returns {Promise<void>}
 */
const fetchProducts = async () => {
  loading.value = true;
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  products.value = data;
  loading.value = false;
};

/**
 * Fetch categories from the Fake Store API.
 * This function retrieves the list of categories and updates the `categories` reference.
 * @async
 * @returns {Promise<void>}
 */
const fetchCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  const data = await response.json();
  categories.value = data;
};

/**
 * Search products based on the search query.
 * This function triggers the recalculation of the filtered products.
 */
const searchProducts = () => {
  // Trigger the computed property to recalculate the filtered products.
};

/**
 * Computed property that filters and sorts products based on the selected category,
 * search query, and sort order.
 * @returns {Array<Object>} The filtered and sorted list of products.
 */
const filteredProducts = computed(() => {
  let prods = products.value;

  if (selectedCategory.value) {
    prods = prods.filter(product => product.category === selectedCategory.value);
  }

  if (sortOrder.value === 'asc') {
    prods = prods.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === 'desc') {
    prods = prods.sort((a, b) => b.price - a.price);
  } else if (sortOrder.value === 'default') {
    prods = prods.sort((a, b) => a.id - b.id);
  }

  if (searchQuery.value) {
    prods = prods.filter(product =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return prods;
});

// Lifecycle hook that runs when the component is mounted.
// Fetches the products and categories from the API.
onMounted(() => {
  fetchProducts();
  fetchCategories();
});

</script>

<style scoped>
/* Add specific styles for the Home component */
</style>
