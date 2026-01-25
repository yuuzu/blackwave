<template>
  <div class="w-full mx-auto pt-20 md:pt-8 px-4 sm:px-6 lg:px-10 font-satoshi">
    <div class="w-full max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
             shadow-[0_18px_70px_rgba(0,0,0,0.55)] overflow-hidden">
      <!-- Header -->
      <div class="flex flex-col gap-2 mb-8">
      </div>
      <div class="p-6 sm:p-8 border-b border-white/10">
        <div class="flex items-center gap-3">
          <span class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Icon name="mdi:account-cash" class="text-[#7aa7ff]" size="30" />
          </span>

          <div class="min-w-0">
            <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white">Reseller Panel</h1>
            <p class="text-sm text-white/55">Create keys using your reseller balance and track created keys.</p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 sm:p-8">
        <!-- Balance -->
        <div class="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5 mb-6">
          <div class="text-white/55 text-sm mb-1">Reseller Balance</div>
          <div class="text-2xl sm:text-3xl font-black text-white">
            R$ {{ resellerBalance.toFixed(2) }}
          </div>
        </div>

        <!-- Create Key -->
        <div class="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="mdi:key-plus" size="20" class="text-[#7aa7ff]" />
            <div class="font-bold text-white">Create Key</div>
          </div>

          <label class="block text-white/60 text-sm mb-2">Key Value (R$)</label>
          <input v-model.number="keyValue" type="number" min="1" placeholder="Value" class="w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                   focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition" />

          <button @click="createKey" :disabled="loading" class="mt-3 w-full rounded-2xl px-5 py-3 font-bold text-sm text-white
                   bg-[#7aa7ff]/15 border border-[#7aa7ff]/30 hover:bg-[#7aa7ff]/20 hover:border-[#7aa7ff]/40 transition
                   disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loading ? 'Creating...' : 'Create Key' }}
          </button>

          <!-- Feedback -->
          <transition name="fade-slide">
            <div v-if="message" class="mt-4">
              <div class="flex items-center justify-center rounded-2xl px-4 py-3 border flex items-start gap-3" :class="success
                ? 'bg-emerald-500/10 border-emerald-500/25'
                : 'bg-rose-500/10 border-rose-500/25'">
                <Icon :name="success ? 'mdi:check-circle-outline' : 'mdi:alert-circle-outline'" size="22"
                  :class="success ? 'text-emerald-300' : 'text-rose-300'" />
                <div class="text-sm text-white/85 break-words flex-1">
                  {{ message }}
                </div>
                <button class="w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                  @click="message = ''" title="Close">
                  <Icon name="mdi:close" size="18" class="text-white/70" />
                </button>
              </div>
            </div>
          </transition>
        </div>

        <div class="my-7 border-t border-white/10"></div>

        <!-- Keys list -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <Icon name="mdi:key-chain" class="text-[#7aa7ff]" size="20" />
            <h2 class="text-lg sm:text-xl font-black text-white">Your Created Keys</h2>
          </div>

          <div v-if="loadingKeys" class="text-white/55 text-sm">Loading keys...</div>
          <div v-else-if="createdKeys.length === 0" class="text-white/55 text-sm">No keys created yet.</div>

          <div v-else class="rounded-2xl border border-white/10 bg-black/20 p-2 max-h-72 overflow-y-auto">
            <div v-for="k in createdKeys" :key="k.id" class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2
                     rounded-2xl border border-white/10 bg-white/5 px-4 py-3 mb-2 last:mb-0">
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-white text-xs sm:text-sm select-all break-all">
                  {{ k.id }}
                </span>

                <button @click="copyKey(k.id)"
                  class="w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                  title="Copy key">
                  <Icon name="mdi:content-copy" size="16" class="text-white/70" />
                </button>
              </div>

              <div class="flex items-center gap-3 sm:justify-end">
                <span class="text-white/80 font-black text-sm sm:text-base">
                  R$ {{ k.value.toFixed(2) }}
                </span>
                <span class="text-xs text-white/45 hidden sm:inline">
                  {{ k.createdAt }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { auth, db } from '~/firebase'
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
  getDocs,
  collection,
  query,
  where,
  orderBy
} from 'firebase/firestore'

const createdKeys = ref([])
const loadingKeys = ref(true)

const resellerBalance = ref(0)
const keyValue = ref(1)
const loading = ref(false)

const message = ref('')
const success = ref(false)

function toast(msg, ok = true) {
  message.value = msg
  success.value = ok
  // auto-hide
  setTimeout(() => {
    if (message.value === msg) message.value = ''
  }, 2500)
}

const copyKey = async (keyId) => {
  try {
    await navigator.clipboard.writeText(
      `🔑 You can redeem your key at:
https://lunarcntr.vercel.app/redeem/${keyId}

Just access the link, log in, and redeem your balance!`
    )
    toast('Key copied!', true)
  } catch {
    toast('Failed to copy key.', false)
  }
}

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
    await fetchCreatedKeys()
  }
})

// sempre que der sucesso, atualiza lista
watch(success, (val) => {
  if (val) fetchCreatedKeys()
})

async function createKey() {
  message.value = ''
  success.value = false
  loading.value = true

  const user = auth.currentUser
  if (!user) {
    toast('Not authenticated.', false)
    loading.value = false
    return
  }

  const userRef = doc(db, 'users', user.uid)
  const userDoc = await getDoc(userRef)
  const balance = userDoc.data().resellerBalance ?? 0

  if (!keyValue.value || keyValue.value <= 0) {
    toast('Enter a valid value.', false)
    loading.value = false
    return
  }

  if (balance < keyValue.value) {
    toast('Insufficient reseller balance.', false)
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

    // copia só a key (padrão rápido)
    try {
      await navigator.clipboard.writeText(keyId)
    } catch { }

    toast(`Key created: ${keyId}`, true)
    keyValue.value = 1
  } catch (e) {
    toast('Error creating key.', false)
  }

  loading.value = false
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(.4, 0, .2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(14px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
