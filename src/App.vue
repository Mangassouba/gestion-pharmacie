<template>
  <div class="d-flex" id="wrapper">
    <div id="page-content-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
#wrapper {
  display: flex;
  height: 100vh;
}
#page-content-wrapper {
  flex: 1;
  overflow-y: auto;
}
</style>
