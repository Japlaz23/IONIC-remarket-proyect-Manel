import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'

/* Ionic Core CSS - Essential Only */
import '@ionic/core/css/core.css'

/* Custom styles */
import './assets/styles/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(IonicVue)
app.use(router)

app.mount('#app')
