<template>
  <div class="icon" :class="iconClass">
    <!-- Success Icon -->
    <svg v-if="name === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
    
    <!-- Error Icon -->
    <svg v-else-if="name === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
    
    <!-- Warning Icon -->
    <svg v-else-if="name === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    
    <!-- Info Icon -->
    <svg v-else-if="name === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
    
    <!-- Eye Icon -->
    <svg v-else-if="name === 'eye'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    
    <!-- Eye Slash Icon -->
    <svg v-else-if="name === 'eye-slash'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
      validator: (value) => ['success', 'error', 'warning', 'info', 'eye', 'eye-slash'].includes(value)
    },
    type: {
      type: String,
      default: '',
      validator: (value) => ['', 'success', 'error', 'warning', 'info'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  computed: {
    iconClass() {
      const classes = [`icon--${this.size}`]
      
      // Use type for styling if provided, otherwise use name
      const styleType = this.type || this.name
      if (['success', 'error', 'warning', 'info'].includes(styleType)) {
        classes.push(`icon--${styleType}`)
      } else {
        classes.push('icon--neutral')
      }
      
      return classes
    }
  }
}
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.icon svg {
  width: 100%;
  height: 100%;
}

/* Sizes */
.icon--small {
  width: 16px;
  height: 16px;
}

.icon--medium {
  width: 20px;
  height: 20px;
}

.icon--large {
  width: 24px;
  height: 24px;
}

/* Types */
.icon--success {
  background: #10b981;
  color: white;
}

.icon--error {
  background: #ef4444;
  color: white;
}

.icon--warning {
  background: #f59e0b;
  color: white;
}

.icon--info {
  background: #3b82f6;
  color: white;
}

.icon--neutral {
  background: transparent;
  color: currentColor;
}
</style> 