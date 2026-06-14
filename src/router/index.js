import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'

import Home from '../views/Home.vue'
import Callback from '../views/Callback.vue'

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

const routes = [
  
  { path: '/', component: Home },

  { path: '/impressum', component: Impressum },
  { path: '/datenschutz', component: Datenschutz },


  { path: '/callback', component: Callback },

   { path: '/dashboard', component: Dashboard },
  { path: '/admin', component: Admin },

  { path: '/challenges', component: Challenges, beforeEnter: authGuard },
  { path: '/challenges/create', component: CreateChallenge, beforeEnter: authGuard },
  { path: '/challenges/:id', component: ChallengeDetail, beforeEnter: authGuard },
  { path: '/challenges/:id/edit', component: EditChallenge, beforeEnter: authGuard },

  { path: '/moodtracker', component: MoodTracker, beforeEnter: authGuard },
  { path: '/affirmations', component: Affirmations, beforeEnter: authGuard },
  { path: '/visionboard', component: VisionBoard, beforeEnter: authGuard },
  { path: '/profile', component: Profile, beforeEnter: authGuard }
]

export default createRouter({
  history: createWebHistory('/-frontend-moodify-/'),
  routes
})