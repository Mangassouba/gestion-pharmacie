<template>
    <div class="container">
      <h2>Edit user</h2>
      <form @submit.prevent="updateuser">
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
              placeholder="Enter email"
              required
            />
          </div>
        </div>
  
        <div class="row">
            <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select
              v-model="role"
              id="role"
              class="form-control"
              required
            >
              <option disabled value="">Select role</option>
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
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        </div>
  
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Update User</button>
        </div>
      </form>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../stores/useStore';

const route = useRoute();
const router = useRouter();
const store = useUserStore();

// Define reactive properties for customer fields
const name = ref('');
const email = ref('');
const role = ref('');
const status = ref('');
const id = route.params.id;

// Fetch customer details on component mount
onMounted(() => {
  const user = store.getUserById(parseInt(route.params.id));
  if (user) {
    name.value = user.name;
    email.value = user.email;
    role.value = user.role;
    status.value = user.status;
  }
});

// Update customer in store and redirect to customer list
async function updateuser() {
  try {
    await store.updateUser(id, {
      name: name.value,
      email: email.value,
      role: role.value,
      status: status.value,
    });
    router.push('/user/list'); // Change the route to your customer list page
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
  