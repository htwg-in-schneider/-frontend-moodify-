<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

const title = ref('')
const description = ref('')
const category = ref('MOTIVATION')
const difficulty = ref('EASY')

const showModal = ref(false)
const errorModal = ref(false)
const errorMessage = ref('')


function goBack() {
  router.push('/challenges')
}

async function createChallenge() {

  if (
    !title.value.trim() ||
    !description.value.trim() ||
    !category.value ||
    !difficulty.value
  ) {
    errorMessage.value = 'Bitte fülle alle Felder aus.'
    errorModal.value = true
    return
  }

  try {
    const token = await getAccessTokenSilently({
  authorizationParams: {
    audience: 'https://moodify-api'
  }
})

    const res = await fetch('http://localhost:8081/api/challenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        category: category.value,
        difficulty: difficulty.value
      })
    })

    if (!res.ok) {
      const msg = await res.text()
      console.log('Backend Error:', msg)

      errorMessage.value = msg || 'Fehler beim Speichern der Challenge.'
      errorModal.value = true
      return
    }

    showModal.value = true

    setTimeout(() => {
      showModal.value = false
      router.push('/challenges')
    }, 1200)

  } catch (err) {
    console.error(err)
    errorMessage.value = 'Server nicht erreichbar.'
    errorModal.value = true
  }
}
</script>

<template>
  <main class="page">

    
    <button class="back-btn" @click="goBack">
      ← Zurück
    </button>

    
    <div v-if="showModal" class="overlay">
      <div class="modal">
        <div class="icon">✔</div>
        <h2>Challenge erstellt!</h2>
        <p>Deine Challenge wurde erfolgreich gespeichert</p>
      </div>
    </div>

    
    <div v-if="errorModal" class="overlay" @click="errorModal = false">
      <div class="modal error">
        <div class="icon">✖</div>
        <h2>Fehler</h2>
        <p>{{ errorMessage }}</p>
      </div>
    </div>

    
    <div class="form-wrapper">

      <header class="header">
        <h1>✨ Neue Challenge</h1>
        <p>Erstelle eine neue Aufgabe für dein System</p>
      </header>

      <section class="form">

        <div class="field">
          <label>Titel</label>
          <input v-model="title" />
        </div>

        <div class="field">
          <label>Beschreibung</label>
          <textarea v-model="description" rows="4"></textarea>
        </div>

        <div class="row">

          <div class="field">
            <label>Kategorie</label>
            <select v-model="category">
              <option value="MOTIVATION">Motivation</option>
              <option value="ENTSPANNUNG">Entspannung</option>
              <option value="FOKUS">Fokus</option>
              <option value="ABLENKUNG">Ablenkung</option>
            </select>
          </div>

          <div class="field">
            <label>Schwierigkeit</label>
            <select v-model="difficulty">
              <option value="EASY">Easy</option>
              <option value="MITTEL">Mittel</option>
              <option value="SCHWER">Schwer</option>
            </select>
          </div>

        </div>

        <button class="btn" @click="createChallenge">
          Challenge erstellen
        </button>

      </section>

    </div>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 20px;
  position: relative;
}


.back-btn {
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

.back-btn:hover {
  text-decoration: underline;
}

.form-wrapper {
  width: 100%;
  max-width: 700px;
  padding: 40px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

.header {
  text-align: center;
  margin-bottom: 25px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

input, textarea, select {
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.btn {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #C3D0C2;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  width: 320px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  animation: pop 0.2s ease;
}

.modal.error .icon {
  color: #e74c3c;
}

.icon {
  font-size: 40px;
  color: green;
  margin-bottom: 10px;
}



@keyframes pop {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>