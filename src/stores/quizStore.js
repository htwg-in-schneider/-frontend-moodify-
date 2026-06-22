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

        if (
      a.includes('glücklich') ||
      a.includes('gut') ||
      a.includes('motiviert') ||
      a.includes('Energie') ||
      a.includes('Fokus') ||
      a.includes('Fit') ||
      a.includes('entspannt') ||
      a.includes('ruhig') ||
      a.includes('Sehr gut') ||
      a.includes('happy') ||
      a.includes('voller Energie') ||
      a.includes('Menschen treffen') ||
      a.includes('hoch') ||
      a.includes('calm')
    ) {
      score++
    }

    if (
      a.includes('traurig') ||
      a.includes('gestresst') ||
      a.includes('Stress') ||
      a.includes('Einfach Ruhe') ||
      a.includes('Erschöpft') ||
      a.includes('schlecht') ||
      a.includes('Motivation') ||
      a.includes('sad') ||
      a.includes('niedrig') ||
      a.includes('Zeit für mich') ||
      a.includes('Überhaupt nicht') ||
      a.includes('tired')
    ) {
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