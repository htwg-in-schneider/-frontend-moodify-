<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const affirmations = ref([])
const current = ref('')
const router = useRouter()


async function loadAffirmations() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/affirmations`)

    if (!res.ok) {
      console.error('API ERROR:', res.status)
      return
    }

    const data = await res.json()
    affirmations.value = data

    if (affirmations.value.length > 0) {
      current.value = affirmations.value[0].text
    }

  } catch (err) {
    console.error('FETCH ERROR:', err)
  }
}


function newAffirmation() {
  if (!affirmations.value.length) return

  const randomIndex = Math.floor(Math.random() * affirmations.value.length)
  current.value = affirmations.value[randomIndex].text
}

function goBack() {
  router.push('/')
}

onMounted(loadAffirmations)
</script>

<template>
  <main class="affirmations">

    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <h1>Affirmations</h1>
    <p>Deine tägliche Erinnerung:</p>

    <div class="card">
      <h2>{{ current }}</h2>
    </div>

    <button class="btn" @click="newAffirmation">
      Neue Affirmation ✨
    </button>
  </main>
</template>

<style scoped>

.affirmations {
  padding: 40px;
  text-align: center;
  position: relative;
}

.card {
  margin: 20px auto;
  padding: 30px;
  max-width: 500px;
  border-radius: 16px;
  background: #ffd9e2;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.btn {
  margin-top: 20px;
  padding: 12px 20px;
  border-radius: 20px;
  background: #C3D0C2;
  cursor: pointer;
  border: none;
}

.back {
  position: absolute;
  top: 28px;
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