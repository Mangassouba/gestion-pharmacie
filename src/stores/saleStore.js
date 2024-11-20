import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useSaleStore = defineStore("sale", {
  state: () => ({
    sales: [],
    tokenUserActif: localStorage.getItem("token"),
  }),
  actions: {
    async fetchSales() {

      // console.log("TOKEN FROM sale :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/sale", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });

        this.sales = response.data; // Set the sales array with response data

        console.log(this.sales);
        return this.sales;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits :",
          error.message
        );
        throw error;
      }
    },

    getSaleById(saleId) {
      return this.sales.find((p) => p.id === saleId);
    },
    async addSale(saleData) {
        console.log("donneeeeee",saleData);
        
      try {
        const response = await axios.post(
          "http://localhost:3000/sale",
          saleData,
          {
            headers: {
              Authorization: `Bearer ${this.tokenUserActif}`,
            },
          }
        );
        this.sales.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l’ajout du produit:", error.message);
        throw error;
      }
    },
    async updateSale(saleId, saleData) {
      console.log(saleId);

      console.log("TOKEN FROM sale :", this.tokenUserActif);
      try {
        const response = await axios.put(
          `http://localhost:3000/sale/${saleId}`,
          saleData,
          {
            headers: {
              Authorization: `Bearer ${this.tokenUserActif}`,
            },
          }
        );
        const index = this.sales.findIndex(
          (sale) => sale.id === saleId
        );
        if (index !== -1) this.sales[index] = response.data;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de commande:", error.message);
        throw error;
      }
    },
    async deleteSale(saleId) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/sale/${saleId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        this.sales = this.sales.filter(
          (sale) => sale.id !== saleId
        );
      } catch (error) {
        console.error("Erreur lors de la suppression de commande:", error.message);
        throw error;
      }
    },
  },
});
