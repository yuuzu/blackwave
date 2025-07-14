<template>
    <div class="w-full mx-auto pt-20 md:pt-12 px-2 md:px-16">
        <h1 class="font-semibold text-[19px] md:text-[21px] text-[#FAFAFA] mb-4 px-16 md:px-0 md:mb-0">Account Information</h1>
    </div>
    <div class="w-full mx-auto pt-4 px-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <!-- Saldo -->
            <div
                class="bg-[#1b273d]/60 rounded-3xl p-6 flex flex-col justify-between shadow border border-[#243451]/40">
                <div class="flex items-center gap-2 mb-2">
                    <Icon name="mdi:wallet" class="text-[#576784]" size="28" />
                    <span class="font-semibold text-lg text-white">Balance</span>
                </div>
                <div class="text-3xl font-bold text-[#FAFAFA]">R$ {{ balance?.toFixed(2) ?? '0.00' }}</div>
                <div class="text-sm text-[#b8b8b8] mt-2">Your current balance</div>
            </div>
            <!-- Lives usadas -->
            <div
                class="bg-[#1b273d]/60 rounded-3xl p-6 flex flex-col justify-between shadow border border-[#243451]/40">
                <div class="flex items-center gap-2 mb-2">
                    <Icon name="mdi:heart-pulse" class="text-[#576784]" size="28" />
                    <span class="font-semibold text-lg text-white">Lives taken</span>
                </div>
                <div class="text-3xl font-bold text-[#fafafa]">{{ livesUsed }}</div>
                <div class="text-sm text-[#b8b8b8] mt-2">Total lives taken</div>
            </div>
            <!-- Cartões comprados -->
            <div
                class="bg-[#1b273d]/60 rounded-3xl p-6 flex flex-col justify-between shadow border border-[#243451]/40">
                <div class="flex items-center gap-2 mb-2">
                    <Icon name="mdi:credit-card" class="text-[#576784]" size="28" />
                    <span class="font-semibold text-lg text-white">Purchased cards</span>
                </div>
                <div class="text-3xl font-bold text-[#fafafa]">{{ cardsBought }}</div>
                <div class="text-sm text-[#b8b8b8] mt-2">Total cards purchased</div>
            </div>
            <!-- Email com botão copiar -->
            <div
                class="bg-[#1b273d]/60 rounded-3xl p-6 flex flex-col justify-between shadow border border-[#243451]/40">
                <div class="flex items-center gap-2 mb-2">
                    <Icon name="mdi:email" class="text-[#576784]" size="28" />
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
            <div class="bg-[#111111] rounded-2xl p-6 shadow flex flex-col gap-2">
                <div class="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="mdi:chart-bar" class="text-[#576784]" size="22" />
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
            <div class="bg-[#111111] rounded-2xl p-6 shadow flex flex-col gap-2">
                <div class="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="mdi:bullhorn" class="text-[#576784]" size="22" />
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
            <div class="bg-[#111111] rounded-2xl p-6 shadow flex flex-col gap-2">
                <div class="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="mdi:account-check" class="text-[#576784]" size="22" />
                    Account status
                    <Beta class="-mb-1"></Beta>
                </div>
                <div class="flex items-center gap-2">
                    <span class="px-3 py-1 rounded-full font-bold" :class="{
                        // Admin: Roxo principal do site
                        'bg-[#a78bfa]/20 text-[#a78bfa] border border-[#a78bfa]/40': accountStatus === 'Administrator',
                        // Reseller: Vermelho
                        'bg-[#530f0f]/30 text-red-400 border border-[#530f0f]/60': accountStatus === 'Reseller',
                        // Premium: Azul do site
                        'bg-[#1b273d]/60 text-[#8F9DB6] border border-[#576784]/40': accountStatus === 'Premium',
                        // Common: Cinza escuro
                        'bg-[#232323] text-[#fafafa] border border-[#232323]': accountStatus === 'Common',
                        // Blocked: Vermelho
                        'bg-red-900/30 text-red-400 border border-red-400/30': accountStatus === 'Blocked'
                    }">
                        {{ accountStatus }}
                    </span>
                    <span v-if="accountStatus === 'Blocked'" class="text-xs text-red-400 font-semibold">Contact
                        support.</span>
                </div>
            </div>
            <!-- Revendedores Verificados -->
            <div class="bg-[#111111] rounded-2xl p-6 shadow flex flex-col gap-2">
                <div class="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="mdi:account-cash" class="text-[#576784]" size="22" />
                    Verified Resellers
                </div>
                <ul class="text-sm text-[#d4d4d4] space-y-2">
                    <li>
                        <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener"
                            class="flex items-center gap-2 hover:text-[#576784] transition">
                            <Icon name="mdi:telegram" class="text-[#576784]" size="18" />
                            @yuzuuk1
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/ruddyoz" target="_blank" rel="noopener"
                            class="flex items-center gap-2 hover:text-[#576784] transition">
                            <Icon name="mdi:telegram" class="text-[#576784]" size="18" />
                            @ruddyoz
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/chipeogod" target="_blank" rel="noopener"
                            class="flex items-center gap-2 hover:text-[#576784] transition">
                            <Icon name="mdi:telegram" class="text-[#576784]" size="18" />
                            @chipeogod
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/Mbuu28" target="_blank" rel="noopener"
                            class="flex items-center gap-2 hover:text-[#576784] transition">
                            <Icon name="mdi:telegram" class="text-[#576784]" size="18" />
                            @Mbuu28
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore'

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
        redeemMessage.value = 'Digite uma key válida.'
        loading.value = false
        return
    }
    try {
        const keyRef = doc(db, 'keys', key)
        const keySnap = await getDoc(keyRef)
        if (!keySnap.exists()) {
            redeemMessage.value = 'Key inválida ou já utilizada.'
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
        redeemMessage.value = `Key resgatada! Valor: R$ ${value.toFixed(2)}`
        redeemSuccess.value = true
        keyInput.value = ''
    } catch (e) {
        redeemMessage.value = 'Erro ao resgatar key: ' + (e.message || e.code || e);
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
</script>
