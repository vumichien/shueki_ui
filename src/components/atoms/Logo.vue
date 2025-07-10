<template>
  <div class="logo" :class="logoClass">
    <img v-if="showImage" :src="logoSrc" :alt="alt" class="logo-image" />
    <div v-else class="logo-icon">📊</div>
    <span v-if="showText" class="logo-text">{{ text }}</span>
  </div>
</template>

<script>
import logoImage from '../../assets/logo.png'

export default {
  name: 'Logo',
  props: {
    imageSrc: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'Smartweb'
    },
    alt: {
      type: String,
      default: 'Logo'
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'extra-large'].includes(value)
    },
    showImage: {
      type: Boolean,
      default: true
    },
    showText: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'light',
      validator: (value) => ['light', 'dark'].includes(value)
    }
  },
  computed: {
    logoClass() {
      return [
        `logo--${this.size}`,
        `logo--${this.theme}`
      ]
    },
    logoSrc() {
      return this.imageSrc || logoImage
    }
  }
}
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-image {
  border-radius: 4px;
  object-fit: contain;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-weight: 600;
  white-space: nowrap;
}

/* Sizes */
.logo--small .logo-image {
  width: auto;
  height: 24px;
}

.logo--small .logo-icon {
  font-size: 1rem;
}

.logo--small .logo-text {
  font-size: 0.875rem;
}

.logo--small {
  gap: 6px;
}

.logo--medium .logo-image {
  width: 32px;
  height: 32px;
}

.logo--medium .logo-icon {
  font-size: 1.25rem;
}

.logo--medium .logo-text {
  font-size: 1rem;
}

.logo--large .logo-image {
  width: auto;
  height: 30px;
}

.logo--large .logo-icon {
  font-size: 1.5rem;
}

.logo--large .logo-text {
  font-size: 1.25rem;
}

.logo--large {
  gap: 12px;
}

.logo--extra-large .logo-image {
  height: 46px;
  width: auto;
}

.logo--extra-large .logo-icon {
  font-size: 2rem;
}

.logo--extra-large .logo-text {
  font-size: 1.5rem;
}

.logo--extra-large {
  gap: 15px;
}

/* Themes */
.logo--light .logo-text {
  color: #333;
}

.logo--light .logo-icon {
  color: #333;
}

.logo--dark .logo-text {
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.logo--dark .logo-icon {
  color: white;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
}
</style> 