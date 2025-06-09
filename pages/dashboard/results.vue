<template>
  <div class="w-full mx-auto pt-8 px-16">
    <h2 class="text-2xl font-bold mb-6 text-[#FAFAFA]">Your Lives (Cards)</h2>
    <!-- Statistics Box (full width) -->
    <div class="bg-[#111111] rounded-2xl p-6 shadow flex flex-col gap-4 mb-8">
      <div class="font-semibold text-lg mb-2 flex items-center gap-2">
        <Icon name="mdi:chart-bar" class="text-[#576784]" size="22" />
        Lives Statistics
      </div>
      <div class="flex flex-wrap gap-12">
        <div>
          <div class="text-2xl font-bold text-[#fafafa]">{{ lives.length }}</div>
          <div class="text-xs text-[#b8b8b8]">Total lives</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-[#fafafa]">{{ livesWeek }}</div>
          <div class="text-xs text-[#b8b8b8]">Last 7 days</div>
        </div>
      </div>
    </div>
    <!-- Cards List -->
    <div class="bg-[#111111] rounded-2xl p-6 shadow">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div class="font-semibold text-lg flex items-center gap-2">
          <Icon name="mdi:credit-card" class="text-[#576784]" size="22" />
          Available Cards
        </div>
        <div class="flex items-center gap-2 w-full md:w-auto">
          <div class="relative w-full md:w-64">
            <input v-model="searchBin" type="text" placeholder="Search by BIN (first 6 digits)"
              class="w-full -ml-1 bg-[#181818] border border-transparent rounded-lg py-2 px-4 text-[#fafafa] placeholder-[#939193] focus:outline-none focus:border-[#576784] transition" />
          </div>
          <TertiaryB :disabled="!lives.length" @click="lives.length ? confirmDelete = true : null"
            class="bg-[#530f0f] border-[#750c0c] hover:border-[#8c0a0a] text-white ml-2"
            :class="{ 'opacity-50 cursor-not-allowed': !lives.length }">
            Delete all lives
          </TertiaryB>
        </div>
      </div>
      <!-- Confirm dialog with animation and style -->
      <transition name="modal-fade">
        <div v-if="confirmDelete" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <transition name="modal-zoom">
            <div
              class="relative bg-[#0a0a0a] rounded-3xl p-10 w-full max-w-md flex flex-col gap-6 shadow-2xl border border-[#0e0e0e]/30"
              v-if="confirmDelete">
              <button @click="confirmDelete = false"
                class="absolute top-4 right-4 text-[#576784] hover:text-white text-2xl transition">
                <Icon name="mdi:close" />
              </button>
              <div class="flex flex-col items-center gap-2">
                <Icon name="mdi:alert-circle-outline" size="48" class="text-[#530f0f]" />
                <h2 class="text-2xl font-bold mb-2 text-white text-center">Delete all lives?</h2>
                <p class="text-[#b8b8b8] text-sm text-center">
                  This action will permanently remove all your saved cards.<br>
                  Are you sure you want to continue?
                </p>
              </div>
              <div class="flex gap-4 justify-center">
                <TertiaryB @click="deleteAllLives"
                  class="bg-[#530f0f] border-[#750c0c] hover:border-[#8c0a0a] text-white">
                  Yes, delete all
                </TertiaryB>
                <TertiaryB @click="confirmDelete = false">
                  Cancel
                </TertiaryB>
              </div>
            </div>
          </transition>
        </div>
      </transition>
      <div v-if="filteredLives.length">
        <div class="max-h-72 overflow-y-auto pr-1">
          <ul class="divide-y divide-[#23293a]/60">
            <li v-for="(live, i) in filteredVisibleLives" :key="i"
              class="py-2 font-mono text-[#c6c3c6] flex items-center justify-between">
              <div class="flex items-center gap-3 flex-1">
                <Approved />
                <div class="flex gap-2 flex-wrap">
                  <span v-for="(part, idx) in live.split('|')" :key="idx" @click="copyPart(part, i, idx)"
                    class="cursor-pointer px-2 py-1 rounded hover:bg-[#282828] transition" :class="{
                      'bg-[#576784]/20 text-[#576784]': copiedPartIndex.i === i && copiedPartIndex.idx === idx
                    }" title="Click to copy">
                    {{ part }}
                  </span>
                </div>
              </div>
              <button @click="copyLive(live)"
                class="ml-2 px-2 py-1 rounded text-xs text-[#b8b8b8] hover:text-[#576784] transition"
                title="Copy full card">
                <Icon name="mdi:content-copy" size="16" />
              </button>
            </li>
          </ul>
        </div>
        <div class="flex justify-center mt-4">
          <span v-if="filteredLives.length > visibleCount" @click="showMore"
            class="cursor-pointer text-sm text-[#939193] hover:underline transition select-none">
            Show more cards
          </span>
          <span v-if="visibleCount > 5" @click="showLess"
            class="cursor-pointer text-sm text-[#939193] hover:underline transition select-none ml-4">
            Show less
          </span>
        </div>
      </div>
      <div v-else class="text-gray-400">No lives found.</div>
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
  if (!searchBin.value) return lives.value
  // BIN is first 6 digits of the card (first part before |)
  return lives.value.filter(live => {
    const bin = live.split('|')[0]?.slice(0, 6)
    return bin && bin.includes(searchBin.value)
  })
})

const filteredVisibleLives = computed(() => filteredLives.value.slice(0, visibleCount.value))

function showMore() {
  visibleCount.value += 5
}
function showLess() {
  // If more than 10, reduce by 5, else reset to 5
  if (visibleCount.value > 10) {
    visibleCount.value -= 5
  } else {
    visibleCount.value = 5
  }
}

onMounted(async () => {
  auth.onAuthStateChanged(async (u) => {
    if (u) {
      userId.value = u.uid
      const userDoc = await getDoc(doc(db, 'users', u.uid))
      if (userDoc.exists()) {
        // Now supports array or string fallback
        const livesRaw = userDoc.data().lives || []
        if (Array.isArray(livesRaw)) {
          lives.value = livesRaw.filter(l => l.trim())
        } else if (typeof livesRaw === 'string') {
          lives.value = livesRaw.split('\n').filter(l => l.trim())
        } else {
          lives.value = []
        }

        // Statistic: how many lives were added in the last week
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
      }
    }
  })
})

async function deleteAllLives() {
  if (!userId.value) return
  try {
    await updateDoc(doc(db, 'users', userId.value), { lives: [] })
    lives.value = []
    confirmDelete.value = false
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
  transition: opacity 0.25s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}

/* Zoom for modal */
.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: all 0.25s cubic-bezier(.4, 0, .2, 1);
}

.modal-zoom-enter-from,
.modal-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.modal-zoom-enter-to,
.modal-zoom-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>