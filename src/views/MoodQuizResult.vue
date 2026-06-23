<template>
  <div class="page">

    <div class="card">

      <div class="emoji">{{ mood.emoji }}</div>

      <h1>{{ mood.title }}</h1>

      <p class="text">{{ mood.text }}</p>

      <div class="box">
        💡 {{ mood.recommendation }}
      </div>

      <div class="answers" v-if="answers.length">
        <h3>Deine Antworten</h3>

        <div class="list">
          <div v-for="(a, i) in answers" :key="i" class="item">
            <span>Frage {{ i + 1 }}</span>
            <strong>{{ a }}</strong>
          </div>
        </div>
      </div>

      <button class="btn" @click="restart">
        Nochmal starten
      </button>

      <button class="btn" @click="goMoodTracker">
        Zum Moodtracker
      </button>

      <button class="btn" @click="goBack">
        Beenden
      </button>

    </div>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quizStore'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const quiz = useQuizStore()
const auth0 = useAuth0()

const answers = computed(() => quiz.answers || [])

const moodType = computed(() => quiz.calculateMood())

const mood = computed(() => {
  switch (moodType.value) {

    case 'sad':
      return {
        emoji: '🌧️',
        title: 'Du brauchst Ruhe',
        text: 'Deine Energie ist gerade niedrig.',
        recommendation: 'Mach eine Pause und entspann dich'
      }

    case 'calm':
      return {
        emoji: '🌤️',
        title: 'Ausgeglichen',
        text: 'Du bist stabil und ruhig.',
        recommendation: 'Perfekt für Fokus oder leichte Aufgaben'
      }

    default:
      return {
        emoji: '☀️',
        title: 'Sehr gute Energie',
        text: 'Du bist motiviert und aktiv!',
        recommendation: 'Nutze den Flow für produktive Tasks'
      }
  }
})

onMounted(async () => {

  if (!answers.value.length) return

  try {
    const token = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api"
      }
    })

    await fetch('http://localhost:8081/api/mood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        mood: moodType.value,
        answers: answers.value,
        date: new Date().toISOString()
      })
    })

  } catch (e) {
    console.error(e)
  }
})

function restart() {
  quiz.resetQuiz()
  router.push('/quiz/run')
}

function goBack() {
  router.push('/')
}

function goMoodTracker() {
  router.push('/moodtracker')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  padding: 20px;
  font-family: Arial, sans-serif;
}

.card {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0,0,0,0.08);
  animation: fadeIn 0.4s ease;
}

.emoji {
  font-size: 64px;
  margin-bottom: 10px;
}

h1 {
  font-size: 26px;
  margin-bottom: 10px;
}

.text {
  color: #6b7280;
  margin-bottom: 20px;
}

.box {
  background: #eef2ff;
  border-left: 4px solid #6366f1;
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 25px;
  text-align: left;
}

.answers {
  text-align: left;
  margin-top: 20px;
}

.list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  display: flex;
  justify-content: space-between;
  background: #f8fafc;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
}

.btn {
  margin-top: 25px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #6366f1;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>