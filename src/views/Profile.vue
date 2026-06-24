<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated, getAccessTokenSilently } = useAuth0()


const name = ref('')
const address = ref('')
const username = ref('')
const email = ref('')
const password = ref('')


const showSuccess = ref(false)
const showError = ref(false)
const message = ref('')

async function loadProfile() {
  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api"
      }
    })

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.error("LOAD FAILED:", await res.text())
      return
    }

    const data = await res.json()

    name.value = data.name || ''
    address.value = data.address || ''
    username.value = data.username || ''
    email.value = data.email || ''
    password.value = data.password || ''

  } catch (e) {
    console.error("LOAD ERROR:", e)
  }
}

async function saveProfile() {
  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api"
      }
    })

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name.value,
        address: address.value,
        username: username.value,
        email: email.value,
        password: password.value

      })
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("SAVE FAILED:", err)

      message.value = "Speichern fehlgeschlagen"
      showError.value = true
      return
    }

    const data = await res.json()
    console.log("PROFILE SAVED:", data)

    message.value = "Profil erfolgreich gespeichert ✔"
    showSuccess.value = true

    await loadProfile()

    setTimeout(() => {
      showSuccess.value = false
    }, 1200)

  } catch (e) {
    console.error(e)
    message.value = "Fehler beim Speichern"
    showError.value = true
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    loadProfile()
  }
})
</script>

<template>
  <main class="page">

    <h1>Profil</h1>

    <div v-if="isAuthenticated">

  
      <div class="field">
        <label>Name</label>
        <input v-model="name" placeholder="Dein Name" />
      </div>

      <div class="field">
        <label>Nutzername</label>
        <input v-model="username" placeholder="Dein Nutzername" />
      </div>

      <div class="field">
        <label>E-Mail</label>
        <input v-model="email" placeholder="Deine E-Mail" />
      </div>

      <div class="field">
        <label>Passwort</label>
        <input v-model="password" placeholder="Dein Passwort" />
      </div>

      <div class="field">
        <label>Adresse</label>
        <input v-model="address" placeholder="Deine Adresse" />
      </div>

      <button class="btn" @click="saveProfile">
        Speichern
      </button>

    </div>

    <div v-else>
      <p>Nicht eingeloggt</p>
    </div>

    <div v-if="showSuccess" class="overlay">
      <div class="modal">
        ✔ {{ message }}
      </div>
    </div>

    <div v-if="showError" class="overlay">
      <div class="modal error">
        ✖ {{ message }}
      </div>
    </div>

  </main>
</template>

<style scoped>
.page {
  padding: 20px;
}

.field {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.btn {
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: #C3D0C2;
  cursor: pointer;
  margin-top: 10px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 15px;
}

.modal.error {
  color: red;
}
</style>