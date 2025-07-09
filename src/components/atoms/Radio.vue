<template>
  <label class="radio-label">
    <input 
      type="radio"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      :name="name"
      @change="$emit('update:modelValue', value)"
      class="radio-input"
    />
    <span class="radio-text">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: null
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    name: {
      type: String,
      required: true
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
.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  user-select: none;
  gap: 8px;
}

.radio-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin: 0;
}

.radio-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.radio-text {
  line-height: 1.4;
}
</style> 