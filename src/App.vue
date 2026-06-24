<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

import { watch, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0()
const router = useRouter()

const role = ref(null)

async function fetchRole() {
  console.log("fetchRole CALLED")

  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "https://moodify-api",
        scope: "openid profile email"
      }
    })

    console.log("ACCESS TOKEN:", token)

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.log(await res.text())
      return null
    }

    const data = await res.json()
    role.value = data.role

    return data.role

  } catch (e) {
    console.error("Role fetch failed", e)

    if (e?.error === "consent_required") {
      await loginWithRedirect({
        authorizationParams: {
          audience: "https://moodify-api",
          scope: "openid profile email",
          prompt: "consent"
        }
      })
    }

    return null
  }
}

watch(isAuthenticated, async (loggedIn) => {
  if (!loggedIn) return

  const r = await fetchRole()

  if (r === 'ADMIN') {
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

