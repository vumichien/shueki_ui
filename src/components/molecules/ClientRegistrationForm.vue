<template>
  <div class="client-registration-form">
    <div class="form-section">
      <h3 class="section-title">基本情報</h3>
      
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-table">
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">クライアント名</span>
              <span class="required-badge">必須</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.clientName"
                placeholder="株式会社A"
                :error="errors.clientName"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">ホームページ</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.homepage"
                placeholder="content"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">担当者氏名</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.contactPerson"
                placeholder="田中"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-label">
              <span class="label-text">担当者メールアドレス</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.contactEmail"
                type="email"
                placeholder="tanaka@detomo.com"
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
              <span class="label-text">所在地</span>
            </div>
            <div class="form-content">
              <Input 
                v-model="formData.location"
                placeholder="神奈川県"
                class="form-input"
              />
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="form-section">
      <h3 class="section-title">スマプロログイン情報</h3>
      
      <div class="form-table">
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">ログインID</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <div class="input-with-suffix">
              <Input 
                v-model="formData.loginId"
                placeholder="email@detomo.co.jp"
                :error="errors.loginId"
                class="form-input"
              />
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">パスワード（初期）</span>
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
      </div>
    </div>

    <div class="form-section">
      <h3 class="section-title">楽天店舗</h3>
      
      <div class="form-table">
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">ログインID（1段階目）</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <div class="input-with-suffix">
              <Input 
                v-model="formData.rakutenLoginStage1"
                placeholder="example@detomo.co.jp"
                :error="errors.rakutenLoginStage1"
                class="form-input"
              />
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">パスワード（1段階目）</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content password-content">
            <div class="password-input-wrapper">
              <Input 
                v-model="formData.rakutenPasswordStage1"
                :type="showRakutenPassword1 ? 'text' : 'password'"
                placeholder="XXXXXXXXXXX"
                :error="errors.rakutenPasswordStage1"
                class="form-input password-input"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showRakutenPassword1 = !showRakutenPassword1"
              >
                <Icon :name="showRakutenPassword1 ? 'eye-slash' : 'eye'" />
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">ログインID（2段階目）</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <div class="input-with-suffix">
              <Input 
                v-model="formData.rakutenLoginStage2"
                placeholder="example.co.jp"
                :error="errors.rakutenLoginStage2"
                class="form-input"
              />
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">パスワード（2段階目）</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content password-content">
            <div class="password-input-wrapper">
              <Input 
                v-model="formData.rakutenPasswordStage2"
                :type="showRakutenPassword2 ? 'text' : 'password'"
                placeholder="XXXXXXXXXXX"
                :error="errors.rakutenPasswordStage2"
                class="form-input password-input"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showRakutenPassword2 = !showRakutenPassword2"
              >
                <Icon :name="showRakutenPassword2 ? 'eye-slash' : 'eye'" />
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">アカウント有効/無効</span>
          </div>
          <div class="form-content radio-content">
            <Radio v-model="formData.rakutenAccountStatus" value="active" name="rakutenAccountStatus">
              有効
            </Radio>
            <Radio v-model="formData.rakutenAccountStatus" value="inactive" name="rakutenAccountStatus">
              無効
            </Radio>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">利用開始日</span>
          </div>
          <div class="form-content">
            <DatePicker 
              v-model="formData.rakutenStartDate"
              placeholder="2025年06月01日"
              :showLabel="false"
              class="form-datepicker"
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">契約状態</span>
          </div>
          <div class="form-content">
            <Select 
              v-model="formData.rakutenContractStatus"
              :options="contractStatusOptions"
              placeholder="本契約"
              class="form-select contract-select"
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">備考</span>
          </div>
          <div class="form-content form-content-notes">
            <RichTextEditor 
              v-model="formData.rakutenNotes"
              placeholder="入力してください"
              class="form-richtext"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3 class="section-title">Amazon店舗</h3>
      
      <div class="form-table">
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">ログイン</span>
            <span class="required-badge">必須</span>
          </div>
          <div class="form-content">
            <div class="input-with-suffix">
              <Input 
                v-model="formData.amazonLogin"
                placeholder="example@detomo.co.jp"
                :error="errors.amazonLogin"
                class="form-input"
              />
            </div>
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
                v-model="formData.amazonPassword"
                :type="showAmazonPassword ? 'text' : 'password'"
                placeholder="XXXXXXXXXXX"
                :error="errors.amazonPassword"
                class="form-input password-input"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showAmazonPassword = !showAmazonPassword"
              >
                <Icon :name="showAmazonPassword ? 'eye-slash' : 'eye'" />
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">アカウント有効/無効</span>
          </div>
          <div class="form-content radio-content">
            <Radio v-model="formData.amazonAccountStatus" value="active" name="amazonAccountStatus">
              有効
            </Radio>
            <Radio v-model="formData.amazonAccountStatus" value="inactive" name="amazonAccountStatus">
              無効
            </Radio>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">利用開始日</span>
          </div>
          <div class="form-content">
            <DatePicker 
              v-model="formData.amazonStartDate"
              placeholder="2025年06月01日"
              :showLabel="false"
              class="form-datepicker"
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">契約状態</span>
          </div>
          <div class="form-content">
            <Select 
              v-model="formData.amazonContractStatus"
              :options="contractStatusOptions"
              placeholder="本契約"
              class="form-select contract-select"
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-label">
            <span class="label-text">備考</span>
          </div>
          <div class="form-content form-content-notes">
            <RichTextEditor 
              v-model="formData.amazonNotes"
              placeholder="入力してください"
              class="form-richtext"
            />
          </div>
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
        @click="handleSubmit"
      >
        {{ isSubmitting ? '保存中...' : '保存' }}
      </Button>
    </div>
    
    <!-- Success Notification Popup -->
    <NotificationPopup
      :isVisible="showSuccessPopup"
      type="success"
      title="クライアント登録完了"
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
import DatePicker from '../atoms/DatePicker.vue'
import NotificationPopup from './NotificationPopup.vue'
import { validateEmail } from '../../data/userData.js'
import { addNewClient } from '../../data/clientData.js'

// Lazy load the heavy rich text editor component with error handling
const RichTextEditor = () => import('../atoms/RichTextEditor.vue').catch(err => {
  console.error('Failed to load RichTextEditor:', err)
  // Return a simple fallback component that matches the interface
  return {
    template: `
      <div class="fallback-rich-editor">
        <textarea 
          :value="modelValue" 
          :placeholder="placeholder" 
          :disabled="disabled"
          @input="$emit('update:modelValue', $event.target.value)"
          @change="$emit('change', $event.target.value)"
          class="fallback-textarea"
        ></textarea>
      </div>
    `,
    props: ['modelValue', 'placeholder', 'disabled', 'error'],
    emits: ['update:modelValue', 'change'],
    style: `
      .fallback-rich-editor .fallback-textarea {
        width: 100%;
        min-height: 120px;
        padding: 12px 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: inherit;
        font-size: 1rem;
        line-height: 1.5;
        resize: vertical;
      }
    `
  }
})

export default {
  name: 'ClientRegistrationForm',
  components: {
    Input,
    Select,
    Radio,
    Button,
    Icon,
    DatePicker,
    RichTextEditor,
    NotificationPopup
  },
  data() {
    return {
      showPassword: false,
      showRakutenPassword1: false,
      showRakutenPassword2: false,
      showAmazonPassword: false,
      isSubmitting: false,
      showSuccessPopup: false,
      successMessage: '',
      formData: {
        clientName: '',
        homepage: '',
        contactPerson: '',
        contactEmail: '',
        phoneNumber: '',
        location: '',
        loginId: '',
        password: '',
        rakutenLoginStage1: '',
        rakutenPasswordStage1: '',
        rakutenLoginStage2: '',
        rakutenPasswordStage2: '',
        accountStatus: 'active',
        startDate: '2025年06月01日',
        contractStatus: '本契約',
        notes: ''
      },
      errors: {
        clientName: '',
        loginId: '',
        password: '',
        rakutenLoginStage1: '',
        rakutenPasswordStage1: '',
        rakutenLoginStage2: '',
        rakutenPasswordStage2: ''
      },

      contractStatusOptions: [
        { value: '本契約', label: '本契約' },
        { value: '試用期間', label: '試用期間' },
        { value: '停止', label: '停止' }
      ]
    }
  },
  computed: {
    isFormValid() {
      return this.formData.clientName && 
             this.formData.loginId && 
             this.formData.password && 
             this.formData.rakutenLoginStage1 && 
             this.formData.rakutenPasswordStage1 && 
             this.formData.rakutenLoginStage2 && 
             this.formData.rakutenPasswordStage2 &&
             this.formData.amazonLogin &&
             this.formData.amazonPassword &&
             !this.errors.clientName &&
             !this.errors.loginId &&
             !this.errors.password &&
             !this.errors.rakutenLoginStage1 &&
             !this.errors.rakutenPasswordStage1 &&
             !this.errors.rakutenLoginStage2 &&
             !this.errors.rakutenPasswordStage2 &&
             !this.errors.amazonLogin &&
             !this.errors.amazonPassword
    }
  },
  watch: {
    'formData.clientName'() {
      if (this.errors.clientName) {
        this.errors.clientName = ''
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
    'formData.rakutenLoginStage1'() {
      if (this.errors.rakutenLoginStage1) {
        this.errors.rakutenLoginStage1 = ''
      }
    },
    'formData.rakutenPasswordStage1'() {
      if (this.errors.rakutenPasswordStage1) {
        this.errors.rakutenPasswordStage1 = ''
      }
    },
    'formData.rakutenLoginStage2'() {
      if (this.errors.rakutenLoginStage2) {
        this.errors.rakutenLoginStage2 = ''
      }
    },
    'formData.rakutenPasswordStage2'() {
      if (this.errors.rakutenPasswordStage2) {
        this.errors.rakutenPasswordStage2 = ''
      }
    },
    'formData.amazonLogin'() {
      if (this.errors.amazonLogin) {
        this.errors.amazonLogin = ''
      }
    },
    'formData.amazonPassword'() {
      if (this.errors.amazonPassword) {
        this.errors.amazonPassword = ''
      }
    }
  },
  methods: {
    validateForm() {
      this.errors = { 
        clientName: '', 
        loginId: '', 
        password: '', 
        rakutenLoginStage1: '', 
        rakutenPasswordStage1: '', 
        rakutenLoginStage2: '', 
        rakutenPasswordStage2: '',
        amazonLogin: '',
        amazonPassword: ''
      }
      let isValid = true
      
      if (!this.formData.clientName.trim()) {
        this.errors.clientName = 'クライアント名を入力してください'
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
      
      if (!this.formData.rakutenLoginStage1.trim()) {
        this.errors.rakutenLoginStage1 = 'ログインID（1段階目）を入力してください'
        isValid = false
      } else if (!validateEmail(this.formData.rakutenLoginStage1)) {
        this.errors.rakutenLoginStage1 = '有効なログインIDを入力してください'
        isValid = false
      }
      
      if (!this.formData.rakutenPasswordStage1.trim()) {
        this.errors.rakutenPasswordStage1 = 'パスワード（1段階目）を入力してください'
        isValid = false
      }
      
      if (!this.formData.rakutenLoginStage2.trim()) {
        this.errors.rakutenLoginStage2 = 'ログインID（2段階目）を入力してください'
        isValid = false
      }
      
      if (!this.formData.rakutenPasswordStage2.trim()) {
        this.errors.rakutenPasswordStage2 = 'パスワード（2段階目）を入力してください'
        isValid = false
      }
      
      if (!this.formData.amazonLogin.trim()) {
        this.errors.amazonLogin = 'Amazonログインを入力してください'
        isValid = false
      } else if (!validateEmail(this.formData.amazonLogin)) {
        this.errors.amazonLogin = '有効なログインIDを入力してください'
        isValid = false
      }
      
      if (!this.formData.amazonPassword.trim()) {
        this.errors.amazonPassword = 'Amazonパスワードを入力してください'
        isValid = false
      }
      
      return isValid
    },
    
    handleSubmit() {
      if (!this.validateForm()) return
      
      this.isSubmitting = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Creating new client:', this.formData)
        
        // Add client to data
        const newClient = addNewClient(this.formData)
        console.log('New client added:', newClient)
        
        // Show success popup
        this.successMessage = '新しいクライアントが正常に登録されました。'
        this.showSuccessPopup = true
        
        this.isSubmitting = false
        
        // Emit success event
        this.$emit('client-created', {
          client: newClient
        })
      }, 1000)
    },
    
    closeSuccessPopup() {
      this.showSuccessPopup = false
      // Navigate back to client list
      this.$router.push('/admin/clients')
    },
    
    resetForm() {
      this.formData = {
        clientName: '',
        homepage: '',
        contactPerson: '',
        contactEmail: '',
        phoneNumber: '',
        location: '',
        loginId: '',
        password: '',
        rakutenLoginStage1: '',
        rakutenPasswordStage1: '',
        rakutenLoginStage2: '',
        rakutenPasswordStage2: '',
        rakutenAccountStatus: 'active',
        rakutenStartDate: null,
        rakutenContractStatus: '本契約',
        rakutenNotes: '',
        amazonLogin: '',
        amazonPassword: '',
        amazonAccountStatus: 'active',
        amazonStartDate: null,
        amazonContractStatus: '本契約',
        amazonNotes: ''
      }
      this.errors = {
        clientName: '',
        loginId: '',
        password: '',
        rakutenLoginStage1: '',
        rakutenPasswordStage1: '',
        rakutenLoginStage2: '',
        rakutenPasswordStage2: '',
        amazonLogin: '',
        amazonPassword: ''
      }
    }
  },
  emits: ['client-created']
}
</script>

<style scoped>
.client-registration-form {
  width: 100%;
  padding: 0px 30px 30px 30px;
}

.form-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  overflow: hidden;
  margin-bottom: 30px;
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
  overflow: hidden;
  box-sizing: border-box;
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

.input-with-suffix {
  position: relative;
  display: flex;
  align-items: center;
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

.start-date-select,
.contract-select {
  max-width: 200px;
}

.form-datepicker {
  max-width: 200px;
}

.radio-content {
  gap: 30px;
  flex-direction: row;
  align-items: flex-start;
}

.form-textarea {
  width: 100%;
  max-width: 500px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.form-textarea::placeholder {
  color: #999;
}

.form-richtext {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-content-notes {
  height: 250px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
}

.form-actions {
  /* padding: 30px; */
  /* background: white; */
  display: flex;
  justify-content: center;
}

.save-button {
  background: #2d3748 !important;
  border: 1px solid #2d3748 !important;
  color: white !important;
  padding: 14px 30px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 4px;
  min-width: 100px;
  transition: all 0.2s ease;
}

.save-button:hover:not(:disabled) {
  background: #1a202c !important;
  border-color: #1a202c !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.save-button:disabled {
  background: #e2e8f0 !important;
  border-color: #e2e8f0 !important;
  color: #a0aec0 !important;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .client-registration-form {
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
  .password-input-wrapper,
  .form-textarea,
  .form-richtext {
    max-width: 100%;
  }
  
  .form-richtext {
    max-width: 100%;
  }
  
  .form-content-notes {
    height: 200px;
    padding: 16px 16px;
  }
  
  .radio-content {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .client-registration-form {
    padding: 0px 15px 15px 15px;
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