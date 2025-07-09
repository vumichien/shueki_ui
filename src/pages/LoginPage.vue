<template>
  <LoginTemplate>
    <LoginForm @login-success="handleLoginSuccess" />
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