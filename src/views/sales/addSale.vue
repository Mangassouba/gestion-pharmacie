<template>
    <div class="container mt-4">
      <h2>Add a Reception</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Reception Info Section -->
        <div class="mb-3">
          <label for="receptionDate" class="form-label">Reception Date</label>
          <input
            type="date"
            id="receptionDate"
            v-model="sale_date"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="clientId" class="form-label">Customer</label>
          <select
            id="clientId"
            v-model="customerId"
            class="form-control"
            required
          >
            <option disabled value="">Select a client</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.firstName }} {{ customer.lastName }}
            </option>
          </select>
        </div>
  
        <!-- Reception Details Section -->
        <div>
          <h3>Reception Details</h3>
          <div v-for="(detail, index) in saleDetails" :key="index" class="mb-3">
            <div class="row align-items-end">
              <div class="col-md-5">
                <label class="form-label">Product</label>
                <select
                  v-model="detail.productId"
                  class="form-control"
                  required
                >
                  <option disabled value="">Select a product</option>
                  <option v-for="product in products" :key="product.id" :value="product.id">
                    {{ product.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-2">
                <label class="form-label">Quantity</label>
                <input
                  type="number"
                  v-model="detail.quantity"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-md-2">
                <label class="form-label">Price</label>
                <input
                  type="number"
                  v-model="detail.price"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-md-2">
                <button
                  type="button"
                  @click="removeDetail(index)"
                  class="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <button type="button" @click="addDetail" class="btn btn-primary mt-3">
            Add another product
          </button>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="btn btn-success mt-4">Save Reception</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useProductStore } from '../../stores/productStore';
  import { useCustomerStore } from '../../stores/customerStore';
  import moment from 'moment';
  import { useSaleStore } from '../../stores/saleStore';
  import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
  
  const toast = useToast();
  const store = useSaleStore();
  const productStore = useProductStore();
  const customerStore = useCustomerStore();
  const router = useRouter();
  
  const sale_date = ref('');
  const customerId = ref('');
  const saleDetails = ref([{ productId: '', quantity: 1, price: 0 }]);
  const customers = ref([]);
  const products = ref([]);
  
  // Fetch customers and products when the component mounts
  onMounted(async () => {
    try {
      await customerStore.fetchcustomers();
      await productStore.fetchProducts();
      customers.value = customerStore.customers;
      products.value = productStore.products;
    } catch (error) {
      console.error("Failed to fetch customers or products:", error.message);
    }
  });
  
  const addDetail = () => {
    saleDetails.value.push({ productId: '', quantity: 1, price: 0 });
  };
  
  const removeDetail = (index) => {
    saleDetails.value.splice(index, 1);
  };
  
  const handleSubmit = async () => {
    const newOrder = {
      sale_date: moment(sale_date.value).toISOString(),
      customerId: customerId.value,
      details: JSON.parse(JSON.stringify(saleDetails.value))
    };
    await store.addSale(newOrder);
    // Reset fields
    sale_date.value = '';
    customerId.value = '';
    saleDetails.value = [{ productId: '', quantity: 1, price: 0 }];
    // Redirect to listSale page
    router.push({ name: 'listSale' });
    toast.success("Sale add successfully")
  };
  </script>
  
  <style scoped>
  /* Optional styling */
  </style>
  