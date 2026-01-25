<template>
  <div class="relative w-full bg-[#05060a] text-white">
    <!-- Background layers -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <!-- base radials -->
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,180,255,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(140,90,255,0.12),transparent_55%)]"
      ></div>

      <!-- soft blobs -->
      <div
        class="absolute -top-48 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#5aa2ff]/18 blur-[110px]"
      ></div>
      <div
        class="absolute top-52 -left-56 h-[560px] w-[560px] rounded-full bg-[#8b5dff]/14 blur-[130px]"
      ></div>
      <div
        class="absolute -bottom-72 right-0 h-[720px] w-[720px] rounded-full bg-[#3dd6ff]/10 blur-[140px]"
      ></div>

      <!-- subtle grid -->
      <div
        class="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:84px_84px]"
      ></div>

      <!-- vignette -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.82)_85%)]"></div>
    </div>

    <!-- Page container -->
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-4 pb-16">
      <!-- Header / Title -->
      <div class="flex flex-col gap-2 mb-8">
        <div class="inline-flex items-center gap-2 w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur-xl">
          <span class="h-1.5 w-1.5 rounded-full bg-[#7aa7ff] shadow-[0_0_18px_rgba(122,167,255,0.9)]"></span>
          Dashboard • Account overview
        </div>
      </div>

      <!-- Top stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <!-- Balance -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition"
        >
          <div class="flex items-center gap-2 mb-2">
            <Icon name="mdi:wallet" class="text-white/80" size="26" />
            <span class="font-semibold text-lg text-white">Balance</span>
          </div>

          <div class="text-3xl font-bold text-white">
            R$ {{ balance?.toFixed(2) ?? '0.00' }}
          </div>
          <div class="text-sm text-white/55 mt-2">Your current balance</div>
        </div>

        <!-- Lives taken -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition"
        >
          <div class="flex items-center gap-2 mb-2">
            <Icon name="mdi:heart-pulse" class="text-white/80" size="26" />
            <span class="font-semibold text-lg text-white">Lives taken</span>
          </div>

          <div class="text-3xl font-bold text-white">{{ livesUsed }}</div>
          <div class="text-sm text-white/55 mt-2">Total lives taken</div>
        </div>

        <!-- Role -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition"
        >
          <div class="flex items-center gap-2 mb-2">
            <Icon name="fluent:person-star-20-filled" class="text-white/80" size="26" />
            <span class="font-semibold text-lg text-white">Role</span>
          </div>

          <div class="text-3xl font-bold text-white">{{ accountStatus }}</div>
          <div class="text-sm text-white/55 mt-2">Your user role</div>
        </div>

        <!-- Email -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition"
        >
          <div class="flex items-center gap-2 mb-2">
            <Icon name="mdi:email" class="text-white/80" size="26" />
            <span class="font-semibold text-lg text-white">Email</span>
          </div>

          <div class="flex items-center gap-2">
            <div class="text-base font-semibold text-white truncate">{{ user?.email || '...' }}</div>
            <button
              @click="copyEmail"
              class="ml-1 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-bold text-white/80
                     hover:bg-white/10 hover:border-white/20 transition"
              :title="'Copiar email'"
            >
              <Icon name="mdi:content-copy" size="15px" />
            </button>
          </div>

          <div class="text-sm text-white/55 mt-2">Your registered email</div>
          <div v-if="copied" class="text-emerald-400 text-xs mt-1">Copied!</div>
        </div>
      </div>

      <!-- Middle widgets -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <!-- Usage summary -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition"
        >
          <div class="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="mdi:chart-bar" class="text-[#7aa7ff]" size="22" />
            Usage summary
            <Beta class="-mb-1"></Beta>
          </div>

          <div class="flex flex-wrap gap-10">
            <div>
              <div class="text-2xl font-bold text-white">R$ {{ avgSpentWeek?.toFixed(2) }}</div>
              <div class="text-xs text-white/55">Total expenses</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ lastLogin || '---' }}</div>
              <div class="text-xs text-white/55">Last login</div>
            </div>
          </div>
        </div>

        <!-- News -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition"
        >
          <div class="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="mdi:bullhorn" class="text-[#7aa7ff]" size="22" />
            News & Announcements
          </div>

          <ul class="text-sm text-white/80 space-y-2">
            <li v-for="(notice, i) in notices" :key="i" class="flex gap-2">
              <span class="text-[#7aa7ff] font-bold">•</span>
              <span>{{ notice }}</span>
            </li>
            <li v-if="notices.length === 0" class="text-white/45">No news at the moment.</li>
          </ul>
        </div>
      </div>

      <!-- Account status + Verified Resellers -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <!-- Account status -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition"
        >
          <div class="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="mdi:account-check" class="text-[#7aa7ff]" size="22" />
            Account status
            <Beta class="-mb-1"></Beta>
          </div>

          <div class="flex items-center gap-3">
            <span
              class="flex items-center gap-2 px-3 py-2 rounded-full font-bold border transition-all duration-200"
              :class="{
                'bg-gradient-to-r from-[#a78bfa]/80 to-[#7c3aed]/80 text-white border-[#a78bfa]/60 shadow-lg shadow-[#a78bfa]/15':
                  accountStatus === 'Administrator',
                'bg-gradient-to-r from-[#ffb347]/80 to-[#ff7746]/80 text-white border-[#ff7746]/60 shadow-lg shadow-[#ff7746]/15':
                  accountStatus === 'Reseller',
                'bg-gradient-to-r from-[#1e3a8a]/75 to-[#38bdf8]/75 text-white border-[#38bdf8]/60 shadow-lg shadow-[#38bdf8]/15':
                  accountStatus === 'Premium',
                'bg-gradient-to-r from-[#222]/80 to-[#2d2d2d]/80 text-white border-white/10':
                  accountStatus === 'Common',
                'bg-gradient-to-r from-[#7f1d1d]/75 to-[#ef4444]/75 text-white border-[#ef4444]/60 shadow-lg shadow-[#ef4444]/15':
                  accountStatus === 'Blocked'
              }"
            >
              <Icon
                :name="{
                  Administrator: 'fluent:person-shield-24-filled',
                  Reseller: 'fluent:person-note-24-filled',
                  Premium: 'fluent:person-star-24-filled',
                  Common: 'fluent:person-20-filled',
                  Blocked: 'fluent:person-cancel-24-filled'
                }[accountStatus] || 'fluent:person-20-filled'"
                size="18"
                class="opacity-90"
              />
              {{ accountStatus }}

              <!-- rank badge -->
              <span
                v-if="userRank && userRank <= 10"
                class="ml-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border"
                :class="{
                  'bg-gradient-to-r from-[#ffe066]/80 to-[#ffd700]/80 text-[#5a5200] border-[#ffd700]/70 shadow-[0_0_25px_rgba(255,215,0,0.15)]': userRank === 1,
                  'bg-gradient-to-r from-[#e0e0e0]/80 to-[#b0b0b0]/80 text-[#444] border-[#b0b0b0]/70 shadow-[0_0_25px_rgba(200,200,200,0.10)]': userRank === 2,
                  'bg-gradient-to-r from-[#ffb47e]/80 to-[#c97a3a]/80 text-[#5c2b00] border-[#c97a3a]/70 shadow-[0_0_25px_rgba(201,122,58,0.12)]': userRank === 3,
                  'bg-gradient-to-r from-[#38bdf8]/35 to-[#1e3a8a]/35 text-white border-[#38bdf8]/35': userRank > 3 && userRank <= 10
                }"
              >
                <span v-if="userRank === 1">🥇 Top 1</span>
                <span v-else-if="userRank === 2">🥈 Top 2</span>
                <span v-else-if="userRank === 3">🥉 Top 3</span>
                <span v-else>Top {{ userRank }}</span>
              </span>
            </span>
          </div>
        </div>

        <!-- Verified Resellers -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition"
        >
          <div class="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="mdi:account-cash" class="text-[#7aa7ff]" size="22" />
            Verified Resellers
          </div>

          <ul class="text-sm text-white/85 flex flex-wrap gap-3">
            <li>
              <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener" class="group inline-flex">
                <div
                  class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2
                         hover:bg-white/10 hover:border-white/20 transition"
                >
                  <Icon class="text-white/70" name="lucide:link" size="18px"></Icon>
                  <p class="font-satoshi text-white font-semibold">Yuzuk</p>
                  <Icon class="text-white/60 group-hover:text-white/80 transition" name="weui:arrow-outlined" size="18px"></Icon>
                </div>
              </a>
            </li>

            <li>
              <a href="https://t.me/figthcobrita" target="_blank" rel="noopener" class="group inline-flex">
                <div
                  class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2
                         hover:bg-white/10 hover:border-white/20 transition"
                >
                  <Icon class="text-white/70" name="lucide:link" size="18px"></Icon>
                  <p class="font-satoshi text-white font-semibold">Zenitsu</p>
                  <Icon class="text-white/60 group-hover:text-white/80 transition" name="weui:arrow-outlined" size="18px"></Icon>
                </div>
              </a>
            </li>

            <li>
              <a href="https://t.me/chipeogod" target="_blank" rel="noopener" class="group inline-flex">
                <div
                  class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2
                         hover:bg-white/10 hover:border-white/20 transition"
                >
                  <Icon class="text-white/70" name="lucide:link" size="18px"></Icon>
                  <p class="font-satoshi text-white font-semibold">Chipero</p>
                  <Icon class="text-white/60 group-hover:text-white/80 transition" name="weui:arrow-outlined" size="18px"></Icon>
                </div>
              </a>
            </li>

            <li>
              <a href="https://t.me/Mbuu25" target="_blank" rel="noopener" class="group inline-flex">
                <div
                  class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2
                         hover:bg-white/10 hover:border-white/20 transition"
                >
                  <Icon class="text-white/70" name="lucide:link" size="18px"></Icon>
                  <p class="font-satoshi text-white font-semibold">Malibu</p>
                  <Icon class="text-white/60 group-hover:text-white/80 transition" name="weui:arrow-outlined" size="18px"></Icon>
                </div>
              </a>
            </li>

            <li>
              <a href="https://t.me/TioBolkano" target="_blank" rel="noopener" class="group inline-flex">
                <div
                  class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2
                         hover:bg-white/10 hover:border-white/20 transition"
                >
                  <Icon class="text-white/70" name="lucide:link" size="18px"></Icon>
                  <p class="font-satoshi text-white font-semibold">Bolka</p>
                  <Icon class="text-white/60 group-hover:text-white/80 transition" name="weui:arrow-outlined" size="18px"></Icon>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Leaderboard -->
      <div class="w-full">
        <div
          class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6
                 shadow-[0_16px_60px_rgba(0,0,0,0.55)]
                 hover:border-white/20 hover:bg-white/[0.07] transition
                 max-h-36 overflow-y-auto"
        >
          <div class="font-semibold font-satoshi text-lg mb-4 flex items-center gap-2">
            <Icon name="icon-park-solid:trophy" class="text-[#7aa7ff]" size="22" />
            Leaderboard
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full text-white text-sm">
              <thead>
                <tr class="text-white/55">
                  <th class="text-left py-2 pr-4">#</th>
                  <th class="text-left py-2 pr-4">Users</th>
                  <th class="text-left py-2">Lives</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(item, i) in leaderboard"
                  :key="item.uid"
                  class="border-t border-white/10"
                  :class="{ 'bg-white/[0.04]': i < 3 }"
                >
                  <td class="py-2 pr-4 font-bold">
                    <span class="pl-1" v-if="i === 0">🥇</span>
                    <span class="pl-1" v-else-if="i === 1">🥈</span>
                    <span class="pl-1" v-else-if="i === 2">🥉</span>
                    <span class="pl-2 font-mono text-white/80" v-else>{{ i + 1 }}</span>
                  </td>
                  <td class="py-2 pr-4 text-white/90">{{ item.name }}</td>
                  <td class="py-2 text-white/90">{{ item.livesUsed }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="userRank && userRank > 10" class="mt-3 text-xs text-white/55">
            Your position: {{ userRank }}º
          </div>
        </div>
      </div>
    </div>

    <!-- Nickname Modal -->
    <transition name="modal-fade">
      <div v-if="showNicknameModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi px-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <transition name="modal-zoom">
          <div
            class="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden"
          >
            <!-- glow -->
            <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.28),transparent_55%)]"></div>

            <div class="relative flex flex-col gap-4">
              <div class="flex flex-col items-center gap-2">
                <Icon name="mdi:account-circle" size="52" class="text-[#7aa7ff]" />
                <h2 class="text-xl font-black text-white text-center">Choose your nickname</h2>
                <p class="text-white/60 text-sm text-center">
                  You need to set a nickname to continue using the checker.
                </p>
              </div>

              <div v-if="nicknameError" class="text-red-400 text-xs text-center">
                {{ nicknameError }}
              </div>

              <input
                v-model="nicknameInput"
                type="text"
                maxlength="20"
                placeholder="Enter your nickname"
                class="bg-black/30 rounded-2xl px-4 py-3 w-full text-white text-[15px] outline-none
                       border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/30 transition"
              />

              <button
                @click="saveNickname"
                class="rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 hover:border-white/20
                       py-3 font-semibold text-white transition"
              >
                Save
              </button>
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
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  where
} from 'firebase/firestore'

const accountOpen = ref(true)
function toggleAccount() {
  accountOpen.value = !accountOpen.value
}

// Dados do usuário
const user = ref(null)
const balance = ref(0)
const livesUsed = ref(0)
const cardsBought = ref(0)
const photoURL = ref(
  'https://media.discordapp.net/attachments/1309251468045320223/1379190818589376623/photo_4947363663258430903_c.jpg?ex=683f570b&is=683e058b&hm=e2fea9d2b064ad1a476fd85ca82ae498f9591f94c16081654ebefeb0803b7fb9&=&format=webp'
) // Placeholder
const isAdmin = ref(false)
const copied = ref(false)
const accountStatus = ref('Common') // Pode ser 'Premium', 'Common', 'Blocked'

const checksMonth = ref(0)
const avgSpentWeek = ref(0)
const lastLogin = ref('')

const notices = ref(['Detailed analysis in the menu'])

const leaderboard = ref([])
const userRank = ref(null)

// Nickname
const nickname = ref('')
const showNicknameModal = ref(false)
const nicknameInput = ref('')
const nicknameError = ref('')

async function isNicknameTaken(nick) {
  const nickLower = nick.trim().toLowerCase()
  const q = query(collection(db, 'users'), where('nicknameLower', '==', nickLower))
  const snap = await getDocs(q)
  return snap.docs.some(docSnap => docSnap.id !== user.value?.uid)
}

onMounted(async () => {
  auth.onAuthStateChanged(async u => {
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

        checksMonth.value = data.checksMonth ?? 0
        avgSpentWeek.value = data.avgSpentWeek ?? 0

        if (data.lastLogin && typeof data.lastLogin.toDate === 'function') {
          const date = data.lastLogin.toDate()
          lastLogin.value = date.toLocaleString('pt-BR')
        } else {
          lastLogin.value = data.lastLogin ?? ''
        }

        accountStatus.value = data.status ?? 'Common'
        nickname.value = data.nickname || ''
        if (!nickname.value) {
          showNicknameModal.value = true
        }
      }

      // Leaderboard top 10
      const qTop = query(collection(db, 'users'), orderBy('livesUsed', 'desc'), limit(10))
      const querySnapshot = await getDocs(qTop)
      leaderboard.value = []
      let rank = 1

      querySnapshot.forEach(docSnap => {
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

      // Se não está no top 10, buscar posição
      if (!userRank.value) {
        const allQ = query(collection(db, 'users'), orderBy('livesUsed', 'desc'))
        const allSnap = await getDocs(allQ)
        let r = 1
        allSnap.forEach(docSnap => {
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

function generateKeyCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 12; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
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
    const userRef = doc(db, 'users', user.value.uid)

    await updateDoc(userRef, { balance: balance.value + value })
    await deleteDoc(keyRef)

    balance.value += value
    redeemMessage.value = `Key redeemed! Value: R$ ${value.toFixed(2)}`
    redeemSuccess.value = true
    keyInput.value = ''
  } catch (e) {
    redeemMessage.value = 'Error redeeming key: ' + (e.message || e.code || e)
  }

  loading.value = false
}

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

  if (nickname.value && nickname.value.toLowerCase() === nick.toLowerCase()) {
    showNicknameModal.value = false
    return
  }

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

<style>
/* (Opcional) Scrollbar combinando com o tema */
::-webkit-scrollbar {
  width: 8px;
  background: #05060a;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 1000px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(122, 167, 255, 0.45);
}

html,
body {
  overflow-x: hidden !important;
}

body {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.14) #05060a;
}

/* modal transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.18s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: transform 0.18s ease, opacity 0.18s ease;
}
.modal-zoom-enter-from,
.modal-zoom-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
