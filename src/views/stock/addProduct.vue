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
          <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
        </div>
        <div class="col-md-6 mb-3">
          <label for="description" class="form-label">Description</label>
          <input
            v-model="description"
            type="text"
            id="description"
            class="form-control"
            placeholder="Enter product description"
          />
          <small v-if="errors.description" class="text-danger">{{ errors.description }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 mb-3">
          <label for="salePrice" class="form-label">Sale Price</label>
          <input
            v-model="sale_price"
            type="text"
            id="salePrice"
            class="form-control"
            placeholder="Enter sale price"
            required
          />
          <small v-if="errors.sale_price" class="text-danger">{{ errors.sale_price }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="purchasePrice" class="form-label">Purchase Price</label>
          <input
            v-model="purchase_price"
            type="text"
            id="purchasePrice"
            class="form-control"
            placeholder="Enter purchase price"
            required
          />
          <small v-if="errors.purchase_price" class="text-danger">{{ errors.purchase_price }}</small>
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
          <small v-if="errors.threshold" class="text-danger">{{ errors.threshold }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="prescriptionReq" class="form-label">Prescription Required</label>
          <select v-model="prescription_req" id="prescriptionReq" class="form-select" required>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
          <small v-if="errors.prescription_req" class="text-danger">{{ errors.prescription_req }}</small>
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
          <small v-if="errors.barcode" class="text-danger">{{ errors.barcode }}</small>
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
const errors = ref({});

const productStore = useProductStore();
const router = useRouter();

async function handleSubmit() {
  errors.value = {};
  const productData = {
    name: name.value,
    description: description.value,
    stock: stock.value,
    sale_price: parseFloat(sale_price.value), // Conversion en float
    purchase_price: parseFloat(purchase_price.value), // Conversion en float
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
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors.value[err.path] = err.msg; // Map backend errors to fields
      });
    } else {
      toast.error("An unexpected error occurred.");
    }
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
