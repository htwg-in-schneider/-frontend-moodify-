<template>
  <div class="result-page">

    <div class="result-card">

      <!-- Header -->
      <div class="top">
        <span class="badge">Dein Ergebnis</span>
      </div>

      <!-- Mood Section -->
      <div class="mood-section">
        <div class="emoji">{{ moodEmoji }}</div>
        <h1>{{ moodTitle }}</h1>
        <p>{{ moodText }}</p>
      </div>

      <!-- Recommendation Card -->
      <div class="rec-card">
        <h3>💡 Empfehlung für dich</h3>
        <p>{{ recommendation }}</p>
      </div>

      <!-- Stats -->
      <div class="stats">
        <div class="stat">
          <span>Stimmung</span>
          <strong>{{ score }}/5</strong>
        </div>
        <div class="stat">
          <span>Level</span>
          <strong>{{ level }}</strong>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions">
        <button class="primary" @click="restart">
          🔄 Nochmal starten
        </button>

        <button class="secondary" @click="goDashboard">
          🏠 Dashboard
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// später aus Pinia / Backend
const score = 4

const moodEmoji = computed(() => {
  if (score <= 2) return '🌧️'
  if (score <= 3) return '🌤️'
  return '☀️'
})

const moodTitle = computed(() => {
  if (score <= 2) return 'Du bist heute eher ruhig'
  if (score <= 3) return 'Du bist ausgeglichen'
  return 'Du bist voller Energie'
})

const moodText = computed(() => {
  if (score <= 2) return 'Nimm dir Zeit für dich und Ruhe.'
  if (score <= 3) return 'Stabile Stimmung – guter Flow.'
  return 'Sehr positive Energie heute!'
})

const recommendation = computed(() => {
  if (score <= 2) return 'Chill Musik & Ruhe helfen dir heute.'
  if (score <= 3) return 'Lo-Fi oder leichte Beats passen gut.'
  return 'Energetische Musik & Fokus-Playlist!'
})

const level = computed(() => {
  if (score <= 2) return 'Low Energy'
  if (score <= 3) return 'Balanced'
  return 'High Energy'
})

function restart() {
  router.push('/quiz/run')
}

function goDashboard() {
  router.push('/dashboard')
}
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #c7d2fe, #eef2ff, #f8fafc);
  padding: 20px;
}

.result-card {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 24px;
  padding: 35px;
  box-shadow: 0 25px 70px rgba(0,0,0,0.12);
  text-align: center;
}

.badge {
  background: #eef2ff;
  color: #4f46e5;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.mood-section {
  margin-top: 25px;
}

.emoji {
  font-size: 60px;
  margin-bottom: 10px;
}

.mood-section h1 {
  font-size: 26px;
  margin-bottom: 8px;
}

.mood-section p {
  color: #6b7280;
}

.rec-card {
  margin-top: 25px;
  background: #f8fafc;
  border-left: 4px solid #6366f1;
  padding: 15px;
  border-radius: 12px;
  text-align: left;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.stat {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 12px;
  width: 48%;
}

.stat span {
  font-size: 12px;
  color: #6b7280;
}

.stat strong {
  display: block;
  font-size: 18px;
  margin-top: 5px;
}

.actions {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.primary {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
}

.secondary {
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
}
</style>