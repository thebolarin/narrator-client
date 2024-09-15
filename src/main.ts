import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import DefaultLayout from './components/DefaultLayout.vue'
import './index.css'

const app = createApp(App)

app.component('DefaultLayout', DefaultLayout)

app.use(router)
app.mount('#app')
