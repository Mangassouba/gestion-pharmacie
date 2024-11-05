<template>
    <div class="container mt-4">
      <div class="row d-flex mt-4">
        <div class="col-6">
          <input type="search" v-model="searchQuery" class="form-control" placeholder="Search" />
        </div>
        <div class="col-6">
          <div class="d-flex justify-content-end">
            <RouterLink to="/customer/add" class="btn btn-primary">Add supplier</RouterLink>
          </div>
        </div>
      </div>
  
      <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="detailsModalLabel">supplier Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="customerName" class="form-label">Name</label>
                  <input type="text" class="form-control" id="customerName" :value="selectedsuppliers?.name" disabled>
                </div>
                <div class="mb-3">
                  <label for="customerStock" class="form-label">Address</label>
                  <input type="text" class="form-control" id="customerStock" :value="selectedsuppliers?.address" disabled>
                </div>
                <div class="mb-3">
                  <label for="customerSalePrice" class="form-label">Phone</label>
                  <input type="number" class="form-control" id="customerSalePrice" :value="selectedsuppliers?.contact" disabled>
                </div>
                <!-- Additional fields as needed -->
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  
      <table class="table table-striped table-bordered mt-4 mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(supplier, index) in pagiantedsuppliers" :key="supplier.id">
            <td>{{ supplier.id }}</td>
            <td>{{ supplier.name }}</td>
            <td>{{ supplier.address }}</td>
            <td>{{ supplier.contact }}</td>
            <td class="text-center">
              <button
                class="btn btn-danger btn-sm me-2" @click="handleDelete(supplier.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </button>
              <!-- <router-link :to="{ name: 'editCustomer', params: { id: customer.id }}"
                class="btn btn-warning btn-sm me-2" 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </router-link> -->
              <button
                class="btn btn-info btn-sm me-2" @click="openModal(supplier)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                  />
                  <path
                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                  />
                </svg>
              </button>
            </td>
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
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <button class="page-link" @click="currentPage = page">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { Modal } from 'bootstrap';
  import { RouterView } from 'vue-router';
import { useSupplierStore } from '../../stores/supplierStore';
  
  const store = useSupplierStore();
  const searchQuery = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 10;
  
  // Fetch customers on mount
  onMounted(async () => {
    await store.fetchSuppliers();
  });
  
  const selectedsuppliers = ref(null);
  const openModal = (customer) => {
    selectedsuppliers.value = customer;
    const modalElement = document.getElementById('detailsModal');
    const modal = new Modal(modalElement); 
    modal.show();
  };
  
  const filteredsuppliers = computed(() => {
    return store.suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const pagiantedsuppliers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredsuppliers.value.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredsuppliers.value.length / itemsPerPage);
  });
  
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
    
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await store.deleteSupplier(id);
    }
  };
  </script>
  
  <style scoped>
  /* Optional styling */
  </style>
  