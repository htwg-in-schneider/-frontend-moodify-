<template>
  <main class="page">


    <div v-if="showSuccess" class="overlay">
      <div class="modal">
        <div class="icon">✔</div>
        <h2>Gespeichert!</h2>
        <p>Deine Änderungen wurden übernommen</p>
      </div>
    </div>


    <div v-if="showError" class="overlay" @click="showError = false">
      <div class="modal error">
        <div class="icon">✖</div>
        <h2>Fehler</h2>
        <p>{{ errorMessage }}</p>
      </div>
    </div>

    <div class="form-wrapper">

      <header class="header">
        <h1>✏️ Challenge bearbeiten</h1>
        <p>Ändere deine bestehende Aufgabe</p>
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

        <button class="btn" @click="updateChallenge" :disabled="loading">
          {{ loading ? 'Speichern...' : 'Änderungen speichern' }}
        </button>

      </section>

    </div>

  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const route = useRoute()

const auth0 = useAuth0()

const id = route.params.id

const title = ref('')
const description = ref('')
const category = ref('')
const difficulty = ref('')

const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const loading = ref(false)


async function loadChallenge() {
  try {
    const res = await fetch(`http://localhost:8081/api/challenge/${id}`)
    if (!res.ok) throw new Error()

    const data = await res.json()

    title.value = data.title
    description.value = data.description
    category.value = data.category
    difficulty.value = data.difficulty

  } catch {
    errorMessage.value = 'Challenge konnte nicht geladen werden.'
    showError.value = true
  }
}

onMounted(loadChallenge)


async function updateChallenge() {

  if (!title.value.trim() || !description.value.trim()) {
    errorMessage.value = 'Titel und Beschreibung dürfen nicht leer sein.'
    showError.value = true
    return
  }

  loading.value = true

  try {
    const token = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://moodify-api'
      }
    })

    const res = await fetch(`http://localhost:8081/api/challenge/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        category: category.value,
        difficulty: difficulty.value
      })
    })

    if (!res.ok) {
      console.error('Speichern fehlgeschlagen:', res.status, await res.text())

      if (res.status === 401) {
        errorMessage.value = 'Du bist nicht eingeloggt oder dein Login ist abgelaufen.'
      } else if (res.status === 403) {
        errorMessage.value = 'Du hast keine Admin-Rechte.'
      } else {
        errorMessage.value = 'Speichern fehlgeschlagen.'
      }

      showError.value = true
      return
    }

    showSuccess.value = true

    setTimeout(() => {
      showSuccess.value = false
      router.push('/challenges/admin')
    }, 1200)

  } catch (err) {
    console.error('SAVE ERROR:', err)
    errorMessage.value = 'Server nicht erreichbar.'
    showError.value = true
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 90px;
  background: linear-gradient(180deg, #f5f7fb 0%, #eef2ff 100%);
}

.form-wrapper {
  width: 100%;
  max-width: 640px;
}

.header {
  margin-bottom: 28px;
}

.header h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
}

.header p {
  margin: 6px 0 0;
  color: #6b7280;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

input,
textarea,
select {
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.btn {
  margin-top: 8px;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #C3D0C2;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
}

/* MODAL */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  width: 320px;
}

.modal.error .icon {
  color: #e74c3c;
}

.icon {
  font-size: 40px;
  color: green;
  margin-bottom: 10px;
}
</style>