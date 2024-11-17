<template>
  <div class="sidebar bg-dark text-white p-3" id="sidebar-wrapper">
    <ul class="nav flex-column">
      <li class="nav-item">
        <RouterLink
          to="/main"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/main') }"
        >
          <i class="fas fa-tachometer-alt"></i> <span class="menu-text">Dashboard</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/stock/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/stock/list') }"
        >
          <i class="fas fa-box"></i> <span class="menu-text">Product</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/orders/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/orders/list') }"
        >
          <i class="fas fa-shopping-cart"></i> <span class="menu-text">Order</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/reception/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/reception/list') }"
        >
          <i class="fas fa-truck"></i> <span class="menu-text">Reception</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/sale/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/sale/list') }"
        >
          <i class="fas fa-dollar-sign"></i> <span class="menu-text">Sale</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/customer/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/customer/list') }"
        >
          <i class="fas fa-user"></i> <span class="menu-text">Customer</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/supplier/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/supplier/list') }"
        >
          <i class="fas fa-people-carry"></i> <span class="menu-text">Supplier</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/batch/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/batch/list') }"
        >
          <i class="fas fa-boxes"></i> <span class="menu-text">Batch</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/inventor/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/inventor/list') }"
        >
          <i class="fas fa-boxes"></i> <span class="menu-text">Inventor</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/movement/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/movement/list') }"
        >
          <i class="fas fa-exchange-alt"></i> <span class="menu-text">Movement</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/user/list"
          class="nav-link text-white"
          :class="{ active: isActiveRoute('/user/list') }"
        >
          <i class="fas fa-users"></i> <span class="menu-text">User</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link text-white" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i> <span class="menu-text">Déconnexion</span>
        </a>
      </li>
    </ul>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isActiveRoute = (path) => {
  return route.path === path;
};

// const isActiveRoute = (path) => route.path === path;

const handleLogout = () => {
  authStore.logout();
  router.push('/'); // Redirige vers la page de connexion après la déconnexion
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  transition: width 0.3s;
}
.sidebar:hover {
  width: 250px;
}
.sidebar-title {
  font-weight: bold;
}
.nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  transition: background 0.3s;
}
.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
.nav-link.active {
  background-color: rgba(255, 255, 255, 0.1); /* Couleur pour le lien actif */
  color: white;
  font-weight: bold;
  border-radius: 5px;
}
.nav-link i {
  margin-right: 10px; /* Espace entre l'icône et le texte */
}
.menu-text {
  transition: opacity 0.3s;
}
@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }
  .menu-text {
    display: none;
  }
}
</style>
