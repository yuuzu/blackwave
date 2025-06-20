<template>
    <div class="w-full mx-auto pt-20 md:pt-8 px-2 md:px-16 font-satoshi">
        <h2 class="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-[#FAFAFA]">All Created Keys</h2>
        <!-- Barra de pesquisa -->
        <div class="mb-4 flex items-center gap-2">
            <input
                v-model="search"
                type="text"
                placeholder="Pesquisar por ID, email ou valor..."
                class="px-4 py-2 rounded-lg bg-[#181818] text-[#fafafa] w-full max-w-xs outline-none"
            />
            <button
                :class="['px-4 py-2 rounded-lg font-bold', !showUsed ? 'bg-[#23293a] text-[#fafafa]' : 'bg-[#181818] text-[#b8b8b8]']"
                @click="showUsed = false">
                Not used
            </button>
            <button
                :class="['px-4 py-2 rounded-lg font-bold', showUsed ? 'bg-[#23293a] text-[#fafafa]' : 'bg-[#181818] text-[#b8b8b8]']"
                @click="showUsed = true">
                Used
            </button>
        </div>
        <div class="bg-[#111111] rounded-2xl p-4 md:p-6 shadow">
            <div v-if="loading" class="text-gray-400">Loading...</div>
            <div v-else-if="!showUsed && !filteredKeys.length" class="text-gray-400">No keys found.</div>
            <div v-else-if="showUsed && !filteredUsedKeys.length" class="text-gray-400">No used keys found.</div>
            <div v-else>
                <div class="max-h-96 overflow-y-auto pr-1">
                    <ul class="divide-y divide-[#23293a]/60">
                        <li v-for="(key, i) in showUsed ? filteredVisibleUsedKeys : filteredVisibleKeys" :key="showUsed ? key.keyId : key.id"
                            class="py-2 font-satoshi text-[#c6c3c6] flex items-center justify-between">
                            <div class="flex flex-col gap-1 flex-1">
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-[#fafafa]">{{ showUsed ? key.keyId : key.id }}</span>
                                    <span class="text-xs text-[#b8b8b8]">R$ {{ key.value }}</span>
                                </div>
                            </div>
                            <div class="flex gap-2 items-center">
                                <button @click="copyKey(showUsed ? key.keyId : key.id)"
                                    class="px-2 py-1 rounded text-xs text-[#b8b8b8] hover:text-[#576784] transition"
                                    title="Copy key">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                                        viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M19 21H9a2 2 0 0 1-2-2V7h2v12h10v2Zm3-16v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Zm-2 0H7v12h12V5Z" />
                                    </svg>
                                </button>
                                <button @click="showKeyInfo(key)"
                                    class="px-2 py-1 rounded text-xs text-[#b8b8b8] hover:text-blue-400 transition"
                                    title="Key info">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                                        viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                    </svg>
                                </button>
                                <button v-if="!showUsed" @click="confirmDeleteKey(key.id)"
                                    class="px-2 py-1 rounded text-xs text-[#b8b8b8] hover:text-red-400 transition"
                                    title="Delete key">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                                        viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M9 3v1H4v2h16V4h-5V3H9zm-4 6v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9H5zm2 2h8v10H7V11z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-center mt-4">
                    <span v-if="(showUsed ? filteredUsedKeys.length : filteredKeys.length) > visibleCount" @click="showMore"
                        class="cursor-pointer text-sm text-[#939193] hover:underline transition select-none">
                        Show more keys
                    </span>
                    <span v-if="visibleCount > 10" @click="showLess"
                        class="cursor-pointer text-sm text-[#939193] hover:underline transition select-none ml-4">
                        Show less
                    </span>
                </div>
            </div>
        </div>
        <!-- Confirm delete dialog -->
        <transition name="modal-fade">
            <div v-if="deleteKeyId" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <transition name="modal-zoom">
                    <div
                        class="relative bg-[#0a0a0a] rounded-3xl p-10 w-full max-w-md flex flex-col gap-6 shadow-2xl border border-[#0e0e0e]/30">
                        <button @click="deleteKeyId = null"
                            class="absolute top-4 right-4 text-[#576784] hover:text-white text-2xl transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
                            </svg>
                        </button>
                        <div class="flex flex-col items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none"
                                viewBox="0 0 24 24" class="text-[#530f0f]">
                                <path fill="currentColor"
                                    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            <h2 class="text-2xl font-bold mb-2 text-white text-center">Delete this key?</h2>
                            <p class="text-[#b8b8b8] text-sm text-center">
                                This action will permanently remove the key.<br>
                                Are you sure you want to continue?
                            </p>
                        </div>
                        <div class="flex gap-4 justify-center">
                            <button @click="deleteKey"
                                class="bg-[#530f0f] border border-[#750c0c] hover:border-[#8c0a0a] text-white px-4 py-2 rounded transition">
                                Yes, delete
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
        <transition name="modal-fade">
            <div v-if="infoKey" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <transition name="modal-zoom">
                    <div
                        class="relative bg-[#0a0a0a] rounded-3xl p-8 w-full max-w-md flex flex-col gap-6 shadow-2xl border border-[#0e0e0e]/30">
                        <button @click="infoKey = null"
                            class="absolute top-4 right-4 text-[#576784] hover:text-white text-2xl transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
                            </svg>
                        </button>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl font-bold text-white mb-2">Key Information</h2>
                            <div class="text-[#b8b8b8] text-sm break-all">
                                <div><b>ID:</b> {{ infoKey.id || infoKey.keyId }}</div>
                                <div><b>Value:</b> R$ {{ infoKey.value }}</div>
                                <div><b>Created by:</b> {{ infoKey.createdByEmail || infoKey.createdBy || 'N/A' }}</div>
                                <div><b>Creation date: </b>
                                    <span v-if="infoKey.createdAt">
                                        {{ formatDate(infoKey.createdAt) }}
                                    </span>
                                    <span v-else>N/A</span>
                                </div>
                                <div><b>Used by:</b> {{ infoKey.usedByEmail || infoKey.usedBy || 'Não usada' }}</div>
                                <div><b>Date of use: </b>
                                    <span v-if="infoKey.usedAt">
                                        {{ formatDate(infoKey.usedAt) }}
                                    </span>
                                    <span v-else> Never used</span>
                                </div>
                            </div>
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
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const keys = ref([])
const usedKeys = ref([])
const loading = ref(true)
const deleteKeyId = ref(null)
const router = useRouter()

const showUsed = ref(false)
const infoKey = ref(null)
const search = ref('')

const visibleCount = ref(10)

const filteredKeys = computed(() => {
    if (!search.value) return keys.value.slice().reverse()
    const s = search.value.toLowerCase()
    return keys.value.slice().reverse().filter(k =>
        (k.id && k.id.toLowerCase().includes(s)) ||
        (k.value && String(k.value).toLowerCase().includes(s)) ||
        (k.createdByEmail && k.createdByEmail.toLowerCase().includes(s)) ||
        (k.createdBy && String(k.createdBy).toLowerCase().includes(s))
    )
})

const filteredUsedKeys = computed(() => {
    if (!search.value) return usedKeys.value.slice().reverse()
    const s = search.value.toLowerCase()
    return usedKeys.value.slice().reverse().filter(k =>
        (k.keyId && k.keyId.toLowerCase().includes(s)) ||
        (k.value && String(k.value).toLowerCase().includes(s)) ||
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

onMounted(async () => {
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            router.push('/dashboard')
            return
        }
        // Busca dados do usuário para verificar se é admin
        const userSnap = await getDocs(collection(db, 'users'))
        const userDoc = userSnap.docs.find(d => d.id === user.uid)
        if (!userDoc || !userDoc.data().admin) {
            router.push('/dashboard')
            return
        }
        await fetchKeys()
        await fetchUsedKeys()
        loading.value = false
    })
})

async function fetchUsedKeys() {
    const snap = await getDocs(collection(db, 'usedKeys'))
    usedKeys.value = snap.docs.map(doc => ({ keyId: doc.id, ...doc.data() }))
}

async function fetchKeys() {
    const snap = await getDocs(collection(db, 'keys'))
    keys.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
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
</script>