<template>
  <AdminTemplate title="システム全体の状態">
    <div class="system-overview-page">
      <!-- Metrics Cards -->
      <SystemMetricsCards 
        :error-count="systemMetrics.errorCount"
        :success-count="systemMetrics.successCount"
        :store-count="systemMetrics.storeCount"
      />
      
      <!-- Status Table -->
      <SystemStatusTable 
        @view-details="handleViewDetails"
        @date-changed="handleDateChanged"
      />
    </div>
  </AdminTemplate>
</template>

<script>
import AdminTemplate from '../templates/AdminTemplate.vue'
import SystemMetricsCards from '../components/molecules/SystemMetricsCards.vue'
import SystemStatusTable from '../components/molecules/SystemStatusTable.vue'
import { getSystemMetricsByDate, getDefaultDate } from '../data/systemStatusData.js'

export default {
  name: 'SystemOverviewPage',
  components: {
    AdminTemplate,
    SystemMetricsCards,
    SystemStatusTable
  },
  data() {
    return {
      selectedDate: getDefaultDate(),
      systemMetrics: {
        errorCount: 0,
        successCount: 0,
        storeCount: 0
      }
    }
  },
  methods: {
    handleViewDetails(item) {
      // Handle view details for a specific execution result
      console.log('Viewing details for:', item)
      // Could navigate to a details page or show a modal
      // this.$router.push({ name: 'ExecutionDetails', params: { id: item.id } })
    },
    
    handleDateChanged(date) {
      // Handle date change from SystemStatusTable
      console.log('Date changed in SystemOverviewPage:', date)
      this.selectedDate = date
      this.refreshDataForDate(date)
    },
    
    async refreshDataForDate(date) {
      // Refresh system metrics and table data for the selected date
      console.log('Refreshing data for date:', date)
      try {
        // Get system metrics for the selected date
        const metrics = getSystemMetricsByDate(date)
        this.systemMetrics = {
          errorCount: metrics.errorCount,
          successCount: metrics.successCount,
          storeCount: metrics.storeCount
        }
        console.log('Updated system metrics:', this.systemMetrics)
      } catch (error) {
        console.error('Failed to refresh data for date:', error)
      }
    },
    
    async loadSystemMetrics() {
      // Load system metrics for the current selected date
      try {
        const metrics = getSystemMetricsByDate(this.selectedDate)
        this.systemMetrics = {
          errorCount: metrics.errorCount,
          successCount: metrics.successCount,
          storeCount: metrics.storeCount
        }
        console.log('Loaded system metrics:', this.systemMetrics)
      } catch (error) {
        console.error('Failed to load system metrics:', error)
      }
    }
  },
  
  async mounted() {
    // Load initial data
    await this.loadSystemMetrics()
  }
}
</script>

<style scoped>
.system-overview-page {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 30px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .system-overview-page {
    max-width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .system-overview-page {
    padding: 0 15px;
  }
}
</style> 