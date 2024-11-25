<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <a class="navbar-brand text-white" href="#">Stock Management</a>
    <div class="ms-auto d-flex align-items-center">
      <i class="fas fa-bell me-3 mt-1 text-white"></i>
      <div v-if="userName" class="me-3">
        <span class="user-name me-2 text-white"><i class="fas fa-user"></i> {{ userName }}</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const userName = computed(() => authStore.user ? authStore.user.name : null);

onMounted(() => {
  if (authStore.token && !authStore.user) {
    authStore.fetchCurrentUser();
  }
});
</script>

<style scoped>
.navbar {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; 
  background-color: #343a40; 
}

.navbar + .dashboard-container {
  margin-top: 60px; 
}

.user-name {
  font-weight: bold;
  color: #fff;
}

.navbar-brand, .text-white {
  color: #fff !important; 
}
</style>
