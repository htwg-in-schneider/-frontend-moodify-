<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const { getAccessTokenSilently } = useAuth0()

const affirmations = ref([])
const newText = ref('')

const editingId = ref(null)
const editingText = ref('')
const router = useRouter()

function goBack() {
  router.push('/admin')
}

async function loadAffirmations() {
  try {
    const token = await getAccessTokenSilently()

    const res = await fetch('http://localhost:8081/api/affirmations', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    affirmations.value = Array.isArray(data) ? data : data?.data || []

  } catch (err) {
    console.error('LOAD ERROR:', err)
    affirmations.value = []
  }
}


async function addAffirmation() {
  if (!newText.value.trim()) return

  const token = await getAccessTokenSilently()

  await fetch('http://localhost:8081/api/affirmations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text: newText.value })
  })

  newText.value = ''
  loadAffirmations()
}


async function deleteAffirmation(id) {
  const token = await getAccessTokenSilently()

  await fetch(`http://localhost:8081/api/affirmations/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  loadAffirmations()
}


function startEdit(a) {
  editingId.value = a.id || a._id
  editingText.value = a.text
}


async function saveEdit(id) {
  const token = await getAccessTokenSilently()

  await fetch(`http://localhost:8081/api/affirmations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text: editingText.value })
  })

  editingId.value = null
  editingText.value = ''
  loadAffirmations()
}

onMounted(loadAffirmations)
</script>

<template>
  <main class="admin">

    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <h1>💗 Affirmations Admin</h1>
    <p class="sub">Add, edit & delete daily affirmations</p>

  
    <div class="add-box">
      <input
        v-model="newText"
        placeholder="Neue Affirmation..."
      />
      <button @click="addAffirmation">+ Add</button>
    </div>


    <div class="list">

      <div
        v-for="a in affirmations"
        :key="a.id || a._id"
        class="card"
      >

      
        <div v-if="editingId === (a.id || a._id)">
          <input v-model="editingText" />
          <div class="actions">
            <button @click="saveEdit(a.id || a._id)">Save</button>
            <button class="delete" @click="editingId = null">Cancel</button>
          </div>
        </div>

     
        <div v-else class="row">
          <p>{{ a.text }}</p>

          <div class="actions">
            <button @click="startEdit(a)">Edit</button>
            <button class="delete" @click="deleteAffirmation(a.id || a._id)">
              Delete
            </button>
          </div>
        </div>

      </div>

    </div>

  </main>
</template>

<style scoped>
.admin {
  max-width: 900px;
  margin: auto;
  padding: 40px;
}

h1 {
  font-size: 32px;
  margin-bottom: 5px;
}

.sub {
  color: #6b7280;
  margin-bottom: 20px;
}

.add-box {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: #4f46e5;
  color: white;
  font-weight: 600;
}


.list {
  display: grid;
  gap: 12px;
}

.card {
  background: #f9fafb;
  padding: 14px;
  border-radius: 12px;
}


.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.actions {
  display: flex;
  gap: 8px;
}

.delete {
  background: #ef4444;
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
</style>