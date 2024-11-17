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
  
  const customerStore = useCustomerStore();
  const router = useRouter();
  
  async function handleSubmit() {
    const customerData = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      phone: phone.value,
    };
  
    try {
      await customerStore.addcustomer(customerData);
      console.log("Customer added successfully:", customerData);
      resetForm();
      router.push("/customer/list"); // Redirect to customers list after submission
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  }
  
  function resetForm() {
    firstName.value = "";
    lastName.value = "";
    address.value = "";
    phone.value = "";
    toast.success("Ajouter avec succé")
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin-top: 20px;
  }
  </style>
  