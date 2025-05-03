<template>
    <div class="flex flex-row items-center justify-left gap-1">
        <label
            class="flex items-center justify-center bg-yellow-500 h-fit w-fit border border-yellow-600 shadow-sm shadow-yellow-500 text-white text-sm font-montserrat pl-2 pr-2 rounded-full">
            <Icon class="text-white mb-0.5 mr-1" name="tdesign:hashtag"></Icon>
            Error
        </label>
        <slot></slot>
    </div>
</template>