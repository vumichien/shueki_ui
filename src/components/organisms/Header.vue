<template>
  <header class="header">
    <div class="header-container">
              <Logo 
          text="Smartweb"
          size="large"
        theme="light"
        :show-text="false"
      />
      
      <div v-if="user" class="header-user">
        <span class="user-name">{{ user.name }}さん</span>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '../atoms/Logo.vue'

export default {
  name: 'Header',
  components: {
    Logo
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: auto;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-name {
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

@media (max-width: 768px) {
  .header-container {
    padding: 10px 16px;
  }
  
  .header-user {
    gap: 10px;
  }
  
  .user-name {
    font-size: 0.8rem;
  }
}
</style> 