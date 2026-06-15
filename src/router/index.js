import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, useAuth0 } from '@auth0/auth0-vue'

import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Admin from '../views/Admin.vue'

import Challenges from '../views/Challenges.vue'
import CreateChallenge from '../views/CreateChallenge.vue'
import ChallengeDetail from '../views/ChallengeDetail.vue'
import EditChallenge from '../views/EditChallenge.vue'

import MoodTracker from '../views/MoodTracker.vue'
import Affirmations from '../views/Affirmations.vue'
import VisionBoard from '../views/VisionBoard.vue'
import Profile from '../views/Profile.vue'

import Impressum from '../views/Impressum.vue'
import Datenschutz from '../views/Datenschutz.vue'

/* 🔐 ADMIN GUARD */
function adminGuard(to, from, next) {
  const auth = useAuth0()

  const roles =
    auth.user.value?.['https://your-app.example.com/roles'] || []

  if (roles.includes('admin')) {
    next()
  } else {
    next('/dashboard')
  }
}

const routes = [
  { path: '/', component: Home },

  { path: '/impressum', component: Impressum },
  { path: '/datenschutz', component: Datenschutz },

  /* AUTH PROTECTED */
  { path: '/dashboard', component: Dashboard, beforeEnter: authGuard },
  { path: '/profile', component: Profile, beforeEnter: authGuard },

  /* ADMIN ONLY */
  { path: '/admin', component: Admin, beforeEnter: adminGuard },

  /* CHALLENGES (USER + ADMIN) */
  { path: '/challenges', component: Challenges, beforeEnter: authGuard },
  { path: '/challenges/create', component: CreateChallenge, beforeEnter: authGuard },
  { path: '/challenges/:id', component: ChallengeDetail, beforeEnter: authGuard },
  { path: '/challenges/:id/edit', component: EditChallenge, beforeEnter: authGuard },

  /* OTHER FEATURES */
  { path: '/moodtracker', component: MoodTracker, beforeEnter: authGuard },
  { path: '/affirmations', component: Affirmations, beforeEnter: authGuard },
  { path: '/visionboard', component: VisionBoard, beforeEnter: authGuard }
]

export default createRouter({
  history: createWebHistory('/-frontend-moodify-/'),
  routes
})