<script setup>
defineProps({
  review: Object
})
</script>

<template>
  <div class="review-card">
    <div class="stars">★★★★★</div>

    <p class="text">"{{ review.text }}"</p>

    <strong class="user">— {{ review.user }}</strong>
  </div>
</template>

<style scoped>
.review-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.review-card:hover {
  transform: translateY(-5px);
}

.stars {
  color: gold;
  margin-bottom: 10px;
}

.text {
  font-style: italic;
  margin-bottom: 10px;
}

.user {
  font-size: 14px;
  color: gray;
}

</style>

