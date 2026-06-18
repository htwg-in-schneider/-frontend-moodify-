<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const challenges = ref([])

async function loadChallenges() {
  const res = await fetch('http://localhost:8081/api/challenge')
  challenges.value = await res.json()
}

async function deleteChallenge(id) {
  await fetch(`http://localhost:8081/api/challenge/${id}`, {
    method: 'DELETE'
  })

  loadChallenges()
}

function editChallenge(id) {
  router.push(`/challenges/${id}/edit`)
}

onMounted(loadChallenges)
</script>

<template>
  <main class="admin">

    <h1>Admin Panel 🛠️</h1>

    <p>Hier kannst du alles verwalten</p>

    <div class="list">

      <div v-for="c in challenges" :key="c.id" class="card">

        <h3>{{ c.title }}</h3>
        <p>{{ c.description }}</p>

       <button class="edit" @click="editChallenge(c.id)">
  Edit
</button>
        <button class="delete" @click="deleteChallenge(c.id)">
          Delete
        </button>

      </div>

    </div>

  </main>
</template>

<style scoped>
.admin {
  padding: 40px;
}

.list {
  display: grid;
  gap: 15px;
  margin-top: 20px;
}

.card {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 10px;
}

.edit {
  margin-right: 10px;
}

.delete {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>