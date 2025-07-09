<template>
  <div class="floating-input" :class="{ 'has-value': hasValue, 'is-focused': isFocused, 'has-error': error }">
    <div class="input-wrapper">
      <input 
        :type="showPassword ? 'text' : type"
        :value="modelValue"
        :disabled="disabled"
        :class="inputClass"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        v-bind="$attrs"
        ref="input"
      />
      <button 
        v-if="type === 'password'"
        type="button"
        class="password-toggle"
        @click="togglePassword"
        :tabindex="-1"
      >
        <svg v-if="showPassword" class="password-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 004.243 4.243m0 0L16.535 16.535M14.121 14.121L17.657 17.657"></path>
        </svg>
        <svg v-else class="password-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      </button>
    </div>
    <label class="floating-label">{{ placeholder }}</label>
    <div v-if="error" class="input-error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'FloatingInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: true
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
      isFocused: false,
      showPassword: false
    }
  },
  computed: {
    hasValue() {
      return this.modelValue && this.modelValue.length > 0
    },
    inputClass() {
      return [
        'floating-input-field',
        `floating-input--${this.size}`,
        {
          'floating-input--error': this.error,
          'floating-input--disabled': this.disabled
        }
      ]
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      this.isFocused = false
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.floating-input {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.floating-input-field {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.95);
  box-sizing: border-box;
  font-family: inherit;
  padding: 12px 16px;
  padding-right: 50px;
}

.floating-input-field:focus {
  outline: none;
  border-color: #666;
  box-shadow: 0 0 0 2px rgba(102, 102, 102, 0.1);
}

.floating-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
  background: #FFFFFF;
  padding: 0 4px;
  z-index: 1;
}

/* Floating state - label sits on the border */
.floating-input.has-value .floating-label,
.floating-input.is-focused .floating-label,
.floating-input.has-error .floating-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #666;
  font-weight: 400;
  background: rgba(255, 255, 255, 0.95);
}

.floating-input.has-error .floating-label {
  color: #dc3545;
}

.floating-input.has-error .floating-input-field {
  border-color: #dc3545;
}

.floating-input.has-error .floating-input-field:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

/* Password toggle button */
.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #666;
  transition: color 0.3s ease;
  z-index: 2;
}

.password-toggle:hover {
  color: #2c3e50;
}

.password-toggle:focus {
  outline: none;
}

.password-icon {
  width: 20px;
  height: 20px;
}

/* Sizes */
.floating-input--small .floating-input-field {
  padding: 8px 12px;
  padding-right: 40px;
  font-size: 0.875rem;
}

.floating-input--small .floating-label {
  font-size: 0.875rem;
  left: 12px;
}

.floating-input--small.has-value .floating-label,
.floating-input--small.is-focused .floating-label,
.floating-input--small.has-error .floating-label {
  font-size: 0.7rem;
}

.floating-input--medium .floating-input-field {
  padding: 12px 16px;
  padding-right: 50px;
  font-size: 1rem;
}

.floating-input--medium .floating-label {
  font-size: 1rem;
  left: 16px;
}

.floating-input--medium.has-value .floating-label,
.floating-input--medium.is-focused .floating-label,
.floating-input--medium.has-error .floating-label {
  font-size: 0.75rem;
}

.floating-input--large .floating-input-field {
  padding: 16px 20px;
  padding-right: 60px;
  font-size: 1.125rem;
}

.floating-input--large .floating-label {
  font-size: 1.125rem;
  left: 20px;
}

.floating-input--large.has-value .floating-label,
.floating-input--large.is-focused .floating-label,
.floating-input--large.has-error .floating-label {
  font-size: 0.8rem;
}

.floating-input--disabled .floating-input-field {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 4px;
  margin-left: 4px;
}

/* Animation for smooth transitions */
.floating-input-field,
.floating-label {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style> 