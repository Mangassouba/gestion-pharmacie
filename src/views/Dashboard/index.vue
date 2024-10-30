<template>
  <div class="dashboard-layout" id="wrapper">
    <Header />

    <div class="dashboard-container">
      <Sidebar />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Header from "../../components/Header.vue";
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.dashboard-container {
  display: flex;
  flex: 1;
}

.dashboard-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
