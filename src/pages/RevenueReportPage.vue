<template>
  <AnnualRevenueTemplate>
    <template #default="{ filteredData, dataKey }">
      <div class="revenue-report-page" :key="dataKey">
        <!-- メトリクスカード -->
        <MetricsCards :data="filteredData" />
        
        <!-- チャートセクション -->
        <RevenueChart :data="filteredData" :key="`chart-${dataKey}`" />
        
        <!-- データテーブル -->
        <DataTable :data="filteredData" :key="`table-${dataKey}`" />
      </div>
    </template>
  </AnnualRevenueTemplate>
</template>

<script>
import AnnualRevenueTemplate from '../templates/AnnualRevenueTemplate.vue'
import MetricsCards from '../components/molecules/MetricsCards.vue'
import DataTable from '../components/organisms/DataTable.vue'

// Lazy load the heavy chart component
const RevenueChart = () => import('../components/organisms/RevenueChart.vue')

export default {
  name: 'RevenueReportPage',
  components: {
    AnnualRevenueTemplate,
    MetricsCards,
    RevenueChart,
    DataTable
  },
  mounted() {
    console.log('RevenueReportPage mounted')
  }
}
</script>

<style scoped>
.revenue-report-page {
  max-width: 1800px;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .revenue-report-page {
    max-width: 100%;
  }
}
</style> 