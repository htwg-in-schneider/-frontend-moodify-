<script setup>
import { ref } from 'vue'

const ideas = ref([
  {
    id: 1,
    title: "Reise nach Japan",
    description: "Ich möchte neue Kulturen entdecken und reisen."
  },
  {
    id: 2,
    title: "Mehr Selbstliebe",
    description: "Ich möchte achtsamer mit mir selbst umgehen."
  },
  {
    id: 3,
    title: "Fitness Routine",
    description: "Regelmäßig Sport machen und gesund bleiben."
  }
])

const newTitle = ref('')
const newDescription = ref('')

function addIdea() {
  if (!newTitle.value || !newDescription.value) return

  ideas.value.push({
    id: Date.now(),
    title: newTitle.value,
    description: newDescription.value
  })

  newTitle.value = ''
  newDescription.value = ''
}
</script>

<template>
  <main class="visionboard">
    <h1>Vision Board</h1>
    <p>Visualisiere deine Ziele und Träume ✨</p>

    <!-- INPUT -->
    <div class="form">
      <input v-model="newTitle" placeholder="Titel" />
      <input v-model="newDescription" placeholder="Beschreibung" />

      <button class="btn" @click="addIdea">
        Hinzufügen
      </button>
    </div>

    <!-- CARDS -->
    <div class="grid">
      <div class="card" v-for="i in ideas" :key="i.id">
        <h2>{{ i.title }}</h2>
        <p>{{ i.description }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.visionboard {
  padding: 40px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 20px auto;
}

input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.btn {
  padding: 10px;
  border-radius: 20px;
  background: #C3D0C2;
  border: none;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 30px;
}

.card {
  background: #fee5fd;
 
   padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</style>