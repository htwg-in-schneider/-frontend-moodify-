import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    answers: [],
    moods: []
  }),

  actions: {

    setAnswer(index, value) {
      this.answers[index] = value
    },

    resetQuiz() {
      this.answers = []
    },

    calculateMood() {
      const safe = this.answers.filter(Boolean)

      let score = 0

      safe.forEach(a => {
        if (['happy','energy','focus','motivation','calm','relaxed','music','pop','electronic'].includes(a)) {
          score++
        }

        if (['sad','stress','stressed','tired','low'].includes(a)) {
          score--
        }
      })

      if (score <= -2) return 'sad'
      if (score <= 1) return 'calm'
      return 'happy'
    },

    setMoods(data) {
      this.moods = Array.isArray(data) ? data : []
    }
  }
})