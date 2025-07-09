<template>
  <div class="select-wrapper">
    <select 
      :value="modelValue"
      :disabled="disabled"
      :class="selectClass"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div v-if="error" class="select-error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  computed: {
    selectClass() {
      return [
        'select',
        `select--${this.size}`,
        {
          'select--error': this.error,
          'select--disabled': this.disabled
        }
      ]
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.select-wrapper {
  width: 100%;
}

.select {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  font-family: inherit;
  cursor: pointer;
}

.select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.select--small {
  padding: 8px 12px;
  font-size: 0.875rem;
}

.select--medium {
  padding: 12px 16px;
  font-size: 1rem;
}

.select--large {
  padding: 16px 20px;
  font-size: 1.125rem;
}

.select--error {
  border-color: #dc3545;
}

.select--error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.select--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.select-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style> 