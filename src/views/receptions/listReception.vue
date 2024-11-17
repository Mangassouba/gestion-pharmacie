<template>
  <div class="container mt-4">
    <h2 class="">Receptions Management</h2>
    <div class="row d-flex mt-4">
      <div class="col-6"></div>
      <div class="col-6">
        <div class="d-flex justify-content-end">
          <RouterLink to="/reception/add" class="btn btn-primary"
            >Add reception</RouterLink
          >
        </div>
      </div>
    </div>

    <!-- Modal pour afficher les détails de la commande -->
    <div
      class="modal fade"
      id="detailsModal"
      tabindex="-1"
      aria-labelledby="detailsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">
              Reception Details
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="orderDate" class="form-label">Date</label>
                <input
                  type="text"
                  class="form-control"
                  id="orderDate"
                  :value="formatDate(selectedReception?.order_date)"
                  disabled
                />
              </div>
              <div
                v-if="
                  selectedReception?.details && selectedReception.details.length
                "
              >
                <h6 class="mt-4">Reception Items:</h6>
                <div
                  v-for="(detail, index) in selectedReception.details"
                  :key="index"
                  class="mb-3"
                >
                  <label :for="'detailProductId' + index" class="form-label"
                    >Product ID</label
                  >
                  <input
                    type="text"
                    class="form-control mb-1"
                    :id="'detailProductId' + index"
                    :value="getProductName(detail.productId)"
                    disabled
                  />

                  <label :for="'detailQuantity' + index" class="form-label"
                    >Quantity</label
                  >
                  <input
                    type="number"
                    class="form-control mb-1"
                    :id="'detailQuantity' + index"
                    :value="detail.quantity"
                    disabled
                  />

                  <label :for="'detailPrice' + index" class="form-label"
                    >Price</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    :id="'detailPrice' + index"
                    :value="detail.price"
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped table-bordered mt-4 mb-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in paginatedFilteredReceptions"
          :key="order.id"
        >
          <td>{{ order.id }}</td>
          <td>{{ formatDate(order.reception_date) }}</td>
          <td class="text-center">
            <button
              class="btn btn-danger btn-sm me-2"
              @click="handleDelete(order.id)"
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
            <button class="btn btn-info btn-sm me-2" @click="openModal(order)">
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
import { Modal } from "bootstrap";
import { RouterView } from "vue-router";
import { useReceptionStore } from "../../stores/receptionStore";
import { useProductStore } from "../../stores/productStore";
import moment from "moment";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = useReceptionStore();
const productStore = useProductStore();
const currentPage = ref(1);
const itemsPerPage = 10;

onMounted(async () => {
  await store.fetchreceptions();
  await productStore.fetchProducts();
});

const selectedReception = ref(null);
const openModal = (order) => {
  selectedReception.value = order;
  const modalElement = document.getElementById("detailsModal");
  const modal = new Modal(modalElement);
  modal.show();
};

const getProductName = (productId) => {
  const product = productStore.products.find((p) => p.id === productId);
  return product ? product.name : "Unknown Product";
};

const paginatedFilteredReceptions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return store.receptions.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(store.receptions.length / itemsPerPage);
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

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this reception?")) {
    await store.deletereception(id);
    toast.success("Receipt delete successfully")
  }
};
</script>

<style scoped>
/* Optional styling */
</style>
