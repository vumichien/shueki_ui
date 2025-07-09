<template>
  <div class="annual-revenue-template">
    <div class="annual-revenue-layout">
      <Sidebar @logout="handleLogout" />
      
      <div class="main-section">
        <Header :user="currentUser" @logout="handleLogout" />
        
        <main class="main-content">
          <div class="annual-revenue-header">
            <div class="header-left">
              <h1>通期の収益レポート</h1>
            </div>
            
            <div class="header-right">
              <span class="welcome-message">年間収益の分析レポート</span>
                              <div class="year-range">
                  <MonthRangePicker 
                    :selectedYear="selectedYear" 
                    @yearChanged="handleYearChange"
                  />
                </div>
            </div>
          </div>
          
          <div class="annual-revenue-content">
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
import MonthRangePicker from '../components/molecules/MonthRangePicker.vue'
import Button from '../components/atoms/Button.vue'
import { getFilteredYearlyData, getYearlyMonthlyData, getAvailableYears } from '../data/financialData.js'

export default {
  name: 'AnnualRevenueTemplate',
  components: {
    Header,
    Sidebar,
    MonthRangePicker,
    Button
  },
  data() {
    // Initialize with default year
    const availableYears = getAvailableYears()
    const defaultYear = availableYears.includes(2025) ? 2025 : availableYears[availableYears.length - 1]
    
    // Load persisted year if available
    let persistedYear = null
    try {
      const persistedYearStr = localStorage.getItem('monthRangePicker_selectedYear')
      if (persistedYearStr) {
        persistedYear = parseInt(persistedYearStr, 10)
      }
    } catch (error) {
      console.warn('Error loading persisted year in template:', error)
    }
    
    // Use persisted year if available, otherwise use default
    const initialYear = persistedYear || defaultYear
    
    // Initialize filteredData immediately to avoid null
    let initialFilteredData
    try {
      initialFilteredData = getFilteredYearlyData(initialYear)
    } catch (error) {
      console.error('Error getting initial yearly filtered data:', error)
      initialFilteredData = getYearlyMonthlyData(initialYear)
    }
    
    return {
      mobileMenuOpen: false,
      selectedYear: initialYear,
      filteredData: initialFilteredData,
      dataKey: 0 // Used to force re-render when data changes
    }
  },
  computed: {
    validFilteredData() {
      // Always return valid data, never null
      return this.filteredData || getYearlyMonthlyData(this.selectedYear)
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
    handleYearChange({ year }) {
      this.selectedYear = year
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
      if (this.selectedYear) {
        try {
          const newFilteredData = getFilteredYearlyData(this.selectedYear)
          
          // Only update if data actually changed
          if (JSON.stringify(newFilteredData) !== JSON.stringify(this.filteredData)) {
            this.filteredData = newFilteredData
            this.dataKey++ // Force re-render of child components
          }
        } catch (error) {
          console.error('Error updating yearly filtered data:', error)
          this.filteredData = getYearlyMonthlyData(this.selectedYear)
          this.dataKey++
        }
      }
    }
  }
}
</script>

<style scoped>
.annual-revenue-template {
  min-height: 100vh;
  background: #f8fafc;
}

.annual-revenue-layout {
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

.annual-revenue-header {
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

.year-range {
  display: flex;
  align-items: center;
}

.annual-revenue-content {
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
  
  .annual-revenue-header {
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
  
  .year-range {
    width: 100%;
    max-width: 300px;
  }
  
  .header-right .btn {
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .annual-revenue-content {
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
  .annual-revenue-header {
    padding: 12px 15px;
    padding-left: 60px;
  }
  
  .annual-revenue-content {
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
  
  .year-range {
    width: 100%;
    max-width: none;
  }
}
</style> 