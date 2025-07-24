<template>
  <AdminTemplate title="クライアント新規登録">
    <div class="client-new-page">
      <ClientRegistrationForm @client-created="handleClientCreated" />
    </div>
  </AdminTemplate>
</template>

<script>
import AdminTemplate from '../templates/AdminTemplate.vue'
import ClientRegistrationForm from '../components/molecules/ClientRegistrationForm.vue'

export default {
  name: 'ClientNewPage',
  components: {
    AdminTemplate,
    ClientRegistrationForm
  },
  methods: {
    handleClientCreated(data) {
      console.log('New client created:', data)
      
      // The form component already handles navigation back to client list
      // You could add additional logic here if needed, such as:
      // - Updating global state
      // - Sending analytics events
      // - Showing additional notifications
    }
  }
}
</script>

<style scoped>
.client-new-page {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .client-new-page {
    max-width: 100%;
  }
}
</style> 