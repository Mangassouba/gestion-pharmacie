<template>
    <div class="container">
      <h2>Add Supplier</h2>
      <form @submit.prevent="handleSubmit">
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
          </div>
        </div>
  
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
  
  const number = ref("");
  const quantity = ref("");
  const expiration_date = ref("");
  const productId = ref("");
  const products = ref([]);
  
  const batchStore = useBatcheStore();
  const productStore = useProductStore();
  const router = useRouter();
  
  // Fetch products when the component is mounted
  console.log(productStore.name);
  
  onMounted(async () => {
    try {
      await productStore.fetchProducts();
      products.value = productStore.products;
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    }
  });
  
  async function handleSubmit() {
    const batchData = {
      number: number.value,
      quantity: quantity.value,
      expiration_date: expiration_date.value,
      productId: productId.value,
    };
  
    try {
      await batchStore.addbatch(batchData);
      console.log("Batch added successfully:", batchData);
      resetForm();
      router.push("/batch/list"); // Redirect to batch list after submission
    } catch (error) {
      console.error("Failed to add batch:", error);
    }
  }
  
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
  