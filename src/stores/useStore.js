import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './authStore';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    tokenUserActif: localStorage.getItem("token")
  }),
  actions: {
    async fetchUsers() {
      // const authStore = useAuthStore();
      // console.log(authStore.token);
      
      // console.log("TOKEN FROM user :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`
          }
          
        });
        
        
        this.users = response.data; // Set the users array with response data
        
        // console.log(this.users);
        return this.users;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error.message);
        throw error;
      }
    },
    
  getUserById(userId) {
    return this.users.find(p => p.id === userId);
 },
    async addUser(userData) {
      // const authStore = useAuthStore();

      try {
        const response = await axios.post('http://localhost:3000/user/', userData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
          
        });
        this.users.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l’ajout du user:', error.message);
        throw error;
      }
    },
    async updateUser(userId, userData) {
      console.log(userId);
      
      console.log("TOKEN FROM user :",this.tokenUserActif);
      try {
        const response = await axios.put(`http://localhost:3000/user/${userId}`, userData, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) this.users[index] = response.data;
        return response.data
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error.message);
        throw error;
      }
    },
    async deleteUser(userId) {
    //   const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error.message);
        throw error;
      }
    },
    async updatePassword(userId, oldPassword, newPassword) {
      try {
        const response = await axios.put(
          `http://localhost:3000/profile/${userId}/password`,
          { oldPassword, newPassword },
          {
            headers: {
              Authorization: `Bearer ${this.tokenUserActif}`,
            },
          }
        );
        return response.data; // Retourne la réponse du serveur pour afficher un message
      } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe :', error.message);
        throw error;
      }
    },
  },
});
