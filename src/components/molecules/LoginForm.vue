<template>
  <div class="login-form">
    <h2 class="form-title">ログイン</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <FloatingInput 
          type="email" 
          v-model="formData.email" 
          placeholder="メールアドレス"
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
      >
        <span v-if="isLoading">ログイン中...</span>
        <span v-else>ログイン</span>
      </Button>
    </form>
  </div>
</template>

<script>
import FloatingInput from '../atoms/FloatingInput.vue'
import Button from '../atoms/Button.vue'
import Checkbox from '../atoms/Checkbox.vue'
import { authenticateUser, validateEmail } from '../../data/userData.js'

export default {
  name: 'LoginForm',
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
        const result = authenticateUser(this.formData.email, this.formData.password)
        
        if (result.success) {
          this.$emit('login-success', {
            user: result.user,
            remember: this.formData.remember
          })
        } else {
          // Show error in form instead of alert
          if (result.error === 'メールアドレスが見つかりません') {
            this.errors.email = result.error
          } else if (result.error === 'パスワードが間違っています') {
            this.errors.password = result.error
          }
        }
        this.isLoading = false
      }, 100)
    }
  },
  emits: ['login-success']
}
</script>

<style scoped>
.login-form {
  width: 100%;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 400;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 0.5px;
}

.form-group {
  margin-bottom: 5px;
}

.form-options {
  margin-bottom: 25px;
}

@media (max-width: 480px) {
  .form-title {
    font-size: 1.3rem;
  }
}
</style> 