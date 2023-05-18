import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import vantConfig from './vant-config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vantConfig)

app.mount('#app')
