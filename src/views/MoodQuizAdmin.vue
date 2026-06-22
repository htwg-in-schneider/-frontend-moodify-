<script setup>
import { ref, onMounted } from 'vue'

const questions = ref([])
const newQuestion = ref('')
const loading = ref(false)
const error = ref(null)

const editingId = ref(null)
const editingText = ref('')

const API = 'http://localhost:8081/api/moodquiz'


async function loadQuestions() {
  loading.value = true
  error.value = null

  try {
    const res = await fetch(API)

    if (!res.ok) throw new Error(`API Error: ${res.status}`)

    questions.value = await res.json()
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

/* CREATE */
async function addQuestion() {
  if (!newQuestion.value.trim()) return

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newQuestion.value })
  })

  newQuestion.value = ''
  loadQuestions()
}

/* DELETE */
async function deleteQuestion(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  })

  loadQuestions()
}

/* EDIT */
function startEdit(q) {
  editingId.value = q.id
  editingText.value = q.text
}

async function saveEdit(id) {
  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: editingText.value })
  })

  editingId.value = null
  editingText.value = ''
  loadQuestions()
}

function cancelEdit() {
  editingId.value = null
  editingText.value = ''
}

onMounted(loadQuestions)
</script>

<template>
  <main class="admin">

    <header>
      <h1>🧠 Mood Quiz Admin</h1>
      <p>Fragen verwalten (Create / Edit / Delete)</p>
    </header>

    
    <div v-if="loading">Loading...</div>

    
    <div v-if="error" class="error">
      {{ error }}
    </div>

    
    <div class="create">
      <input v-model="newQuestion" placeholder="Neue Frage..." />
      <button @click="addQuestion">+ Add</button>
    </div>

    
    <div v-if="!loading && questions.length === 0">
      Keine Fragen vorhanden.
    </div>

    
    <div class="list">
      <div v-for="q in questions" :key="q.id" class="card">

        <div v-if="editingId === q.id">
          <input v-model="editingText" />
          <button @click="saveEdit(q.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>

        <div v-else class="row">
          <p>{{ q.text }}</p>

          <div class="actions">
            <button @click="startEdit(q)">Edit</button>
            <button class="danger" @click="deleteQuestion(q.id)">Delete</button>
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

header {
  margin-bottom: 20px;
}

.create {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
}

button {
  padding: 10px 14px;
  cursor: pointer;
}

.list {
  display: grid;
  gap: 12px;
}

.card {
  padding: 12px;
  background: #f4f4f4;
  border-radius: 10px;
}

.row {
  display: flex;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 8px;
}

.danger {
  background: red;
  color: white;
}

.error {
  color: red;
}
</style>