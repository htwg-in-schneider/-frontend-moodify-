<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
const router = useRouter()

function goProfile() {
  router.push('/profile')
}

function handleLogin() {
  loginWithRedirect()
}



function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin + '/-frontend-moodify-/'
    }
  })
}
</script>


<template>
  <div class="user-menu">

   
    <button
      v-if="!isAuthenticated"
      class="btn login"
      @click="handleLogin"
    >
      Login
    </button>


    <div v-else class="logged">

  
      <img
        v-if="user?.picture"
        :src="user.picture"
        class="avatar"
        alt="User Avatar"
        @click="goProfile"
        title="Profil öffnen"
      />

      <div class="info">

        <span class="email">
          {{ user?.email }}
        </span>

        <button class="btn logout" @click="handleLogout">
          Logout
        </button>

      </div>

    </div>

  </div>
</template>

<style scoped>
.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  cursor: pointer;
  transition: 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
}

.info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.email {
  font-size: 12px;
  opacity: 0.8;
}

.btn {
  padding: 6px 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.login {
  background: #ff8fa3;
  color: white;
}

.logout {
  background: #e5e7eb;
  color: #111;
}

.btn:hover {
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .email {
    display: none;
  }
}
</style>