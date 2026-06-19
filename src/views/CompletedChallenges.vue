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


const challengeId = Number(route.query.id)


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
      <h2>Hast du die Challenge abgeschlossen?</h2>

      <button @click="finished = true" :class="{ active: finished === true }">
        Ja
      </button>

      <button @click="finished = false" :class="{ active: finished === false }">
        Nein
      </button>
    </div>

    <div class="card">
      <h2>Wie fühlst du dich jetzt?</h2>

      <button @click="mood = 'besser'" :class="{ active: mood === 'besser' }">besser😊</button>
      <button @click="mood = 'gleich'" :class="{ active: mood === 'gleich' }">gleich😐</button>
      <button @click="mood = 'schlechter'" :class="{ active: mood === 'schlechter' }">schlechter😔</button>
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
<style scoped>
.page {
  min-height: 100vh;
  padding: 50px 20px;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 38px;
  font-weight: 800;
  color: #312e81;
  margin-bottom: 30px;
}

.card {
  width: 100%;
  max-width: 600px;

  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);

  padding: 24px;
  margin-bottom: 20px;

  border-radius: 24px;

  box-shadow:
    0 10px 30px rgba(99, 102, 241, 0.08),
    0 2px 10px rgba(0, 0, 0, 0.05);

  transition: all 0.25s ease;
}

.card:hover {
  transform: translateY(-3px);
}

.card h2 {
  margin-bottom: 18px;
  color: #111827;
  font-size: 20px;
}

button {
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Auswahl Buttons */
.card button {
  padding: 12px 18px;
  margin-right: 10px;
  margin-top: 5px;

  border-radius: 14px;

  background: #f1f5f9;
  color: #334155;

  font-weight: 600;
}

.card button:hover {
  transform: translateY(-2px);
}

.active {
  background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
  color: white !important;
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.25);
}

/* Review Feld */
textarea {
  width: 100%;
  min-height: 140px;

  padding: 16px;

  border-radius: 16px;
  border: 1px solid #e2e8f0;

  resize: vertical;

  font-size: 15px;

  outline: none;
  transition: 0.2s;
}

textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

/* Speichern Button */
.submit {
  margin-top: 15px;

  padding: 16px 40px;

  border-radius: 16px;

  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;

  font-size: 16px;
  font-weight: 700;

  box-shadow: 0 12px 25px rgba(99, 102, 241, 0.25);
}

.submit:hover {
  transform: translateY(-2px);
}

.submit:active {
  transform: scale(0.98);
}

/* Popup */
.overlay {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(4px);
}

.modal {
  background: white;

  width: 90%;
  max-width: 420px;

  padding: 30px;

  border-radius: 24px;

  text-align: center;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);

  animation: pop 0.25s ease;
}

.modal h2 {
  color: #16a34a;
  margin-bottom: 12px;
}

.modal p {
  color: #475569;
  line-height: 1.6;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>