<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const route = useRoute()
const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

const id = route.params.id

const title = ref('')
const category = ref('MOTIVATION')
const selectedImages = ref([])

const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')


const availableImages = [
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-1.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-2.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-3.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-4.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-5.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-6.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-7.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-8.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-9.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-10.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-11.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-12.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-13.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-14.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-15.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-16.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-17.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-18.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-19.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-20.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-21.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-22.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-23.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-24.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-25.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-26.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-27.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-28.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-29.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-30.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-31.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-32.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-33.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-34.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-35.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-36.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-37.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-38.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-39.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-40.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-41.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-42.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-43.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-44.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-45.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-46.avif',
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-47.avif'
  
]


async function getToken() {
  return await getAccessTokenSilently({
    authorizationParams: {
      audience: 'https://moodify-api'
    }
  })
}

function toggleImage(url) {
  if (selectedImages.value.includes(url)) {
    selectedImages.value = selectedImages.value.filter(i => i !== url)
  } else {
    selectedImages.value.push(url)
  }
}

async function loadBoard() {
  try {
    const token = await getToken()

    const res = await fetch(`http://localhost:8081/api/visionboard/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error()

    const data = await res.json()

    title.value = data.title
    category.value = data.category
    selectedImages.value = (data.images || []).map(img => img.imageUrl)

  } catch {
    errorMessage.value = 'Visionboard konnte nicht geladen werden.'
    showError.value = true
  }
}

async function updateBoard() {
  if (!title.value.trim()) {
    errorMessage.value = 'Bitte Titel eingeben.'
    showError.value = true
    return
  }

  const token = await getToken()

  const images = selectedImages.value.map((url, index) => ({
    imageUrl: url,
    xPosition: 30 + index * 40,
    yPosition: 30 + index * 40,
    width: 160,
    height: 120
  }))

  try {
    const res = await fetch(`http://localhost:8081/api/visionboard/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        category: category.value,
        createdAt: new Date().toISOString(),
        images
      })
    })

    if (!res.ok) throw new Error()

    showSuccess.value = true

    setTimeout(() => {
      showSuccess.value = false
      router.push('/visionboard')
    }, 1200)

  } catch {
    errorMessage.value = 'Speichern fehlgeschlagen.'
    showError.value = true
  }
}

onMounted(loadBoard)
</script>

<template>
  <main class="page">
    <div v-if="showSuccess" class="overlay">
      <div class="modal">
        <div class="icon">✔</div>
        <h2>Gespeichert!</h2>
        <p>Dein Visionboard wurde aktualisiert.</p>
      </div>
    </div>

    <div v-if="showError" class="overlay" @click="showError = false">
      <div class="modal error">
        <div class="icon">✖</div>
        <h2>Fehler</h2>
        <p>{{ errorMessage }}</p>
      </div>
    </div>

    <button class="back" @click="router.push('/visionboard')">
      ← Zurück
    </button>

    <h1>✏️ Visionboard bearbeiten</h1>

    <div class="form">
      <input v-model="title" placeholder="Titel" />

      <select v-model="category">
        <option value="MOTIVATION">Motivation</option>
        <option value="ENTSPANNUNG">Entspannung</option>
        <option value="FOKUS">Fokus</option>
        <option value="ABLENKUNG">Ablenkung</option>
      </select>
    </div>

    <h2>Bilder auswählen</h2>

    <div class="image-grid">
      <img
        v-for="img in availableImages"
        :key="img"
        :src="img"
        :class="{ selected: selectedImages.includes(img) }"
        @click="toggleImage(img)"
      />
    </div>

    <button class="save" @click="updateBoard">
      Änderungen speichern
    </button>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(180deg, #f9fafb, #eef2ff);
}

.back {
  background: transparent;
  border: none;
  color: #6366f1;
  cursor: pointer;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 12px;
  margin: 20px 0 30px;
}

input,
select {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.image-grid img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 16px;
  cursor: pointer;
  border: 4px solid transparent;
}

.image-grid img.selected {
  border-color: #C3D0C2;
}

.save {
  padding: 14px 24px;
  border: none;
  border-radius: 18px;
  background: #C3D0C2;
  cursor: pointer;
  font-weight: 700;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
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
}

.icon {
  font-size: 40px;
  color: green;
}

.error .icon {
  color: #e74c3c;
}
</style>