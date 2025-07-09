<template>
  <div class="accounting-period-form">
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">会計期間設定</h3>
      </div>
      
      <div class="form-table">
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">会計年度開始月</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <Select 
              v-model="formData.accountingStartMonth" 
              :options="monthOptions"
              placeholder="年度を選択してください"
              class="form-select"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from '../atoms/Select.vue'

export default {
  name: 'AccountingPeriodSettingsForm',
  components: {
    Select
  },
  data() {
    return {
      formData: {
        accountingStartMonth: '2025年4月'
      },
      monthOptions: [
        { value: '2023年4月', label: '2023年4月' },
        { value: '2024年4月', label: '2024年4月' },
        { value: '2025年4月', label: '2025年4月' },
        { value: '2026年4月', label: '2026年4月' }
      ]
    }
  },
  methods: {
    save() {
      console.log('Saving accounting period settings:', this.formData)
      this.$emit('save', this.formData)
    }
  },
  emits: ['save']
}
</script>

<style scoped>
.accounting-period-form {
  width: 100%;
}

.settings-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.card-header {
  background: #f8f9fa;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.form-table {
  width: 100%;
}

.form-row {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  min-height: 60px;
}

.form-row:last-child {
  border-bottom: none;
}

.form-label {
  width: 250px;
  min-width: 250px;
  padding: 16px 24px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-content {
  flex: 1;
  padding: 16px 24px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.label-text {
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.required-badge {
  background: #dc3545;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 500;
  white-space: nowrap;
}

.form-select {
  max-width: 500px;
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .settings-card {
    border-radius: 0;
    box-shadow: none;
    border-left: none;
    border-right: none;
  }
  
  .card-header {
    padding: 12px 20px;
  }
  
  .form-row {
    flex-direction: column;
    min-height: auto;
  }
  
  .form-label {
    width: 100%;
    min-width: auto;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 12px 20px;
  }
  
  .form-content {
    padding: 12px 20px;
  }
}
</style> 