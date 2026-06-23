<template>
  <div class="quiz-start">

    <button class="back" @click="goBack">
      ← Zurück
    </button>

    <h1>🎵 Willkommen zu deinem Mood Quiz</h1>

    <p>
      Beantworte ein paar kurze Fragen und wir finden die perfekte Stimmung für dich.
    </p>

    <div class="info-box">
      <ul>
        <li>⏱ dauert ca. 2–3 Minuten</li>
        <li>📊 dein aktueller Mood Score</li>
      </ul>
    </div>


    <button class="start-btn" @click="startQuiz">
      🚀 Quiz starten
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function startQuiz() {
  router.push('/quiz/run');
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.quiz-start {
  max-width: 600px;
  margin: 80px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 28px;
  margin-bottom: 15px;
}

p {
  color: #555;
  margin-bottom: 25px;
}

.info-box {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
  text-align: left;
}

.start-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}

.start-btn:hover {
  background: #3730a3;
}

.back {
  position: absolute;
  top: 115px;
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