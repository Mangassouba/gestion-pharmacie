<template>
  <div class="container mt-4">
    <h2>Add Reception</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Reception Info Section -->
      <div class="mb-3">
        <label for="receptionDate" class="form-label">Date</label>
        <input
          type="date"
          id="receptionDate"
          v-model="reception_date"
          class="form-control"
          :max="maxDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="supplierId" class="form-label">Supplier</label>
        <select
          id="supplierId"
          v-model="supplierId"
          class="form-control"
          required
        >
          <option disabled value="">Select a supplier</option>
          <option
            v-for="supplier in suppliers"
            :key="supplier.id"
            :value="supplier.id"
          >
            {{ supplier.name }}
          </option>
        </select>
      </div>

      <!-- Reception Details Section -->
      <div>
        <h3>Details</h3>
        <div v-for="(detail, index) in receptionDetails" :key="index" class="mb-3">
          <div class="row align-items-end">
            <div class="col-md-5">
              <label class="form-label">Product</label>
              <select
                v-model="detail.productId"
                class="form-control"
                required
                @change="updatePrice(index)"
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
                type="text"
                v-model="detail.price"
                class="form-control"
                required
                @blur="formatPrice(detail, index)"
  />
  <small v-if="errors[index]?.price" class="text-danger">
    {{ errors[index].price }}
  </small>
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
import { useReceptionStore } from '../../stores/receptionStore';
import { useProductStore } from '../../stores/productStore';
import { useRouter } from 'vue-router';
import moment from 'moment';
import { useToast } from 'vue-toastification';
import { useSupplierStore } from '../../stores/supplierStore';

const toast = useToast();
const receptionStore = useReceptionStore();
const productStore = useProductStore();
const supplierStore = useSupplierStore()
const router = useRouter();

const maxDate = ref('');
const reception_date = ref('');
const supplierId = ref('');
const receptionDetails = ref([{ productId: '', quantity: 1, price: 0 }]);
const products = ref([]);
const suppliers = ref([]);
const errors = ref([]);
onMounted(async () => {
  try {
    const today = new Date();
    maxDate.value = today.toISOString().split('T')[0];
    reception_date.value = maxDate.value;

    await productStore.fetchProducts();
    await supplierStore.fetchSuppliers();
    products.value = productStore.products;
    suppliers.value = supplierStore.suppliers
  } catch (error) {
    console.error("Failed to load products:", error.message);
  }
});

const addDetail = () => {
  receptionDetails.value.push({ productId: '', quantity: 1, price: 0 });
};

const removeDetail = (index) => {
  receptionDetails.value.splice(index, 1);
};

const updatePrice = (index) => {
  const selectedProduct = products.value.find(
    (product) => product.id === receptionDetails.value[index].productId
  );
  if (selectedProduct) {
    receptionDetails.value[index].price = selectedProduct.purchase_price;
  }
};
const formatPrice = (detail, index) => {
  const price = parseFloat(detail.price || 0);
  if (price > 99999999) {
    errors.value[index] = { price: "Price cannot exceed 8 digits." };
  } else {
    if (!errors.value[index]) {
      errors.value[index] = {};
    }
    errors.value[index].price = null;
    detail.price = price.toFixed(2);
  }
};

const handleSubmit = async () => {
  if (!reception_date.value || !supplierId.value) {
    toast.error("Please provide a reception date.");
    return;
  }

  for (const [index, detail] of receptionDetails.value.entries()) {
    // Convert price to float
    detail.price = parseFloat(detail.price).toFixed(2) || 0;

    if (!detail.productId) {
      toast.error(`Please select a product for item #${index + 1}.`);
      return;
    }
    if (detail.quantity <= 0) {
      toast.error(`Quantity for item #${index + 1} must be positive.`);
      return;
    }
    if (detail.price <= 0) {
      toast.error(`Price for item #${index + 1} must be positive.`);
      return;
    }
  }

  const newReception = {
    reception_date: moment(reception_date.value).toISOString(),
    supplierId: supplierId.value,
    details: JSON.parse(JSON.stringify(receptionDetails.value))
  };

  try {
    await receptionStore.addreception(newReception);
    reception_date.value = '';
    supplierId.value = '';
    receptionDetails.value = [{ productId: '', quantity: 1, price: 0 }];
    router.push('/reception/list');
    toast.success("Reception added successfully!");
  } catch (error) {
    console.error("Failed to add reception:", error.message);
  }
};
</script>
