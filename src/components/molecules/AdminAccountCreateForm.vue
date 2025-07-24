<template>
  <div class="admin-account-create-form">

    
    <div class="form-section">
      <h3 class="section-title">基本情報</h3>
      
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-table">
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">氏名</span>
              <span class="required-badge">必須</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.lastName"
                placeholder=""
                :error="errors.lastName"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">氏名（フリガナ）</span>
              <span class="required-badge">必須</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.lastNameKana"
                placeholder=""
                :error="errors.lastNameKana"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">ログインID</span>
              <span class="required-badge">必須</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.loginId"
                placeholder="example@detomo.co.jp"
                :error="errors.loginId"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">パスワード</span>
              <span class="required-badge">必須</span>
            </div>
            <div class="form-content password-content">
              <div class="password-input-wrapper">
                <Input 
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="XXXXXXXXXXX"
                  :error="errors.password"
                  class="form-input password-input"
                />
                <button 
                  type="button" 
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <Icon :name="showPassword ? 'eye-slash' : 'eye'" />
                </button>
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">生年月日</span>
            </div>
            <div class="form-content">
              <BirthdayPicker 
                v-model="formData.birthDate"
                :startYear="1950"
                :endYear="2020"
                class="birthday-picker-field"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">性別</span>
            </div>
            <div class="form-content">
              <Select 
                v-model="formData.gender"
                :options="genderOptions"
                placeholder="女性"
                class="form-select gender-select"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">メールアドレス</span>
              <span class="required-badge">必須</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.email"
                type="email"
                placeholder="example@detomo.co.jp"
                :error="errors.email"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">電話番号</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.phoneNumber"
                type="tel"
                placeholder="000-0000-0000"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">アカウント有効/無効</span>
            </div>
            <div class="form-content radio-content">
              <Radio v-model="formData.accountStatus" value="active" name="accountStatus">
                有効
              </Radio>
              <Radio v-model="formData.accountStatus" value="inactive" name="accountStatus">
                無効
              </Radio>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <Button
            type="submit"
            variant="primary"
            size="large"
            :disabled="!isFormValid || isSubmitting"
            class="save-button"
          >
            {{ isSubmitting ? '保存中...' : '保存' }}
          </Button>
        </div>
      </form>
    </div>
    
    <!-- Success Notification Popup -->
    <NotificationPopup
      :isVisible="showSuccessPopup"
      type="success"
      title="アカウント作成完了"
      :message="successMessage"
      confirmText="OK"
      @close="closeSuccessPopup"
    />
  </div>
</template>

<script>
import Input from '../atoms/Input.vue'
import Select from '../atoms/Select.vue'
import Radio from '../atoms/Radio.vue'
import Button from '../atoms/Button.vue'
import Icon from '../atoms/Icon.vue'
import BirthdayPicker from '../atoms/BirthdayPicker.vue'
import NotificationPopup from './NotificationPopup.vue'
import { validateEmail } from '../../data/userData.js'

export default {
  name: 'AdminAccountCreateForm',
  components: {
    Input,
    Select,
    Radio,
    Button,
    Icon,
    BirthdayPicker,
    NotificationPopup
  },
  data() {
    return {
      showPassword: false,
      isSubmitting: false,
      showSuccessPopup: false,
      successMessage: '',
      formData: {
        lastName: '',
        lastNameKana: '',
        loginId: 'example@detomo.co.jp',
        password: 'XXXXXXXXXXX',
        birthDate: null,
        gender: '女性',
        email: 'example@detomo.co.jp',
        phoneNumber: '000-0000-0000',
        accountStatus: 'active'
      },
      errors: {
        lastName: '',
        lastNameKana: '',
        loginId: '',
        password: '',
        email: ''
      },

      genderOptions: [
        { value: '女性', label: '女性' },
        { value: '男性', label: '男性' },
        { value: 'その他', label: 'その他' }
      ]
    }
  },
  computed: {
    isFormValid() {
      return this.formData.lastName && 
             this.formData.lastNameKana && 
             this.formData.loginId && 
             this.formData.password && 
             this.formData.email &&
             !this.errors.lastName &&
             !this.errors.lastNameKana &&
             !this.errors.loginId &&
             !this.errors.password &&
             !this.errors.email
    }
  },
  watch: {
    'formData.lastName'() {
      if (this.errors.lastName) {
        this.errors.lastName = ''
      }
    },
    'formData.lastNameKana'() {
      if (this.errors.lastNameKana) {
        this.errors.lastNameKana = ''
      }
    },
    'formData.loginId'() {
      if (this.errors.loginId) {
        this.errors.loginId = ''
      }
    },
    'formData.password'() {
      if (this.errors.password) {
        this.errors.password = ''
      }
    },
    'formData.email'() {
      if (this.errors.email) {
        this.errors.email = ''
      }
    }
  },
  methods: {
    validateForm() {
      this.errors = { lastName: '', lastNameKana: '', loginId: '', password: '', email: '' }
      let isValid = true
      
      if (!this.formData.lastName.trim()) {
        this.errors.lastName = '氏名を入力してください'
        isValid = false
      }
      
      if (!this.formData.lastNameKana.trim()) {
        this.errors.lastNameKana = '氏名（フリガナ）を入力してください'
        isValid = false
      }
      
      if (!this.formData.loginId.trim()) {
        this.errors.loginId = 'ログインIDを入力してください'
        isValid = false
      } else if (!validateEmail(this.formData.loginId)) {
        this.errors.loginId = '有効なログインIDを入力してください'
        isValid = false
      }
      
      if (!this.formData.password.trim()) {
        this.errors.password = 'パスワードを入力してください'
        isValid = false
      } else if (this.formData.password.length < 8) {
        this.errors.password = 'パスワードは8文字以上で入力してください'
        isValid = false
      }
      
      if (!this.formData.email.trim()) {
        this.errors.email = 'メールアドレスを入力してください'
        isValid = false
      } else if (!validateEmail(this.formData.email)) {
        this.errors.email = '有効なメールアドレスを入力してください'
        isValid = false
      }
      
      return isValid
    },
    
    handleSubmit() {
      if (!this.validateForm()) return
      
      this.isSubmitting = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Creating new admin account:', this.formData)
        
        // Show success popup
        this.successMessage = '新しいアカウントが正常に作成されました。'
        this.showSuccessPopup = true
        
        this.isSubmitting = false
        
        // Emit success event
        this.$emit('account-created', {
          account: this.formData
        })
      }, 1000)
    },
    
    closeSuccessPopup() {
      this.showSuccessPopup = false
      // Optionally navigate back to client list or clear form
      this.resetForm()
    },
    
    resetForm() {
      this.formData = {
        lastName: '',
        lastNameKana: '',
        loginId: 'example@detomo.co.jp',
        password: 'XXXXXXXXXXX',
        birthDate: null,
        gender: '女性',
        email: 'example@detomo.co.jp',
        phoneNumber: '000-0000-0000',
        accountStatus: 'active'
      }
      this.errors = {
        lastName: '',
        lastNameKana: '',
        loginId: '',
        password: '',
        email: ''
      }
    }
  },
  emits: ['account-created']
}
</script>

<style scoped>
.admin-account-create-form {
  width: 100%;
  padding: 0px 30px 30px 30px;
}

.form-header {
  margin-bottom: 30px;
}



.form-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  padding: 20px 30px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.form {
  padding: 0;
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



.password-content {
  position: relative;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 500px;
  width: 100%;
}

.password-input {
  padding-right: 45px !important;
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
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:hover {
  color: #333;
}

.birthday-picker-field {
  max-width: 400px;
}

.gender-select {
  max-width: 200px;
}

.radio-content {
  gap: 30px;
  flex-direction: row;
  align-items: flex-start;
}

.form-actions {
  padding: 30px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
}

.save-button {
  background: #3b4a6b !important;
  border-color: #3b4a6b !important;
  padding: 12px 40px;
  font-size: 1rem;
  border-radius: 6px;
  min-width: 120px;
}

.save-button:hover:not(:disabled) {
  background: #2c3a54 !important;
  border-color: #2c3a54 !important;
}

.save-button:disabled {
  background: #bfc6d1 !important;
  border-color: #bfc6d1 !important;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-account-create-form {
    padding: 0px 20px 20px 20px;
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
    padding: 12px 16px;
  }
  
  .form-content {
    width: 100%;
    padding: 12px 16px;
  }
  
  .form-input,
  .password-input-wrapper {
    max-width: 100%;
  }
  
  .radio-content {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .admin-account-create-form {
    padding: 0px 15px 15px 15px;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    padding: 15px 20px;
    font-size: 1rem;
  }
  
  .form-label,
  .form-content {
    padding: 12px 15px;
  }
  
  .form-actions {
    padding: 20px 15px;
  }
  
  .radio-content {
    flex-direction: column;
    gap: 15px;
  }
}
</style> 