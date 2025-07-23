<template>
  <SystemTemplate 
    title="RMS情報設定 & 出展料設定"
    @save-click="handleSaveClick"
  >
    <div class="rms-page-content">
      <RmsSettingsForm ref="rmsForm" @save="handleRmsSave" />
      <ExhibitionFeeSettingsForm ref="exhibitionForm" @save="handleExhibitionSave" />
    </div>
  </SystemTemplate>
</template>

<script>
import SystemTemplate from '../templates/SystemTemplate.vue'
import RmsSettingsForm from '../components/molecules/RmsSettingsForm.vue'
import ExhibitionFeeSettingsForm from '../components/molecules/ExhibitionFeeSettingsForm.vue'

export default {
  name: 'SystemRmsPage',
  components: {
    SystemTemplate,
    RmsSettingsForm,
    ExhibitionFeeSettingsForm
  },
  methods: {
    handleSaveClick() {
      // Trigger save on both form components
      this.$refs.rmsForm.save()
      this.$refs.exhibitionForm.save()
    },
    handleRmsSave(formData) {
      console.log('RMS settings saved:', formData)
    },
    handleExhibitionSave(formData) {
      console.log('Exhibition fee settings saved:', formData)
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