<template>
  <div class="admin-login-form">
    <div class="admin-header">
      <h2 class="form-title">スマプロ Admin</h2>
      <p class="form-subtitle">管理者ログイン</p>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <FloatingInput 
          type="email" 
          v-model="formData.email" 
          placeholder="管理者メールアドレス"
          :error="errors.email"
          required
        />
      </div>
      
      <div class="form-group">
        <FloatingInput 
          type="password" 
          v-model="formData.password" 
          placeholder="パスワード"
          :error="errors.password"
          required
        />
      </div>
      
      <div class="form-options">
        <Checkbox v-model="formData.remember">
          ログイン状態を保持する
        </Checkbox>
      </div>
      
      <Button 
        type="submit" 
        :disabled="isLoading"
        full-width
        variant="primary"
        class="admin-login-btn"
      >
        <span v-if="isLoading">ログイン中...</span>
        <span v-else>管理者ログイン</span>
      </Button>
    </form>
    
    <div class="login-footer">
      <router-link to="/" class="user-login-link">
        一般ユーザーログイン
      </router-link>
    </div>
  </div>
</template>

<script>
import FloatingInput from '../atoms/FloatingInput.vue'
import Button from '../atoms/Button.vue'
import Checkbox from '../atoms/Checkbox.vue'
import { authenticateAdmin, validateEmail } from '../../data/userData.js'

export default {
  name: 'AdminLoginForm',
  components: {
    FloatingInput,
    Button,
    Checkbox
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
        remember: false
      },
      errors: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  watch: {
    'formData.email'() {
      if (this.errors.email) {
        this.errors.email = ''
      }
    },
    'formData.password'() {
      if (this.errors.password) {
        this.errors.password = ''
      }
    }
  },
  methods: {
    validateForm() {
      this.errors = { email: '', password: '' }
      let isValid = true
      
      if (!this.formData.email) {
        this.errors.email = 'メールアドレスを入力してください'
        isValid = false
      } else if (!validateEmail(this.formData.email)) {
        this.errors.email = '有効なメールアドレスを入力してください'
        isValid = false
      }
      
      if (!this.formData.password) {
        this.errors.password = 'パスワードを入力してください'
        isValid = false
      }
      
      return isValid
    },
    
    handleSubmit() {
      if (!this.validateForm()) return
      
      this.isLoading = true
      
      // Simulate API call
      setTimeout(() => {
        const result = authenticateAdmin(this.formData.email, this.formData.password)
        
        if (result.success) {
          this.$emit('admin-login-success', {
            user: result.user,
            remember: this.formData.remember
          })
        } else {
          // Show error in form
          if (result.error === '管理者アカウントが見つかりません') {
            this.errors.email = result.error
          } else if (result.error === 'パスワードが間違っています') {
            this.errors.password = result.error
          }
        }
        this.isLoading = false
      }, 100)
    }
  },
  emits: ['admin-login-success']
}
</script>

<style scoped>
.admin-login-form {
  width: 100%;
}

.admin-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.form-subtitle {
  font-size: 1.1rem;
  font-weight: 400;
  color: #64748b;
  margin-bottom: 0;
}

.form-group {
  margin-bottom: 5px;
}

.form-options {
  margin-bottom: 25px;
}

.admin-login-btn {
  background: #1e3a8a !important;
  border-color: #1e3a8a !important;
}

.admin-login-btn:hover {
  background: #1e40af !important;
  border-color: #1e40af !important;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.user-login-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
}

.user-login-link:hover {
  color: #1e3a8a;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .form-title {
    font-size: 1.6rem;
  }
  
  .form-subtitle {
    font-size: 1rem;
  }
}
</style> 