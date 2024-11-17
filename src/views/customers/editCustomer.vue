<template>
    <div class="container">
      <h2>Edit Customer</h2>
      <form @submit.prevent="updateCustomer">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input
              v-model="firstName"
              type="text"
              id="firstName"
              class="form-control"
              placeholder="Enter first name"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              v-model="lastName"
              type="text"
              id="lastName"
              class="form-control"
              placeholder="Enter last name"
              required
            />
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-6 mb-3">
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
          <div class="col-md-6 mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              v-model="phone"
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
import { useCustomerStore } from '../../stores/customerStore';
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const store = useCustomerStore();

// Define reactive properties for customer fields
const firstName = ref('');
const lastName = ref('');
const address = ref('');
const phone = ref('');
const id = route.params.id;

// Fetch customer details on component mount
onMounted(() => {
  const customer = store.getcustomerById(parseInt(route.params.id));
  if (customer) {
    firstName.value = customer.firstName;
    lastName.value = customer.lastName;
    address.value = customer.address;
    phone.value = customer.phone;
  }
});

// Update customer in store and redirect to customer list
async function updateCustomer() {
  try {
    await store.updatecustomer(id, {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      phone: phone.value,
    });
    toast.success("Edit with success")
    router.push('/customer/list');
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
  