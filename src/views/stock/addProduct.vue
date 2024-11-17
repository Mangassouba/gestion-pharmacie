<template>
  <div class="container">
    <h2>Add Product</h2>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="name" class="form-label">Product Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="form-control"
            placeholder="Enter product name"
            required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="description" class="form-label">Description</label>
          <input
            v-model="description"
            type="text"
            id="description"
            class="form-control"
            placeholder="Enter product description"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="stock" class="form-label">Stock Quantity</label>
          <input
            v-model="stock"
            type="number"
            id="stock"
            class="form-control"
            placeholder="Enter stock quantity"
            required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="salePrice" class="form-label">Sale Price</label>
          <input
            v-model="sale_price"
            type="number"
            id="salePrice"
            class="form-control"
            placeholder="Enter sale price"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="purchasePrice" class="form-label">Purchase Price</label>
          <input
            v-model="purchase_price"
            type="number"
            id="purchasePrice"
            class="form-control"
            placeholder="Enter purchase price"
            required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="threshold" class="form-label">Stock Threshold</label>
          <input
            v-model="threshold"
            type="number"
            id="threshold"
            class="form-control"
            placeholder="Enter stock threshold"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="prescriptionReq" class="form-label">Prescription Required</label>
          <select v-model="prescription_req" id="prescriptionReq" class="form-select" required>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div class="col-md-6 mb-3">
          <label for="barcode" class="form-label">Barcode</label>
          <input
            v-model="barcode"
            type="text"
            id="barcode"
            class="form-control"
            placeholder="Enter barcode"
            required
          />
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Add Product</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProductStore } from '../../stores/productStore';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const toast = useToast();
const name = ref('');
const description = ref('');
const stock = ref(0);
const sale_price = ref(0.0);
const purchase_price = ref(0.0);
const threshold = ref(0);
const prescription_req = ref(false);
const barcode = ref('');

const productStore = useProductStore();
const router = useRouter();

async function handleSubmit() {
  const productData = {
    name: name.value,
    description: description.value,
    stock: stock.value,
    sale_price: sale_price.value,
    purchase_price: purchase_price.value,
    threshold: threshold.value,
    prescription_req: prescription_req.value,
    barcode: barcode.value,
  };

  try {
    await productStore.addProduct(productData);
    toast.success('Product added successfully!');
    resetForm();

    // Redirection après ajout
    router.push('/stock/list');
  } catch (error) {
    console.error('Failed to add product:', error);
    toast.error('Failed to add product. Please try again.');
  }
}

function resetForm() {
  name.value = '';
  description.value = '';
  stock.value = 0;
  sale_price.value = 0.0;
  purchase_price.value = 0.0;
  threshold.value = 0;
  prescription_req.value = false;
  barcode.value = '';
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin-top: 20px;
}
</style>
