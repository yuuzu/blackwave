<template>
  <div class="root" :data-theme="theme">

    <!-- ── Background ─────────────────────────────────────────── -->
    <div class="bg" aria-hidden="true">
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-grain"></div>
      <div class="bg-vignette"></div>
    </div>

    <!-- ── HEADER ─────────────────────────────────────────────── -->
    <header class="hdr">
      <div class="hdr-inner">
        <a href="/" class="logo">
          <NuxtImg src="/icon.png" class="logo-img" />
          <span class="logo-name">Black<span class="logo-wave">Wave</span></span>
        </a>

        <div class="hdr-right">
          <button class="theme-toggle" @click="toggleTheme" :aria-label="theme === 'dark' ? 'Light mode' : 'Dark mode'">
            <transition name="icon-swap" mode="out-in">
              <svg v-if="theme === 'dark'" key="sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <svg v-else key="moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </transition>
          </button>

          <a href="/" class="link-ghost">← Back</a>
        </div>
      </div>
    </header>

    <!-- ── LOGIN CARD ──────────────────────────────────────────── -->
    <main class="main">
      <div class="card">
        <div class="card-shine"></div>
        <div class="card-accent"></div>

        <!-- Card header -->
        <div class="card-head">
          <NuxtImg src="/icon.png" class="card-icon" />
          <div>
            <h1 class="card-title">Welcome back</h1>
            <p class="card-sub">Sign in to your account to continue.</p>
          </div>
        </div>

        <form @submit.prevent="login" class="form">

          <!-- Email -->
          <div class="field">
            <label class="field-label">Email</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
              </span>
              <input
                v-model="email"
                type="email"
                placeholder="you@email.com"
                autocomplete="email"
                autocorrect="off"
                class="input"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="field">
            <div class="field-label-row">
              <label class="field-label">Password</label>
              <a href="/reset" class="field-link">Forgot password?</a>
            </div>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                class="input"
              />
              <button type="button" class="input-toggle" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                <svg v-if="showPassword" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          <!-- Turnstile -->
          <div id="turnstile-container" class="turnstile-wrap"></div>

          <!-- Error -->
          <transition name="fade">
            <div v-if="error" class="error-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>{{ error }}</span>
            </div>
          </transition>

          <!-- Submit -->
          <button type="submit" class="btn-submit" :disabled="loading">
            <transition name="fade" mode="out-in">
              <span v-if="!loading" key="idle" class="btn-inner">
                Sign in
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <span v-else key="loading" class="btn-inner">
                <svg class="spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Signing in…
              </span>
            </transition>
          </button>
        </form>

        <p class="card-footer-text">
          Don't have an account?
          <a href="/register" class="card-footer-link">Create one</a>
        </p>
      </div>
    </main>

    <div class="page-footer">© 2025 BlackWave — All Rights Reserved.</div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const turnstileToken = ref('')

// ── Theme ──────────────────────────────────────────────────────────
const theme = ref('dark')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  try { localStorage.setItem('bw-theme', theme.value) } catch {}
}

// ── Turnstile ──────────────────────────────────────────────────────
const TURNSTILE_SITE_KEY = '0x4AAAAAABf1GGWwXUmxjcbx'
const widgetId = ref(null)

function resetTurnstile() {
  try {
    if (window.turnstile && widgetId.value !== null) {
      window.turnstile.reset(widgetId.value)
      turnstileToken.value = ''
    }
  } catch {}
}

function removeTurnstile() {
  try {
    if (window.turnstile && widgetId.value !== null) {
      window.turnstile.remove(widgetId.value)
      widgetId.value = null
    }
  } catch {}
}

async function renderTurnstile() {
  await nextTick()
  const el = document.getElementById('turnstile-container')
  if (!el || widgetId.value !== null || !window.turnstile) return
  widgetId.value = window.turnstile.render(el, {
    sitekey: TURNSTILE_SITE_KEY,
    callback: (token) => { turnstileToken.value = token },
    'expired-callback': () => { turnstileToken.value = '' },
    'error-callback': () => { turnstileToken.value = '' },
  })
}

function loadTurnstileScript() {
  if (window.turnstile) { renderTurnstile(); return }
  const existing = document.querySelector('script[data-turnstile="1"]')
  if (existing) { existing.addEventListener('load', renderTurnstile, { once: true }); return }
  const s = document.createElement('script')
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
  s.async = true; s.defer = true; s.dataset.turnstile = '1'
  s.onload = renderTurnstile
  document.body.appendChild(s)
}

// ── Firebase errors ────────────────────────────────────────────────
function getFirebaseErrorMessage(code) {
  const m = {
    'auth/user-not-found': 'User not found.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-email': 'Invalid email.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/network-request-failed': 'No internet connection.',
    'auth/missing-password': 'Please enter your password.',
    'auth/missing-email': 'Please enter your email.',
  }
  return m[code] || 'Error while signing in. Please try again.'
}

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
  try {
    const saved = localStorage.getItem('bw-theme')
    if (saved === 'light' || saved === 'dark') theme.value = saved
  } catch {}
  loadTurnstileScript()
})

onBeforeUnmount(() => { removeTurnstile() })
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { overflow-x: hidden; }

/* ══════════════════════════════════════════════════════════════════
   DARK THEME
══════════════════════════════════════════════════════════════════ */
.root[data-theme="dark"] {
  --cyan:         #00d9be;
  --cyan-dim:     rgba(0,217,190,0.10);
  --cyan-border:  rgba(0,217,190,0.20);
  --cyan-glow:    rgba(0,217,190,0.25);

  --bg:           #03080a;
  --bg-card:      rgba(255,255,255,0.03);
  --bg-input:     rgba(0,0,0,0.35);
  --bg-hover:     rgba(255,255,255,0.06);

  --border:       rgba(255,255,255,0.06);
  --border-hover: rgba(255,255,255,0.12);
  --border-input: rgba(255,255,255,0.08);
  --border-focus: rgba(0,217,190,0.40);

  --text-1:       #f0faf9;
  --text-2:       #7a9693;
  --text-3:       #2f4442;
  --text-inv:     #03080a;

  --hdr-bg:       rgba(3,8,10,0.75);

  --orb-1: rgba(0,180,160,0.18);
  --orb-2: rgba(0,100,90,0.10);

  --scrollbar-bg:    #03080a;
  --scrollbar-thumb: #0e1f1f;

  --error-bg:     rgba(255,70,70,0.08);
  --error-border: rgba(255,70,70,0.18);
  --error-color:  #ff9090;
}

/* ══════════════════════════════════════════════════════════════════
   LIGHT THEME
══════════════════════════════════════════════════════════════════ */
.root[data-theme="light"] {
  --cyan:         #009e8c;
  --cyan-dim:     rgba(0,158,140,0.10);
  --cyan-border:  rgba(0,158,140,0.25);
  --cyan-glow:    rgba(0,158,140,0.20);

  --bg:           #f0f4f4;
  --bg-card:      rgba(255,255,255,0.92);
  --bg-input:     rgba(255,255,255,0.80);
  --bg-hover:     rgba(255,255,255,1);

  --border:       rgba(0,0,0,0.07);
  --border-hover: rgba(0,0,0,0.14);
  --border-input: rgba(0,0,0,0.10);
  --border-focus: rgba(0,158,140,0.45);

  --text-1:       #0b1a18;
  --text-2:       #3d5c58;
  --text-3:       #8aada9;
  --text-inv:     #ffffff;

  --hdr-bg:       rgba(240,244,244,0.82);

  --orb-1: rgba(0,158,140,0.12);
  --orb-2: rgba(0,120,100,0.07);

  --scrollbar-bg:    #e8efef;
  --scrollbar-thumb: #b0cccb;

  --error-bg:     rgba(200,30,30,0.07);
  --error-border: rgba(200,30,30,0.18);
  --error-color:  #c02020;
}

/* ── Root ─────────────────────────────────────────────────────── */
.root {
  position: relative;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text-1);
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
  transition: background 0.35s, color 0.35s;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-bg);
}

/* ── Background ───────────────────────────────────────────────── */
.bg { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }

.bg-orb { position: absolute; border-radius: 50%; filter: blur(140px); }

.bg-orb-1 {
  width: 700px; height: 500px;
  top: -150px; left: 50%; transform: translateX(-50%);
  background: radial-gradient(ellipse, var(--orb-1) 0%, transparent 70%);
}
.bg-orb-2 {
  width: 400px; height: 400px;
  bottom: 0; right: -100px;
  background: radial-gradient(circle, var(--orb-2) 0%, transparent 70%);
}

.bg-grain {
  position: absolute; inset: 0; opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.035'/%3E%3C/svg%3E");
}

.bg-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.06) 100%);
}

/* ── Header ───────────────────────────────────────────────────── */
.hdr {
  position: fixed; top: 0; left: 0; right: 0; z-index: 60;
  padding: 14px 20px;
}

.hdr-inner {
  max-width: 1080px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  background: var(--hdr-bg);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border); border-radius: 14px;
  padding: 10px 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.04);
  transition: background 0.35s, border-color 0.35s;
}

.logo { display: inline-flex; align-items: center; gap: 9px; text-decoration: none; user-select: none; }
.logo-img { width: 26px; height: 26px; }
.logo-name { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.04em; color: var(--text-1); line-height: 1; transition: color 0.35s; }
.logo-wave { color: var(--cyan); }

.hdr-right { display: flex; align-items: center; gap: 8px; }

.theme-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 9px; color: var(--text-2); cursor: pointer;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}
.theme-toggle:hover { color: var(--cyan); border-color: var(--cyan-border); background: var(--cyan-dim); }

.icon-swap-enter-active, .icon-swap-leave-active { transition: opacity 0.15s, transform 0.15s; }
.icon-swap-enter-from { opacity: 0; transform: rotate(-30deg) scale(0.8); }
.icon-swap-leave-to   { opacity: 0; transform: rotate(30deg) scale(0.8); }

.link-ghost {
  padding: 7px 14px; font-size: 13px; font-weight: 500;
  color: var(--text-2); text-decoration: none; border-radius: 9px;
  transition: color 0.2s, background 0.2s;
}
.link-ghost:hover { color: var(--text-1); background: var(--bg-hover); }

/* ── Main ─────────────────────────────────────────────────────── */
.main {
  position: relative; z-index: 1;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 100px 20px 60px;
}

/* ── Card ─────────────────────────────────────────────────────── */
.card {
  position: relative; overflow: hidden;
  width: 100%; max-width: 420px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 36px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.2);
  backdrop-filter: blur(12px);
  transition: background 0.35s, border-color 0.35s;
}

.card-shine {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 50% 0%, rgba(0,217,190,0.09) 0%, transparent 60%);
}

.card-accent {
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px; border-radius: 22px 22px 0 0;
  background: linear-gradient(90deg, transparent, var(--cyan) 50%, transparent);
  opacity: 0.6;
}

/* ── Card head ────────────────────────────────────────────────── */
.card-head {
  display: flex; align-items: center; gap: 16px; margin-bottom: 32px;
}

.card-icon { width: 48px; height: 48px; flex-shrink: 0; }

.card-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px; letter-spacing: 0.05em;
  color: var(--text-1); line-height: 1;
}

.card-sub { font-size: 13px; font-weight: 300; color: var(--text-2); margin-top: 3px; line-height: 1.5; }

/* ── Form ─────────────────────────────────────────────────────── */
.form { display: flex; flex-direction: column; gap: 20px; }

.field { display: flex; flex-direction: column; gap: 8px; }

.field-label { font-size: 13px; font-weight: 500; color: var(--text-2); }

.field-label-row { display: flex; align-items: center; justify-content: space-between; }

.field-link {
  font-size: 12px; color: var(--text-3); text-decoration: none;
  transition: color 0.2s;
}
.field-link:hover { color: var(--cyan); }

/* ── Input ────────────────────────────────────────────────────── */
.input-wrap { position: relative; }

.input-icon {
  position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
  color: var(--text-3); display: flex; align-items: center; pointer-events: none;
}

.input {
  width: 100%;
  padding: 11px 44px;
  background: var(--bg-input);
  border: 1px solid var(--border-input);
  border-radius: 11px;
  color: var(--text-1);
  font-family: 'Outfit', sans-serif;
  font-size: 14px; font-weight: 400;
  outline: none;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.input::placeholder { color: var(--text-3); }

.input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px var(--cyan-dim);
}

.input-toggle {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px;
  background: var(--bg-hover); border: 1px solid var(--border);
  border-radius: 8px; color: var(--text-2); cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.input-toggle:hover { color: var(--cyan); border-color: var(--cyan-border); }

/* ── Turnstile ────────────────────────────────────────────────── */
.turnstile-wrap { display: flex; justify-content: center; }

/* ── Error box ────────────────────────────────────────────────── */
.error-box {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 12px 16px;
  background: var(--error-bg);
  border: 1px solid var(--error-border);
  border-radius: 11px;
  font-size: 13px; color: var(--error-color);
  line-height: 1.5;
}

.error-box svg { flex-shrink: 0; margin-top: 1px; }

/* ── Submit ───────────────────────────────────────────────────── */
.btn-submit {
  width: 100%;
  padding: 13px 24px;
  background: var(--cyan);
  border: 1px solid var(--cyan);
  border-radius: 11px;
  color: var(--text-inv);
  font-family: 'Outfit', sans-serif;
  font-size: 15px; font-weight: 700;
  cursor: pointer; letter-spacing: 0.01em;
  box-shadow: 0 2px 20px var(--cyan-glow);
  transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
}

.btn-submit:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 6px 28px var(--cyan-glow);
}

.btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

.btn-inner { display: inline-flex; align-items: center; justify-content: center; gap: 8px; }

.spin { animation: spin 0.85s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Card footer ──────────────────────────────────────────────── */
.card-footer-text {
  text-align: center;
  font-size: 13px; color: var(--text-2);
  margin-top: 4px;
}

.card-footer-link {
  color: var(--cyan); font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}
.card-footer-link:hover { opacity: 0.8; }

/* ── Page footer ──────────────────────────────────────────────── */
.page-footer {
  position: relative; z-index: 1;
  text-align: center;
  font-size: 12px; color: var(--text-3);
  padding: 0 0 28px;
  letter-spacing: 0.02em;
}

/* ── Transitions ──────────────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.18s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>