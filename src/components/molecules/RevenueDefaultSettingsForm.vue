<template>
  <div class="revenue-default-settings-form">
    <!-- 手入力項目設定 Section -->
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">手入力項目設定</h3>
      </div>
      
      <div class="form-table">
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">出店プラン</span>
          </div>
          <div class="form-content">
            <div class="radio-group-vertical">
              <Radio 
                v-model="formData.storePlan" 
                value="ganbatte_plan" 
                name="storePlan"
              >
                がんばれ！プラン
              </Radio>
              <Radio 
                v-model="formData.storePlan" 
                value="standard_plan" 
                name="storePlan"
              >
                スタンダードプラン
              </Radio>
              <Radio 
                v-model="formData.storePlan" 
                value="mega_shop_plan" 
                name="storePlan"
              >
                メガショッププラン
              </Radio>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">R-SNS</span>
          </div>
          <div class="form-content">
            <div class="radio-group">
              <Radio 
                v-model="formData.rsns" 
                value="using" 
                name="rsns"
              >
                使用している
              </Radio>
              <Radio 
                v-model="formData.rsns" 
                value="not_using" 
                name="rsns"
              >
                使用していない
              </Radio>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">RMS商品一括編集</span>
          </div>
          <div class="form-content">
            <div class="radio-group">
              <Radio 
                v-model="formData.rmsBulkEdit" 
                value="using" 
                name="rmsBulkEdit"
              >
                使用している
              </Radio>
              <Radio 
                v-model="formData.rmsBulkEdit" 
                value="not_using" 
                name="rmsBulkEdit"
              >
                使用していない
              </Radio>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">人件費</span>
          </div>
          <div class="form-content">
            <div class="input-with-checkbox">
              <div class="input-group">
                <Input 
                  v-model="formData.laborCost" 
                  type="number"
                  class="cost-input"
                />
                <span class="currency-unit">円</span>
              </div>
              <div class="checkbox-group">
                <Checkbox 
                  v-model="formData.laborCostDefault"
                  class="default-checkbox"
                >
                  デフォルト値
                </Checkbox>
                <div class="input-group">
                  <Input 
                    v-model="formData.laborCostDefaultValue" 
                    type="number"
                    class="cost-input"
                  />
                  <span class="currency-unit">円</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">原価率</span>
          </div>
          <div class="form-content">
            <div class="cost-rate-group">
              <div class="radio-group-vertical">
                <Radio 
                  v-model="formData.costRate" 
                  value="manual_input" 
                  name="costRate"
                >
                  原価率入力
                </Radio>
                <div class="radio-with-button">
                  <Radio 
                    v-model="formData.costRate" 
                    value="product_cost" 
                    name="costRate"
                  >
                    商品ごとの原価使用
                  </Radio>
                  <Button 
                    variant="primary" 
                    size="small" 
                    class="csv-import-btn"
                    @click="handleCsvImport"
                  >
                    CSVインポート
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">送料</span>
          </div>
          <div class="form-content">
            <div class="input-with-checkbox">
              <div class="input-group">
                <Input 
                  v-model="formData.shippingCost" 
                  type="number"
                  class="cost-input"
                />
                <span class="currency-unit">円</span>
              </div>
              <div class="checkbox-group">
                <Checkbox 
                  v-model="formData.shippingCostDefault"
                  class="default-checkbox"
                >
                  デフォルト値
                </Checkbox>
                <div class="input-group">
                  <Input 
                    v-model="formData.shippingCostDefaultValue" 
                    type="number"
                    class="cost-input"
                  />
                  <span class="currency-unit">円</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">共通費</span>
          </div>
          <div class="form-content">
            <div class="input-with-checkbox">
              <div class="input-group">
                <Input 
                  v-model="formData.commonCost" 
                  type="number"
                  class="cost-input"
                />
                <span class="currency-unit">円</span>
              </div>
              <div class="checkbox-group">
                <Checkbox 
                  v-model="formData.commonCostDefault"
                  class="default-checkbox"
                >
                  デフォルト値
                </Checkbox>
                <div class="input-group">
                  <Input 
                    v-model="formData.commonCostDefaultValue" 
                    type="number"
                    class="cost-input"
                  />
                  <span class="currency-unit">円</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '../atoms/Input.vue'
import Radio from '../atoms/Radio.vue'
import Checkbox from '../atoms/Checkbox.vue'
import Button from '../atoms/Button.vue'

export default {
  name: 'RevenueDefaultSettingsForm',
  components: {
    Input,
    Radio,
    Checkbox,
    Button
  },
  data() {
    return {
      formData: {
        storePlan: 'ganbatte_plan',
        rsns: 'using',
        rmsBulkEdit: 'using',
        laborCost: '10000',
        laborCostDefault: true,
        laborCostDefaultValue: '10000',
        costRate: 'product_cost',
        shippingCost: '20000',
        shippingCostDefault: true,
        shippingCostDefaultValue: '20000',
        commonCost: '10000',
        commonCostDefault: true,
        commonCostDefaultValue: '10000'
      }
    }
  },
  methods: {
    save() {
      console.log('Saving revenue default settings:', this.formData)
      this.$emit('save', this.formData)
    },
    handleCsvImport() {
      // Handle CSV import logic
      console.log('CSV import clicked')
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

.form-label {
  width: 200px;
  min-width: 200px;
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

.radio-group {
  display: flex;
  gap: 90px;
  align-items: center;
  flex-wrap: wrap;
}

.input-with-checkbox {
  display: flex;
  align-items: center;
  gap: 60px;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cost-input {
  width: 120px;
  text-align: right;
}

.currency-unit {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.default-checkbox {
  white-space: nowrap;
}

.cost-rate-group {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.radio-group-vertical {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.radio-with-button {
  display: flex;
  align-items: center;
  gap: 45px;
}

.csv-import-btn {
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.csv-import-btn:hover {
  background: #1e40af;
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
  
  .radio-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .input-with-checkbox {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .cost-rate-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .radio-with-button {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .checkbox-group {
    flex-wrap: wrap;
  }
}
</style> 