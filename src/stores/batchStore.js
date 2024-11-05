import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './authStore';

export const useBatcheStore = defineStore('batch', {
  state: () => ({
    batches: [],
    tokenUserActif: localStorage.getItem("token")
  }),
  actions: {
    async fetchBatch() {
      // const authStore = useAuthStore();
      // console.log(authStore.token);
      
      // console.log("TOKEN FROM batch :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/batches", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`
          }
          
        });
        
        
        this.batches = response.data; // Set the batches array with response data
        
        // console.log(this.batches);
        return this.batchs;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error.message);
        throw error;
      }
    },
    
  getbatchById(batchId) {
    return this.batches.find(p => p.id === batchId);
 },
    async addbatch(batchData) {
      // const authStore = useAuthStore();

      try {
        const response = await axios.post('http://localhost:3000/batches/', batchData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
          
        });
        this.batches.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l’ajout du produit:', error);
      }
    },
    async updatebatch(batchId, batchData) {
      console.log(batchId);
      
      console.log("TOKEN FROM batch :",this.tokenUserActif);
      try {
        const response = await axios.put(`http://localhost:3000/batches/${batchId}`, batchData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        const index = this.batches.findIndex(batch => batch.id === batchId);
        if (index !== -1) this.batches[index] = response.data;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
      }
    },
    async deletebatch(batchId) {
    //   const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/batches/${batchId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        this.batches = this.batches.filter(batch => batch.id !== batchId);
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
      }
    },
  },
});
