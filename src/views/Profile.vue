<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { user, isAuthenticated, idTokenClaims } = useAuth0()
</script>

<template>
  <main class="page">
    <h1>Profile</h1>

    <div v-if="isAuthenticated && user">

      <img v-if="user.picture" :src="user.picture" class="avatar" />

      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Sub (Auth0 ID):</strong> {{ user.sub }}</p>

      <hr />




      
      <h3>Debug Info (Auth0)</h3>
      <pre>{{ user }}</pre>

      <h3>ID Token claims</h3>
      <pre>{{ idTokenClaims }}</pre>

    </div>

    <div v-else>
      <p>Nicht eingeloggt</p>
    </div>
  </main>
</template>

<style scoped>
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.page {
  padding: 20px;
}
</style>