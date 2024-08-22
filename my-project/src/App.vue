<template>
  <!-- Navbar component and router view for rendering matched routes -->
  <Navbar />
  <div>
    <router-view />
  </div>
</template>

<script>
/**
 * @module MainComponent
 * 
 * This is the main component of the application. It includes:
 * - A `Navbar` component, which is responsible for the navigation menu.
 * - A `router-view`, which renders the component matched by the current route.
 */

import Navbar from './components/NavBar.vue';

export default {
  name: 'MainComponent',

  components: {
    /**
     * The Navbar component used for navigation.
     * @component
     */
    Navbar
  }
};
</script>

<style>
/* Add your component-specific styles here */
</style>
