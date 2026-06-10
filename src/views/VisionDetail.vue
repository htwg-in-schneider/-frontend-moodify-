<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <div>
    <h1>Vision Detaill</h1>
    <p>Detail ID: {{ id }}</p>
  </div>
</template>