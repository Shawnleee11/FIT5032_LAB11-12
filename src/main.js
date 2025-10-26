// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// 样式 & UI
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

// 路由（一定要确保已创建 src/router/index.js）
import router from './router'

const app = createApp(App)

// 顺序：先 use(PrimeVue)、再 use(router)，最后 mount
app.use(PrimeVue)
app.use(router)

app.mount('#app')
