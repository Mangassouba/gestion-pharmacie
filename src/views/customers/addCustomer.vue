<template>
  <div class="container">
    <h2>Add Customer</h2>
    <form @submit.prevent="handleSubmit">
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
          <small v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</small>
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
          <small v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</small>
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
          <small v-if="errors.address" class="text-danger">{{ errors.address }}</small>
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
          <small v-if="errors.phone" class="text-danger">{{ errors.phone }}</small>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Add Customer</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCustomerStore } from "../../stores/customerStore";
import { useToast } from "vue-toastification";

const toast = useToast();
const firstName = ref("");
const lastName = ref("");
const address = ref("");
const phone = ref("");
const errors = ref({}); // Object to hold validation errors

const customerStore = useCustomerStore();
const router = useRouter();

async function handleSubmit() {
  errors.value = {}; // Reset errors before submission
  const customerData = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    phone: phone.value,
  };

  try {
    await customerStore.addcustomer(customerData);
    resetForm();
    toast.success("Customer added successfully!");
    router.push("/customer/list");
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
  firstName.value = "";
  lastName.value = "";
  address.value = "";
  phone.value = "";
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin-top: 20px;
}

.text-danger {
  font-size: 0.875em;
}
</style>
