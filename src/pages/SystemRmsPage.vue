<template>
  <SystemTemplate 
    title="RMS情報設定 & 会計期間設定"
    @save-click="handleSaveClick"
  >
    <div class="rms-page-content">
      <RmsSettingsForm ref="rmsForm" @save="handleRmsSave" />
      <AccountingPeriodSettingsForm ref="accountingForm" @save="handleAccountingSave" />
    </div>
  </SystemTemplate>
</template>

<script>
import SystemTemplate from '../templates/SystemTemplate.vue'
import RmsSettingsForm from '../components/molecules/RmsSettingsForm.vue'
import AccountingPeriodSettingsForm from '../components/molecules/AccountingPeriodSettingsForm.vue'

export default {
  name: 'SystemRmsPage',
  components: {
    SystemTemplate,
    RmsSettingsForm,
    AccountingPeriodSettingsForm
  },
  methods: {
    handleSaveClick() {
      // Trigger save on both form components
      this.$refs.rmsForm.save()
      this.$refs.accountingForm.save()
    },
    handleRmsSave(formData) {
      console.log('RMS settings saved:', formData)
    },
    handleAccountingSave(formData) {
      console.log('Accounting period settings saved:', formData)
    }
  }
}
</script>

<style scoped>
.rms-page-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style> 