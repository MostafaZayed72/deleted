// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),

  actions: {
    checkAuth() {
      const token = localStorage.getItem('authToken')
      const userData = localStorage.getItem('userData')
      
      if (token && userData) {
        this.user = JSON.parse(userData)
        this.isAuthenticated = true
      } else {
        this.user = null
        this.isAuthenticated = false
      }
    },

    login(userData, token) {
      this.user = userData
      this.isAuthenticated = true
      localStorage.setItem('authToken', token)
      localStorage.setItem('userData', JSON.stringify(userData))
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('userType')
    }
  }
})