<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

const title = ref('')
const category = ref('MOTIVATION')
const selectedImages = ref([])

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
  'https://htwg-in-schneider.github.io/frontend-static-moodify-2/visionboard/images-12.avif'
]

function toggleImage(url) {
  if (selectedImages.value.includes(url)) {
    selectedImages.value = selectedImages.value.filter(i => i !== url)
  } else {
    selectedImages.value.push(url)
  }
}

async function createBoard() {
  if (!title.value.trim()) {
    alert('Bitte Titel eingeben.')
    return
  }

  const token = await getAccessTokenSilently({
    authorizationParams: {
      audience: 'https://moodify-api'
    }
  })

  const images = selectedImages.value.map((url, index) => ({
    imageUrl: url,
    xPosition: 30 + index * 40,
    yPosition: 30 + index * 40,
    width: 160,
    height: 120
  }))

  const res = await fetch('http://localhost:8081/api/visionboard', {
    method: 'POST',
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

  if (!res.ok) {
    console.log('CREATE ERROR:', res.status, await res.text())
    alert('Speichern fehlgeschlagen.')
    return
  }

  router.push('/visionboard')
}
</script>

<template>
  <main class="page">
    <h1>✨ Neues Visionboard</h1>

    <div class="form">
      <input v-model="title" placeholder="Titel deines Visionboards" />

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

    <button class="save" @click="createBoard">
      Visionboard erstellen
    </button>
  </main>
</template>

<style scoped>
.page {
  padding: 40px;
}

.form {
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
</style>