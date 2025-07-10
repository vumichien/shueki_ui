<template>
  <div class="login-template">
    <Header />
    
    <div class="main-content" :style="backgroundStyle">
      <div class="background-container">
        <div class="background-overlay"></div>
        <FloatingSymbols />
        
        <div class="login-container">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/organisms/Header.vue'
import FloatingSymbols from '../components/organisms/FloatingSymbols.vue'
import backgroundImage from '../assets/background.jpg'

export default {
  name: 'LoginTemplate',
  components: {
    Header,
    FloatingSymbols
  },
  computed: {
    backgroundStyle() {
      return {
        background: `url(${backgroundImage}) center/cover no-repeat`
      }
    }
  }
}
</script>

<style scoped>
.login-template {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  position: relative;
}

.background-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.login-container {
  position: relative;
  z-index: 3;
  background: #FFFFFF;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 400px;
  width: 90%;
}

@media (max-width: 768px) {
  .login-container {
    max-width: 350px;
    padding: 30px;
  }
}
</style> 