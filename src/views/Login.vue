<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()
</script>

<template>
  <main>
    <h1>Login</h1>

    <button @click="loginWithRedirect">
      Login with Auth0
    </button>
  </main>
</template>