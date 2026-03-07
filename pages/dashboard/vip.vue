<template>
    <div class="w-full mx-auto pt-20 md:pt-8 px-4 sm:px-6 lg:px-10 font-satoshi">
        <audio ref="audioLive" src="/audios/live.mp3" preload="auto"></audio>
        <audio ref="audioSuccess" src="/audios/notificationSuccess.mp3" preload="auto"></audio>

        <!-- Header -->
        <div
            class="inline-flex items-center gap-2 w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur-xl">
            <span class="h-1.5 w-1.5 rounded-full bg-[#7aa7ff] shadow-[0_0_18px_rgba(122,167,255,0.9)]"></span>
            Dashboard • Vip Checker
        </div>
        <div class="mt-4 mb-5 md:mb-7">
            <div class="flex items-center gap-3">
                <span class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
                    <Icon name="mdi:credit-card-outline" size="30" class="text-[#7aa7ff]" />
                </span>

                <div class="min-w-0">
                    <h2 class="text-xl md:text-3xl font-black tracking-tight text-white">Checker</h2>
                    <p class="text-sm text-white/55">
                        Paste your cards, configure gateway and start checking.
                    </p>
                </div>

                <div class="ml-auto flex items-center gap-2">
                    <button class="w-14 h-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition
                   flex items-center justify-center" title="Settings" @click="showConfig = true">
                        <Icon name="mdi:cog-outline" size="22" class="text-white/80" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Main grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!-- Left: Input + actions -->
            <div class="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
               shadow-[0_18px_70px_rgba(0,0,0,0.55)] overflow-hidden">
                <div class="p-4 sm:p-6">
                    <!-- Textarea -->
                    <div class="flex items-center justify-between gap-3 mb-3">
                        <div class="flex items-center gap-2">
                            <Icon name="mdi:clipboard-text-outline" size="20" class="text-white/70" />
                            <span class="font-bold text-white">Cards Input</span>
                        </div>

                        <div class="text-xs text-white/50">
                            Loaded:
                            <span class="text-white/80 font-semibold">{{ loaded }}</span>
                        </div>
                    </div>

                    <textarea v-model="cardsInput" rows="8"
                        placeholder="Paste your cards here, one per line (e.g. 4174014980983772|02|27|574)" class="w-full h-44 rounded-2xl p-4 bg-black/25 border border-white/10 text-white font-mono text-sm
                   placeholder-white/30 outline-none resize-none
                   focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"></textarea>

                    <!-- Error -->
                    <transition name="fade-slide">
                        <div v-if="errorMessage" class="mt-4">
                            <div
                                class="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 flex items-center gap-3">
                                <Icon name="mdi:alert-circle-outline" size="22" class="text-rose-300" />
                                <span class="text-sm text-white/85">{{ errorMessage }}</span>
                                <button @click="errorMessage = ''"
                                    class="ml-auto w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                                    title="Close">
                                    <Icon name="mdi:close" size="18" class="text-white/70" />
                                </button>
                            </div>
                        </div>
                    </transition>

                    <!-- Actions -->
                    <div class="mt-4 flex flex-col sm:flex-row gap-3">
                        <button @click="startCheck" :disabled="loading || !cardsInput.trim()" class="flex-1 rounded-2xl px-5 py-3 font-bold text-sm text-white
                     bg-[#7aa7ff]/15 border border-[#7aa7ff]/30 hover:bg-[#7aa7ff]/20 hover:border-[#7aa7ff]/40 transition
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <Icon name="mdi:play" size="18" />
                            Start
                        </button>

                        <button @click="stopCheck" :disabled="!loading" class="flex-1 rounded-2xl px-5 py-3 font-bold text-sm text-white
                     bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <Icon name="mdi:stop" size="18" />
                            Stop
                        </button>
                    </div>

                    <!-- Current testing -->
                    <transition name="fade-slide">
                        <div v-if="loading && currentCard"
                            class="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 flex items-center gap-3">
                            <Icon name="mdi:credit-card-outline" size="18" class="text-[#7aa7ff]" />
                            <span class="text-white/55 text-sm">Testing:</span>

                            <transition name="card-swap" mode="out-in">
                                <span :key="currentCard" class="text-white font-mono text-sm truncate block">
                                    {{ currentCard }}
                                </span>
                            </transition>

                            <div class="ml-auto flex items-center gap-2 text-xs text-white/55">
                                <span>Tested:</span>
                                <span class="text-white/85 font-semibold">{{ tested }}</span>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>

            <!-- Right: Stats + Generator -->
            <div class="flex flex-col gap-4">
                <!-- Stats -->
                <div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                 shadow-[0_18px_70px_rgba(0,0,0,0.55)] p-4 sm:p-6">
                    <div class="flex items-center gap-2 mb-3">
                        <Icon name="mdi:chart-bar" class="text-[#7aa7ff]" size="20" />
                        <span class="font-black text-white">Statistics</span>
                    </div>

                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div class="rounded-2xl border border-white/10 bg-black/20 p-3">
                            <div class="text-white/55 text-xs">Approved</div>
                            <div class="text-white font-black text-xl">{{ approved.length }}</div>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-black/20 p-3">
                            <div class="text-white/55 text-xs">Refused</div>
                            <div class="text-white font-black text-xl">{{ refused.length }}</div>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-black/20 p-3">
                            <div class="text-white/55 text-xs">Tested</div>
                            <div class="text-white font-black text-xl">{{ tested }}</div>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-black/20 p-3">
                            <div class="text-white/55 text-xs">Loaded</div>
                            <div class="text-white font-black text-xl">{{ loaded }}</div>
                        </div>
                    </div>
                </div>

                <!-- Generator -->
                <div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                 shadow-[0_18px_70px_rgba(0,0,0,0.55)] p-4 sm:p-6">
                    <div class="flex items-center gap-2 mb-3">
                        <Icon name="mdi:magic-staff" class="text-[#7aa7ff]" size="20" />
                        <span class="font-black text-white">CC Generator</span>
                    </div>

                    <input v-model="genBin" placeholder="Enter BIN (e.g. 417401xxxxxxxxxx|MM|YY|CVV)" class="w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white
                   placeholder-white/30 outline-none font-mono text-sm
                   focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition" />

                    <button @click="generateCards" class="mt-3 w-full rounded-2xl px-5 py-3 font-bold text-sm text-white
                   bg-[#7aa7ff]/15 border border-[#7aa7ff]/30 hover:bg-[#7aa7ff]/20 hover:border-[#7aa7ff]/40 transition
                   flex items-center justify-center gap-2">
                        <Icon name="mdi:sparkles" size="18" />
                        Generate
                    </button>
                </div>
            </div>
        </div>

        <!-- Results -->
        <div class="mt-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
             shadow-[0_18px_70px_rgba(0,0,0,0.55)] overflow-hidden">
            <div class="p-4 sm:p-6">
                <div class="flex items-center gap-2 mb-4">
                    <Icon name="mdi:format-list-bulleted" class="text-[#7aa7ff]" size="22" />
                    <span class="font-black text-white text-lg">Results</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Approved -->
                    <div class="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                        <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                            <span class="font-bold text-white">Approved</span>
                            <span class="ml-2 text-xs text-white/55">({{ approved.length }})</span>

                            <div class="ml-auto flex items-center gap-2">
                                <button @click="clearAll('approved')"
                                    class="w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                                    title="Delete all">
                                    <Icon name="mdi:delete-outline" size="18" class="text-white/70" />
                                </button>

                                <button @click="toggleHide('approved')"
                                    class="w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                                    :title="hideApproved ? 'Show' : 'Hide'">
                                    <Icon :name="hideApproved ? 'mdi:eye' : 'mdi:eye-off'" size="18"
                                        class="text-white/70" />
                                </button>
                            </div>
                        </div>

                        <transition-group name="fade-slide" tag="div"
                            class="flex flex-col gap-2 px-4 py-3 max-h-44 overflow-y-auto">
                            <div v-for="(item, idx) in approved" :key="'approved-' + idx" v-show="!hideApproved"
                                class="flex items-center gap-2">
                                <Approved />
                                <span class="text-emerald-300 text-sm" v-html="item.html" />
                            </div>
                        </transition-group>
                    </div>

                    <!-- Refused -->
                    <div class="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                        <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                            <span class="font-bold text-white">Refused</span>
                            <span class="ml-2 text-xs text-white/55">({{ refused.length }})</span>

                            <div class="ml-auto flex items-center gap-2">
                                <button @click="clearAll('refused')"
                                    class="w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                                    title="Delete all">
                                    <Icon name="mdi:delete-outline" size="18" class="text-white/70" />
                                </button>

                                <button @click="toggleHide('refused')"
                                    class="w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                                    :title="hideRefused ? 'Show' : 'Hide'">
                                    <Icon :name="hideRefused ? 'mdi:eye' : 'mdi:eye-off'" size="18"
                                        class="text-white/70" />
                                </button>
                            </div>
                        </div>

                        <transition-group name="fade-slide" tag="div"
                            class="flex flex-col gap-2 px-4 py-3 max-h-28 overflow-y-auto">
                            <div v-for="(item, idx) in refused" :key="'refused-' + idx" v-show="!hideRefused"
                                class="flex items-center gap-2">
                                <template v-if="item.type === 'refused'">
                                    <Refused />
                                    <span class="text-rose-300 text-sm" v-html="item.html" />
                                </template>

                                <template v-else>
                                    <ErrorIcon />
                                    <span class="text-amber-300 text-sm" v-html="item.html" />
                                </template>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>
        </div>

        <!-- Settings Modal -->
        <transition name="modal-fade">
            <div v-if="showConfig" class="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showConfig = false"></div>

                <transition name="modal-zoom">
                    <div class="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-6 sm:p-8 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden">
                        <div
                            class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.18),transparent_55%)]">
                        </div>

                        <button @click="showConfig = false"
                            class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center">
                            <Icon name="mdi:close" size="22" class="text-white/70" />
                        </button>

                        <div class="relative flex flex-col gap-6">
                            <div class="flex items-center gap-3">
                                <span
                                    class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Icon name="mdi:cog-outline" size="24" class="text-[#7aa7ff]" />
                                </span>
                                <div>
                                    <h2 class="text-xl font-black text-white">Settings</h2>
                                    <p class="text-sm text-white/55">Configure threads and gateway.</p>
                                </div>
                            </div>

                            <div>
                                <label class="block text-white/80 font-bold text-sm mb-2">Proxy</label>
                                <input v-model="settings.proxy"
                                    placeholder="proxy.oculus-proxy.com:31112:username:password" class="w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                                focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition" />
                                <div class="text-white/50 text-xs mt-2">Proxy used by gateway requests. Example shown.
                                </div>
                            </div>


                            <!-- Threads -->
                            <div>
                                <label class="block text-white/80 font-bold text-sm mb-2">Threads</label>
                                <input type="range" min="1" max="3" v-model="settings.threads"
                                    class="w-full accent-[#7aa7ff]" />
                                <div class="flex justify-between text-white/50 text-xs mt-2">
                                    <span>Simultaneous requests.</span>
                                    <span class="font-bold text-white/80">{{ settings.threads }}x</span>
                                </div>
                            </div>

                            <!-- Gateway -->
                            <div>
                                <label class="block text-white/80 font-bold text-sm mb-2">Gateway</label>
                                <select v-model="settings.gateway" class="w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                         focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition">
                                    <option disabled>Gateway Host</option>
                                    <option>PayPal US</option>
                                    <option>PayPal CA</option>
                                    <option>PayPal BR</option>
                                </select>
                                <div class="text-white/50 text-xs mt-2">Choose the connection domain.</div>
                            </div>

                            <!-- Buttons -->
                            <div class="flex flex-col sm:flex-row gap-3">
                                <button @click="resetSettings" class="flex-1 rounded-2xl px-5 py-3 font-bold text-sm text-white
                         bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition
                         flex items-center justify-center gap-2">
                                    <Icon name="mdi:restore" size="18" />
                                    Reset Settings
                                </button>

                                <button @click="saveSettings" class="flex-1 rounded-2xl px-5 py-3 font-bold text-sm text-white
                         bg-[#7aa7ff]/15 border border-[#7aa7ff]/30 hover:bg-[#7aa7ff]/20 hover:border-[#7aa7ff]/40 transition
                         flex items-center justify-center gap-2">
                                    <Icon name="mdi:content-save-outline" size="18" />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>

        <!-- No Balance Modal -->
        <transition name="modal-fade">
            <div v-if="showNoBalanceModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showNoBalanceModal = false"></div>

                <transition name="modal-zoom">
                    <div class="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-6 sm:p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden">
                        <div
                            class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),transparent_55%)]">
                        </div>

                        <button @click="showNoBalanceModal = false"
                            class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center">
                            <Icon name="mdi:close" size="22" class="text-white/70" />
                        </button>

                        <div class="relative flex flex-col items-center gap-4">
                            <Icon name="mdi:alert-circle-outline" size="48" class="text-rose-300" />
                            <h2 class="text-xl font-black text-white text-center">Insufficient Balance</h2>
                            <p class="text-white/60 text-center text-sm">
                                You need at least <span class="text-rose-300 font-bold">R$ 0.10</span> to start the
                                checker.
                            </p>

                            <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener" class="w-full">
                                <button @click="showNoBalanceModal = false"
                                    class="w-full rounded-2xl px-5 py-3 font-bold text-sm text-white
                         bg-[#7aa7ff]/15 border border-[#7aa7ff]/30 hover:bg-[#7aa7ff]/20 hover:border-[#7aa7ff]/40 transition">
                                    Recharge
                                </button>
                            </a>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>

        <!-- No Access Modal -->
        <transition name="modal-fade">
            <div v-if="showNoAccessModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showNoAccessModal = false"></div>

                <transition name="modal-zoom">
                    <div class="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-6 sm:p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden">
                        <div
                            class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),transparent_55%)]">
                        </div>

                        <button @click="showNoAccessModal = false"
                            class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center">
                            <Icon name="mdi:close" size="22" class="text-white/70" />
                        </button>

                        <div class="relative flex flex-col items-center gap-4">
                            <Icon name="mdi:alert-circle-outline" size="48" class="text-rose-300" />
                            <h2 class="text-xl font-black text-white text-center">You don't have access to this checker!
                            </h2>
                            <p class="text-white/60 text-center text-sm">
                                You need to purchase with <span class="text-rose-300 font-bold">@yuzuuk1</span> to use
                                this
                                checker.
                            </p>

                            <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener" class="w-full">
                                <button @click="showNoAccessModal = false"
                                    class="w-full rounded-2xl px-5 py-3 font-bold text-sm text-white
                         bg-[#7aa7ff]/15 border border-[#7aa7ff]/30 hover:bg-[#7aa7ff]/20 hover:border-[#7aa7ff]/40 transition">
                                    Contact Me!
                                </button>
                            </a>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { doc, updateDoc, getDoc, arrayUnion, serverTimestamp, increment } from 'firebase/firestore'
import { db, auth } from '~/firebase'
import Approved from '~/components/Approved.vue'
import Refused from '~/components/Refused.vue'
import ErrorIcon from '~/components/Error.vue'

const audioLive = ref(null)
const audioSuccess = ref(null)

const cardsInput = ref('')
const currentCard = ref('')
const approved = ref([])
const refused = ref([])
const loading = ref(false)
const tested = ref(0)
const loaded = ref(0)
const genBin = ref('')

const showNoBalanceModal = ref(false)
const showNoAccessModal = ref(false)
const errorMessage = ref('')
const showConfig = ref(false)

const statsRef = doc(db, "general", "totalChecked")

const settings = ref({
    threads: 1,
    gateway: 'PayPal US',
    approvedLog: false,
    proxy: ''
})

const hideApproved = ref(false)
const hideRefused = ref(true)

const gatewayMap = {
    'PayPal US': 'US',
    'PayPal CA': 'CA',
    'PayPal BR': 'BR'
}

const apiMap = {
    'PayPal US': 'us',
    'PayPal CA': 'ca',
    'PayPal BR': 'bra'
}

// Load settings
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('checkerSettings')
    if (saved) {
        try {
            Object.assign(settings.value, JSON.parse(saved))
        } catch { }
    }
}

// Save settings on change
watch(
    settings,
    val => {
        localStorage.setItem('checkerSettings', JSON.stringify(val))
    },
    { deep: true }
)

function playAudio(refAudio) {
    try {
        refAudio.value && refAudio.value.play()
    } catch { }
}

/** Luhn helper: given base string, appends check digit */
function luhnComplete(number) {
    let arr = number.split('').reverse().map(x => parseInt(x))
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i]
        if (i % 2 === 0) {
            val *= 2
            if (val > 9) val -= 9
        }
        sum += val
    }
    let checkDigit = (10 - (sum % 10)) % 10
    return number + checkDigit
}

function generateCards() {
    let bin = genBin.value.trim().split('|')[0]
    if (!/^[\dx]{6,}$/i.test(bin)) return

    const isAmex = /^3[47]/.test(bin)
    const cards = []

    for (let i = 0; i < 50; i++) {
        let cc = ''
        for (let c of bin) cc += c.toLowerCase() === 'x' ? Math.floor(Math.random() * 10) : c

        const baseLen = isAmex ? 14 : 15
        cc = cc.slice(0, baseLen)
        while (cc.length < baseLen) cc += Math.floor(Math.random() * 10)
        cc = luhnComplete(cc)

        let parts = genBin.value.trim().split('|')
        let mm = parts[1] ? parts[1].padStart(2, '0') : String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
        let yy =
            parts[2] ? parts[2].padStart(2, '0') : String((new Date().getFullYear() % 100) + Math.floor(Math.random() * 5) + 1).padStart(2, '0')

        let cvvLen = isAmex ? 4 : 3
        let cvv = String(Math.floor(Math.random() * Math.pow(10, cvvLen))).padStart(cvvLen, '0')

        cards.push(`${cc}|${mm}|${yy}|${cvv}`)
    }

    cardsInput.value = cards.join('\n')
}

async function startCheck() {
    errorMessage.value = ''
    if (!cardsInput.value.trim()) return

    playAudio(audioSuccess)

    const user = auth.currentUser
    if (!user) {
        errorMessage.value = 'You must be logged in.'
        return
    }

    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    const userData = userSnap.data() || {}

    let balance = Number(userData.balance ?? 0)
    let vipAccess = userData.vipAccess ?? false
    let checksMonth = Number(userData.checksMonth ?? 0)
    let livesUsed = Number(userData.livesUsed ?? 0)
    let avgSpentWeek = Number(userData.avgSpentWeek ?? 0)

    if (balance < 0.10) {
        showNoBalanceModal.value = true
        return
    }

    if (vipAccess == false) {
        showNoAccessModal.value = true
        return
    }

    tested.value = 0
    const cards = cardsInput.value.split('\n').map(c => c.trim()).filter(Boolean)
    loaded.value = cards.length

    loading.value = true
    currentCard.value = ''

    const threads = Math.max(1, Math.min(3, Number(settings.value.threads) || 1))
    let pointer = 0
    const remaining = [...cards]

    async function processCard(card) {
        if (!loading.value) return
        try {
            // incrementa contador do usuário para cartões testados
            try { await updateDoc(userRef, { cardsBought: increment(1) }) } catch (e) { console.warn('user.cardsBought increment failed', e) }

            currentCard.value = card

            // escolhe qual endpoint .php usar conforme gateway selecionado
            const api = apiMap[settings.value.gateway] || 'bra'
            const url = `https://vortexcenter.xyz/butico/${api}.php`

            // corpo application/x-www-form-urlencoded: proxy=<...>&lista=<card>
            const body = new URLSearchParams({ proxy: settings.value.proxy || '', lista: card }).toString()

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            })

            const text = await res.text()

            // tenta interpretar resposta como JSON; se falhar, usa texto bruto
            let json = null
            try {
                json = JSON.parse(text)
            } catch (e) {
                json = null
            }

            // helper: retorna "lista | code" quando possível
            function compactOutput(jsonObj, rawText, fallbackCard) {
                if (jsonObj) {
                    const listaVal = jsonObj.lista ?? fallbackCard
                    const codeVal = jsonObj.code ?? ''
                    return codeVal ? `${listaVal} ➔ ${codeVal}` : `${listaVal}`
                }
                const listaMatch = rawText && rawText.match(/(\d{12,19}\|\d{2}\|\d{2,4}\|\d{3,4})/)
                const codeMatch = rawText && rawText.match(/"code"\s*:\s*"([^"]+)"|code:?\s*([A-Z0-9_]+)/i)
                const listaVal = listaMatch ? listaMatch[1] : fallbackCard
                const codeVal = codeMatch ? (codeMatch[1] || codeMatch[2]) : ''
                return codeVal ? `${listaVal} | ${codeVal}` : `${listaVal}`
            }

            // determina se aprovado: prefer JSON.status == "Aprovada" (case-insensitive), fallback para heurística no texto
            let isApproved = false
            if (json && json.status) {
                const st = String(json.status).toLowerCase()
                if (st === 'aprovada' || st === 'approved' || st === 'success') isApproved = true
            }

            const approvedRegex = /(aprovad|approved|sucesso|success)/i
            if (!isApproved && approvedRegex.test(text)) isApproved = true

            if (isApproved) {
                const html = compactOutput(json, text, card)

                approved.value.push({
                    type: 'approved',
                    card,
                    html
                })

                playAudio(audioLive)

                // débito e contadores locais
                balance = Math.max(0, balance - 0.10)
                checksMonth += 1
                livesUsed += 1
                avgSpentWeek = Math.max(0, avgSpentWeek + 0.10)

                // atualiza dados do usuário (inclui vida aprovada)
                try {
                    await updateDoc(userRef, {
                        lives: arrayUnion(card),
                        checksMonth,
                        livesUsed,
                        lastCheck: serverTimestamp(),
                        balance,
                        avgSpentWeek
                    })
                } catch (e) {
                    console.warn('update user on approved failed', e)
                }
            } else {
                // montar saída reduzida para recusadas: somente "lista | code" quando disponível
                let refusedHtml = ''
                if (json) {
                    const listaVal = json.lista ?? card
                    const codeVal = json.code ?? ''
                    refusedHtml = codeVal ? `${listaVal} ➔ ${codeVal}` : `${listaVal}`
                } else {
                    // fallback: extrair lista e code do texto bruto por regex simples
                    const listaMatch = (text && text.match(/(\d{12,19}\|\d{2}\|\d{2,4}\|\d{3,4})/))
                    const codeMatch = (text && text.match(/"code"\s*:\s*"([^"]+)"|code:?\s*([A-Z0-9_]+)/i))
                    const listaVal = listaMatch ? listaMatch[1] : card
                    const codeVal = codeMatch ? (codeMatch[1] || codeMatch[2]) : ''
                    refusedHtml = codeVal ? `${listaVal} | ${codeVal}` : `${listaVal}`
                }

                refused.value.push({
                    type: 'refused',
                    card,
                    html: refusedHtml
                })
            }
        } catch (e) {
            console.error('processCard error', e)

            // tenta extrair info do erro/texto, exibe "lista | code" quando possível
            const errText = (e && e.message) ? e.message : ''
            const errorHtml = compactOutput(null, errText, card)

            refused.value.push({
                type: 'error',
                card,
                html: errorHtml
            })
        } finally {
            tested.value++
        }
    }

    while (pointer < cards.length && loading.value) {
        const batch = []
        for (let t = 0; t < threads && pointer < cards.length; t++, pointer++) {
            batch.push(processCard(cards[pointer]))
        }
        await Promise.all(batch)

        // remove processed cards from textarea visual
        remaining.splice(0, batch.length)
        cardsInput.value = remaining.join('\n')
    }

    loading.value = false
    currentCard.value = ''
}

function stopCheck() {
    loading.value = false
    currentCard.value = ''
}

function toggleHide(type) {
    if (type === 'approved') hideApproved.value = !hideApproved.value
    else hideRefused.value = !hideRefused.value
}

function clearAll(type) {
    if (type === 'approved') approved.value = []
    else refused.value = []
}

function resetSettings() {
    settings.value = {
        threads: 1,
        gateway: 'PayPal US',
    }
    localStorage.removeItem('checkerSettings')
}

function saveSettings() {
    showConfig.value = false
}
</script>

<style>
/* small list + error animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.25s cubic-bezier(.4, 0, .2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(18px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}

/* current card swap */
.card-swap-enter-active,
.card-swap-leave-active {
    transition: all 0.25s cubic-bezier(.4, 0, .2, 1);
}

.card-swap-enter-from {
    opacity: 0;
    transform: translateY(6px);
}

.card-swap-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.card-swap-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.card-swap-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

/* modal transitions */
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
