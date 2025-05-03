<template>
    <div class="flex flex-row items-center justify-left gap-1">
        <label
            class="flex items-center justify-center opacity-90 bg-green-500 h-fit w-fit border border-green-600 shadow-sm shadow-green-500 text-white text-sm font-montserrat pl-2 pr-2 rounded-full cursor-pointer"
            @click="copiarTexto">
            <Icon class="text-white mb-0.5 mr-1" name="tdesign:hashtag"></Icon>
            Aprovada
        </label>
        <span ref="slotContent">
            <slot></slot>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Referência para o conteúdo do slot
const slotContent = ref(null);

function copiarTexto() {
    // Captura o texto do slot
    const texto = slotContent.value?.textContent?.trim();
    if (texto) {
        navigator.clipboard
            .writeText("#Aprovada" + ' ' + texto)
            .then(() => {
                console.log('Texto copiado:', texto);
            })
            .catch(() => {
                console.error('Erro ao copiar o texto.');
            });
    } else {
        console.error('Nenhum texto encontrado para copiar.');
    }
}
</script>