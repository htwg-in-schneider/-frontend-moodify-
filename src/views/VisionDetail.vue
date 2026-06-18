<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const item = ref(null)

/* LOAD ONE ITEM */
async function loadItem() {
  const id = route.params.id

  // später Backend:
  // const res = await fetch(`http://localhost:8081/api/vision-board/${id}`)
  // item.value = await res.json()

  // aktuell (Frontend Demo):
  const mock = [
    { id: 1, title: "Reise nach Japan", description: "Ich möchte reisen", category: "LIFESTYLE" },
    { id: 2, title: "Mehr Selbstliebe", description: "Achtsamkeit", category: "MINDSET" },
    { id: 3, title: "Fitness Routine", description: "Sport machen", category: "FITNESS" }
  ]

  item.value = mock.find(i => i.id == id)
}

function goBack() {
  router.push('/visionboard')
}

onMounted(loadItem)
</script>

<template>
  <main class="page">

    <button class="back" @click="goBack">← Zurück</button>

    <div v-if="item" class="card">

      <span class="tag">{{ item.category }}</span>

      <h1>{{ item.title }}</h1>
      <p>{{ item.description }}</p>

      <div class="actions">
        <button class="btn">✏ Edit (später)</button>
        <button class="btn danger">🗑 Delete (später)</button>
      </div>

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
  font-family: sans-serif;
}

/* BACK */
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

/* CARD */
.card {
  max-width: 500px;
  margin: 80px auto;
  background: white;
  padding: 25px;
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

/* TAG */
.tag {
  background: #eef2ff;
  color: #6366f1;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
}

/* ACTIONS */
.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.danger {
  background: #ef4444;
  color: white;
}
</style>