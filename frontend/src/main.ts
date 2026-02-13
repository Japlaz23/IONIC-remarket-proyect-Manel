import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'

import '@ionic/core/css/core.css'
import './assets/styles/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(IonicVue)
app.use(router)

router.isReady().then(() => {
	app.mount('#app')
})
