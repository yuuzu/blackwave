<template>
  <span class="relative inline-block sparkle-wrapper">
    <span class="username-text"><slot /></span>
    <span v-for="n in 18" :key="n"
      class="sparkle"
      :style="sparkleStyle(n)">
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  color: { type: String, default: '#fff' }
})
function sparkleStyle(n) {
  // Distribui sparkles aleatoriamente
  const top = Math.random() * 100
  const left = Math.random() * 100
  const delay = Math.random() * 2
  const size = 6 + Math.random() * 6
  return {
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    width: `${size}px`,
    height: `${size}px`,
    background: props.color,
    opacity: 0.8 + Math.random() * 0.2
  }
}
</script>

<style scoped>
.sparkle-wrapper {
  display: inline-block;
  position: relative;
}
.username-text {
  position: relative;
  z-index: 1;
}
.sparkle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
  filter: blur(0.5px) brightness(1.5);
  animation: sparkle-float 1.5s linear infinite;
}
@keyframes sparkle-float {
  0% { transform: scale(0.7) translateY(0); opacity: 0.7; }
  50% { transform: scale(1.2) translateY(-8px); opacity: 1; }
  100% { transform: scale(0.7) translateY(0); opacity: 0.7; }
}
</style>