<template>
  <DashboardTemplate>
    <div class="account-page">
      <div class="placeholder-content">
        <h2>アカウント設定</h2>
        <p>この機能は開発中です。</p>
      </div>
    </div>
  </DashboardTemplate>
</template>

<script>
import DashboardTemplate from '../templates/DashboardTemplate.vue'

export default {
  name: 'AccountPage',
  components: {
    DashboardTemplate
  }
}
</script>

<style scoped>
.account-page {
  max-width: 1400px;
  margin: 0 auto;
}

.placeholder-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.placeholder-content h2 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 16px;
}

.placeholder-content p {
  color: #6b7280;
  font-size: 1rem;
}
</style> 