<template>
  <div class="quiz-page">
    <div class="quiz-card">

      <!-- Progress -->
      <div class="top-bar">
        <button class="back" @click="goBack">← Zurück</button>

        <div class="progress-text">
          Frage 1 von 5
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress-fill" style="width: 20%"></div>
      </div>

      <!-- Question -->
      <h1>Wie fühlst du dich heute?</h1>
      <p class="subtitle">Wähle die Antwort, die am besten passt.</p>

      <!-- Answers -->
      <div class="answers">

        <div
          class="answer"
          :class="{ selected: selected === 'happy' }"
          @click="select('happy')"
        >
          😊 <span>Glücklich</span>
          <div v-if="selected === 'happy'" class="check">✔</div>
        </div>

        <div
          class="answer"
          :class="{ selected: selected === 'calm' }"
          @click="select('calm')"
        >
          😌 <span>Entspannt</span>
          <div v-if="selected === 'calm'" class="check">✔</div>
        </div>

        <div
          class="answer"
          :class="{ selected: selected === 'sad' }"
          @click="select('sad')"
        >
          😔 <span>Traurig</span>
          <div v-if="selected === 'sad'" class="check">✔</div>
        </div>

        <div
          class="answer"
          :class="{ selected: selected === 'stressed' }"
          @click="select('stressed')"
        >
          😵 <span>Gestresst</span>
          <div v-if="selected === 'stressed'" class="check">✔</div>
        </div>

      </div>

      <!-- Buttons -->
      <div class="actions">
        <button class="next" :disabled="!selected" @click="next">
          Weiter →
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selected = ref(null)

function select(val) {
  selected.value = val
}

function next() {
  router.push('/quiz/question/2')
}

function goBack() {
  router.push('/moodquiz')
}
</script>

<style scoped>
.quiz-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  padding: 20px;
}

.quiz-card {
  width: 100%;
  max-width: 700px;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #6366f1;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 999px;
  margin: 15px 0;
}

.progress-fill {
  height: 100%;
  background: #6366f1;
  border-radius: 999px;
  transition: 0.3s;
}

h1 {
  margin-top: 20px;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 20px;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.answer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  border: 2px solid #eee;
  cursor: pointer;
  transition: 0.2s;
}

.answer:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
}

.selected {
  border-color: #6366f1;
  background: #eef2ff;
}

.check {
  color: #6366f1;
  font-weight: bold;
}

.actions {
  margin-top: 25px;
}

.next {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #6366f1;
  color: white;
  cursor: pointer;
}

.next:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>