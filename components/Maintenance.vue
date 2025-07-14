<template>
  <div class="fixed inset-0 bg-[#111111] flex flex-col items-center justify-center text-white z-[9999]">
    <Icon name="mdi:tools" size="80" class="text-[#576784] mb-6" />
    <h1 class="text-3xl font-bold mb-4">Site em manutenção</h1>
    <p class="text-lg text-[#b8b8b8] mb-8">{{ message }}</p>
    <span class="text-[#576784]">Voltamos em breve!</span>
  </div>
</template>

<script setup>
defineProps({ message: String })
</script>