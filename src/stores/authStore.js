import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: null,
    user: null,
    tokenUserActif: localStorage.getItem("token")
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password
        });
 this.token = response.data.accessToken

        localStorage.setItem("token",this.token );
        const userToken = localStorage.getItem("token")
        
        console.log("TOOOOOOO; :", userToken);
        

        // const userResponse = await axios.get("http://localhost:3000/api/me", {
        //   headers: {
        //     Authorization: `Bearer ${this.token}`
        //   }
        // });

        // this.user = userResponse.data.user;
      } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);
        throw error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
    }
  },

  persist: true
});
