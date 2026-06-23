<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

const showSuccess = ref(false)
const showError = ref(false)

function sendMessage() {
  if (!name.value || !email.value || !subject.value || !message.value) {
    showError.value = true
    return
  }

  showError.value = false
  showSuccess.value = true

  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''

  setTimeout(() => {
    showSuccess.value = false
  }, 1800)
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <main class="contact-page">

    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <section class="contact-card">

      <div class="header">
        <div class="emoji">📩</div>
        <h1>Contact Us</h1>
        <p>
          Hast du Fragen, Feedback oder Ideen zu Moodify?
          Schreib uns gerne eine Nachricht.
        </p>
      </div>

      <div class="form">

        <div class="field">
          <label>Name</label>
          <input v-model="name" placeholder="Dein Name" />
        </div>

        <div class="field">
          <label>E-Mail</label>
          <input v-model="email" type="email" placeholder="deine@email.de" />
        </div>

        <div class="field">
          <label>Betreff</label>
          <input v-model="subject" placeholder="Worum geht es?" />
        </div>

        <div class="field">
          <label>Nachricht</label>
          <textarea
            v-model="message"
            rows="6"
            placeholder="Schreibe deine Nachricht..."
          ></textarea>
        </div>

        <button class="send" @click="sendMessage">
          Nachricht senden ✨
        </button>

      </div>

    </section>

    <div v-if="showSuccess" class="overlay">
      <div class="modal">
        <div class="icon success">✔</div>
        <h2>Vielen Dank!</h2>
        <p>Deine Nachricht wurde erfolgreich übermittelt.</p>
      </div>
    </div>

    <div v-if="showError" class="overlay" @click="showError = false">
      <div class="modal">
        <div class="icon error">✖</div>
        <h2>Fehlende Angaben</h2>
        <p>Bitte fülle alle Felder aus.</p>
      </div>
    </div>

  </main>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  padding: 70px 24px;
  background: radial-gradient(circle at top, #fdf2f8, #eef2ff 45%, #ffffff);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.back {
  position: absolute;
  top: 28px;
  left: 28px;
  background: white;
  border: none;
  padding: 10px 16px;
  border-radius: 14px;
  color: #2f3a56;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}

.contact-card {
  width: 100%;
  max-width: 760px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(14px);
  padding: 42px;
  border-radius: 30px;
  box-shadow: 0 25px 70px rgba(0,0,0,0.1);
}

.header {
  text-align: center;
  margin-bottom: 34px;
}

.emoji {
  font-size: 54px;
  margin-bottom: 8px;
}

h1 {
  font-size: 42px;
  color: #2f3a56;
  margin-bottom: 12px;
}

.header p {
  color: #6b7280;
  line-height: 1.7;
  max-width: 540px;
  margin: auto;
}

.form {
  display: grid;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 700;
  color: #2f3a56;
}

input,
textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  font-size: 15px;
  outline: none;
  background: white;
  color: #111827;
}

input:focus,
textarea:focus {
  border-color: #C3D0C2;
  box-shadow: 0 0 0 4px rgba(195,208,194,0.35);
}

textarea {
  resize: vertical;
}

.send {
  margin-top: 8px;
  padding: 15px;
  border: none;
  border-radius: 18px;
  background: #C3D0C2;
  color: #2f3a56;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 14px 35px rgba(0,0,0,0.08);
}

.send:hover {
  transform: translateY(-2px);
  background: #b5c5b4;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  width: 330px;
  background: white;
  padding: 30px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 25px 70px rgba(0,0,0,0.18);
}

.icon {
  font-size: 42px;
  margin-bottom: 10px;
}

.success {
  color: #22c55e;
}

.error {
  color: #ef4444;
}

.modal h2 {
  color: #2f3a56;
  margin-bottom: 8px;
}

.modal p {
  color: #6b7280;
}

@media (max-width: 700px) {
  .contact-card {
    padding: 28px;
  }

  h1 {
    font-size: 32px;
  }

  .back {
    position: static;
    margin-bottom: 20px;
  }

  .contact-page {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>