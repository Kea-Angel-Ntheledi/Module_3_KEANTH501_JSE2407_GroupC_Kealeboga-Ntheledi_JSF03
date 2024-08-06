<template>
  <div>
    <!-- Render the Navbar component -->
    <Navbar />

    <!-- Render the content for the current route -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
};
</script>
