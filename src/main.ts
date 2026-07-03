import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// This will print all public variables visible to the client
console.log(import.meta.env)

const app = createApp(App)
// console.log(app.config)

app.use(router)

app.mount('#app')
