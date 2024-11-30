<template>
  <div class="container mt-5">
    <h2>Modify Password</h2>
    <form @submit.prevent="handlePasswordUpdate">
      <!-- Champ Old Password -->
      <div class="mb-3 position-relative">
        <label for="oldPassword" class="form-label">Old Password</label>
        <input
          :type="showOldPassword ? 'text' : 'password'"
          id="oldPassword"
          v-model="oldPassword"
          class="form-control"
          required
        />
        <i
          :class="showOldPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
          class="toggle-password"
          @click="toggleOldPasswordVisibility"
        ></i>
      </div>

      <!-- Champ New Password -->
      <div class="mb-3 position-relative">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          :type="showNewPassword ? 'text' : 'password'"
          id="newPassword"
          v-model="newPassword"
          class="form-control"
          required
        />
        <i
          :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
          class="toggle-password"
          @click="toggleNewPasswordVisibility"
        ></i>
      </div>

      <button type="submit" class="btn btn-primary">Change Password</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/useStore";

const toast = useToast();
const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const oldPassword = ref("");
const newPassword = ref("");

// États pour gérer la visibilité des mots de passe
const showOldPassword = ref(false);
const showNewPassword = ref(false);

const userId = authStore.user?.id;

const handlePasswordUpdate = async () => {
  try {
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    await userStore.updatePassword(userId, oldPassword.value, newPassword.value);

    toast.success("Password updated successfully!");

    authStore.logout();
    router.push("/");

    oldPassword.value = "";
    newPassword.value = "";
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update password. Please try again."
    );
  }
};

// Fonctions pour basculer la visibilité des mots de passe
const toggleOldPasswordVisibility = () => {
  showOldPassword.value = !showOldPassword.value;
};

const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value;
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.position-relative {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 75%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
}

.toggle-password:hover {
  color: #000;
}
</style>
