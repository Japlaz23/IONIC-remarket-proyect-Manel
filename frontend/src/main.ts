import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'

import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import 'sweetalert2/dist/sweetalert2.min.css'
import './assets/styles/main.css'


import App from './App.vue'
import router from './router'
import Vue3Pagination from '@hennge/vue3-pagination';

const app = createApp(App)


app.use(createPinia())
app.use(IonicVue)
app.use(router)
app.component('Vue3Pagination', Vue3Pagination)

router.isReady().then(() => {
	app.mount('#app')
})
