<template>
  <div class="revenue-default-settings-form">
    <!-- 会計期間設定 Section -->
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
              v-model="formData.fiscalYearStart" 
              :options="fiscalYearOptions"
              class="fiscal-year-select"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 手入力項目設定 Section -->
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">手入力項目設定</h3>
      </div>
      <div class="form-table">
        <!-- 人件費 Row -->
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">人件費</span>
          </div>
          <div class="form-content cost-row">
            <div class="cost-input-group">
              <Input 
                v-model="formData.laborCost" 
                type="number"
                class="cost-input"
                placeholder="10,000"
              />
              <span class="unit">円</span>
            </div>
            <span class="period-label">有効期間</span>
            <div class="date-input-group">
              <Input 
                v-model="formData.laborCostDate" 
                type="date"
                class="date-input"
              />
            </div>
            <Button 
              variant="primary" 
              size="small" 
              class="add-btn"
              :disabled="showLaborCostExtraRow"
              @click="showLaborCostExtraRow = true"
            >
              追加
            </Button>
          </div>
        </div>
        <!-- 人件費 Extra Row -->
        <div v-if="showLaborCostExtraRow" class="form-row labor-extra-row">
          <div class="form-label"></div>
          <div class="form-content cost-row">
            <div class="cost-input-group">
              <Input 
                v-model="laborCostExtra.amount" 
                type="number"
                class="cost-input"
                placeholder="10,000"
              />
              <span class="unit">円</span>
            </div>
            <span class="period-label">有効期間</span>
            <div class="date-input-group">
              <Input 
                v-model="laborCostExtra.date" 
                type="date"
                class="date-input"
              />
            </div>
            <Button 
              variant="danger" 
              size="small" 
              class="delete-btn"
              @click="removeLaborCostExtra"
            >
              削除
            </Button>
          </div>
        </div>

        <!-- 原価率 Row -->
        <div class="form-row cost-rate-row">
          <div class="form-label">
            <span class="label-text">原価率</span>
          </div>
          <div class="form-content cost-rate-content">
            <div class="cost-rate-options">
              <div class="radio-with-input-row">
                <Radio 
                  v-model="formData.costRateType" 
                  value="manual" 
                  name="costRateType"
                >
                  原価率入力
                </Radio>
                <div v-if="formData.costRateType === 'manual'" class="cost-input-group">
                  <Input 
                    v-model="formData.costRateValue" 
                    type="number"
                    class="cost-input"
                    placeholder="70"
                  />
                  <span class="unit">%</span>
                </div>
              </div>
              <div class="radio-option">
                <Radio 
                  v-model="formData.costRateType" 
                  value="product" 
                  name="costRateType"
                >
                  商品ごとの原価使用
                </Radio>
              </div>
            </div>
          </div>
        </div>

        <!-- 送料 Row -->
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">送料</span>
          </div>
          <div class="form-content cost-row">
            <div class="cost-input-group">
              <Input 
                v-model="formData.shippingCost" 
                type="number"
                class="cost-input"
                placeholder="20,000"
              />
              <span class="unit">円</span>
            </div>
            <span class="period-label">有効期間</span>
            <div class="date-input-group">
              <Input 
                v-model="formData.shippingCostDate" 
                type="date"
                class="date-input"
              />
            </div>
            <Button 
              variant="primary" 
              size="small" 
              class="add-btn"
              @click="addShippingCost"
            >
              追加
            </Button>
          </div>
        </div>

        <!-- 共通費 Row -->
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">共通費</span>
          </div>
          <div class="form-content cost-row">
            <div class="cost-input-group">
              <Input 
                v-model="formData.commonCost" 
                type="number"
                class="cost-input"
                placeholder="10,000"
              />
              <span class="unit">円</span>
            </div>
            <span class="period-label">有効期間</span>
            <div class="date-input-group">
              <Input 
                v-model="formData.commonCostDate" 
                type="date"
                class="date-input"
              />
            </div>
            <Button 
              variant="primary" 
              size="small" 
              class="add-btn"
              @click="addCommonCost"
            >
              追加
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '../atoms/Input.vue'
import Radio from '../atoms/Radio.vue'
import Select from '../atoms/Select.vue'
import Button from '../atoms/Button.vue'

export default {
  name: 'RevenueDefaultSettingsForm',
  components: {
    Input,
    Radio,
    Select,
    Button
  },
  data() {
    return {
      formData: {
        fiscalYearStart: '2025年4月',
        laborCost: '10000',
        laborCostDate: '2025-01-02',
        costRateType: 'manual',
        costRateValue: '70',
        shippingCost: '20000',
        shippingCostDate: '2025-01-02',
        commonCost: '10000',
        commonCostDate: '2025-01-02'
      },
      fiscalYearOptions: [
        { value: '2025年4月', label: '2025年4月' },
        { value: '2024年4月', label: '2024年4月' },
        { value: '2026年4月', label: '2026年4月' }
      ],
      showLaborCostExtraRow: false,
      laborCostExtra: {
        amount: '',
        date: ''
      }
    }
  },
  methods: {
    save() {
      console.log('Saving revenue default settings:', this.formData)
      this.$emit('save', this.formData)
    },
    addLaborCost() {
      // Show extra row
      this.showLaborCostExtraRow = true
    },
    removeLaborCostExtra() {
      this.showLaborCostExtraRow = false
      this.laborCostExtra.amount = ''
      this.laborCostExtra.date = ''
    },
    addShippingCost() {
      console.log('Adding shipping cost:', this.formData.shippingCost, this.formData.shippingCostDate)
    },
    addCommonCost() {
      console.log('Adding common cost:', this.formData.commonCost, this.formData.commonCostDate)
    }
  },
  emits: ['save']
}
</script>

<style scoped>
.revenue-default-settings-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.labor-extra-row {
  background: #f8fafc;
}

.cost-rate-row {
  min-height: 120px;
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
  align-items: center;
}

.cost-row {
  gap: 24px;
}

.cost-rate-content {
  align-items: flex-start;
  padding-top: 20px;
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

.fiscal-year-select {
  width: 200px;
}

.cost-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cost-input {
  width: 120px;
  text-align: right;
}

.unit {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.period-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.date-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.date-input {
  width: 150px;
}

.add-btn {
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.add-btn:disabled {
  background: #bfc6d1;
  color: #fff;
  cursor: not-allowed;
}

.add-btn:hover:enabled {
  background: #1e40af;
}

.delete-btn {
  background: #fff;
  color: #dc3545;
  border: 1px solid #dc3545;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}

.delete-btn:hover {
  background: #dc3545;
  color: #fff;
}

.cost-rate-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.radio-with-input-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.radio-option {
  display: flex;
  align-items: center;
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
  
  .cost-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .cost-rate-content {
    align-items: flex-start;
    padding-top: 12px;
  }
  
  .radio-with-input-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style> 