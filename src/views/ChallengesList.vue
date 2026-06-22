<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import ChallengeFilter from '@/components/ChallengeFilter.vue'

const { user } = useAuth0()

const router = useRouter()

const role = computed(() => {
  return user.value?.['https://your-app/roles']?.[0] || 'user'
})

   



const challenges = ref([])

const filter = ref({
  search: '',
  category: ''
})


const showSuccess = ref(false)
const showError = ref(false)
const message = ref('')


function handleFilterChange(data) {
  filter.value = data
}


async function loadChallenges() {

  let url = 'http://localhost:8081/api/challenge'
  const params = new URLSearchParams()

  if (filter.value.search) params.append('title', filter.value.search)
  if (filter.value.category) params.append('category', filter.value.category)

  if ([...params].length > 0) {
    url += `?${params.toString()}`
  }

  const res = await fetch(url)
  challenges.value = await res.json()
}


function openDetail(id) {
  router.push({ name: 'challenge-detail', params: { id } })
}





const filteredChallenges = computed(() => {
  return challenges.value.filter(c => {
    const search = (filter.value.search || '').toLowerCase()

    const matchesSearch =
       (c.title || '').toLowerCase().includes(search) ||
      (c.description || '').toLowerCase().includes(search)

    const matchesCategory =
      !filter.value.category ||
      filter.value.category === 'Alle Kategorien' ||
      c.category === filter.value.category

    return matchesSearch && matchesCategory
  })
})

onMounted(loadChallenges)
</script>

<template>
  <main class="challenges">


    
    <div v-if="showSuccess" class="overlay">
      <div class="modal">
        <div class="icon">✔</div>
        <h2>Erfolgreich</h2>
        <p>{{ message }}</p>
      </div>
    </div>

    
    <div v-if="showError" class="overlay" @click="showError = false">
      <div class="modal error">
        <div class="icon">✖</div>
        <h2>Fehler</h2>
        <p>{{ message }}</p>
      </div>
    </div>

    <h1>Challenges ✨</h1>

  
    <RouterLink to="/challenges/create" class="btn create">
      + Neue Challenge
    </RouterLink>

    <ChallengeFilter @filter-change="handleFilterChange" />

    <div class="challenge-grid">

      <div
        v-for="c in filteredChallenges"
        :key="c.id"
        class="challenge-card"
        @click="openDetail(c.id)"
      >

        <h2>{{ c.title }}</h2>
        <p>{{ c.description }}</p>

        <p class="tag">Kategorie: {{ c.category }}</p>
        <p>Schwierigkeit: {{ c.difficulty || 'Keine Angabe' }}</p>

        <div class="actions">

      

        </div>

      </div>

    </div>

  </main>
</template>

<style scoped>
.challenges {
  padding: 40px;
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
  background: white;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  transition: 0.2s;
  cursor: pointer;
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


.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  width: 320px;
}

.modal.error .icon {
  color: #e74c3c;
}

.icon {
  font-size: 40px;
  color: green;
  margin-bottom: 10px;
}
</style>