<template>
  <div class="password-input-wrapper">
    <div class="password-input-container">
      <input 
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :class="inputClass"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
      <button 
        type="button"
        class="password-toggle"
        @click="togglePasswordVisibility"
        :disabled="disabled"
      >
        <svg 
          v-if="showPassword"
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        <svg 
          v-else
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>
    <div v-if="error" class="input-error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: {
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
  data() {
    return {
      showPassword: false
    }
  },
  computed: {
    inputClass() {
      return [
        'password-input',
        `password-input--${this.size}`,
        {
          'password-input--error': this.error,
          'password-input--disabled': this.disabled
        }
      ]
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.password-input-wrapper {
  width: 100%;
}

.password-input-container {
  position: relative;
  width: 100%;
}

.password-input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  font-family: inherit;
  padding-right: 48px;
}

.password-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.password-input::placeholder {
  color: #999;
}

.password-input--small {
  padding: 8px 40px 8px 12px;
  font-size: 0.875rem;
}

.password-input--medium {
  padding: 12px 48px 12px 16px;
  font-size: 1rem;
}

.password-input--large {
  padding: 16px 56px 16px 20px;
  font-size: 1.125rem;
}

.password-input--error {
  border-color: #dc3545;
}

.password-input--error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.password-input--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.password-toggle:hover:not(:disabled) {
  color: #333;
}

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.input-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style> 