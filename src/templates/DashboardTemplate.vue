<template>
  <div class="dashboard-template">
    <div class="dashboard-layout">
      <Sidebar @logout="handleLogout" />
      
      <div class="main-section">
        <Header :user="currentUser" @logout="handleLogout" />
        
        <main class="main-content">
          <div class="dashboard-header">
            <div class="header-left">
              <h1>ダッシュボード</h1>
            </div>
            
            <div class="header-right">
              <span class="welcome-message">ようこそ、クライアント様！</span>
              <div class="date-range">
                <DateRangePicker 
                  :startDate="startDate" 
                  :endDate="endDate" 
                  @dateRangeChanged="handleDateRangeChange"
                />
              </div>
            </div>
          </div>
          
          <div class="dashboard-content">
            <slot :filteredData="validFilteredData" :dataKey="dataKey" />
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
import DateRangePicker from '../components/molecules/DateRangePicker.vue'
import Button from '../components/atoms/Button.vue'
import { getFilteredData, getAvailableDateRange, financialData } from '../data/financialData.js'

export default {
  name: 'DashboardTemplate',
  components: {
    Header,
    Sidebar,
    DateRangePicker,
    Button
  },
  data() {
    // Get available date range with fallback
    let availableRange
    try {
      availableRange = getAvailableDateRange()
    } catch (error) {
      console.error('Error getting available date range:', error)
      availableRange = {
        minDate: new Date(2025, 4, 1), // May 1, 2025
        maxDate: new Date(2025, 6, 31)  // July 31, 2025
      }
    }
    
    const startDate = availableRange.minDate || new Date(2025, 4, 1)
    const endDate = availableRange.maxDate || new Date(2025, 6, 31)
    
    // Initialize filteredData immediately to avoid null
    let initialFilteredData
    try {
      initialFilteredData = getFilteredData(startDate, endDate)
    } catch (error) {
      console.error('Error getting initial filtered data:', error)
      initialFilteredData = financialData
    }
    
    return {
      mobileMenuOpen: false,
      startDate: startDate,
      endDate: endDate,
      filteredData: initialFilteredData,
      dataKey: 0 // Used to force re-render when data changes
    }
  },
  computed: {
    dateRange() {
      return getAvailableDateRange()
    },
    validFilteredData() {
      // Always return valid data, never null
      return this.filteredData || financialData
    },
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
    // Already initialized in data function, but ensure it's updated
    this.updateFilteredData()
    
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
    handleDateRangeChange({ startDate, endDate }) {
      this.startDate = startDate
      this.endDate = endDate
      this.updateFilteredData()
    },
    handleLogout() {
      // Clear user data
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      
      // Navigate to login
      this.$router.push({ name: 'Login' })
    },
    updateFilteredData() {
      if (this.startDate && this.endDate) {
        try {
          const newFilteredData = getFilteredData(this.startDate, this.endDate)
          
          // Only update if data actually changed
          if (JSON.stringify(newFilteredData) !== JSON.stringify(this.filteredData)) {
            this.filteredData = newFilteredData
            this.dataKey++ // Force re-render of child components
          }
        } catch (error) {
          console.error('Error updating filtered data:', error)
          this.filteredData = financialData
          this.dataKey++
        }
      }
    }
  }
}
</script>

<style scoped>
.dashboard-template {
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

.welcome-message {
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.date-range {
  display: flex;
  align-items: center;
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
  
  .date-range {
    width: 100%;
    max-width: 300px;
  }
  
  .header-right .btn {
    white-space: nowrap;
    flex-shrink: 0;
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
  
  .welcome-message {
    font-size: 0.875rem;
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
  
  .date-range {
    width: 100%;
    max-width: none;
  }
}
</style> 