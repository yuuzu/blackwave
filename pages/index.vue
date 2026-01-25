<template>
  <div class="relative w-screen min-h-screen overflow-x-hidden bg-[#05060a] text-white">
    <!-- Background layers -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <!-- base radials -->
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,180,255,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(140,90,255,0.14),transparent_55%)]">
      </div>

      <!-- soft blobs -->
      <div
        class="absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#5aa2ff]/20 blur-[100px]">
      </div>
      <div class="absolute top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#8b5dff]/16 blur-[120px]"></div>
      <div class="absolute -bottom-56 right-0 h-[640px] w-[640px] rounded-full bg-[#3dd6ff]/12 blur-[130px]"></div>

      <!-- subtle grid -->
      <div
        class="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]">
      </div>

      <!-- vignette -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.78)_82%)]"></div>

      <!-- top glow line (optional) -->
      <div class="absolute left-1/2 top-24 h-[1px] w-[900px] -translate-x-1/2 bg-white/10 blur-[1px]"></div>
    </div>

    <!-- Header -->
    <div class="fixed top-0 left-0 z-50 w-full flex justify-center pt-4 px-2">
      <div class="w-full max-w-7xl mx-auto rounded-3xl px-4 py-2 sm:px-6 sm:py-4
               bg-[#fafafa]/5 backdrop-blur-xl border border-white/10
               shadow-[0_12px_40px_rgba(0,0,0,0.55)]
               flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center select-none">
          <NuxtImg src="/icon.png" class="w-12" />
          <p class="pl-2 text-xl sm:text-3xl font-satoshi font-semibold text-white">lunarcntr</p>
          <span class="h-1 w-1 -mb-3 sm:-mb-5 rounded-full bg-[#7aa7ff]"></span>
          <p class="pl-1 text-xl sm:text-3xl font-satoshi font-semibold text-white">xyz</p>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden sm:flex flex-row items-center gap-2 sm:gap-4">
          <a href="https://t.me/lunaroficial" target="_blank" rel="noopener">
            <SecondaryB>Telegram</SecondaryB>
          </a>
          <a href="#" @click.prevent="goToPremium" rel="noopener">
            <PrimaryB>Dashboard</PrimaryB>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="sm:hidden flex items-center justify-center p-2" @click="showMobileMenu = true">
          <Icon name="mdi:menu" size="32px" class="text-white" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div v-if="showMobileMenu" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex flex-col">
        <div class="flex items-center justify-between px-6 pt-6 pb-4">
          <div class="flex items-center">
            <NuxtImg src="/icon.png" class="w-12" />
            <p class="pl-2 text-2xl font-satoshi font-semibold text-white">lunarcntr</p>
            <span class="h-1 w-1 -mb-4 rounded-full bg-[#7aa7ff]"></span>
            <p class="pl-1 text-2xl font-satoshi font-semibold text-white">xyz</p>
          </div>
          <button @click="showMobileMenu = false" class="p-2">
            <Icon name="mdi:close" size="32px" class="text-white" />
          </button>
        </div>

        <div class="flex flex-col gap-4 px-6 mt-4 flex-1">
          <a href="https://t.me/lunaroficial" target="_blank" rel="noopener" @click="showMobileMenu = false">
            <SecondaryB class="w-full rounded-2xl">Telegram</SecondaryB>
          </a>
        </div>

        <div class="px-6 pb-8 pt-4 mt-auto">
          <a href="dashboard" target="_blank" rel="noopener" @click="showMobileMenu = false">
            <PrimaryB class="w-full rounded-2xl">Dashboard</PrimaryB>
          </a>
        </div>
      </div>
    </transition>

    <!-- Main content -->
    <div class="flex flex-col w-full pt-36 sm:pt-40 px-4 sm:px-0 justify-center items-center gap-12">
      <!-- Hero -->
      <div class="flex flex-col items-center justify-center gap-4 text-center mb-2 max-w-3xl">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-xl">
          <span class="h-1.5 w-1.5 rounded-full bg-[#7aa7ff] shadow-[0_0_18px_rgba(122,167,255,0.9)]"></span>
          New update • Cleaner UI
        </div>

        <h1 class="text-4xl sm:text-6xl font-satoshi font-black tracking-tight
                 bg-gradient-to-b from-white via-white/80 to-white/45
                 text-transparent bg-clip-text
                 [text-shadow:0_0_24px_rgba(90,162,255,0.22)]">
          Welcome to Lunar
        </h1>

        <p class="-mt-2 text-base sm:text-lg font-satoshi text-white/70 max-w-xl">
          Discover and enjoy the best checker available today!
        </p>

        <div class="mt-4 flex flex-col sm:flex-row items-center gap-3">
          <a href="https://lunarchk.vercel.app/" target="_blank" rel="noopener">
            <SecondaryB disabled class="max-w-80 opacity-80">Get started with free version</SecondaryB>
          </a>
          <a href="#" @click.prevent="goToPremium" rel="noopener">
            <PrimaryB class="max-w-80">Open dashboard</PrimaryB>
          </a>
        </div>
      </div>

      <!-- Pricing cards -->
      <div class="flex flex-row md:flex-row items-stretch justify-center gap-6 w-full max-w-6xl">
        <!-- Free Plan -->
        <div class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 duration-100
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition
                 px-6 py-5 w-full max-w-sm flex flex-col">
          <p class="text-white font-satoshi font-semibold text-[25px]">Free</p>

          <div class="flex flex-row items-end gap-2 pt-2">
            <p class="text-white font-satoshi font-semibold text-[34px] leading-none">0$</p>
            <p class="text-white/50 font-satoshi font-normal text-[15px]">/lifetime</p>
          </div>

          <p class="text-white/60 font-satoshi font-normal text-[16px] mt-2">
            Essential for those just starting out.
          </p>

          <div class="flex flex-col gap-1 pt-4">
            <Feature text="Basic gateways (US, IT)" />
            <Feature text="Include multithread (1X)" />
            <Feature text="CCGen Include" />
          </div>

          <div class="mt-auto pt-6">
            <a href="https://lunarchk.vercel.app/" target="_blank" rel="noopener">
              <SecondaryB disabled class="w-full bg-white/10 rounded-full border border-white/10">
                Get started
              </SecondaryB>
            </a>
          </div>
        </div>

        <!-- Premium Plan -->
        <div class="relative w-full max-w-sm flex flex-col justify-between rounded-2xl border border-[#344364] hover:brightness-110
                 bg-[linear-gradient(180deg,rgba(90,162,255,0.16),rgba(0,0,0,0.22))]
                 backdrop-blur-xl shadow-[0_22px_80px_rgba(0,0,0,0.65)]
                 transition px-6 py-5 min-h-[520px] duration-100">
          <!-- glow ring -->
          <div class="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-50
                   bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.35),transparent_55%)]"></div>

          <div class="relative">
            <div class="flex flex-row items-center justify-between w-full">
              <div class="flex items-center mb-2 sm:mb-0">
                <Icon name="basil:star-solid" size="22px" class="text-[#7aa7ff]" />
                <p class="text-white font-satoshi font-semibold text-[25px] pl-2">Premium</p>
              </div>

              <div
                class="flex items-center justify-center w-max h-max bg-white/10 border border-white/10 rounded-full px-3 py-1">
                <Icon name="mdi:sparkles" class="text-[#7aa7ff] mr-2" />
                <p class="text-xs font-bold font-satoshi text-white/90">
                  Most Popular
                </p>
              </div>
            </div>

            <div class="flex flex-row items-start gap-3 pt-2">
              <p class="text-white font-satoshi font-semibold text-[34px] leading-none">45$</p>
              <div class="flex flex-col">
                <p class="text-white/65 font-satoshi font-normal text-[15px]">12k lives • 6 months</p>
                <p class="text-white/45 font-satoshi font-normal text-[11px]">other plans in our telegram</p>
              </div>
            </div>

            <p class="text-white/60 font-satoshi font-normal text-[16px] mt-2">
              Necessary for those who know out.
            </p>

            <div class="flex flex-col pt-4 gap-1">
              <Feature text="More gateways (US, IT, MX, UK, ES, AE)" />
              <Feature text="Include multithread (3X)" />
              <Feature text="CCGen Include" />
              <Feature text="Remove cards" />
              <Feature text="Auto add address" />
              <Feature text="Approved list log" />
            </div>
          </div>

          <div class="mt-8">
            <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener" class="block w-full">
              <PrimaryB class="w-full max-w-none mx-0 !rounded-2xl !py-2.5 !px-6">
                Purchase
              </PrimaryB>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-16 px-6 py-16 border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm text-white/70">
        <!-- Branding -->
        <div class="col-span-1 flex flex-col">
          <div class="flex items-center space-x-2 mb-4">
            <NuxtImg src="/icon.png" class="w-8" />
            <p class="font-satoshi font-bold text-2xl text-white">lunarcntr.xyz</p>
          </div>
          <p class="text-sm mb-4 text-white/60">
            Enjoy the best checker of the moment now!
          </p>
        </div>

        <!-- General Links -->
        <div>
          <h3 class="font-semibold text-2xl font-satoshi text-white mb-3">General</h3>
          <ul class="font-satoshi space-y-2">
            <li><a href="https://lunarchk.vercel.app/" class="hover:text-white transition">Free Checker</a></li>
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
            <li>
              <a href="https://lunar-10.gitbook.io/lunar-docs/getting-started/introduction"
                class="hover:text-white transition">
                Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 text-center text-white/40 text-xs font-satoshi pt-6">
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
  background: #05060a;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 1000px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(122, 167, 255, 0.45);
}

html,
body {
  overflow-x: hidden !important;
}

body {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.14) #05060a;
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
