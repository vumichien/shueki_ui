<template>
  <div class="exhibition-fee-settings-form">
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">出展料設定</h3>
      </div>
      <div class="form-table">
        <!-- Store Plan Row -->
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">出店プラン</span>
          </div>
          <div class="form-content plan-content-row">
            <label class="plan-box" :class="{ selected: formData.storePlan === 'ganbare' }">
              <div class="plan-header">
                <Radio v-model="formData.storePlan" value="ganbare" name="storePlan" />
                <span class="plan-title">がんばれ！プラン</span>
              </div>
              <div class="plan-divider"></div>
              <div class="plan-body">
                <div class="plan-price-label">月額出店料</div>
                <div class="plan-price">25,000円/月額</div>
              </div>
            </label>
            <label class="plan-box" :class="{ selected: formData.storePlan === 'standard' }">
              <div class="plan-header">
                <Radio v-model="formData.storePlan" value="standard" name="storePlan" />
                <span class="plan-title">スタンダードプラン</span>
              </div>
              <div class="plan-divider"></div>
              <div class="plan-body">
                <div class="plan-price-label">月額出店料</div>
                <div class="plan-price">65,000円/月額</div>
              </div>
            </label>
            <label class="plan-box" :class="{ selected: formData.storePlan === 'megashop' }">
              <div class="plan-header">
                <Radio v-model="formData.storePlan" value="megashop" name="storePlan" />
                <span class="plan-title">メガショッププラン</span>
              </div>
              <div class="plan-divider"></div>
              <div class="plan-body">
                <div class="plan-price-label">月額出店料</div>
                <div class="plan-price">130,000円/月額</div>
              </div>
            </label>
          </div>
        </div>
        <!-- R-SNS Row -->
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">R-SNS</span>
          </div>
          <div class="form-content radio-content-row">
            <Radio v-model="formData.rSns" :value="true" name="rSns">使用している</Radio>
            <Radio v-model="formData.rSns" :value="false" name="rSns">使用していない</Radio>
          </div>
        </div>
        <!-- RMS商品一括編集 Row -->
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">RMS商品一括編集</span>
          </div>
          <div class="form-content radio-content-row">
            <Radio v-model="formData.rmsBatchEdit" :value="true" name="rmsBatchEdit">使用している</Radio>
            <Radio v-model="formData.rmsBatchEdit" :value="false" name="rmsBatchEdit">使用していない</Radio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Radio from '../atoms/Radio.vue'
export default {
  name: 'ExhibitionFeeSettingsForm',
  components: { Radio },
  data() {
    return {
      formData: {
        storePlan: 'ganbare',
        rSns: true,
        rmsBatchEdit: true
      }
    }
  },
  methods: {
    save() {
      this.$emit('save', this.formData)
    }
  },
  emits: ['save']
}
</script>

<style scoped>
.exhibition-fee-settings-form {
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
  align-items: center;
  gap: 24px;
}
.plan-content-row {
  gap: 24px;
  justify-content: flex-start;
}
.plan-box {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 0 0 16px 0;
  min-width: 220px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.plan-box.selected {
  border-color: #3b82f6;
  background: #f8fafc;
}
.plan-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 18px 20px 10px 20px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
}
.plan-title {
  font-weight: 600;
  color: #222;
  font-size: 1rem;
}
.plan-divider {
  border-bottom: 1.5px solid #f3dada;
  margin: 0 16px 0 16px;
}
.plan-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 0 0 0;
}
.plan-price-label {
  color: #888;
  font-size: 1rem;
  margin-bottom: 2px;
}
.plan-price {
  color: #dc3545;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 2px;
}
.radio-content-row {
  gap: 32px;
}
.label-text {
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}
@media (max-width: 900px) {
  .plan-content-row {
    flex-direction: column;
    gap: 12px;
  }
  .plan-box {
    min-width: 0;
    width: 100%;
    padding: 0 0 16px 0;
  }
}
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
    gap: 12px;
  }
}
</style> 