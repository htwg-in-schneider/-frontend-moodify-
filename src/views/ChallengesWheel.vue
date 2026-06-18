<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* DATA */
const challenges = ref([])
const selected = ref(null)

/* UI */
const spinning = ref(false)
const showResult = ref(false)
const showAcceptPopup = ref(false)

/* FILTER */
const category = ref('')
const difficulty = ref('')

function goBack() {
  router.push('/challenges')
}

/* LOAD */
async function loadChallenges() {
  const res = await fetch('http://localhost:8081/api/challenge')
  challenges.value = await res.json()
}

/* FILTER */
const filteredChallenges = computed(() => {
  return challenges.value.filter(c => {
    const matchCategory = !category.value || c.category === category.value
    const matchDifficulty = !difficulty.value || c.difficulty === difficulty.value
    return matchCategory && matchDifficulty
  })
})

/* SPIN */
function spin() {
  if (filteredChallenges.value.length === 0) return

  spinning.value = true
  showResult.value = false
  selected.value = null

  setTimeout(() => {
    const i = Math.floor(Math.random() * filteredChallenges.value.length)
    selected.value = filteredChallenges.value[i]

    spinning.value = false
    showResult.value = true
  }, 1000)
}

/* ACCEPT (FIXED FLOW) */
function acceptChallenge() {
  if (!selected.value) return

  // 1. Ergebnis ausblenden
  showResult.value = false

  // 2. Popup anzeigen
  showAcceptPopup.value = true

  // 3. nach 2 Sekunden → completed page
  setTimeout(() => {
    showAcceptPopup.value = false

    router.push('/challenges/completed')
  }, 2000)
}

/* REJECT */
function rejectChallenge() {
  selected.value = null
  showResult.value = false
}

/* AGAIN */
function spinAgain() {
  spin()
}

onMounted(loadChallenges)
</script>

<template>
  <main class="page">

    <!-- BACK -->
    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <h1>🎡 Challenge Wheel</h1>
    <p class="subtitle">Wähle Filter & spinne deine Challenge</p>

    <!-- FILTER -->
    <div class="filters">
      <select v-model="category">
        <option value="">Alle Kategorien</option>
        <option value="MOTIVATION">Motivation</option>
        <option value="ENTSPANNUNG">Entspannung</option>
        <option value="FOKUS">Fokus</option>
        <option value="ABLENKUNG">Ablenkung</option>
      </select>

      <select v-model="difficulty">
        <option value="">Alle Level</option>
        <option value="EASY">Easy</option>
        <option value="MITTEL">Mittel</option>
        <option value="SCHWER">Schwer</option>
      </select>
    </div>

    <!-- WHEEL -->
    <div class="wheel" :class="{ spinning }">
      🎯
    </div>

    <button class="spin-btn" @click="spin" :disabled="spinning">
      {{ spinning ? 'Spinning...' : 'Spin 🎡' }}
    </button>

    <!-- RESULT -->
    <div v-if="showResult && selected" class="result">

      <h2>🎯 Deine Challenge</h2>

      <h3>{{ selected.title }}</h3>
      <p>{{ selected.description }}</p>

      <p class="tag">{{ selected.category }}</p>
      <p class="tag">{{ selected.difficulty }}</p>

      <div class="actions">

        <button class="accept" @click="acceptChallenge">
          ✅ Annehmen
        </button>

        <button class="reject" @click="rejectChallenge">
          ❌ Ablehnen
        </button>

        <button class="again" @click="spinAgain">
          🔁 Nochmal
        </button>

      </div>
    </div>

    <!-- ACCEPT POPUP -->
    <div v-if="showAcceptPopup" class="popup-overlay">
      <div class="popup">
        <h2>🔥 Challenge angenommen</h2>
        <p>
          Fokussiere dich jetzt vollständig auf deine Aufgabe.<br><br>
          Kein Multitasking. Kein Scrollen.<br>
          Nur Fokus. Nur Umsetzung.
        </p>
      </div>
    </div>

  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  position: relative;
}

/* BACK */
.back {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  border: none;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  color: #6366f1;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* FILTER */
.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

/* WHEEL */
.wheel {
  width: 150px;
  height: 150px;
  margin: 40px auto;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  transition: transform 1s ease;
}

.spinning {
  transform: rotate(720deg);
}

/* BUTTON */
.spin-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background: #6366f1;
  color: white;
}

/* RESULT */
.result {
  margin-top: 30px;
  background: white;
  padding: 25px;
  border-radius: 16px;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.accept { background: #22c55e; color: white; padding: 10px; border-radius: 10px; border: none; }
.reject { background: #ef4444; color: white; padding: 10px; border-radius: 10px; border: none; }
.again { background: #6366f1; color: white; padding: 10px; border-radius: 10px; border: none; }

/* POPUP */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  padding: 30px;
  border-radius: 18px;
  max-width: 360px;
  text-align: center;
}
</style>