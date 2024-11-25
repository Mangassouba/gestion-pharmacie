<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-3">
        <div class="card text-white bg-success mb-3">
          <div class="card-body">
            <div class="cardre">
              <h5 class="card-title">Products in Stock</h5>
              <i class="fas fa-boxes fa-lg me-2"></i>
            </div>
            <p class="card-text">{{ statisticsStore.productStatistics.inStockCount }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-danger mb-3">
          <div class="card-body">
            <div class="cardre">
              <h5 class="card-title">Out of Stock Products</h5>
              <i class="fas fa-exclamation-triangle fa-lg me-2"></i>
            </div>
            <p class="card-text">{{ lowStockProducts.length }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-info mb-3">
          <div class="card-body">
            <div class="cardre">
              <h5 class="card-title">number of monthly sales</h5>
            <i class="fas fa-chart-line fa-lg me-2"></i>
            </div>
            <p class="card-text">
              {{ currentMonthSales }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-warning mb-3">
          <div class="card-body">
            <div class="cardre">
              <h5 class="card-title">Products Near Expiration</h5>
              <i class="fas fa-hourglass-half fa-lg me-2"></i>
            </div>
            <p class="card-text">
              {{ expiringBatchCount }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Produits avec stock faible et graphique côte à côte -->
    <div class="row mt-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Products with low stock</h5>
            <div v-if="loadingLowStock">Loading products...</div>
            <div v-else-if="lowStockError" class="text-danger">
              Erreur : {{ lowStockError }}
            </div>
            <div v-else>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Threshold</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in lowStockProducts" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td class="text-danger">{{ product.stock }}</td>
                    <td>{{ product.threshold }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Expiring Products</h5>
            <div v-if="loadingExpiring">Loading expiring products...</div>
            <div v-else-if="expiringError" class="text-danger">
              Error: {{ expiringError }}
            </div>
            <div v-else>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Expiration Date</th>
                    <th>Quantity</th>
                    <th>Batch Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="batch in expiringBatches" :key="batch.batchNumber">
                    <td>{{ batch.productName }}</td>
                    <td class="text-danger">{{ new Date(batch.expirationDate).toLocaleDateString() }}</td>
                    <td>{{ batch.quantity }}</td>
                    <td>{{ batch.batchNumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-9 m-auto">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Monthly Sales</h5>
            <canvas id="monthly-sales-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStatisticsStore } from '../stores/statisticStore';
import { Chart, registerables } from 'chart.js';

const statisticsStore = useStatisticsStore();

const lowStockProducts = ref([]);
const loadingLowStock = ref(true);
const lowStockError = ref(null);
const expiringError = ref(null);

const expiringBatches = ref([]);
const loadingExpiring = ref(true);

onMounted(async () => {
  try {
    await statisticsStore.fetchProductStatistics();
    statisticsStore.fetchTodaySalesCount();

    const data = await statisticsStore.fetchLowStockProducts();
    lowStockProducts.value = data.products;
    const expiringData = await statisticsStore.getExpiringProductsCount();
    expiringBatches.value = expiringData.details;
  } catch (err) {
    lowStockError.value = err.message || 'Erreur inconnue';
    expiringError.value = err.message || 'Unknown error';
  } finally {
    loadingLowStock.value = false;
    loadingExpiring.value = false;
  }
  createChart(statisticsStore.monthlySales);
});


const expiringBatchCount = computed(() => expiringBatches.value.length);

const currentMonthSales = computed(() => {
  const currentMonth = new Date().getMonth() + 1; 
  const currentYear = new Date().getFullYear(); 

  const sale = statisticsStore.monthlySales.find(
    (s) => s.month === currentMonth && s.year === currentYear
  );

  return sale ? sale.salesCount : 0; 
});

Chart.register(...registerables);

const chart = ref(null);

const createChart = (salesData) => {
  const ctx = document.getElementById('monthly-sales-chart')?.getContext('2d');

  if (!ctx) {
    console.error('Canvas not found!');
    return;
  }

  const labels = salesData.map((sale) => `${sale.month}/${sale.year}`);
  const data = salesData.map((sale) => sale.salesCount);

  if (chart.value) {
    chart.value.destroy();
  }

  chart.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Monthly Sales',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Mois/Année',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Nombre de Ventes',
          },
        },
      },
    },
  });
};
</script>

<style scoped>
.cardre{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-danger {
  color: red;
}
</style>
