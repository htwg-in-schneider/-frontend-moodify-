import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import './assets/stylesheet.css'

import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

app.use(createPinia())

app.use(router)


const redirectUri = import.meta.env.DEV
  ? 'http://localhost:5173'
  : 'https://htwg-in-schneider.github.io/-frontend-moodify-/'

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: redirectUri
    }
  })
)

app.mount('#app')