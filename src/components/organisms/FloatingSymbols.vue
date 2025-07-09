<template>
  <div class="floating-symbols">
    <div 
      v-for="symbol in symbols" 
      :key="symbol.id"
      class="symbol"
      :class="`symbol-${symbol.id}`"
      :style="{ 
        animationDelay: `${symbol.delay}s`,
        top: symbol.top,
        left: symbol.left,
        right: symbol.right,
        bottom: symbol.bottom
      }"
    >
      {{ symbol.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingSymbols',
  data() {
    return {
      symbols: [
        { id: 1, text: '$', delay: 0, top: '10%', left: '15%' },
        { id: 2, text: '¥', delay: 1, top: '20%', right: '20%' },
        { id: 3, text: '€', delay: 2, top: '60%', left: '10%' },
        { id: 4, text: '£', delay: 3, top: '15%', left: '50%' },
        { id: 5, text: '₹', delay: 4, bottom: '20%', right: '15%' },
        { id: 6, text: '₽', delay: 5, top: '70%', right: '25%' },
        { id: 7, text: '₩', delay: 2.5, bottom: '15%', left: '25%' },
        { id: 8, text: '¢', delay: 1.5, top: '45%', right: '10%' },
        { id: 9, text: '₦', delay: 3.5, top: '35%', left: '8%' },
        { id: 10, text: '₡', delay: 0.5, bottom: '40%', right: '8%' },
        { id: 11, text: '₨', delay: 4.5, top: '25%', left: '80%' },
        { id: 12, text: '₴', delay: 6, bottom: '30%', left: '70%' }
      ]
    }
  }
}
</script>

<style scoped>
.floating-symbols {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.symbol {
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2.5rem;
  font-weight: bold;
  animation: float 8s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .symbol {
    font-size: 2rem;
  }
}
</style> 