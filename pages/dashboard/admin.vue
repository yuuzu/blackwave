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

    <div class="mx-auto w-full max-w-5xl px-5 sm:px-7 lg:px-10 pt-4 pb-20 relative z-10 flex flex-col gap-5">

      <!-- ═══ PAGE HEADER ════════════════════════════════════ -->
      <div>
        <span class="section-label">Admin</span>
        <h1 class="font-display text-[2rem] sm:text-[2.4rem] font-extrabold tracking-[-0.04em] leading-tight text-white mt-1">
          Admin <span class="text-blue-400">Panel</span>
        </h1>
        <p class="text-[13px] text-white/30 mt-1">Manage users, balances, permissions and transaction lookups.</p>
      </div>

      <!-- ═══ SEARCH TRANSACTION ═════════════════════════════ -->
      <div class="section-block">
        <div class="section-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Search Transaction ID
        </div>
        <div class="px-6 py-5 flex flex-col sm:flex-row gap-3">
          <input v-model="searchTransactionId" type="text" placeholder="Enter transaction ID..."
            class="bw-input flex-1"
            @keyup.enter="searchTransaction"/>
          <button @click="searchTransaction"
            class="bw-btn bw-btn--primary sm:w-36 shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Search
          </button>
        </div>
      </div>

      <!-- ═══ MANAGE USER ════════════════════════════════════ -->
      <div class="section-block">
        <div class="section-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Manage User
        </div>

        <div class="px-6 py-5 flex flex-col gap-5">
          <!-- email search -->
          <div class="flex flex-col sm:flex-row gap-3">
            <input v-model="manageEmail" type="email" placeholder="User email address..."
              class="bw-input flex-1"
              @keyup.enter="fetchUser"/>
            <button @click="fetchUser" :disabled="loadingUser"
              class="bw-btn bw-btn--primary sm:w-36 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed">
              <svg v-if="!loadingUser" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <svg v-else class="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
              {{ loadingUser ? 'Searching...' : 'Search' }}
            </button>
          </div>

          <!-- user data -->
          <transition name="fade-slide">
            <div v-if="userData" class="grid grid-cols-1 lg:grid-cols-2 gap-4">

              <!-- User card -->
              <div class="rounded-2xl border overflow-hidden relative group"
                style="background:#020204;border-color:rgba(255,255,255,0.07)">
                <!-- corner brackets -->
                <span class="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-l border-t border-blue-500/30"/>
                <span class="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-r border-t border-blue-500/30"/>
                <span class="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-l border-b border-blue-500/30"/>
                <span class="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-r border-b border-blue-500/30"/>

                <div class="px-5 py-5 flex flex-col gap-4">
                  <!-- avatar + email -->
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center font-display font-extrabold text-[15px] shrink-0"
                      style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25);color:#60a5fa">
                      {{ (userData.email || '?').charAt(0).toUpperCase() }}
                    </div>
                    <div class="min-w-0">
                      <div class="text-[13px] font-bold text-white truncate">{{ userData.email }}</div>
                      <div class="flex items-center gap-1.5 mt-0.5">
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          :style="statusStyle(userData)">
                          {{ userData.admin ? 'Administrator' : userData.reseller ? 'Reseller' : userData.status || 'Common' }}
                        </span>
                        <span v-if="userData.vipAccess" class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.25);color:#c084fc">
                          VIP
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="h-px" style="background:rgba(255,255,255,0.05)"/>

                  <!-- balance -->
                  <div>
                    <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1">Balance</div>
                    <div class="font-display text-[1.6rem] font-extrabold tracking-tight text-white leading-none">
                      R$<span class="text-blue-400">{{ (userData.balance ?? 0).toFixed(2) }}</span>
                    </div>
                  </div>

                  <!-- reseller balance -->
                  <div v-if="userData.reseller">
                    <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1">Reseller Balance</div>
                    <div class="font-display text-[1.3rem] font-extrabold tracking-tight text-white leading-none">
                      R$<span class="text-amber-400">{{ (userData.resellerBalance ?? 0).toFixed(2) }}</span>
                    </div>
                  </div>

                  <!-- last transaction -->
                  <div v-if="lastTransactionId">
                    <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1">Last transaction</div>
                    <div class="font-mono text-[11px] text-blue-400/70 break-all">{{ lastTransactionId }}</div>
                  </div>
                </div>
              </div>

              <!-- Actions card -->
              <div class="rounded-2xl border flex flex-col gap-0 overflow-hidden"
                style="background:#020204;border-color:rgba(255,255,255,0.07)">

                <!-- Balance -->
                <div class="px-5 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
                  <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-2">New Balance</div>
                  <div class="flex gap-2">
                    <input v-model="newBalance" type="number" min="0" placeholder="0.00" class="bw-input flex-1"/>
                    <button @click="updateBalance" :disabled="loadingAction" class="bw-btn bw-btn--primary w-24 shrink-0 disabled:opacity-40">Confirm</button>
                  </div>
                </div>

                <!-- Reseller balance -->
                <div v-if="userData.reseller" class="px-5 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
                  <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-2">Reseller Balance</div>
                  <div class="flex gap-2">
                    <input v-model="newResellerBalance" type="number" min="0" placeholder="0.00" class="bw-input flex-1"/>
                    <button @click="updateResellerBalance" :disabled="loadingAction" class="bw-btn bw-btn--primary w-24 shrink-0 disabled:opacity-40">Confirm</button>
                  </div>
                </div>

                <!-- Permissions -->
                <div class="px-5 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
                  <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-2.5">Permissions</div>
                  <div class="grid grid-cols-2 gap-2">
                    <button v-if="!userData.admin" @click="addAdminToUser" :disabled="loadingAction" class="bw-btn bw-btn--muted disabled:opacity-40">Make Admin</button>
                    <button v-else @click="removeAdminFromUser" :disabled="loadingAction" class="bw-btn bw-btn--danger disabled:opacity-40">Remove Admin</button>

                    <button @click="addResellerToUser" :disabled="loadingAction" class="bw-btn bw-btn--muted disabled:opacity-40">Make Reseller</button>
                    <button @click="addPremiumToUser" :disabled="loadingAction" class="bw-btn bw-btn--muted disabled:opacity-40">Make Premium</button>

                    <button v-if="!userData.vipAccess" @click="addVipToUser" :disabled="loadingAction" class="bw-btn bw-btn--muted disabled:opacity-40">Make VIP</button>
                    <button v-else @click="removeVipFromUser" :disabled="loadingAction" class="bw-btn bw-btn--danger disabled:opacity-40">Remove VIP</button>
                  </div>
                </div>

                <!-- Reset password -->
                <div class="px-5 py-4">
                  <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-2">Password</div>
                  <button @click="resetPassword" :disabled="loadingAction"
                    class="bw-btn bw-btn--muted w-full disabled:opacity-40">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                    Send reset link
                  </button>
                </div>
              </div>
            </div>
          </transition>

          <!-- feedback -->
          <transition name="fade-slide">
            <div v-if="userMessage"
              class="rounded-xl border px-4 py-3 flex items-start gap-3"
              :style="userSuccess
                ? 'background:rgba(34,197,94,0.06);border-color:rgba(34,197,94,0.2)'
                : 'background:rgba(239,68,68,0.06);border-color:rgba(239,68,68,0.2)'">
              <svg class="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none"
                :stroke="userSuccess ? '#4ade80' : '#f87171'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline v-if="userSuccess" points="20 6 9 17 4 12"/>
                <template v-else><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></template>
              </svg>
              <span class="text-[12px] flex-1" :class="userSuccess ? 'text-emerald-300/80' : 'text-red-300/80'">{{ userMessage }}</span>
              <button @click="userMessage = ''" class="shrink-0 text-white/20 hover:text-white/50 transition mt-0.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </transition>
        </div>
      </div>

    </div>

    <!-- ═══ MODAL: TRANSACTION ════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="showBoughtModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showBoughtModal = false"/>
        <transition name="modal-zoom">
          <div class="relative w-full max-w-md rounded-3xl border p-7 flex flex-col gap-5 overflow-hidden"
            style="background:#020208;border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.06) 0%,transparent 55%)"/>
            <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/40"/>
            <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/40"/>
            <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/40"/>
            <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/40"/>
            <button @click="showBoughtModal = false" class="absolute top-4 right-4 text-white/20 hover:text-white transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <!-- header -->
            <div class="relative flex items-center gap-3">
              <div class="w-9 h-9 flex items-center justify-center rounded-xl border shrink-0"
                style="background:rgba(59,130,246,0.1);border-color:rgba(59,130,246,0.25)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <h2 class="font-display text-[1.1rem] font-extrabold tracking-tight text-white">Purchase Details</h2>
                <p class="text-[11px] text-white/30">Transaction information</p>
              </div>
            </div>

            <!-- rows -->
            <div class="relative rounded-xl border overflow-hidden" style="border-color:rgba(255,255,255,0.07)">
              <div v-for="row in transactionRows" :key="row.label"
                class="flex items-start gap-3 px-4 py-3 border-b last:border-b-0"
                style="border-color:rgba(255,255,255,0.05)">
                <span class="text-[10px] font-bold uppercase tracking-widest text-white/25 w-28 shrink-0 pt-0.5">{{ row.label }}</span>
                <span class="text-[12px] break-all" :class="row.mono ? 'font-mono text-blue-400/70' : 'text-white/55'">{{ row.value }}</span>
              </div>
            </div>

            <button @click="showBoughtModal = false"
              class="relative bw-btn bw-btn--muted w-full">Close</button>
          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '~/firebase'
import { doc, getDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'

const router = useRouter()

/* ── transaction ─────────────────────────────────────────── */
const searchTransactionId = ref('')
const showBoughtModal     = ref(false)
const boughtModalData     = ref({ product:'', amount:'', buyer:'', createdAt:'', transactionId:'', productId:'' })

const transactionRows = computed(() => [
  { label: 'Product',        value: boughtModalData.value.product       || '—' },
  { label: 'Product ID',     value: boughtModalData.value.productId     || '—', mono: true },
  { label: 'Amount',         value: `R$ ${boughtModalData.value.amount || '0'}` },
  { label: 'Buyer',          value: boughtModalData.value.buyer         || '—' },
  { label: 'Date',           value: boughtModalData.value.createdAt     || '—' },
  { label: 'Transaction ID', value: boughtModalData.value.transactionId || '—', mono: true },
])

async function searchTransaction() {
  if (!searchTransactionId.value?.trim()) return
  const id = searchTransactionId.value.trim()
  const snap = await getDoc(doc(db, 'transactionId', id))
  if (!snap.exists()) { alert('Transaction not found!'); return }
  const d = snap.data()
  boughtModalData.value = { product: d.product??'', amount: d.amount??'', buyer: d.buyer??'', createdAt: d.createdAt??'', transactionId: id, productId: d.productId??'' }
  showBoughtModal.value = true
}

/* ── manage user ─────────────────────────────────────────── */
const manageEmail        = ref('')
const userData           = ref(null)
const userDocRef         = ref(null)
const userMessage        = ref('')
const userSuccess        = ref(false)
const loadingUser        = ref(false)
const loadingAction      = ref(false)
const newBalance         = ref('')
const newResellerBalance = ref('')
const lastTransactionId  = ref('')

function toast(msg, ok = true) {
  userMessage.value = msg; userSuccess.value = ok
  setTimeout(() => { if (userMessage.value === msg) userMessage.value = '' }, 3000)
}

function statusStyle(u) {
  if (u.admin)    return 'background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.25);color:#c084fc'
  if (u.reseller) return 'background:rgba(251,146,60,0.1);border:1px solid rgba(251,146,60,0.25);color:#fb923c'
  if (u.status === 'Premium') return 'background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);color:#38bdf8'
  return 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.4)'
}

async function fetchUser() {
  userMessage.value = ''; userSuccess.value = false; userData.value = null; userDocRef.value = null; lastTransactionId.value = ''
  const email = manageEmail.value?.trim()
  if (!email) return
  loadingUser.value = true
  try {
    const snap = await getDocs(query(collection(db, 'users'), where('email', '==', email)))
    if (snap.empty) { toast('User not found.', false); loadingUser.value = false; return }
    userDocRef.value = snap.docs[0].ref
    userData.value   = snap.docs[0].data()
    newBalance.value         = userData.value.balance ?? 0
    newResellerBalance.value = userData.value.resellerBalance ?? 0
    lastTransactionId.value  = userData.value.lastTransactionId || ''
    toast('User loaded.', true)
  } catch { toast('Error when searching for user.', false) }
  loadingUser.value = false
}

async function act(fn) {
  if (!userDocRef.value) return
  loadingAction.value = true; userMessage.value = ''; userSuccess.value = false
  try { await fn() } catch { toast('Action failed.', false) }
  loadingAction.value = false
}

async function updateBalance()         { await act(async () => { await updateDoc(userDocRef.value, { balance: Number(newBalance.value) }); userData.value.balance = Number(newBalance.value); toast('Balance updated!') }) }
async function updateResellerBalance() { await act(async () => { await updateDoc(userDocRef.value, { resellerBalance: Number(newResellerBalance.value) }); userData.value.resellerBalance = Number(newResellerBalance.value); toast('Reseller balance updated!') }) }
async function addAdminToUser()        { await act(async () => { await updateDoc(userDocRef.value, { admin: true,  status: 'Administrator' }); userData.value.admin = true;  userData.value.status = 'Administrator'; toast('User is now admin!') }) }
async function removeAdminFromUser()   { await act(async () => { await updateDoc(userDocRef.value, { admin: false, status: 'Common' });         userData.value.admin = false; userData.value.status = 'Common';         toast('Admin removed!') }) }
async function addResellerToUser()     { await act(async () => { await updateDoc(userDocRef.value, { reseller: true, resellerBalance: 0, status: 'Reseller' }); userData.value.reseller = true; userData.value.resellerBalance = 0; userData.value.status = 'Reseller'; newResellerBalance.value = 0; toast('User is now reseller!') }) }
async function addPremiumToUser()      { await act(async () => { await updateDoc(userDocRef.value, { premium: true, status: 'Premium' });  userData.value.premium = true; userData.value.status = 'Premium';  toast('User is now premium!') }) }
async function addVipToUser()          { await act(async () => { await updateDoc(userDocRef.value, { vipAccess: true  }); userData.value.vipAccess = true;  toast('User is now VIP!') }) }
async function removeVipFromUser()     { await act(async () => { await updateDoc(userDocRef.value, { vipAccess: false }); userData.value.vipAccess = false; toast('VIP removed!') }) }
async function resetPassword()         { await act(async () => { await sendPasswordResetEmail(auth, userData.value.email); toast('Password reset email sent!') }) }

onMounted(async () => {
  const user = auth.currentUser
  if (!user) { router.push('/dashboard'); return }
  const snap = await getDoc(doc(db, 'users', user.uid))
  if (!snap.exists() || !snap.data().admin) router.push('/dashboard')
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display { font-family: 'Syne', sans-serif; }
.font-sans    { font-family: 'DM Sans', sans-serif; }
.font-mono    { font-family: 'JetBrains Mono','Fira Code','Courier New',monospace; }

.section-label {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: #3b82f6;
}
.section-label::before {
  content: ''; display: block; width: 18px; height: 1px;
  background: #3b82f6; opacity: 0.5;
}

/* ── Section blocks ──────────────────────────────────────── */
.section-block {
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
  background: #030305;
}
.section-header {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.01);
}

/* ── Inputs ──────────────────────────────────────────────── */
.bw-input {
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.025);
  color: white;
  font-size: 13px;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}
.bw-input::placeholder { color: rgba(255,255,255,0.18); }
.bw-input:focus { border-color: rgba(59,130,246,0.5); }

/* ── Buttons ─────────────────────────────────────────────── */
.bw-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 9px 16px; border-radius: 12px;
  font-size: 12px; font-weight: 700;
  border: 1px solid transparent;
  transition: all 0.15s; cursor: pointer; color: white;
  white-space: nowrap;
}
.bw-btn:disabled { cursor: not-allowed; }
.bw-btn--primary {
  background: rgba(59,130,246,0.12);
  border-color: rgba(59,130,246,0.28);
}
.bw-btn--primary:hover:not(:disabled) { background: rgba(59,130,246,0.2); transform: translateY(-1px); }
.bw-btn--muted {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.5);
}
.bw-btn--muted:hover:not(:disabled) { background: rgba(255,255,255,0.07); color: white; }
.bw-btn--danger {
  background: rgba(239,68,68,0.08);
  border-color: rgba(239,68,68,0.2);
  color: #f87171;
}
.bw-btn--danger:hover:not(:disabled) { background: rgba(239,68,68,0.14); }

/* ── Transitions ─────────────────────────────────────────── */
.fade-slide-enter-active,.fade-slide-leave-active { transition: all 0.25s cubic-bezier(.4,0,.2,1); }
.fade-slide-enter-from,.fade-slide-leave-to { opacity: 0; transform: translateY(10px); }

.modal-fade-enter-active,.modal-fade-leave-active { transition: opacity .2s ease; }
.modal-fade-enter-from,.modal-fade-leave-to { opacity: 0; }
.modal-zoom-enter-active,.modal-zoom-leave-active { transition: all .25s cubic-bezier(.4,2,.6,1); }
.modal-zoom-enter-from,.modal-zoom-leave-to { opacity: 0; transform: scale(0.94) translateY(6px); }

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 0.8s linear infinite; }

html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(122,167,255,0.35); }
html, body { overflow-x: hidden !important; }
</style>