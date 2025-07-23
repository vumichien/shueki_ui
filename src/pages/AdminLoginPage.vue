<template>
  <LoginTemplate>
    <AdminLoginForm @admin-login-success="handleAdminLoginSuccess" />
  </LoginTemplate>
</template>

<script>
import LoginTemplate from '../templates/LoginTemplate.vue'
import AdminLoginForm from '../components/molecules/AdminLoginForm.vue'

export default {
  name: 'AdminLoginPage',
  components: {
    LoginTemplate,
    AdminLoginForm
  },
  methods: {
    handleAdminLoginSuccess(data) {
      // Store admin user data
      localStorage.setItem('isAdminLoggedIn', 'true')
      localStorage.setItem('adminUser', JSON.stringify(data.user))
      
      // Navigate to admin dashboard
      this.$router.push({ name: 'AdminSystemOverview' })
    }
  }
}
</script> 