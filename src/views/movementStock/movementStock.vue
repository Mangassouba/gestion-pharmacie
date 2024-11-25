<template>
    <div class="container mt-4">
      <h2 class="">List of movements</h2>
      <div class="row d-flex mt-4">
        <div class="col-3">
  <input
    type="search"
    v-model="searchQuery"
    class="form-control"
    placeholder="Search by type or product name"
  />
</div>
<div class="col-3">
  <input
    type="date"
    v-model="searchDate"
    class="form-control"
    placeholder="Search by date"
  />
</div>
        <div class="col-6"></div>
      </div>
  
      <table class="table table-striped mt-4 mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Quantity</th>
            <th>Date Movement</th>
            <th>Type</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movement, index) in paginatedmovement" :key="movement.id">
            <td>{{ movement.id }}</td>
            <td>{{ movement.quantity }}</td>
            <td>{{ formatDate(movement.movement_date) }}</td>
            <td>{{ movement.type }}</td>
            <td>{{ getProductName(movement.productId) }}</td>
          </tr>
        </tbody>
        <RouterView />
      </table>
  
      <!-- Pagination Controls -->
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage">Previous</button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="currentPage = page">
              {{ page }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { RouterView } from "vue-router";
  import { usemovementStore } from "../../stores/movementStore";
  import { useProductStore } from "../../stores/productStore"; // Import product store
import moment from "moment";
  
  const movementStore = usemovementStore();
  const productStore = useProductStore(); // Create reference to product store
  
  const searchQuery = ref("");
  const searchDate = ref(null);
  const currentPage = ref(1);
  const itemsPerPage = 10;
  
  // Fetch movements and products on mount
  onMounted(async () => {
    await movementStore.fetchMovements();
    await productStore.fetchProducts(); // Fetch products data
  });
  
  // Method to get the product name based on productId
  const getProductName = (productId) => {
    const product = productStore.products.find((prod) => prod.id === productId);
    return product ? product.name : "Unknown Product";
  };
  
  // Filter movements based on search query, considering both movement type and product name
  const filterMovement = computed(() => {
  return movementStore.movements.filter((movement) => {
    const productName = getProductName(movement.productId).toLowerCase();
    const matchesQuery =
      productName.includes(searchQuery.value.toLowerCase()) ||
      movement.type.toLowerCase().includes(searchQuery.value.toLowerCase());

    // Check if the movement date matches the search date if a date is provided
    const matchesDate =
      !searchDate.value || formatDate(movement.movement_date) === moment(searchDate.value).format("DD/MM/YYYY");

    return matchesQuery && matchesDate;
  });
});
  
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  // Paginate filtered movements
  const paginatedmovement = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filterMovement.value.slice(start, end);
  });
  
  // Calculate total pages
  const totalPages = computed(() => {
    return Math.ceil(filterMovement.value.length / itemsPerPage);
  });
  
  // Pagination navigation functions
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  </script>
  
  <style scoped>
  /* Optional styling */
  </style>
  