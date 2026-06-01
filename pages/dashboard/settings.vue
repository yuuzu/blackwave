<template>
  <div class="relative min-h-screen w-full overflow-x-hidden bg-black text-white font-sans md:ml-[260px] pt-20 md:pt-4">

    <!-- ═══ BACKGROUND ════════════════════════════════════════ -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0"
        style="background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:72px 72px;mask-image:radial-gradient(ellipse 90% 80% at 50% 20%,black 40%,transparent 100%)"/>
      <div class="absolute inset-0 opacity-50"
        style="background-image:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.01) 40px,rgba(255,255,255,0.01) 41px)"/>
      <div class="absolute rounded-full" style="width:700px;height:700px;top:-250px;left:15%;filter:blur(170px);background:radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)"/>
      <div class="absolute rounded-full" style="width:500px;height:500px;bottom:-80px;right:-60px;filter:blur(160px);background:radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)"/>
    </div>

    <div class="mx-auto w-full max-w-2xl px-5 sm:px-7 lg:px-10 pt-4 pb-20 relative z-10 flex flex-col gap-5">

      <!-- ═══ PAGE HEADER ════════════════════════════════════ -->
      <div>
        <span class="section-label">Account</span>
        <h1 class="font-display text-[2rem] sm:text-[2.4rem] font-extrabold tracking-[-0.04em] leading-tight text-white mt-1">
          Settings
        </h1>
        <p class="text-[13px] text-white/30 mt-1">Manage your account preferences and notifications.</p>
      </div>

      <!-- ═══ PROFILE ═══════════════════════════════════════ -->
      <div class="section-block">
        <div class="section-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Profile
        </div>

        <div class="px-6 py-5 flex flex-col gap-4">
          <!-- avatar + name row -->
          <div class="flex items-center gap-4">
            <div class="relative shrink-0">
              <div class="w-14 h-14 rounded-2xl overflow-hidden border-2" style="border-color:rgba(59,130,246,0.3)">
                <img :src="photoURL" class="w-full h-full object-cover" alt="Avatar"/>
              </div>
              <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-black bg-emerald-500"/>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-display text-[1.1rem] font-extrabold text-white leading-tight truncate">{{ nickname || 'User' }}</div>
              <div class="text-[11px] text-white/30 font-mono mt-0.5 truncate">{{ user?.email || '...' }}</div>
            </div>
          </div>

          <!-- nickname input -->
          <div>
            <label class="settings-label">Nickname</label>
            <div class="flex gap-2">
              <input v-model="nicknameInput" type="text" maxlength="20" placeholder="Your display name..."
                class="bw-input flex-1"/>
              <button @click="saveNickname" :disabled="savingNickname"
                class="bw-btn bw-btn--primary w-24 shrink-0 disabled:opacity-40">
                <svg v-if="!savingNickname" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <svg v-else class="animate-spin" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Save
              </button>
            </div>
            <transition name="fade-msg">
              <p v-if="nicknameMsg" class="text-[11px] mt-1.5 font-semibold"
                :class="nicknameOk ? 'text-emerald-400' : 'text-red-400'">{{ nicknameMsg }}</p>
            </transition>
          </div>
        </div>
      </div>

      <!-- ═══ TELEGRAM NOTIFICATIONS ════════════════════════ -->
      <div class="section-block relative group overflow-visible">
        <!-- corner brackets -->
        <!-- glow -->
        <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style="background:radial-gradient(ellipse at 50% 0%,rgba(34,158,217,0.05) 0%,transparent 55%)"/>

        <div class="section-header" style="border-color:rgba(34,158,217,0.15)">
          <!-- telegram icon -->
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#229ED9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
          </svg>
          <span style="color:rgba(34,158,217,0.7)">Telegram Notifications</span>
          <!-- status chip -->
          <span class="ml-auto inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
            :style="telegramLinked
              ? 'background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);color:#4ade80'
              : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.3)'">
            <span class="w-1.5 h-1.5 rounded-full" :class="telegramLinked ? 'bg-emerald-500 animate-pulse' : 'bg-white/20'"/>
            {{ telegramLinked ? 'Connected' : 'Not connected' }}
          </span>
        </div>

        <div class="relative px-6 py-5 flex flex-col gap-5">

          <!-- how it works -->
          <div class="rounded-xl border px-4 py-3.5 flex items-start gap-3"
            style="background:rgba(34,158,217,0.04);border-color:rgba(34,158,217,0.15)">
            <svg class="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#229ED9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p class="text-[12px] text-white/50 leading-relaxed">
                Get instant Telegram messages whenever a card is approved. Link your Telegram account in 2 steps below.
              </p>
            </div>
          </div>

          <!-- step 1 -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style="background:rgba(34,158,217,0.15);border:1px solid rgba(34,158,217,0.3);color:#229ED9">1</span>
              <span class="text-[12px] font-semibold text-white/60">Start the bot on Telegram</span>
            </div>
            <a href="https://t.me/BlackWaveNotifyBot" target="_blank" rel="noopener"
              class="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all hover:-translate-y-px group/tg"
              style="background:rgba(34,158,217,0.07);border-color:rgba(34,158,217,0.2)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#229ED9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
              </svg>
              <div class="flex-1">
                <div class="text-[13px] font-bold" style="color:#229ED9">@BlackWaveNotifyBot</div>
                <div class="text-[10px] text-white/30 mt-0.5">Click to open and send /start</div>
              </div>
              <svg class="w-3.5 h-3.5 text-white/20 group-hover/tg:text-white/50 transition" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <path d="M2 10L10 2M10 2H4M10 2V8"/>
              </svg>
            </a>
          </div>

          <!-- step 2 -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style="background:rgba(34,158,217,0.15);border:1px solid rgba(34,158,217,0.3);color:#229ED9">2</span>
              <span class="text-[12px] font-semibold text-white/60">Enter your Telegram Chat ID</span>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex gap-2">
                <input v-model="telegramId" type="text" placeholder="e.g. 123456789"
                  class="bw-input flex-1 font-mono"
                  @keyup.enter="saveTelegramId"/>
                <button @click="saveTelegramId" :disabled="savingTelegram"
                  class="bw-btn w-24 shrink-0 disabled:opacity-40"
                  style="background:rgba(34,158,217,0.1);border-color:rgba(34,158,217,0.25);color:#229ED9">
                  <svg v-if="!savingTelegram" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <svg v-else class="animate-spin" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                  Link
                </button>
              </div>
              <p class="text-[10px] text-white/25 leading-relaxed">
                Don't know your Chat ID? Send <span class="font-mono text-white/40">/start</span> to the bot and it will reply with your ID automatically.
              </p>
            </div>
            <transition name="fade-msg">
              <p v-if="telegramMsg" class="text-[11px] font-semibold"
                :class="telegramOk ? 'text-emerald-400' : 'text-red-400'">{{ telegramMsg }}</p>
            </transition>
          </div>

          <!-- test button (only when linked) -->
          <div v-if="telegramLinked" class="flex flex-col gap-2">
            <div class="h-px" style="background:rgba(255,255,255,0.05)"/>
            <div class="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div class="text-[12px] font-semibold text-white/50">Test notification</div>
                <div class="text-[10px] text-white/25 mt-0.5">Send a test message to verify the connection.</div>
              </div>
              <div class="flex items-center gap-2">
                <button @click="sendTestNotification" :disabled="testingNotification"
                  class="bw-btn disabled:opacity-40"
                  style="background:rgba(34,158,217,0.08);border-color:rgba(34,158,217,0.2);color:#229ED9">
                  <svg v-if="!testingNotification" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
                  </svg>
                  <svg v-else class="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                  Send test
                </button>
                <button @click="unlinkTelegram"
                  class="bw-btn bw-btn--danger-soft">
                  Unlink
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ NOTIFICATION PREFERENCES ══════════════════════ -->
      <div class="section-block">
        <div class="section-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          Notification Preferences
        </div>

        <div class="px-6 py-5 flex flex-col gap-3">
          <div v-for="pref in notifPrefs" :key="pref.key"
            class="flex items-center justify-between py-3 border-b last:border-b-0"
            style="border-color:rgba(255,255,255,0.05)">
            <div class="flex-1 min-w-0 pr-4">
              <div class="text-[13px] font-semibold text-white/70">{{ pref.label }}</div>
              <div class="text-[11px] text-white/25 mt-0.5">{{ pref.desc }}</div>
            </div>
            <!-- toggle -->
            <button @click="pref.value = !pref.value; savePrefs()"
              class="relative w-10 h-5.5 rounded-full transition-all shrink-0 flex items-center"
              :style="pref.value
                ? 'background:rgba(59,130,246,0.4);border:1px solid rgba(59,130,246,0.5)'
                : 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1)'"
              style="height:22px;width:40px">
              <span class="absolute w-4 h-4 rounded-full transition-all duration-200 bg-white shadow"
                :style="pref.value ? 'left:22px' : 'left:2px'"/>
            </button>
          </div>
        </div>
      </div>

      <!-- ═══ SECURITY ══════════════════════════════════════ -->
      <div class="section-block">
        <div class="section-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          Security
        </div>

        <div class="px-6 py-5 flex flex-col gap-4">
          <!-- last login -->
          <div class="rounded-xl border px-4 py-3 flex items-center justify-between"
            style="background:rgba(255,255,255,0.02);border-color:rgba(255,255,255,0.06)">
            <div>
              <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1">Last Login</div>
              <div class="text-[13px] font-mono text-white/50">{{ lastLogin || '—' }}</div>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
              <span class="text-[10px] text-emerald-400/70 font-semibold">Active</span>
            </div>
          </div>

          <!-- reset password -->
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div class="text-[13px] font-semibold text-white/60">Password</div>
              <div class="text-[11px] text-white/25 mt-0.5">Send a reset link to your email.</div>
            </div>
            <button @click="sendPasswordReset" :disabled="sendingReset"
              class="bw-btn bw-btn--muted disabled:opacity-40">
              <svg v-if="!sendingReset" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <svg v-else class="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
              Reset password
            </button>
          </div>
          <transition name="fade-msg">
            <p v-if="resetMsg" class="text-[11px] font-semibold"
              :class="resetOk ? 'text-emerald-400' : 'text-red-400'">{{ resetMsg }}</p>
          </transition>

          <!-- danger zone: delete account -->
          <div class="h-px" style="background:rgba(255,255,255,0.05)"/>
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div class="text-[13px] font-semibold text-red-400/70">Sign out</div>
              <div class="text-[11px] text-white/25 mt-0.5">Sign out from your current session.</div>
            </div>
            <button @click="signOut"
              class="bw-btn bw-btn--danger">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { sendPasswordResetEmail, signOut as firebaseSignOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

/* ── user state ─────────────────────────────────────────── */
const user       = ref(null)
const photoURL   = ref('https://i.imgur.com/vJZfcZj.png')
const nickname   = ref('')
const lastLogin  = ref('')
const userDocRef = ref(null)

/* ── nickname ───────────────────────────────────────────── */
const nicknameInput  = ref('')
const savingNickname = ref(false)
const nicknameMsg    = ref('')
const nicknameOk     = ref(false)

/* ── telegram ───────────────────────────────────────────── */
const telegramId          = ref('')
const telegramLinked      = ref(false)
const savingTelegram      = ref(false)
const telegramMsg         = ref('')
const telegramOk          = ref(true)
const testingNotification = ref(false)

// ⚠️  Substitua pelo token do seu bot (criado via @BotFather)
const BOT_TOKEN = '8893394989:AAHn7cdj2X1DjXyXAyY2L9iE1Np2aoKZ1ZM'

/* ── notification prefs ─────────────────────────────────── */
const notifPrefs = reactive([
  { key: 'notifApproved', label: 'Approved cards',     desc: 'Notify when a card is approved by the checker.',    value: true  },
  { key: 'notifSound',    label: 'Sound alerts',        desc: 'Play audio when a card is approved.',               value: true  },
  { key: 'notifBalance',  label: 'Low balance alert',   desc: 'Notify when your balance drops below R$ 1.00.',     value: false },
])

/* ── security ───────────────────────────────────────────── */
const sendingReset = ref(false)
const resetMsg     = ref('')
const resetOk      = ref(false)

/* ── helpers ────────────────────────────────────────────── */
function toast(msgRef, okRef, msg, ok = true, timeout = 3000) {
  msgRef.value = msg; okRef.value = ok
  setTimeout(() => { if (msgRef.value === msg) msgRef.value = '' }, timeout)
}

/* ── nickname ───────────────────────────────────────────── */
async function saveNickname() {
  const nick = nicknameInput.value.trim()
  if (!nick || nick.length < 3) { toast(nicknameMsg, nicknameOk, 'Minimum 3 characters.', false); return }
  savingNickname.value = true
  try {
    const q = query(collection(db, 'users'), where('nicknameLower', '==', nick.toLowerCase()))
    const snap = await getDocs(q)
    if (snap.docs.some(d => d.id !== user.value?.uid)) {
      toast(nicknameMsg, nicknameOk, 'Nickname already taken.', false)
    } else {
      await updateDoc(userDocRef.value, { nickname: nick, nicknameLower: nick.toLowerCase() })
      nickname.value = nick
      toast(nicknameMsg, nicknameOk, 'Nickname saved!', true)
    }
  } catch { toast(nicknameMsg, nicknameOk, 'Error saving nickname.', false) }
  savingNickname.value = false
}

/* ── telegram ───────────────────────────────────────────── */
async function saveTelegramId() {
  const id = telegramId.value.trim()
  if (!id || !/^\d+$/.test(id)) { toast(telegramMsg, telegramOk, 'Enter a valid numeric ID.', false); return }
  savingTelegram.value = true
  try {
    await updateDoc(userDocRef.value, { telegramChatId: id, telegramNotif: true })
    telegramLinked.value = true
    toast(telegramMsg, telegramOk, '✓ Telegram linked! You\'ll receive notifications now.', true)
  } catch { toast(telegramMsg, telegramOk, 'Error linking Telegram.', false) }
  savingTelegram.value = false
}

async function unlinkTelegram() {
  try {
    await updateDoc(userDocRef.value, { telegramChatId: '', telegramNotif: false })
    telegramId.value   = ''
    telegramLinked.value = false
    toast(telegramMsg, telegramOk, 'Telegram unlinked.', true)
  } catch { toast(telegramMsg, telegramOk, 'Error unlinking.', false) }
}

async function sendTestNotification() {
  if (!telegramId.value) return
  testingNotification.value = true
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramId.value,
        parse_mode: 'HTML',
        text: `🔔 <b>BlackWave — Test notification</b>\n\n✅ Your Telegram is connected!\nYou will receive alerts here when a card is approved.\n\n<code>BlackWave.xyz</code>`
      })
    })
    const data = await res.json()
    if (data.ok) toast(telegramMsg, telegramOk, '✓ Test message sent! Check your Telegram.', true)
    else toast(telegramMsg, telegramOk, `Error: ${data.description}`, false)
  } catch { toast(telegramMsg, telegramOk, 'Failed to send test message.', false) }
  testingNotification.value = false
}

/* ── notification prefs ─────────────────────────────────── */
async function savePrefs() {
  if (!userDocRef.value) return
  const update = {}
  notifPrefs.forEach(p => { update[p.key] = p.value })
  try { await updateDoc(userDocRef.value, update) } catch {}
}

/* ── security ───────────────────────────────────────────── */
async function sendPasswordReset() {
  if (!user.value?.email) return
  sendingReset.value = true
  try {
    await sendPasswordResetEmail(auth, user.value.email)
    toast(resetMsg, resetOk, '✓ Reset email sent! Check your inbox.', true)
  } catch { toast(resetMsg, resetOk, 'Error sending reset email.', false) }
  sendingReset.value = false
}

async function signOut() {
  await firebaseSignOut(auth)
  router.push('/login')
}

/* ── onMounted ──────────────────────────────────────────── */
onMounted(() => {
  auth.onAuthStateChanged(async u => {
    if (!u) { router.push('/login'); return }
    user.value     = u
    photoURL.value = u.photoURL || photoURL.value

    userDocRef.value = doc(db, 'users', u.uid)
    const snap = await getDoc(userDocRef.value)
    if (!snap.exists()) return
    const d = snap.data()

    nickname.value      = d.nickname     || ''
    nicknameInput.value = d.nickname     || ''
    telegramId.value    = d.telegramChatId || ''
    telegramLinked.value = !!(d.telegramChatId && d.telegramNotif)

    if (d.lastLogin?.toDate) lastLogin.value = d.lastLogin.toDate().toLocaleString('pt-BR')

    // load prefs
    notifPrefs.forEach(p => {
      if (d[p.key] !== undefined) p.value = d[p.key]
    })
  })
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display { font-family: 'Syne', sans-serif; }
.font-sans    { font-family: 'DM Sans', sans-serif; }
.font-mono    { font-family: 'JetBrains Mono','Fira Code','Courier New',monospace; }

.section-label {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: #3b82f6;
}
.section-label::before {
  content: ''; display: block; width: 18px; height: 1px;
  background: #3b82f6; opacity: 0.5;
}

.section-block {
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; overflow: hidden; background: #030305;
  position: relative;
}
.section-header {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.01);
}

.settings-label {
  display: block;
  font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.25); margin-bottom: 8px;
}

.bw-input {
  padding: 10px 14px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.025);
  color: white; font-size: 13px; outline: none; transition: border-color 0.15s;
}
.bw-input::placeholder { color: rgba(255,255,255,0.18); }
.bw-input:focus { border-color: rgba(59,130,246,0.5); }

.bw-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 9px 14px; border-radius: 11px;
  font-size: 12px; font-weight: 700; border: 1px solid transparent;
  transition: all 0.15s; cursor: pointer; color: white; white-space: nowrap;
}
.bw-btn:disabled { cursor: not-allowed; }
.bw-btn--primary { background:rgba(59,130,246,0.12); border-color:rgba(59,130,246,0.28); }
.bw-btn--primary:hover:not(:disabled) { background:rgba(59,130,246,0.2); transform:translateY(-1px); }
.bw-btn--muted { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.08); color:rgba(255,255,255,0.5); }
.bw-btn--muted:hover:not(:disabled) { background:rgba(255,255,255,0.07); color:white; }
.bw-btn--danger { background:rgba(239,68,68,0.08); border-color:rgba(239,68,68,0.2); color:#f87171; }
.bw-btn--danger:hover:not(:disabled) { background:rgba(239,68,68,0.14); }
.bw-btn--danger-soft { background:rgba(239,68,68,0.05); border-color:rgba(239,68,68,0.15); color:rgba(248,113,113,0.6); font-size:12px; }
.bw-btn--danger-soft:hover { background:rgba(239,68,68,0.1); color:#f87171; }

.fade-msg-enter-active,.fade-msg-leave-active { transition: all 0.2s ease; }
.fade-msg-enter-from,.fade-msg-leave-to { opacity: 0; transform: translateY(-4px); }

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 0.8s linear infinite; }

html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(122,167,255,0.35); }
html, body { overflow-x: hidden !important; }
</style>