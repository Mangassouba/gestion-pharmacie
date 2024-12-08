<template>
    <div class="container">
      <h2>Edit Batch</h2>
      <form @submit.prevent="updateBatch">
        <div class="row">
          <div class="mb-3">
            <label for="number" class="form-label">Number</label>
            <input
              v-model="number"
              type="text"
              id="number"
              class="form-control"
              placeholder="Enter number"
              required
            />
            <small v-if="errors.number" class="text-danger">{{ errors.number }}</small>
          </div>
        </div>
  
        <div class="row">
          <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
            <input
              v-model="quantity"
              type="number"
              id="quantity"
              class="form-control"
              placeholder="Enter quantity"
              required
            />
            <small v-if="errors.quantity" class="text-danger">{{ errors.quantity }}</small>
          </div>
          <div class="mb-3">
          <label for="expiration_date" class="form-label">Expiration date</label>
          <input
            v-model="expiration_date"
            type="date"
            id="expiration_date"
            class="form-control"
            required
          />
          <small v-if="errors.expiration_date" class="text-danger">{{ errors.expiration_date }}</small>
          <!-- Display the formatted expiration date as a preview -->
          <small class="text-muted">Formatted: {{ formatDate(expiration_date) }}</small>
        </div>
          <div class="mb-3">
            <label for="productId" class="form-label">Product</label>
            <select
              v-model="productId"
              id="productId"
              class="form-control"
              required
            >
              <option disabled value="">Select a product</option>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.name }}
              </option>
            </select>
            <small v-if="errors.productId" class="text-danger">{{ errors.productId }}</small>
          </div>
        </div>
  
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Update Batch</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useBatcheStore } from '../../stores/batchStore';
  import { useProductStore } from '../../stores/productStore';
import moment from 'moment';
import { useToast } from 'vue-toastification';
  
const toast = useToast();
  const route = useRoute();
  const router = useRouter();
  const batchStore = useBatcheStore();
  const productStore = useProductStore();
  
  const number = ref('');
  const quantity = ref('');
  const expiration_date = ref('');
  const productId = ref('');
  const products = ref([]);
  const id = route.params.id;
  const errors = ref({});
  
  // Fetch batch and product details on component mount
  onMounted(async () => {
    // Fetch product list for dropdown
    try {
      await productStore.fetchProducts();
      products.value = productStore.products;
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    }
  
    // Load batch data for editing
    const batch = batchStore.getbatchById(parseInt(id));
    if (batch) {
      number.value = batch.number;
      quantity.value = batch.quantity;
      expiration_date.value = batch.expiration_date;
      productId.value = batch.productId;
    } else {
      console.error("Batch not found.");
    }
  });

  const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
  
  // Update batch in store and redirect to batch list
  async function updateBatch() {
    try {
      await batchStore.updatebatch(id, {
        number: number.value,
        quantity: quantity.value,
        expiration_date: expiration_date.value,
        productId: productId.value,
      });
      router.push('/batch/list');
      toast.success("Batch edit successfully")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors.value[err.path] = err.msg;
      });
    } else {
      console.error('Failed to update batch');
    }
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin-top: 20px;
  }
  </style>
  