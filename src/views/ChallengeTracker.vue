<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()

const challenges = ref([])
const loading = ref(true)

/* LOAD + MERGE DATA */
async function loadData() {
  try {
    const token = await auth0.getAccessTokenSilently({
  authorizationParams: {
    audience: "https://moodify-api"
  }
})

    // 1. User Challenges laden
    const resUser = await fetch('http://localhost:8081/api/user-challenges', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const userChallenges = await resUser.json()

    // 2. Alle Challenges laden
    const resAll = await fetch('http://localhost:8081/api/challenge')
    const allChallenges = await resAll.json()

    // 3. MAPPING (ID → echte Daten)
    challenges.value = userChallenges.map(uc => {
      const match = allChallenges.find(c => c.id === uc.challengeId)

      return {
        ...uc,
        title: match?.title || 'Unknown Challenge',
        description: match?.description || ''
      }
    })

  } catch (e) {
    console.error('Load error:', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <main class="page">

    <h1>📁 Meine Challenges</h1>

    <p v-if="loading" class="loading">Lade deine Daten...</p>

    <div v-else class="grid">

      <div
        v-for="c in challenges"
        :key="c.id"
        class="card"
      >

        <h2 class="title">{{ c.title }}</h2>
        <p class="desc">{{ c.description }}</p>

        <p class="status">
          Status:
          <span :class="c.finished ? 'ok' : 'bad'">
            {{ c.finished ? '✔ erledigt' : '❌ offen' }}
          </span>
        </p>

        <p class="mood">😊 Mood: {{ c.mood }}</p>

        <p v-if="c.review" class="review">
          📝 "{{ c.review }}"
        </p>

      </div>

    </div>

  </main>
</template>

<style scoped>
.page {
  padding: 40px;
  font-family: sans-serif;
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
  min-height: 100vh;
}

.loading {
  text-align: center;
  color: #666;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* CARD */
.card {
  background: white;
  padding: 20px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

/* TEXT */
.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

/* STATUS */
.status {
  margin-top: 10px;
}

.ok {
  color: #16a34a;
  font-weight: 600;
}

.bad {
  color: #dc2626;
  font-weight: 600;
}

/* MOOD */
.mood {
  margin-top: 8px;
}

/* REVIEW */
.review {
  margin-top: 10px;
  font-style: italic;
  color: #444;
}
</style>