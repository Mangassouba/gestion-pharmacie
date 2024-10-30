<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a class="navbar-brand" href="#">Gestion de Stock</a>
  
      <div class="ms-auto d-flex align-items-center">     
        <button class="btn btn-outline-primary mx-1"><i class="fas fa-bell"></i></button>
        <button class="btn btn-outline-primary mx-1"><i class="fas fa-user"></i> Profile</button>
        <div class="dropdown me-3">
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
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  // import i18n from '../path/to/i18n' // Assurez-vous de définir le chemin vers votre instance i18n
  
  const currentLanguage = ref('FR')
  
  // Fonction pour changer la langue
  const changeLanguage = (lang) => {
    i18n.global.locale.value = lang
    currentLanguage.value = lang === 'fr' ? 'FR' : 'AR'
  }
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
  </style>
  