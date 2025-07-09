<template>
  <div class="account-template">
    <div class="account-layout">
      <Sidebar @logout="handleLogout" />
      
      <div class="main-section">
        <Header :user="currentUser" @logout="handleLogout" />
        
        <div class="background-container">
          <div class="background-overlay"></div>
          <FloatingSymbols />
          
          <div class="content-container">
            <slot />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu toggle -->
    <button 
      class="mobile-menu-toggle"
      @click="toggleMobileMenu"
      :class="{ active: mobileMenuOpen }"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</template>

<script>
import Header from '../components/organisms/Header.vue'
import Sidebar from '../components/organisms/Sidebar.vue'
import FloatingSymbols from '../components/organisms/FloatingSymbols.vue'

export default {
  name: 'AccountTemplate',
  components: {
    Header,
    Sidebar,
    FloatingSymbols
  },
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  computed: {
    currentUser() {
      // Get user from localStorage or return default
      try {
        const userData = localStorage.getItem('user')
        return userData ? JSON.parse(userData) : { name: 'クライアント' }
      } catch (error) {
        return { name: 'クライアント' }
      }
    }
  },
  mounted() {
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.mobileMenuOpen = false
        document.body.classList.remove('mobile-menu-open')
      }
    })
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
      // Add class to body for mobile menu styling
      document.body.classList.toggle('mobile-menu-open', this.mobileMenuOpen)
    },
    handleLogout() {
      // Clear user data
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      
      // Navigate to login
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.account-template {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.account-layout {
  display: flex;
  min-height: 100vh;
}

.main-section {
  flex: 1;
  margin-left: 250px;
  position: relative;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  background-image: url('/assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.background-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 64px);
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

.content-container {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
}

.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-menu-toggle span {
  width: 20px;
  height: 2px;
  background: white;
  margin: 2px 0;
  transition: 0.3s;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(-45deg) translate(-4px, 4px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(45deg) translate(-4px, -4px);
}

/* Responsive */
@media (max-width: 768px) {
  .main-section {
    margin-left: 0;
    width: 100%;
  }
  
  .content-container {
    padding: 20px;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
}

@media (max-width: 480px) {
  .content-container {
    padding: 15px;
  }
}
</style> 