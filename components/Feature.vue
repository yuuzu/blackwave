<script setup>
const props = defineProps({ text: String });
</script>

<template>
  <span class="flex items-center gap-1">
    <Icon name="si:check-fill" class="text-[#576784]" size="24px"></Icon>
    <p class="text-[#FAFAFA] font-satoshi text-[17px]">{{ text }}</p>
  </span>
</template>