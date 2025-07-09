<template>
  <div class="system-template">
    <div class="dashboard-layout">
      <Sidebar @logout="handleLogout" />
      
      <div class="main-section">
        <Header :user="currentUser" @logout="handleLogout" />
        
        <main class="main-content">
          <div class="dashboard-header">
            <div class="header-left">
              <h1>{{ title }}</h1>
            </div>
            <div class="header-right">
              <Button 
                variant="primary" 
                @click="handleSaveClick"
                :disabled="isLoading"
                class="save-button"
              >
                <span v-if="isLoading">保存中...</span>
                <span v-else>設定</span>
              </Button>
            </div>
          </div>
          
          <div class="dashboard-content">
            <slot />
          </div>
        </main>
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
import Button from '../components/atoms/Button.vue'

export default {
  name: 'SystemTemplate',
  components: {
    Header,
    Sidebar,
    Button
  },
  props: {
    title: {
      type: String,
      default: 'システム管理'
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      isLoading: false
    }
  },
  computed: {
    currentUser() {
      // Get user from localStorage or return default
      try {
        const userData = localStorage.getItem('user')
        return userData ? JSON.parse(userData) : { name: 'システム管理者' }
      } catch (error) {
        return { name: 'システム管理者' }
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
    },
    handleSaveClick() {
      this.isLoading = true
      this.$emit('save-click')
      
      // Reset loading state after a delay
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  },
  emits: ['save-click']
}
</script>

<style scoped>
.system-template {
  min-height: 100vh;
  background: #f8fafc;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-section {
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  background: #f8fafc;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-left h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.save-button {
  background: #1e3a8a;
  color: white;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.dashboard-content {
  flex: 1;
  padding: 0px 30px 30px 30px;
  overflow-y: auto;
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
  
  .dashboard-header {
    padding: 15px 20px;
    padding-left: 70px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }
  
  .header-right {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .dashboard-content {
    padding: 0px 20px 20px 20px;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .header-left h1 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    padding: 12px 15px;
    padding-left: 60px;
  }
  
  .dashboard-content {
    padding: 0px 15px 15px 15px;
  }
  
  .header-left h1 {
    font-size: 1.25rem;
  }
  
  .header-right {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
  }
}
</style> 