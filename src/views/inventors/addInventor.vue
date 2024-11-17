<template>
  <div class="container">
    <h2>Add Inventories</h2>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="mb-3">
          <label for="inventory_date" class="form-label"
            >Date inventories</label
          >
          <input
            v-model="inventory_date"
            type="date"
            id="inventory_date"
            class="form-control"
            placeholder="Enter name"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="mb-3">
          <label for="stock" class="form-label">Stock</label>
          <input
            v-model="stock"
            type="number"
            id="stock"
            class="form-control"
            placeholder="Enter stock"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Product</label>
          <select v-model="productId" class="form-control" required>
            <option disabled value="">Select a product</option>
            <option
              v-for="product in products"
              :key="product.id"
              :value="product.id"
            >
              {{ product.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Add inventory</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../../stores/productStore";
import { useinventoriesStore } from "../../stores/inventorStore";
import { useToast } from "vue-toastification";

const toast = useToast();
const productStore = useProductStore();
const supplierStore = useinventoriesStore();
const router = useRouter();
const inventory_date = ref("");
const stock = ref("");
const productId = ref("");
const products = ref([]);

onMounted(async () => {
  try {
    await productStore.fetchProducts();
    products.value = productStore.products;
  } catch (error) {
    console.error("Failed to fetch customers or products:", error.message);
  }
});

async function handleSubmit() {
  const supplierData = {
    inventory_date: inventory_date.value,
    stock: stock.value,
    productId: productId.value,
  };

  try {
    await supplierStore.addInventories(supplierData);
    toast.success("Customer added successfully");
    resetForm();
    router.push("/inventor/list");
  } catch (error) {
    console.error("Failed to add customer:", error);
  }
}

function resetForm() {
  inventory_date.value = "";
  stock.value = "";
  productId.value = "";
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin-top: 20px;
}
</style>
