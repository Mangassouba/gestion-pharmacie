<template>
    <div class="container">
      <h2>Add Supplier</h2>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="mb-3">
            <label for="firstName" class="form-label">Name</label>
            <input
              v-model="name"
              type="text"
              id="firstName"
              class="form-control"
              placeholder="Enter name"
              required
            />
            <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
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
            <small v-if="errors.address" class="text-danger">{{ errors.address }}</small>
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
            <small v-if="errors.contact" class="text-danger">{{ errors.contact }}</small>
          </div>
        </div>
  
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Add Supplier</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
import { useSupplierStore } from "../../stores/supplierStore";
import { useToast } from "vue-toastification";
  
const toast = useToast();
  const name = ref("");
  const address = ref("");
  const contact = ref("");
  const errors = ref({});

  const supplierStore = useSupplierStore();
  const router = useRouter();
  
  async function handleSubmit() {
    errors.value = {};
    const supplierData = {
      name: name.value,
      address: address.value,
      contact: contact.value,
    };
  
    try {
      await supplierStore.addSupplier(supplierData);
      console.log("Customer added successfully:", supplierData);
      resetForm();
      router.push("/supplier/list"); 
      toast.success("Supplier add successfully")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors.value[err.path] = err.msg;
      });
    } else{
      
      toast.error("Failed to add customer:");
    }
    }
  }
  
  function resetForm() {
    name.value = "";
    address.value = "";
    contact.value = "";
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin-top: 20px;
  }
  </style>
  