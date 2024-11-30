import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './authStore';
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    suppliers: [],
    tokenUserActif: localStorage.getItem("token")
  }),
  actions: {
    async fetchSuppliers() {
      
      // console.log("TOKEN FROM supplier :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/suppliers", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`
          }
          
        });
        
        
        this.suppliers = response.data; // Set the suppliers array with response data
        
        // console.log(this.suppliers);
        return this.suppliers;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error.message);
        throw error;
      }
    },
    
  getsupplierById(supplierId) {
    return this.suppliers.find(p => p.id === supplierId);
 },
    async addSupplier(supplierData) {
      // const authStore = useAuthStore();

      try {
        const response = await axios.post('http://localhost:3000/suppliers/', supplierData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
          
        });
        this.suppliers.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l’ajout du produit:', error.message);
        throw error;
      }
    },
    async updateSupplier(supplierId, supplierData) {
      console.log(supplierId);
      
      console.log("TOKEN FROM supplier :",this.tokenUserActif);
      try {
        const response = await axios.put(`http://localhost:3000/suppliers/${supplierId}`, supplierData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        const index = this.suppliers.findIndex(supplier => supplier.id === supplierId);
        if (index !== -1) this.suppliers[index] = response.data;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error.message);
        throw error;
      }
    },
    async deleteSupplier(supplierId) {
    //   const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/suppliers/${supplierId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        this.suppliers = this.suppliers.filter(supplier => supplier.id !== supplierId);
      } catch (error) {
        const message = error.response?.data?.message || "Erreur lors de la suppression du client.";
          toast.error(message);
          console.log("5465435354 ",message);
          
          throw new Error(message);
      }
    },
  },
});
