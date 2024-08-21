<template>
  <Navbar />
  <div>

    <router-view />
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue';

export default {
  components: {
    Navbar
  }
};
</script>

<style>
</style>
