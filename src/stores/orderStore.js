import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    tokenUserActif: localStorage.getItem("token"),
  }),
  actions: {
    async fetchOrders() {

      // console.log("TOKEN FROM order :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/orders", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });

        this.orders = response.data; // Set the orders array with response data

        console.log(this.orders);
        return this.orders;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits :",
          error.message
        );
        throw error;
      }
    },

    getOrderById(orderId) {
      return this.orders.find((p) => p.id === orderId);
    },
    async addOrder(orderData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/orders",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${this.tokenUserActif}`,
            },
          }
        );
        this.orders.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l’ajout du produit:", error.message);
        throw error;
      }
    },
    async updateOrder(orderId, orderData) {
      console.log(orderId);

      console.log("TOKEN FROM order :", this.tokenUserActif);
      try {
        const response = await axios.put(
          `http://localhost:3000/orders/${orderId}`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${this.tokenUserActif}`,
            },
          }
        );
        const index = this.orders.findIndex(
          (order) => order.id === orderId
        );
        if (index !== -1) this.orders[index] = response.data;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de commande:", error);
      }
    },
    async deleteorder(orderId) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        this.orders = this.orders.filter(
          (order) => order.id !== orderId
        );
      } catch (error) {
        console.error("Erreur lors de la suppression de commande:", error.message);
        throw error;
      }
    },
  },
});
