<script setup>
import { ref, onMounted, computed } from 'vue'
import ChallengeFilter from '@/components/ChallengeFilter.vue'

const challenges = ref([])

const filter = ref({
  search: '',
  category: ''
})

function handleFilterChange(data) {
  filter.value = data
}
/* LOAD DATA */
async function loadChallenges() {
  const res = await fetch('http://localhost:3000/challenges')
challenges.value = await res.json()
}

/* DELETE */
async function deleteChallenge(id) {
  try {
    const res = await fetch(`http://localhost:3000/challenges/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) throw new Error()

    alert("Challenge gelöscht 🗑️")
    loadChallenges()

  } catch {
    alert("Fehler beim Löschen ❌")
  }
}


const filteredChallenges = computed(() => {
  return challenges.value.filter(c => {
    const search = filter.value.search.toLowerCase()

    const matchesSearch =
      c.title.toLowerCase().includes(search) ||
      c.description.toLowerCase().includes(search)

    const matchesCategory =
      !filter.value.category || c.category === filter.value.category

    return matchesSearch && matchesCategory
  })
})
onMounted(loadChallenges)
</script>

<template>
  <main class="challenges">

    <h1>Challenges✨</h1>

  


    <!-- CREATE BUTTON -->
    <RouterLink to="/challenges/create" class="btn create">
      + Neue Challenge
    </RouterLink>


    <ChallengeFilter @filter-change="handleFilterChange" />
    <!-- LIST -->
    <div class="challenge-grid">

    <RouterLink
  v-for="c in filteredChallenges"
  :key="c.id"
  :to="{ name: 'challenge-detail', params: { id: c.id } }"
  class="challenge-card"
    >

        <h2>{{ c.title }}</h2>
        <p>{{ c.description }}</p>

        <p class="tag">Kategorie: {{ c.category }}</p>
        <p>Schwierigkeit: {{ c.difficulty }}</p>

        <div class="actions">

          <RouterLink
            :to="{ name: 'challenge-edit', params: { id: c.id } }"
            class="btn"
          >
            Bearbeiten
          </RouterLink>

          <button
  class="btn delete"
  @click.stop.prevent="deleteChallenge(c.id)"
>
  Löschen
</button>

        </div>

      

  </RouterLink>
  
    </div>

  </main>
</template>

<style scoped>
.challenges {
  padding: 40px;
}


.search {
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
}

.btn {
  background: #C3D0C2;
  padding: 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;
}

.create {
  margin-bottom: 20px;
  display: inline-block;
}

.delete {
  background: #ffcccc;
}

.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.challenge-card {
  all: unset;
  display: block;
  cursor: pointer;

  background: white;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);

  color: inherit;

  transition: 0.2s;
}

.challenge-card:hover {
  transform: translateY(-4px);
}
.tag {
  font-size: 12px;
  background: #eee;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>