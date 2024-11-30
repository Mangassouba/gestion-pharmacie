<template>
    <div class="profile-edit">
      <h1>Edit Profile</h1>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            required
          />
        </div>
        <!-- <div class="form-group"> -->
          <button type="submit" class="btn btn-primary">Update</button>
        <!-- </div> -->
      </form>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '../../stores/authStore';
  import { useUserStore } from '../../stores/useStore';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const toast = useToast();
  const router = useRouter();
  
  const name = ref('');
  const email = ref('');
//   const errorMessage = ref('');
//   const successMessage = ref('');
  
  const fetchProfileData = async () => {
    try {
      const user = await authStore.fetchCurrentUser();
      if (user) {
        name.value = user.name;
        email.value = user.email;
      } else {
        // errorMessage.value = "Unable to load user information.";
        toast.error("Unable to load user information.");
      }
    } catch (error) {
    //   errorMessage.value = "Error while retrieving user data.";
      toast.error("Error while retrieving user data.");
    }
  };
  
  const updateProfile = async () => {
    try {
      const userId = authStore.user.id; // Assuming the connected user is stored in authStore
      await userStore.updateUser(userId, {
        name: name.value,
        email: email.value,
      });
      toast.success("Profile updated successfully.");
    //   toast.error('');
      
      // Disconnect after a successful update
      await authStore.logout();
      router.push('/'); 
      toast.success('Disconnect');
    } catch (error) {
      toast.error("Error while updating the profile.");
      console.error(error);
    }
  };
  
  onMounted(fetchProfileData);
  </script>
  
  <style scoped>
  .profile-edit {
    max-width: 500px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn {
    width: 100%;
  }
  </style>
  