<template>
    <Transition name="fade" enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="modelValue"
        class="fixed inset-0 z-[1000] bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center p-4 pt-28"
        @click.self="$emit('update:modelValue', false)">
        <Transition name="pop" enter-active-class="transition-all transform duration-300"
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition-all transform duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 scale-95">
          <div
            class="w-full max-w-[1233px] bg-[#0a0a0a] border-2 border-[#131313] rounded-lg opacity-80 drop-shadow-2xl p-6">
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </template>
  
  <script setup>
  defineProps({
    modelValue: Boolean,
  });
  defineEmits(['update:modelValue']);
  </script>