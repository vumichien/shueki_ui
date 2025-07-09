<template>
  <button 
    :class="buttonClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'ghost'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClass() {
      return [
        'btn',
        `btn--${this.variant}`,
        `btn--${this.size}`,
        {
          'btn--full-width': this.fullWidth,
          'btn--disabled': this.disabled
        }
      ]
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  letter-spacing: 0.5px;
}

.btn--primary {
  background: #1e3a8a;
  color: white;
}

.btn--primary:hover:not(.btn--disabled) {
  background: #1e40af;
}

.btn--secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn--secondary:hover:not(.btn--disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.btn--danger {
  background: #dc3545;
  color: white;
}

.btn--danger:hover:not(.btn--disabled) {
  background: #c82333;
}

.btn--ghost {
  background: transparent;
  color: #2c3e50;
  border: 1px solid #2c3e50;
}

.btn--ghost:hover:not(.btn--disabled) {
  background: #2c3e50;
  color: white;
}

.btn--small {
  padding: 8px 16px;
  font-size: 0.875rem;
}

.btn--medium {
  padding: 12px 24px;
  font-size: 1rem;
}

.btn--large {
  padding: 16px 32px;
  font-size: 1.125rem;
}

.btn--full-width {
  width: 100%;
}

.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 