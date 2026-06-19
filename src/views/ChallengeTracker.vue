<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()

const challenges = ref([])
const loading = ref(true)

/* LOAD DATA */
async function loadData() {
  try {
    loading.value = true

    const token = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api"
      }
    })

    // 1. User Challenges (nur aktueller User)
   const resUser = await fetch('http://localhost:8081/api/user-challenges/me', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

    const userChallenges = resUser.ok ? await resUser.json() : []

    // 2. Alle Challenges (öffentlich)
    const resAll = await fetch('http://localhost:8081/api/challenge')
    const allChallenges = resAll.ok ? await resAll.json() : []

    // 3. Mapping: user data + challenge details
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

    <p v-if="loading" class="loading">
      Lade deine Challenges...
    </p>

    <div v-else-if="challenges.length === 0" class="empty">
      Noch keine angenommenen Challenges 🎯
    </div>

    <div v-else class="grid">

      <div v-for="c in challenges" :key="c.id" class="card">

        <h2 class="title">{{ c.title }}</h2>
        <p class="desc">{{ c.description }}</p>

        <div class="tags">
          <span class="tag">{{ c.category }}</span>
          <span class="tag">{{ c.difficulty }}</span>
        </div>

        <p class="status">
          Status:
          <span :class="c.finished ? 'ok' : 'bad'">
            {{ c.finished ? '✔ erledigt' : '❌ offen' }}
          </span>
        </p>

        <p class="mood">
          😊 Mood: {{ c.mood || '—' }}
        </p>

        <p v-if="c.review" class="review">
          📝 {{ c.review }}
        </p>

      </div>

    </div>

  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  font-family: sans-serif;
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
}

.loading,
.empty {
  text-align: center;
  color: #666;
  margin-top: 40px;
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
  margin-bottom: 10px;
}

/* TAGS */
.tags {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  font-size: 12px;
  background: #eee;
  padding: 4px 10px;
  border-radius: 12px;
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