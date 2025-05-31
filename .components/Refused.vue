<template>
    <div class="flex flex-row items-center justify-left gap-1">
        <label
            class="flex items-center justify-center opacity-90 bg-red-500 h-fit w-fit border border-red-600 text-white shadow-sm shadow-red-500 text-sm font-montserrat pl-2 pr-2 rounded-full">
            <Icon class="text-white mb-0.5 mr-1" name="tdesign:hashtag"></Icon>
            Recusada
        </label>
        <slot></slot>
    </div>
</template>