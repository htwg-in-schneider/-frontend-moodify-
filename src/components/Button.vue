<script setup>
defineProps({
  variant: {
    type: String,
    default: 'accent'
  }
})
</script>

<template>
  <button :class="['btn', variant]">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
}

/* ACCENT = Hauptbutton */
.accent {
  background: #C3D0C2;
  color: #3E4A62;
}

/* SECONDARY = Nebenbutton */
.secondary {
  background: white;
  color: #3E4A62;
  border: 1px solid #3E4A62;
}
</style>