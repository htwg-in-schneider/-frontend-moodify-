import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import './assets/stylesheet.css'

import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

const pinia = createPinia()



app.use(router)
app.use(pinia)

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin + '/-frontend-moodify-/'
    }
  })
)


app.mount('#app')