<template>
  <div class="admin-password-page-wrapper">
    <AdminSidebar @admin-logout="handleLogout" />
    
    <div class="main-section" :style="backgroundStyle">
      <header class="admin-header">
        <div class="header-container">
          <Logo 
            text="Smartweb"
            size="large"
            theme="light"
            :show-text="false"
          />
        </div>
      </header>
      
      <div class="page-header">
        <div class="page-header-content">
          <div class="page-header-left">
            <h1>パスワード変更</h1>
          </div>
          <div class="page-header-right">
            <span class="admin-welcome">ようこそ、管理者様！</span>
            <span class="current-date">{{ currentDate }}</span>
          </div>
        </div>
      </div>
      
      <div class="background-container">
        <div class="background-overlay"></div>
        <FloatingSymbols />
        
        <div class="content-container">
          <div class="password-form-container">
            <AdminPasswordChangeForm @passwordChanged="handlePasswordChanged" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '../components/organisms/AdminSidebar.vue'
import Logo from '../components/atoms/Logo.vue'
import FloatingSymbols from '../components/organisms/FloatingSymbols.vue'
import AdminPasswordChangeForm from '../components/molecules/AdminPasswordChangeForm.vue'
import backgroundImage from '../assets/background.jpg'

export default {
  name: 'AdminAccountPasswordPage',
  components: {
    AdminSidebar,
    Logo,
    FloatingSymbols,
    AdminPasswordChangeForm
  },
  data() {
    return {
      currentDate: ''
    }
  },
  computed: {
    backgroundStyle() {
      return {
        background: `linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
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
    handleLogout() {
      // Clear admin data
      localStorage.removeItem('isAdminLoggedIn')
      localStorage.removeItem('adminUser')
      
      // Navigate to admin login
      this.$router.push({ name: 'AdminLogin' })
    },
    handlePasswordChanged(data) {
      console.log('Admin password changed:', data)
      // Handle admin password change success
      // You can add additional logic here like redirecting or showing notifications
    }
  }
}
</script>

<style scoped>
.admin-password-page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-section {
  flex: 1;
  margin-left: 250px;
  position: relative;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header-left h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.page-header-right {
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

.background-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 128px);
  min-height: calc(100vh - 128px);
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

.password-form-container {
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
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
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .page-header-right {
    align-items: flex-start;
    gap: 2px;
  }
  
  .content-container {
    padding: 20px;
  }
  
  .password-form-container {
    max-width: 100%;
  }
  
  .background-container {
    height: calc(100vh - 160px);
    min-height: calc(100vh - 160px);
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
  
  .content-container {
    padding: 15px;
  }
  
  .background-container {
    height: calc(100vh - 140px);
    min-height: calc(100vh - 140px);
  }
}
</style> 