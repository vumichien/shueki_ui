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
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { financialData, calculateFinancialMetrics } from '../../data/financialData.js'

// Register Chart.js components explicitly
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
)

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
      persistedData: null,
      isMounted: false,
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
      selectedItems: ['sales', 'profit', 'advertising', 'promotion']
    }
  },
  computed: {
    currentData() {
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
          backgroundColor: this.chartColors.sales + '20',
          fill: true,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        {
          key: 'profit',
          label: '営業利益 (円)',
          data: this.calculatedMetrics.operatingProfitData || [],
          borderColor: this.chartColors.profit,
          backgroundColor: this.chartColors.profit + '20',
          fill: true,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        {
          key: 'advertising',
          label: '広告費 (円)',
          data: this.currentData.advertisingData || [],
          borderColor: this.chartColors.advertising,
          backgroundColor: this.chartColors.advertising + '20',
          fill: true,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        {
          key: 'promotion',
          label: '販売促進費 (円)',
          data: this.currentData.salesPromotionData || [],
          borderColor: this.chartColors.promotion,
          backgroundColor: this.chartColors.promotion + '20',
          fill: true,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        }
      ]
      return {
        labels: this.currentData.dates || [],
        datasets: allDatasets.filter(ds => this.selectedItems.includes(ds.key))
      }
    },
    chartOptions() {
      const isMobile = window.innerWidth <= 768
      
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: isMobile ? 'bottom' : 'right',
            align: 'center',
            onClick: null, // Disable legend click
            labels: {
              usePointStyle: true,
              padding: isMobile ? 10 : 15,
              font: {
                size: isMobile ? 11 : 12
              },
              generateLabels: function(chart) {
                const original = Chart.defaults.plugins.legend.labels.generateLabels
                const labels = original.call(this, chart)
                
                // Disable click functionality by removing the hidden property handling
                labels.forEach(label => {
                  label.hidden = false // Always show as visible
                })
                
                return labels
              }
            }
          },
          tooltip: {
            enabled: true,
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
              text: '日付'
            }
          },
          y: {
            display: true,
            beginAtZero: true,
            title: {
              display: true,
              text: '金額 (円)'
            },
            ticks: {
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
        }
      }
    }
  },
  mounted() {
    console.log('RevenueChart mounted')
    this.isMounted = true
    this.loadPersistedData()
    
    // Use a small delay to ensure DOM is fully ready
    setTimeout(() => {
      if (this.isMounted) {
        this.initChart()
      }
    }, 50)
  },
  beforeUnmount() {
    console.log('RevenueChart beforeUnmount')
    this.isMounted = false
    this.destroyChart()
  },
  watch: {
    data: {
      handler(newData) {
        console.log('RevenueChart data watcher triggered:', newData)
        if (newData && newData !== financialData) {
          this.savePersistedData(newData)
        }
        this.$nextTick(() => {
          this.updateChart()
        })
      },
      deep: true
    },
    selectedItems() {
      this.$nextTick(() => {
        this.updateChart()
      })
    }
  },
  methods: {
    initChart() {
      console.log('RevenueChart initChart called')
      
      if (!this.isMounted) {
        console.log('Component not mounted, skipping chart initialization')
        return
      }
      
      if (!this.$refs.chartCanvas) {
        console.error('Chart canvas ref not found')
        return
      }

      // Validate data before creating chart
      if (!this.chartData || !this.chartData.labels || !this.chartData.datasets) {
        console.error('Invalid chart data:', this.chartData)
        return
      }

      if (this.chartData.labels.length === 0) {
        console.warn('No data labels available for chart')
        return
      }

      this.destroyChart()

      // Wait for next tick to ensure DOM is ready
      this.$nextTick(() => {
        try {
          const canvas = this.$refs.chartCanvas
          
          if (!canvas) {
            console.error('Canvas element not found after nextTick')
            return
          }

          // Ensure canvas has proper dimensions
          if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
            console.warn('Canvas has zero dimensions, retrying...')
            setTimeout(() => this.initChart(), 100)
            return
          }

          const ctx = canvas.getContext('2d')
          
          if (!ctx) {
            console.error('Failed to get canvas context')
            return
          }

          // Validate context is not lost
          if (ctx.isContextLost && ctx.isContextLost()) {
            console.error('Canvas context is lost')
            return
          }

          console.log('Creating chart with data:', this.chartData)
          console.log('Chart options:', this.chartOptions)
          
          // Ensure all datasets have valid data
          const validDatasets = this.chartData.datasets.filter(dataset => {
            return dataset && dataset.data && Array.isArray(dataset.data) && dataset.data.length > 0
          })

          if (validDatasets.length === 0) {
            console.warn('No valid datasets available for chart')
            return
          }

          // Log each dataset to check for issues
          validDatasets.forEach((dataset, index) => {
            console.log(`Dataset ${index}:`, {
              label: dataset.label,
              data: dataset.data,
              borderColor: dataset.borderColor,
              backgroundColor: dataset.backgroundColor
            })
          })

          const chartConfig = {
            type: 'line',
            data: {
              labels: this.chartData.labels,
              datasets: validDatasets
            },
            options: {
              ...this.chartOptions,
              // Disable animations to prevent context issues
              animation: false,
              responsive: true,
              maintainAspectRatio: false
            }
          }

          console.log('Final chart config:', chartConfig)

          this.chart = new Chart(ctx, chartConfig)
          
          console.log('Chart created successfully')
        } catch (error) {
          console.error('Error initializing chart:', error)
          this.chart = null
        }
      })
    },
    
    updateChart() {
      console.log('RevenueChart updateChart called')
      
      if (!this.chart) {
        console.log('No chart instance, initializing new chart')
        this.initChart()
        return
      }

      // Check if chart context is still valid
      if (this.chart.ctx && this.chart.ctx.isContextLost && this.chart.ctx.isContextLost()) {
        console.warn('Chart context lost, reinitializing chart')
        this.initChart()
        return
      }

      try {
        console.log('Updating chart with new data:', this.chartData)
        
        // Validate data before updating
        if (!this.chartData || !this.chartData.labels || !this.chartData.datasets) {
          console.error('Invalid chart data for update:', this.chartData)
          return
        }

        const validDatasets = this.chartData.datasets.filter(dataset => {
          return dataset && dataset.data && Array.isArray(dataset.data) && dataset.data.length > 0
        })

        if (validDatasets.length === 0) {
          console.warn('No valid datasets for chart update')
          return
        }
        
        this.chart.data.labels = this.chartData.labels
        this.chart.data.datasets = validDatasets
        this.chart.update('none') // Use 'none' mode to skip animations
        
        console.log('Chart updated successfully')
      } catch (error) {
        console.error('Error updating chart:', error)
        console.log('Attempting to reinitialize chart')
        this.initChart()
      }
    },
    
    destroyChart() {
      if (this.chart) {
        try {
          console.log('Destroying chart')
          
          // Stop any ongoing animations
          if (this.chart.stop) {
            this.chart.stop()
          }
          
          // Destroy the chart
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
  display: flex;
  align-items: center;
}

.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
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
    flex-direction: column;
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