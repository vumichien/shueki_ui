<template>
  <div class="metrics-cards">
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">総売上</div>
        <div class="metric-value">¥{{ formatNumber(totalSales) }}</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-label">営業利益</div>
        <div class="metric-value">¥{{ formatNumber(totalOperatingProfit) }}</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-label">営業利益率</div>
        <div class="metric-value">{{ operatingMargin }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import { financialData, calculateMonthlySummary, calculateOperatingMargin } from '../../data/financialData.js'

export default {
  name: 'MetricsCards',
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      internalData: null,
      persistedData: null
    }
  },
  computed: {
    currentData() {
      return this.internalData || this.persistedData || this.data || financialData
    },
    monthlySummary() {
      return calculateMonthlySummary(this.currentData)
    },
    totalSales() {
      return this.monthlySummary.totalSales
    },
    totalOperatingProfit() {
      return this.monthlySummary.totalOperatingProfit
    },
    operatingMargin() {
      return calculateOperatingMargin(this.totalSales, this.totalOperatingProfit)
    }
  },
  mounted() {
    this.loadPersistedData()
    console.log('MetricsCards mounted with data:', {
      props: this.data,
      persisted: this.persistedData,
      current: this.currentData
    })
  },
  watch: {
    data: {
      handler(newData) {
        console.log('MetricsCards data changed:', newData)
        this.internalData = newData
        
        // Save to localStorage if it's not the default data
        if (newData && newData !== financialData) {
          this.savePersistedData(newData)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    loadPersistedData() {
      try {
        const persistedDataStr = localStorage.getItem('metricsCards_filteredData')
        if (persistedDataStr) {
          this.persistedData = JSON.parse(persistedDataStr)
          console.log('Loaded persisted metrics data:', this.persistedData)
        }
      } catch (error) {
        console.warn('Error loading persisted metrics data:', error)
        this.clearPersistedData()
      }
    },
    savePersistedData(data) {
      try {
        localStorage.setItem('metricsCards_filteredData', JSON.stringify(data))
        this.persistedData = data
        console.log('Saved persisted metrics data')
      } catch (error) {
        console.warn('Error saving persisted metrics data:', error)
      }
    },
    clearPersistedData() {
      localStorage.removeItem('metricsCards_filteredData')
      this.persistedData = null
      console.log('Cleared persisted metrics data')
    },
    formatNumber(number) {
      return new Intl.NumberFormat('ja-JP').format(number)
    },
    // Public method to clear filter
    clearFilter() {
      this.clearPersistedData()
      this.internalData = null
      console.log('MetricsCards filter cleared')
    }
  }
}
</script>

<style scoped>
.metrics-cards {
  margin-bottom: 30px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.metric-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
}

/* Responsive */
@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .metric-card {
    padding: 20px;
  }
  
  .metric-value {
    font-size: 1.8rem;
  }
}
</style> 