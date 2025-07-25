<template>
  <div class="system-status-table">
    <div class="table-header">
      <div class="table-title">
        <h3>実行結果実行結果一覧</h3>
      </div>
      <div class="table-actions">
        <div class="date-filter">
          <div class="date-input-group">
            <span class="date-label">実施日</span>
            <Input 
              v-model="selectedDate" 
              type="date"
              class="date-input"
              @input="handleDateChange"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div class="table-container">
      <table class="status-table">
        <thead>
          <tr>
            <th>クライアントID</th>
            <th>クライアント名</th>
            <th>実行日</th>
            <th>実行結果</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.id" class="table-row">
            <td class="client-id">{{ item.clientId }}</td>
            <td class="client-name">{{ item.clientName }}</td>
            <td class="execution-date">{{ item.executionDate }}</td>
            <td class="execution-result">
              <span 
                class="status-badge" 
                :class="{ 
                  'success': item.status === '成功', 
                  'error': item.status === 'エラー' 
                }"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="actions">
              <button class="action-btn details-btn" @click="viewDetails(item)">
                詳細
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Input from '../atoms/Input.vue'
import { getSystemStatusDataByDate, getDefaultDate, getAvailableDates } from '../../data/systemStatusData.js'

export default {
  name: 'SystemStatusTable',
  components: {
    Input
  },
  data() {
    const defaultDate = getDefaultDate()
    return {
      selectedDate: this.formatDateForInput(defaultDate),
      tableData: []
    }
  },
  computed: {
    availableDates() {
      return getAvailableDates()
    }
  },
  methods: {
    formatDateForInput(date) {
      // Convert Date object to YYYY-MM-DD format for HTML date input
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    
    viewDetails(item) {
      // Handle view details action
      console.log('View details for:', item)
      this.$emit('view-details', item)
    },
    
    handleDateChange(event) {
      const dateString = event.target.value
      console.log('Date changed to:', dateString)
      this.selectedDate = dateString
      const dateObject = new Date(dateString)
      console.log('Converted to Date object:', dateObject)
      this.loadTableDataForDate(dateObject)
      this.$emit('date-changed', dateObject)
    },
    
    loadTableDataForDate(date) {
      // Load table data for the selected date
      console.log('Loading table data for date:', date)
      const executions = getSystemStatusDataByDate(date)
      this.tableData = executions
      console.log(`Loaded ${executions.length} executions for date:`, date)
      console.log('Table data:', this.tableData)
    },
    
    filterTableDataByDate(date) {
      // Filter table data based on selected date
      this.loadTableDataForDate(date)
      this.$emit('date-changed', date)
    }
  },
  mounted() {
    // Load initial data for the selected date
    console.log('Component mounted, selectedDate:', this.selectedDate)
    const initialDate = new Date(this.selectedDate)
    console.log('Initial date object:', initialDate)
    this.loadTableDataForDate(initialDate)
  },
  emits: ['view-details', 'date-changed']
}
</script>

<style scoped>
.system-status-table {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.table-title h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.table-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-input-group {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.date-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
}

.date-input {
  width: 150px;
}





.table-container {
  overflow-x: auto;
}

.status-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.status-table th {
  background: #f8fafc;
  color: #374151;
  font-weight: 600;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

.status-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

.table-row:hover {
  background: #f9fafb;
}

.client-id {
  font-weight: 500;
  color: #1f2937;
}

.client-name {
  color: #374151;
}

.execution-date {
  color: #6b7280;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
}

.status-badge.success {
  background: #dcfce7;
  color: #166534;
}

.status-badge.error {
  background: #fef2f2;
  color: #dc2626;
}

.action-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.action-btn:hover {
  color: #1d4ed8;
}

/* Responsive */
@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .table-actions {
    justify-content: space-between;
  }
  
  .system-status-table {
    padding: 16px;
  }
  
  .status-table {
    font-size: 0.8rem;
  }
  
  .status-table th,
  .status-table td {
    padding: 8px;
  }
}

@media (max-width: 640px) {
  .table-container {
    margin: 0 -16px;
  }
  
  .system-status-table {
    border-radius: 0;
    margin: 0 -16px;
  }
}
</style> 