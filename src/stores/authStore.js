// src/store/authStore.js
import { defineStore } from 'pinia'
import authService from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(email, password) {
      try {
        const data = await authService.login(email, password)
        this.user = data.user
        this.token = data.token
        this.isAuthenticated = true
        localStorage.setItem('token', data.token)
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    logout() {
      authService.logout()
      this.user = null
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('token')
    },
    async fetchCurrentUser() {
      if (!this.token) return
      try {
        const data = await authService.getCurrentUser()
        this.user = data
        this.isAuthenticated = true
      } catch (error) {
        console.error('Fetch current user error:', error)
        this.logout()
      }
    },
  },
})
