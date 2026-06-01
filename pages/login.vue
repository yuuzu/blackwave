<template>
  <div class="relative min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col">

    <!-- ═══ BACKGROUND ════════════════════════════════════════ -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0"
        style="background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:72px 72px;mask-image:radial-gradient(ellipse 90% 80% at 50% 20%,black 40%,transparent 100%)"/>
      <div class="absolute inset-0 opacity-40"
        style="background-image:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.01) 40px,rgba(255,255,255,0.01) 41px)"/>
      <!-- top glow -->
      <div class="absolute rounded-full"
        style="width:800px;height:600px;top:-300px;left:50%;transform:translateX(-50%);filter:blur(180px);background:radial-gradient(ellipse,rgba(59,130,246,0.10) 0%,transparent 70%)"/>
      <!-- bottom right glow -->
      <div class="absolute rounded-full"
        style="width:500px;height:500px;bottom:-100px;right:-100px;filter:blur(160px);background:radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)"/>
    </div>

    <!-- ═══ HEADER ════════════════════════════════════════════ -->
    <header class="fixed top-0 left-0 right-0 z-50 px-5 py-3.5">
      <div class="max-w-5xl mx-auto flex items-center justify-between rounded-2xl px-5 py-2.5"
        style="background:rgba(0,0,0,0.75);border:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(24px)">

        <a href="/" class="flex items-center gap-2.5 no-underline">
          <Icon name="lucide-lab:wave-circle" class="w-6 h-6"/>
          <span class="font-display text-[17px] font-extrabold tracking-tight text-white">
            Black<span class="text-blue-500">Wave</span>
          </span>
        </a>

        <div class="flex items-center gap-2">
          <a href="/"
            class="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[12px] font-semibold text-white/40 hover:text-white transition-all border hover:border-white"
            style="border-color:rgba(255,255,255,0.07)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </a>
        </div>
      </div>
    </header>

    <!-- ═══ MAIN ═══════════════════════════════════════════════ -->
    <main class="relative z-10 flex-1 flex items-center justify-center px-5 py-32">
      <div class="w-full max-w-[400px]">

        <!-- badge -->
        <div class="flex justify-center mb-8">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-semibold uppercase tracking-widest"
            style="background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.2);color:#60a5fa">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/>
            Secure login
          </div>
        </div>

        <!-- card -->
        <div class="relative rounded-3xl border overflow-hidden"
          style="background:rgba(3,3,6,0.85);border-color:rgba(255,255,255,0.09);box-shadow:0 32px 80px rgba(0,0,0,0.5);backdrop-filter:blur(12px)">

          <!-- top accent line -->
          <div class="absolute top-0 left-0 right-0 h-px"
            style="background:linear-gradient(90deg,transparent,rgba(59,130,246,0.6),transparent)"/>
          <!-- corner brackets -->
          <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/30"/>
          <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/30"/>
          <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/30"/>
          <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/30"/>
          <!-- inner glow -->
          <div class="pointer-events-none absolute inset-0"
            style="background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.07) 0%,transparent 55%)"/>

          <div class="relative px-8 pt-8 pb-7 flex flex-col gap-6">

            <!-- head -->
            <div class="flex items-center gap-4">
              <Icon name="lucide-lab:wave-circle" class="w-11 h-11 shrink-0"/>
              <div>
                <h1 class="font-display text-[1.5rem] font-extrabold tracking-[-0.03em] text-white leading-tight">Welcome back</h1>
                <p class="text-[12px] text-white/35 mt-0.5">Sign in to your account to continue.</p>
              </div>
            </div>

            <!-- divider -->
            <div class="h-px" style="background:rgba(255,255,255,0.06)"/>

            <!-- form -->
            <form @submit.prevent="login" class="flex flex-col gap-4">

              <!-- Email -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-bold uppercase tracking-widest text-white/30">Email</label>
                <div class="relative">
                  <input v-model="email" type="email" placeholder="you@email.com"
                    autocomplete="email" autocorrect="off"
                    class="login-input pl-10"/>
                </div>
              </div>

              <!-- Password -->
              <div class="flex flex-col gap-1.5">
                <div class="flex items-center justify-between">
                  <label class="text-[10px] font-bold uppercase tracking-widest text-white/30">Password</label>
                  <a href="/reset" class="text-[11px] text-white/25 hover:text-blue-400 transition-colors">Forgot password?</a>
                </div>
                <div class="relative">
                  <input v-model="password" :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••" autocomplete="current-password"
                    class="login-input pl-10 pr-10"/>
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
                    Sign in
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span v-else key="spin" class="flex items-center gap-2">
                    <svg class="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                    Signing in…
                  </span>
                </transition>
              </button>
            </form>

            <!-- footer -->
            <p class="text-center text-[12px] text-white/30">
              Don't have an account?
              <a href="/register" class="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Create one</a>
            </p>

          </div>
        </div>

        <!-- page footer -->
        <p class="text-center text-[11px] text-white/15 mt-8 tracking-wide">© 2025 BlackWave — All Rights Reserved.</p>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const router       = useRouter()
const email        = ref('')
const password     = ref('')
const error        = ref('')
const loading      = ref(false)
const showPassword = ref(false)
const turnstileToken = ref('')

/* ── Theme ──────────────────────────────────────────────────── */
const theme = ref('dark')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  try { localStorage.setItem('bw-theme', theme.value) } catch {}
}

/* ── Turnstile ──────────────────────────────────────────────── */
const TURNSTILE_SITE_KEY = '0x4AAAAAABf1GGWwXUmxjcbx'
const widgetId = ref(null)

function resetTurnstile() {
  try { if (window.turnstile && widgetId.value !== null) { window.turnstile.reset(widgetId.value); turnstileToken.value = '' } } catch {}
}
function removeTurnstile() {
  try { if (window.turnstile && widgetId.value !== null) { window.turnstile.remove(widgetId.value); widgetId.value = null } } catch {}
}
async function renderTurnstile() {
  await nextTick()
  const el = document.getElementById('turnstile-container')
  if (!el || widgetId.value !== null || !window.turnstile) return
  widgetId.value = window.turnstile.render(el, {
    sitekey: TURNSTILE_SITE_KEY,
    theme: 'dark',
    callback:          (token) => { turnstileToken.value = token },
    'expired-callback':()      => { turnstileToken.value = '' },
    'error-callback':  ()      => { turnstileToken.value = '' },
  })
}
function loadTurnstileScript() {
  if (window.turnstile) { renderTurnstile(); return }
  const existing = document.querySelector('script[data-turnstile="1"]')
  if (existing) { existing.addEventListener('load', renderTurnstile, { once: true }); return }
  const s = Object.assign(document.createElement('script'), {
    src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
    async: true, defer: true
  })
  s.dataset.turnstile = '1'
  s.onload = renderTurnstile
  document.body.appendChild(s)
}

/* ── Firebase error messages ────────────────────────────────── */
function getFirebaseErrorMessage(code) {
  return ({
    'auth/user-not-found':        'User not found.',
    'auth/wrong-password':        'Incorrect password.',
    'auth/invalid-email':         'Invalid email.',
    'auth/too-many-requests':     'Too many attempts. Try again later.',
    'auth/network-request-failed':'No internet connection.',
    'auth/missing-password':      'Please enter your password.',
    'auth/missing-email':         'Please enter your email.',
    'auth/invalid-credential':    'Invalid email or password.',
  })[code] || 'Error while signing in. Please try again.'
}

/* ── Login ──────────────────────────────────────────────────── */
async function login() {
  error.value = ''
  if (!email.value || !password.value) { error.value = 'Please fill in all fields.'; return }
  if (!turnstileToken.value) { error.value = 'Please solve the captcha.'; return }
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = getFirebaseErrorMessage(e.code)
    resetTurnstile()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  try { const s = localStorage.getItem('bw-theme'); if (s === 'light' || s === 'dark') theme.value = s } catch {}
  loadTurnstileScript()
})
onBeforeUnmount(() => { removeTurnstile() })
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display { font-family: 'Syne', sans-serif; }
.font-sans    { font-family: 'DM Sans', sans-serif; }

/* ── Login input ─────────────────────────────────────────────── */
.login-input {
  width: 100%; padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.025);
  color: white;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.login-input::placeholder { color: rgba(255,255,255,0.18); }
.login-input:focus {
  border-color: rgba(59,130,246,0.5);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
}

/* ── Transitions ─────────────────────────────────────────────── */
.icon-swap-enter-active,.icon-swap-leave-active { transition: opacity 0.15s, transform 0.15s; }
.icon-swap-enter-from { opacity: 0; transform: rotate(-30deg) scale(0.8); }
.icon-swap-leave-to   { opacity: 0; transform: rotate(30deg) scale(0.8); }

.fade-slide-enter-active,.fade-slide-leave-active { transition: all 0.22s cubic-bezier(.4,0,.2,1); }
.fade-slide-enter-from,.fade-slide-leave-to { opacity: 0; transform: translateY(-6px); }

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 0.85s linear infinite; }

/* ── Scrollbar ───────────────────────────────────────────────── */
html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 99px; }
html, body { overflow-x: hidden !important; }
</style>