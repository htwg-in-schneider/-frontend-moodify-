<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const route = useRoute()
const auth0 = useAuth0()

/* STATE */
const finished = ref(null)
const mood = ref('')
const review = ref('')

const showPopup = ref(false)
const popupMessage = ref('')

/* ID aus Wheel */
const challengeId = route.query.id

/* SUBMIT (FINAL + BACKEND + AUTH0) */
async function submit() {
  if (finished.value === null || !mood.value) return

  popupMessage.value = finished.value
    ? '🔥 Stark! Du hast die Challenge abgeschlossen. Weiter so!'
    : '💡 Kein Problem. Morgen ist eine neue Chance!'

  showPopup.value = true

  try {
    const token = await auth0.getAccessTokenSilently({
  authorizationParams: {
    audience: "https://moodify-api"
  }
})

console.log("challengeId:", challengeId)
console.log("token:", token)

    const res = await fetch('http://localhost:8081/api/user-challenges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    challengeId: challengeId.value,
    finished: finished.value,
    mood: mood.value,
    review: review.value
  })
})

    console.log('SAVE STATUS:', res.status)

  } catch (e) {
    console.error('SAVE ERROR:', e)
  }

  setTimeout(() => {
    showPopup.value = false
  }, 2500)
}

function goList() {
  router.push('/challenges/list')
}

function goHome() {
  router.push('/dashboard')
}
</script>

<template>
  <main class="page">

    <!-- POPUP -->
    <div v-if="showPopup" class="overlay">
      <div class="modal">
        <h2>✔ Status gespeichert</h2>
        <p>{{ popupMessage }}</p>
      </div>
    </div>

    <h1>🏁 Challenge abgeschlossen?</h1>
    <p class="subtitle">Reflektiere deine Erfahrung</p>

    <div class="card">
      <h2>Hast du die Challenge beendet?</h2>

      <div class="options">
        <button :class="{ active: finished === true }" @click="finished = true">Ja</button>
        <button :class="{ active: finished === false }" @click="finished = false">Nein</button>
      </div>
    </div>

    <div class="card">
      <h2>Wie fühlst du dich jetzt?</h2>

      <div class="options">
        <button :class="{ active: mood === 'besser' }" @click="mood = 'besser'">😊 Besser</button>
        <button :class="{ active: mood === 'gleich' }" @click="mood = 'gleich'">😐 Gleich</button>
        <button :class="{ active: mood === 'schlechter' }" @click="mood = 'schlechter'">😔 Schlechter</button>
      </div>
    </div>

    <div class="card">
      <h2>Kurzes Review</h2>
      <textarea v-model="review" placeholder="Wie war die Challenge? Was hast du gelernt?" />
    </div>

    <button class="submit" @click="submit">Speichern</button>
<button @click="$router.push('/challenge/tracker')">
  Meine Challenges
</button>

    <div class="links">
      <button @click="goList">📁 Alle Challenges</button>
      <button @click="goHome">🏠 Dashboard</button>
    </div>

  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
  font-family: sans-serif;
}

.subtitle {
  color: #666;
  margin-bottom: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  margin: 20px auto;
  max-width: 520px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.options {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: #e5e7eb;
}

button.active {
  background: #6366f1;
  color: white;
}

textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  border-radius: 12px;
  border: 1px solid #ddd;
  padding: 10px;
}

.submit {
  margin-top: 20px;
  background: #22c55e;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
}

.links {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.links button {
  background: white;
  border: 1px solid #ddd;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 16px;
  width: 320px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}
</style>