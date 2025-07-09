<template>
  <SystemTemplate 
    title="収益計算のデフォルト設定"
    @save-click="handleSaveClick"
  >
    <RevenueDefaultSettingsForm ref="revenueForm" @save="handleSave" />
  </SystemTemplate>
</template>

<script>
import SystemTemplate from '../templates/SystemTemplate.vue'
import RevenueDefaultSettingsForm from '../components/molecules/RevenueDefaultSettingsForm.vue'

export default {
  name: 'SystemRevenueDefaultPage',
  components: {
    SystemTemplate,
    RevenueDefaultSettingsForm
  },
  methods: {
    handleSaveClick() {
      // Trigger save on the form component
      this.$refs.revenueForm.save()
    },
    handleSave(formData) {
      console.log('Revenue default settings saved:', formData)
      // Show success message or handle save logic
      alert('収益計算のデフォルト設定が保存されました。')
    }
  }
}
</script>

<style scoped>
/* No additional styles needed */
</style> 