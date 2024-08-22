<template>
  <div class="m-10 relative p-4 bg-white shadow-md rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200 my-4">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
          <th class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="product in cartItems" :key="product.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ product.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <img :src="product.image" class="rounded w-20 h-20 object-contain" :alt="product.title" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ product.title }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <i @click="incrementQ(product)" class="bi bi-caret-up cursor-pointer text-blue-500"></i>
            <span class="mx-2">{{ product.quantity }}</span>
            <i @click="decrementQ(product)" class="bi bi-caret-down cursor-pointer text-blue-500"></i>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">${{ product.price }}</td>
          <td class="px-6 py-4 whitespace-nowrap">${{ product.price * product.quantity }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <i @click="removeFromCart(product)" class="bi bi-cart-x cursor-pointer text-red-500"></i>
          </td>
        </tr>
        <tr>
          <th colSpan="3" class="px-6 py-4 text-center text-gray-700">Total</th>
          <td colSpan="3" class="px-6 py-4 text-center">
            <span class="bg-red-500 text-white rounded-full px-3 py-1">
              ${{ total }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-row justify-between items-center gap-4">
      <button @click="clearCart" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
        CLEAR CART
      </button>
      <button class="bg-gray-600 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
        CHECK OUT
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

/**
 * @typedef {Object} Product
 * @property {number} id - The unique identifier of the product.
 * @property {string} title - The name of the product.
 * @property {string} image - The image URL of the product.
 * @property {number} price - The price of the product.
 * @property {number} quantity - The quantity of the product in the cart.
 */

/**
 * @description Array to store the cart items.
 * @type {import('vue').Ref<Product[]>}
 */
const cartItems = ref([]);

/**
 * @description Fetches the cart items from local storage when the component is mounted.
 */
const fetchCartItems = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cartItems.value = JSON.parse(storedCart);
  }
};

/**
 * @description Called when the component is mounted, fetches the cart items.
 */
onMounted(fetchCartItems);

/**
 * @description Increments the quantity of a product in the cart.
 * @param {Product} product - The product whose quantity should be increased.
 */
const incrementQ = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems.value[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

/**
 * @description Decrements the quantity of a product in the cart. If the quantity reaches 1, it will not go below.
 * @param {Product} product - The product whose quantity should be decreased.
 */
const decrementQ = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1 && cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

/**
 * @description Removes a product from the cart.
 * @param {Product} product - The product to be removed.
 */
const removeFromCart = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

/**
 * @description Clears all items from the cart and removes them from local storage.
 */
const clearCart = () => {
  cartItems.value = [];
  localStorage.removeItem('cart');
};

/**
 * @description Computes the total price of all items in the cart.
 * @returns {number} The total price of the cart items.
 */
const total = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});
</script>

<style scoped>
/* Add your custom styles here */
</style>
