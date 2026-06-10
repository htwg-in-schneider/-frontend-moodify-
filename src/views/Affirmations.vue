<script setup>
import { ref } from 'vue'

const affirmations = ref([
  "Ich bin genug, so wie ich bin.",
  "Ich vertraue dem Prozess meines Lebens.",
  "Ich bin ruhig, stark und fokussiert.",
  "Heute ist ein guter Tag, um zu wachsen.",
  "Ich verdiene Glück und Erfolg."
])

const current = ref(affirmations.value[0])

function newAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmations.value.length)
  current.value = affirmations.value[randomIndex]
}
</script>

<template>
  <main class="affirmations">
    <h1>Affirmationss</h1>
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
</style>