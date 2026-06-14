<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'
import UserMenu from './UserMenu.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()
const router = useRouter()

function handleLogin() {
 auth0.loginWithRedirect({
  appState: {
    target: '/callback'
  }
})
}

const isOpen = ref(false)
const showFeatures = ref(false)

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

function go(path) {
  closeMenu()
  router.push(path)
}

function goToReviews() {
  closeMenu()

  router.push('/').then(() => {
    setTimeout(() => {
      const el = document.getElementById('reviews')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  })
}
</script>

<template>
  <header class="header">
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
            <a @click="go('/visionboard')">Vision Board</a>
            <a @click="go('/affirmations')">Affirmations</a>
          </div>
        </li>

        <li><a @click="goToReviews">Reviews</a></li>
      
       <li v-if="!auth0.isAuthenticated.value">
  <button class="login-btn" @click="handleLogin">
    Login
  </button>
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
  background: rgba(254, 204, 212, 0.9);
  backdrop-filter: blur(8px);
}

.navbar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.logo img {
  height: 60px;
}


.nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;
}
.nav a,
.nav button {
  font-weight: 700;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
}

.login-btn {
  font-weight: 700;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
}


.dropdown-wrap {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 30px;
  left: 0;
  background: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.open-btn {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
}

.close-btn {
  display: none;
}


@media (max-width: 900px) {
  .open-btn {
    display: block;
  }

  .nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 70px 20px;
    transform: translateX(100%);
    transition: 0.3s;
  }

  .nav.open {
    transform: translateX(0);
  }

  .close-btn {
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 26px;
    cursor: pointer;
    background: none;
    border: none;
  }
}
</style>