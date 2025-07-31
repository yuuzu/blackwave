<template>
  <div class="max-w-xl mx-auto mt-12 bg-[#111111] rounded-2xl shadow-xl p-8 text-white font-satoshi">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <Icon name="mdi:wallet" class="text-[#576784]" size="32" />
      Payment Wallets
    </h1>
    <div class="flex flex-col gap-4">
      <div
        v-for="wallet in wallets"
        :key="wallet.label"
        @click="copy(wallet.value)"
        :class="[
          'bg-[#181818] rounded-xl p-4 flex flex-col gap-2 cursor-pointer border-2 transition-all',
          copied === wallet.value ? 'border-green-400' : 'border-transparent hover:border-[#576784]'
        ]"
      >
        <div class="flex items-center gap-2">
          <Icon :name="wallet.icon" size="24" class="text-[#8591a5]" />
          <span class="font-semibold text-base">{{ wallet.label }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[#b8b8b8] font-mono break-all">{{ wallet.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const copied = ref('')

const wallets = [
  {
    label: 'Binance ID',
    value: '1109149858',
    icon: 'simple-icons:binance'
  },
  {
    label: 'Binance Email',
    value: 'yuzk8485@gmail.com',
    icon: 'simple-icons:binance'
  },
  {
    label: 'USDT - TRC20',
    value: 'TQtANEzJD4oe8sijYRHmsAd7Ty6JbNdJvT',
    icon: 'cryptocurrency:usdt'
  },
  {
    label: 'LTC',
    value: 'LSNnQwrHoQueSiLXSVbuNA5wDSX9AXZwo4',
    icon: 'cryptocurrency:ltc'
  },
  {
    label: 'BTC',
    value: '199kGeHmh1sxam8mRa4etnAYsBjFxF4yTJ',
    icon: 'cryptocurrency:btc'
  }
]

function copy(text) {
  navigator.clipboard.writeText(text)
  copied.value = text
  setTimeout(() => copied.value = '', 1500)
}
</script>