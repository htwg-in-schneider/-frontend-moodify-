<template>
  <div class="quiz-page">
    <div class="quiz-card">

      <div class="top-bar">
        <button class="back" @click="goBack">← Zurück</button>
        <div class="progress-text">Frage 5 von 5</div>
      </div>

      <div class="progress-bar">
        <div class="progress-fill" style="width: 100%"></div>
      </div>

      <h1>Wie fühlst du dich insgesamt?</h1>

      <div class="answers">

        <div class="answer" :class="{ selected: selected === 'happy' }" @click="select('happy')">😊 Glücklich</div>
        <div class="answer" :class="{ selected: selected === 'calm' }" @click="select('calm')">😌 Ruhig</div>
        <div class="answer" :class="{ selected: selected === 'sad' }" @click="select('sad')">😔 Traurig</div>
        <div class="answer" :class="{ selected: selected === 'stressed' }" @click="select('stressed')">😵 Gestresst</div>

      </div>

      <button class="next" :disabled="!selected" @click="next">
        Ergebnis
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quizStore'

const router = useRouter()
const quiz = useQuizStore()
const selected = ref(null)

function select(v) {
  selected.value = v
}

function next() {
  quiz.setAnswer(4, selected.value)
  router.push('/quiz/result')
}

function goBack() {
  router.push('/quiz/question/4')
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
  max-width: 650px;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  text-align: center;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.back {
  background: none;
  border: none;
  color: #6366f1;
  cursor: pointer;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 999px;
  margin: 15px 0 25px;
}

.progress-fill {
  width: 100%;
  height: 100%;
  background: #6366f1;
  border-radius: 999px;
}

h1 {
  margin-bottom: 8px;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 25px;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.answer {
  padding: 15px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
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

button {
  margin-top: 25px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #6366f1;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}
</style>