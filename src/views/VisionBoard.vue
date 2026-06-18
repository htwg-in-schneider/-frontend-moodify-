<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* STATE */
const ideas = ref([])

const newTitle = ref('')
const newDescription = ref('')
const category = ref('MINDSET')

/* LOAD */
onMounted(() => {
  ideas.value = [
    {
      id: 1,
      title: "Reise nach Japan",
      description: "Ich möchte neue Kulturen entdecken.",
      category: "LIFESTYLE"
    },
    {
      id: 2,
      title: "Mehr Selbstliebe",
      description: "Achtsamkeit im Alltag.",
      category: "MINDSET"
    }
  ]
})

/* NAV */
function openDetail(id) {
  router.push(`/visionboard/${id}`)
}

/* ADD */
function addIdea() {
  if (!newTitle.value || !newDescription.value) return

  ideas.value.unshift({
    id: Date.now(),
    title: newTitle.value,
    description: newDescription.value,
    category: category.value
  })

  newTitle.value = ''
  newDescription.value = ''
}

/* DELETE */
function removeIdea(id) {
  ideas.value = ideas.value.filter(i => i.id !== id)
}
</script>

<template>
  <main class="page">

    <h1>🌈 Vision Board</h1>
    <p class="subtitle">Visualisiere deine Ziele ✨</p>

    <!-- FORM -->
    <div class="form">

      <input v-model="newTitle" placeholder="Titel (z.B. Fitness Ziel)" />
      <input v-model="newDescription" placeholder="Beschreibung" />

      <select v-model="category">
        <option value="MINDSET">Mindset</option>
        <option value="FITNESS">Fitness</option>
        <option value="CAREER">Career</option>
        <option value="LIFESTYLE">Lifestyle</option>
      </select>

      <button class="btn" @click="addIdea">
        + Hinzufügen
      </button>

    </div>

    <!-- EMPTY STATE -->
    <div v-if="ideas.length === 0" class="empty">
      Noch keine Visionen ✨<br />
      Füge dein erstes Ziel hinzu
    </div>

    <!-- GRID -->
    <div class="grid">

      <div
        class="card"
        v-for="i in ideas"
        :key="i.id"
        @click="openDetail(i.id)"
      >

        <div class="top">
          <span class="tag">{{ i.category }}</span>

          <button class="delete" @click.stop="removeIdea(i.id)">
            ✕
          </button>
        </div>

        <h2>{{ i.title }}</h2>
        <p>{{ i.description }}</p>

      </div>

    </div>

  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  font-family: sans-serif;
}

.subtitle {
  color: #666;
}

/* FORM */
.form {
  max-width: 420px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, select {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  outline: none;
}

/* BUTTON */
.btn {
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #6366f1;
  color: white;
  cursor: pointer;
}

/* EMPTY */
.empty {
  margin-top: 30px;
  color: #888;
  font-size: 14px;
}

/* GRID */
.grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
}

/* CARD */
.card {
  background: white;
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  text-align: left;
  cursor: pointer;
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-3px);
}

/* TOP */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag {
  font-size: 12px;
  background: #eef2ff;
  padding: 4px 10px;
  border-radius: 10px;
  color: #6366f1;
}

.delete {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #ef4444;
}
</style>