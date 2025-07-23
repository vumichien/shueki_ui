<template>
  <div class="revenue-chart">
    <div class="chart-header">
      <h3>収益の推移</h3>
    </div>
    <div class="chart-controls">
      <label v-for="item in chartItems" :key="item.key" class="chart-checkbox">
        <input
          type="checkbox"
          v-model="selectedItems"
          :value="item.key"
        />
        {{ item.label }}
      </label>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas" v-if="shouldShowChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { financialData, calculateFinancialMetrics } from '../../data/financialData.js'

Chart.register(...registerables)

export default {
  name: 'RevenueChart',
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      chart: null,
      lastDataString: '', // Track data changes
      isMounted: false, // Track component mount state
      shouldShowChart: false, // Control canvas rendering
      persistedData: null, // Store filtered data
      chartColors: {
        sales: '#3b82f6',
        profit: '#10b981',
        advertising: '#f59e0b',
        promotion: '#8b5cf6'
      },
      chartItems: [
        { key: 'sales', label: '売上 (円)' },
        { key: 'profit', label: '営業利益 (円)' },
        { key: 'advertising', label: '広告費 (円)' },
        { key: 'promotion', label: '販売促進費 (円)' }
      ],
      selectedItems: ['sales', 'profit', 'advertising', 'promotion'] // mặc định chọn hết
    }
  },
  computed: {
    currentData() {
      // Priority: props > persisted > default
      const data = this.data || this.persistedData || financialData
      console.log('RevenueChart currentData:', data)
      return data
    },
    calculatedMetrics() {
      return calculateFinancialMetrics(this.currentData)
    },
    chartData() {
      const allDatasets = [
        {
          key: 'sales',
          label: '売上 (円)',
          data: this.currentData.salesData || [],
          borderColor: this.chartColors.sales,
          backgroundColor: this.chartColors.sales + '30',
          fill: true,
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          key: 'profit',
          label: '営業利益 (円)',
          data: this.calculatedMetrics.operatingProfitData || [],
          borderColor: this.chartColors.profit,
          backgroundColor: this.chartColors.profit + '30',
          fill: true,
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          key: 'advertising',
          label: '広告費 (円)',
          data: this.currentData.advertisingData || [],
          borderColor: this.chartColors.advertising,
          backgroundColor: this.chartColors.advertising + '30',
          fill: true,
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          key: 'promotion',
          label: '販売促進費 (円)',
          data: this.currentData.salesPromotionData || [],
          borderColor: this.chartColors.promotion,
          backgroundColor: this.chartColors.promotion + '30',
          fill: true,
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
      return {
        labels: this.currentData.dates || [],
        datasets: allDatasets.filter(ds => this.selectedItems.includes(ds.key))
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0 // Disable animation to prevent context issues
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: false,
              padding: 20,
              font: {
                size: 12,
                weight: '500'
              },
              color: '#6b7280'
            },
            onClick: null // Tắt click legend
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ¥' + 
                       new Intl.NumberFormat('ja-JP').format(context.parsed.y)
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: '日付',
              font: {
                size: 12,
                weight: '500'
              },
              color: '#6b7280'
            },
            grid: {
              display: true,
              color: '#e5e7eb'
            },
            ticks: {
              color: '#6b7280'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: '金額 (円)',
              font: {
                size: 12,
                weight: '500'
              },
              color: '#6b7280'
            },
            grid: {
              display: true,
              color: '#e5e7eb'
            },
            ticks: {
              color: '#6b7280',
              callback: function(value) {
                return '¥' + new Intl.NumberFormat('ja-JP').format(value)
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        elements: {
          point: {
            radius: 4,
            hoverRadius: 6
          }
        }
      }
    }
  },
  mounted() {
    console.log('RevenueChart mounted')
    this.isMounted = true
    this.shouldShowChart = true
    // Load persisted data first
    this.loadPersistedData()
    this.$nextTick(() => {
      // Add small delay to ensure DOM is fully ready
      setTimeout(() => {
        this.initChart()
      }, 100)
    })
    console.log('RevenueChart mounted with data:', {
      props: this.data,
      persisted: this.persistedData,
      current: this.currentData
    })
  },
  beforeUnmount() {
    console.log('RevenueChart beforeUnmount')
    this.isMounted = false
    this.shouldShowChart = false
    this.destroyChart()
  },
  activated() {
    // For keep-alive components
    console.log('RevenueChart activated')
    if (this.isMounted && this.shouldShowChart) {
      this.$nextTick(() => {
        setTimeout(() => {
          if (!this.chart) {
            this.initChart()
          }
        }, 100)
      })
    }
  },
  deactivated() {
    // For keep-alive components
    console.log('RevenueChart deactivated')
    this.destroyChart()
  },
  watch: {
    data: {
      handler(newData) {
        console.log('RevenueChart data watcher triggered:', newData)
        // Only proceed if component is mounted and should show chart
        if (!this.isMounted || !this.shouldShowChart) {
          console.log('Component not ready, skipping chart update')
          return
        }
        // Save to localStorage if it's not the default data
        if (newData && newData !== financialData) {
          this.savePersistedData(newData)
        }
        // Check if data actually changed
        const newDataString = JSON.stringify(newData)
        if (newDataString !== this.lastDataString) {
          this.lastDataString = newDataString
          // Use nextTick and timeout to ensure DOM is ready
          this.$nextTick(() => {
            setTimeout(() => {
              if (this.chart && this.isChartValid()) {
                this.updateChart()
              } else {
                this.initChart()
              }
            }, 50)
          })
        }
      },
      immediate: false, // Don't trigger on initial mount
      deep: true
    },
    selectedItems() {
      this.updateChart()
    }
  },
  methods: {
    isChartValid() {
      try {
        return this.chart && 
               this.chart.ctx && 
               this.chart.canvas && 
               this.$refs.chartCanvas &&
               !this.chart.ctx.isContextLost()
      } catch (error) {
        console.warn('Chart validation failed:', error)
        return false
      }
    },
    initChart() {
      console.log('RevenueChart initChart called')
      if (!this.shouldShowChart || !this.isMounted) {
        console.log('Chart not ready for initialization')
        return
      }
      if (!this.$refs.chartCanvas) {
        console.error('Chart canvas ref not found')
        return
      }
      // Destroy existing chart
      this.destroyChart()
      try {
        const canvas = this.$refs.chartCanvas
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          console.error('Failed to get canvas context')
          return
        }
        console.log('Creating chart with data:', this.chartData)
        this.chart = new Chart(ctx, {
          type: 'line',
          data: JSON.parse(JSON.stringify(this.chartData)), // Deep clone to prevent reference issues
          options: this.chartOptions
        })
        console.log('Chart created successfully')
      } catch (error) {
        console.error('Error initializing chart:', error)
        this.chart = null
      }
    },
    updateChart() {
      console.log('RevenueChart updateChart called')
      if (!this.isChartValid()) {
        console.log('Chart not valid, reinitializing...')
        this.initChart()
        return
      }
      try {
        console.log('Updating chart with new data:', this.chartData)
        // Deep clone data to prevent reference issues
        const newData = JSON.parse(JSON.stringify(this.chartData))
        // Update chart data
        this.chart.data.labels = newData.labels
        this.chart.data.datasets = newData.datasets
        // Update chart
        this.chart.update('none') // Use 'none' mode to skip animations
        console.log('Chart updated successfully')
      } catch (error) {
        console.error('Error updating chart:', error)
        // If update fails, try to reinitialize
        this.initChart()
      }
    },
    destroyChart() {
      if (this.chart) {
        try {
          console.log('Destroying chart')
          this.chart.destroy()
        } catch (error) {
          console.error('Error destroying chart:', error)
        } finally {
          this.chart = null
        }
      }
    },
    loadPersistedData() {
      try {
        const persistedDataStr = localStorage.getItem('revenueChart_filteredData')
        if (persistedDataStr) {
          this.persistedData = JSON.parse(persistedDataStr)
          console.log('Loaded persisted chart data:', this.persistedData)
        }
      } catch (error) {
        console.warn('Error loading persisted chart data:', error)
        this.clearPersistedData()
      }
    },
    savePersistedData(data) {
      try {
        localStorage.setItem('revenueChart_filteredData', JSON.stringify(data))
        this.persistedData = data
        console.log('Saved persisted chart data')
      } catch (error) {
        console.warn('Error saving persisted chart data:', error)
      }
    },
    clearPersistedData() {
      localStorage.removeItem('revenueChart_filteredData')
      this.persistedData = null
      console.log('Cleared persisted chart data')
    },
    // Public method to clear filter
    clearFilter() {
      this.clearPersistedData()
      console.log('RevenueChart filter cleared')
    }
  }
}
</script>

<style scoped>
.revenue-chart {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.chart-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  justify-content: center;
  flex: 1;
}

.chart-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
  color: #374151;
}

.chart-container {
  width: 100%;
  height: 400px;
  position: relative;
}

.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
}

/* Responsive */
@media (max-width: 768px) {
  .revenue-chart {
    padding: 20px;
    margin-bottom: 20px;
  }
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .chart-controls {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    flex: none;
  }
  .chart-container {
    height: 350px;
    width: 100%;
    overflow: hidden;
  }
}

@media (max-width: 480px) {
  .revenue-chart {
    padding: 15px;
  }
  .chart-header h3 {
    font-size: 1.125rem;
  }
  .chart-controls {
    flex-direction: column;
    gap: 8px;
  }
  .chart-container {
    height: 300px;
  }
}
</style> 