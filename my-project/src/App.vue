<template>
  <div>
    <!-- Render the Navbar component -->
    <Navbar />

    <!-- Render the content for the current route -->
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/NavBar.vue';
</script>