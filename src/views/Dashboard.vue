<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <main class="dashboard">
    <h1>Dashboard</h1>

  
    <p v-if="auth.isLoggedIn" class="welcome">
      Willkommen, {{ auth.user }} 👋
    </p>

    <p v-else>
      Bitte einloggen
    </p>

    <p>Wähle eine Funktion:</p>

    <div class="links">
      <RouterLink to="/visionboard">Vision Board</RouterLink>
      <RouterLink to="/challenges">Challenges</RouterLink>
      <RouterLink to="/moodtracker">Mood Tracker</RouterLink>
      <RouterLink to="/affirmations">Affirmations</RouterLink>
    </div>

    <button class="logout" @click="handleLogout">
  Logout
</button>
  </main>
</template>

<style scoped>
.dashboard {
  padding: 40px;
}

.welcome {
  margin: 10px 0 20px;
  font-weight: bold;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

a {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 10px;
  text-decoration: none;
  color: black;
}

</style>