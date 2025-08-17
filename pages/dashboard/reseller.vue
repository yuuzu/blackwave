<template>
  <div class="max-w-[530px] sm:max-w-[576px] mx-auto mt-12 bg-[#111111] rounded-2xl shadow-xl p-8 text-white font-satoshi">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <Icon name="mdi:account-cash" class="text-[#8a97ab]" size="32" />
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
      <Button @click="createKey" :disabled="loading"
        class="w-full py-2 rounded-xl bg-[#181818] border-2 border-[#212121] hover:bg-[#181818]/80 text-center font-semibold transition mt-2">
        {{ loading ? 'Creating...' : 'Create Key' }}
      </Button>
      <div v-if="success"
        class="flex flex-col items-center justify-center bg-[#1a3a1a] border-2 border-[#235723] text-[#fafafa] px-4 py-2 rounded-xl mt-2">
        <div class="text-green-400 text-center">
          <p class="font-satoshi text-[16px] font-thin text-white w-max">{{ message }}</p>
        </div>
      </div>
      <div class="mt-10">
        <h2 class="text-xl font-bold mb-3 flex items-center gap-2">
          <Icon name="mdi:key-chain" class="text-[#8a97ab]" size="24" />
          Your Created Keys
        </h2>
        <div v-if="loadingKeys" class="text-[#b8b8b8]">Loading keys...</div>
        <div v-else-if="createdKeys.length === 0" class="text-[#b8b8b8]">No keys created yet.</div>
        <div v-else class="space-y-2 max-h-64 overflow-y-auto rounded-lg border border-[#232323] bg-[#161616] p-2"
          style="min-height: 56px;">
          <div v-for="k in createdKeys" :key="k.id"
            class="flex items-center justify-between bg-[#181818] border border-[#232323] rounded-lg px-4 py-2">
            <span class="text-[#fafafa] select-all text-xs sm:text-sm break-all">{{ k.id }}</span>
            <span class="text-[#8a97ab] font-bold text-xs sm:text-base">R$ {{ k.value.toFixed(2) }}</span>
            <span class="text-xs text-[#b8b8b8] hidden sm:inline">{{ k.createdAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc, setDoc, serverTimestamp, getDocs, collection, query, where, orderBy } from 'firebase/firestore'

const createdKeys = ref([])
const loadingKeys = ref(true)

async function fetchCreatedKeys() {
  loadingKeys.value = true
  createdKeys.value = []
  const user = auth.currentUser
  if (!user) {
    loadingKeys.value = false
    return
  }
  const q = query(
    collection(db, 'keys'),
    where('createdBy', '==', user.uid),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  createdKeys.value = snap.docs.map(docSnap => {
    const d = docSnap.data()
    return {
      id: docSnap.id,
      value: d.value ?? 0,
      createdAt: d.createdAt?.toDate
        ? new Date(d.createdAt.seconds * 1000).toLocaleString()
        : '-'
    }
  })
  loadingKeys.value = false
}

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
    await fetchCreatedKeys() // Atualiza a lista de keys ao carregar a página
  }
})

// Atualiza a lista de keys sempre que uma key for criada com sucesso
watch(success, (val) => {
  if (val) fetchCreatedKeys()
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