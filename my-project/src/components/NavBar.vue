<template>
  <header class="sticky top-0 z-50 bg-gray-500 border-gray-200">
    <nav class="bg-gray-500 border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- Brand name -->
        <a class="flex items-center space-x-3 rtl:space-x-reverse" href="/">
          <img src="../assets/online-shop.png" class="h-8" alt="SwiftCart">
          <span class="text-2xl font-semibold text-white">SwiftCart</span>
        </a>

        <!-- Menu toggle button for smaller screens -->
        <button @click="toggleMenu" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-dropdown" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>

        <!-- Navigation links and dropdown menu -->
        <div :class="{'hidden': !open, 'block': open}" class="md:flex md:w-auto" id="navbar-dropdown">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a href="/" class="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Wishlist</a>
            </li>
            <li class="relative">
              <a href="./" class="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                Cart
                <span v-if="cartItemCount > 0" class="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-xs text-white">{{ cartItemCount }}</span>
              </a>
            </li>
            <li>
              <a href="./" class="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Navbar',

  setup() {
    const open = ref(false);
    const cartItemCount = ref(2); 
    const toggleMenu = () => {
      open.value = !open.value;
    };

    return {
      open,
      toggleMenu,
      cartItemCount,
    };
  },
};
</script>

<style scoped>

</style>
