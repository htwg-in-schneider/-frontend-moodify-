<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()

const challenges = ref([])

const auth0 = useAuth0()
const search = ref('')
const categoryFilter = ref('')

function goBack() {
  router.push('/admin')
}

async function loadChallenges() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/challenge`)
  challenges.value = await res.json()
}

const filteredChallenges = computed(() => {
  const s = search.value.toLowerCase()

  return challenges.value.filter(c => {
    const matchesSearch =
      !s ||
      (c.title || '').toLowerCase().includes(s) ||
      (c.description || '').toLowerCase().includes(s)

    const matchesCategory =
      !categoryFilter.value || c.category === categoryFilter.value

    return matchesSearch && matchesCategory
  })
})


async function deleteChallenge(id) {
  try {
    const token = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://moodify-api'
      }
    })

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/challenge/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.error('Delete fehlgeschlagen:', res.status, await res.text())
      return
    }

    await loadChallenges()
  } catch (err) {
    console.error('DELETE ERROR:', err)
  }
}


function editChallenge(id) {
  router.push(`/challenges/${id}/edit`)
}

onMounted(loadChallenges)
</script>

<template>
  <main class="admin">

    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <h1>Admin Panel 🛠️</h1>

    <p>Hier kannst du alles verwalten</p>

    <div class="filters">
  <input
    v-model="search"
    placeholder="Suche nach Titel oder Beschreibung..."
  />

  <select v-model="categoryFilter">
    <option value="">Alle Kategorien</option>
    <option value="MOTIVATION">Motivation</option>
    <option value="ENTSPANNUNG">Entspannung</option>
    <option value="FOKUS">Fokus</option>
    <option value="ABLENKUNG">Ablenkung</option>
  </select>
</div>

    <div class="list">

      <div v-for="c in filteredChallenges" :key="c.id" class="card">

        <h3>{{ c.title }}</h3>
        <p>{{ c.description }}</p>
        <p>Kategorie: {{ c.category }}</p>
        <p>Schwierigkeit: {{ c.difficulty }}</p>

       <button class="edit" @click="editChallenge(c.id)">
          Edit
       </button>

        <button class="delete" @click="deleteChallenge(c.id)">
          Delete
        </button>

      </div>

    </div>

  </main>
</template>

<style scoped>
.admin {
  padding: 40px;
}

.list {
  display: grid;
  gap: 15px;
  margin-top: 20px;
}

.card {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 10px;
}

.edit {
  margin-right: 10px;
}

.delete {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.filters {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}

.filters input,
.filters select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.filters input {
  min-width: 320px;
}

.back {
  position: absolute;
  top: 112px;
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
