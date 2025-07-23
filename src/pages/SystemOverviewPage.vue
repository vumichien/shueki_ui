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
      <SystemStatusTable @view-details="handleViewDetails" />
    </div>
  </AdminTemplate>
</template>

<script>
import AdminTemplate from '../templates/AdminTemplate.vue'
import SystemMetricsCards from '../components/molecules/SystemMetricsCards.vue'
import SystemStatusTable from '../components/molecules/SystemStatusTable.vue'

export default {
  name: 'SystemOverviewPage',
  components: {
    AdminTemplate,
    SystemMetricsCards,
    SystemStatusTable
  },
  data() {
    return {
      systemMetrics: {
        errorCount: 0,
        successCount: 30,
        storeCount: 8
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
    
    async loadSystemMetrics() {
      // In a real app, this would fetch from an API
      try {
        // Simulate API call
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              errorCount: 0,
              successCount: 30,
              storeCount: 8
            })
          }, 100)
        })
        
        this.systemMetrics = response
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