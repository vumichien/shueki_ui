<template>
  <div class="input-wrapper">
    <input 
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :class="inputClass"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <div v-if="error" class="input-error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
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
    inputClass() {
      return [
        'input',
        `input--${this.size}`,
        {
          'input--error': this.error,
          'input--disabled': this.disabled
        }
      ]
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.input-wrapper {
  width: 100%;
}

.input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  font-family: inherit;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.input::placeholder {
  color: #999;
}

.input--small {
  padding: 8px 12px;
  font-size: 0.875rem;
}

.input--medium {
  padding: 12px 16px;
  font-size: 1rem;
}

.input--large {
  padding: 16px 20px;
  font-size: 1.125rem;
}

.input--error {
  border-color: #dc3545;
}

.input--error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.input--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style> 