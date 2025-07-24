<template>
  <div class="client-table">
    <div class="table-header">
      <h3>クライアント一覧</h3>
      <Button
        variant="primary"
        size="medium"
        @click="$emit('new-client')"
      >
        新規登録
      </Button>
    </div>
    
    <div class="table-container">
      <table class="client-data-table">
        <thead>
          <tr>
            <th>クライアントID</th>
            <th>クライアント名</th>
            <th>登録日</th>
            <th>ステータス</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.registrationDate }}</td>
            <td>
              <span 
                :class="['status-badge', getClientStatusClass(client.status)]"
                @click="toggleStatus(client)"
              >
                {{ getClientStatusText(client.status) }}
              </span>
            </td>
            <td>
              <button 
                class="action-link"
                @click="$emit('view-details', client)"
              >
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
import { getClientStatusText, getClientStatusClass } from '../../data/clientData.js'

export default {
  name: 'ClientTable',
  components: {
    Button
  },
  props: {
    clients: {
      type: Array,
      required: true
    }
  },
  methods: {
    getClientStatusText,
    getClientStatusClass,
    toggleStatus(client) {
      this.$emit('toggle-status', client)
    }
  },
  emits: ['new-client', 'view-details', 'toggle-status']
}
</script>

<style scoped>
.client-table {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.table-container {
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.client-data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.client-data-table th {
  background: #f9fafb;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

.client-data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.client-data-table tr:hover {
  background: #f8fafc;
}

.client-data-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-badge:hover {
  opacity: 0.8;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-inactive {
  background: #fee2e2;
  color: #991b1b;
}

.action-link {
  background: none;
  border: none;
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0;
  font-family: inherit;
}

.action-link:hover {
  color: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .client-data-table {
    font-size: 0.75rem;
  }
  
  .client-data-table th,
  .client-data-table td {
    padding: 8px 12px;
  }
}
</style> 