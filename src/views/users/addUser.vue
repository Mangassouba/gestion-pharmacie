<template>
    <div class="container">
      <h2>Add User</h2>
      <form @submit.prevent="handleSubmit">
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
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="email"
              type="text"
              id="email"
              class="form-control"
              placeholder="Enter Email"
              required
            />
          </div>
        </div>
  
        <div class="row">
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="text"
              id="password"
              class="form-control"
              placeholder="Enter password"
              required
            />
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select
              v-model="role"
              id="role"
              class="form-control"
              required
            >
              <option disabled value="">Select status</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CAISSIER">CAISSIER</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select
              v-model="status"
              id="status"
              class="form-control"
              required
            >
              <option disabled value="">Select status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
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
  import { useUserStore } from "../../stores/useStore";
  
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const role = ref("");
  const status = ref("");
  
  const userStore = useUserStore();
  const router = useRouter();
  
  async function handleSubmit() {
    const userData = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
      status: status.value,
    };
  
    try {
      await userStore.addUser(userData);
      console.log("Customer added successfully:", userData);
      resetForm();
      router.push("/user/list"); // Redirect to users list after submission
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  }
  
  function resetForm() {
    name.value = "";
    email.value = "";
    password.value = "";
    role.value = "";
    status.value = "";
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin-top: 20px;
  }
  </style>
  