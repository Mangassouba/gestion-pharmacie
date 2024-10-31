import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './authStore';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    tokenUserActif: localStorage.getItem("token")
  }),
  actions: {
    async fetchProducts() {
      // const authStore = useAuthStore();
      // console.log(authStore.token);
      
      // console.log("TOKEN FROM PRODUCT :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/products", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`
          }
          
        });
        
        
        this.products = response.data; // Set the products array with response data
        
        console.log(this.products);
        return this.products;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error.message);
        throw error;
      }
    },
    async addProduct(productData) {
      // const authStore = useAuthStore();

      try {
        const response = await axios.post('http://localhost:3000/product/', productData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
          
        });
        this.products.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l’ajout du produit:', error);
      }
    },
    async updateProduct(productId, productData) {
      const authStore = useAuthStore();
      try {
        const response = await axios.put(`http://localhost:3000/product/${productId}`, productData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) this.products[index] = response.data;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
      }
    },
    async deleteProduct(productId) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        this.products = this.products.filter(product => product.id !== productId);
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
      }
    },
  },
});
