<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const auth0 = useAuth0()

const adminName = ref('Admin')


async function loadProfile() {
  try {
   
    const token = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://moodify-api'
      }
    })

    const res = await fetch('http://localhost:8081/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Profile fetch failed')

    const data = await res.json()

    
    adminName.value =
      data.name ||
      data.username ||
      data.email?.split('@')[0] ||
      'Admin'

  } catch (err) {
    console.error('PROFILE ERROR:', err)
    adminName.value = 'Admin'
  }
}

/* NAVIGATION */
function go(path) {
  router.push(path)
}

/* LOGOUT */
function logout() {
  auth0.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}


onMounted(loadProfile)
</script>


<template>
  <main class="admin">

    
    <section class="admin-header">
      <h1>Guten Morgen {{ adminName }} 👋</h1>
      <p>Admin Control Center – verwalte dein gesamtes System</p>
    </section>

    
    <section class="admin-grid">

      
      <div class="admin-card">
        <h2>🎯 Challenges</h2>
        <p>Erstellen, bearbeiten & löschen</p>

        <div class="actions">
          <button @click="go('/challenges/create')">+ Erstellen</button>
          <button @click="go('/challenges/admin')">Bearbeiten/Löschen</button>
          <button @click="go('/challenges')">Liste</button>
        </div>
      </div>

      
      <div class="admin-card">
        <h2>💗 Affirmations</h2>
        <p>Daily Motivation verwalten</p>

        <div class="actions">
          <button @click="go('/affirmations/admin')">
            Verwalten
          </button>
        </div>
      </div>

      
      <div class="admin-card">
        <h2>🧠 Mood Quiz</h2>
        <p>Fragen Flow verwalten</p>

        <div class="actions">
          <button @click="go('/moodquiz/admin')">
            Verwalten
          </button>
          <button @click="go('/moodquiz')">
            Preview 
          </button>
        </div>
      </div>


     
<div class="admin-card">
  <h2>👤 Nutzer</h2>
  <p>User verwalten & Rollen bearbeiten</p>

  <div class="actions">
    <button @click="go('/users/admin')">
      Verwalten
    </button>
  </div>
</div>


<div class="admin-card">
  <h2>🌈 Visionboards</h2>
  <p>Visionboards aller Nutzer ansehen & löschen</p>

  <div class="actions">
    <button @click="go('/admin/visionboards')">
      Verwalten
    </button>
  </div>
</div>

      
      <div class="admin-card logout">
        <h2>⚙️ System</h2>
        <p>Account & Zugriff</p>

        <div class="actions">
          <button @click="logout">Logout</button>
        </div>
      </div>

    </section>

  </main>
</template>

<style scoped>
.admin {
  min-height: 100vh;
  padding: 80px 24px;
  background: linear-gradient(180deg, #f9fafb, #eef2ff);
}

.admin-header {
  text-align: center;
  margin-bottom: 60px;
}

.admin-header h1 {
  font-size: 42px;
  font-weight: 800;
  color: #111827;
}

.admin-header p {
  color: #6b7280;
  margin-top: 10px;
}

.admin-grid {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.admin-card {
  background: white;
  border-radius: 18px;
  padding: 26px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 12px 35px rgba(0,0,0,0.06);
  transition: 0.25s ease;
}

.admin-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 60px rgba(0,0,0,0.12);
}

.admin-card h2 {
  font-size: 20px;
  margin-bottom: 6px;
}

.admin-card p {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.actions button {
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background: #eef2ff;
  color: #4f46e5;
  transition: 0.2s;
}

.actions button:hover {
  background: #4f46e5;
  color: white;
}

.logout {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: white;
}

.logout p {
  color: #cbd5e1;
}

.logout button {
  background: #ef4444;
  color: white;
}

.logout button:hover {
  background: #dc2626;
}

@media (max-width: 800px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }

  .admin-header h1 {
    font-size: 32px;
  }
}
</style>