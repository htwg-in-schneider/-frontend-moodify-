<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const go = (path) => router.push(path)
</script>

<template>
  <main class="hub">

    <h1>✨ Challenges Hub</h1>
    <p>Wähle deinen Modus</p>

    <div class="grid">

      <div class="card" @click="go('/challenges/list')">
        <h2>📋 Übersicht</h2>
        <p>Alle Challenges durchsuchen & filtern</p>
      </div>

      <div class="card highlight" @click="go('/challenges/wheel')">
        <h2>🎡 Random Wheel</h2>
        <p>Lass das System eine Challenge wählen</p>
      </div>

      <div class="card" @click="go('/challenges/create')">
        <h2>➕ Erstellen</h2>
        <p>Neue Challenge hinzufügen</p>
      </div>

    </div>

  </main>
</template>

<style scoped>
.hub {
  min-height: 100vh;
  padding: 50px;
  text-align: center;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: auto;
  margin-top: 40px;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.highlight {
  border: 2px solid #6366f1;
}
</style>