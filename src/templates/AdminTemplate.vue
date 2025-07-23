<template>
  <div class="admin-template">
    <div class="admin-layout">
      <AdminSidebar @admin-logout="handleLogout" />
      
      <div class="main-section">
        <header class="admin-header">
          <div class="header-container">
            <Logo 
              text="Smartweb"
              size="large"
              theme="light"
              :show-text="false"
            />
            
            <div class="header-right">
              <span class="admin-welcome">ようこそ、管理者様！</span>
              <span class="current-date">{{ currentDate }}</span>
            </div>
          </div>
        </header>
        
        <div class="page-header">
          <div class="page-header-content">
            <h1>{{ title }}</h1>
          </div>
        </div>
        
        <main class="main-content">
          <div class="admin-content">
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
import AdminSidebar from '../components/organisms/AdminSidebar.vue'
import Logo from '../components/atoms/Logo.vue'

export default {
  name: 'AdminTemplate',
  components: {
    AdminSidebar,
    Logo
  },
  props: {
    title: {
      type: String,
      default: 'システム全体の状態'
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      currentDate: ''
    }
  },
  computed: {
    currentAdmin() {
      // Get admin from localStorage or return default
      try {
        const adminData = localStorage.getItem('adminUser')
        return adminData ? JSON.parse(adminData) : { name: '管理者' }
      } catch (error) {
        return { name: '管理者' }
      }
    }
  },
  mounted() {
    // Set current date
    this.updateCurrentDate()
    
    // Update date every minute
    setInterval(() => {
      this.updateCurrentDate()
    }, 60000)
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.mobileMenuOpen = false
        document.body.classList.remove('admin-mobile-menu-open')
      }
    })
  },
  methods: {
    updateCurrentDate() {
      const now = new Date()
      this.currentDate = now.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
      // Add class to body for mobile menu styling
      document.body.classList.toggle('admin-mobile-menu-open', this.mobileMenuOpen)
    },
    handleLogout() {
      // Clear admin data
      localStorage.removeItem('isAdminLoggedIn')
      localStorage.removeItem('adminUser')
      
      // Navigate to admin login
      this.$router.push({ name: 'AdminLogin' })
    }
  }
}
</script>

<style scoped>
.admin-template {
  min-height: 100vh;
  background: #f1f5f9;
}

.admin-layout {
  display: flex;
  min-height: 100vh;
}

.main-section {
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
}

.admin-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: auto;
  margin: 0 auto;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.page-header-content {
  padding: 20px 30px;
}

.page-header-content h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.admin-welcome {
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

.current-date {
  font-size: 0.85rem;
  color: #6b7280;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admin-content {
  flex: 1;
  padding: 30px 0;
  overflow-y: auto;
  width: 100%;
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
  
  .header-container {
    padding: 10px 20px;
    padding-left: 70px;
  }
  
  .page-header-content {
    padding: 15px 20px;
  }
  
  .header-right {
    align-items: flex-start;
    gap: 2px;
  }
  
  .admin-content {
    padding: 20px 0;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .page-header-content h1 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 8px 15px;
    padding-left: 60px;
  }
  
  .page-header-content {
    padding: 12px 15px;
  }
  
  .admin-content {
    padding: 15px 0;
  }
  
  .page-header-content h1 {
    font-size: 1.25rem;
  }
}
</style> 