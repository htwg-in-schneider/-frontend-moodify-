<script setup>
import { ref, onMounted, computed  } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const { getAccessTokenSilently } = useAuth0()
const boards = ref([])
const search = ref('')
const categoryFilter = ref('')
const router = useRouter()

function goBack() {
  router.push('/admin')
}

async function getToken() {
  return await getAccessTokenSilently({
    authorizationParams: {
      audience: 'https://moodify-api'
    }
  })
}

const filteredBoards = computed(() => {
  const s = search.value.toLowerCase()

  return boards.value.filter(b => {
    const userText =
      b.user?.username ||
      b.user?.email ||
      ''

    const matchesSearch =
      !s ||
      (b.title || '').toLowerCase().includes(s) ||
      userText.toLowerCase().includes(s)

    const matchesCategory =
      !categoryFilter.value || b.category === categoryFilter.value

    return matchesSearch && matchesCategory
  })
})

async function loadBoards() {
  const token = await getToken()

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/visionboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    console.log('LOAD ERROR:', res.status, await res.text())
    return
  }

  boards.value = await res.json()
}

async function deleteBoard(id) {
  const token = await getToken()

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/visionboard/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.ok) {
    await loadBoards()
  }
}

onMounted(loadBoards)
</script>

<template>
  <main class="page">

    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <h1>🌈 Visionboards verwalten</h1>

  <div class="filters">
  <input
    v-model="search"
    placeholder="Suche nach Titel oder Nutzer..."
  />

  <select v-model="categoryFilter">
    <option value="">Alle Kategorien</option>
    <option value="MOTIVATION">Motivation</option>
    <option value="ENTSPANNUNG">Entspannung</option>
    <option value="FOKUS">Fokus</option>
    <option value="ABLENKUNG">Ablenkung</option>
  </select>
  </div>

    <div class="grid">
      <div v-for="b in filteredBoards" :key="b.id || b.ID" class="card">
        <h2>{{ b.title }}</h2>
        <p>Kategorie: {{ b.category }}</p>
        <p>Nutzer: {{ b.user?.username || b.user?.email || 'Unbekannt' }}</p>

        <div class="images">
          <img v-for="img in b.images" :key="img.id" :src="img.imageUrl" />
        </div>

        <button class="delete" @click="deleteBoard(b.id || b.ID)">
          Löschen
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page {
  padding: 50px;
  min-height: 100vh;
  background: linear-gradient(180deg, #f9fafb, #eef2ff);
}

.grid {
  display: grid;
  gap: 20px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.08);
}

.images {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.images img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
}

.delete {
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
}

.filters {
  display: flex;
  gap: 12px;
  margin: 20px 0 30px;
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
  top: 115px;
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