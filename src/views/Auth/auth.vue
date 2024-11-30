<template>
  <div class="login-container">
    <h2>Connect</h2>
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
      <div class="mb-3 password-container">
        <label for="password" class="form-label">Password</label>
        <div class="input-group">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="form-control"
            required
          />
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="togglePasswordVisibility"
          >
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
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
import { useToast } from "vue-toastification";

const toast = useToast();
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const passwordVisible = ref(false); // State to toggle password visibility
const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    toast.success("Connect successfully");
    router.push("/main");
  } catch (error) {
    errorMessage.value = "Erreur de connexion. Veuillez réessayer.";
  }
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
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

.password-container {
  position: relative;
}

.input-group .btn {
  border-radius: 0;
}
</style>
