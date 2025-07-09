<template>
  <label class="checkbox-label">
    <input 
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox-input"
    />
    <span class="checkbox-text">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  user-select: none;
  gap: 8px;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin: 0;
}

.checkbox-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkbox-text {
  line-height: 1.4;
}
</style> 