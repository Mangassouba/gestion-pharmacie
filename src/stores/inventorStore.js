import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './authStore';

export const useinventoriesStore = defineStore('inventories', {
  state: () => ({
    inventories: [],
    tokenUserActif: localStorage.getItem("token")
  }),
  actions: {
    async fetchInventories() {
      // const authStore = useAuthStore();
      // console.log(authStore.token);
      
      // console.log("TOKEN FROM inventories :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/inventories", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`
          }
          
        });
        
        
        this.inventories = response.data; // Set the inventoriess array with response data
        
        // console.log(this.inventoriess);
        return this.inventories;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error.message);
        throw error;
      }
    },
    
  getInventoriesById(inventoriesId) {
    return this.inventories.find(p => p.id === inventoriesId);
 },
    async addInventories(inventoriesData) {
      // const authStore = useAuthStore();

      try {
        const response = await axios.post('http://localhost:3000/inventories/', inventoriesData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
          
        });
        this.inventories.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l’ajout du produit:', error);
      }
    },
    async updateinventories(inventoriesId, inventoriesData) {
      console.log(inventoriesId);
      
      console.log("TOKEN FROM inventories :",this.tokenUserActif);
      try {
        const response = await axios.put(`http://localhost:3000/inventoriess/${inventoriesId}`, inventoriesData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        const index = this.inventories.findIndex(inventories => inventories.id === inventoriesId);
        if (index !== -1) this.inventoriess[index] = response.data;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
      }
    },
    async deleteInventories(inventoriesId) {
    //   const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/inventories/${inventoriesId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        this.inventories = this.inventories.filter(inventories => inventories.id !== inventoriesId);
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
      }
    },
  },
});
