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
        <span class="section-label">Admin</span>
        <div class="flex items-start justify-between flex-wrap gap-4 mt-1">
          <div>
            <h1 class="font-display text-[2rem] sm:text-[2.4rem] font-extrabold tracking-[-0.04em] leading-tight text-white">
              Keys <span class="text-blue-400">Panel</span>
            </h1>
            <p class="text-[13px] text-white/30 mt-1">Search and manage all created keys.</p>
          </div>
          <!-- counters -->
          <div class="flex items-center gap-3 self-start mt-1">
            <div class="flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-bold"
              style="background:rgba(59,130,246,0.07);border-color:rgba(59,130,246,0.2);color:#60a5fa">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400"/>
              {{ keys.length }} available
            </div>
            <div class="flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-bold"
              style="background:rgba(34,197,94,0.06);border-color:rgba(34,197,94,0.18);color:#4ade80">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
              {{ usedKeys.length }} used
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ FILTERS ═══════════════════════════════════════ -->
      <div class="rounded-2xl border mb-4 px-5 py-4" style="background:#030305;border-color:rgba(255,255,255,0.07)">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          <!-- search -->
          <div class="relative flex-1">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input v-model="search" type="text" placeholder="Search by ID, email or value..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-transparent text-white text-[13px] outline-none transition placeholder:text-white/20 focus:border-blue-500/50"
              style="background:rgba(255,255,255,0.025);border-color:rgba(255,255,255,0.08)"/>
          </div>

          <!-- tabs -->
          <div class="flex items-center gap-1.5 rounded-xl p-1" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06)">
            <button @click="setShowUsed(false)"
              class="px-4 py-2 rounded-lg text-[12px] font-bold transition-all"
              :class="!showUsed ? 'bg-blue-600 text-white shadow-sm' : 'text-white/35 hover:text-white/60'">
              Not used
            </button>
            <button @click="setShowUsed(true)"
              class="px-4 py-2 rounded-lg text-[12px] font-bold transition-all"
              :class="showUsed ? 'bg-blue-600 text-white shadow-sm' : 'text-white/35 hover:text-white/60'">
              Used
            </button>
          </div>
        </div>
      </div>

      <!-- ═══ KEYS LIST ══════════════════════════════════════ -->
      <div class="rounded-2xl border overflow-hidden" style="background:#030305;border-color:rgba(255,255,255,0.07)">

        <!-- list header -->
        <div class="flex items-center justify-between px-6 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
          <div class="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
            <span class="text-[10px] font-bold uppercase tracking-widest text-white/30">
              {{ showUsed ? 'Used Keys' : 'Available Keys' }}
            </span>
          </div>
          <span class="text-[10px] font-mono text-white/20">
            {{ (showUsed ? filteredUsedKeys : filteredKeys).length }} results
          </span>
        </div>

        <!-- loading -->
        <div v-if="loading" class="flex items-center justify-center gap-3 py-16">
          <svg class="animate-spin text-white/20" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          <span class="text-[12px] text-white/25 font-mono">Loading keys...</span>
        </div>

        <!-- empty -->
        <div v-else-if="(showUsed ? filteredUsedKeys : filteredKeys).length === 0"
          class="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
          <div class="w-12 h-12 flex items-center justify-center rounded-2xl border"
            style="background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.07)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <p class="text-[13px] font-semibold text-white/30">No keys found.</p>
        </div>

        <!-- rows -->
        <div v-else>
          <div style="overflow-y:auto;max-height:480px">
            <div v-for="key in showUsed ? filteredVisibleUsedKeys : filteredVisibleKeys"
              :key="showUsed ? key.keyId : key.id"
              class="flex items-center gap-4 px-6 py-4 group transition-colors hover:bg-white/[0.02]"
              style="border-bottom:1px solid rgba(255,255,255,0.04)">

              <!-- key icon -->
              <div class="w-8 h-8 flex items-center justify-center rounded-lg border shrink-0"
                :style="showUsed
                  ? 'background:rgba(34,197,94,0.07);border-color:rgba(34,197,94,0.18)'
                  : 'background:rgba(59,130,246,0.07);border-color:rgba(59,130,246,0.18)'">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  :stroke="showUsed ? '#4ade80' : '#60a5fa'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
              </div>

              <!-- key info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2.5 flex-wrap">
                  <span class="font-mono text-[12px] text-white/80 truncate max-w-[220px] select-all">
                    {{ showUsed ? key.keyId : key.id }}
                  </span>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold"
                    style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);color:#60a5fa">
                    R$ {{ Number(key.value ?? 0).toFixed(2) }}
                  </span>
                  <span v-if="showUsed" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold"
                    style="background:rgba(34,197,94,0.07);border:1px solid rgba(34,197,94,0.18);color:#4ade80">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Used
                  </span>
                </div>
                <div class="text-[10px] text-white/25 font-mono mt-1 truncate">
                  <span v-if="showUsed">Used by: {{ key.usedByEmail || key.usedBy || '—' }}</span>
                  <span v-else>Created by: {{ key.createdByEmail || key.createdBy || '—' }}</span>
                </div>
              </div>

              <!-- actions -->
              <div class="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button @click="copyKey(showUsed ? key.keyId : key.id)"
                  class="w-7 h-7 flex items-center justify-center rounded-lg border text-white/30 hover:text-white hover:bg-white/5 transition"
                  style="border-color:rgba(255,255,255,0.08)" title="Copy key">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
                <button @click="showKeyInfo(key)"
                  class="w-7 h-7 flex items-center justify-center rounded-lg border text-blue-400/50 hover:text-blue-400 hover:bg-blue-500/5 transition"
                  style="border-color:rgba(59,130,246,0.15)" title="Key info">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </button>
                <button v-if="!showUsed" @click="confirmDeleteKey(key.id)"
                  class="w-7 h-7 flex items-center justify-center rounded-lg border text-red-400/40 hover:text-red-400 hover:bg-red-500/5 transition"
                  style="border-color:rgba(239,68,68,0.15)" title="Delete key">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- show more / less -->
          <div v-if="(showUsed ? filteredUsedKeys : filteredKeys).length > 10"
            class="px-6 py-3 border-t flex items-center justify-center gap-6" style="border-color:rgba(255,255,255,0.05)">
            <button v-if="(showUsed ? filteredUsedKeys.length : filteredKeys.length) > visibleCount"
              @click="showMore"
              class="text-[11px] font-semibold text-white/30 hover:text-white transition flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Show more
            </button>
            <button v-if="visibleCount > 10" @click="showLess"
              class="text-[11px] font-semibold text-white/30 hover:text-white transition flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Show less
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ MODAL: DELETE CONFIRM ═════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="deleteKeyId" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="deleteKeyId = null"/>
        <transition name="modal-zoom">
          <div class="relative w-full max-w-sm rounded-3xl border p-8 flex flex-col gap-6 overflow-hidden text-center"
            style="background:#020208;border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,0.06) 0%,transparent 55%)"/>
            <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-red-500/30"/>
            <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-red-500/30"/>
            <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-red-500/30"/>
            <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-red-500/30"/>
            <button @click="deleteKeyId = null" class="absolute top-4 right-4 text-white/20 hover:text-white transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div class="relative flex flex-col items-center gap-3">
              <div class="w-12 h-12 flex items-center justify-center rounded-2xl border"
                style="background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.2)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                </svg>
              </div>
              <h2 class="relative font-display text-[1.2rem] font-extrabold tracking-tight text-white">Delete this key?</h2>
              <p class="relative text-[12px] text-white/35 leading-relaxed">This action is permanent and cannot be undone.</p>
            </div>
            <div class="relative flex gap-2.5">
              <button @click="deleteKey"
                class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-px"
                style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
                Yes, delete
              </button>
              <button @click="deleteKeyId = null"
                class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-white/50 hover:text-white transition"
                style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07)">
                Cancel
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- ═══ MODAL: KEY INFO ════════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="infoKey" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="infoKey = null"/>
        <transition name="modal-zoom">
          <div class="relative w-full max-w-md rounded-3xl border p-7 flex flex-col gap-5 overflow-hidden"
            style="background:#020208;border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.06) 0%,transparent 55%)"/>
            <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/40"/>
            <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/40"/>
            <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/40"/>
            <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/40"/>
            <button @click="infoKey = null" class="absolute top-4 right-4 text-white/20 hover:text-white transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <!-- header -->
            <div class="relative flex items-center gap-3">
              <div class="w-9 h-9 flex items-center justify-center rounded-xl border shrink-0"
                style="background:rgba(59,130,246,0.1);border-color:rgba(59,130,246,0.25)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h2 class="font-display text-[1.1rem] font-extrabold tracking-tight text-white">Key Information</h2>
            </div>

            <!-- info rows -->
            <div class="relative rounded-xl border overflow-hidden" style="border-color:rgba(255,255,255,0.07)">
              <div v-for="row in infoRows" :key="row.label"
                class="flex items-start gap-3 px-4 py-3 border-b last:border-b-0"
                style="border-color:rgba(255,255,255,0.05)">
                <span class="text-[10px] font-bold uppercase tracking-widest text-white/25 w-28 shrink-0 pt-0.5">{{ row.label }}</span>
                <span class="text-[12px] font-mono text-white/60 break-all">{{ row.value }}</span>
              </div>
            </div>

            <button @click="infoKey = null" class="relative flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-white/50 hover:text-white transition"
              style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07)">
              Close
            </button>
          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { db, auth } from '~/firebase'
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const keys      = ref([])
const usedKeys  = ref([])
const loading   = ref(true)

const deleteKeyId = ref(null)
const infoKey     = ref(null)
const showUsed    = ref(false)
const search      = ref('')
const visibleCount = ref(10)

const router = useRouter()

function setShowUsed(val) { showUsed.value = val; visibleCount.value = 10 }
function showMore() { visibleCount.value += 10 }
function showLess() { if (visibleCount.value > 10) visibleCount.value -= 10 }

const filteredKeys = computed(() => {
  const arr = keys.value.slice().reverse()
  if (!search.value) return arr
  const s = search.value.toLowerCase()
  return arr.filter(k =>
    [k.id, String(k.value ?? ''), k.createdByEmail, k.createdBy].some(v => v?.toLowerCase().includes(s))
  )
})

const filteredUsedKeys = computed(() => {
  const arr = usedKeys.value.slice().reverse()
  if (!search.value) return arr
  const s = search.value.toLowerCase()
  return arr.filter(k =>
    [k.keyId, String(k.value ?? ''), k.createdByEmail, k.usedByEmail, k.usedBy].some(v => v?.toLowerCase().includes(s))
  )
})

const filteredVisibleKeys     = computed(() => filteredKeys.value.slice(0, visibleCount.value))
const filteredVisibleUsedKeys = computed(() => filteredUsedKeys.value.slice(0, visibleCount.value))

function formatDate(ts) {
  if (!ts) return 'N/A'
  if (typeof ts === 'object' && ts.seconds) return new Date(ts.seconds * 1000).toLocaleString('pt-BR')
  return new Date(ts).toLocaleString('pt-BR')
}

const infoRows = computed(() => {
  if (!infoKey.value) return []
  const k = infoKey.value
  return [
    { label: 'ID',          value: k.id || k.keyId || '—' },
    { label: 'Value',       value: `R$ ${Number(k.value ?? 0).toFixed(2)}` },
    { label: 'Created by',  value: k.createdByEmail || k.createdBy || 'N/A' },
    { label: 'Created at',  value: formatDate(k.createdAt) },
    { label: 'Used by',     value: k.usedByEmail || k.usedBy || 'Never used' },
    { label: 'Used at',     value: k.usedAt ? formatDate(k.usedAt) : 'Never used' },
  ]
})

function copyKey(keyId) { navigator.clipboard.writeText(keyId) }
function showKeyInfo(key) { infoKey.value = key }
function confirmDeleteKey(id) { deleteKeyId.value = id }

async function deleteKey() {
  if (!deleteKeyId.value) return
  await deleteDoc(doc(db, 'keys', deleteKeyId.value))
  keys.value = keys.value.filter(k => k.id !== deleteKeyId.value)
  deleteKeyId.value = null
}

async function fetchKeys() {
  const snap = await getDocs(collection(db, 'keys'))
  keys.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

async function fetchUsedKeys() {
  const snap = await getDocs(collection(db, 'usedKeys'))
  usedKeys.value = snap.docs.map(d => ({ keyId: d.id, ...d.data() }))
}

onMounted(() => {
  auth.onAuthStateChanged(async u => {
    if (!u) { router.push('/dashboard'); return }
    const snap = await getDoc(doc(db, 'users', u.uid))
    if (!snap.exists() || !snap.data()?.admin) { router.push('/dashboard'); return }
    await Promise.all([fetchKeys(), fetchUsedKeys()])
    loading.value = false
  })
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
  color: #3b82f6; margin-bottom: 4px;
}
.section-label::before {
  content: ''; display: block; width: 18px; height: 1px;
  background: #3b82f6; opacity: 0.5;
}

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 0.8s linear infinite; }

.modal-fade-enter-active,.modal-fade-leave-active { transition: opacity .2s ease; }
.modal-fade-enter-from,.modal-fade-leave-to { opacity: 0; }
.modal-zoom-enter-active,.modal-zoom-leave-active { transition: all .25s cubic-bezier(.4,2,.6,1); }
.modal-zoom-enter-from,.modal-zoom-leave-to { opacity: 0; transform: scale(0.94) translateY(6px); }

html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(122,167,255,0.35); }
html, body { overflow-x: hidden !important; }
</style>