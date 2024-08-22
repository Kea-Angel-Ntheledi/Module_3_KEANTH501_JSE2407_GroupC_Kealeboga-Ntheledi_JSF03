import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import axios from 'axios';

/**
 * @typedef {Object} Product
 * @property {number} id - The unique identifier for the product.
 * @property {string} title - The name of the product.
 * @property {string} image - URL of the product image.
 * @property {string} category - The category of the product.
 * @property {number} price - The price of the product.
 * @property {Object} rating - The rating of the product.
 * @property {number} quantity - The quantity of the product in the cart.
 */

/**
 * @description Defines a Pinia store for managing shopping-related data such as products and cart items.
 */
export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    /**
     * @type {Product[]} Array of products fetched from the API.
     */
    products: [],

    /**
     * @type {Product[]} Array of products added to the cart.
     */
    cartItems: [],
  }),

  getters: {
    /**
     * @description Returns the count of items in the cart.
     * @param {Object} state - The state of the store.
     * @returns {number} The number of items in the cart.
     */
    countCartItems: (state) => state.cartItems.length,

    /**
     * @description Returns the cart items.
     * @param {Object} state - The state of the store.
     * @returns {Product[]} Array of products in the cart.
     */
    getCartItems: (state) => state.cartItems,
  },

  actions: {
    /**
     * @description Fetches products from an external API and updates the state with the fetched data.
     * @returns {Promise<void>} A promise that resolves once the products have been fetched.
     */
    async fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.products = response.data;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },

    /**
     * @description Adds a product to the cart or updates the quantity if it already exists.
     * @param {Product} item - The product to add to the cart.
     */
    addToCart(item) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        this.showNotification('success', 'Your item has been updated');
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
        this.showNotification('success', 'Your item has been added to the cart');
      }
    },

    /**
     * @description Increases the quantity of a product in the cart.
     * @param {Product} item - The product whose quantity should be increased.
     */
    incrementQ(item) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        this.showNotification('success', 'Item quantity has been increased');
      }
    },

    /**
     * @description Decreases the quantity of a product in the cart. If the quantity reaches zero, the product is removed.
     * @param {Product} item - The product whose quantity should be decreased.
     */
    decrementQ(item) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems.splice(index, 1);
          this.showNotification('success', 'Item has been removed from the cart');
        } else {
          this.showNotification('success', 'Item quantity has been decreased');
        }
      }
    },

    /**
     * @description Removes a product from the cart.
     * @param {Product} item - The product to remove from the cart.
     */
    removeFromCart(item) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        this.showNotification('success', 'Item has been removed from the cart');
      }
    },

    /**
     * @description Displays a notification using SweetAlert.
     * @param {string} icon - The type of notification (e.g., 'success', 'error').
     * @param {string} title - The message to display in the notification.
     */
    showNotification(icon, title) {
      Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
});
