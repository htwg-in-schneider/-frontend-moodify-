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
    domain: "dev-5l3w1yvav5vmutet.us.auth0.com",
    clientId: "f517AmsI8R90cmdb0614ixEo3Z1Wj2eO",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://moodify-api'
    }
  })
)


app.mount('#app')