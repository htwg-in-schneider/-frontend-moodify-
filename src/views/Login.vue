<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()

function login() {
  loginWithRedirect()
}
</script>

<template>
  <main>
    <h1>login</h1>

    <button @click="login">
      Login with Auth0
    </button>
  </main>
</template>