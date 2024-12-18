import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification';
import { useAuthStore } from './authStore';

const toast = useToast();
export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    tokenUserActif: localStorage.getItem("token")
  }),
  actions: {
    async fetchcustomers() {
      // const authStore = useAuthStore();
      // console.log(authStore.token);
      
      // console.log("TOKEN FROM customer :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/customers", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`
          }
          
        });
        
        
        this.customers = response.data; // Set the customers array with response data
        
        // console.log(this.customers);
        return this.customers;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error.message);
        throw error;
      }
    },
    
  getcustomerById(customerId) {
    return this.customers.find(p => p.id === customerId);
 },
    async addcustomer(customerData) {
      // const authStore = useAuthStore();

      try {
        const response = await axios.post('http://localhost:3000/customers/', customerData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
          
        });
        this.customers.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l’ajout du customer:', error.message);
        throw error;
      }
    },
    async updatecustomer(customerId, customerData) {
      console.log(customerId);
      
      console.log("TOKEN FROM customer :",this.tokenUserActif);
      try {
        const response = await axios.put(`http://localhost:3000/customers/${customerId}`, customerData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        const index = this.customers.findIndex(customer => customer.id === customerId);
        if (index !== -1) this.customers[index] = response.data;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error.message);
        throw error
      }
    },
    async deletecustomer(customerId) {
      try {
        await axios.delete(`http://localhost:3000/customers/${customerId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
    
        // Met à jour la liste des clients localement
        this.customers = this.customers.filter(customer => customer.id !== customerId);
      } catch (error) {
        console.log(error.response);
        
        // Vérifie si une réponse du backend est présente
          // console.error('Erreur lors de la suppression du client:', error.message);
          // throw error;
          const message = error.response?.data?.message || "Erreur lors de la suppression du client.";
          toast.error(message);
          console.log("5465435354 ",message);
          
          throw new Error(message);
        
      }
    },
  },
});
