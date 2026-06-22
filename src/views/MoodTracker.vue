<template>
  <div class="tracker">

    <div class="header">
      <h1>📊 Mood Intelligence</h1>
      <p>Deine emotionale Entwicklung der letzten Tage</p>
    </div>


    <div v-if="loading" class="state">
      ⏳ Lade Daten...
    </div>

    <div v-else-if="!moods.length" class="state">
      Keine Mood-Daten vorhanden
    </div>

    <div v-else>

      <div class="insight">
        {{ insight }}
      </div>

      <div class="stats">

        <div class="card">
          <h3>Durchschnitt</h3>
          <p>{{ averageMood }}</p>
        </div>

        <div class="card">
          <h3>Streak</h3>
          <p>🔥 {{ streak }} Tage</p>
        </div>

        <div class="card">
          <h3>Trend</h3>
          <p>{{ trend }}</p>
        </div>

      </div>


      <div class="chart">
        <div
          v-for="(m, i) in last7Days"
          :key="i"
          class="bar-wrapper"
        >
          <div
            class="bar"
            :style="{ height: barHeight(score(m.mood)) + 'px' }"
          ></div>

          <span class="label">
            {{ emoji(m.mood) }}
          </span>
        </div>
      </div>


      <div class="list">

        <div v-for="(m, i) in moods" :key="i" class="entry">

          <div class="emoji">
            {{ emoji(m.mood) }}
          </div>

          <div class="info">
            <strong>{{ m.mood }}</strong>
            <small>{{ formatDate(m.date) }}</small>
          </div>

          <div class="score">
            ⭐ {{ score(m.mood) }}
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()

const moods = ref([])
const loading = ref(true)


async function load() {
  try {
    const token = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api"
      }
    })

    const res = await fetch('http://localhost:8081/api/mood/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()
    moods.value = Array.isArray(data) ? data : []

  } catch (e) {
    console.error("MoodTracker error:", e)
    moods.value = []
  } finally {
    loading.value = false
  }
}

onMounted(load)


function score(mood) {
  if (mood === 'happy') return 3
  if (mood === 'calm') return 2
  return 1
}

function emoji(mood) {
  if (mood === 'happy') return '☀️'
  if (mood === 'calm') return '🌤️'
  return '🌧️'
}

function formatDate(date) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString()
}


const last7Days = computed(() => {
  return [...moods.value]
    .slice(-7)
    .map(m => ({
      mood: m.mood
    }))
})

const averageMood = computed(() => {
  if (!moods.value.length) return '-'

  const avg =
    moods.value.reduce((a, b) => a + score(b.mood), 0) /
    moods.value.length

  if (avg >= 2.5) return '☀️ Sehr gut'
  if (avg >= 1.8) return '🌤️ Stabil'
  return '🌧️ Niedrig'
})

const trend = computed(() => {
  if (moods.value.length < 2) return '—'

  const last = score(moods.value.at(-1).mood)
  const prev = score(moods.value.at(-2).mood)

  if (last > prev) return '📈 Steigend'
  if (last < prev) return '📉 Fallend'
  return '➡️ Stabil'
})

const streak = computed(() => {
  let count = 1

  for (let i = moods.value.length - 1; i > 0; i--) {
    if (moods.value[i].mood === moods.value[i - 1].mood) {
      count++
    } else {
      break
    }
  }

  return count
})

const insight = computed(() => {
  const avg =
    moods.value.reduce((a, b) => a + score(b.mood), 0) /
    (moods.value.length || 1)

  if (avg > 2.5) return "🔥 Du bist in einer starken Phase"
  if (avg > 1.5) return "⚖️ Stabil, aber ausbaufähig"
  return "🧠 Du brauchst mehr Balance"
})


function barHeight(s) {
  return s * 35
}
</script>

<style scoped>
.tracker {
  max-width: 950px;
  margin: 40px auto;
  font-family: Inter, Arial;
  padding: 20px;
  background: linear-gradient(135deg,#f8fafc,#eef2ff);
  border-radius: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.state {
  text-align: center;
  color: #666;
}

.insight {
  background: rgba(255,255,255,0.8);
  padding: 14px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.stats {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.card {
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 140px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 25px;
}

.bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 18px;
  background: #6366f1;
  border-radius: 8px;
  transition: 0.3s;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.entry {
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #eee;
}

.emoji {
  font-size: 22px;
}

.score {
  font-weight: bold;
}
</style>