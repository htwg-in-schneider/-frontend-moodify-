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

    /* 1. USER CHALLENGES */
    const resUser = await fetch('http://localhost:8081/api/user-challenges/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const userChallenges = resUser.ok ? await resUser.json() : []

    /* 2. ALL CHALLENGES (WICHTIG: NACH REQUEST) */
    const resAll = await fetch('http://localhost:8081/api/challenge', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const allChallenges = resAll.ok ? await resAll.json() : []

    console.log("USER:", userChallenges)
    console.log("ALL:", allChallenges)

    /* 3. MERGE */
    challenges.value = userChallenges.map(uc => {
      const match = allChallenges.find(c => c.id == uc.challengeId)

      return {
        id: uc.id,
        finished: uc.finished,
        mood: uc.mood,
        review: uc.review,

        title: match?.title || "Unknown",
        description: match?.description || "",
        category: match?.category || "",
        difficulty: match?.difficulty || ""
      }
    })

  } catch (e) {
    console.error("Load error:", e)
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

    <p v-if="loading">Lade...</p>

    <div v-else-if="challenges.length === 0">
      Keine Challenges vorhanden 🎯
    </div>

    <div v-else class="grid">

      <div v-for="c in challenges" :key="c.id" class="card">

        <h2>{{ c.title }}</h2>
        <p>{{ c.description }}</p>

        <p>
          Status:
          <b :style="{ color: c.finished ? 'green' : 'red' }">
            {{ c.finished ? "Erledigt" : "Offen" }}
          </b>
        </p>

        <p>Mood: {{ c.mood }}</p>
        <p v-if="c.review">📝 {{ c.review }}</p>

      </div>

    </div>

  </main>
</template>