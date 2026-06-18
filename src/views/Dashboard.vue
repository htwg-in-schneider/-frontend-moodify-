<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { computed, ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const auth = useAuthStore()
const router = useRouter()

const { getAccessTokenSilently } = useAuth0()

const profileName = ref('')

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

async function loadProfile() {
  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://moodify-api'
      }
    })

    const res = await fetch('http://localhost:8081/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.error(await res.text())
      return
    }

    const data = await res.json()

    profileName.value =
      data.name ||
      data.username ||
      auth.user?.name ||
      'User'

  } catch (e) {
    console.error('Profile load failed:', e)

    profileName.value =
      auth.user?.name ||
      'User'
  }
}

onMounted(() => {
  if (auth.isLoggedIn) {
    loadProfile()
  }
})
</script>

<template>
  <main class="dashboard">

    <p v-if="auth.isLoggedIn" class="welcome">
      Guten {{ greeting }}, {{ profileName }} 👋
    </p>

    <p>Wähle eine Funktion:</p>

    <div class="links">
      <RouterLink to="/visionboard">Vision Board</RouterLink>
      <RouterLink to="/challenges">Challenges</RouterLink>
      <RouterLink to="/moodquiz">Mood Quiz</RouterLink>
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

.logout {
  margin-top: 20px;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>