<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { getAccessTokenSilently } = useAuth0()
const boards = ref([])

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
    console.log('LOAD ERROR:', res.status, await res.text())
    return
  }

  boards.value = await res.json()
}

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

onMounted(loadBoards)
</script>

<template>
  <main class="page">
    <h1>🌈 Visionboards verwalten</h1>

    <div class="grid">
      <div v-for="b in boards" :key="b.id || b.ID" class="card">
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
</style>