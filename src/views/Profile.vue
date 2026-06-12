<script setup>
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { user, isAuthenticated } = useAuth0()

/* EDITABLE FIELDS */
const name = ref(user.value?.name || '')
const address = ref(user.value?.address || '')

/* MODAL */
const showSuccess = ref(false)
const showError = ref(false)
const message = ref('')

/* SAVE */
function saveProfile() {
  try {
    console.log('Profil gespeichert:', {
      name: name.value,
      address: address.value
    })

    message.value = 'Profil erfolgreich gespeichert ✔'
    showSuccess.value = true

    setTimeout(() => {
      showSuccess.value = false
    }, 1200)

  } catch (e) {
    message.value = 'Fehler beim Speichern'
    showError.value = true
  }
}
</script>

<template>
  <main class="page">

    <h1>Profile</h1>

    <div v-if="isAuthenticated && user">

      <img v-if="user.picture" :src="user.picture" class="avatar" />

      <!-- EDIT FIELDS -->
      <div class="field">
        <label>Name</label>
        <input v-model="name" />
      </div>

      <div class="field">
        <label>Adresse</label>
        <input v-model="address" placeholder="Deine Adresse" />
      </div>

      <button class="btn" @click="saveProfile">
        Speichern
      </button>

      <hr />

      <h3>Debug</h3>
      <pre>{{ user }}</pre>

    </div>

    <div v-else>
      <p>Nicht eingeloggt</p>
    </div>

    <!-- SUCCESS MODAL -->
    <div v-if="showSuccess" class="overlay">
      <div class="modal">
        <div class="icon">✔</div>
        <p>{{ message }}</p>
      </div>
    </div>

    <!-- ERROR MODAL -->
    <div v-if="showError" class="overlay">
      <div class="modal error">
        <div class="icon">✖</div>
        <p>{{ message }}</p>
      </div>
    </div>

  </main>
</template>

<style scoped>
.page {
  padding: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.field {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.btn {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 12px;
  background: #C3D0C2;
  cursor: pointer;
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
  padding: 20px;
  border-radius: 20px;
  text-align: center;
}

.modal.error .icon {
  color: red;
}

.icon {
  font-size: 30px;
}
</style>