<template>
    <div class="container">
      <h2>Edit Supplier</h2>
      <form @submit.prevent="updateCustomer">
        <div class="row">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              v-model="name"
              type="text"
              id="name"
              class="form-control"
              placeholder="Enter name"
              required
            />
          </div>
        </div>
  
        <div class="row">
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
              v-model="address"
              type="text"
              id="address"
              class="form-control"
              placeholder="Enter address"
              required
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              v-model="contact"
              type="text"
              id="phone"
              class="form-control"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>
  
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Update Customer</button>
        </div>
      </form>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSupplierStore } from '../../stores/supplierStore';

const route = useRoute();
const router = useRouter();
const store = useSupplierStore();

// Define reactive properties for customer fields
const name = ref('');
const address = ref('');
const contact = ref('');
const id = route.params.id;

// Fetch customer details on component mount
onMounted(() => {
  const supplier = store.getsupplierById(parseInt(route.params.id));
  if (supplier) {
    name.value = supplier.name;
    address.value = supplier.address;
    contact.value = supplier.contact;
  }
});

// Update customer in store and redirect to customer list
async function updateCustomer() {
  try {
    await store.updateSupplier(id, {
      name: name.value,
      address: address.value,
      contact: contact.value,
    });
    router.push('/supplier/list'); // Change the route to your customer list page
  } catch (error) {
    console.error('Failed to update customer:', error);
  }
}
</script>

  
  <style scoped>
  .container {
    max-width: 800px;
    margin-top: 20px;
  }
  </style>
  