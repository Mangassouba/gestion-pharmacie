// store/statisticsStore.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    productStatistics: {
      inStockCount: 0,
      outOfStockCount: 0,
    },
    todaySalesCount: 0,
  }),
  actions: {
    async fetchProductStatistics() {
      try {
        const response = await axios.get('http://localhost:3000/statistics');
        this.productStatistics = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques de produits :", error);
      }
    },
    async fetchTodaySalesCount() {
      try {
        const response = await axios.get('http://localhost:3000/sales/today');
        this.todaySalesCount = response.data.salesCount;
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de ventes du jour :", error);
      }
    },
  },
});
