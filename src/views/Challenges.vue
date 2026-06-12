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


/* DATA */
const challenges = ref([])

const filter = ref({
  search: '',
  category: ''
})

/* MODALS */
const showSuccess = ref(false)
const showError = ref(false)
const message = ref('')

/* FILTER */
function handleFilterChange(data) {
  filter.value = data
}

/* LOAD */
async function loadChallenges() {
  const res = await fetch('http://localhost:3000/challenges')
  challenges.value = await res.json()
}

/* NAVIGATION */
function openDetail(id) {
  router.push({ name: 'challenge-detail', params: { id } })
}

/* DELETE (ADMIN ONLY) */
async function deleteChallenge(id) {
  try {
    const res = await fetch(`http://localhost:3000/challenges/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      message.value = 'Fehler beim Löschen'
      showError.value = true
      return
    }

    message.value = 'Challenge gelöscht 🗑️'
    showSuccess.value = true

    await loadChallenges()

    setTimeout(() => {
      showSuccess.value = false
    }, 1200)

  } catch {
    message.value = 'Server nicht erreichbar'
    showError.value = true
  }
}

/* FILTERED LIST */
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



    <p>ROLE: {{ role }}</p>

    <!-- SUCCESS MODAL -->
    <div v-if="showSuccess" class="overlay">
      <div class="modal">
        <div class="icon">✔</div>
        <h2>Erfolgreich</h2>
        <p>{{ message }}</p>
      </div>
    </div>

    <!-- ERROR MODAL -->
    <div v-if="showError" class="overlay" @click="showError = false">
      <div class="modal error">
        <div class="icon">✖</div>
        <h2>Fehler</h2>
        <p>{{ message }}</p>
      </div>
    </div>

    <h1>Challenges ✨</h1>

    <!-- CREATE (ALLE USER) -->
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
        <p>Schwierigkeit: {{ c.difficulty }}</p>

        <div class="actions">

          <!-- ADMIN ONLY -->
          <RouterLink
            v-if="role === 'admin'"
            :to="{ name: 'challenge-edit', params: { id: c.id } }"
            class="btn"
            @click.stop
          >
            Bearbeiten
          </RouterLink>

          <button
            v-if="role === 'admin'"
            class="btn delete"
            @click.stop="deleteChallenge(c.id)"
          >
            Löschen
          </button>

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

/* MODAL */
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