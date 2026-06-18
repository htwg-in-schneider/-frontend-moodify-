<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const challenges = ref([])
const search = ref('')

async function load() {
  const res = await fetch('http://localhost:8081/api/challenge')
  challenges.value = await res.json()
}

const filtered = computed(() =>
  challenges.value.filter(c =>
    c.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

onMounted(load)
</script>

<template>
  <main class="page">

    <div class="top">
      <h1>📋 Challenges</h1>

      <input v-model="search" placeholder="Suche..." />

      <div class="buttons">
        <button @click="router.push('/challenges/create')">➕ Neu</button>
        <button @click="router.push('/challenges')">🏠 Hub</button>
      </div>
    </div>

    <div class="grid">
      <div
        v-for="c in filtered"
        :key="c.id"
        class="card"
      >
        <h3>{{ c.title }}</h3>
        <p>{{ c.description }}</p>
        <span>{{ c.category }}</span>
      </div>
    </div>

  </main>
</template>

<style scoped>
.page {
  padding: 40px;
}

.top input {
  padding: 10px;
  margin-top: 10px;
  width: 250px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  margin-top: 30px;
}

.card {
  background: white;
  padding: 15px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}
</style>