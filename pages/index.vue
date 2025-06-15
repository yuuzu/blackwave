<template>
    <div class="w-screen min-h-screen bg-[#0a0a0a] overflow-x-hidden">
        <!-- Header -->
        <div class="fixed top-0 left-0 z-50 w-full flex justify-center pt-4 px-2">
            <div
                class="bg-[#101010]/70 backdrop-blur-md flex items-center justify-between w-full max-w-7xl rounded-full sm:rounded-full px-4 py-2 sm:px-6 sm:py-4 mx-auto">
                <!-- Logo -->
                <div class="flex items-center">
                    <Icon name="basil:moon-solid" size="40px" class="text-[#576784]" />
                    <p class="pl-2 text-xl sm:text-3xl font-satoshi font-semibold text-[#FAFAFA]">lunarcntr</p>
                    <span class="h-1 w-1 -mb-3 sm:-mb-5 rounded-full bg-[#576784]"></span>
                    <p class="pl-1 text-xl sm:text-3xl font-satoshi font-semibold text-[#FAFAFA]">xyz</p>
                </div>
                <!-- Desktop Menu -->
                <div class="hidden sm:flex flex-row items-center gap-2 sm:gap-4">
                    <!-- <a href="https://lunar-10.gitbook.io/lunar-docs/getting-started/introduction" target="_blank"
                        rel="noopener">
                        <SecondaryB>Docs</SecondaryB>
                    </a> -->
                    <a href="https://t.me/lunaroficial" target="_blank" rel="noopener">
                        <SecondaryB>Telegram</SecondaryB>
                    </a>
                    <a href="#" @click.prevent="goToPremium" rel="noopener">
                        <PrimaryB>Join premium</PrimaryB>
                    </a>
                </div>
                <!-- Mobile Menu Button -->
                <button class="sm:hidden flex items-center justify-center p-2" @click="showMobileMenu = true">
                    <Icon name="mdi:menu" size="32px" class="text-[#FAFAFA]" />
                </button>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <transition name="fade">
            <div v-if="showMobileMenu" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col">
                <div class="flex items-center justify-between px-6 pt-6 pb-4">
                    <div class="flex items-center">
                        <Icon name="basil:moon-solid" size="40px" class="text-[#576784]" />
                        <p class="pl-2 text-2xl font-satoshi font-semibold text-[#FAFAFA]">lunarcntr</p>
                        <span class="h-1 w-1 -mb-4 rounded-full bg-[#576784]"></span>
                        <p class="pl-1 text-2xl font-satoshi font-semibold text-[#FAFAFA]">xyz</p>
                    </div>
                    <button @click="showMobileMenu = false" class="p-2">
                        <Icon name="mdi:close" size="32px" class="text-[#FAFAFA]" />
                    </button>
                </div>
                <div class="flex flex-col gap-4 px-6 mt-4 flex-1">
                    <!-- <a href="https://lunar-10.gitbook.io/lunar-docs/getting-started/introduction" target="_blank"
                        rel="noopener" @click="showMobileMenu = false">
                        <SecondaryB class="w-full rounded-2xl">Docs</SecondaryB>
                    </a> -->
                    <a href="https://t.me/lunaroficial" target="_blank" rel="noopener" @click="showMobileMenu = false">
                        <SecondaryB class="w-full rounded-2xl">Telegram</SecondaryB>
                    </a>
                </div>
                <div class="px-6 pb-8 pt-4 mt-auto">
                    <a href="dashboard" target="_blank" rel="noopener" @click="showMobileMenu = false">
                        <PrimaryB class="w-full rounded-2xl">Join premium</PrimaryB>
                    </a>
                </div>
            </div>
        </transition>

        <!-- Main content -->
        <div class="flex flex-col w-full pt-40 sm:pt-40 px-4 sm:px-0 justify-center items-center gap-12">
            <div class="flex flex-col items-center justify-center gap-4 text-center mb-2">
                <h1
                    class="text-4xl sm:text-5xl font-satoshi font-black bg-gradient-to-b from-[#576784] via-[#51658a] to-[#75839c] inline-block text-transparent bg-clip-text [text-shadow:0_0_2px_#75839c,0_0_16px_#51658a]">
                    Welcome to Lunar
                </h1>
                <p class="text-base sm:text-lg font-satoshi text-[#FAFAFA]">
                    Discover and enjoy the best checker available today!
                </p>
                <a href="https://lunarchk.vercel.app/" target="_blank" rel="noopener" class="mt-4">
                    <PrimaryB class="max-w-72">Get started with free version</PrimaryB>
                </a>
            </div>

            <div class="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 w-full max-w-6xl">
                <!-- Free Plan -->
                <div
                    class="bg-[#101010] backdrop-blur-md rounded-lg border-2 border-[#141414] px-6 py-4 w-full max-w-sm h-max flex flex-col">
                    <p class="text-[#FAFAFA] font-satoshi font-semibold text-[25px]">Free</p>
                    <div class="flex flex-row items-center gap-1 pt-2">
                        <p class="text-[#FAFAFA] font-satoshi font-semibold text-[30px]">0$</p>
                        <p class="text-[#cacaca] font-satoshi font-thin text-[17px]">/lifetime</p>
                    </div>
                    <p class="text-[#a7a7a7] font-satoshi font-thin text-[16.5px]">
                        Essential for those just starting out!
                    </p>
                    <div class="flex flex-col gap-1 pt-2">
                        <Feature text="Basic gateways (US, IT)" />
                        <Feature text="Include multithread (1X)" />
                        <Feature text="CCGen Include" />
                    </div>
                    <a href="https://lunarchk.vercel.app/" target="_blank" rel="noopener" class="mt-[198px]">
                        <SecondaryB class="mt-8 w-full bg-[#202020] rounded-full">Get started</SecondaryB>
                    </a>
                </div>

                <!-- Premium Plan -->
                <div
                    class="from-[#3b3f57] via-[#313443] to-[#21222d] bg-gradient-to-b backdrop-blur-md rounded-lg border-2 border-[#141414] px-6 py-4 w-full max-w-sm min-h-[520px] flex flex-col justify-between">
                    <div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <div class="flex items-center mb-2 sm:mb-0">
                                <Icon name="basil:star-solid" size="24px" class="text-[#576784]"></Icon>
                                <p class="text-[#FAFAFA] font-satoshi font-semibold text-[25px] pl-2">Premium</p>
                            </div>
                            <div
                                class="flex items-center justify-center w-max h-max bg-[#191919] rounded-full px-2 py-1">
                                <Icon name="mdi:sparkles" class="text-[#576784] mr-2" />
                                <p
                                    class="text-xs font-bold font-satoshi bg-gradient-to-r from-[#576784] to-[#FAFAFA] inline-block text-transparent bg-clip-text">
                                    Most Popular
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-row items-center gap-1 pt-2">
                            <p class="text-[#FAFAFA] font-satoshi font-semibold text-[30px]">45$</p>
                            <div class="flex flex-col">
                                <p class="text-[#cacaca] font-satoshi font-thin text-[17px]">12k lives - 6 months</p>
                                <p class="text-[#cacaca] font-satoshi font-thin text-[10px]">others plans in our
                                    telegram</p>
                            </div>
                        </div>
                        <p class="text-[#a7a7a7] font-satoshi font-thin text-[16.5px]">
                            Necessary for those who know out!
                        </p>
                        <div class="flex flex-col pt-2 gap-1">
                            <Feature text="More gateways (US, IT, MX, UK, ES, AE)" />
                            <Feature text="Include multithread (3X)" />
                            <Feature text="CCGen Include" />
                            <Feature text="Remove cards" />
                            <Feature text="Auto add address" />
                            <Feature text="Approved list log" />
                        </div>
                    </div>
                    <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener">
                        <PrimaryB class="mt-8 w-full">Purchase</PrimaryB>
                    </a>
                </div>
            </div>
        </div>
        <footer class="bg-[#0d0d0d] text-white px-6 py-16 mt-16">
            <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm text-gray-300">
                <!-- Branding -->
                <div class="col-span-1 flex flex-col">
                    <div class="flex items-center space-x-2 mb-4">
                        <Icon name="basil:moon-solid" size="40px" class="text-[#576784]" />
                        <p class="font-satoshi font-bold text-2xl text-white">lunarcntr.xyz</p>
                    </div>
                    <p class="text-sm mb-4">
                        Enjoy the best checker of the moment now!
                    </p>
                </div>

                <!-- General Links -->
                <div>
                    <h3 class="font-semibold text-2xl font-satoshi text-white mb-3">General</h3>
                    <ul class="font-satoshi space-y-2">
                        <li><a href="https://lunarchk.vercel.app/" class="hover:text-white transition">Free Checker</a>
                        </li>
                        <li><a href="#" class="hover:text-white transition">Premium Checker</a></li>
                        <li><a href="https://t.me/yuzuuk1" class="hover:text-white transition">Pricing</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h3 class="font-semibold font-satoshi text-2xl text-white mb-3">Contact</h3>
                    <ul class="space-y-2">
                        <li>
                            <a href="https://t.me/lunaroficial" class="hover:text-white transition">Telegram Group</a>
                        </li>
                    </ul>
                </div>

                <!-- Help / Legal -->
                <div>
                    <h3 class="font-semibold font-satoshi text-2xl text-white mb-3">Help</h3>
                    <ul class="space-y-2">
                        <li><a href="https://lunar-10.gitbook.io/lunar-docs/getting-started/introduction"
                                class="hover:text-white transition">Documentation</a></li>
                    </ul>
                </div>
            </div>

            <div class="mt-12 text-center text-gray-500 text-xs font-satoshi border-t border-[#232323] pt-6">
                Copyright © 2025 Lunar Center - All Rights Reserved.
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '~/firebase'
import { useRouter } from 'vue-router'

const showMobileMenu = ref(false)
const isLogged = ref(false)
const router = useRouter()

onMounted(() => {
    isLogged.value = !!auth.currentUser
    auth.onAuthStateChanged(user => {
        isLogged.value = !!user
    })
})

function goToPremium() {
    if (isLogged.value) {
        router.push('/dashboard')
    } else {
        router.push('/login')
    }
}
</script>

<style>
/* Scrollbar bonita para todo o site */
::-webkit-scrollbar {
    width: 8px;
    background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
    background: #181818;
    border-radius: 1000px;
}

::-webkit-scrollbar-thumb:hover {
    background: #576784;
}

html,
body {
    overflow-x: hidden !important;
}

body {
    scrollbar-width: thin;
    scrollbar-color: #181818 #0a0a0a;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
