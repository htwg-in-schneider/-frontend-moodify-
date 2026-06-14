<script setup>
import { onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const auth0 = useAuth0()
const router = useRouter()

onMounted(async () => {
  // ⛔ KEIN handleRedirectCallback!
  // ⛔ KEIN checkSession!

  const user = auth0.user.value

  const roles =
    user?.['https://your-app.example.com/roles'] || []

  if (roles.includes('admin')) {
    router.replace('/admin')
  } else {
    router.replace('/dashboard')
  }
})
</script>

<template>
  <div>Logging you in...</div>
</template>