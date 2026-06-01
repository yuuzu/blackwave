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
        <span class="section-label">Account</span>
        <h1 class="font-display text-[2rem] sm:text-[2.4rem] font-extrabold tracking-[-0.04em] leading-tight text-white mt-1">
          <span class="text-blue-400">Lives</span>
        </h1>
        <p class="text-[13px] text-white/30 mt-1">All your approved cards saved in one place.</p>
      </div>

      <!-- ═══ STATS ROW ══════════════════════════════════════ -->
      <div class="grid grid-cols-3 gap-px rounded-2xl overflow-hidden"
        style="background:rgba(255,255,255,0.07)">
        <div class="stat-card group">
          <div class="stat-card-icon" style="background:rgba(59,130,246,0.1);border-color:rgba(59,130,246,0.2)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          </div>
          <div class="stat-val mt-3 mb-1 text-white">{{ lives.length }}</div>
          <div class="stat-lbl">Total Lives</div>
          <div class="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
            style="background:linear-gradient(to right,transparent,rgba(59,130,246,0.5),transparent)"/>
        </div>
        <div class="stat-card group" style="border-left:1px solid rgba(255,255,255,0.07)">
          <div class="stat-card-icon" style="background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.2)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </div>
          <div class="stat-val mt-3 mb-1" style="color:#4ade80">{{ filteredLives.length }}</div>
          <div class="stat-lbl">Filtered</div>
          <div class="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
            style="background:linear-gradient(to right,transparent,rgba(34,197,94,0.4),transparent)"/>
        </div>
        <div class="stat-card group" style="border-left:1px solid rgba(255,255,255,0.07)">
          <div class="stat-card-icon" style="background:rgba(251,191,36,0.08);border-color:rgba(251,191,36,0.2)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div class="stat-val mt-3 mb-1" style="color:#fbbf24">{{ visibleCount }}</div>
          <div class="stat-lbl">Visible</div>
          <div class="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
            style="background:linear-gradient(to right,transparent,rgba(251,191,36,0.4),transparent)"/>
        </div>
      </div>

      <!-- ═══ LIVES LIST ═════════════════════════════════════ -->
      <div class="section-block">

        <!-- toolbar -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
          <!-- search -->
          <div class="relative flex-1">
            <input v-model="searchBin" type="text" placeholder="Search by BIN (first 6 digits)..."
              class="bw-input pl-10 w-full"/>
            <button v-if="searchBin" @click="searchBin = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- actions -->
          <div class="flex items-center gap-2 shrink-0">
            <button @click="downloadLives" :disabled="!lives.length"
              class="bw-btn bw-btn--success disabled:opacity-40 disabled:cursor-not-allowed">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </button>
            <button @click="lives.length ? (confirmDelete = true) : null" :disabled="!lives.length"
              class="bw-btn bw-btn--danger disabled:opacity-40 disabled:cursor-not-allowed">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
              Delete all
            </button>
          </div>
        </div>

        <!-- section header -->
        <div class="section-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
          Available Cards
        </div>

        <!-- empty -->
        <div v-if="!filteredLives.length"
          class="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
          <div class="w-12 h-12 flex items-center justify-center rounded-2xl border"
            style="background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.07)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          </div>
          <p class="text-[13px] font-semibold text-white/30">No lives found.</p>
          <p class="text-[11px] text-white/15">Approved cards will appear here after running the checker.</p>
        </div>

        <!-- list -->
        <div v-else style="overflow-y:auto;max-height:420px">
          <div v-for="(live, i) in filteredVisibleLives" :key="i"
            class="flex items-center gap-3 px-5 py-3.5 group transition-colors hover:bg-white/[0.02]"
            style="border-bottom:1px solid rgba(255,255,255,0.04)">

            <!-- approved dot -->
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"/>

            <!-- card parts -->
            <div class="flex items-center gap-1.5 flex-1 min-w-0 flex-wrap">
              <span v-for="(part, idx) in live.split('|')" :key="idx"
                @click="copyPart(part, i, idx)"
                class="font-mono text-[12px] px-2.5 py-1 rounded-lg cursor-pointer transition-all select-none"
                :class="copiedPartIndex.i === i && copiedPartIndex.idx === idx
                  ? 'bg-blue-500/15 border border-blue-500/30 text-blue-300'
                  : 'bg-white/[0.03] border border-white/[0.07] text-white/60 hover:bg-white/[0.06] hover:text-white/80'"
                title="Click to copy">
                {{ part }}
              </span>
            </div>

            <!-- copy full -->
            <button @click="copyLive(live)"
              class="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border text-white/20 hover:text-white hover:bg-white/5 transition opacity-0 group-hover:opacity-100"
              style="border-color:rgba(255,255,255,0.08)" title="Copy full card">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
          </div>
        </div>

        <!-- pagination -->
        <div v-if="filteredLives.length > 5"
          class="px-5 py-3 border-t flex items-center justify-center gap-6" style="border-color:rgba(255,255,255,0.05)">
          <button v-if="filteredLives.length > visibleCount" @click="showMore"
            class="text-[11px] font-semibold text-white/30 hover:text-white transition flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Show more
          </button>
          <button v-if="visibleCount > 5" @click="showLess"
            class="text-[11px] font-semibold text-white/30 hover:text-white transition flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Show less
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ MODAL: CONFIRM DELETE ══════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="confirmDelete" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="confirmDelete = false"/>
        <transition name="modal-zoom">
          <div class="relative w-full max-w-sm rounded-3xl border p-8 flex flex-col gap-6 overflow-hidden text-center"
            style="background:#020208;border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,0.06) 0%,transparent 55%)"/>
            <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-red-500/30"/>
            <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-red-500/30"/>
            <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-red-500/30"/>
            <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-red-500/30"/>
            <button @click="confirmDelete = false" class="absolute top-4 right-4 text-white/20 hover:text-white transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div class="relative flex flex-col items-center gap-3">
              <div class="w-12 h-12 flex items-center justify-center rounded-2xl border"
                style="background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.2)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                </svg>
              </div>
              <h2 class="relative font-display text-[1.2rem] font-extrabold tracking-tight text-white">Delete all lives?</h2>
              <p class="relative text-[12px] text-white/35 leading-relaxed">This will permanently remove all your saved cards. This action cannot be undone.</p>
            </div>
            <div class="relative flex gap-2.5">
              <button @click="deleteAllLives"
                class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-px"
                style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
                Yes, delete all
              </button>
              <button @click="confirmDelete = false"
                class="flex-1 py-3 rounded-xl text-[13px] font-bold text-white/40 hover:text-white transition"
                style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07)">
                Cancel
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const lives           = ref([])
const visibleCount    = ref(5)
const searchBin       = ref('')
const confirmDelete   = ref(false)
const userId          = ref(null)
const copiedIndex     = ref(null)
const copiedPartIndex = ref({ i: null, idx: null })

const filteredLives = computed(() => {
  const arr = lives.value.slice().reverse()
  if (!searchBin.value) return arr
  return arr.filter(live => {
    const bin = live.split('|')[0]?.slice(0, 6)
    return bin?.includes(searchBin.value)
  })
})
const filteredVisibleLives = computed(() => filteredLives.value.slice(0, visibleCount.value))

function showMore() { visibleCount.value += 5 }
function showLess() { visibleCount.value = Math.max(5, visibleCount.value - 5) }

function downloadLives() {
  if (!lives.value.length) return
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([lives.value.join('\n')], { type: 'text/plain' })),
    download: 'lives.txt'
  })
  a.click()
}

function copyLive(live) {
  navigator.clipboard.writeText(live)
  copiedIndex.value = live
  copiedPartIndex.value = { i: null, idx: null }
  setTimeout(() => (copiedIndex.value = null), 1200)
}
function copyPart(part, i, idx) {
  navigator.clipboard.writeText(part)
  copiedPartIndex.value = { i, idx }
  copiedIndex.value = null
  setTimeout(() => (copiedPartIndex.value = { i: null, idx: null }), 1200)
}

async function deleteAllLives() {
  if (!userId.value) return
  try {
    await updateDoc(doc(db, 'users', userId.value), { lives: [] })
    lives.value = []
    confirmDelete.value = false
    visibleCount.value = 5
    searchBin.value = ''
  } catch { alert('Error deleting lives.'); confirmDelete.value = false }
}

onMounted(() => {
  auth.onAuthStateChanged(async u => {
    if (!u) return
    userId.value = u.uid
    const snap = await getDoc(doc(db, 'users', u.uid))
    if (!snap.exists()) return
    const raw = snap.data().lives || []
    lives.value = Array.isArray(raw)
      ? raw.filter(l => l?.trim())
      : String(raw).split('\n').filter(l => l?.trim())
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
  color: #3b82f6;
}
.section-label::before {
  content: ''; display: block; width: 18px; height: 1px;
  background: #3b82f6; opacity: 0.5;
}

/* ── Stats ───────────────────────────────────────────────── */
.stat-card {
  position: relative; background: #030305;
  padding: 22px 20px; display: flex; flex-direction: column;
  transition: background 0.2s; overflow: hidden; min-width: 0;
}
.stat-card:hover { background: #080810; }
.stat-card-icon {
  width: 34px; height: 34px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border-radius: 10px; border-width: 1px; border-style: solid;
}
.stat-val {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  font-weight: 800; letter-spacing: -0.04em; line-height: 1;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.stat-lbl {
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.25);
}

/* ── Section block ───────────────────────────────────────── */
.section-block {
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; overflow: hidden; background: #030305;
}
.section-header {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.01);
}

/* ── Input ───────────────────────────────────────────────── */
.bw-input {
  padding: 9px 14px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.025);
  color: white; font-size: 13px; outline: none; transition: border-color 0.15s;
}
.bw-input::placeholder { color: rgba(255,255,255,0.18); }
.bw-input:focus { border-color: rgba(59,130,246,0.5); }

/* ── Buttons ─────────────────────────────────────────────── */
.bw-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 8px 14px; border-radius: 11px;
  font-size: 12px; font-weight: 700; border: 1px solid transparent;
  transition: all 0.15s; cursor: pointer; color: white; white-space: nowrap;
}
.bw-btn:disabled { cursor: not-allowed; }
.bw-btn--success {
  background: rgba(34,197,94,0.07); border-color: rgba(34,197,94,0.2); color: #4ade80;
}
.bw-btn--success:hover:not(:disabled) { background: rgba(34,197,94,0.13); }
.bw-btn--danger {
  background: rgba(239,68,68,0.07); border-color: rgba(239,68,68,0.18); color: #f87171;
}
.bw-btn--danger:hover:not(:disabled) { background: rgba(239,68,68,0.13); }

/* ── Modal ───────────────────────────────────────────────── */
.modal-fade-enter-active,.modal-fade-leave-active { transition: opacity .2s ease; }
.modal-fade-enter-from,.modal-fade-leave-to { opacity: 0; }
.modal-zoom-enter-active,.modal-zoom-leave-active { transition: all .25s cubic-bezier(.4,2,.6,1); }
.modal-zoom-enter-from,.modal-zoom-leave-to { opacity: 0; transform: scale(0.94) translateY(6px); }

/* ── Scrollbar ───────────────────────────────────────────── */
html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(122,167,255,0.35); }
html, body { overflow-x: hidden !important; }
</style>