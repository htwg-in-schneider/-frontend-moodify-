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

/* ✅ FIX: challengeId aus URL */
const challengeId = Number(route.query.id)

/* DEBUG (wichtig beim Testen) */
console.log("challengeId:", challengeId)

if (!challengeId) {
  console.error("❌ NO CHALLENGE ID IN URL")
}

/* SUBMIT */
async function submit() {
  if (finished.value === null || !mood.value) return

  popupMessage.value = finished.value
    ? '🔥 Stark! Du hast die Challenge abgeschlossen!'
    : '💡 Kein Problem – nächster Versuch!'

  showPopup.value = true

  try {
    const token = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api"
      }
    })

    const res = await fetch('http://localhost:8081/api/user-challenges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        challengeId: challengeId,
        finished: finished.value,
        mood: mood.value,
        review: review.value
      })
    })

    console.log("SAVE STATUS:", res.status)

  } catch (e) {
    console.error("SAVE ERROR:", e)
  }

  setTimeout(() => {
    showPopup.value = false
    router.push('/challenge/tracker')
  }, 2000)
}
</script>

<template>
  <main class="page">

    <h1>🏁 Challenge Status</h1>

    <div class="card">
      <h2>Abgeschlossen?</h2>

      <button @click="finished = true" :class="{ active: finished === true }">
        Ja
      </button>

      <button @click="finished = false" :class="{ active: finished === false }">
        Nein
      </button>
    </div>

    <div class="card">
      <h2>Mood</h2>

      <button @click="mood = 'besser'" :class="{ active: mood === 'besser' }">😊</button>
      <button @click="mood = 'gleich'" :class="{ active: mood === 'gleich' }">😐</button>
      <button @click="mood = 'schlechter'" :class="{ active: mood === 'schlechter' }">😔</button>
    </div>

    <div class="card">
      <h2>Review</h2>
      <textarea v-model="review" />
    </div>

    <button class="submit" @click="submit">
      Speichern
    </button>

    <!-- POPUP -->
    <div v-if="showPopup" class="overlay">
      <div class="modal">
        <h2>✔ Gespeichert</h2>
        <p>{{ popupMessage }}</p>
      </div>
    </div>

  </main>
</template>