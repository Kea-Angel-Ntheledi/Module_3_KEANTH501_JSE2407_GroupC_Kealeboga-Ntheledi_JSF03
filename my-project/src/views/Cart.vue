<!-- CartComponent.vue -->
<template>
  <div class="p-4 bg-white shadow-md rounded-lg overflow-hidden sm:p-6">
    <table class="min-w-full divide-y divide-gray-200 my-4">
      <!-- ... table content ... -->
    </table>
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <button @click="clearCart" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
        CLEAR CART
      </button>
      <button class="bg-gray-800 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
        CHECK OUT
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const cartItems = ref([]);

onMounted(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cartItems.value = JSON.parse(storedCart);
  }
});

const incrementQ = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems.value[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

const decrementQ = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1 && cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

const removeFromCart = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

const clearCart = () => {
  cartItems.value = [];
  localStorage.removeItem('cart');
};

const total = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});
</script>
<!-- App.vue -->
