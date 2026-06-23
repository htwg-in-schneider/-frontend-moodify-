<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

const boards = ref([])
const search = ref('')
const category = ref('')

async function getToken() {
  return await getAccessTokenSilently({
    authorizationParams: {
      audience: 'https://moodify-api'
    }
  })
}

async function loadBoards() {
  const token = await getToken()

  const res = await fetch('http://localhost:8081/api/visionboard', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    console.log('LOAD BOARDS ERROR:', res.status, await res.text())
    return
  }

  boards.value = await res.json()
}

const filteredBoards = computed(() => {
  return boards.value.filter(b => {
    const title = (b.title || '').toLowerCase()
    const matchesSearch = title.includes(search.value.toLowerCase())
    const matchesCategory = !category.value || b.category === category.value

    return matchesSearch && matchesCategory
  })
})

async function deleteBoard(id) {
  const token = await getToken()

  const res = await fetch(`http://localhost:8081/api/visionboard/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.ok) {
    await loadBoards()
  }
}

function goBack() {
  router.push('/')
}

onMounted(loadBoards)
</script>

<template>
  <main class="page">

    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <h1>🌈 Visionboards</h1>

    <button class="create" @click="router.push('/visionboard/create')">
      + Neues Visionboard
    </button>

    <div class="filters">
      <input v-model="search" placeholder="Suche nach Visionboard..." />

      <select v-model="category">
        <option value="">Alle Kategorien</option>
        <option value="MOTIVATION">Motivation</option>
        <option value="ENTSPANNUNG">Entspannung</option>
        <option value="FOKUS">Fokus</option>
        <option value="ABLENKUNG">Ablenkung</option>
      </select>
    </div>

    <div class="grid">
      <div
        v-for="b in filteredBoards"
        :key="b.id || b.ID"
        class="card"
        @click="router.push(`/visionboard/${b.id || b.ID}`)"
      >
        <h2>{{ b.title }}</h2>
        <p>Kategorie: {{ b.category }}</p>

        <div class="preview">
          <img
            v-for="img in b.images"
            :key="img.id"
            :src="img.imageUrl"
          />
        </div>

        <div class="actions">
          <button @click.stop="router.push(`/visionboard/${b.id || b.ID}/edit`)">
            Bearbeiten
          </button>

          <button class="delete" @click.stop="deleteBoard(b.id || b.ID)">
            Löschen
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page {
  padding: 40px;
}

.create {
  background: #C3D0C2;
  padding: 12px 18px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

input,
select {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 22px;
  border-radius: 22px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.07);
  cursor: pointer;
}

.preview {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
}

.preview img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 12px;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 8px 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: #eef2ff;
}

.delete {
  background: #ffcccc !important;
}

.back {
  position: absolute;
  top: 110px;
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