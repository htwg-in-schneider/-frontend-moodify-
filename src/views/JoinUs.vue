<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

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

    <button v-if="!isAuthenticated" @click="loginWithRedirect">
      Login / Registrieren
    </button>

    <button v-else @click="handleLogout">
      Logout
    </button>
  </main>
</template>