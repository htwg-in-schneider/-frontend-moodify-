<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'
import UserMenu from './UserMenu.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()
const router = useRouter()

const isOpen = ref(false)
const showFeatures = ref(false)

const { loginWithRedirect } = useAuth0()

const login = () => {
  loginWithRedirect()
}

const isAuthenticated = computed(() => auth0.isAuthenticated.value)

const roles = computed(() => {
  return auth0.user.value?.['https://your-app.example.com/roles'] ?? []
})

const isAdmin = computed(() => roles.value.includes('admin'))

function go(path) {
  router.push(path)
  closeMenu()
}

function openMenu() {
  isOpen.value = true
}

function closeMenu() {
  isOpen.value = false
  showFeatures.value = false
}

function toggleFeatures() {
  showFeatures.value = !showFeatures.value
}

function goToReviews() {
  closeMenu()
  router.push('/').then(() => {
    setTimeout(() => {
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  })
}

function demoLogin() {
  alert(
    "Demo Zugang:\n\nE-Mail: kardelenkantar49@gmail.com\nPasswort:Karege21"
  )
}
</script>

<template>
  <header class="header">

    
    <div v-if="isOpen" class="backdrop" @click="closeMenu"></div>

    <nav class="navbar">

      <div class="logo">
        <img :src="logo" />
      </div>

      <button class="open-btn" @click="openMenu">☰</button>

      <ul class="nav" :class="{ open: isOpen }">

        <button class="close-btn" @click="closeMenu">✕</button>

        <li><a @click="go('/')">Home</a></li>

        <li class="dropdown-wrap">
          <button @click="toggleFeatures">
            Features
          </button>

          <div v-show="showFeatures" class="dropdown">
            <a @click="go('/moodtracker')">Mood Tracker</a>
            <a @click="go('/challenges')">Challenges</a>
            <a @click="go('/affirmations')">Affirmations</a>
            <a @click="go('/moodquiz')">Mood Quiz</a>
             <a @click="go('/visionboard')">Visionboard</a>
          </div>
        </li>

        <li><a @click="goToReviews">Reviews</a></li>

        <li><a @click="demoLogin">🚀 Demo ausprobieren</a></li>

        <li v-if="isAuthenticated && !isAdmin">
          <button class="login-btn" @click="go('/dashboard')">Dashboard</button>
        </li>

        <li v-if="isAuthenticated && isAdmin">
          <button class="login-btn" @click="go('/admin')">Admin</button>
        </li>

        <li v-if="!isAuthenticated">
          <button class="login-btn" @click="login">Login</button>
        </li>

      </ul>

      <UserMenu />

    </nav>
  </header>
</template>

<style scoped>

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(244, 206, 232, 0.75);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}


.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 40;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
}


.logo img {
  height: 60px;
}


.nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 24px;
  list-style: none;
  align-items: center;
}


.nav a,
.nav button {
  font-weight: 600;
  font-size: 15px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 8px;
}

.nav a:hover,
.nav button:hover {
  background: rgba(99, 102, 241, 0.08);
}


.login-btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: rgb(218, 121, 197);
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
}


.dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}


.open-btn {
  display: none;
}

.close-btn {
  display: none;
}


@media (max-width: 900px) {

  .open-btn {
    display: block;
    font-size: 28px;
    background: none;
    border: none;
  }

  .nav {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    padding: 80px 20px;
    gap: 16px;


    display: none;
    z-index: 50;
  }

  .nav.open {
    display: flex;
  }

  .close-btn {
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 24px;
  }

  .dropdown {
    position: static;
    box-shadow: none;
    padding: 0;
  }
}
</style>