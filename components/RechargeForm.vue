<template>
  <div class="recharge-form bg-[#0a0a0a] p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-white mb-4">Recharge Your Account</h2>
    <div class="flex flex-col gap-4">
      <div>
        <label class="block text-sm font-semibold text-white mb-2">Select Amount</label>
        <div class="flex gap-2">
          <button @click="selectAmount(5)" class="amount-button"> $5 for 20 Credits </button>
          <button @click="selectAmount(10)" class="amount-button"> $10 for 50 Credits </button>
          <button @click="selectAmount(15)" class="amount-button"> $15 for 100 Credits </button>
          <button @click="selectAmount(45)" class="amount-button"> $45 for 1200 Credits </button>
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold text-white mb-2">Select Payment Method</label>
        <select v-model="selectedCurrency" class="payment-select">
          <option value="USDT">USDT (TRC20)</option>
          <option value="BTC">BTC</option>
          <option value="LTC">LTC</option>
        </select>
      </div>
      <button @click="createInvoice" class="bg-[#576784] text-white py-2 rounded">Create Invoice</button>
      <div v-if="qrImage" class="mt-4">
        <h3 class="text-lg font-semibold text-white">Scan QR Code to Pay</h3>
        <img :src="qrImage" alt="QR Code" class="w-36 h-36" />
      </div>
      <div v-if="invoiceData" class="mt-4">
        <h3 class="text-lg font-semibold text-white">Invoice Status: {{ invoiceData.status }}</h3>
        <div v-if="invoiceData.status === 'finished' || invoiceData.status === 'confirmed' || invoiceData.status === 'paid'" class="text-green-400">
          Payment Confirmed! Your account has been recharged.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createInvoice } from '~/composables/usePayments'

const selectedCurrency = ref('USDT')
const qrImage = ref('')
const invoiceData = ref(null)

const selectAmount = (amount) => {
  // Logic to handle amount selection
  // Store the selected amount for invoice creation
  invoiceData.value = { amount }
}

const createInvoice = async () => {
  if (!invoiceData.value) return
  const response = await createInvoice(invoiceData.value.amount, selectedCurrency.value)
  if (response) {
    qrImage.value = response.qrImage
    invoiceData.value = response.invoiceData
  }
}
</script>

<style scoped>
.amount-button {
  background-color: #313442;
  color: #fafafa;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.amount-button:hover {
  background-color: #292c38;
}

.payment-select {
  background-color: #232323;
  color: #fafafa;
  padding: 10px;
  border-radius: 5px;
}
</style>