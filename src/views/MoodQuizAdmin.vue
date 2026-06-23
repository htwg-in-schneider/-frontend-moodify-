<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const questions = ref([])
const newQuestion = ref('')
const newAnswers = ref(['', '', '', ''])

const editingId = ref(null)
const editingText = ref('')
const editingAnswers = ref([])
const search = ref('')
const roleFilter = ref('')

const API = 'http://localhost:8081/api/moodquiz'

const { getAccessTokenSilently } = useAuth0()

async function getToken() {
  return await getAccessTokenSilently({
    authorizationParams: {
      audience: 'https://moodify-api'
    }
  })
}

async function loadQuestions() {
  const res = await fetch(API)

  if (!res.ok) {
    console.log('LOAD ERROR:', res.status)
    return
  }

  questions.value = await res.json()
}

const filteredQuestions = computed(() => {
  const s = search.value.toLowerCase()

  return questions.value.filter(q =>
    !s || (q.text || '').toLowerCase().includes(s)
  )
})

async function addQuestion() {
  const answers = newAnswers.value.filter(a => a.trim() !== '')

  if (!newQuestion.value.trim() || answers.length === 0) {
    alert('Bitte Frage und mindestens eine Antwort eingeben.')
    return
  }

  const token = await getToken()

  await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`

    },
    body: JSON.stringify({
      text: newQuestion.value,
      answers: answers
    })
  })

  newQuestion.value = ''
  newAnswers.value = ['', '', '', '']

  await loadQuestions()
}

function startEdit(q) {
  editingId.value = q.id
  editingText.value = q.text
  editingAnswers.value = [...(q.answers || [])]

  if (editingAnswers.value.length === 0) {
    editingAnswers.value = ['']
  }
}

async function saveEdit(id) {
  const answers = editingAnswers.value.filter(a => a.trim() !== '')

  if (!editingText.value.trim() || answers.length === 0) {
    alert('Bitte Frage und mindestens eine Antwort eingeben.')
    return
  }

  const token = await getToken()

  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      text: editingText.value,
      answers: answers
    })
  })

  editingId.value = null
  editingText.value = ''
  editingAnswers.value = []

  await loadQuestions()
}

async function deleteQuestion(id) {
  const token = await getToken()

  await fetch(`${API}/${id}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`
    }
  })

  await loadQuestions()
}

function addAnswerField() {
  newAnswers.value.push('')
}

function removeAnswerField(index) {
  newAnswers.value.splice(index, 1)
}

function addEditAnswerField() {
  editingAnswers.value.push('')
}

function removeEditAnswerField(index) {
  editingAnswers.value.splice(index, 1)
}

function cancelEdit() {
  editingId.value = null
  editingText.value = ''
  editingAnswers.value = []
}

onMounted(loadQuestions)
</script>

<template>
  <main class="admin">
    <header>
      <h1>🧠 Mood Quiz Admin</h1>
      <p>Fragen und Antworten verwalten</p>
    </header>


    <section class="create-box">
      <h2>Neue Frage erstellen</h2>

      <input
        v-model="newQuestion"
        placeholder="Neue Frage..."
      />

      <h3>Antworten</h3>

      <div
        v-for="(answer, index) in newAnswers"
        :key="index"
        class="answer-row"
      >
        <input
          v-model="newAnswers[index]"
          placeholder="Antwort..."
        />

        <button
          v-if="newAnswers.length > 1"
          class="small danger"
          @click="removeAnswerField(index)"
        >
          ✕
        </button>
      </div>

      <button @click="addAnswerField">
        + Antwort hinzufügen
      </button>

      <button class="save" @click="addQuestion">
        + Frage speichern
      </button>
    </section>

        <div class="search-box">
      <input
    v-model="search"
    placeholder="Suche nach Fragen..."
    />
    </div>

    <section class="list">
      <div
        v-for="q in filteredQuestions"
        :key="q.id"
        class="card"
      >
        <div v-if="editingId === q.id">
          <input v-model="editingText" />

          <h3>Antworten bearbeiten</h3>

          <div
            v-for="(answer, index) in editingAnswers"
            :key="index"
            class="answer-row"
          >
            <input v-model="editingAnswers[index]" />

            <button
              v-if="editingAnswers.length > 1"
              class="small danger"
              @click="removeEditAnswerField(index)"
            >
              ✕
            </button>
          </div>

          <button @click="addEditAnswerField">
            + Antwort
          </button>

          <button class="save" @click="saveEdit(q.id)">
            Speichern
          </button>

          <button @click="cancelEdit">
            Abbrechen
          </button>
        </div>

        <div v-else>
          <h2>{{ q.text }}</h2>

          <ul>
            <li v-for="a in q.answers" :key="a">
              {{ a }}
            </li>
          </ul>

          <button @click="startEdit(q)">
            Bearbeiten
          </button>

          <button class="danger" @click="deleteQuestion(q.id)">
            Löschen
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.admin {
  max-width: 900px;
  margin: auto;
  padding: 40px;
}

header {
  margin-bottom: 25px;
}

.create-box,
.card {
  background: #f8fafc;
  padding: 22px;
  border-radius: 16px;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.answer-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

button {
  padding: 10px 14px;
  margin-right: 8px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.save {
  background: #C3D0C2;
  font-weight: 700;
}

.danger {
  background: red;
  color: white;
}

.small {
  width: 45px;
  padding: 10px;
}

ul {
  margin: 12px 0;
}

.search-box {
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
}
</style>