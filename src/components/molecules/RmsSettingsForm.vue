  <template>
  <div class="rms-settings-form">
    <div class="settings-card">
      <div class="card-header">
        <h3 class="card-title">RMS情報設定</h3>
      </div>
      
      <div class="form-table">
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">ログイン（1段階目）</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <Input 
              v-model="formData.loginStage1" 
              placeholder="CL001"
              class="form-input"
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">パスワード（1段階目）</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <div class="password-input-wrapper">
              <Input 
                v-model="formData.passwordStage1" 
                :type="showPassword1 ? 'text' : 'password'"
                placeholder="xxxxxxxxxxxxxxxxxxxxxxx"
                class="form-input password-input"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showPassword1 = !showPassword1"
              >
                <Icon :name="showPassword1 ? 'eye-slash' : 'eye'" />
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">ログイン（2段階目）</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <Input 
              v-model="formData.loginStage2" 
              placeholder="CL002"
              class="form-input"
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">パスワード（2段階目）</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <div class="password-input-wrapper">
              <Input 
                v-model="formData.passwordStage2" 
                :type="showPassword2 ? 'text' : 'password'"
                placeholder="xxxxxxxxxxxxxxxxxxxxxxx"
                class="form-input password-input"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showPassword2 = !showPassword2"
              >
                <Icon :name="showPassword2 ? 'eye-slash' : 'eye'" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '../atoms/Input.vue'
import Icon from '../atoms/Icon.vue'

export default {
  name: 'RmsSettingsForm',
  components: {
    Input,
    Icon
  },
  data() {
    return {
      showPassword1: false,
      showPassword2: false,
      formData: {
        loginStage1: 'CL001',
        passwordStage1: 'xxxxxxxxxxxxxxxxxxxxxxx',
        loginStage2: 'CL002',
        passwordStage2: 'xxxxxxxxxxxxxxxxxxxxxxx'
      }
    }
  },
  methods: {
    save() {
      console.log('Saving RMS settings:', this.formData)
      this.$emit('save', this.formData)
    }
  },
  emits: ['save']
}
</script>

<style scoped>
.rms-settings-form {
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

.form-input {
  max-width: 500px;
  width: 100%;
}

.password-input-wrapper {
  position: relative;
  display: inline-block;
  max-width: 500px;
  width: 100%;
}

.password-input {
  padding-right: 45px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #333;
}

.password-toggle:focus {
  outline: none;
  color: #3b82f6;
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