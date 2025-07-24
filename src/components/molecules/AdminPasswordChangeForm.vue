<template>
  <div class="password-change-form">
    <div class="form-header">
      <h2>管理者パスワード変更</h2>
    </div>
    
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <FloatingInput
          type="password"
          v-model="formData.currentPassword"
          placeholder="現在のパスワード"
          :error="errors.currentPassword"
        />
      </div>
      
      <div class="form-group">
        <FloatingInput
          type="password"
          v-model="formData.newPassword"
          placeholder="新しいパスワード"
          :error="errors.newPassword"
        />
      </div>
      
      <div class="form-group">
        <FloatingInput
          type="password"
          v-model="formData.confirmPassword"
          placeholder="新しいパスワード（確認用）"
          :error="errors.confirmPassword"
        />
      </div>
      
      <div class="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          :disabled="!isFormValid || isSubmitting"
        >
          {{ isSubmitting ? '変更中...' : '変更' }}
        </Button>
      </div>
    </form>
    
    <!-- Success Notification Popup -->
    <NotificationPopup
      :isVisible="showSuccessPopup"
      type="success"
      title="パスワード変更完了"
      :message="successMessage"
      confirmText="OK"
      @close="closeSuccessPopup"
    />
  </div>
</template>

<script>
import FloatingInput from '../atoms/FloatingInput.vue'
import Button from '../atoms/Button.vue'
import NotificationPopup from './NotificationPopup.vue'
import { changePassword, validatePassword } from '../../data/userData.js'

export default {
  name: 'AdminPasswordChangeForm',
  components: {
    FloatingInput,
    Button,
    NotificationPopup
  },
  data() {
    return {
      formData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      errors: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      isSubmitting: false,
      showSuccessPopup: false,
      successMessage: ''
    }
  },
  computed: {
    isFormValid() {
      return this.formData.currentPassword && 
             this.formData.newPassword && 
             this.formData.confirmPassword &&
             !this.errors.currentPassword &&
             !this.errors.newPassword &&
             !this.errors.confirmPassword
    }
  },
  watch: {
    'formData.currentPassword'() {
      this.validateCurrentPassword()
    },
    'formData.newPassword'() {
      this.validateNewPassword()
    },
    'formData.confirmPassword'() {
      this.validateConfirmPassword()
    }
  },
  methods: {
    validateCurrentPassword() {
      if (!this.formData.currentPassword) {
        this.errors.currentPassword = '現在のパスワードを入力してください'
      } else {
        this.errors.currentPassword = ''
      }
    },
    validateNewPassword() {
      if (!this.formData.newPassword) {
        this.errors.newPassword = '新しいパスワードを入力してください'
      } else {
        const validation = validatePassword(this.formData.newPassword)
        if (!validation.valid) {
          this.errors.newPassword = validation.message
        } else if (this.formData.newPassword === this.formData.currentPassword) {
          this.errors.newPassword = '現在のパスワードと異なるパスワードを入力してください'
        } else {
          this.errors.newPassword = ''
        }
      }
      
      // Re-validate confirm password if it exists
      if (this.formData.confirmPassword) {
        this.validateConfirmPassword()
      }
    },
    validateConfirmPassword() {
      if (!this.formData.confirmPassword) {
        this.errors.confirmPassword = '確認用パスワードを入力してください'
      } else if (this.formData.confirmPassword !== this.formData.newPassword) {
        this.errors.confirmPassword = '新しいパスワードと一致しません'
      } else {
        this.errors.confirmPassword = ''
      }
    },
    async handleSubmit() {
      // Validate all fields
      this.validateCurrentPassword()
      this.validateNewPassword()
      this.validateConfirmPassword()
      
      if (!this.isFormValid) {
        return
      }
      
      this.isSubmitting = true
      
      try {
        // Get current admin from localStorage
        const adminData = localStorage.getItem('adminUser')
        if (!adminData) {
          this.errors.currentPassword = '管理者情報が見つかりません'
          return
        }
        
        const admin = JSON.parse(adminData)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Change password using userData.js
        const result = changePassword(admin.id, this.formData.currentPassword, this.formData.newPassword)
        
        if (result.success) {
          // Emit success event
          this.$emit('passwordChanged', {
            currentPassword: this.formData.currentPassword,
            newPassword: this.formData.newPassword
          })
          
          // Reset form
          this.formData = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }
          
          // Clear any errors
          this.errors = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }
          
          // Show success popup
          this.successMessage = result.message
          this.showSuccessPopup = true
        } else {
          // Show error in form
          this.errors.currentPassword = result.error
        }
        
      } catch (error) {
        console.error('Admin password change failed:', error)
        this.errors.currentPassword = 'パスワード変更に失敗しました。もう一度お試しください。'
      } finally {
        this.isSubmitting = false
      }
    },
    closeSuccessPopup() {
      this.showSuccessPopup = false
      this.successMessage = ''
    }
  },
  emits: ['passwordChanged']
}
</script>

<style scoped>
.password-change-form {
  background: #FFFFFF;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 480px;
  width: 100%;
  transform: translateY(-50px);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 5px;
}

.form-actions {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .password-change-form {
    max-width: 350px;
    padding: 30px;
  }
}
</style> 