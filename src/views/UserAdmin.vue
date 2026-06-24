<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { getAccessTokenSilently } = useAuth0()

const users = ref([])
const errorMessage = ref('')
const showError = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')
const search = ref('')
const roleFilter = ref('')
const router = useRouter()

function goBack() {
  router.push('/admin')
}


const filteredUsers = computed(() => {
  const s = search.value.toLowerCase()

  return users.value.filter(u => {
    const matchesSearch =
      !s ||
      (u.name || '').toLowerCase().includes(s) ||
      (u.username || '').toLowerCase().includes(s) ||
      (u.email || '').toLowerCase().includes(s)

    const matchesRole =
      !roleFilter.value || u.role === roleFilter.value

    return matchesSearch && matchesRole
  })
})


async function loadUsers() {
  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://moodify-api'
      }
    })

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error()

    users.value = await res.json()

  } catch {
    errorMessage.value = 'Nutzer konnten nicht geladen werden.'
    showError.value = true
  }
}

async function updateUser(user) {
  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://moodify-api'
      }
    })

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        role: user.role
      })
    })

    console.log('STATUS:', res.status)
    console.log('RESPONSE:', await res.text())

    if (!res.ok) throw new Error()

  } catch (err) {
    console.error(err)
  }

  showSuccess.value = true

  await loadUsers()

  setTimeout(() => {
    showSuccess.value = false
  }, 1500)

}

async function deleteUser(id) {

  const token = await getAccessTokenSilently({
    authorizationParams: {
      audience: 'https://moodify-api'
    }
  })

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    errorMessage.value = 'Löschen fehlgeschlagen.'
    showError.value = true
    return
  }

  successMessage.value = 'Nutzer erfolgreich gelöscht ✔'
  showSuccess.value = true

  await loadUsers()

  setTimeout(() => {
    showSuccess.value = false
  }, 1500)
}




onMounted(loadUsers)
</script>

<template>
  <main class="page">

    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <h1>👤 Nutzer verwalten</h1>


    <div v-if="showError" class="modal error" @click="showError = false">
      {{ errorMessage }}
    </div>

    <div class="filters">
  <input
    v-model="search"
    placeholder="Suche nach Name, Username oder E-Mail..."
  />

  <select v-model="roleFilter">
    <option value="">Alle Rollen</option>
    <option value="USER">USER</option>
    <option value="ADMIN">ADMIN</option>
  </select>
  </div>

    <div class="user-list">
      <div v-for="u in filteredUsers" :key="u.id" class="user-card">

        <div class="field">
          <label>Name</label>
          <input v-model="u.name" />
        </div>

        <div class="field">
          <label>Username</label>
          <input v-model="u.username" />
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model="u.email" />
        </div>

        <div class="field">
          <label>Passwort</label>
          <input v-model="u.password" />
        </div>

        <div class="field">
          <label>Adresse</label>
          <input v-model="u.address" />
        </div>

        <div class="field">
          <label>Rolle</label>
          <select v-model="u.role">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button @click="updateUser(u)">
          Speichern
        </button>

        <button class="delete" @click="deleteUser(u.id)">
           Löschen
        </button>

      </div>
    </div>

    <div v-if="showSuccess" class="overlay">
  <div class="modal">
    <div class="icon">✔</div>
    <h2>Erfolgreich gespeichert</h2>
    <p>Die Benutzerdaten wurden aktualisiert.</p>
  </div>
</div>

  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 60px;
  background: linear-gradient(180deg, #f9fafb, #eef2ff);
}

h1 {
  margin-bottom: 30px;
  color: #111827;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.filters input {
  min-width: 320px;
}

.filters select {
  min-width: 160px;
}

.user-list {
  display: grid;
  gap: 20px;
}

.user-card {
  background: white;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.06);
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 12px;
  align-items: end;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

button {
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: #C3D0C2;
  cursor: pointer;
  font-weight: 600;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  width: 320px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.error {
  color: red;
}

.success {
  color: green;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  width: 320px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.icon {
  font-size: 42px;
  color: #22c55e;
  margin-bottom: 10px;
}

.delete {
  margin-left: 10px;
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.delete:hover {
  background: #dc2626;
}

.back {
  position: absolute;
  top: 111px;
  left: 28px;
  background: white;
  border: none;
  padding: 10px 16px;
  border-radius: 14px;
  color: #2f3a56;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  z-index: 1000;
}

.back:hover {
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .user-card {
    grid-template-columns: 1fr;
  }

  .page {
    padding: 30px;
  }

  .back{
    top: 115px;
  }
}
</style>