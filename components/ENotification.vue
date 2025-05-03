<template>
  <Transition name="fade">
    <div v-if="visible" :class="['fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white z-100', typeClass]"
      role="alert">
      <strong class="font-bold">{{ title }}</strong>
      <span class="block">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Notificação' },
  message: { type: String, required: true },
  type: { type: String, default: 'info' }, // 'success', 'error', 'warning', 'info'
  duration: { type: Number, default: 3000 }
})

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, props.duration)
})

const typeClass = computed(() => {
  switch (props.type) {
    case 'success': return 'border-l-4 border border-[#2c2c2c] border-l-green-500 bg-[#0a0a0a]/60 backdrop-blur-sm';
    case 'error': return 'border-l-4 border border-[#2c2c2c] border-l-red-500 bg-[#0a0a0a]/60 backdrop-blur-sm';
    case 'warning': return 'border-l-4 border border-[#2c2c2c] border-l-yellow-500 bg-[#0a0a0a]/60 backdrop-blur-sm';
    default: return 'bg-blue-500';
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ajuste para garantir que a notificação fique acima de outros elementos */
.fixed {
  z-index: 9999;
  /* Valor alto para sobrepor outros elementos */
}
</style>