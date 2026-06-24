<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()

const challenges = ref([])
const loading = ref(true)

async function loadData() {
    
  try {
    loading.value = true

  const token = await auth0.getAccessTokenSilently({
  authorizationParams: {
    audience: "https://moodify-api"
  }
})


const resUser = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user-challenges/me`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})


const resAll = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/challenge`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const userChallenges = resUser.ok ? await resUser.json() : []
const allChallenges = resAll.ok ? await resAll.json() : []

    
    challenges.value = userChallenges.map(uc => {
      const match = allChallenges.find(c => c.id == uc.challengeId)

      return {
        id: uc.id,
        challengeId: uc.challengeId,
        finished: uc.finished,
        mood: uc.mood,
        review: uc.review,

        title: match?.title || 'Unknown Challenge',
        description: match?.description || '',
        category: match?.category || '',
        difficulty: match?.difficulty || ''
      }
    })

  } catch (e) {
    console.error('Load error:', e)
    challenges.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <main class="page">

    <h1>📁 Mein Challenge Tracker</h1>

    <p v-if="loading">Lade deine Challenges...</p>

    <p v-else-if="challenges.length === 0">
      Noch keine angenommenen Challenges 🎯
    </p>

    <div v-else class="grid">

      <div v-for="c in challenges" :key="c.id" class="card">

        <h2>{{ c.title }}</h2>
        <p>{{ c.description }}</p>

        <p>
          Status:
          <span :style="{ color: c.finished ? 'green' : 'red' }">
            {{ c.finished ? '✔ erledigt' : '❌ offen' }}
          </span>
        </p>

        <p>😊 Mood: {{ c.mood || '—' }}</p>

        <p v-if="c.review">📝 {{ c.review }}</p>

      </div>

    </div>

  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  font-family: sans-serif;
  background: #f5f7ff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}
</style>