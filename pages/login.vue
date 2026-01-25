<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-[#05060a] px-4 flex items-center justify-center">
    <!-- Background -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,180,255,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(140,90,255,0.12),transparent_55%)]"
      ></div>
      <div class="absolute -top-56 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#5aa2ff]/18 blur-[110px]"></div>
      <div class="absolute top-56 -left-56 h-[560px] w-[560px] rounded-full bg-[#8b5dff]/14 blur-[130px]"></div>
      <div class="absolute -bottom-72 right-0 h-[720px] w-[720px] rounded-full bg-[#3dd6ff]/10 blur-[140px]"></div>
      <div
        class="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:84px_84px]"
      ></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.82)_85%)]"></div>
    </div>

    <!-- Card -->
    <div
      class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
             shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden p-8"
    >
      <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.22),transparent_55%)]"></div>

      <div class="relative flex flex-col gap-6">
        <!-- Header -->
        <div class="flex flex-col items-center gap-2">
          <NuxtImg src="../public/icon.png" class="w-16" />
          <h2 class="text-2xl font-black text-white font-satoshi">Log in to your account</h2>
          <p class="text-white/60 text-sm text-center">
            Enter your credentials below to access your dashboard.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="login" class="flex flex-col gap-4">
          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-white/80 pl-1">Email</label>
            <div class="relative flex items-center justify-center">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 pt-2">
                <Icon name="material-symbols:stacked-email-rounded" size="22" />
              </span>
              <input
                autocorrect="off"
                autocomplete="email"
                v-model="email"
                type="email"
                placeholder="you@email.com"
                class="w-full rounded-2xl bg-black/30 border border-white/10 px-11 py-2.5 text-white
                       placeholder:text-white/30 outline-none transition
                       focus:border-[#7aa7ff]/40 focus:ring-2 focus:ring-[#7aa7ff]/15"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-white/80 pl-1">Password</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 pt-2">
                <Icon name="fluent:key-20-filled" size="22" />
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full rounded-2xl bg-black/30 border border-white/10 px-11 py-2.5 text-white
                       placeholder:text-white/30 outline-none transition
                       focus:border-[#7aa7ff]/40 focus:ring-2 focus:ring-[#7aa7ff]/15"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                aria-label="Toggle password visibility"
              >
                <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center">
                  <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" size="20" />
                </div>
              </button>
            </div>

            <div class="flex justify-end -mt-1">
              <a href="/reset" class="text-sm text-white/55 hover:text-white/80 hover:underline transition">
                Forgot password?
              </a>
            </div>
          </div>

          <!-- Turnstile -->
            <div
              id="turnstile-container" class="flex justify-center"
            >
            </div>

          <!-- Error -->
          <transition name="fade">
            <div
              v-if="error"
              class="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-200 text-sm flex gap-2 items-start"
            >
              <Icon name="mdi:alert-circle-outline" size="18" class="mt-0.5" />
              <span class="leading-snug">{{ error }}</span>
            </div>
          </transition>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-2xl py-2.5 font-bold text-white transition
                   bg-[#7aa7ff]/20 border border-[#7aa7ff]/25 hover:bg-[#7aa7ff]/25 hover:border-[#7aa7ff]/35
                   disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Login</span>
            <span v-else class="inline-flex items-center gap-2 justify-center">
              <Icon name="mdi:loading" class="animate-spin" />
              Logging in...
            </span>
          </button>
        </form>

        <p class="text-sm text-white/65 text-center">
          Don't have an account?
          <a href="/register" class="text-[#7aa7ff] hover:underline font-semibold">Create an account</a>
        </p>
      </div>
    </div>
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

const turnstileToken = ref('')
const showPassword = ref(false)

const TURNSTILE_SITE_KEY = '0x4AAAAAABf1GGWwXUmxjcbx' // seu sitekey
const widgetId = ref(null)

function getFirebaseErrorMessage(code) {
  const messages = {
    'auth/user-not-found': 'User not found.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-email': 'Invalid email.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'No internet connection.',
    'auth/internal-error': 'Internal error. Please try again.',
    'auth/missing-password': 'Please enter your password.',
    'auth/missing-email': 'Please enter your email.',
    default: 'Error while logging in. Please try again.'
  }
  return messages[code] || messages.default
}

function resetTurnstile() {
  try {
    if (typeof window !== 'undefined' && window.turnstile && widgetId.value !== null) {
      window.turnstile.reset(widgetId.value)
      turnstileToken.value = ''
    }
  } catch {}
}

function removeTurnstile() {
  try {
    if (typeof window !== 'undefined' && window.turnstile && widgetId.value !== null) {
      window.turnstile.remove(widgetId.value)
      widgetId.value = null
    }
  } catch {}
}

async function renderTurnstile() {
  if (typeof window === 'undefined') return

  await nextTick()
  const el = document.getElementById('turnstile-container')
  if (!el) return

  // evita render duplicado
  if (widgetId.value !== null) return

  if (!window.turnstile) return

  widgetId.value = window.turnstile.render(el, {
    sitekey: TURNSTILE_SITE_KEY,
    callback: (token) => {
      turnstileToken.value = token
    },
    'expired-callback': () => {
      turnstileToken.value = ''
    },
    'error-callback': () => {
      turnstileToken.value = ''
    }
  })
}

function loadTurnstileScript() {
  if (typeof window === 'undefined') return

  // já carregou
  if (window.turnstile) {
    renderTurnstile()
    return
  }

  // evita adicionar script 2x
  const existing = document.querySelector('script[data-turnstile="1"]')
  if (existing) {
    existing.addEventListener('load', renderTurnstile, { once: true })
    return
  }

  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
  script.async = true
  script.defer = true
  script.dataset.turnstile = '1'
  script.onload = () => renderTurnstile()
  document.body.appendChild(script)
}

onMounted(() => {
  loadTurnstileScript()
})

onBeforeUnmount(() => {
  removeTurnstile()
})

async function login() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields.'
    return
  }
  if (!turnstileToken.value) {
    error.value = 'Please solve the captcha.'
    return
  }

  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = getFirebaseErrorMessage(e.code)
    // captcha geralmente expira/invalid após erro → resetar ajuda
    resetTurnstile()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
