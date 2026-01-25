<template>
  <div class="relative min-h-screen w-full overflow-x-hidden bg-[#05060a] text-white font-satoshi">
    <!-- Background -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,180,255,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(140,90,255,0.12),transparent_55%)]"
      ></div>

      <div class="absolute -top-48 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#5aa2ff]/18 blur-[110px]"></div>
      <div class="absolute top-56 -left-56 h-[560px] w-[560px] rounded-full bg-[#8b5dff]/14 blur-[130px]"></div>
      <div class="absolute -bottom-72 right-0 h-[720px] w-[720px] rounded-full bg-[#3dd6ff]/10 blur-[140px]"></div>

      <div
        class="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:84px_84px]"
      ></div>

      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.82)_85%)]"></div>
    </div>

    <div class="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        class="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
               shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden p-8"
      >
        <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.22),transparent_55%)]"></div>

        <div class="relative">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
              <Icon name="mdi:wallet" class="text-[#7aa7ff]" size="24" />
            </div>
            <div class="flex-1">
              <h1 class="text-2xl font-black text-white">Payment Wallets</h1>
              <p class="text-white/60 text-sm">
                Click a wallet to copy. Use the copy button if you prefer.
              </p>
            </div>
          </div>

          <!-- Wallets -->
          <div class="flex flex-col gap-3">
            <div
              v-for="wallet in wallets"
              :key="wallet.label"
              class="group rounded-2xl border bg-black/20 backdrop-blur
                     border-white/10 hover:border-[#7aa7ff]/30 transition
                     p-4 flex flex-col gap-2"
            >
              <div class="flex items-center gap-2 ">
                <Icon :name="wallet.icon" size="22" class="text-[#9fb0c8]" />
                <span class="font-semibold text-base text-white">{{ wallet.label }}</span>

                <span
                  v-if="copied === wallet.value"
                  class="ml-auto text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-2 py-0.5"
                >
                  Copied
                </span>
              </div>

              <div
                class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center gap-2"
              >
                <span class="text-white/70 font-mono text-sm break-all flex-1 select-all">
                  {{ wallet.value }}
                </span>
              </div>

              <!-- whole card click -->
              <button
                type="button"
                class="sr-only"
                :aria-label="`Copy ${wallet.label}`"
                @click="copy(wallet.value, wallet.label)"
              />
              <div
                role="button"
                tabindex="0"
                class="absolute inset-0 rounded-2xl"
                @click="copy(wallet.value, wallet.label)"
                @keydown.enter.prevent="copy(wallet.value, wallet.label)"
                @keydown.space.prevent="copy(wallet.value, wallet.label)"
              ></div>
            </div>
          </div>

          <!-- Footer hint -->
          <div class="mt-6 text-xs text-white/50">
            Tip: addresses are selectable (click and drag) and also one-click copy.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const copied = ref('')
const toastMsg = ref('')
let toastTimer = null

const wallets = [
  { label: 'Binance ID', value: '1109149858', icon: 'simple-icons:binance' },
  { label: 'Binance Email', value: 'yuzk8485@gmail.com', icon: 'simple-icons:binance' },
  { label: 'USDT - TRC20', value: 'TQtANEzJD4oe8sijYRHmsAd7Ty6JbNdJvT', icon: 'cryptocurrency:usdt' },
  { label: 'LTC', value: 'LSNnQwrHoQueSiLXSVbuNA5wDSX9AXZwo4', icon: 'cryptocurrency:ltc' },
  { label: 'BTC', value: '199kGeHmh1sxam8mRa4etnAYsBjFxF4yTJ', icon: 'cryptocurrency:btc' }
]

async function copy(text, label = 'Wallet') {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = text

    toastMsg.value = `${label} copied!`
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (toastMsg.value = ''), 1600)

    setTimeout(() => (copied.value = ''), 1500)
  } catch {
    toastMsg.value = 'Could not copy. Your browser blocked clipboard.'
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (toastMsg.value = ''), 2000)
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s cubic-bezier(.4, 0, .2, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
