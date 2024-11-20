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
          required
        />
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
import { useReceptionStore } from '../../stores/receptionStore';
import { useProductStore } from '../../stores/productStore';
import { useRouter } from 'vue-router';
import moment from 'moment';
import { useToast } from 'vue-toastification';

const toast = useToast();
const receptionStore = useReceptionStore();
const productStore = useProductStore();
const router = useRouter();

const reception_date = ref('');
const receptionDetails = ref([{ productId: '', quantity: 1, price: 0 }]);
const products = ref([]);

onMounted(async () => {
  try {
    await productStore.fetchProducts();
    products.value = productStore.products;
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

const handleSubmit = async () => {

  if (!reception_date.value) {
    toast.error("Please provide a reception date.");
    return;
  }

  for (const [index, detail] of receptionDetails.value.entries()) {
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
    details: JSON.parse(JSON.stringify(receptionDetails.value))
  };

  try {
    await receptionStore.addreception(newReception);
    reception_date.value = '';
    receptionDetails.value = [{ productId: '', quantity: 1, price: 0 }];
    router.push('/reception/list');
    toast.success("Add a reception successfully")
  } catch (error) {
    console.error("Failed to add reception:", error.message);
  }
};
</script>

<style scoped>
/* Optional styling */
</style>
