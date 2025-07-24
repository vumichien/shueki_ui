import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Add error handling for Vercel debugging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

const app = createApp(App)

// Add router error handling
router.onError((error) => {
  console.error('Router error:', error)
})

app.use(router)
app.mount('#app') 