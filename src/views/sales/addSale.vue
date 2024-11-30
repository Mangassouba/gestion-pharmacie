<template>
  <div class="container mt-4">
    <h2>Add a Sale</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Reception Info Section -->
      <div class="mb-3">
        <label for="receptionDate" class="form-label">Reception Date</label>
        <input
          type="date"
          id="receptionDate"
          v-model="sale_date"
          class="form-control"
          :max="maxDate"
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
          <option
            v-for="customer in customers"
            :key="customer.id"
            :value="customer.id"
          >
            {{ customer.firstName }} {{ customer.lastName }}
          </option>
        </select>
      </div>

      <!-- Reception Details Section -->
      <div>
        <h3>Sale Details</h3>
        <div v-for="(detail, index) in saleDetails" :key="index" class="mb-3">
          <div class="row align-items-end">
            <div class="col-md-5">
              <label class="form-label">Product</label>
              <select
                v-model="detail.productId"
                @change="updatePrice(index)"
                class="form-control"
                required
              >
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
        <button
          type="button"
          @click="addDetail"
          class="btn btn-primary mt-3"
        >
          Add another product
        </button>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-success mt-4">Save Sale</button>
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

const maxDate = ref('');
const sale_date = ref('');
const customerId = ref('');
const saleDetails = ref([{ productId: '', quantity: 1, price: 0 }]);
const customers = ref([]);
const products = ref([]);
const errors = ref([]);

// Fetch customers and products when the component mounts
onMounted(async () => {
  try {
    const today = new Date();
    maxDate.value = today.toISOString().split('T')[0];
    sale_date.value = maxDate.value;

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

// Update price based on the selected product
const updatePrice = (index) => {
  const selectedProduct = products.value.find(
    (product) => product.id === saleDetails.value[index].productId
  );
  if (selectedProduct) {
    saleDetails.value[index].price = selectedProduct.sale_price || 0;
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
  if (!sale_date.value || !customerId.value) {
    toast.error("Please fill in the sale date and customer.");
    return;
  }

  for (const [index, detail] of saleDetails.value.entries()) {
    if (!detail.productId) {
      toast.error(`Please select a product for item #${index + 1}.`);
      return;
    }
    if (detail.quantity <= 0) {
      toast.error(`Quantity for item must be positive.`);
      return;
    }
    if (detail.price <= 0) {
      toast.error(`Price for item must be positive.`);
      return;
    }

    // Vérifier si la quantité dépasse le stock
    const selectedProduct = products.value.find(
      (product) => product.id === detail.productId
    );
    if (detail.quantity > selectedProduct.stock) {
      toast.error(
        `Cannot sell ${detail.quantity} units of ${selectedProduct.name}. Only ${selectedProduct.stock} in stock.`
      );
      return;
    }

    // Convertir le prix en float
    detail.price = parseFloat(detail.price);
  }

  const newOrder = {
    sale_date: moment(sale_date.value).toISOString(),
    customerId: customerId.value,
    details: JSON.parse(JSON.stringify(saleDetails.value)),
  };

  try {
    await store.addSale(newOrder);

    sale_date.value = '';
    customerId.value = '';
    saleDetails.value = [{ productId: '', quantity: 1, price: 0 }];
    router.push({ name: 'listSale' });
    toast.success("Sale added successfully");
  } catch (error) {
    toast.error("Failed to add sale. Please try again.");
    console.error("Error adding sale:", error.message);
  }
};

</script>

<style scoped>
/* Optional styling */
</style>
