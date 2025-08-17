<template>
  <div class="font-satoshi min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-4">
    <div class="bg-[#121212]/90 rounded-3xl p-8 w-full max-w-md shadow-2xl flex flex-col gap-6 border-2 border-[#191919]">
      <div class="flex flex-col items-center gap-2">
        <Icon name="fa7-solid:gift" size="48" class="text-[#576784]" />
        <h2 class="text-2xl font-bold text-white text-center">Redeem Your Key</h2>
        <p class="text-[#b8b8b8] text-center text-base">
          Welcome! Here you can redeem your key and instantly add the value to your balance.<br>
          <span class="text-[#576784]">Keys are single-use and non-refundable.</span>
        </p>
      </div>
      <div v-if="loading" class="flex justify-center items-center text-[#fafafa] py-8">
        <Icon name="mdi:loading" class="animate-spin mr-2" /> Loading key information...
      </div>
      <div v-else>
        <div v-if="!authUser">
          <div class="flex flex-col items-center gap-3">
            <div class="text-red-400 text-center font-semibold text-lg">
              You must be logged in to redeem a key.
            </div>
            <div class="text-[#b8b8b8] text-center text-base">
              Please log in to your account to continue. If you don't have an account, you can create one for free.
            </div>
            <div class="flex gap-3 mt-2">
              <NuxtLink to="/login" class="bg-[#181818] border-2 border-[#212121] text-[#fafafa] hover:bg-[#181818]/80 text-white px-5 py-2 rounded-xl font-bold transition duration-300">
                Go to Login
              </NuxtLink>
              <NuxtLink to="/" class="bg-[#181818] border-2 border-[#212121] text-[#fafafa] hover:bg-[#181818]/80 text-[#fafafa] px-5 py-2 rounded-xl font-bold transition duration-300">
                Back to Home
              </NuxtLink>
            </div>
          </div>
        </div>
        <div v-else-if="!keyData">
          <div class="flex flex-col items-center gap-2">
            <Icon name="mdi:alert-circle-outline" size="36" class="text-red-400" />
            <div class="text-red-400 font-bold text-lg">Key not found or already used.</div>
            <div class="text-[#b8b8b8] text-center text-base">
              Please check if the key is correct or contact support if you believe this is a mistake.
            </div>
            <NuxtLink to="/dashboard" class="mt-3 bg-[#181818] border-2 border-[#212121] text-[#fafafa] hover:bg-[#181818]/80 px-5 py-2 rounded-xl duration-300 transition">
              Go to Dashboard
            </NuxtLink>
          </div>
        </div>
        <div v-else>
          <div class="flex justify-center items-center mb-2 text-[#b8b8b8] text-center">
            <span class="text-[#fafafa] select-all">{{ key }}</span>
          </div>
          <div class="flex justify-center items-center mb-2 text-[#b8b8b8] text-center">
            <span class="text-[#576784] font-bold">R$ {{ keyData.value.toFixed(2) }}</span>
          </div>
          <div class="mb-4 text-[#b8b8b8] text-center text-sm">
            By redeeming, the value will be instantly credited to your account balance.
          </div>
          <Button @click="redeem" :disabled="redeemLoading || success" class="w-full py-2 rounded-xl bg-[#181818] border-2 border-[#212121] text-center text-[#fafafa] font-semibold transition mb-1">
            {{ redeemLoading ? 'Redeeming...' : (success ? 'Redeemed!' : 'Redeem Key') }}
          </Button>
          <div v-if="msg" :class="success ? 'text-green-400' : 'text-red-400'" class="mt-4 text-center font-semibold flex items-center justify-center gap-2">
            <Icon :name="success ? 'mdi:check-circle' : 'mdi:alert-circle'" />
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()
const key = route.params.key
const keyData = ref(null)
const loading = ref(true)
const redeemLoading = ref(false)
const msg = ref('')
const success = ref(false)
const authUser = ref(null)

onMounted(() => {
  auth.onAuthStateChanged(async (user) => {
    authUser.value = user
    loading.value = true
    if (!user) {
      loading.value = false
      return
    }
    if (!key) {
      loading.value = false
      return
    }
    // Só busca a key se autenticado
    const keyRef = doc(db, 'keys', key)
    const keySnap = await getDoc(keyRef)
    if (keySnap.exists()) {
      keyData.value = keySnap.data()
    }
    loading.value = false
  })
})

async function redeem() {
  msg.value = ''
  success.value = false
  redeemLoading.value = true
  if (!authUser.value) {
    msg.value = 'You must be logged in.'
    redeemLoading.value = false
    return
  }
  try {
    // Atualiza saldo do usuário
    const userRef = doc(db, 'users', authUser.value.uid)
    const userSnap = await getDoc(userRef)
    const balance = userSnap.data().balance ?? 0
    const newBalance = balance + (keyData.value.value ?? 0)
    await updateDoc(userRef, { balance: newBalance })

    // Marca a key como usada
    await setDoc(doc(db, 'usedKeys', key), {
      usedBy: authUser.value.uid,
      usedByEmail: authUser.value.email ?? '',
      usedAt: serverTimestamp(),
      value: keyData.value.value ?? 0,
      createdBy: keyData.value.createdBy ?? '',
      createdAt: keyData.value.createdAt ?? null
    })
    await deleteDoc(doc(db, 'keys', key))

    msg.value = `Key redeemed! R$ ${keyData.value.value.toFixed(2)} added to your balance.`
    success.value = true
    // Redireciona para dashboard após 2 segundos
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
    keyData.value = null
  } catch (e) {
    msg.value = 'Error redeeming key.'
  }
  redeemLoading.value = false
}
</script>