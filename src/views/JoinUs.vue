<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const auth = useAuthStore()

const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

function login() {
  auth.login('User') 
  router.push('/dashboard')
}

function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}



</script>

<template>
  <main>
    <h1>Join Us</h1>

    <button @click="login">
      join us
    </button>
  </main>

  <li>
  <button v-if="!isAuthenticated" @click="loginWithRedirect">
    Login
  </button>

  <button v-else @click="handleLogout">
    Logout
  </button>
</li>

</template>