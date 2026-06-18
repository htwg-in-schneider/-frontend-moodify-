<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated, getAccessTokenSilently } = useAuth0()

/* FORM STATE */
const name = ref('')
const address = ref('')

/* UI STATE */
const showSuccess = ref(false)
const showError = ref(false)
const message = ref('')



/* =========================
   LOAD PROFILE FROM BACKEND
   ========================= */
async function loadProfile() {
  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api"
      }
    })

    const res = await fetch("http://localhost:8081/api/profile", {
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

  } catch (e) {
    console.error("LOAD ERROR:", e)
  }
}

/* =========================
   SAVE PROFILE
   ========================= */
async function saveProfile() {
  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api"
      }
    })

    const res = await fetch("http://localhost:8081/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name.value,
        address: address.value
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

    // 🔥 reload from backend (important!)
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

/* =========================
   INIT
   ========================= */
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

    <!-- SUCCESS -->
    <div v-if="showSuccess" class="overlay">
      <div class="modal">
        ✔ {{ message }}
      </div>
    </div>

    <!-- ERROR -->
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