<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* STATE */
const finished = ref(null)
const mood = ref('')

const showPopup = ref(false)
const message = ref('')

function goBack() {
  router.push('/challenges')
}

function submitStatus() {
  if (finished.value === null || !mood.value) return

  // 👉 Hier später Backend Save möglich
  console.log('STATUS:', {
    finished: finished.value,
    mood: mood.value
  })

  message.value = finished.value
    ? '🔥 Stark! Du hast deine Challenge durchgezogen!'
    : '💡 Kein Problem — morgen neuer Versuch!'

  showPopup.value = true

  setTimeout(() => {
    showPopup.value = false
    router.push('/challenges/list') // nicer Flow
  }, 2000)
}

function goToFinished() {
  router.push('/challenges/list')
}
</script>

<template>
  <main class="page">

    <!-- BACK -->
    <button class="back" @click="goBack">← Zurück</button>

    <!-- POPUP -->
    <div v-if="showPopup" class="overlay">
      <div class="modal">
        <h2>✔ Status gespeichert</h2>
        <p>{{ message }}</p>
      </div>
    </div>

    <h1>🧠 Challenge Status</h1>
    <p class="subtitle">Reflektiere deine Aufgabe</p>

    <!-- DONE -->
    <div class="card">
      <h2>Hast du deine Challenge beendet?</h2>

      <div class="options">
        <button
          :class="{ active: finished === true }"
          @click="finished = true"
        >
          Ja
        </button>

        <button
          :class="{ active: finished === false }"
          @click="finished = false"
        >
          Nein
        </button>
      </div>
    </div>

    <!-- LINK -->
    <button class="link" @click="goToFinished">
      📁 Alle Challenges ansehen
    </button>

    <!-- MOOD -->
    <div class="card">
      <h2>Wie fühlst du dich jetzt?</h2>

      <div class="options">
        <button :class="{ active: mood === 'schlechter' }" @click="mood = 'schlechter'">
          😔 Schlechter
        </button>

        <button :class="{ active: mood === 'gleich' }" @click="mood = 'gleich'">
          😐 Gleich
        </button>

        <button :class="{ active: mood === 'besser' }" @click="mood = 'besser'">
          😊 Besser
        </button>
      </div>
    </div>

    <!-- SUBMIT -->
    <button
      class="submit"
      @click="submitStatus"
      :disabled="finished === null || !mood"
    >
      Speichern
    </button>

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

/* BACK */
.back {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #6366f1;
  cursor: pointer;
}

/* TEXT */
.subtitle {
  color: #666;
  margin-bottom: 20px;
}

/* CARD */
.card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  margin: 20px auto;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.options {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

/* BUTTONS */
button {
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: #e5e7eb;
  transition: 0.2s;
}

button.active {
  background: #6366f1;
  color: white;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* LINK */
.link {
  margin-top: 10px;
  background: none;
  color: #6366f1;
  text-decoration: underline;
}

/* SUBMIT */
.submit {
  margin-top: 20px;
  background: #22c55e;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
}

/* POPUP */
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
  width: 300px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}
</style>