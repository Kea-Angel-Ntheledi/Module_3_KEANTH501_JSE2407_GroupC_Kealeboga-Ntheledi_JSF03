<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
      <h2 class="text-center text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="username" id="username" name="username" type="text" autocomplete="username" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <input :type="passwordFieldType" v-model="password" id="password" name="password" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              {{ passwordFieldType === 'password' ? 'Show' : 'Hide' }}
            </button>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" :disabled="loading" 
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <div v-if="error" class="mt-4 text-center text-red-500">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Setup function for the Login component
 *
 * This component provides a form for users to sign in to their accounts.
 * It includes form validation, password visibility toggle, and handling API calls for login.
 */

// Reactive references for form inputs and state management
/**
 * Username entered by the user.
 * @type {import('vue').Ref<string>}
 */
const username = ref('');

/**
 * Password entered by the user.
 * @type {import('vue').Ref<string>}
 */
const password = ref('');

/**
 * Field type for password input (either 'password' or 'text').
 * @type {import('vue').Ref<string>}
 */
const passwordFieldType = ref('password');

/**
 * Loading state to show while login is being processed.
 * @type {import('vue').Ref<boolean>}
 */
const loading = ref(false);

/**
 * Error message to display if login fails.
 * @type {import('vue').Ref<string | null>}
 */
const error = ref(null);

/**
 * Vue Router instance for navigation.
 * @type {import('vue-router').Router}
 */
const router = useRouter();

/**
 * Toggles the visibility of the password field.
 * If the password is currently hidden, this function will show it, and vice versa.
 */
const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

/**
 * Handles the login form submission.
 * This function sends a login request to the Fake Store API and handles the response.
 * If the login is successful, the user is redirected to the desired page.
 * If the login fails, an error message is shown.
 * 
 * @returns {Promise<void>}
 */
const handleLogin = async () => {
  // Ensure both username and password are provided
  if (!username.value || !password.value) {
    error.value = 'Username and password are required';
    return;
  }

  // Reset error and set loading state
  loading.value = true;
  error.value = null;

  try {
    // Make login request to the Fake Store API
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    // Check for failed response
    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Parse the response data
    const data = await response.json();
    console.log(data); // Debugging: Log the API response

    // Store JWT token in localStorage
    localStorage.setItem('jwt', data.token);

    // Redirect to the desired path after login
    const redirectPath = localStorage.getItem('redirectPath') || '/';
    router.push(redirectPath);
  } catch (err) {
    // Handle login error
    error.value = 'Login failed. Please check your credentials.';
  } finally {
    // Reset loading state
    loading.value = false;
  }
};

</script>

<style scoped>
/* Add specific styles for the Login component */
</style>
