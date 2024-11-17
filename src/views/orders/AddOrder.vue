<template>
  <div class="container mt-4">
    <h2>Add New Order</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Order Info Section -->
      <div class="mb-3">
        <label for="orderDate" class="form-label">Order Date</label>
        <input
          type="date"
          id="orderDate"
          v-model="order_date"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="clientId" class="form-label">Client</label>
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

      <!-- Order Details Section -->
      <div>
        <h3>Order Details</h3>
        <div v-for="(detail, index) in orderDetails" :key="index" class="mb-3">
          <div class="row">
            <div class="col-md-4">
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
            <div class="col-md-3">
              <label class="form-label">Quantity</label>
              <input
                type="number"
                v-model="detail.quantity"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Price</label>
              <input
                type="number"
                v-model="detail.price"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <button
                type="button"
                class="btn btn-danger"
                @click="removeDetail(index)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <button type="button" @click="addDetail" class="btn btn-primary mt-3">
          Add Another Product
        </button>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-success mt-4">Save Order</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../../stores/orderStore';
import { useProductStore } from '../../stores/productStore';
import { useCustomerStore } from '../../stores/customerStore';
import moment from 'moment';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();
const store = useOrderStore();
const productStore = useProductStore();
const customerStore = useCustomerStore();

const order_date = ref('');
const customerId = ref('');
const orderDetails = ref([{ productId: '', quantity: 1, price: 0 }]);
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
  orderDetails.value.push({ productId: '', quantity: 1, price: 0 });
};

const removeDetail = (index) => {
  if (orderDetails.value.length > 1) {
    orderDetails.value.splice(index, 1);
  }
};

const initializeFields = () => {
  order_date.value = '';
  customerId.value = '';
  orderDetails.value = [{ productId: '', quantity: 1, price: 0 }];
};

const handleSubmit = async () => {
  const newOrder = {
    order_date: moment(order_date.value).toISOString(),
    customerId: customerId.value,
    detailsOrder: JSON.parse(JSON.stringify(orderDetails.value))
  };
  await store.addOrder(newOrder);
  initializeFields();
  toast.success("Add order successfully")
  router.push('/orders/list'); // Redirect to the order list page
};
</script>

<style scoped>
/* Optional styling */
</style>
