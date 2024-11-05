import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const usemovementStore = defineStore("movement", {
  state: () => ({
    movements: [],
    tokenUserActif: localStorage.getItem("token"),
  }),
  actions: {
    async fetchMovements() {

      // console.log("TOKEN FROM movement :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/movements", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });

        this.movements = response.data; // Set the movements array with response data

        console.log(this.movements);
        return this.movements;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits :",
          error.message
        );
        throw error;
      }
    },

    getmovementById(movementId) {
      return this.movements.find((p) => p.id === movementId);
    },
  },
});
