<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <a class="navbar-brand text-white" href="#">Stock Management</a>
    <div class="ms-auto d-flex align-items-center position-relative">
      <i class="fas fa-bell me-3 mt-1 text-white"></i>
      <div v-if="userName" class="me-3 position-relative">
        <span
          class="user-name me-2 text-white"
          role="button"
          @click="toggleMenu"
        >
          <i class="fas fa-user"></i> {{ userName }}
        </span>
        <div
          v-if="showMenu"
          class="dropdown-menu dropdown-menu-end show"
          style="position: absolute; top: 100%; right: 0;"
        >
          <button class="dropdown-item" @click="modifyProfile">Modify Profile</button>
          <button class="dropdown-item" @click="modifyPassword">Modify Password</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const userName = computed(() => (authStore.user ? authStore.user.name : null));
const userId = computed(() => (authStore.user ? authStore.user.id : null));
const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const handleOutsideClick = (event) => {
  if (!event.target.closest('.dropdown-menu') && !event.target.closest('.user-name')) {
    showMenu.value = false;
  }
};

const modifyProfile = () => {
  if (userId.value) {
    router.push(`/profile/${userId.value}`);
    showMenu.value = false; 
  }
};

const modifyPassword = () => {
  if (userId.value) {
    router.push(`/profile/${userId.value}/password`);
    showMenu.value = false; 
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
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
  cursor: pointer;
}

.dropdown-menu {
  min-width: 180px;
}

.dropdown-item {
  cursor: pointer;
}
</style>
