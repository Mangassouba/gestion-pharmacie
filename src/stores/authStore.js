import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: null,
    refreshToken: null,
    user: null,
    tokenUserActif: localStorage.getItem("token"),
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
    
        this.token = response.data.accessToken;
        this.refreshToken = response.data.refreshToken;
    
        localStorage.setItem("token", this.token);
        localStorage.setItem("refreshToken", this.refreshToken);
    
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    
        const userResponse = await axios.get("http://localhost:3000/me");
    
        this.user = userResponse.data.user;
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error("Identifiants incorrects. Veuillez réessayer.");
        } else {
          throw new Error(
            "Erreur lors de la connexion. Veuillez réessayer plus tard."
          );
        }
      }
    }
,    
    logout() {
      this.token = null;
      this.refreshToken = null;
      this.user = null;
    
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    
      delete axios.defaults.headers.common["Authorization"];
    },
    async refreshAccessToken() {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          console.warn("Refresh token manquant.");
          this.logout();
          throw new Error("Refresh token manquant.");
        }
    
        const response = await axios.post("http://localhost:3000/refresh-token", {
          refreshToken,
        });
    
        const { accessToken } = response.data;
        if (!accessToken) {
          console.error("Le serveur n'a pas renvoyé de token d'accès.");
          this.logout();
          throw new Error("Le token d'accès est manquant.");
        }
    
        this.token = accessToken;
        localStorage.setItem("token", this.token);
        return this.token;
      } catch (error) {
        console.error("Erreur lors du renouvellement du token :", error.response || error.message);
        this.logout();
        throw error;
      }
    },
    
    isLoggedIn() {
      return !!this.token && !!this.user;
    },

    initializeStore() {
      this.token = localStorage.getItem("token");
      this.refreshToken = localStorage.getItem("refreshToken");
      if (this.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      }
    },
  },

  persist: true,
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await useAuthStore().refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Erreur lors du renouvellement du token :", refreshError.message);
        useAuthStore().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
