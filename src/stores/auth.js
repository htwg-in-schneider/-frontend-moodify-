import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'

export const useAuthStore = defineStore('auth', () => {
  const auth0 = useAuth0()

  return {
    isLoggedIn: auth0.isAuthenticated,
    user: auth0.user,
    login: auth0.loginWithRedirect,
    logout: auth0.logout
  }
})