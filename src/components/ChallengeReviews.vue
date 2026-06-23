<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  id: String
})

const reviews = ref([])

async function loadReviews() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/challenge/${props.id}`)
  const data = await res.json()
  reviews.value = data.reviews || []
}

onMounted(loadReviews)

watch(() => props.id, loadReviews)
</script>

<template>
  <div class="reviews">

    <h3>Reviews</h3>

    <p class="hint">Reviews are read-only in this version</p>

    <div v-if="reviews.length">
      <div v-for="r in reviews" :key="r.id" class="review">
        <p>"{{ r.text }}"</p>
        <small>— {{ r.user }}</small>
      </div>
    </div>

    <p v-else class="empty">
      No reviews yet — be the first 👀
    </p>

  </div>
</template>

<style scoped>
.review {
  background: #f7f7f7;
  padding: 12px;
  border-radius: 12px;
  margin-top: 10px;
  transition: 0.2s ease;
}

.review:hover {
  transform: translateX(4px);
}

.empty {
  color: #888;
  font-style: italic;
}

.hint {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
</style>