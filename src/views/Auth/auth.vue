<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Se connecter</button>
      <p class="forgot-password">
        <router-link to="/forgot-password">forgot-password</router-link>
      </p>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const auth = useAuthStore()

const handleLogin = async () => {
  try {
    // const response = await fetch("http://localhost:3000/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email.value,
    //     password: password.value,
    //   }),
    // });

    // const data = await response.json();

    // if (!response.ok) {
    //   errorMessage.value = data.message || "Erreur lors de la connexion";
    //   return;
    // }
    await auth.login(email.value, password.value)
    

    router.push("/main");
  } catch (error) {
    errorMessage.value = "Erreur de connexion. Veuillez réessayer.";
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
