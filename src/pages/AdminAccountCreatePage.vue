<template>
  <AdminTemplate title="新規アカウント発行">
    <AdminAccountCreateForm @account-created="handleAccountCreated" />
  </AdminTemplate>
</template>

<script>
import AdminTemplate from '../templates/AdminTemplate.vue'
import AdminAccountCreateForm from '../components/molecules/AdminAccountCreateForm.vue'

export default {
  name: 'AdminAccountCreatePage',
  components: {
    AdminTemplate,
    AdminAccountCreateForm
  },
  methods: {
    handleAccountCreated(data) {
      console.log('New account created:', data)
      
      // Optionally navigate back to client list after successful creation
      setTimeout(() => {
        this.$router.push({ name: 'AdminClients' })
      }, 2000)
    }
  }
}
</script>

<style scoped>
/* No additional styles needed */
</style> 