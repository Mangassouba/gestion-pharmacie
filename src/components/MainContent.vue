<template>
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="card text-white bg-success mb-3">
            <div class="card-body">
              <h5 class="card-title">Products in Stock</h5>
              <p class="card-text">{{ statisticsStore.productStatistics.inStockCount }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-white bg-danger mb-3">
            <div class="card-body">
              <h5 class="card-title">Out of stock products</h5>
              <p class="card-text">{{ statisticsStore.productStatistics.outOfStockCount }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-3">
          <div class="card text-white bg-warning mb-3">
            <div class="card-body">
              <h5 class="card-title">Commandes en Attente</h5>
              <p class="card-text">15</p>
            </div>
          </div>
        </div> -->
        <div class="col-md-4">
          <div class="card text-white bg-info mb-3">
            <div class="card-body">
              <h5 class="card-title">Today's Sales</h5>
              <p class="card-text">{{ statisticsStore.todaySalesCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { onMounted } from 'vue';
import { useStatisticsStore } from '../stores/statisticStore';

const statisticsStore = useStatisticsStore();

onMounted(() => {
  statisticsStore.fetchProductStatistics();
  statisticsStore.fetchTodaySalesCount();
});
  </script>
  