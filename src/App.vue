<template>
  <router-view />
</template>

<script>
// Import favicon assets to force inclusion in build
import favicon16 from './assets/favicon_16x16.png?url'
import favicon32 from './assets/favicon_32x32.png?url'

export default {
  name: 'App',
  mounted() {
    // Set favicon dynamically
    const setFavicon = () => {
      const link16 = document.querySelector('link[rel="icon"][sizes="16x16"]')
      const link32 = document.querySelector('link[rel="icon"][sizes="32x32"]')
      
      if (link16) link16.href = favicon16
      if (link32) link32.href = favicon32
    }
    
    setFavicon()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
}
</style> 