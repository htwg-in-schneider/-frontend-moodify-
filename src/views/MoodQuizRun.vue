<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quizStore'

const router = useRouter()
const quiz = useQuizStore()

const questions = ref([])
const currentIndex = ref(0)
const selected = ref(null)
const loading = ref(true)

const API = 'http://localhost:8081/api/moodquiz'


const currentQuestion = computed(() => questions.value[currentIndex.value])

const progressWidth = computed(() => {
  if (questions.value.length === 0) return '0%'
  return `${((currentIndex.value + 1) / questions.value.length) * 100}%`
})

async function loadQuestions() {
  try {
    const res = await fetch(API)

    if (!res.ok) {
      console.log('MOOD QUIZ LOAD ERROR:', res.status)
      return
    }

    questions.value = await res.json()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}



function select(answer) {
  selected.value = answer
}

function next() {
  if (!selected.value) return

  quiz.setAnswer(currentIndex.value, selected.value)

  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    selected.value = null
  } else {
    router.push('/quiz/result')
  }
}

function goBack() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    selected.value = null
  } else {
    router.push('/moodquiz')
  }
}

onMounted(loadQuestions)
</script>

<template>
  <div class="quiz-page">
    <div class="quiz-card">

      <div v-if="loading">
        Loading...
      </div>

      <div v-else-if="questions.length === 0">
        Keine Fragen vorhanden.
      </div>

      <div v-else>
        <div class="top-bar">
          <button class="back" @click="goBack">← Zurück</button>
          <div class="progress-text">
            Frage {{ currentIndex + 1 }} von {{ questions.length }}
          </div>
        </div>

        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressWidth }"></div>
        </div>

        <h1>{{ currentQuestion.text }}</h1>

        <div class="answers">
          <div
            v-for="answer in currentQuestion.answers"
            :key="answer"
            class="answer"
            :class="{ selected: selected === answer }"
            @click="select(answer)"
          >
            {{ answer }}
          </div>
        </div>

        <button class="next" :disabled="!selected" @click="next">
          {{ currentIndex === questions.length - 1 ? 'Ergebnis anzeigen' : 'Weiter' }}
        </button>
      </div>

    </div>
  </div>
</template>

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
  height: 100%;
  background: #6366f1;
  border-radius: 999px;
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

.next {
  margin-top: 25px;
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
}
</style>