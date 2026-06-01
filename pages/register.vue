<template>
  <div class="relative min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col">

    <!-- ═══ BACKGROUND ════════════════════════════════════════ -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0"
        style="background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:72px 72px;mask-image:radial-gradient(ellipse 90% 80% at 50% 20%,black 40%,transparent 100%)"/>
      <div class="absolute inset-0 opacity-40"
        style="background-image:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.01) 40px,rgba(255,255,255,0.01) 41px)"/>
      <div class="absolute rounded-full"
        style="width:800px;height:600px;top:-300px;left:50%;transform:translateX(-50%);filter:blur(180px);background:radial-gradient(ellipse,rgba(59,130,246,0.10) 0%,transparent 70%)"/>
      <div class="absolute rounded-full"
        style="width:500px;height:500px;bottom:-100px;right:-100px;filter:blur(160px);background:radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)"/>
      <div class="absolute rounded-full"
        style="width:400px;height:400px;top:40%;left:-100px;filter:blur(150px);background:radial-gradient(circle,rgba(59,130,246,0.05) 0%,transparent 70%)"/>
    </div>

    <!-- ═══ HEADER ════════════════════════════════════════════ -->
    <header class="fixed top-0 left-0 right-0 z-50 px-5 py-3.5">
      <div class="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-5 py-2.5"
        style="background:rgba(0,0,0,0.75);border:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(24px)">

        <a href="/" class="flex items-center gap-2.5 no-underline">
          <Icon name="lucide-lab:wave-circle" class="w-6 h-6"/>
          <span class="font-display text-[17px] font-extrabold tracking-tight text-white">
            Black<span class="text-blue-500">Wave</span>
          </span>
        </a>

        <!-- desktop nav -->
        <nav class="hidden sm:flex items-center gap-1.5">
          <a href="https://t.me/blackwaveofc" target="_blank" rel="noopener"
            class="px-4 py-2 text-[12px] font-semibold text-white/40 rounded-xl hover:text-white hover:bg-white/5 transition">
            Telegram
          </a>
          <a href="/login"
            class="px-4 py-2 text-[12px] font-semibold text-white/40 rounded-xl hover:text-white hover:bg-white/5 transition">
            Sign in
          </a>
          <a href="/dashboard"
            class="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[12px] font-bold text-white transition-all hover:-translate-y-px"
            style="background:rgba(59,130,246,0.9);border:1px solid rgba(59,130,246,0.5)">
            Dashboard
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </nav>

        <!-- mobile burger -->
        <button class="sm:hidden flex flex-col gap-1.5 border border-white/10 rounded-lg p-2.5"
          @click="showMobileMenu = true" aria-label="Menu">
          <span class="block w-4 h-px bg-white/40 rounded-full"/>
          <span class="block w-4 h-px bg-white/40 rounded-full"/>
        </button>
      </div>
    </header>

    <!-- ═══ MOBILE MENU ════════════════════════════════════════ -->
    <transition name="curtain">
      <div v-if="showMobileMenu" class="fixed inset-0 z-[100] bg-black flex flex-col p-6">
        <div class="flex items-center justify-between pb-6 border-b" style="border-color:rgba(255,255,255,0.07)">
          <span class="font-display text-[17px] font-extrabold tracking-tight">
            Black<span class="text-blue-500">Wave</span>
          </span>
          <button @click="showMobileMenu = false"
            class="border border-white/10 rounded-lg px-3 py-2 text-[13px] text-white/40">✕</button>
        </div>
        <div class="flex flex-col gap-3 mt-6">
          <a href="https://t.me/blackwaveofc" target="_blank" rel="noopener" @click="showMobileMenu = false"
            class="block px-5 py-4 border rounded-xl text-[15px] text-white/40" style="border-color:rgba(255,255,255,0.07)">Telegram</a>
          <a href="/login" @click="showMobileMenu = false"
            class="block px-5 py-4 border rounded-xl text-[15px] text-white/40" style="border-color:rgba(255,255,255,0.07)">Sign in</a>
          <a href="/dashboard"
            class="flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-[14px] font-bold text-white"
            style="background:rgba(59,130,246,0.9)">
            Dashboard
          </a>
        </div>
      </div>
    </transition>

    <!-- ═══ MAIN ═══════════════════════════════════════════════ -->
    <main class="relative z-10 flex-1 pt-28 pb-16 px-5">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        <!-- ── Left: copy ──────────────────────────────────── -->
        <div class="flex flex-col gap-5 order-2 lg:order-1">

          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border w-fit text-[11px] font-semibold uppercase tracking-widest"
            style="background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.2);color:#60a5fa">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/>
            Create your account • Premium ready
          </div>

          <h1 class="font-display font-extrabold tracking-[-0.05em] leading-[0.95] text-white"
            style="font-size:clamp(3rem,7vw,5.5rem)">
            Black<br/><span class="text-blue-400">Wave</span>
          </h1>

          <p class="text-[15px] text-white/40 max-w-sm leading-relaxed">
            Create your account and access the dashboard. Keys are redeemable after login.
          </p>

          <!-- feature chips -->
          <div class="flex flex-wrap gap-2 mt-2">
            <span v-for="feat in features" :key="feat"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold"
              style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.35)">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ feat }}
            </span>
          </div>

          <!-- secondary CTAs -->
          <div class="flex flex-wrap gap-3 mt-2">
            <a href="/login"
              class="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-[12px] font-semibold text-white/40 hover:text-white transition-all"
              style="border-color:rgba(255,255,255,0.09)">
              Already have an account? Sign in →
            </a>
            <a href="https://t.me/blackwaveofc" target="_blank" rel="noopener"
              class="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-[12px] font-semibold text-white/40 hover:text-white transition-all"
              style="border-color:rgba(255,255,255,0.09)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
              Need help?
            </a>
          </div>
        </div>

        <!-- ── Right: register card ────────────────────────── -->
        <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div class="w-full max-w-[420px] relative rounded-3xl border overflow-hidden"
            style="background:rgba(3,3,6,0.85);border-color:rgba(255,255,255,0.09);box-shadow:0 32px 80px rgba(0,0,0,0.5);backdrop-filter:blur(12px)">

            <!-- top accent -->
            <div class="absolute top-0 left-0 right-0 h-px"
              style="background:linear-gradient(90deg,transparent,rgba(59,130,246,0.6),transparent)"/>
            <!-- corner brackets -->
            <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/30"/>
            <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/30"/>
            <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/30"/>
            <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/30"/>
            <!-- inner glow -->
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.06) 0%,transparent 55%)"/>

            <div class="relative px-8 pt-8 pb-7 flex flex-col gap-5">

              <!-- head -->
              <div class="flex items-center gap-4">
                <Icon name="lucide-lab:wave-circle" class="w-11 h-11 shrink-0"/>
                <div>
                  <h2 class="font-display text-[1.4rem] font-extrabold tracking-[-0.03em] text-white leading-tight">Create account</h2>
                  <p class="text-[12px] text-white/35 mt-0.5">Nickname must be unique.</p>
                </div>
              </div>

              <!-- divider -->
              <div class="h-px" style="background:rgba(255,255,255,0.06)"/>

              <!-- form -->
              <form @submit.prevent="handleRegister" class="flex flex-col gap-4">

                <!-- Nickname -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-[10px] font-bold uppercase tracking-widest text-white/30">Nickname</label>
                  <div class="relative">
                    <input v-model="nickname" type="text" placeholder="Your nickname"
                      autocorrect="off" class="reg-input pl-10"/>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-[10px] font-bold uppercase tracking-widest text-white/30">Email</label>
                  <div class="relative">
                    <input v-model="email" type="text" placeholder="you@email.com"
                      autocorrect="off" class="reg-input pl-10"/>
                  </div>
                </div>

                <!-- Password -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-[10px] font-bold uppercase tracking-widest text-white/30">Password</label>
                  <div class="relative">
                    <input v-model="password" :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••" class="reg-input pl-10 pr-10"/>
                    <button type="button" @click="showPassword = !showPassword"
                      class="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-white/20 hover:text-white/60 transition-colors"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'">
                      <svg v-if="showPassword" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                      <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Turnstile -->
                <div id="turnstile-container" class="flex justify-center"/>

                <!-- Error -->
                <transition name="fade-slide">
                  <div v-if="error" class="flex items-start gap-3 px-4 py-3 rounded-xl border text-[12px]"
                    style="background:rgba(239,68,68,0.06);border-color:rgba(239,68,68,0.2);color:#f87171">
                    <svg class="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span class="leading-relaxed">{{ error }}</span>
                  </div>
                </transition>

                <!-- Submit -->
                <button type="submit" :disabled="loading"
                  class="relative flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-[14px] font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  style="background:rgba(59,130,246,0.9);border:1px solid rgba(59,130,246,0.5);box-shadow:0 4px 24px rgba(59,130,246,0.25)">
                  <transition name="icon-swap" mode="out-in">
                    <span v-if="!loading" key="idle" class="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                        <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                      </svg>
                      Create account
                    </span>
                    <span v-else key="spin" class="flex items-center gap-2">
                      <svg class="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                      Creating…
                    </span>
                  </transition>
                </button>

                <p class="text-center text-[12px] text-white/30">
                  Already have an account?
                  <a href="/login" class="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Sign in</a>
                </p>
              </form>
            </div>
          </div>
        </div>

      </div>

      <!-- page footer -->
      <p class="text-center text-[11px] text-white/15 mt-14 tracking-wide">© 2025 BlackWave — All Rights Reserved.</p>
    </main>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore'

const router = useRouter()

const showMobileMenu  = ref(false)
const email           = ref('')
const password        = ref('')
const nickname        = ref('')
const error           = ref('')
const loading         = ref(false)
const showPassword    = ref(false)
const turnstileToken  = ref('')

const TURNSTILE_SITE_KEY = '0x4AAAAAABf1GGWwXUmxjcbx'

const features = [
  'Free to register',
  'Key redemption',
  'Live storage',
  'Dashboard access',
  'Telegram notifications',
]

/* ── Mobile menu scroll lock ────────────────────────────── */
watch(showMobileMenu, v => {
  document.documentElement.classList.toggle('menu-open', v)
})

/* ── Turnstile ──────────────────────────────────────────── */
function renderTurnstile() {
  const el = document.getElementById('turnstile-container')
  if (window.turnstile && el) {
    el.innerHTML = ''
    window.turnstile.render(el, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'dark',
      callback:           token => { turnstileToken.value = token },
      'expired-callback': ()    => { turnstileToken.value = '' },
    })
  }
}

onMounted(() => {
  if (!window.turnstile) {
    const s = Object.assign(document.createElement('script'), {
      src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
      async: true, defer: true
    })
    s.onload = renderTurnstile
    document.body.appendChild(s)
  } else {
    renderTurnstile()
  }
})

/* ── Firebase error messages ────────────────────────────── */
function getFirebaseErrorMessage(code) {
  return ({
    'auth/email-already-in-use':   'This email is already registered.',
    'auth/invalid-email':          'Invalid email.',
    'auth/weak-password':          'Password must be at least 6 characters.',
    'auth/too-many-requests':      'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'No internet connection.',
    'auth/missing-password':       'Please enter your password.',
    'auth/missing-email':          'Please enter your email.',
  })[code] || 'Error while registering. Please try again.'
}

async function isNicknameTaken(nick) {
  const q = query(collection(db, 'users'), where('nicknameLower', '==', nick.trim().toLowerCase()))
  const snap = await getDocs(q)
  return !snap.empty
}

/* ── Register ───────────────────────────────────────────── */
async function handleRegister() {
  error.value = ''
  if (!turnstileToken.value)                     { error.value = 'Please solve the captcha.';       return }
  if (!nickname.value || !email.value || !password.value) { error.value = 'Please fill in all fields.';    return }
  if (await isNicknameTaken(nickname.value))     { error.value = 'This nickname is already in use.'; return }

  loading.value = true
  try {
    if (auth.currentUser) await signOut(auth)
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await setDoc(doc(db, 'users', cred.user.uid), {
      nickname:      nickname.value,
      nicknameLower: nickname.value.trim().toLowerCase(),
      email:         email.value,
      createdAt:     new Date(),
      balance:       0,
      lives:         '',
      livesUsed:     0,
      cardsBought:   0,
      admin:         false,
      status:        'Common',
      checksMonth:   0,
      avgSpentWeek:  0,
      lastLogin:     new Date(),
    })
    router.push('/dashboard')
  } catch (e) {
    error.value = getFirebaseErrorMessage(e?.code)
  } finally {
    loading.value = false
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display { font-family: 'Syne', sans-serif; }
.font-sans    { font-family: 'DM Sans', sans-serif; }

/* ── Register input ──────────────────────────────────────── */
.reg-input {
  width: 100%; padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.025);
  color: white; font-family: 'DM Sans', sans-serif;
  font-size: 13px; outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.reg-input::placeholder { color: rgba(255,255,255,0.18); }
.reg-input:focus {
  border-color: rgba(59,130,246,0.5);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
}

/* ── Transitions ─────────────────────────────────────────── */
.icon-swap-enter-active,.icon-swap-leave-active { transition: opacity 0.15s, transform 0.15s; }
.icon-swap-enter-from { opacity: 0; transform: rotate(-20deg) scale(0.85); }
.icon-swap-leave-to   { opacity: 0; transform: rotate(20deg) scale(0.85); }

.fade-slide-enter-active,.fade-slide-leave-active { transition: all 0.22s cubic-bezier(.4,0,.2,1); }
.fade-slide-enter-from,.fade-slide-leave-to { opacity: 0; transform: translateY(-6px); }

.curtain-enter-active,.curtain-leave-active { transition: opacity .2s, transform .2s; }
.curtain-enter-from,.curtain-leave-to { opacity: 0; transform: translateY(-8px); }

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 0.85s linear infinite; }

/* ── Scroll lock ─────────────────────────────────────────── */
html.menu-open, html.menu-open body { overflow: hidden !important; }

/* ── Scrollbar ───────────────────────────────────────────── */
html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(122,167,255,0.35); }
html, body { overflow-x: hidden !important; }
</style>