<template>
  <!-- Loop that renders 20 skeleton loading elements -->
  <div v-for="n in 20" :key="n" class="max-w-screen-xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div class="bg-gray-200 p-4 rounded shadow animate-pulse">
      <div class="bg-gray-300 h-48 mt-3 rounded"></div>
      <div class="h-6 bg-gray-300 mt-4 rounded"></div>
      <div class="h-4 bg-gray-300 mt-2 rounded"></div>
      <div class="h-4 bg-gray-300 mt-2 rounded"></div>
      <div class="h-6 bg-gray-300 mt-4 w-1/2 rounded"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * LoadingComponent is a Vue 3 component that renders
 * a skeleton screen for content loading placeholders.
 *
 * @name LoadingComponent
 * @component
 * @example
 * <LoadingComponent />
 */
export default defineComponent({
  name: 'LoadingComponent',
  
  /**
   * The setup function is part of the Composition API.
   * It initializes the component and provides the reactive
   * state, methods, or computed properties for the template.
   *
   * In this case, no additional logic is needed, but setup is included
   * for extensibility and consistency with Vue 3 best practices.
   *
   * @returns {void} No return value needed since the template does not depend on reactive data
   */
  setup() {
    // Any future logic for the component can be placed here
  },
});
</script>

<style scoped>
</style>
