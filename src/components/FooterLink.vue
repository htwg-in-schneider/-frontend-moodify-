<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: String,
  label: String
})
</script>

<template>
  <RouterLink :to="to" class="footer-link">
    <slot>{{ label }}</slot>
  </RouterLink>
</template>

<style scoped>
.footer-link {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}

.footer-link:hover {
  color: #ff6600;
}
</style>