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
        class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
               shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden p-8"
      >
        <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.22),transparent_55%)]"></div>

        <div class="relative flex flex-col gap-6">
          <!-- Header -->
          <div class="flex flex-col items-center gap-2">
            <div class="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
              <Icon name="fa7-solid:gift" size="26" class="text-[#7aa7ff]" />
            </div>

            <h2 class="text-2xl font-black text-white text-center">Redeem Your Key</h2>
            <p class="text-white/60 text-center text-sm leading-relaxed">
              Redeem your key and add the value to your balance instantly.<br />
              <span class="text-[#7aa7ff]">Keys are single-use and non-refundable.</span>
            </p>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="flex items-center justify-center py-8 text-white/70 gap-2">
            <Icon name="mdi:loading" class="animate-spin" />
            Loading key information...
          </div>

          <!-- Not logged -->
          <div v-else-if="!authUser" class="flex flex-col items-center gap-3 text-center">
            <div class="text-rose-400 font-semibold">You must be logged in to redeem a key.</div>
            <div class="text-white/60 text-sm">
              Please log in to continue. If you don’t have an account, create one for free.
            </div>

            <div class="flex gap-3 mt-2">
              <NuxtLink
                to="/login"
                class="rounded-2xl px-5 py-2 font-semibold bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition"
              >
                Go to Login
              </NuxtLink>
              <NuxtLink
                to="/"
                class="rounded-2xl px-5 py-2 font-semibold bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition"
              >
                Home
              </NuxtLink>
            </div>
          </div>

          <!-- ✅ Already redeemed by YOU -->
          <div v-else-if="redeemedInfo" class="flex flex-col items-center gap-3 text-center">
            <Icon name="mdi:check-circle-outline" size="42" class="text-emerald-400" />
            <div class="text-emerald-400 font-black text-lg">Você já resgatou essa chave.</div>

            <div class="text-white/60 text-sm">
              {{ redeemedInfo.text }}
              <span class="block mt-1 text-white/45">Redirecionando para o dashboard…</span>
            </div>

            <NuxtLink
              to="/dashboard"
              class="mt-2 rounded-2xl px-5 py-2 font-semibold bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition"
            >
              Go to Dashboard
            </NuxtLink>
          </div>

          <!-- Key not found -->
          <div v-else-if="!keyData" class="flex flex-col items-center gap-2 text-center">
            <Icon name="mdi:alert-circle-outline" size="36" class="text-rose-400" />
            <div class="text-rose-400 font-bold">{{ msg || 'Key not found or already used.' }}</div>
            <div class="text-white/60 text-sm">
              Check if the key is correct or contact support if you believe this is a mistake.
            </div>

            <NuxtLink
              to="/dashboard"
              class="mt-2 rounded-2xl px-5 py-2 font-semibold bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition"
            >
              Go to Dashboard
            </NuxtLink>
          </div>

          <!-- Key ok -->
          <div v-else class="flex flex-col gap-4">
            <div class="rounded-2xl bg-black/25 border border-white/10 p-4">
              <div class="text-xs text-white/60 mb-1">Key</div>
              <div class="text-sm font-mono text-white select-all break-all">{{ keyStr }}</div>

              <div class="mt-3 text-xs text-white/60 mb-1">Value</div>
              <div class="text-lg font-black text-[#7aa7ff]">
                R$ {{ Number(keyData.value ?? 0).toFixed(2) }}
              </div>

              <div class="mt-3 text-xs text-white/50">
                By redeeming, the value will be credited to your account balance.
              </div>
            </div>

            <button
              @click="redeem"
              :disabled="redeemLoading"
              class="w-full rounded-2xl py-3 font-bold flex items-center justify-center gap-2
                     bg-[#7aa7ff]/20 border border-[#7aa7ff]/35 hover:bg-[#7aa7ff]/25 hover:border-[#7aa7ff]/45 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon :name="redeemLoading ? 'mdi:loading' : 'mdi:gift'"
                    :class="redeemLoading ? 'animate-spin' : ''" />
              {{ redeemLoading ? 'Redeeming...' : 'Redeem Key' }}
            </button>

            <div
              v-if="msg"
              class="text-center text-sm flex items-center justify-center gap-2"
              :class="success ? 'text-emerald-400' : 'text-rose-400'"
            >
              <Icon :name="success ? 'mdi:check-circle' : 'mdi:alert-circle'" />
              {{ msg }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, db } from '~/firebase'
import { doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()

// ✅ key reativa + decode + trim (evita docId errado)
const key = computed(() => {
  const raw = String(route.params.key ?? '').trim()
  try {
    return decodeURIComponent(raw).trim()
  } catch {
    return raw
  }
})
const keyStr = computed(() => key.value)

const keyData = ref(null)
const redeemedInfo = ref(null) // { text: string }
const loading = ref(true)
const redeemLoading = ref(false)
const msg = ref('')
const success = ref(false)
const authUser = ref(null)

let unsubAuth = null
let redirectTimer = null

function clearRedirect() {
  if (redirectTimer) {
    clearTimeout(redirectTimer)
    redirectTimer = null
  }
}
function scheduleRedirect(ms = 1700) {
  clearRedirect()
  redirectTimer = setTimeout(() => router.push('/dashboard'), ms)
}

function moneyBRL(v) {
  const n = Number(v ?? 0)
  if (!Number.isFinite(n)) return 'R$ 0,00'
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function loadKeyState() {
  clearRedirect()
  loading.value = true
  msg.value = ''
  success.value = false
  keyData.value = null
  redeemedInfo.value = null

  if (!authUser.value || !key.value) {
    loading.value = false
    return
  }

  try {
    const keyRef = doc(db, 'keys', key.value)
    const usedRef = doc(db, 'usedKeys', key.value)

    // 1) tenta achar em keys
    const keySnap = await getDoc(keyRef)
    if (keySnap.exists()) {
      keyData.value = keySnap.data()
      return
    }

    // 2) se não existe em keys, tenta usedKeys
    const usedSnap = await getDoc(usedRef)
    if (usedSnap.exists()) {
      const used = usedSnap.data() || {}

      // ✅ só mostra “já resgatou” se foi o MESMO usuário
      if (used.usedBy === authUser.value.uid) {
        const v = Number(used.value ?? 0)
        redeemedInfo.value = {
          text: Number.isFinite(v) && v > 0
            ? `Valor resgatado: ${moneyBRL(v)}`
            : 'Chave já resgatada.'
        }
        scheduleRedirect(1600)
      } else {
        // privacidade: não revela que alguém usou
        msg.value = 'Key not found or already used.'
      }
      return
    }

    // 3) não existe em lugar nenhum
    msg.value = 'Key not found or already used.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  unsubAuth = auth.onAuthStateChanged(async (user) => {
    authUser.value = user
    await loadKeyState()
  })
})

watch(key, async () => {
  await loadKeyState()
})

onBeforeUnmount(() => {
  if (unsubAuth) unsubAuth()
  clearRedirect()
})

async function redeem() {
  clearRedirect()
  msg.value = ''
  success.value = false
  redeemLoading.value = true

  try {
    if (!authUser.value) {
      msg.value = 'You must be logged in.'
      return
    }
    if (!key.value) {
      msg.value = 'Invalid key.'
      return
    }

    const userId = authUser.value.uid
    const keyId = key.value

    const userRef = doc(db, 'users', userId)
    const keyRef = doc(db, 'keys', keyId)
    const usedRef = doc(db, 'usedKeys', keyId)

    const result = await runTransaction(db, async (tx) => {
      // já usada?
      const usedSnap = await tx.get(usedRef)
      if (usedSnap.exists()) {
        const used = usedSnap.data() || {}
        if (used.usedBy === userId) {
          const v = Number(used.value ?? 0)
          return { status: 'already', value: Number.isFinite(v) ? v : 0 }
        }
        throw new Error('Key not found or already used.')
      }

      // key existe?
      const keySnap = await tx.get(keyRef)
      if (!keySnap.exists()) throw new Error('Key not found or already used.')

      const kd = keySnap.data() || {}
      const value = Number(kd.value ?? 0)
      if (!Number.isFinite(value) || value <= 0) throw new Error('Invalid key value.')

      // user existe?
      const userSnap = await tx.get(userRef)
      if (!userSnap.exists()) throw new Error('User not found.')

      const currentBalance = Number(userSnap.data()?.balance ?? 0)
      const newBalance = currentBalance + value

      tx.update(userRef, { balance: newBalance })

      tx.set(usedRef, {
        usedBy: userId,
        usedByEmail: authUser.value.email ?? '',
        usedAt: serverTimestamp(),
        value,
        createdBy: kd.createdBy ?? '',
        createdAt: kd.createdAt ?? null
      })

      tx.delete(keyRef)

      return { status: 'redeemed', value }
    })

    // ✅ mostra tela de resgatado / já resgatado e redireciona
    const v = Number(result.value ?? 0)
    redeemedInfo.value = {
      text: result.status === 'redeemed'
        ? `Você resgatou essa chave! Valor: ${moneyBRL(v)}`
        : `Você já resgatou essa chave. Valor: ${moneyBRL(v)}`
    }

    keyData.value = null
    success.value = true
    msg.value = ''
    scheduleRedirect(1800)
  } catch (e) {
    console.error('redeem error:', e)
    msg.value = e?.message || 'Error redeeming key.'
    success.value = false
  } finally {
    redeemLoading.value = false
  }
}
</script>
