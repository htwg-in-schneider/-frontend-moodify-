import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null
  }),

  actions: {
    login(name){
      this.isLoggedIn = true
      this.user = name
    },

    logout() {
      this.isLoggedIn = false
      this.user = null
    }
  }
})