<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
    <a class="navbar-brand" href="#">Gestion de Stock</a>

    <div class="ms-auto d-flex align-items-center">
      <!-- <button class="btn btn-outline-primary mx-1"> -->
        <i class="fas fa-bell me-3 mt-1"></i>
      <!-- </button> -->
     
      <!-- <div class="dropdown me-3">
        <button
          class="btn btn-outline-primary dropdown-toggle"
          type="button"
          id="languageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ currentLanguage }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="languageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="changeLanguage('fr')">Français (FR)</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="changeLanguage('ar')">العربية (AR)</a>
          </li>
        </ul>
      </div> -->
      <div v-if="userName" class="me-3">
        <span class="user-name me-2 "><i class="fas fa-user"></i> {{ userName }}</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const currentLanguage = ref('FR');

const changeLanguage = (lang) => {
  currentLanguage.value = lang === 'fr' ? 'FR' : 'AR';
};

const userName = computed(() => authStore.user ? authStore.user.name : null);

onMounted(() => {
  if (authStore.token && !authStore.user) {
    authStore.fetchCurrentUser();
  }
});

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.navbar {
  height: 60px;
}
.btn {
  transition: background-color 0.3s, color 0.3s;
}
.btn:hover {
  background-color: #007bff;
  color: #fff;
}
.user-name {
  font-weight: bold;
  color: #333;
}
</style>
