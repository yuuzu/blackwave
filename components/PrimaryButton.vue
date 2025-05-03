<template>
  <button
    class="flex items-center justify-center h-12 px-4 py-2 bg-[#000200] border border-[#2c2c2c] rounded-lg hover:bg-[#1f1f1f] hover:border-[#333333] duration-200 ease-in text-white font-montserrat font-medium space-x-3">
    <div v-if="name" class="flex items-center">
      <Icon
        class="text-white"
        size="20px"
        :name="name"
      />
    </div>
    <span class="text-sm leading-none">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: false, // Ícone agora é opcional
  },
});
</script>