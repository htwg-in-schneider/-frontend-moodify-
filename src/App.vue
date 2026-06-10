<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'


import { watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const { isAuthenticated, user } = useAuth0()
const router = useRouter()

watch(isAuthenticated, (loggedIn) => {
  if (!loggedIn) return


  
  const role = 'user' 

  if (role === 'admin') {
    router.replace('/admin')
  } else {
    router.replace('/dashboard')
  }
})
</script>

<template>
  <div class="app">
    <Navbar />

    <main class="content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 10px 0; /* kleiner & kompakter */
}
</style>