<template>
  <div class="container">
    <h2>Add Supplier</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Number Field -->
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

      <!-- Quantity, Expiration Date, and Product Selection -->
      <div class="row">
        <!-- Quantity Field -->
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

        <!-- Expiration Date -->
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
        </div>

        <!-- Product Selection -->
        <div class="mb-3">
          <label for="productId" class="form-label">Product</label>
          <select
            v-model="productId"
            @change="updateStockQuantity"
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

      <!-- Submit Button -->
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Add Supplier</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBatcheStore } from "../../stores/batchStore";
import { useProductStore } from "../../stores/productStore";
import { useToast } from "vue-toastification";

const toast = useToast();

// Reactive state variables
const number = ref("");
const quantity = ref(""); // Automatically update with stock quantity
const expiration_date = ref("");
const productId = ref("");
const products = ref([]);
const errors = ref({});

// Stores and router
const batchStore = useBatcheStore();
const productStore = useProductStore();
const router = useRouter();

// Fetch products when the component is mounted
onMounted(async () => {
  try {
    await productStore.fetchProducts();
    products.value = productStore.products;
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
  }
});

// Update stock quantity in the quantity field
function updateStockQuantity() {
  const selectedProduct = products.value.find(
    (product) => product.id === productId.value
  );
  if (selectedProduct) {
    quantity.value = selectedProduct.stock; // Automatically set stock value
  }
}

// Handle form submission
async function handleSubmit() {
  const batchData = {
    number: number.value,
    quantity: quantity.value,
    expiration_date: expiration_date.value,
    productId: productId.value,
  };

  try {
    await batchStore.addbatch(batchData);
    resetForm();
    router.push("/batch/list");
    toast.success("Batch added successfully!");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors.value[err.path] = err.msg;
      });
    } else {
      console.error("Failed to add batch:", error);
    }
  }
}

// Reset form fields
function resetForm() {
  number.value = "";
  quantity.value = "";
  expiration_date.value = "";
  productId.value = "";
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin-top: 20px;
}
</style>
