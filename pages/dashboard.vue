<template>
    <div class="min-h-screen flex flex-col md:flex-row bg-[#0e0e0e] text-white font-satoshi">
        <!-- Mobile Header -->
        <header
            class="md:hidden flex items-center rounded-full justify-between mx-2 my-2 px-4 py-3 bg-[#101010]/70 backdrop-blur-md shadow z-20 fixed top-0 left-0 right-0">
            <div class="flex items-center gap-2">
                <a href="/" class="flex items-center gap-2">
                    <Icon name="basil:moon-solid" size="40px" class="text-[#576784]" />
                    <span class="font-bold text-2xl">lunarcntr.xyz</span>
                </a>
            </div>
            <button @click="showMobileMenu = !showMobileMenu" class="focus:outline-none">
                <Icon :name="showMobileMenu ? 'mdi:close' : 'mdi:menu'" size="32px" />
            </button>
        </header>
        <!-- Mobile Menu Drawer -->
        <transition name="fade">
            <aside v-if="showMobileMenu" class="fixed inset-0 z-30 bg-black/70 flex md:hidden">
                <div class="w-64 bg-[#101010]/70 backdrop-blur-md h-full p-6 flex flex-col gap-4">
                    <!-- Logo -->
                    <div class="flex items-center gap-2 mb-8 px-2">
                        <Icon name="basil:moon-solid" size="40px" class="text-[#576784]" />
                        <span class="font-bold text-2xl">lunarcntr.xyz</span>
                    </div>
                    <!-- Menu -->
                    <nav class="flex flex-col gap-2">
                        <button @click="toggleAccount"
                            class="flex items-center w-full px-3 py-2 rounded-full transition font-semibold duration-300 out-in"
                            :class="accountOpen ? 'bg-[#313442]' : 'hover:bg-[#292c38]'">
                            <Icon name="mdi:account-circle" class="mr-2" size="24.5px" />
                            <p class="text-[17.3px]">Account</p>
                            <Icon :name="accountOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="ml-auto" />
                        </button>
                        <transition name="fade">
                            <div v-if="accountOpen" class="ml-8 flex flex-col gap-1 mt-1">
                                <NuxtLink to="/dashboard" exact-active-class="text-[#CCCCCC]"
                                    class="text-[15px] text-[#949494] hover:text-[#bbbbbb] duration-300 out-in"
                                    @click="showMobileMenu = false">Overview
                                </NuxtLink>
                                <NuxtLink to="/dashboard/results" active-class="text-[#CCCCCC]"
                                    class="text-[15px] text-[#949494] hover:text-[#bbbbbb] duration-300 out-in"
                                    @click="showMobileMenu = false">
                                    Historical</NuxtLink>
                                <NuxtLink to="/dashboard/settings" active-class="text-[#CCCCCC]"
                                    class="text-[15px] text-[#949494] hover:text-[#bbbbbb] duration-300 out-in"
                                    @click="showMobileMenu = false">Settings
                                </NuxtLink>
                            </div>
                        </transition>
                        <NuxtLink to="/dashboard/store" exact-active-class="text-[#fafafa] font-bold bg-[#313442]"
                            class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in"
                            @click="showMobileMenu = false">
                            <Icon name="mdi:cart" class="mr-2" size="24px" />
                            <p class="text-[17.3px] font-bold">Store</p>
                        </NuxtLink>
                        <NuxtLink to="/dashboard/checker" exact-active-class="text-[#fafafa] font-bold bg-[#313442]"
                            class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in"
                            @click="showMobileMenu = false">
                            <Icon name="mdi:credit-card" class="mr-2" size="24px" />
                            <p class="text-[17.3px] font-bold">Checker</p>
                        </NuxtLink>
                        <NuxtLink to="/dashboard/reseller" exact-active-class="text-[#fafafa] font-bold bg-[#313442]"
                            v-if="user?.reseller"
                            class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in"
                            @click="showMobileMenu = false">
                            <Icon name="mdi:account-cash" class="mr-2" size="24px" />
                            <p class="text-[17.3px] font-bold">Reseller</p>
                        </NuxtLink>
                        <div v-if="isAdmin">
                            <NuxtLink to="/dashboard/admin" active-class="text-[#fafafa] bg-[#313442] font-bold"
                                class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in"
                                @click="showMobileMenu = false">
                                <Icon name="material-symbols:admin-panel-settings-rounded" class="mr-2" size="24px" />
                                <p class="text-[17.3px] font-bold">Admin</p>
                            </NuxtLink>
                        </div>
                    </nav>
                    <!-- Ajuda e página -->
                    <div class="mt-8 flex flex-col gap-2 px-2">
                        <a href="#"
                            class="bg-[#313442] hover:bg-[#292c38] duration-300 out-in rounded-lg py-2 px-3 flex items-center gap-2 text-[#FAFAFA] font-semibold justify-center">
                            <Icon name="mdi:help-circle-outline" /> Help Center
                        </a>
                        <a href="#"
                            class="bg-[#313442] hover:bg-[#292c38] duration-300 out-in rounded-lg py-2 px-3 flex items-center gap-2 font-semibold justify-center">
                            <Icon name="mdi:link-variant" /> Free Checker
                        </a>
                    </div>
                    <!-- Share/Profile -->
                    <div class="flex flex-col gap-2 px-2 mt-4">
                        <button v-if="isAdmin"
                            class="bg-[#313442] hover:bg-[#292c38] duration-300 out-in rounded-lg py-2 px-3 flex items-center gap-2 font-semibold justify-center"
                            @click="openCreateKeyModal">
                            <Icon name="mdi:key-plus" /> Create Key
                        </button>
                        <button
                            class="bg-[#313442] hover:bg-[#292c38] duration-300 out-in rounded-lg py-2 px-3 flex items-center gap-2 font-semibold justify-center"
                            @click="openModal">
                            <Icon name="mingcute:gift-fill" /> Redeem Key
                        </button>
                        <div class="flex items-center gap-2 mt-2">
                            <img :src="photoURL" class="rounded-full w-10 h-10 object-cover" />
                            <div>
                                <div class="font-bold truncate max-w-[120px]">
                                    {{ user?.email || 'Usuário' }}
                                </div>
                                <div class="text-xs text-gray-400">
                                    Balance: <span class="font-semibold text-white">R$ {{ balance.toFixed(2) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1" @click="showMobileMenu = false"></div>
            </aside>
        </transition>
        <!-- Sidebar -->
        <aside
            class="hidden md:flex w-72 min-h-screen bg-[#0e0e0e] rounded-r-[48px] flex-col justify-between py-6 px-4">
            <div>
                <!-- Logo -->
                <div class="flex items-center gap-2 mb-8 px-2">
                    <a href="/" class="flex items-center gap-2">
                        <Icon name="basil:moon-solid" size="40px" class="text-[#576784]" />
                        <span class="font-bold text-2xl">lunarcntr.xyz</span>
                    </a>
                </div>
                <!-- Menu -->
                <nav class="flex flex-col gap-2">
                    <!-- Account Dropdown -->
                    <div>
                        <button @click="toggleAccount"
                            class="flex items-center w-full px-3 py-2 rounded-full transition font-semibold duration-300 out-in"
                            :class="accountOpen ? 'bg-[#313442]' : 'hover:bg-[#292c38]'">
                            <Icon name="mdi:account-circle" class="mr-2" size="24.5px" />
                            <p class="text-[17.3px]">Account</p>
                            <Icon :name="accountOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="ml-auto" />
                        </button>
                        <transition name="fade">
                            <div v-if="accountOpen" class="ml-12 flex flex-col gap-1 mt-1">
                                <NuxtLink to="/dashboard" exact-active-class="text-[#CCCCCC]"
                                    class="text-[15px] text-[#949494] hover:text-[#bbbbbb] duration-300 out-in">Overview
                                </NuxtLink>
                                <NuxtLink to="/dashboard/results" active-class="text-[#CCCCCC]"
                                    class="text-[15px] text-[#949494] hover:text-[#bbbbbb] duration-300 out-in">
                                    Historical</NuxtLink>
                                <NuxtLink to="/dashboard/settings" active-class="text-[#CCCCCC]"
                                    class="text-[15px] text-[#949494] hover:text-[#bbbbbb] duration-300 out-in">Settings
                                </NuxtLink>
                            </div>
                        </transition>
                    </div>
                    <!-- Store -->
                    <NuxtLink to="/dashboard/store" exact-active-class="text-[#fafafa] font-bold bg-[#313442]"
                        class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in">
                        <Icon name="mdi:cart" class="mr-2" size="24px" />
                        <p class="text-[17.3px] font-bold">Store</p>
                    </NuxtLink>
                    <!-- Results -->
                    <NuxtLink to="/dashboard/checker" exact-active-class="text-[#fafafa] font-bold bg-[#313442]"
                        class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in">
                        <Icon name="mdi:credit-card" class="mr-2" size="24px" />
                        <p class="text-[17.3px] font-bold">Checker</p>
                    </NuxtLink>
                    <!-- Reseller -->
                    <NuxtLink to="/dashboard/reseller" exact-active-class="text-[#fafafa] font-bold bg-[#313442]"
                        v-if="user?.reseller"
                        class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in">
                        <Icon name="mdi:account-cash" class="mr-2" size="24px" />
                        <p class="text-[17.3px] font-bold">Reseller</p>
                    </NuxtLink>
                    <!-- Admin -->
                    <div v-if="isAdmin">
                        <NuxtLink to="/dashboard/admin" active-class="text-[#fafafa] bg-[#313442] font-bold"
                            class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in">
                            <Icon name="material-symbols:admin-panel-settings-rounded" class="mr-2" size="24px" />
                            <p class="text-[17.3px] font-bold">Admin</p>
                        </NuxtLink>
                    </div>
                    <!-- Keys -->
                    <div v-if="isAdmin">
                        <NuxtLink to="/dashboard/keys" active-class="text-[#fafafa] bg-[#313442] font-bold"
                            class="flex items-center px-3 py-2 rounded-full hover:bg-[#323232] duration-300 out-in">
                            <Icon name="ic:baseline-vpn-key" class="mr-2" size="24px" />
                            <p class="text-[17.3px] font-bold">Keys</p>
                        </NuxtLink>
                    </div>
                </nav>
                <!-- Ajuda e página -->
                <div class="mt-8 flex flex-col gap-2 px-2">
                    <a href="https://t.me/lunaroficial" target="_blank"
                        class="bg-[#313442] hover:bg-[#292c38] duration-300 out-in rounded-lg py-2 px-3 flex items-center gap-2 text-[#FAFAFA] font-semibold justify-center">
                        <Icon name="mdi:help-circle-outline" /> Help Center
                    </a>
                    <a href="https://lunarchk.vercel.app/" target="_blank"
                        class="bg-[#313442] hover:bg-[#292c38] duration-300 out-in rounded-lg py-2 px-3 flex items-center gap-2 font-semibold justify-center">
                        <Icon name="mdi:link-variant" /> Free Checker
                    </a>
                </div>
            </div>
            <!-- Share/Profile -->
            <div class="flex flex-col gap-2 px-2">
                <!-- Botão de criar key para admin -->
                <button v-if="isAdmin"
                    class="bg-[#313442] hover:bg-[#292c38] duration-300 out-in rounded-lg py-2 px-3 flex items-center gap-2 font-semibold justify-center"
                    @click="openCreateKeyModal">
                    <Icon name="mdi:key-plus" /> Create Key
                </button>
                <!-- Botão de resgatar key -->
                <button
                    class="bg-[#313442] hover:bg-[#292c38] duration-300 out-in rounded-lg py-2 px-3 flex items-center gap-2 font-semibold justify-center"
                    @click="openModal">
                    <Icon name="mingcute:gift-fill"></Icon> Redeem Key
                </button>
                <div class="flex items-center gap-2 mt-2">
                    <img :src="photoURL" class="rounded-full w-10 h-10 object-cover" />
                    <div>
                        <div class="font-bold truncate max-w-[120px]">
                            {{ user?.email || 'Usuário' }}
                        </div>
                        <div class="text-xs text-gray-400">
                            Balance: <span class="font-semibold text-white">R$ {{ balance.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <!-- Main Content -->
        <main class="flex-1 min-h-screen bg-[#0a0a0a] font-satoshi pt-16 md:pt-0">
            <!-- Overview Cards -->

            <!-- Conteúdo principal da página -->
            <NuxtPage />
        </main>

        <!-- Modal de Resgatar Key -->
        <transition name="modal-fade">
            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <transition name="modal-zoom">
                    <div class="relative bg-[#0a0a0a] rounded-3xl p-10 w-full max-w-md flex flex-col gap-6 shadow-2xl border border-[#0e0e0e]/30"
                        v-if="showModal">
                        <button @click="closeModal"
                            class="absolute top-4 right-4 text-[#576784] hover:text-white text-2xl transition">
                            <Icon name="mdi:close" />
                        </button>
                        <div class="flex flex-col items-center gap-2">
                            <Icon name="mingcute:gift-fill" size="48" class="text-[#576784]" />
                            <h2 class="text-2xl font-bold mb-2 text-white">Redeem Key</h2>
                            <p class="text-[#576784] text-sm text-center">Enter your key below to add funds to your
                                account.</p>
                        </div>
                        <input v-model="keyInput" placeholder="Enter your key here"
                            class="rounded-lg px-4 py-3 bg-[#232323] text-[#FAFAFA] outline-none transition" />
                        <PrimaryB @click="redeemKey" :disabled="loading" class="flex items-center justify-center gap-2">
                            <Icon name="mdi:check-bold" /> {{ loading ? 'Redeeming...' : 'Confirm' }}
                        </PrimaryB>
                        <div v-if="redeemMessage" class="text-center text-base flex items-center justify-center gap-2"
                            :class="redeemSuccess ? 'text-green-400' : 'text-red-400'">
                            <Icon :name="redeemSuccess ? 'mdi:check-circle' : 'mdi:alert-circle'" />
                            {{ redeemMessage }}
                        </div>
                    </div>
                </transition>
            </div>
        </transition>

        <!-- Modal de Criar Key (admin) -->
        <transition name="modal-fade">
            <div v-if="showCreateKeyModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <transition name="modal-zoom">
                    <div class="relative bg-[#0a0a0a] rounded-3xl p-10 w-full max-w-lg flex flex-col gap-6 shadow-2xl border border-[#0e0e0e]/30"
                        v-if="showCreateKeyModal">
                        <button @click="closeCreateKeyModal"
                            class="absolute top-4 right-4 text-[#576784] hover:text-white text-2xl transition">
                            <Icon name="mdi:close" />
                        </button>
                        <div class="flex flex-col items-center gap-2">
                            <Icon name="mdi:key-plus" size="48" class="text-[#576784]" />
                            <h2 class="text-2xl font-bold mb-2 text-white">Create Key</h2>
                            <p class="text-[#576784] text-sm text-center">Set the value in BRL. The code will be
                                generated automatically.</p>
                        </div>
                        <input v-model="newKeyValue" min="1" placeholder="Value (R$)"
                            class="rounded-lg px-4 py-3 bg-[#232323] text-[#FAFAFA] outline-none transition" />
                        <PrimaryB @click="createKey" :disabled="createKeyLoading">
                            <Icon name="mdi:check-bold" /> {{ createKeyLoading ? 'Creating...' : 'Create Key' }}
                        </PrimaryB>
                        <div v-if="createKeyMessage"
                            class="text-center text-base flex items-center justify-center gap-2"
                            :class="createKeySuccess ? 'text-green-400' : 'text-red-400'">
                            <Icon :name="createKeySuccess ? 'mdi:check-circle' : 'mdi:alert-circle'" />
                            {{ createKeyMessage }}
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore'
const showMobileMenu = ref(false)

const accountOpen = ref(true)
function toggleAccount() {
    accountOpen.value = !accountOpen.value
}

// Dados do usuário
const user = ref(null)
const balance = ref(0)
const livesUsed = ref(0)
const cardsBought = ref(0)
const photoURL = ref('https://i.imgur.com/qqG1ZOD.jpeg') // Placeholder
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
            let location = {}
            try {
                const res = await fetch('https://ipapi.co/json/')
                location = await res.json()
            } catch (e) {
                location = { error: true }
            }

            // Atualiza o lastLogin no Firestore ao logar
            await updateDoc(doc(db, 'users', u.uid), {
                lastLogin: serverTimestamp(),
                lastLocation: {
                    ip: location.ip ?? null,
                    city: location.city ?? null,
                    country: location.country_name ?? null
                }
            })

            // Busca saldo e dados do Firestore
            const userDoc = await getDoc(doc(db, 'users', u.uid))
            if (userDoc.exists()) {
                const data = userDoc.data()
                balance.value = data.balance ?? 0
                livesUsed.value = data.livesUsed ?? 0
                cardsBought.value = data.cardsBought ?? 0
                isAdmin.value = !!data.admin
                // Adicione esta linha:
                user.value = { ...user.value, reseller: !!data.reseller }
                // Resumo de uso
                checksMonth.value = data.checksMonth ?? 0
                avgSpentWeek.value = data.avgSpentWeek ?? 0
                if (data.lastLogin && typeof data.lastLogin.toDate === 'function') {
                    const date = data.lastLogin.toDate()
                    lastLogin.value = date.toLocaleString('pt-BR')
                } else {
                    lastLogin.value = data.lastLogin ?? ''
                }
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
    for (let i = 0; i < 16; i++) {
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
        const novoSaldo = balance.value + value

        // Busca se é admin
        const userDoc = await getDoc(userRef)
        const isAdminUser = userDoc.exists() && userDoc.data().admin

        await updateDoc(userRef, {
            balance: novoSaldo,
            status: isAdminUser ? 'Administrator' : (novoSaldo > 0 ? 'Premium' : 'Common')
        })

        // Salva a key usada na coleção usedKeys
        await setDoc(doc(db, 'usedKeys', key), {
            keyId: key,
            value: value,
            createdBy: keySnap.data().createdBy ?? null,
            createdByEmail: keySnap.data().createdByEmail ?? null,
            createdAt: keySnap.data().createdAt ?? null,
            usedBy: user.value.uid,
            usedByEmail: user.value.email,
            usedAt: serverTimestamp()
        })

        // Remove a key da coleção keys
        await deleteDoc(keyRef)

        // Atualiza saldo local e status
        balance.value = novoSaldo
        accountStatus.value = isAdminUser ? 'Administrator' : (novoSaldo > 0 ? 'Premium' : 'Common')
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
        await setDoc(doc(db, 'keys', keyId), {
            value: value,
            createdBy: user.value.uid,
            createdByEmail: user.value.email,
            createdAt: serverTimestamp(),
            usedBy: null,
            usedByEmail: null,
            usedAt: null
        })
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    max-height: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    max-height: 500px;
}

/* Animação do modal */
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

/* Zoom suave no conteúdo do modal */
.modal-zoom-enter-active,
.modal-zoom-leave-active {
    transition: all 0.3s cubic-bezier(.4, 2, .6, 1);
}

.modal-zoom-enter-from,
.modal-zoom-leave-to {
    opacity: 0;
    transform: scale(0.85);
}

.modal-zoom-enter-to,
.modal-zoom-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>