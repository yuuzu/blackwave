<template>
  <div class="max-w-xl mx-auto mt-12 bg-[#111111] rounded-2xl shadow-xl p-8 text-white font-satoshi">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <Icon name="mdi:account-cash" class="text-[#576784]" size="32" />
      Reseller Panel
    </h1>
    <div class="mb-6">
      <div class="text-[#b8b8b8] mb-1">Reseller Balance</div>
      <div class="text-2xl font-bold text-[#fafafa]">R$ {{ resellerBalance.toFixed(2) }}</div>
    </div>
    <div class="mb-4">
      <label class="block text-[#b8b8b8] mb-3">Key Value (R$)</label>
      <input v-model.number="keyValue" type="number" min="1" placeholder="Value"
        class="rounded-lg px-4 py-2 bg-[#1a1a1a] border-2 border-[#202020] text-[#FAFAFA] outline-none w-full" />
      <PrimaryB @click="createKey" :disabled="loading" class="mt-6 justify-center items-center w-full">
        <Icon name="mdi:check-bold" /> {{ loading ? 'Creating...' : 'Create Key' }}
      </PrimaryB>
      <div v-if="message" :class="success ? 'text-green-400' : 'text-red-400'" class="mt-2 text-center">
        <Icon :name="success ? 'mdi:check-circle' : 'mdi:alert-circle'" />
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const resellerBalance = ref(0)
const keyValue = ref(1)
const loading = ref(false)
const message = ref('')
const success = ref(false)

function generateKeyCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 12; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
  return `LUNAR-R-${code}`
}

onMounted(async () => {
  const user = auth.currentUser
  if (!user) return
  const userDoc = await getDoc(doc(db, 'users', user.uid))
  if (userDoc.exists() && userDoc.data().reseller) {
    resellerBalance.value = userDoc.data().resellerBalance ?? 0
  }
})

async function createKey() {
  message.value = ''
  success.value = false
  loading.value = true
  const user = auth.currentUser
  if (!user) {
    message.value = 'Not authenticated.'
    loading.value = false
    return
  }
  const userRef = doc(db, 'users', user.uid)
  const userDoc = await getDoc(userRef)
  const balance = userDoc.data().resellerBalance ?? 0
  if (keyValue.value <= 0) {
    message.value = 'Enter a valid value.'
    loading.value = false
    return
  }
  if (balance < keyValue.value) {
    message.value = 'Insufficient reseller balance.'
    loading.value = false
    return
  }
  try {
    const keyId = generateKeyCode()
    await setDoc(doc(db, 'keys', keyId), {
      value: keyValue.value,
      createdBy: user.uid,
      createdByEmail: user.email ?? '',
      createdAt: serverTimestamp()
    })
    await updateDoc(userRef, { resellerBalance: balance - keyValue.value })
    resellerBalance.value = balance - keyValue.value
    message.value = `Key created: ${keyId}`
    success.value = true
    keyValue.value = 1
    await navigator.clipboard.writeText(keyId)
  } catch (e) {
    message.value = 'Error creating key.'
  }
  loading.value = false
}
</script>