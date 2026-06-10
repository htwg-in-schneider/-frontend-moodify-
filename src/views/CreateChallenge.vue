<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const category = ref('motivation')
const difficulty = ref('easy')

function createChallenge() {
  console.log({
    title: title.value,
    description: description.value,
    category: category.value,
    difficulty: difficulty.value
  })
}
</script>
<template>
  <main class="page">

    <div class="form-wrapper">

      <header class="header">
        <h1>✨ Neue Challenge</h1>
        <p>Erstelle eine neue Aufgabe für dein System</p>
      </header>

      <section class="form">

        <div class="field">
          <label>Titel</label>
          <input v-model="title" placeholder="z.B. Fokus Challenge" />
        </div>

        <div class="field">
          <label>Beschreibung</label>
          <textarea
            v-model="description"
            rows="4"
            placeholder="Was soll gemacht werden?"
          />
        </div>

        <div class="row">

          <div class="field">
            <label>Kategorie</label>
            <select v-model="category">
              <option value="motivation">Motivation</option>
              <option value="entspannung">Entspannung</option>
              <option value="fokus">Fokus</option>
              <option value="ablenkung">Ablenkung</option>
            </select>
          </div>

          <div class="field">
            <label>Schwierigkeit</label>
            <select v-model="difficulty">
              <option value="easy">Easy</option>
              <option value="medium">Mittel</option>
              <option value="hard">Schwer</option>
            </select>
          </div>

        </div>

        <button class="btn" @click="createChallenge">
          Challenge erstellen
        </button>

      </section>

    </div>

  </main>
</template>

<style scoped>

/* 🌈 BACKGROUND (macht sofort “App Feeling”) */
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;

  /* leicht nach oben statt perfekt center */
  align-items: flex-start;

  padding-top: 90px;

  background: linear-gradient(
    180deg,
    #f5f7fb 0%,
    #eef2ff 100%
  );
}

/* 🧠 WRAPPER */
.form-wrapper {
  width: 100%;
  max-width: 640px;

  /* "floating card feel" */
  animation: fadeUp 0.4s ease;
}

/* ✨ HEADER */
.header {
  margin-bottom: 28px;
}

.header h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
}

.header p {
  margin: 6px 0 0;
  color: #6b7280;
}

/* FORM */
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* FIELD */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
}

/* INPUT STYLE (clean SaaS style) */
input,
textarea,
select {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  font-size: 15px;
  background: white;
  transition: 0.2s;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
}

/* 2 COL ROW */
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* BUTTON */
.btn {
  margin-top: 8px;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #C3D0C2;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #C3D0C2;
  transform: translateY(-2px);
}

/* ✨ ANIMATION (macht es sofort "premium") */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>