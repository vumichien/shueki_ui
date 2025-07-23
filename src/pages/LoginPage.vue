<template>
  <LoginTemplate>
    <LoginForm @login-success="handleLoginSuccess" />
    <div class="admin-login-link">
      <router-link to="/admin/login" class="admin-link">
        管理者ログイン
      </router-link>
    </div>
  </LoginTemplate>
</template>

<script>
import LoginTemplate from '../templates/LoginTemplate.vue'
import LoginForm from '../components/molecules/LoginForm.vue'

export default {
  name: 'LoginPage',
  components: {
    LoginTemplate,
    LoginForm
  },
  methods: {
    handleLoginSuccess(data) {
      // Store user data
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Navigate to home
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
.admin-login-link {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.admin-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
}

.admin-link:hover {
  color: #1e3a8a;
  text-decoration: underline;
}
</style> 