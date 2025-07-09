<template>
  <div class="main-template">
    <Header :user="user" @logout="handleLogout" />
    
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script>
import Header from '../components/organisms/Header.vue'

export default {
  name: 'MainTemplate',
  components: {
    Header
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.main-template {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px 15px;
  }
}
</style> 