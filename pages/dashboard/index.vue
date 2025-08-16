<template>
    <div class="w-full mx-auto pt-20 md:pt-12 px-2 md:px-16">
        <h1 class="font-semibold text-[19px] md:text-[21px] text-[#FAFAFA] mb-4 px-16 md:px-0 md:mb-0">Account
            Information</h1>
    </div>
    <div class="w-full mx-auto pt-4 px-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <!-- Saldo -->
            <div
                class="bg-[#1b273d]/60 rounded-3xl p-6 flex flex-col justify-between shadow border border-[#243451]/40">
                <div class="flex items-center gap-2 mb-2">
                    <Icon name="mdi:wallet" class="text-[#d4d4d4]" size="28" />
                    <span class="font-semibold text-lg text-white">Balance</span>
                </div>
                <div class="text-3xl font-bold text-[#FAFAFA]">R$ {{ balance?.toFixed(2) ?? '0.00' }}</div>
                <div class="text-sm text-[#b8b8b8] mt-2">Your current balance</div>
            </div>
            <!-- Lives usadas -->
            <div
                class="bg-[#1b273d]/60 rounded-3xl p-6 flex flex-col justify-between shadow border border-[#243451]/40">
                <div class="flex items-center gap-2 mb-2">
                    <Icon name="mdi:heart-pulse" class="text-[#d4d4d4]" size="28" />
                    <span class="font-semibold text-lg text-white">Lives taken</span>
                </div>
                <div class="text-3xl font-bold text-[#fafafa]">{{ livesUsed }}</div>
                <div class="text-sm text-[#b8b8b8] mt-2">Total lives taken</div>
            </div>
            <!-- Cartões comprados -->
            <div
                class="bg-[#1b273d]/60 rounded-3xl p-6 flex flex-col justify-between shadow border border-[#243451]/40">
                <div class="flex items-center gap-2 mb-2">
                    <Icon name="fluent:person-star-20-filled" class="text-[#d4d4d4]" size="28" />
                    <span class="font-semibold text-lg text-white">Role</span>
                </div>
                <div class="text-3xl font-bold text-[#fafafa]">{{ accountStatus }}</div>
                <div class="text-sm text-[#b8b8b8] mt-2">Your user role</div>
            </div>
            <!-- Email com botão copiar -->
            <div
                class="bg-[#1b273d]/60 rounded-3xl p-6 flex flex-col justify-between shadow border border-[#243451]/40">
                <div class="flex items-center gap-2 mb-2">
                    <Icon name="mdi:email" class="text-[#d4d4d4]" size="28" />
                    <span class="font-semibold text-lg text-white">Email</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="text-lg font-bold text-[#fafafa] truncate">{{ user?.email || '...' }}</div>
                    <button @click="copyEmail" class="rounded text-[#d4d4d4] ml-2 -mb-2 text-xs font-bold transition"
                        :title="'Copiar email'">
                        <Icon name="mdi:content-copy" size="15px" />
                    </button>
                </div>
                <div class="text-sm text-[#b8b8b8] mt-2">Your registered email</div>
                <div v-if="copied" class="text-green-400 text-xs mt-1">Copied!</div>
            </div>
        </div>

        <!-- 3. Resumo de uso -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <div class="bg-[#121212] border-2 border-[#191919] rounded-2xl p-6 shadow flex flex-col gap-2">
                <div class="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="mdi:chart-bar" class="text-[#8A97AB]" size="22" />
                    Usage summary
                    <Beta class="-mb-1"></Beta>
                </div>
                <div class="flex flex-wrap gap-8">
                    <div>
                        <div class="text-2xl font-bold text-[#fafafa]">R$ {{ avgSpentWeek?.toFixed(2) }}</div>
                        <div class="text-xs text-[#b8b8b8]">Total expenses</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-[#fafafa]">{{ lastLogin || '---' }}</div>
                        <div class="text-xs text-[#b8b8b8]">Last login</div>
                    </div>
                </div>
            </div>
            <!-- 5. Avisos/novidades -->
            <div class="bg-[#121212] border-2 border-[#191919] rounded-2xl p-6 shadow flex flex-col gap-2">
                <div class="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="mdi:bullhorn" class="text-[#8A97AB]" size="22" />
                    News & Announcements
                </div>
                <ul class="text-sm text-[#d4d4d4] space-y-2">
                    <li v-for="(notice, i) in notices" :key="i">
                        <span class="text-[#576784] font-bold">•</span> {{ notice }}
                    </li>
                    <li v-if="notices.length === 0" class="text-[#888]">No news at the moment.</li>
                </ul>
            </div>
        </div>
        <!-- 4. Acesso rápido -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <!-- 6. Status da conta -->
            <div class="bg-[#121212] border-2 border-[#191919] rounded-2xl p-6 shadow flex flex-col gap-2">
                <div class="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="mdi:account-check" class="text-[#8A97AB]" size="22" />
                    Account status
                    <Beta class="-mb-1"></Beta>
                </div>
                <div class="flex items-center gap-3">
                    <span
                        class="flex items-center gap-2 px-3 py-1 rounded-full font-bold border transition-all duration-200"
                        :class="{
                            // Administrator: Roxo vibrante
                            'bg-gradient-to-r from-[#a78bfa]/80 to-[#7c3aed]/80 text-white border-[#a78bfa] shadow-lg shadow-[#a78bfa]/20':
                                accountStatus === 'Administrator',
                            // Reseller: Laranja vibrante
                            'bg-gradient-to-r from-[#ffb347]/80 to-[#ff7746]/80 text-white border-[#ff7746] shadow-lg shadow-[#ff7746]/20':
                                accountStatus === 'Reseller',
                            // Premium: Azul moderno
                            'bg-gradient-to-r from-[#1e3a8a]/80 to-[#38bdf8]/80 text-white border-[#38bdf8] shadow-lg shadow-[#38bdf8]/20':
                                accountStatus === 'Premium',
                            // Common: Cinza escuro moderno
                            'bg-gradient-to-r from-[#232323]/90 to-[#2d2d2d]/90 text-[#fafafa] border-[#232323]':
                                accountStatus === 'Common',
                            // Blocked: Vermelho moderno
                            'bg-gradient-to-r from-[#7f1d1d]/80 to-[#ef4444]/80 text-white border-[#ef4444] shadow-lg shadow-[#ef4444]/20':
                                accountStatus === 'Blocked'
                        }">
                        <Icon :name="{
                            'Administrator': 'fluent:person-shield-24-filled',
                            'Reseller': 'fluent:person-note-24-filled',
                            'Premium': 'fluent:person-star-24-filled',
                            'Common': 'fluent:person-20-filled',
                            'Blocked': 'fluent:person-cancel-24-filled'
                        }[accountStatus] || 'fluent:person-20-filled'" size="18" class="opacity-90" />
                        {{ accountStatus }}

                        <!-- BADGE DE RANKING -->
                        <span v-if="userRank && userRank <= 10"
                            class="ml-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border shadow"
                            :class="{
                                // Top 1: Ouro
                                'bg-gradient-to-r from-[#ffe066]/80 to-[#ffd700]/80 text-[#7c6f00] border-[#ffd700] shadow-[#ffd700]/20': userRank === 1,
                                // Top 2: Prata
                                'bg-gradient-to-r from-[#e0e0e0]/80 to-[#b0b0b0]/80 text-[#555] border-[#b0b0b0] shadow-[#b0b0b0]/20': userRank === 2,
                                // Top 3: Bronze
                                'bg-gradient-to-r from-[#ffb47e]/80 to-[#c97a3a]/80 text-[#7c3f00] border-[#c97a3a] shadow-[#c97a3a]/20': userRank === 3,
                                // Top 4-10: Azul claro
                                'bg-gradient-to-r from-[#38bdf8]/40 to-[#1e3a8a]/40 text-[#1e3a8a] border-[#38bdf8] shadow-[#38bdf8]/10': userRank > 3 && userRank <= 10
                            }">
                            <span v-if="userRank === 1">🥇 Top 1</span>
                            <span v-else-if="userRank === 2">🥈 Top 2</span>
                            <span v-else-if="userRank === 3">🥉 Top 3</span>
                            <span v-else class="text-[#fafafa]">Top {{ userRank }}</span>
                        </span>
                    </span>
                </div>
            </div>
            <!-- Revendedores Verificados -->
            <div class="bg-[#121212] border-2 border-[#191919] rounded-2xl p-6 shadow flex flex-col gap-2">
                <div class="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="mdi:account-cash" class="text-[#8A97AB]" size="22" />
                    Verified Resellers
                </div>
                <ul class="text-sm text-[#d4d4d4] flex flex-wrap gap-3">
                    <li>
                        <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener"
                            class="flex items-center transition">
                            <div
                                class="flex items-center justify-center w-max h-8 bg-[#1a1a1a] border-2 border-[#202020] rounded-xl">
                                <Icon class="ml-2 text-[#707070]" name="lucide:link" size="18px"></Icon>
                                <p class="px-2 py-8 font-satoshi text-[#fafafa] font-semibold">Yuzuk</p>
                                <Icon class="ml-4 mr-2 text-[#707070]" name="weui:arrow-outlined" size="18px"></Icon>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/ruddyoz" target="_blank" rel="noopener"
                            class="flex items-center transition">
                            <div
                                class="flex items-center justify-center w-max h-8 bg-[#1a1a1a] border-2 border-[#202020] rounded-xl">
                                <Icon class="ml-2 text-[#707070]" name="lucide:link" size="18px"></Icon>
                                <p class="px-2 py-8 font-satoshi text-[#fafafa] font-semibold">Ruddy</p>
                                <Icon class="ml-4 mr-2 text-[#707070]" name="weui:arrow-outlined" size="18px"></Icon>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/chipeogod" target="_blank" rel="noopener"
                            class="flex items-center transition">
                            <div
                                class="flex items-center justify-center w-max h-8 bg-[#1a1a1a] border-2 border-[#202020] rounded-xl">
                                <Icon class="ml-2 text-[#707070]" name="lucide:link" size="18px"></Icon>
                                <p class="px-2 py-8 font-satoshi text-[#fafafa] font-semibold">Chipero</p>
                                <Icon class="ml-4 mr-2 text-[#707070]" name="weui:arrow-outlined" size="18px"></Icon>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/Mbuu28" target="_blank" rel="noopener"
                            class="flex items-center transition">
                            <div
                                class="flex items-center justify-center w-max h-8 bg-[#1a1a1a] border-2 border-[#202020] rounded-xl">
                                <Icon class="ml-2 text-[#707070]" name="lucide:link" size="18px"></Icon>
                                <p class="px-2 py-8 font-satoshi text-[#fafafa] font-semibold">Malibu</p>
                                <Icon class="ml-4 mr-2 text-[#707070]" name="weui:arrow-outlined" size="18px"></Icon>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Leaderboard de Top Lives -->
        <div class="w-full mx-auto pt-4 md:px-0 mb-6">
            <div
                class="bg-[#121212] border-2 border-[#191919] rounded-2xl p-6 shadow flex flex-col gap-2 max-h-72 overflow-y-auto w-full">
                <div class="font-semibold font-satoshi text-lg mb-4 flex items-center gap-2">
                    <Icon name="icon-park-solid:trophy" class="text-[#8a97ab]" size="22" />
                    Leaderboard
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full text-[#fafafa] text-sm">
                        <thead>
                            <tr class="text-[#b8b8b8]">
                                <th class="text-left py-1">#</th>
                                <th class="text-left py-1">Users</th>
                                <th class="text-left py-1">Lives</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in leaderboard" :key="item.uid" :class="{ 'bg-[#232323]/60': i < 3 }">
                                <td class="py-1 font-bold">
                                    <span class="pl-1" v-if="i === 0">🥇</span>
                                    <span class="pl-1" v-else-if="i === 1">🥈</span>
                                    <span class="pl-1" v-else-if="i === 2">🥉</span>
                                    <span class="pl-2 font-mono" v-else>{{ i + 1 }}</span>
                                </td>
                                <td class="py-1">{{ item.name }}</td>
                                <td class="py-1">{{ item.livesUsed }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="userRank && userRank > 10" class="mt-2 text-xs text-[#b8b8b8]">Your position: {{ userRank }}º
                </div>
            </div>
        </div>
        <transition name="modal-fade">
            <div v-if="showNicknameModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
                <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                <transition name="modal-zoom">
                    <div
                        class="relative bg-[#121212] border-2 border-[#191919] rounded-3xl p-8 w-full max-w-xs flex flex-col gap-4 shadow-2xl">
                        <div class="flex flex-col items-center gap-2">
                            <Icon name="mdi:account-circle" size="48" class="text-[#576784]" />
                            <h2 class="text-xl font-bold text-white text-center">Choose your nickname</h2>
                            <p class="text-[#b8b8b8] text-sm text-center">You need to set a nickname to continue using
                                the checker.</p>
                        </div>
                        <div v-if="nicknameError" class="text-red-400 text-xs text-center">{{ nicknameError }}</div>
                        <input v-model="nicknameInput" type="text" maxlength="20" placeholder="Enter your nickname"
                            class="bg-[#0c0c0c] font-satoshi rounded-xl px-4 py-2 w-full text-white text-[15px] outline-none ring-2 ring-transparent focus:ring-[#576784] transition" />
                        <button @click="saveNickname"
                            class="bg-[#181818] border-2 border-[#202020] hover:border-[#262626] duration-300 text-[#fafafa] font-satoshi font-thin px-4 py-2 rounded-xl transition">Save</button>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, getDocs, collection, updateDoc, deleteDoc, setDoc, serverTimestamp, query, orderBy, limit, where } from 'firebase/firestore'

const accountOpen = ref(true)
function toggleAccount() {
    accountOpen.value = !accountOpen.value
}

// Dados do usuário
const user = ref(null)
const balance = ref(0)
const livesUsed = ref(0)
const cardsBought = ref(0)
const photoURL = ref('https://media.discordapp.net/attachments/1309251468045320223/1379190818589376623/photo_4947363663258430903_c.jpg?ex=683f570b&is=683e058b&hm=e2fea9d2b064ad1a476fd85ca82ae498f9591f94c16081654ebefeb0803b7fb9&=&format=webp') // Placeholder
const isAdmin = ref(false)
const copied = ref(false)
const accountStatus = ref('Common') // Pode ser 'Premium', 'Common', 'Blocked'

const checksMonth = ref(0)
const avgSpentWeek = ref(0)
const lastLogin = ref('')

const notices = ref([
    "Detailed analysis in the menu"
])

const leaderboard = ref([])
const userRank = ref(null)

// Nickname
const nickname = ref('')
const showNicknameModal = ref(false)
const nicknameInput = ref('')
const nicknameError = ref('')

async function isNicknameTaken(nick) {
    const nickLower = nick.trim().toLowerCase()
    const q = query(
        collection(db, 'users'),
        where('nicknameLower', '==', nickLower)
    )
    const snap = await getDocs(q)
    // Se encontrar algum usuário com esse nickname (exceto o próprio)
    return snap.docs.some(docSnap => docSnap.id !== user.value?.uid)
}

onMounted(async () => {
    auth.onAuthStateChanged(async (u) => {
        if (u) {
            user.value = u
            photoURL.value = u.photoURL || photoURL.value
            // Atualiza o lastLogin no Firestore ao logar
            await updateDoc(doc(db, 'users', u.uid), {
                lastLogin: serverTimestamp()
            })
            // Busca saldo e dados do Firestore
            const userDoc = await getDoc(doc(db, 'users', u.uid))
            if (userDoc.exists()) {
                const data = userDoc.data()
                balance.value = data.balance ?? 0
                livesUsed.value = data.livesUsed ?? 0
                cardsBought.value = data.cardsBought ?? 0
                isAdmin.value = !!data.admin
                // Resumo de uso
                checksMonth.value = data.checksMonth ?? 0
                avgSpentWeek.value = data.avgSpentWeek ?? 0
                // lastLogin pode ser Timestamp
                if (data.lastLogin && typeof data.lastLogin.toDate === 'function') {
                    const date = data.lastLogin.toDate()
                    lastLogin.value = date.toLocaleString('pt-BR')
                } else {
                    lastLogin.value = data.lastLogin ?? ''
                }
                // Status da conta
                accountStatus.value = data.status ?? 'Common'
                nickname.value = data.nickname || ''
                if (!nickname.value) {
                    showNicknameModal.value = true
                }
            }

            // Leaderboard (agora para todos os usuários)
            const q = query(collection(db, 'users'), orderBy('livesUsed', 'desc'), limit(10))
            const querySnapshot = await getDocs(q)
            leaderboard.value = []
            let rank = 1
            querySnapshot.forEach((docSnap) => {
                const d = docSnap.data()
                leaderboard.value.push({
                    uid: docSnap.id,
                    name: d.nickname || '---',
                    livesUsed: d.livesUsed || 0
                })
                if (docSnap.id === u.uid) {
                    userRank.value = rank
                }
                rank++
            })
            // Se não está no top 10, buscar a posição do usuário
            if (!userRank.value) {
                const allQ = query(collection(db, 'users'), orderBy('livesUsed', 'desc'))
                const allSnap = await getDocs(allQ)
                let r = 1
                allSnap.forEach((docSnap) => {
                    if (docSnap.id === u.uid) userRank.value = r
                    r++
                })
            }
        }
    })
})

// Modal e lógica de resgate de key
const showModal = ref(false)
const keyInput = ref('')
const loading = ref(false)
const redeemMessage = ref('')
const redeemSuccess = ref(false)

// Modal de criar key
const showCreateKeyModal = ref(false)
const newKeyValue = ref('')
const createKeyMessage = ref('')
const createKeyLoading = ref(false)
const createKeySuccess = ref(false)

// Gera código aleatório LUNAR-XXXXXXXXXXXX
function generateKeyCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 12; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `LUNAR-${code}`
}

function openModal() {
    showModal.value = true
    keyInput.value = ''
    redeemMessage.value = ''
    redeemSuccess.value = false
}
function closeModal() {
    showModal.value = false
}
function openCreateKeyModal() {
    showCreateKeyModal.value = true
    newKeyValue.value = ''
    createKeyMessage.value = ''
    createKeySuccess.value = false
}
function closeCreateKeyModal() {
    showCreateKeyModal.value = false
}

async function redeemKey() {
    redeemMessage.value = ''
    redeemSuccess.value = false
    loading.value = true
    const key = keyInput.value.trim()
    if (!key) {
        redeemMessage.value = 'Enter a valid key.'
        loading.value = false
        return
    }
    try {
        const keyRef = doc(db, 'keys', key)
        const keySnap = await getDoc(keyRef)
        if (!keySnap.exists()) {
            redeemMessage.value = 'Key invalid or already used.'
            loading.value = false
            return
        }
        const value = keySnap.data().value ?? 0
        // Atualiza saldo do usuário
        const userRef = doc(db, 'users', user.value.uid)
        await updateDoc(userRef, { balance: balance.value + value })
        // Remove a key
        await deleteDoc(keyRef)
        // Atualiza saldo local
        balance.value += value
        redeemMessage.value = `Key redeemed! Value: R$ ${value.toFixed(2)}`
        redeemSuccess.value = true
        keyInput.value = ''
    } catch (e) {
        redeemMessage.value = 'Error redeeming key: ' + (e.message || e.code || e);
    }
    loading.value = false
}

// Função para criar key (admin)
async function createKey() {
    createKeyMessage.value = ''
    createKeySuccess.value = false
    createKeyLoading.value = true
    const value = Number(newKeyValue.value)
    if (!value || value <= 0) {
        createKeyMessage.value = 'Preencha um valor válido.'
        createKeyLoading.value = false
        return
    }
    try {
        const keyId = generateKeyCode()
        const keyRef = doc(db, 'keys', keyId)
        await setDoc(keyRef, { value })
        // Copia para a área de transferência
        await navigator.clipboard.writeText(keyId)
        createKeyMessage.value = `Key criada com sucesso: ${keyId}`
        createKeySuccess.value = true
        newKeyValue.value = ''
    } catch (e) {
        createKeyMessage.value = 'Erro ao criar key: ' + (e.message || e.code || e)
    }
    createKeyLoading.value = false
}

function copyEmail() {
    if (user.value?.email) {
        navigator.clipboard.writeText(user.value.email)
        copied.value = true
        setTimeout(() => (copied.value = false), 1200)
    }
}

async function saveNickname() {
    nicknameError.value = ''
    const nick = nicknameInput.value.trim()
    if (!nick || nick.length < 3) {
        nicknameError.value = 'Nickname must be at least 3 characters.'
        return
    }
    // Se o nickname já é o do usuário, não precisa atualizar
    if (nickname.value && nickname.value.toLowerCase() === nick.toLowerCase()) {
        showNicknameModal.value = false
        return
    }
    // Verifica se já existe (em outro usuário)
    if (await isNicknameTaken(nick)) {
        nicknameError.value = 'This nickname is already in use.'
        return
    }
    try {
        await updateDoc(doc(db, 'users', user.value.uid), {
            nickname: nick,
            nicknameLower: nick.toLowerCase()
        })
        nickname.value = nick
        showNicknameModal.value = false
    } catch (e) {
        nicknameError.value = 'Error saving nickname.'
    }
}
</script>
