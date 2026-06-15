<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { computed } from 'vue'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
}

const greeting = computed(() => {
  const hour = new Date().getHours()

  if (hour < 12) return 'Morgen'
  if (hour < 18) return 'Tag'
  return 'Abend'
})
</script>

<template>
  <main class="dashboard">


    <!-- 👇 Safe User Greeting -->
    <p v-if="auth.isLoggedIn && auth.user" class="welcome">
      Guten {{ greeting }}, {{ auth.user?.name || auth.user?.email }} 👋
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