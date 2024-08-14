<template>
  <div class="loading text-center text-2xl justify-center items-center">
    Loading...
  </div>
</template>

<script setup>
/**
 * @fileoverview A component that displays a loading indicator.
 * This component is used to show a loading message to users while data is being fetched or processed.
 */

/**
 * The name of the component.
 * @type {string}
 */
const name = 'LoadingComponent';
</script>

<style scoped>
/* Add styles for the loading indicator if needed */
.loading {
  display: flex;
  height: 100vh; /* Full viewport height */
  justify-content: center;
  align-items: center;
}
</style>
