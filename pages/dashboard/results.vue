<template>
  <div class="relative z-10 min-h-screen w-full md:ml-[260px] pt-20 md:pt-8 px-4 sm:px-6 lg:px-10">
    <!-- Header -->
      <div class="flex flex-col gap-2 mb-8">
        <div class="inline-flex items-center gap-2 w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur-xl">
          <span class="h-1.5 w-1.5 rounded-full bg-[#7aa7ff] shadow-[0_0_18px_rgba(122,167,255,0.9)]"></span>
          Dashboard • Account ➔ Historical
        </div>
      </div>

    <!-- Stats -->
    <div
      class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.55)]
             p-5 md:p-7 mb-6 md:mb-8 overflow-hidden relative"
    >
      <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.16),transparent_55%)]"></div>

      <div class="relative flex items-center gap-2 text-white font-semibold mb-4">
        <Icon name="mdi:chart-bar" class="text-[#7aa7ff]" size="20" />
        <span class="text-base md:text-lg">Lives Statistics</span>
      </div>

      <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <div class="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div class="text-2xl md:text-3xl font-black text-white">
            {{ lives.length }}
          </div>
          <div class="text-xs text-white/55 mt-1">Total lives</div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div class="text-2xl md:text-3xl font-black text-white">
            {{ filteredLives.length }}
          </div>
          <div class="text-xs text-white/55 mt-1">Filtered results</div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div class="text-2xl md:text-3xl font-black text-white">
            {{ visibleCount }}
          </div>
          <div class="text-xs text-white/55 mt-1">Visible on screen</div>
        </div>

        <!-- se quiser voltar a estatística semanal, descomenta -->
        <!--
        <div class="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div class="text-2xl md:text-3xl font-black text-white">
            {{ livesWeek }}
          </div>
          <div class="text-xs text-white/55 mt-1">Last 7 days</div>
        </div>
        -->
      </div>
    </div>

    <!-- List / Actions -->
    <div
      class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.55)]
             p-5 md:p-7 overflow-hidden"
    >
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
        <div class="flex items-center gap-2 font-semibold text-white">
          <Icon name="mdi:credit-card" class="text-[#7aa7ff]" size="20" />
          <span class="text-base md:text-lg">Available Cards</span>
        </div>

        <div class="flex flex-col md:flex-row md:items-center gap-2 w-full lg:w-auto">
          <div class="relative w-full md:w-80">
            <input
              v-model="searchBin"
              type="text"
              placeholder="Search by BIN (first 6 digits)"
              class="w-full rounded-2xl px-4 py-2.5 bg-black/25 border border-white/10 text-white placeholder-white/40
                     outline-none focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
            />
            <div v-if="searchBin" class="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                @click="searchBin = ''"
                class="w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                title="Clear"
              >
                <Icon name="mdi:close" size="18" class="text-white/70" />
              </button>
            </div>
          </div>

          <TertiaryB
            :disabled="!lives.length"
            @click="downloadLives"
            class="flex justify-center items-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/30 text-white
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="mdi:download" class="mr-2" />
            Download lives
          </TertiaryB>

          <TertiaryB
            :disabled="!lives.length"
            @click="lives.length ? (confirmDelete = true) : null"
            class="flex justify-center items-center rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 hover:border-rose-500/30 text-white
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="mdi:trash-can-outline" class="mr-2" />
            Delete all lives
          </TertiaryB>
        </div>
      </div>

      <!-- Confirm dialog -->
      <transition name="modal-fade">
        <div v-if="confirmDelete" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi px-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          <transition name="modal-zoom">
            <div
              v-if="confirmDelete"
              class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                     p-8 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden"
            >
              <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(255,100,100,0.20),transparent_55%)]"></div>

              <button
                @click="confirmDelete = false"
                class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center"
              >
                <Icon name="mdi:close" size="22" class="text-white/70" />
              </button>

              <div class="relative flex flex-col gap-6">
                <div class="flex flex-col items-center gap-2 text-center">
                  <Icon name="mdi:alert-circle-outline" size="48" class="text-rose-400" />
                  <h2 class="text-2xl font-black text-white">Delete all lives?</h2>
                  <p class="text-white/60 text-sm">
                    This action will permanently remove all your saved cards.
                    <br />
                    Are you sure you want to continue?
                  </p>
                </div>

                <div class="flex gap-3 justify-center">
                  <TertiaryB
                    @click="deleteAllLives"
                    class="rounded-2xl bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/20 hover:border-rose-500/40 text-white"
                  >
                    Yes, delete all
                  </TertiaryB>
                  <TertiaryB
                    @click="confirmDelete = false"
                    class="rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 text-white"
                  >
                    Cancel
                  </TertiaryB>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>

      <!-- List -->
      <div v-if="filteredLives.length" class="min-w-0">
        <!-- IMPORTANT: overflow-x-auto evita estourar largura -->
        <div class="max-h-80 overflow-y-auto overflow-x-auto pr-1">
          <ul class="divide-y divide-white/10 min-w-[520px] md:min-w-0">
            <li
              v-for="(live, i) in filteredVisibleLives"
              :key="i"
              class="py-3 font-mono text-white/80 flex items-center justify-between gap-3"
            >
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <Approved />
                <div class="flex gap-2 flex-wrap min-w-0">
                  <span
                    v-for="(part, idx) in live.split('|')"
                    :key="idx"
                    @click="copyPart(part, i, idx)"
                    class="cursor-pointer px-2 py-1 rounded-xl bg-black/20 border border-white/10 hover:bg-white/5 hover:border-white/15 transition select-none"
                    :class="{
                      'bg-[#7aa7ff]/15 border-[#7aa7ff]/30 text-white':
                        copiedPartIndex.i === i && copiedPartIndex.idx === idx
                    }"
                    title="Click to copy"
                  >
                    {{ part }}
                  </span>
                </div>
              </div>

              <button
                @click="copyLive(live)"
                class="shrink-0 px-2 py-2 rounded-xl border border-white/10 bg-black/20 hover:bg-white/5 hover:border-white/15 transition"
                title="Copy full card"
              >
                <Icon name="mdi:content-copy" size="18" class="text-white/70" />
              </button>
            </li>
          </ul>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-4 gap-4">
          <button
            v-if="filteredLives.length > visibleCount"
            @click="showMore"
            class="text-sm text-white/60 hover:text-white hover:underline transition select-none"
          >
            Show more cards
          </button>
          <button
            v-if="visibleCount > 5"
            @click="showLess"
            class="text-sm text-white/60 hover:text-white hover:underline transition select-none"
          >
            Show less
          </button>
        </div>
      </div>

      <div v-else class="text-white/55">
        No lives found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Approved from '~/components/Approved.vue'

const lives = ref([])
const livesWeek = ref(0)
const copiedIndex = ref(null)
const copiedPartIndex = ref({ i: null, idx: null })
const visibleCount = ref(5)
const searchBin = ref('')
const confirmDelete = ref(false)
const userId = ref(null)

const filteredLives = computed(() => {
  const arr = lives.value.slice().reverse()
  if (!searchBin.value) return arr
  return arr.filter(live => {
    const bin = live.split('|')[0]?.slice(0, 6)
    return bin && bin.includes(searchBin.value)
  })
})

const filteredVisibleLives = computed(() => filteredLives.value.slice(0, visibleCount.value))

function downloadLives() {
  if (!lives.value.length) return
  const blob = new Blob([lives.value.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'lives.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function showMore() {
  visibleCount.value += 5
}
function showLess() {
  if (visibleCount.value > 10) visibleCount.value -= 5
  else visibleCount.value = 5
}

onMounted(async () => {
  auth.onAuthStateChanged(async u => {
    if (!u) return
    userId.value = u.uid

    const userDoc = await getDoc(doc(db, 'users', u.uid))
    if (!userDoc.exists()) return

    const livesRaw = userDoc.data().lives || []
    if (Array.isArray(livesRaw)) lives.value = livesRaw.filter(l => l.trim())
    else if (typeof livesRaw === 'string') lives.value = livesRaw.split('\n').filter(l => l.trim())
    else lives.value = []

    // semana (opcional)
    const now = new Date()
    livesWeek.value = lives.value.filter(live => {
      const parts = live.split('|')
      const last = parts[parts.length - 1]
      const date = Date.parse(last)
      if (!isNaN(date)) {
        const diff = (now - new Date(date)) / (1000 * 60 * 60 * 24)
        return diff <= 7
      }
      return false
    }).length
  })
})

async function deleteAllLives() {
  if (!userId.value) return
  try {
    await updateDoc(doc(db, 'users', userId.value), { lives: [] })
    lives.value = []
    confirmDelete.value = false
    visibleCount.value = 5
    searchBin.value = ''
  } catch (e) {
    alert('Error deleting lives.')
    confirmDelete.value = false
  }
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
</script>

<style>
/* Fade for backdrop */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Zoom for modal */
.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: all 0.26s cubic-bezier(.4, 2, .6, 1);
}
.modal-zoom-enter-from,
.modal-zoom-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
