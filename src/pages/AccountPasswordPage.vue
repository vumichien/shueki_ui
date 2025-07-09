<template>
  <AccountTemplate>
    <PasswordChangeForm @passwordChanged="handlePasswordChanged" />
  </AccountTemplate>
</template>

<script>
import AccountTemplate from '../templates/AccountTemplate.vue'
import PasswordChangeForm from '../components/molecules/PasswordChangeForm.vue'

export default {
  name: 'AccountPasswordPage',
  components: {
    AccountTemplate,
    PasswordChangeForm
  },
  methods: {
    handlePasswordChanged(data) {
      console.log('Password changed:', data)
      // Handle password change success
      // You can add additional logic here like redirecting or showing notifications
    }
  }
}
</script>

<style scoped>
/* No additional styles needed as everything is handled by the template and components */
</style> 