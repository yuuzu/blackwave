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

        <!-- Gerenciar Usuário -->
        <div class="bg-[#151515] rounded-2xl p-6">
            <h2 class="text-lg font-semibold mb-4">Manage user</h2>
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
                            <div class="text-xs text-gray-400">{{ userData.admin ? 'Administrator' : 'Common' }} User
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-400 mb-1">Balance</div>
                        <div
                            class="text-2xl font-bold bg-gradient-to-r from-[#576784] via-[#6F7C95] to-[#8792A7] inline-block text-transparent bg-clip-text">
                            R$ {{ userData.balance?.toFixed(2) ?? '0.00' }}
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
        await updateDoc(userDoc.ref, { admin: true })
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
        await updateDoc(userDocRef.value, { admin: false })
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

async function fetchUser() {
    userMessage.value = ''
    userSuccess.value = false
    userData.value = null
    userDocRef.value = null
    loadingUser.value = true
    try {
        const q = query(collection(db, 'users'), where('email', '==', manageEmail.value))
        const snap = await getDocs(q)
        if (snap.empty) {
            userMessage.value = 'Usuário not found.'
            loadingUser.value = false
            return
        }
        userDocRef.value = snap.docs[0].ref
        userData.value = snap.docs[0].data()
        newBalance.value = userData.value.balance
        // Adicione este trecho aqui:
        if (userData.value.reseller) {
            newResellerBalance.value = userData.value.resellerBalance ?? 0
        }
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