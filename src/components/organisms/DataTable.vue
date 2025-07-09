<template>
  <div class="data-table">
    <div class="table-header">
      <h3>収益の詳細</h3>
      <button class="csv-export-btn" @click="exportCSV">CSVに出力</button>
    </div>
    
    <div class="table-container">
      <table class="financial-table">
        <thead>
          <tr>
            <th>項目名</th>
            <th v-for="date in dates" :key="date">{{ date }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="row-label">売上</td>
            <td v-for="(value, index) in salesData" :key="'sales-' + index" class="data-cell">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">売上原価</td>
            <td v-for="(value, index) in costOfSalesData" :key="'cost-' + index" class="data-cell">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">売上総利益（売上ー売上原価）</td>
            <td v-for="(value, index) in grossProfitData" :key="'gross-' + index" class="data-cell profit">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">送料</td>
            <td v-for="(value, index) in shippingData" :key="'shipping-' + index" class="data-cell">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">支払い手数料</td>
            <td v-for="(value, index) in paymentFeesData" :key="'payment-' + index" class="data-cell">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">注文連動比合計（送料＋支払い手数料）</td>
            <td v-for="(value, index) in orderRelatedTotalData" :key="'order-' + index" class="data-cell subtotal">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">広告費</td>
            <td v-for="(value, index) in advertisingData" :key="'advertising-' + index" class="data-cell">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">販売促進費</td>
            <td v-for="(value, index) in salesPromotionData" :key="'promotion-' + index" class="data-cell">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">広告販売促進費合計（広告費＋販売促進費）</td>
            <td v-for="(value, index) in advertisingPromotionTotalData" :key="'ad-promo-' + index" class="data-cell subtotal">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">人件費</td>
            <td v-for="(value, index) in personnelCostsData" :key="'personnel-' + index" class="data-cell">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="row-label">共通費</td>
            <td v-for="(value, index) in commonCostsData" :key="'common-' + index" class="data-cell">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
          <tr class="total-row">
            <td class="row-label">営業利益（売上ー全ての費用）</td>
            <td v-for="(value, index) in operatingProfitData" :key="'operating-' + index" class="data-cell operating-profit">
              ¥{{ formatNumber(value) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { financialData, calculateFinancialMetrics } from '../../data/financialData.js'

export default {
  name: 'DataTable',
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
      // Priority: props > persisted > default
      return this.internalData || this.persistedData || this.data || financialData
    },
    // 計算された値を取得
    calculatedMetrics() {
      return calculateFinancialMetrics(this.currentData)
    },
    dates() {
      return this.currentData.dates
    },
    salesData() {
      return this.currentData.salesData
    },
    costOfSalesData() {
      return this.currentData.costOfSalesData
    },
    shippingData() {
      return this.currentData.shippingData
    },
    paymentFeesData() {
      return this.currentData.paymentFeesData
    },
    advertisingData() {
      return this.currentData.advertisingData
    },
    salesPromotionData() {
      return this.currentData.salesPromotionData
    },
    personnelCostsData() {
      return this.currentData.personnelCostsData
    },
    commonCostsData() {
      return this.currentData.commonCostsData
    },
    grossProfitData() {
      return this.calculatedMetrics.grossProfitData
    },
    orderRelatedTotalData() {
      return this.calculatedMetrics.orderRelatedTotalData
    },
    advertisingPromotionTotalData() {
      return this.calculatedMetrics.advertisingPromotionTotalData
    },
    operatingProfitData() {
      return this.calculatedMetrics.operatingProfitData
    }
  },
  mounted() {
    this.loadPersistedData()
    console.log('DataTable mounted with data:', {
      props: this.data,
      persisted: this.persistedData,
      current: this.currentData
    })
  },
  watch: {
    data: {
      handler(newData) {
        console.log('DataTable data changed:', newData)
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
        const persistedDataStr = localStorage.getItem('dataTable_filteredData')
        if (persistedDataStr) {
          this.persistedData = JSON.parse(persistedDataStr)
          console.log('Loaded persisted data:', this.persistedData)
        }
      } catch (error) {
        console.warn('Error loading persisted data:', error)
        this.clearPersistedData()
      }
    },
    savePersistedData(data) {
      try {
        localStorage.setItem('dataTable_filteredData', JSON.stringify(data))
        this.persistedData = data
        console.log('Saved persisted data')
      } catch (error) {
        console.warn('Error saving persisted data:', error)
      }
    },
    clearPersistedData() {
      localStorage.removeItem('dataTable_filteredData')
      this.persistedData = null
      console.log('Cleared persisted data')
    },
    formatNumber(number) {
      return new Intl.NumberFormat('ja-JP').format(number)
    },
    exportCSV() {
      // Transpose data: dates as rows, items as columns
      const itemNames = [
        '売上', '売上原価', '売上総利益（売上ー売上原価）',
        '送料', '支払い手数料', '注文連動比合計（送料＋支払い手数料）',
        '広告費', '販売促進費', '広告販売促進費合計（広告費＋販売促進費）',
        '人件費', '共通費', '営業利益（売上ー全ての費用）'
      ]
      
      const dataArrays = [
        this.salesData, this.costOfSalesData, this.grossProfitData,
        this.shippingData, this.paymentFeesData, this.orderRelatedTotalData,
        this.advertisingData, this.salesPromotionData, this.advertisingPromotionTotalData,
        this.personnelCostsData, this.commonCostsData, this.operatingProfitData
      ]
      
      // Create headers: Year/Month + Item names
      const headers = ['年月', ...itemNames]
      
      // Create rows: each date with its corresponding values
      const rows = this.dates.map((date, dateIndex) => {
        const row = [date] // Start with the date
        
        // Add values for each item for this date
        dataArrays.forEach(dataArray => {
          row.push(dataArray[dateIndex] || 0)
        })
        
        return row
      })
      
      const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n')
      
      // Add UTF-8 BOM for proper Japanese character display
      const BOM = '\uFEFF'
      const csvWithBOM = BOM + csvContent
      
      const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = '収益詳細_' + new Date().toISOString().split('T')[0] + '.csv'
      link.click()
    },
    // Public method to clear filter
    clearFilter() {
      this.clearPersistedData()
      this.internalData = null
      console.log('DataTable filter cleared')
    }
  }
}
</script>

<style scoped>
.data-table {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.csv-export-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.csv-export-btn:hover {
  background: #2563eb;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.financial-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.financial-table th {
  background: #f9fafb;
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
  min-width: 80px;
}

.financial-table th:first-child {
  text-align: left;
  padding-left: 16px;
  min-width: 200px;
}

.financial-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
  white-space: nowrap;
}

.row-label {
  text-align: left !important;
  padding-left: 16px !important;
  font-weight: 500;
  color: #374151;
  background: #f9fafb;
  font-size: 0.8rem;
}

.data-cell {
  color: #1f2937;
  font-weight: 500;
}

.profit {
  color: #059669;
  font-weight: 600;
}

.subtotal {
  color: #7c3aed;
  font-weight: 600;
}

.operating-profit {
  color: #dc2626;
  font-weight: 700;
}

.total-row {
  border-top: 2px solid #374151;
  background: #f8fafc;
}

.total-row .row-label {
  background: #e5e7eb;
  font-weight: 600;
}

.financial-table tr:hover {
  background: #f8fafc;
}

.financial-table tr:last-child td {
  border-bottom: none;
}

/* Responsive */
@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .financial-table {
    font-size: 0.75rem;
  }
  
  .financial-table th,
  .financial-table td {
    padding: 8px 4px;
  }
  
  .row-label {
    padding-left: 8px !important;
    font-size: 0.7rem;
  }
  
  .financial-table th:first-child {
    min-width: 150px;
  }
}
</style> 