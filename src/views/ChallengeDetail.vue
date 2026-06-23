<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChallengeReviews from '@/components/ChallengeReviews.vue'


const route = useRoute()
const router = useRouter()
const challenge = ref(null)

onMounted(async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/challenge/${route.params.id}`)
  challenge.value = await res.json()
})


function goBack() {
  router.push('/challenges/list')
}
</script>

<template>
  <main v-if="challenge" class="detail">

     <button class="back-btn" @click="goBack">
      ← Zurück
    </button>

    <h1>{{ challenge.title }}</h1>
    <p>{{ challenge.description }}</p>

    <span class="tag">{{ challenge.category }}</span>

    <p>Difficulty: {{ challenge.difficulty }}</p>

    
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