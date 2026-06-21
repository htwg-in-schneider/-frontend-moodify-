import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, useAuth0 } from '@auth0/auth0-vue'

/* PAGES */
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Admin from '../views/Admin.vue'

/* CHALLENGES */
import ChallengesHub from '../views/ChallengesHub.vue'
import ChallengesList from '../views/ChallengesList.vue'
import CreateChallenge from '../views/CreateChallenge.vue'
import ChallengeDetail from '../views/ChallengeDetail.vue'
import EditChallenge from '../views/EditChallenge.vue'
import ChallengesWheel from '../views/ChallengesWheel.vue'
import ChallengeTracker from '@/views/ChallengeTracker.vue'
import CompletedChallenges from '@/views/CompletedChallenges.vue'

/* MOOD */
import MoodQuiz from '../views/MoodQuiz.vue'
import MoodQuizF1 from '@/views/MoodQuizF1.vue'
import MoodQuizF2 from '@/views/MoodQuizF2.vue'
import MoodQuizF3 from '@/views/MoodQuizF3.vue'
import MoodQuizF4 from '@/views/MoodQuizF4.vue'
import MoodQuizF5 from '@/views/MoodQuizF5.vue'
import MoodQuizResult from '@/views/MoodQuizResult.vue'

import MoodTracker from '@/views/MoodTracker.vue'
import Affirmations from '@/views/Affirmations.vue'
import VisionBoard from '@/views/VisionBoard.vue'
import VisionDetail from '@/views/VisionDetail.vue'
import Profile from '@/views/Profile.vue'

/* LEGAL */
import Impressum from '@/views/Impressum.vue'
import Datenschutz from '@/views/Datenschutz.vue'

import ChallengeDelete from '@/views/ChallengeDelete.vue'
import AffirmationsAdmin from '@/views/AffirmationsAdmin.vue'

import MoodQuizAdmin from '@/views/MoodQuizAdmin.vue'
/* ---------------------------
   SAFE ADMIN GUARD (FIXED)
----------------------------*/
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

/* ---------------------------
   ROUTES
----------------------------*/
const routes = [

  /* PUBLIC */
  { path: '/', component: Home },
  { path: '/impressum', component: Impressum },
  { path: '/datenschutz', component: Datenschutz },

  /* AUTH */
  { path: '/dashboard', component: Dashboard, beforeEnter: authGuard },
  { path: '/profile', component: Profile, beforeEnter: authGuard },

  /* ADMIN */
  { path: '/admin', component: Admin, beforeEnter: adminGuard },

  /* CHALLENGES */
  { path: '/challenges', component: ChallengesHub, beforeEnter: authGuard },
  { path: '/challenges/list', component: ChallengesList, beforeEnter: authGuard },
  { path: '/challenges/create', component: CreateChallenge, beforeEnter: authGuard },
  { path: '/challenges/wheel', component: ChallengesWheel, beforeEnter: authGuard },
  { path: '/challenges/completed', component: CompletedChallenges, beforeEnter: authGuard },
  { path: '/challenges/:id', component: ChallengeDetail, beforeEnter: authGuard },
  { path: '/challenges/:id/edit', component: EditChallenge, beforeEnter: authGuard },
  { path: '/challenges/:id/status', component: () => import('@/views/ChallengeStatus.vue'), beforeEnter: authGuard },
  { path: '/challenge/tracker', component: ChallengeTracker, beforeEnter: authGuard },

  /* MOOD */
  { path: '/moodtracker', component: MoodTracker, beforeEnter: authGuard },

  { path: '/challenges/admin', component: ChallengeDelete, beforeEnter: authGuard },
  { path: '/affirmations/admin', component: AffirmationsAdmin, beforeEnter: authGuard },
  { path: '/moodquiz/admin', component: MoodQuizAdmin, beforeEnter: authGuard },
  /* QUIZ */
  { path: '/moodquiz', component: MoodQuiz, beforeEnter: authGuard },
  { path: '/quiz/question/1', component: MoodQuizF1, beforeEnter: authGuard },
  { path: '/quiz/question/2', component: MoodQuizF2, beforeEnter: authGuard },
  { path: '/quiz/question/3', component: MoodQuizF3, beforeEnter: authGuard },
  { path: '/quiz/question/4', component: MoodQuizF4, beforeEnter: authGuard },
  { path: '/quiz/question/5', component: MoodQuizF5, beforeEnter: authGuard },
  { path: '/quiz/result', component: MoodQuizResult, beforeEnter: authGuard },

  /* VISUAL */
  { path: '/affirmations', component: Affirmations, beforeEnter: authGuard },
  { path: '/visionboard', component: VisionBoard, beforeEnter: authGuard },
  { path: '/visionboard/:id', component: VisionDetail, beforeEnter: authGuard },


  {
  path: '/challenges/:id',
  name: 'challenge-detail',
  component: () => import('@/views/ChallengeDetail.vue')
}
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})