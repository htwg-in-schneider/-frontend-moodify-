<script setup>
import { ref } from 'vue'

const moods = ref([
  { id: 1, label: "😊 Happy", value: "happy" },
  { id: 2, label: "😐 Neutral", value: "neutral" },
  { id: 3, label: "😔 Sad", value: "sad" },
  { id: 4, label: "😡 Angry", value: "angry" }
])

const selectedMood = ref(null)

function selectMood(mood) {
  selectedMood.value = mood
}
</script>

<template>
  <main class="mood-tracker">
    <h1>Mood Tracker</h1>
    <p>Wie fühlst du dich heute?</p>

    <div class="mood-grid">
      <button
        v-for="m in moods"
        :key="m.id"
        class="mood-card"
        @click="selectMood(m)"
      >
        {{ m.label }}
      </button>
    </div>

    <div v-if="selectedMood" class="result">
      <h2>Deine Auswahl:</h2>
      <p>{{ selectedMood.label }}</p>
    </div>
  </main>
</template>

<style scoped>
.mood-tracker {
  padding: 40px;
  text-align: center;
}

.mood-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.mood-card {
  padding: 15px;
  border-radius: 12px;

  border: none;
  background: #C3D0C2;
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s;
}

.mood-card:hover {
  transform: scale(1.05);
}

.result {
  margin-top: 30px;
  padding: 20px;
  background: #fee5fd;
  border-radius: 12px;
}
</style>