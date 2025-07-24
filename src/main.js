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

// Debug functionality (previously in debug.js)
console.log('Debug functionality loaded')

// Check if modules are loading correctly
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, checking module loading...')
  
  // Check if Vue app is mounted
  setTimeout(() => {
    const app = document.getElementById('app')
    if (app && app.innerHTML.trim() === '') {
      console.error('Vue app not mounted - possible module loading issue')
    } else {
      console.log('Vue app appears to be mounted correctly')
    }
  }, 2000)
})

// Track network errors
const originalFetch = window.fetch
window.fetch = function(...args) {
  return originalFetch.apply(this, args).catch(error => {
    console.error('Fetch error:', error, 'URL:', args[0])
    throw error
  })
}

// Track dynamic import errors
if (typeof window.__import === 'undefined') {
  const scriptElements = document.querySelectorAll('script[type="module"]')
  console.log('Module scripts found:', scriptElements.length)
}

const app = createApp(App)

// Add router error handling
router.onError((error) => {
  console.error('Router error:', error)
})

app.use(router)
app.mount('#app') 