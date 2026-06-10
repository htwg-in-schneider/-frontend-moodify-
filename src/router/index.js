import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'
import { useAuth0 } from '@auth0/auth0-vue'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import JoinUs from '@/views/JoinUs.vue'

import Dashboard from '../views/Dashboard.vue'
import Admin from '../views/Admin.vue'

import Challenges from '../views/Challenges.vue'
import MoodTracker from '../views/MoodTracker.vue'
import Affirmations from '../views/Affirmations.vue'
import VisionBoard from '../views/VisionBoard.vue'

import Profile from '../views/Profile.vue'


function adminGuard(to, from, next) {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated.value) {
    return next('/login')
  }

  const role = user.value?.role || 'user'

  if (role === 'admin') {
    next()
  } else {
    next('/dashboard')
  }
}

const routes = [

  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/joinus', component: JoinUs },


  { path: '/dashboard', component: Dashboard, beforeEnter: authGuard },
  { path: '/challenges', component: Challenges, beforeEnter: authGuard },
  { path: '/moodtracker', component: MoodTracker, beforeEnter: authGuard },
  { path: '/affirmations', component: Affirmations, beforeEnter: authGuard },
  { path: '/visionboard', component: VisionBoard, beforeEnter: authGuard },
  { path: '/profile', component: Profile, beforeEnter: authGuard },


  { path: '/admin', component: Admin, beforeEnter: adminGuard }
]

const router = createRouter({
  history: createWebHistory('/-frontend-moodify-/'),
  routes
})

export default router