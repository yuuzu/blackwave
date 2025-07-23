<template>
    <div class="max-w-3xl mx-auto mt-12 bg-[#111111] rounded-2xl shadow-xl p-8 text-white font-satoshi">
        <h1 class="text-3xl font-bold mb-8 flex items-center gap-2">
            <Icon name="material-symbols:admin-panel-settings-rounded" class="text-[#576784]" size="40" />
            Admin Panel
        </h1>

        <!-- Adicionar Admin -->
        <div class="mb-10">
            <h2 class="text-lg font-semibold mb-2">Add an administrator</h2>
            <div class="flex gap-2">
                <input v-model="adminEmail" type="email" placeholder="User email"
                    class="rounded-lg px-4 py-2 bg-[#1a1a1a] border-2 border-[#202020] text-[#FAFAFA] outline-none w-full" />
                <TertiaryB @click="addAdmin" :disabled="loadingAdmin">
                    {{ loadingAdmin ? 'Adding...' : 'Confirm' }}
                </TertiaryB>
            </div>
            <div v-if="adminMessage" :class="adminSuccess ? 'text-green-400' : 'text-red-400'" class="mt-2 text-sm">
                <Icon name="mdi:alert-circle"></Icon>
                {{ adminMessage }}
            </div>
        </div>

        <!-- Adicionar Reseller -->
        <div class="mb-10">
            <h2 class="text-lg font-semibold mb-2">Add a reseller</h2>
            <div class="flex gap-2">
                <input v-model="resellerEmail" type="email" placeholder="User email"
                    class="rounded-lg px-4 py-2 bg-[#1a1a1a] border-2 border-[#202020] text-[#FAFAFA] outline-none w-full" />
                <TertiaryB @click="addReseller" :disabled="loadingReseller">
                    {{ loadingReseller ? 'Adding...' : 'Confirm' }}
                </TertiaryB>
            </div>
            <div v-if="resellerMessage" :class="resellerSuccess ? 'text-green-400' : 'text-red-400'"
                class="mt-2 text-sm">
                <Icon name="mdi:alert-circle"></Icon>
                {{ resellerMessage }}
            </div>
        </div>
        <h2 class="text-lg font-semibold mb-2">Search transaction ID</h2>
        <div class="w-full mb-4 flex flex-row gap-2">
            <input v-model="searchTransactionId" type="text" placeholder="Transaction ID"
                class="rounded-lg px-4 py-2 bg-[#1a1a1a] border-2 border-[#202020] text-[#FAFAFA] outline-none w-full" />
            <TertiaryB @click="searchTransaction">
                Confirm
            </TertiaryB>
        </div>

        <!-- Gerenciar Usuário -->
        <h2 class="text-lg font-semibold mb-4">Manage user</h2>
        <div class="bg-[#151515] rounded-2xl p-6">
            <div class="flex gap-2 mb-4">
                <input v-model="manageEmail" type="email" placeholder="User email"
                    class="rounded-lg px-4 py-2 bg-[#0c0c0c] border-2 border-[#202020] text-[#FAFAFA] outline-none w-full" />
                <TertiaryB @click="fetchUser" :disabled="loadingUser">
                    {{ loadingUser ? 'Searching...' : 'Search' }}
                </TertiaryB>
            </div>
            <div v-if="userData" class="flex flex-col md:flex-row gap-6">
                <!-- Card de usuário -->
                <div class="flex-1 bg-[#0c0c0c] rounded-xl p-6 flex flex-col gap-4 shadow">
                    <div class="flex items-center gap-3">
                        <Icon name="mdi:account-circle" size="40" class="text-[#576784]" />
                        <div>
                            <div class="font-bold text-lg">{{ userData.email }}</div>
                            <div class="text-xs text-gray-400">{{ userData.admin ? 'Administrator' : 'Common' }}
                                User
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-400 mb-1">Balance</div>
                        <div
                            class="text-2xl font-bold bg-gradient-to-r from-[#576784] via-[#6F7C95] to-[#8792A7] inline-block text-transparent bg-clip-text">
                            R$ {{ userData.balance?.toFixed(2) ?? '0.00' }}
                        </div>
                        <div v-if="lastTransactionId" class="mt-2">
                            <span class="text-xs text-gray-400">Last purchase ID: </span>
                            <span class="text-xs text-[#8591a5] font-mono">{{ lastTransactionId }}</span>
                        </div>
                    </div>
                </div>
                <!-- Ações -->
                <div class="flex-1 flex flex-col gap-4 justify-center">
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">New balance</label>
                        <div class="flex gap-2">
                            <input v-model="newBalance" type="number" min="0" placeholder="New balance"
                                class="rounded-lg px-3 py-2 bg-[#0c0c0c] text-[#fafafa] outline-none w-full" />
                            <TertiaryB @click="updateBalance" :disabled="loadingAction">
                                Confirm
                            </TertiaryB>
                        </div>
                    </div>
                    <div v-if="userData?.reseller" class="mt-4">
                        <label class="block text-xs text-gray-400 mb-1">Reseller Balance</label>
                        <div class="flex gap-2">
                            <input v-model="newResellerBalance" type="number" min="0" placeholder="New reseller balance"
                                class="rounded-lg px-3 py-2 bg-[#0c0c0c] text-[#fafafa] outline-none w-full" />
                            <TertiaryB @click="updateResellerBalance" :disabled="loadingAction">
                                Confirm
                            </TertiaryB>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Permissions</label>
                        <div class="flex gap-2">
                            <TertiaryB v-if="!userData.admin" @click="addAdminToUser" :disabled="loadingAction"
                                class="w-full">
                                Make admin
                            </TertiaryB>
                            <TertiaryB v-else @click="removeAdminFromUser" :disabled="loadingAction"
                                class="w-full bg-[#530f0f] border-[#750c0c] hover:border-[#8c0a0a] text-white">
                                Remove admin
                            </TertiaryB>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Password</label>
                        <TertiaryB @click="resetPassword" :disabled="loadingAction" class="w-full">
                            Send reset link
                        </TertiaryB>
                    </div>
                </div>
            </div>
            <div v-if="userMessage" :class="userSuccess ? 'text-green-400' : 'text-red-400'" class="mt-4 text-sm">
                <Icon name="mdi:alert-circle"></Icon>
                {{ userMessage }}
            </div>
            <transition name="modal-fade">
                <div v-if="showBoughtModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
                    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                    <transition name="modal-zoom">
                        <div class="relative bg-[#0a0a0a] rounded-3xl p-8 w-full max-w-md flex flex-col gap-6 shadow-2xl border border-[#232323]/30"
                            v-if="showBoughtModal">
                            <button @click="showBoughtModal = false"
                                class="absolute top-4 right-4 text-[#8591a5] hover:text-white text-2xl transition">
                                <Icon name="mdi:close" />
                            </button>
                            <div class="flex flex-col items-center">
                                <Icon name="material-symbols:check-circle-rounded" size="48" class="text-[#8591a5]" />
                                <h2 class="text-2xl font-bold mb-2 text-white">Purchase Details</h2>
                                <p class="text-[#8591a5] text-sm text-center">See your purchase details below</p>
                            </div>
                            <div class="flex flex-col gap-2 bg-[#181818] rounded-xl p-4">
                                <span class="text-[#fafafa] text-base font-bold">Product:</span>
                                <span class="text-[#b8b8b8] break-all">{{ boughtModalData.product }}</span>
                                <span class="text-[#fafafa] text-base font-bold">Product ID:</span>
                                <span class="text-[#b8b8b8] break-all">{{ boughtModalData.productId }}</span>
                                <span class="text-[#fafafa] text-base font-bold">Amount:</span>
                                <span class="text-[#b8b8b8] break-all">R$ {{ boughtModalData.amount }}</span>
                                <span class="text-[#fafafa] text-base font-bold">Buyer:</span>
                                <span class="text-[#b8b8b8] break-all">{{ boughtModalData.buyer }}</span>
                                <span class="text-[#fafafa] text-base font-bold">Date:</span>
                                <span class="text-[#b8b8b8]">{{ boughtModalData.createdAt }}</span>
                                <span class="text-[#fafafa] text-base font-bold">Transaction ID:</span>
                                <span class="text-[#8591a5] font-mono text-xs">{{ boughtModalData.transactionId
                                    }}</span>
                            </div>
                            <div class="flex flex-row gap-2 mt-2">
                                <TertiaryB @click="showBoughtModal = false"
                                    class="bg-[#530f0f] border-[#750c0c] hover:border-[#8c0a0a] text-white flex-1">Close
                                </TertiaryB>
                            </div>
                        </div>
                    </transition>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '~/firebase'
import { doc, getDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '~/firebase'

const resellerEmail = ref('')
const resellerMessage = ref('')
const resellerSuccess = ref(false)
const loadingReseller = ref(false)
const newResellerBalance = ref('')
const showBoughtModal = ref(false)
const boughtModalData = ref({
    product: '',
    amount: '',
    buyer: '',
    createdAt: '',
    transactionId: '',
    productId: ''
})

const searchTransactionId = ref('')

// Busca transação pelo ID e exibe no modal
async function searchTransaction() {
    if (!searchTransactionId.value) return
    const transactionDoc = await getDoc(doc(db, 'transactionId', searchTransactionId.value.trim()))
    if (!transactionDoc.exists()) {
        alert('Transaction not found!')
        return
    }
    const data = transactionDoc.data()
    boughtModalData.value = {
        product: data.product ?? '',
        amount: data.amount ?? '',
        buyer: data.buyer ?? '',
        createdAt: data.createdAt ?? '',
        transactionId: searchTransactionId.value.trim(),
        productId: data.productId ?? ''
    }
    showBoughtModal.value = true
}

async function addReseller() {
    resellerMessage.value = ''
    resellerSuccess.value = false
    loadingReseller.value = true
    try {
        const q = query(collection(db, 'users'), where('email', '==', resellerEmail.value))
        const snap = await getDocs(q)
        if (snap.empty) {
            resellerMessage.value = 'User not found.'
            loadingReseller.value = false
            return
        }
        const userDoc = snap.docs[0]
        await updateDoc(userDoc.ref, { reseller: true, resellerBalance: 0, status: 'Reseller' })
        resellerMessage.value = 'Reseller added successfully!'
        resellerSuccess.value = true
        resellerEmail.value = ''
    } catch (e) {
        resellerMessage.value = 'Error adding reseller.'
    }
    loadingReseller.value = false
}

async function updateResellerBalance() {
    if (!userDocRef.value) return
    userMessage.value = ''
    userSuccess.value = false
    loadingAction.value = true
    try {
        await updateDoc(userDocRef.value, { resellerBalance: Number(newResellerBalance.value) })
        userData.value.resellerBalance = Number(newResellerBalance.value)
        userMessage.value = 'Reseller balance changed successfully!'
        userSuccess.value = true
    } catch (e) {
        userMessage.value = 'Error changing reseller balance.'
    }
    loadingAction.value = false
}

const router = useRouter()

onMounted(async () => {
    const user = auth.currentUser
    if (!user) {
        router.push('/dashboard')
        return
    }
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (!userDoc.exists() || !userDoc.data().admin) {
        router.push('/dashboard')
    }
})

// Adicionar admin (por email)
const adminEmail = ref('')
const adminMessage = ref('')
const adminSuccess = ref(false)
const loadingAdmin = ref(false)

async function addAdmin() {
    adminMessage.value = ''
    adminSuccess.value = false
    loadingAdmin.value = true
    try {
        const q = query(collection(db, 'users'), where('email', '==', adminEmail.value))
        const snap = await getDocs(q)
        if (snap.empty) {
            adminMessage.value = 'User not found.'
            loadingAdmin.value = false
            return
        }
        const userDoc = snap.docs[0]
        await updateDoc(userDoc.ref, { admin: true, status: 'Administrator' })
        adminMessage.value = 'Admin added successfully!'
        adminSuccess.value = true
        adminEmail.value = ''
    } catch (e) {
        adminMessage.value = 'Error adding admin.'
    }
    loadingAdmin.value = false
}

async function removeAdminFromUser() {
    if (!userDocRef.value) return
    userMessage.value = ''
    userSuccess.value = false
    loadingAction.value = true
    try {
        await updateDoc(userDocRef.value, { admin: false, status: 'Common' })
        userData.value.admin = false
        userMessage.value = 'User removed from admin!'
        userSuccess.value = true
    } catch (e) {
        userMessage.value = 'Error removing admin.'
    }
    loadingAction.value = false
}

// Gerenciar usuário
const manageEmail = ref('')
const userData = ref(null)
const userDocRef = ref(null)
const userMessage = ref('')
const userSuccess = ref(false)
const loadingUser = ref(false)
const loadingAction = ref(false)
const newBalance = ref('')
const lastTransactionId = ref('')

async function fetchUser() {
    userMessage.value = ''
    userSuccess.value = false
    userData.value = null
    userDocRef.value = null
    lastTransactionId.value = ''
    loadingUser.value = true
    try {
        const q = query(collection(db, 'users'), where('email', '==', manageEmail.value))
        const snap = await getDocs(q)
        if (snap.empty) {
            userMessage.value = 'User not found.'
            loadingUser.value = false
            return
        }
        userDocRef.value = snap.docs[0].ref
        userData.value = snap.docs[0].data()
        newBalance.value = userData.value.balance
        if (userData.value.reseller) {
            newResellerBalance.value = userData.value.resellerBalance ?? 0
        }
        // Busca o id da última transação diretamente do documento do usuário
        lastTransactionId.value = userData.value.lastTransactionId || ''
        userSuccess.value = true
    } catch (e) {
        userMessage.value = 'Error when searching for user.'
    }
    loadingUser.value = false
}

async function updateBalance() {
    if (!userDocRef.value) return
    userMessage.value = ''
    userSuccess.value = false
    loadingAction.value = true
    try {
        await updateDoc(userDocRef.value, { balance: Number(newBalance.value) })
        userData.value.balance = Number(newBalance.value)
        userMessage.value = 'Balance changed successfully!'
        userSuccess.value = true
    } catch (e) {
        userMessage.value = 'Error changing balance.'
    }
    loadingAction.value = false
}

async function addAdminToUser() {
    if (!userDocRef.value) return
    userMessage.value = ''
    userSuccess.value = false
    loadingAction.value = true
    try {
        await updateDoc(userDocRef.value, { admin: true })
        userData.value.admin = true
        userMessage.value = 'User is now admin!'
        userSuccess.value = true
    } catch (e) {
        userMessage.value = 'Error making admin.'
    }
    loadingAction.value = false
}

async function resetPassword() {
    if (!userData.value?.email) return
    userMessage.value = ''
    userSuccess.value = false
    loadingAction.value = true
    try {
        await sendPasswordResetEmail(auth, userData.value.email)
        userMessage.value = 'Password reset email sent!'
        userSuccess.value = true
    } catch (e) {
        userMessage.value = 'Error sending password reset.'
    }
    loadingAction.value = false
}
</script>