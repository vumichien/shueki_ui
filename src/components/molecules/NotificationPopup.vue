<template>
  <Modal :isVisible="isVisible" @close="handleClose" :closeOnOverlay="closeOnOverlay">
    <div class="notification-popup">
      <div class="notification-icon">
        <div class="icon-circle" :class="`icon-circle--${type}`">
          <!-- Success Icon -->
          <svg v-if="type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
          
          <!-- Error Icon -->
          <svg v-else-if="type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          
          <!-- Warning Icon -->
          <svg v-else-if="type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          
          <!-- Info Icon -->
          <svg v-else-if="type === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
      </div>
      
      <div class="notification-content">
        <h2 class="notification-title">{{ title }}</h2>
        <p class="notification-message">{{ message }}</p>
      </div>
      
      <div class="notification-actions">
        <Button 
          variant="primary" 
          @click="handleConfirm"
          size="large"
          :fullWidth="true"
        >
          {{ confirmText }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../atoms/Modal.vue'
import Button from '../atoms/Button.vue'

export default {
  name: 'NotificationPopup',
  components: {
    Modal,
    Button
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'OK'
    },
    cancelText: {
      type: String,
      default: 'キャンセル'
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm')
      this.$emit('close')
    },
    handleCancel() {
      this.$emit('cancel')
      this.$emit('close')
    },
    handleClose() {
      this.$emit('close')
    }
  },
  emits: ['confirm', 'cancel', 'close']
}
</script>

<style scoped>
.notification-popup {
  padding: 40px 32px 32px 32px;
  text-align: center;
  min-width: 360px;
  max-width: 420px;
  position: relative;
}

.notification-icon {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: iconPulse 0.6s ease-out;
}

.icon-circle svg {
  width: 32px;
  height: 32px;
  color: white;
}

.icon-circle--success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
}

.icon-circle--error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
}

.icon-circle--warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
}

.icon-circle--info {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.notification-content {
  margin-bottom: 32px;
}

.notification-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
  letter-spacing: -0.025em;
}

.notification-message {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

.notification-actions {
  display: flex;
  justify-content: center;
}

@keyframes iconPulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .notification-popup {
    padding: 32px 24px 24px 24px;
    min-width: 320px;
    max-width: 380px;
  }
  
  .icon-circle {
    width: 64px;
    height: 64px;
  }
  
  .icon-circle svg {
    width: 28px;
    height: 28px;
  }
  
  .notification-title {
    font-size: 1.5rem;
  }
  
  .notification-message {
    font-size: 0.875rem;
  }
}
</style> 