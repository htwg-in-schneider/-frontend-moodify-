<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const route = useRoute()
const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

const board = ref(null)

async function loadItem() {
  const token = await getAccessTokenSilently({
    authorizationParams: {
      audience: 'https://moodify-api'
    }
  })

  const res = await fetch(`http://localhost:8081/api/visionboard/${route.params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    console.log('DETAIL ERROR:', res.status, await res.text())
    return
  }

  board.value = await res.json()
}

onMounted(loadItem)
</script>

<template>
  <main class="page">
    <button class="back" @click="router.push('/visionboard')">
      ← Zurück
    </button>

    <div v-if="board" class="card">
      <span class="tag">{{ board.category }}</span>

      <h1>{{ board.title }}</h1>

      <div class="board-images">
        <img
          v-for="img in board.images"
          :key="img.id"
          :src="img.imageUrl"
        />
      </div>

      <button class="btn" @click="router.push(`/visionboard/${board.id || board.ID}/edit`)">
        ✏ Bearbeiten
      </button>
    </div>

    <div v-else>
      Loading...
    </div>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  text-align: center;
}

.back {
  position: absolute;
  top: 20px;
  left: 20px;
  border: none;
  background: white;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
}

.card {
  max-width: 800px;
  margin: 80px auto;
  background: white;
  padding: 28px;
  border-radius: 22px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.tag {
  background: #eef2ff;
  color: #6366f1;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
}

.board-images {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.board-images img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 18px;
}

.btn {
  margin-top: 25px;
  padding: 12px 18px;
  border: none;
  border-radius: 14px;
  background: #C3D0C2;
  cursor: pointer;
  font-weight: 700;
}
</style>