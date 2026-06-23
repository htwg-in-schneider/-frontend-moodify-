import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import './assets/stylesheet.css'

import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

app.use(createPinia())

app.use(router)


app.use(
  createAuth0({
    domain: "dev-5l3w1yvav5vmutet.us.auth0.com",
    clientId: "f517AmsI8R90cmdb0614ixEo3Z1Wj2eO",
    authorizationParams: {
authorizationParams: {
  redirect_uri: window.location.origin + import.meta.env.BASE_URL,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE
}
    }
  })
)

app.mount('#app')