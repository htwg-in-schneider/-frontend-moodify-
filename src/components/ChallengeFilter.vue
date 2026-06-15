<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['filter-change'])

const search = ref('')
const category = ref('')

watch([search, category], () => {
  emit('filter-change', {
    search: search.value,
    category: category.value
  })
})
</script>

<template>
  <div class="filter">

    <input
      v-model="search"
      placeholder="Suche nach Challenge..."
    />

        <select v-model="category">
      <option value="">Alle Kategorien</option>
      <option value="MOTIVATION">Motivation</option>
      <option value="ENTSPANNUNG">Entspannung</option>
      <option value="FOKUS">Fokus</option>
      <option value="ABLENKUNG">Ablenkung</option>
    </select>
 

  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input,
select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>