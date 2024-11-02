<template>
    <div class="sidebar bg-dark text-white p-3" id="sidebar-wrapper">
      <h5 class="text-center sidebar-title">Pharma Dashboard</h5>
    <ul class="nav flex-column">
      <li class="nav-item"><RouterLink to="/main" class="nav-link text-white">Dashboard</RouterLink></li>
      <li class="nav-item"><RouterLink to="/stock/addProduit" class="nav-link text-white">Product</RouterLink></li>
      <li class="nav-item"><RouterLink to="/orders/list" class="nav-link text-white">Order</RouterLink></li>
      <li class="nav-item"><RouterLink to="/" class="nav-link text-white">Reception</RouterLink></li>
      <li class="nav-item"><RouterLink to="/customer/list" class="nav-link text-white">Customer</RouterLink></li>
      <li class="nav-item"><RouterLink to="/" class="nav-link text-white">Supplier</RouterLink></li>
      <li class="nav-item"><RouterLink to="/" class="nav-link text-white">Batch</RouterLink></li>
      <li class="nav-item"><RouterLink to="/" class="nav-link text-white">User</RouterLink></li>
      <li class="nav-item"><RouterLink to="/" class="nav-link text-white">Deconnexion</RouterLink></li>
    </ul>
    </div>
    <RouterView/>
  </template>
  
  <script setup>
  // import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router';
  
  // const menuItems = ref([
  //   { 
  //     text: 'Tableau de bord', 
  //     icon: 'fas fa-tachometer-alt',
  //     subMenu: null 
  //   },
  //   { 
  //     text: 'Stock', 
  //     icon: 'fas fa-boxes',
  //     subMenu: [
  //       { text: 'Ajouter Produit', icon: 'fas fa-plus' },
  //       { text: 'Gérer Stock', icon: 'fas fa-edit' },
  //     ]
  //   },
  //   { 
  //     text: 'Clients', 
  //     icon: 'fas fa-users',
  //     subMenu: null 
  //   },
  //   { 
  //     text: 'Facturation', 
  //     icon: 'fas fa-file-invoice-dollar',
  //     subMenu: null 
  //   }
  // ])
  
  // const isDropdownOpen = ref(Array(menuItems.value.length).fill(false))
  
  // const toggleDropdown = (index) => {
  //   isDropdownOpen.value[index] = !isDropdownOpen.value[index]
  // }
  
  // const isActive = (index) => {
  //   return isDropdownOpen.value[index]
  // }
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
  