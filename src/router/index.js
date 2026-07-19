import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, useAuth0 } from '@auth0/auth0-vue'

import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Admin from '../views/Admin.vue'

import ChallengesHub from '../views/ChallengesHub.vue'
import ChallengesList from '../views/ChallengesList.vue'
import CreateChallenge from '../views/CreateChallenge.vue'
import ChallengeDetail from '../views/ChallengeDetail.vue'
import EditChallenge from '../views/EditChallenge.vue'
import ChallengesWheel from '../views/ChallengesWheel.vue'
import ChallengeTracker from '@/views/ChallengeTracker.vue'
import CompletedChallenges from '@/views/CompletedChallenges.vue'

import MoodQuiz from '../views/MoodQuiz.vue'
import MoodQuizResult from '@/views/MoodQuizResult.vue'

import MoodTracker from '@/views/MoodTracker.vue'
import Affirmations from '@/views/Affirmations.vue'
import Profile from '@/views/Profile.vue'
import UserAdmin from '@/views/UserAdmin.vue'

import Impressum from '@/views/Impressum.vue'
import Datenschutz from '@/views/Datenschutz.vue'

import ChallengeDelete from '@/views/ChallengeDelete.vue'
import AffirmationsAdmin from '@/views/AffirmationsAdmin.vue'

import MoodQuizAdmin from '@/views/MoodQuizAdmin.vue'
import MoodQuizRun from '@/views/MoodQuizRun.vue'

import VisionBoard from '@/views/VisionBoard.vue'
import CreateVisionBoard from '@/views/CreateVisionBoard.vue'
import EditVisionBoard from '@/views/EditVisionBoard.vue'
import VisionDetail from '@/views/VisionDetail.vue'
import AdminVisionboards from '@/views/AdminVisionboards.vue'



function adminGuard(to, from, next) {
  const auth = useAuth0()

  const roles =
    auth?.user?.value?.['https://your-app.example.com/roles'] ?? []

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


  { path: '/dashboard', component: Dashboard, beforeEnter: authGuard },
  { path: '/profile', component: Profile, beforeEnter: authGuard },

 
  { path: '/admin', component: Admin, beforeEnter: adminGuard },

  
  { path: '/challenges', component: ChallengesHub, beforeEnter: authGuard },
  { path: '/challenges/list', component: ChallengesList, beforeEnter: authGuard },
  { path: '/challenges/create', component: CreateChallenge, beforeEnter: authGuard },
  { path: '/challenges/wheel', component: ChallengesWheel, beforeEnter: authGuard },
  { path: '/challenges/completed', component: CompletedChallenges, beforeEnter: authGuard },
  { path: '/challenges/:id', component: ChallengeDetail, beforeEnter: authGuard },
  { path: '/challenges/:id/edit', component: EditChallenge, beforeEnter: authGuard },
  { path: '/challenges/:id/status', component: () => import('@/views/ChallengeStatus.vue'), beforeEnter: authGuard },
  { path: '/challenge/tracker', component: ChallengeTracker, beforeEnter: authGuard },

  
  { path: '/moodtracker', component: MoodTracker, beforeEnter: authGuard },

  { path: '/challenges/admin', component: ChallengeDelete, beforeEnter: authGuard },
  { path: '/affirmations/admin', component: AffirmationsAdmin, beforeEnter: authGuard },
  { path: '/moodquiz/admin', component: MoodQuizAdmin, beforeEnter: authGuard },
  
  { path: '/moodquiz', component: MoodQuiz, beforeEnter: authGuard },
  { path: '/quiz/run', component: MoodQuizRun, beforeEnter: authGuard },
  
  { path: '/quiz/result', component: MoodQuizResult, beforeEnter: authGuard },

  { path: '/affirmations', component: Affirmations, beforeEnter: authGuard },


  { path: '/users/admin', component: UserAdmin, beforeEnter: adminGuard},

  { path: '/visionboard', component: VisionBoard, beforeEnter: authGuard },
  { path: '/visionboard/create', component: CreateVisionBoard, beforeEnter: authGuard },
  { path: '/visionboard/:id', component: VisionDetail, beforeEnter: authGuard },
  { path: '/visionboard/:id/edit', component: EditVisionBoard, beforeEnter: authGuard },

  { path: '/challenges/:id', name: 'challenge-detail', component: () => import('@/views/ChallengeDetail.vue')},

  { path: '/admin/visionboards', component: AdminVisionboards, beforeEnter: adminGuard},

]


export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})