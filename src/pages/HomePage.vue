<template>
  <DashboardTemplate v-slot="{ filteredData, dataKey }">
    <div class="dashboard-page" :key="dataKey">
      <!-- Metrics Cards -->
      <MetricsCards :data="filteredData" />
      
      <!-- Revenue Chart -->
      <RevenueChart :data="filteredData" />
      
      <!-- Data Table -->
      <DataTable :data="filteredData" />
    </div>
  </DashboardTemplate>
</template>

<script>
import DashboardTemplate from '../templates/DashboardTemplate.vue'
import MetricsCards from '../components/molecules/MetricsCards.vue'
import DataTable from '../components/organisms/DataTable.vue'

// Lazy load the heavy chart component
const RevenueChart = () => import('../components/organisms/RevenueChart.vue')

export default {
  name: 'HomePage',
  components: {
    DashboardTemplate,
    MetricsCards,
    RevenueChart,
    DataTable
  }
}
</script>

<style scoped>
.dashboard-page {
  max-width: 1800px;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .dashboard-page {
    max-width: 100%;
  }
}
</style> 