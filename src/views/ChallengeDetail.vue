<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ChallengeReviews from '@/components/ChallengeReviews.vue'

const route = useRoute()
const challenge = ref(null)

onMounted(async () => {
  const res = await fetch(`http://localhost:8081/api/challenge/${route.params.id}`)
  challenge.value = await res.json()
})
</script>

<template>
  <main v-if="challenge" class="detail">

    <h1>{{ challenge.title }}</h1>
    <p>{{ challenge.description }}</p>

    <span class="tag">{{ challenge.category }}</span>

    <p>Difficulty: {{ challenge.difficulty }}</p>

    <!-- REVIEWS -->
    <ChallengeReviews :id="challenge.id" />

  </main>
</template>

<style scoped>
.detail {
  padding: 40px;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e8f5e9;
  color: #2e7d32;
}

.card {
  cursor: pointer;
}
</style>