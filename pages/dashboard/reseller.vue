<template>
  <div class="relative min-h-screen w-full overflow-x-hidden bg-black text-white font-sans md:ml-[260px] pt-20 md:pt-4">

    <!-- ═══ BACKGROUND ════════════════════════════════════════ -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0"
        style="background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:72px 72px;mask-image:radial-gradient(ellipse 90% 80% at 50% 20%,black 40%,transparent 100%)"/>
      <div class="absolute inset-0 opacity-50"
        style="background-image:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.01) 40px,rgba(255,255,255,0.01) 41px)"/>
      <div class="absolute rounded-full" style="width:700px;height:700px;top:-250px;left:15%;filter:blur(170px);background:radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)"/>
      <div class="absolute rounded-full" style="width:500px;height:500px;bottom:-80px;right:-60px;filter:blur(160px);background:radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)"/>
    </div>

    <div class="mx-auto w-full max-w-5xl px-5 sm:px-7 lg:px-10 pt-4 pb-20 relative z-10">

      <!-- ═══ PAGE HEADER ════════════════════════════════════ -->
      <div class="mb-8">
        <span class="section-label">Reseller</span>
        <div class="flex items-start justify-between flex-wrap gap-4 mt-1">
          <div>
            <h1 class="font-display text-[2rem] sm:text-[2.4rem] font-extrabold tracking-[-0.04em] leading-tight text-white">
              Reseller <span class="text-blue-400">Panel</span>
            </h1>
            <p class="text-[13px] text-white/30 mt-1">Create keys using your balance and track everything.</p>
          </div>
          <!-- balance badge -->
          <div class="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border self-start"
            style="background:rgba(59,130,246,0.07);border-color:rgba(59,130,246,0.2)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
            <div>
              <div class="text-[10px] font-semibold uppercase tracking-widest text-white/30 leading-none mb-0.5">Balance</div>
              <div class="font-display text-[1.1rem] font-extrabold tracking-tight text-white leading-none">
                $ <span class="text-blue-400">{{ resellerBalance.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ MAIN GRID ══════════════════════════════════════ -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">

        <!-- Create Key card — left -->
        <div class="lg:col-span-2 rounded-2xl border overflow-hidden relative group"
          style="background:#030305;border-color:rgba(255,255,255,0.07)">
          <!-- corner brackets -->
          <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/30 opacity-40 group-hover:opacity-80 transition-opacity"/>
          <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/30 opacity-40 group-hover:opacity-80 transition-opacity"/>
          <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/30 opacity-40 group-hover:opacity-80 transition-opacity"/>
          <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/30 opacity-40 group-hover:opacity-80 transition-opacity"/>
          <!-- glow -->
          <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style="background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.06) 0%,transparent 55%)"/>

          <!-- header -->
          <div class="flex items-center gap-2 px-6 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
            <div class="w-7 h-7 flex items-center justify-center rounded-lg border shrink-0"
              style="background:rgba(59,130,246,0.1);border-color:rgba(59,130,246,0.25)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
              </svg>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-white/30">Create Key</span>
          </div>

          <!-- body -->
          <div class="relative px-6 py-6 flex flex-col gap-5">

            <!-- balance mini display -->
            <div class="rounded-xl border px-4 py-3.5 flex items-center justify-between"
              style="background:rgba(255,255,255,0.02);border-color:rgba(255,255,255,0.06)">
              <div>
                <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1">Available</div>
                <div class="font-display text-[1.5rem] font-extrabold tracking-tight text-white leading-none">
                  $ <span class="text-blue-400">{{ resellerBalance.toFixed(2) }}</span>
                </div>
              </div>
              <div class="w-10 h-10 flex items-center justify-center rounded-xl border"
                style="background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.2)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              </div>
            </div>

            <!-- input -->
            <div>
              <label class="block text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">Key Value ($)</label>
              <input v-model.number="keyValue" type="number" min="1" placeholder="e.g. 5"
                class="w-full px-4 py-3 rounded-xl border bg-transparent text-white text-[13px] font-mono outline-none transition placeholder:text-white/15 focus:border-blue-500/50"
                style="background:rgba(255,255,255,0.025);border-color:rgba(255,255,255,0.08)"
                @keyup.enter="createKey"/>
            </div>

            <!-- quick amounts -->
            <div>
              <div class="text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-2">Quick select</div>
              <div class="flex gap-2 flex-wrap">
                <button v-for="amt in [20, 100, 1200]" :key="amt"
                  @click="keyValue = amt"
                  class="px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all"
                  :class="keyValue === amt
                    ? 'bg-blue-600 text-white'
                    : 'text-white/35 border border-white/[0.07] hover:border-white/15 hover:text-white/60'"
                  :style="keyValue === amt ? '' : ''">
                  ${{ amt }}
                </button>
              </div>
            </div>

            <!-- create button -->
            <button @click="createKey" :disabled="loading"
              class="flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25)">
              <svg v-if="!loading" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
              </svg>
              <svg v-else class="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              {{ loading ? 'Creating...' : 'Create Key' }}
            </button>

            <!-- feedback -->
            <transition name="fade-slide">
              <div v-if="message"
                class="rounded-xl border px-4 py-3 flex items-start gap-3"
                :style="success
                  ? 'background:rgba(34,197,94,0.06);border-color:rgba(34,197,94,0.2)'
                  : 'background:rgba(239,68,68,0.06);border-color:rgba(239,68,68,0.2)'">
                <svg class="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  :stroke="success ? '#4ade80' : '#f87171'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline v-if="success" points="20 6 9 17 4 12"/>
                  <template v-else><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></template>
                </svg>
                <span class="text-[12px] flex-1 break-words" :class="success ? 'text-emerald-300/80' : 'text-red-300/80'">{{ message }}</span>
                <button @click="message = ''" class="shrink-0 text-white/20 hover:text-white/50 transition mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Keys list — right -->
        <div class="lg:col-span-3 rounded-2xl border overflow-hidden"
          style="background:#030305;border-color:rgba(255,255,255,0.07)">

          <!-- header -->
          <div class="flex items-center justify-between px-6 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
              </svg>
              <span class="text-[10px] font-bold uppercase tracking-widest text-white/30">Your Created Keys</span>
            </div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);color:#60a5fa">
              {{ createdKeys.length }} keys
            </span>
          </div>

          <!-- loading -->
          <div v-if="loadingKeys" class="flex items-center justify-center gap-3 py-16">
            <svg class="animate-spin text-white/20" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
            <span class="text-[12px] text-white/25 font-mono">Loading keys...</span>
          </div>

          <!-- empty -->
          <div v-else-if="createdKeys.length === 0"
            class="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
            <div class="w-12 h-12 flex items-center justify-center rounded-2xl border"
              style="background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.07)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
              </svg>
            </div>
            <div>
              <p class="text-[13px] font-semibold text-white/30">No keys created yet</p>
              <p class="text-[11px] text-white/15 mt-0.5">Create your first key on the left.</p>
            </div>
          </div>

          <!-- key list -->
          <div v-else class="divide-y overflow-y-auto max-h-[480px]" style="border-color:rgba(255,255,255,0.05)">
            <div v-for="k in createdKeys" :key="k.id"
              class="flex items-center gap-4 px-6 py-4 group transition-colors hover:bg-white/[0.02] border-b border-[#fafafa]/10">

              <!-- key icon -->
              <div class="w-8 h-8 flex items-center justify-center rounded-lg border shrink-0"
                style="background:rgba(59,130,246,0.07);border-color:rgba(59,130,246,0.15)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
              </div>

              <!-- key code + date -->
              <div class="flex-1 min-w-0">
                <div class="font-mono text-[12px] text-white/70 truncate select-all">{{ k.id }}</div>
                <div class="text-[10px] text-white/25 font-mono mt-0.5">{{ k.createdAt }}</div>
              </div>

              <!-- value -->
              <div class="font-display text-[1rem] font-extrabold tracking-tight text-white shrink-0">
                R$<span class="text-blue-400">{{ k.value.toFixed(2) }}</span>
              </div>

              <!-- copy -->
              <button @click="copyKey(k.id)"
                class="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border text-white/25 hover:text-white hover:bg-white/5 transition opacity-0 group-hover:opacity-100"
                style="border-color:rgba(255,255,255,0.08)"
                title="Copy key">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
          </div>

          <!-- footer -->
          <div v-if="createdKeys.length > 0" class="px-6 py-3 border-t flex items-center gap-2" style="border-color:rgba(255,255,255,0.05)">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span class="text-[10px] text-white/20">Clicking copy will share a redemption link with the key.</span>
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
  doc, getDoc, updateDoc, setDoc, serverTimestamp,
  getDocs, collection, query, where, orderBy
} from 'firebase/firestore'

const createdKeys      = ref([])
const loadingKeys      = ref(true)
const resellerBalance  = ref(0)
const keyValue         = ref(20)
const loading          = ref(false)
const message          = ref('')
const success          = ref(false)

function toast(msg, ok = true) {
  message.value = msg
  success.value = ok
  setTimeout(() => { if (message.value === msg) message.value = '' }, 3000)
}

async function copyKey(keyId) {
  try {
    await navigator.clipboard.writeText(
      `🔑 You can redeem your key at:\nhttps://blackwave-beta.vercel.app/redeem/${keyId}\n\nJust access the link, log in, and redeem your balance!`
    )
    toast('Key + link copied!', true)
  } catch {
    toast('Failed to copy key.', false)
  }
}

async function fetchCreatedKeys() {
  loadingKeys.value = true
  createdKeys.value = []
  const user = auth.currentUser
  if (!user) { loadingKeys.value = false; return }
  const q = query(collection(db, 'keys'), where('createdBy', '==', user.uid), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  createdKeys.value = snap.docs.map(d => ({
    id: d.id,
    value: d.data().value ?? 0,
    createdAt: d.data().createdAt?.toDate
      ? new Date(d.data().createdAt.seconds * 1000).toLocaleString('pt-BR')
      : '—'
  }))
  loadingKeys.value = false
}

function generateKeyCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 12; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
  return `WAVE-R-${code}`
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

watch(success, val => { if (val) fetchCreatedKeys() })

async function createKey() {
  message.value = ''
  success.value = false
  loading.value = true
  const user = auth.currentUser
  if (!user) { toast('Not authenticated.', false); loading.value = false; return }

  const userRef  = doc(db, 'users', user.uid)
  const userDoc  = await getDoc(userRef)
  const balance  = userDoc.data().resellerBalance ?? 0

  if (!keyValue.value || keyValue.value <= 0) { toast('Enter a valid value.', false); loading.value = false; return }
  if (balance < keyValue.value) { toast('Insufficient reseller balance.', false); loading.value = false; return }

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
    try { await navigator.clipboard.writeText(keyId) } catch {}
    toast(`Key created: ${keyId}`, true)
    keyValue.value = 5
  } catch {
    toast('Error creating key.', false)
  }
  loading.value = false
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display { font-family: 'Syne', sans-serif; }
.font-sans    { font-family: 'DM Sans', sans-serif; }
.font-mono    { font-family: 'JetBrains Mono','Fira Code','Courier New',monospace; }

.section-label {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: #3b82f6; margin-bottom: 4px;
}
.section-label::before {
  content: ''; display: block; width: 18px; height: 1px;
  background: #3b82f6; opacity: 0.5;
}

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 0.8s linear infinite; }

.fade-slide-enter-active,.fade-slide-leave-active { transition: all 0.22s cubic-bezier(.4,0,.2,1); }
.fade-slide-enter-from,.fade-slide-leave-to { opacity:0; transform:translateY(8px); }

html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(122,167,255,0.35); }
html, body { overflow-x: hidden !important; }
</style>