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
    monthlySales: [],
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
        this.monthlySales = response.data.monthlySales;
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de ventes du jour :", error);
      }
    },
    async fetchLowStockProducts () {
      try {
        const response = await axios.get(`http://localhost:3000/low-stock`);
        return response.data;
      } catch (error) {
        console.error('Error fetching low stock products:', error);
        throw error;
      }
    },
    async getExpiringProductsCount () {
      try {
        const response = await axios.get('http://localhost:3000/expiring-batches'); 
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la récupération des produits expirants:', error);
        throw error;
      }
    }
  },
});
