<template>
  <div class="system-status-table">
    <div class="table-header">
      <div class="table-title">
        <h3>実行結果実行結果一覧</h3>
      </div>
      <div class="table-actions">
        <div class="date-filter">
          <label>実施日</label>
          <select v-model="selectedDate" class="date-select">
            <option value="2025年6月1日">2025年6月1日</option>
            <option value="2025年5月1日">2025年5月1日</option>
            <option value="2025年4月1日">2025年4月1日</option>
          </select>
        </div>
        <Button variant="primary" class="settings-btn">設定</Button>
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
import Button from '../atoms/Button.vue'

export default {
  name: 'SystemStatusTable',
  components: {
    Button
  },
  data() {
    return {
      selectedDate: '2025年6月1日',
      tableData: [
        {
          id: 1,
          clientId: 'CL001',
          clientName: '株式会社A',
          executionDate: '2024/01/15',
          status: '成功'
        },
        {
          id: 2,
          clientId: 'CL002',
          clientName: '株式会社B',
          executionDate: '2024/02/15',
          status: '成功'
        },
        {
          id: 3,
          clientId: 'CL003',
          clientName: '株式会社C',
          executionDate: '2024/03/15',
          status: '成功'
        },
        {
          id: 4,
          clientId: 'CL004',
          clientName: '株式会社D',
          executionDate: '2024/04/15',
          status: 'エラー'
        },
        {
          id: 5,
          clientId: 'CL005',
          clientName: '株式会社D',
          executionDate: '2024/05/15',
          status: 'エラー'
        },
        {
          id: 6,
          clientId: 'CL006',
          clientName: '株式会社E',
          executionDate: '2024/06/15',
          status: '成功'
        },
        {
          id: 7,
          clientId: 'CL007',
          clientName: '株式会社F',
          executionDate: '2024/07/15',
          status: 'エラー'
        },
        {
          id: 8,
          clientId: 'CL008',
          clientName: '株式会社G',
          executionDate: '2024/08/15',
          status: '成功'
        },
        {
          id: 9,
          clientId: 'CL009',
          clientName: '株式会社H',
          executionDate: '2024/09/15',
          status: '成功'
        },
        {
          id: 10,
          clientId: 'CL010',
          clientName: '株式会社I',
          executionDate: '2024/10/15',
          status: '成功'
        },
        {
          id: 11,
          clientId: 'CL011',
          clientName: '株式会社J',
          executionDate: '2024/11/15',
          status: '成功'
        }
      ]
    }
  },
  methods: {
    viewDetails(item) {
      // Handle view details action
      console.log('View details for:', item)
      this.$emit('view-details', item)
    }
  },
  emits: ['view-details']
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

.date-filter label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.date-select {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  color: #374151;
}

.settings-btn {
  background: #1e3a8a;
  color: white;
  padding: 8px 16px;
  font-size: 0.875rem;
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