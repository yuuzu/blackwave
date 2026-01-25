<template>
    <div class="w-full mx-auto pt-20 md:pt-8 px-4 sm:px-6 lg:px-10 font-satoshi">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div
                class="inline-flex items-center gap-2 w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur-xl">
                <span class="h-1.5 w-1.5 rounded-full bg-[#7aa7ff] shadow-[0_0_18px_rgba(122,167,255,0.9)]"></span>
                Dashboard • Keys Panel
            </div>
            <div class="flex mt-8 items-center gap-3 mb-4">
                <span class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon name="ic:baseline-vpn-key" size="30" class="text-[#7aa7ff]" />
                </span>
                <div class="min-w-0">
                    <h2 class="text-lg md:text-2xl font-black text-white">All Created Keys</h2>
                    <p class="text-sm text-white/55">Search and manage keys (not used / used).</p>
                </div>
            </div>

            <!-- Filters -->
            <div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
               shadow-[0_18px_70px_rgba(0,0,0,0.45)] p-4 sm:p-5 mb-5">
                <div class="flex flex-col md:flex-row md:items-center gap-3">
                    <div class="relative w-full md:max-w-sm">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/55">
                            <Icon name="mdi:magnify" size="20" />
                        </span>
                        <input v-model="search" type="text" placeholder="Search by ID, email or value..." class="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/25 border border-white/10 text-white outline-none
                     focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition" />
                    </div>

                    <div class="flex items-center gap-2">
                        <button class="px-4 py-3 rounded-2xl font-bold border transition" :class="!showUsed
                            ? 'bg-white/10 border-white/10 text-white'
                            : 'bg-black/20 border-white/10 text-white/60 hover:text-white hover:bg-white/5'"
                            @click="setShowUsed(false)">
                            Not used
                        </button>

                        <button class="px-4 py-3 rounded-2xl font-bold border transition" :class="showUsed
                            ? 'bg-white/10 border-white/10 text-white'
                            : 'bg-black/20 border-white/10 text-white/60 hover:text-white hover:bg-white/5'"
                            @click="setShowUsed(true)">
                            Used
                        </button>
                    </div>
                </div>
            </div>

            <!-- List -->
            <div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
               shadow-[0_18px_70px_rgba(0,0,0,0.45)] p-4 sm:p-6">
                <div v-if="loading" class="text-white/55">Loading...</div>

                <div v-else-if="!showUsed && !filteredKeys.length" class="text-white/55">
                    No keys found.
                </div>

                <div v-else-if="showUsed && !filteredUsedKeys.length" class="text-white/55">
                    No used keys found.
                </div>

                <div v-else>
                    <div class="max-h-[420px] overflow-y-auto pr-1">
                        <ul class="divide-y divide-white/10">
                            <li v-for="(key, i) in showUsed ? filteredVisibleUsedKeys : filteredVisibleKeys"
                                :key="showUsed ? key.keyId : key.id"
                                class="py-3 flex items-center justify-between gap-3">
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 min-w-0">
                                        <span class="font-black text-white truncate">
                                            {{ showUsed ? key.keyId : key.id }}
                                        </span>
                                        <span
                                            class="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 text-white/80">
                                            R$ {{ Number(key.value ?? 0).toFixed(2) }}
                                        </span>
                                    </div>

                                    <div class="text-xs text-white/50 mt-1 break-all" v-if="showUsed">
                                        Used by: {{ key.usedByEmail || key.usedBy || '—' }}
                                    </div>
                                    <div class="text-xs text-white/50 mt-1 break-all" v-else>
                                        Created by: {{ key.createdByEmail || key.createdBy || '—' }}
                                    </div>
                                </div>

                                <div class="flex items-center gap-2">
                                    <button @click="copyKey(showUsed ? key.keyId : key.id)" class="w-9 h-9 rounded-2xl bg-white/5 border border-white/10
                           hover:bg-white/10 hover:border-white/20 transition flex items-center justify-center"
                                        title="Copy key">
                                        <Icon name="mdi:content-copy" size="18" class="text-white/70" />
                                    </button>

                                    <button @click="showKeyInfo(key)" class="w-9 h-9 rounded-2xl bg-white/5 border border-white/10
                           hover:bg-white/10 hover:border-white/20 transition flex items-center justify-center"
                                        title="Key info">
                                        <Icon name="material-symbols:info-rounded" size="20" class="text-[#7aa7ff]" />
                                    </button>

                                    <button v-if="!showUsed" @click="confirmDeleteKey(key.id)" class="w-9 h-9 rounded-2xl bg-rose-500/10 border border-rose-500/20
                           hover:bg-rose-500/15 hover:border-rose-500/30 transition flex items-center justify-center"
                                        title="Delete key">
                                        <Icon name="mdi:delete-outline" size="20" class="text-rose-300" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="flex justify-center mt-4 gap-4">
                        <span v-if="(showUsed ? filteredUsedKeys.length : filteredKeys.length) > visibleCount"
                            @click="showMore"
                            class="cursor-pointer text-sm text-white/55 hover:text-white hover:underline transition select-none">
                            Show more keys
                        </span>

                        <span v-if="visibleCount > 10" @click="showLess"
                            class="cursor-pointer text-sm text-white/55 hover:text-white hover:underline transition select-none">
                            Show less
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirm delete dialog -->
        <transition name="modal-fade">
            <div v-if="deleteKeyId" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi px-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                <transition name="modal-zoom">
                    <div class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-8 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden">
                        <div
                            class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.20),transparent_55%)]">
                        </div>

                        <button @click="deleteKeyId = null"
                            class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl transition"
                            title="Close">
                            <Icon name="mdi:close" />
                        </button>

                        <div class="relative flex flex-col gap-5">
                            <div class="flex flex-col items-center gap-2">
                                <Icon name="mdi:alert-circle-outline" size="48" class="text-rose-300" />
                                <h2 class="text-2xl font-black text-white text-center">Delete this key?</h2>
                                <p class="text-white/55 text-sm text-center">
                                    This action will permanently remove the key.<br />
                                    Are you sure you want to continue?
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <button @click="deleteKey" class="flex-1 rounded-2xl py-3 font-bold bg-rose-500/15 border border-rose-500/25
                         hover:bg-rose-500/20 hover:border-rose-500/35 transition text-white">
                                    Yes, delete
                                </button>

                                <button @click="deleteKeyId = null" class="flex-1 rounded-2xl py-3 font-bold bg-white/10 border border-white/10
                         hover:bg-white/15 hover:border-white/20 transition text-white">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>

        <!-- Info modal -->
        <transition name="modal-fade">
            <div v-if="infoKey" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi px-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                <transition name="modal-zoom">
                    <div class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden">
                        <div
                            class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.22),transparent_55%)]">
                        </div>

                        <button @click="infoKey = null"
                            class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl transition"
                            title="Close">
                            <Icon name="mdi:close" />
                        </button>

                        <div class="relative flex flex-col gap-4">
                            <div class="flex items-center gap-2">
                                <Icon name="material-symbols:info-rounded" size="22" class="text-[#7aa7ff]" />
                                <h2 class="text-xl font-black text-white">Key Information</h2>
                            </div>

                            <div
                                class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75 break-all space-y-2">
                                <div><b class="text-white">ID:</b> {{ infoKey.id || infoKey.keyId }}</div>
                                <div><b class="text-white">Value:</b> R$ {{ Number(infoKey.value ?? 0).toFixed(2) }}
                                </div>
                                <div><b class="text-white">Created by:</b> {{ infoKey.createdByEmail ||
                                    infoKey.createdBy || 'N/A' }}</div>
                                <div>
                                    <b class="text-white">Creation date:</b>
                                    <span v-if="infoKey.createdAt">{{ formatDate(infoKey.createdAt) }}</span>
                                    <span v-else>N/A</span>
                                </div>
                                <div><b class="text-white">Used by:</b> {{ infoKey.usedByEmail || infoKey.usedBy ||
                                    'Never used' }}</div>
                                <div>
                                    <b class="text-white">Date of use:</b>
                                    <span v-if="infoKey.usedAt">{{ formatDate(infoKey.usedAt) }}</span>
                                    <span v-else>Never used</span>
                                </div>
                            </div>

                            <button @click="infoKey = null" class="w-full rounded-2xl py-3 font-bold bg-white/10 border border-white/10
                       hover:bg-white/15 hover:border-white/20 transition text-white">
                                Close
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { db, auth } from '~/firebase'
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const keys = ref([])
const usedKeys = ref([])
const loading = ref(true)

const deleteKeyId = ref(null)
const infoKey = ref(null)

const showUsed = ref(false)
const search = ref('')
const visibleCount = ref(10)

const router = useRouter()

function setShowUsed(val) {
    showUsed.value = val
    visibleCount.value = 10
}

const filteredKeys = computed(() => {
    const arr = keys.value.slice().reverse()
    if (!search.value) return arr
    const s = search.value.toLowerCase()
    return arr.filter(k =>
        (k.id && k.id.toLowerCase().includes(s)) ||
        (k.value != null && String(k.value).toLowerCase().includes(s)) ||
        (k.createdByEmail && k.createdByEmail.toLowerCase().includes(s)) ||
        (k.createdBy && String(k.createdBy).toLowerCase().includes(s))
    )
})

const filteredUsedKeys = computed(() => {
    const arr = usedKeys.value.slice().reverse()
    if (!search.value) return arr
    const s = search.value.toLowerCase()
    return arr.filter(k =>
        (k.keyId && k.keyId.toLowerCase().includes(s)) ||
        (k.value != null && String(k.value).toLowerCase().includes(s)) ||
        (k.createdByEmail && k.createdByEmail.toLowerCase().includes(s)) ||
        (k.createdBy && String(k.createdBy).toLowerCase().includes(s)) ||
        (k.usedByEmail && k.usedByEmail.toLowerCase().includes(s)) ||
        (k.usedBy && String(k.usedBy).toLowerCase().includes(s))
    )
})

const filteredVisibleKeys = computed(() => filteredKeys.value.slice(0, visibleCount.value))
const filteredVisibleUsedKeys = computed(() => filteredUsedKeys.value.slice(0, visibleCount.value))

function showMore() {
    visibleCount.value += 10
}
function showLess() {
    if (visibleCount.value > 10) visibleCount.value -= 10
}

function showKeyInfo(key) {
    infoKey.value = key
}

function formatDate(ts) {
    if (!ts) return ''
    if (typeof ts === 'object' && ts.seconds) {
        return new Date(ts.seconds * 1000).toLocaleString('pt-BR')
    }
    return new Date(ts).toLocaleString('pt-BR')
}

async function fetchUsedKeys() {
    const snap = await getDocs(collection(db, 'usedKeys'))
    usedKeys.value = snap.docs.map(d => ({ keyId: d.id, ...d.data() }))
}

async function fetchKeys() {
    const snap = await getDocs(collection(db, 'keys'))
    keys.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

function copyKey(keyId) {
    navigator.clipboard.writeText(keyId)
}

function confirmDeleteKey(id) {
    deleteKeyId.value = id
}

async function deleteKey() {
    if (!deleteKeyId.value) return
    await deleteDoc(doc(db, 'keys', deleteKeyId.value))
    keys.value = keys.value.filter(k => k.id !== deleteKeyId.value)
    deleteKeyId.value = null
}

onMounted(async () => {
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            router.push('/dashboard')
            return
        }

        // ✅ checa admin do jeito certo (sem baixar todos users)
        const uSnap = await getDoc(doc(db, 'users', user.uid))
        if (!uSnap.exists() || !uSnap.data()?.admin) {
            router.push('/dashboard')
            return
        }

        await fetchKeys()
        await fetchUsedKeys()
        loading.value = false
    })
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

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
