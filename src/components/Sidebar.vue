<template>
    <div class="sidebar bg-dark text-white p-3" id="sidebar-wrapper">
      <h5 class="text-center sidebar-title">Pharma Dashboard</h5>
      <!-- <ul class="nav flex-column">
        <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
          <a
            class="nav-link text-white"
            :class="{ 'active': isActive(index) }"
            @click="toggleDropdown(index)"
            href="#"
            role="button"
            aria-expanded="isDropdownOpen[index]"
          >
            <i :class="item.icon"></i>
            <span class="menu-text ms-2">{{ item.text }}</span>
            <i class="fas fa-caret-down ms-auto" v-if="item.subMenu"></i>
          </a>
          <ul class="nav flex-column ms-3" v-if="isDropdownOpen[index]">
            <li class="nav-item" v-for="(subItem, subIndex) in item.subMenu" :key="subIndex">
              <RouterLink to= "/main" class="nav-link text-white" href="#">
                <i :class="subItem.icon"></i>
                <span class="menu-text ms-2">{{ subItem.text }}</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul> -->
    <ul class="nav flex-column">
      <li class="nav-item"><RouterLink to="/main" class="nav-link text-white">Dashboard</RouterLink></li>
      <li class="nav-item"><RouterLink to="/stock/addProduit" class="nav-link text-white">Product</RouterLink></li>
      <li class="nav-item"><RouterLink to="/customer/list" class="nav-link text-white">Customer</RouterLink></li>
      <li class="nav-item"><RouterLink to="/" class="nav-link text-white">Supplier</RouterLink></li>
      <li class="nav-item"><RouterLink to="/" class="nav-link text-white">Dashboard</RouterLink></li>
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
  