<template>
  <div class="w-full mx-auto pt-20 md:pt-8 px-4 sm:px-6 lg:px-10 font-satoshi">
    <div
      class="w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
             shadow-[0_18px_70px_rgba(0,0,0,0.55)] overflow-hidden"
    >
      <!-- Header -->
      <div class="p-6 sm:p-8 border-b border-white/10">
        <div class="flex items-center gap-3">
          <span
            class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <Icon name="material-symbols:admin-panel-settings-rounded" class="text-[#7aa7ff]" size="24" />
          </span>

          <div class="min-w-0">
            <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white">Admin Panel</h1>
            <p class="text-sm text-white/55">Manage users, balances, permissions and transaction lookups.</p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 sm:p-8 space-y-6">
        <!-- Search transaction -->
        <div class="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="mdi:magnify" size="20" class="text-[#7aa7ff]" />
            <h2 class="text-white font-bold">Search transaction ID</h2>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <input
              v-model="searchTransactionId"
              type="text"
              placeholder="Transaction ID"
              class="w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                     focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
            />
            <TertiaryB
              @click="searchTransaction"
              class="sm:w-44 bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 text-white"
            >
              Confirm
            </TertiaryB>
          </div>
        </div>

        <!-- Manage user -->
        <div class="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="mdi:account-cog" size="20" class="text-[#7aa7ff]" />
            <h2 class="text-white font-bold">Manage user</h2>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              v-model="manageEmail"
              type="email"
              placeholder="User email"
              class="w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                     focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
            />
            <TertiaryB
              @click="fetchUser"
              :disabled="loadingUser"
              class="sm:w-44 bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 text-white
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loadingUser ? 'Searching...' : 'Search' }}
            </TertiaryB>
          </div>

          <!-- User Data -->
          <div v-if="userData" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- User card -->
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div class="flex items-center gap-3">
                <Icon name="mdi:account-circle" size="42" class="text-[#7aa7ff]" />
                <div class="min-w-0">
                  <div class="font-black text-white truncate">{{ userData.email }}</div>
                  <div class="text-xs text-white/55">
                    {{ userData.admin ? 'Administrator' : (userData.reseller ? 'Reseller' : 'Common') }}
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <div class="text-xs text-white/55 mb-1">Balance</div>
                <div class="text-2xl font-black text-white">
                  R$ {{ (userData.balance ?? 0).toFixed(2) }}
                </div>

                <div v-if="lastTransactionId" class="mt-2">
                  <span class="text-xs text-white/55">Last purchase ID: </span>
                  <span class="text-xs text-[#7aa7ff] font-mono break-all">{{ lastTransactionId }}</span>
                </div>

                <div v-if="userData.reseller" class="mt-3">
                  <div class="text-xs text-white/55 mb-1">Reseller Balance</div>
                  <div class="text-lg font-black text-white">
                    R$ {{ (userData.resellerBalance ?? 0).toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
              <!-- Balance -->
              <div>
                <label class="block text-xs text-white/55 mb-2">New balance</label>
                <div class="flex gap-2">
                  <input
                    v-model="newBalance"
                    type="number"
                    min="0"
                    placeholder="New balance"
                    class="w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                           focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
                  />
                  <TertiaryB
                    @click="updateBalance"
                    :disabled="loadingAction"
                    class="w-32 bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 text-white
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </TertiaryB>
                </div>
              </div>

              <!-- Reseller Balance -->
              <div v-if="userData?.reseller">
                <label class="block text-xs text-white/55 mb-2">Reseller Balance</label>
                <div class="flex gap-2">
                  <input
                    v-model="newResellerBalance"
                    type="number"
                    min="0"
                    placeholder="New reseller balance"
                    class="w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                           focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
                  />
                  <TertiaryB
                    @click="updateResellerBalance"
                    :disabled="loadingAction"
                    class="w-32 bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 text-white
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </TertiaryB>
                </div>
              </div>

              <!-- Permissions -->
              <div>
                <label class="block text-xs text-white/55 mb-2">Permissions</label>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <TertiaryB
                    v-if="!userData.admin"
                    @click="addAdminToUser"
                    :disabled="loadingAction"
                    class="bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 text-white
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Make Admin
                  </TertiaryB>

                  <TertiaryB
                    v-else
                    @click="removeAdminFromUser"
                    :disabled="loadingAction"
                    class="bg-rose-500/15 border-rose-500/25 hover:bg-rose-500/20 hover:border-rose-500/35 text-white
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove Admin
                  </TertiaryB>

                  <TertiaryB
                    @click="addResellerToUser"
                    :disabled="loadingAction"
                    class="bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 text-white
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Make Reseller
                  </TertiaryB>

                  <TertiaryB
                    @click="addPremiumToUser"
                    :disabled="loadingAction"
                    class="bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 text-white
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Make Premium
                  </TertiaryB>
                </div>
              </div>

              <!-- Password -->
              <div>
                <label class="block text-xs text-white/55 mb-2">Password</label>
                <TertiaryB
                  @click="resetPassword"
                  :disabled="loadingAction"
                  class="w-full bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 text-white
                         disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send reset link
                </TertiaryB>
              </div>
            </div>
          </div>

          <!-- Status message -->
          <transition name="fade-slide">
            <div v-if="userMessage" class="mt-4">
              <div
                class="flex justify-center items-center rounded-2xl px-4 py-3 border flex items-start gap-3"
                :class="userSuccess
                  ? 'bg-emerald-500/10 border-emerald-500/25'
                  : 'bg-rose-500/10 border-rose-500/25'"
              >
                <Icon
                  :name="userSuccess ? 'mdi:check-circle-outline' : 'mdi:alert-circle-outline'"
                  size="22"
                  :class="userSuccess ? 'text-emerald-300' : 'text-rose-300'"
                />
                <div class="text-sm text-white/85 break-words flex-1">
                  {{ userMessage }}
                </div>
                <button
                  class="w-9 h-9 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                  @click="userMessage = ''"
                  title="Close"
                >
                  <Icon name="mdi:close" size="18" class="text-white/70" />
                </button>
              </div>
            </div>
          </transition>

          <!-- Purchase modal -->
          <transition name="modal-fade">
            <div v-if="showBoughtModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi px-4">
              <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

              <transition name="modal-zoom">
                <div
                  v-if="showBoughtModal"
                  class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                         p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden"
                >
                  <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.22),transparent_55%)]"></div>

                  <button
                    @click="showBoughtModal = false"
                    class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl transition"
                  >
                    <Icon name="mdi:close" />
                  </button>

                  <div class="relative flex flex-col gap-5">
                    <div class="flex flex-col items-center">
                      <Icon name="material-symbols:check-circle-rounded" size="48" class="text-[#7aa7ff]" />
                      <h2 class="text-2xl font-black text-white mt-2">Purchase Details</h2>
                      <p class="text-white/55 text-sm text-center">See transaction details below</p>
                    </div>

                    <div class="rounded-2xl border border-white/10 bg-black/20 p-4 flex flex-col gap-2">
                      <div>
                        <div class="text-white text-sm font-bold">Product</div>
                        <div class="text-white/70 text-sm break-all">{{ boughtModalData.product }}</div>
                      </div>

                      <div>
                        <div class="text-white text-sm font-bold">Product ID</div>
                        <div class="text-white/70 text-sm break-all">{{ boughtModalData.productId }}</div>
                      </div>

                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <div class="text-white text-sm font-bold">Amount</div>
                          <div class="text-white/70 text-sm break-all">R$ {{ boughtModalData.amount }}</div>
                        </div>
                        <div>
                          <div class="text-white text-sm font-bold">Buyer</div>
                          <div class="text-white/70 text-sm break-all">{{ boughtModalData.buyer }}</div>
                        </div>
                      </div>

                      <div>
                        <div class="text-white text-sm font-bold">Date</div>
                        <div class="text-white/70 text-sm">{{ boughtModalData.createdAt }}</div>
                      </div>

                      <div>
                        <div class="text-white text-sm font-bold">Transaction ID</div>
                        <div class="text-[#7aa7ff] font-mono text-xs break-all">{{ boughtModalData.transactionId }}</div>
                      </div>
                    </div>

                    <TertiaryB
                      @click="showBoughtModal = false"
                      class="w-full bg-rose-500/15 border-rose-500/25 hover:bg-rose-500/20 hover:border-rose-500/35 text-white"
                    >
                      Close
                    </TertiaryB>
                  </div>
                </div>
              </transition>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '~/firebase'
import { doc, getDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'

const router = useRouter()

/** Modal purchase */
const showBoughtModal = ref(false)
const boughtModalData = ref({
  product: '',
  amount: '',
  buyer: '',
  createdAt: '',
  transactionId: '',
  productId: ''
})

/** Search transaction */
const searchTransactionId = ref('')

async function searchTransaction() {
  if (!searchTransactionId.value?.trim()) return
  const id = searchTransactionId.value.trim()

  const transactionDoc = await getDoc(doc(db, 'transactionId', id))
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
    transactionId: id,
    productId: data.productId ?? ''
  }
  showBoughtModal.value = true
}

/** Manage user */
const manageEmail = ref('')
const userData = ref(null)
const userDocRef = ref(null)

const userMessage = ref('')
const userSuccess = ref(false)

const loadingUser = ref(false)
const loadingAction = ref(false)

const newBalance = ref('')
const newResellerBalance = ref('')
const lastTransactionId = ref('')

async function fetchUser() {
  userMessage.value = ''
  userSuccess.value = false
  userData.value = null
  userDocRef.value = null
  lastTransactionId.value = ''

  const email = manageEmail.value?.trim()
  if (!email) return

  loadingUser.value = true
  try {
    const q = query(collection(db, 'users'), where('email', '==', email))
    const snap = await getDocs(q)

    if (snap.empty) {
      userMessage.value = 'User not found.'
      userSuccess.value = false
      loadingUser.value = false
      return
    }

    userDocRef.value = snap.docs[0].ref
    userData.value = snap.docs[0].data()

    newBalance.value = userData.value.balance ?? 0
    newResellerBalance.value = userData.value.resellerBalance ?? 0
    lastTransactionId.value = userData.value.lastTransactionId || ''

    userMessage.value = 'User loaded.'
    userSuccess.value = true
  } catch (e) {
    userMessage.value = 'Error when searching for user.'
    userSuccess.value = false
  }
  loadingUser.value = false
}

async function updateBalance() {
  if (!userDocRef.value) return
  loadingAction.value = true
  userMessage.value = ''
  userSuccess.value = false

  try {
    await updateDoc(userDocRef.value, { balance: Number(newBalance.value) })
    userData.value.balance = Number(newBalance.value)
    userMessage.value = 'Balance changed successfully!'
    userSuccess.value = true
  } catch (e) {
    userMessage.value = 'Error changing balance.'
    userSuccess.value = false
  }
  loadingAction.value = false
}

async function updateResellerBalance() {
  if (!userDocRef.value) return
  loadingAction.value = true
  userMessage.value = ''
  userSuccess.value = false

  try {
    await updateDoc(userDocRef.value, { resellerBalance: Number(newResellerBalance.value) })
    userData.value.resellerBalance = Number(newResellerBalance.value)
    userMessage.value = 'Reseller balance changed successfully!'
    userSuccess.value = true
  } catch (e) {
    userMessage.value = 'Error changing reseller balance.'
    userSuccess.value = false
  }
  loadingAction.value = false
}

async function addAdminToUser() {
  if (!userDocRef.value) return
  loadingAction.value = true
  userMessage.value = ''
  userSuccess.value = false

  try {
    await updateDoc(userDocRef.value, { admin: true, status: 'Administrator' })
    userData.value.admin = true
    userData.value.status = 'Administrator'
    userMessage.value = 'User is now admin!'
    userSuccess.value = true
  } catch (e) {
    userMessage.value = 'Error making admin.'
    userSuccess.value = false
  }
  loadingAction.value = false
}

async function removeAdminFromUser() {
  if (!userDocRef.value) return
  loadingAction.value = true
  userMessage.value = ''
  userSuccess.value = false

  try {
    await updateDoc(userDocRef.value, { admin: false, status: 'Common' })
    userData.value.admin = false
    userData.value.status = 'Common'
    userMessage.value = 'User removed from admin!'
    userSuccess.value = true
  } catch (e) {
    userMessage.value = 'Error removing admin.'
    userSuccess.value = false
  }
  loadingAction.value = false
}

async function addResellerToUser() {
  if (!userDocRef.value) return
  loadingAction.value = true
  userMessage.value = ''
  userSuccess.value = false

  try {
    await updateDoc(userDocRef.value, { reseller: true, resellerBalance: 0, status: 'Reseller' })
    userData.value.reseller = true
    userData.value.resellerBalance = 0
    userData.value.status = 'Reseller'
    newResellerBalance.value = 0
    userMessage.value = 'User is now reseller!'
    userSuccess.value = true
  } catch (e) {
    userMessage.value = 'Error making reseller.'
    userSuccess.value = false
  }
  loadingAction.value = false
}

async function addPremiumToUser() {
  if (!userDocRef.value) return
  loadingAction.value = true
  userMessage.value = ''
  userSuccess.value = false

  try {
    await updateDoc(userDocRef.value, { premium: true, status: 'Premium' })
    userData.value.premium = true
    userData.value.status = 'Premium'
    userMessage.value = 'User is now premium!'
    userSuccess.value = true
  } catch (e) {
    userMessage.value = 'Error making premium.'
    userSuccess.value = false
  }
  loadingAction.value = false
}

async function resetPassword() {
  if (!userData.value?.email) return
  loadingAction.value = true
  userMessage.value = ''
  userSuccess.value = false

  try {
    await sendPasswordResetEmail(auth, userData.value.email)
    userMessage.value = 'Password reset email sent!'
    userSuccess.value = true
  } catch (e) {
    userMessage.value = 'Error sending password reset.'
    userSuccess.value = false
  }
  loadingAction.value = false
}

/** Protect route */
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
</script>

<style scoped>
/* nice small transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(.4, 0, .2, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(14px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
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
