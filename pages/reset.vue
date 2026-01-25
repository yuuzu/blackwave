  <template>
    <div class="relative w-screen min-h-screen overflow-x-hidden bg-[#05060a] text-white">
      <!-- Background layers (mesmo estilo lunar) -->
      <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,180,255,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(140,90,255,0.14),transparent_55%)]">
        </div>

        <div
          class="absolute -top-48 left-1/2 h-[clamp(320px,60vw,560px)] w-[clamp(320px,60vw,560px)] -translate-x-1/2 rounded-full bg-[#5aa2ff]/20 blur-[100px]">
        </div>
        <div
          class="absolute top-40 -left-40 h-[clamp(280px,55vw,520px)] w-[clamp(280px,55vw,520px)] rounded-full bg-[#8b5dff]/16 blur-[120px]">
        </div>
        <div
          class="absolute -bottom-56 right-0 h-[clamp(360px,70vw,640px)] w-[clamp(360px,70vw,640px)] rounded-full bg-[#3dd6ff]/12 blur-[130px]">
        </div>

        <div
          class="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]">
        </div>

        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.78)_82%)]"></div>
        <div class="absolute left-1/2 top-24 h-[1px] w-[min(900px,92vw)] -translate-x-1/2 bg-white/10 blur-[1px]"></div>
      </div>

      <!-- Header (compacto e responsivo) -->
      <div class="fixed top-0 left-0 z-50 w-full flex justify-center pt-4 px-2">
        <div class="w-full max-w-7xl mx-auto rounded-3xl px-4 py-2 sm:px-6 sm:py-4
                bg-[#fafafa]/5 backdrop-blur-xl border border-white/10
                shadow-[0_12px_40px_rgba(0,0,0,0.55)]
                flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center select-none">
            <NuxtImg src="/icon.png" class="w-12" />
            <p class="pl-2 text-xl sm:text-3xl font-satoshi font-semibold text-white">lunarcntr</p>
            <span class="h-1 w-1 -mb-3 sm:-mb-5 rounded-full bg-[#7aa7ff]"></span>
            <p class="pl-1 text-xl sm:text-3xl font-satoshi font-semibold text-white">xyz</p>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden sm:flex flex-row items-center gap-2 sm:gap-4">
            <a href="https://t.me/lunaroficial" target="_blank" rel="noopener">
              <SecondaryB>Telegram</SecondaryB>
            </a>
            <a href="/dashboard" rel="noopener">
              <PrimaryB>Dashboard</PrimaryB>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button class="sm:hidden flex items-center justify-center p-2" @click="showMobileMenu = true">
            <Icon name="mdi:menu" size="32px" class="text-white" />
          </button>
        </div>
      </div>

      <!-- MAIN -->
      <div class="pt-24 sm:pt-36 px-4 pb-10">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start lg:items-center">
          <!-- Left copy -->
          <div class="flex flex-col gap-4">
            <div
              class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-xl">
              <span class="h-1.5 w-1.5 rounded-full bg-[#7aa7ff] shadow-[0_0_18px_rgba(122,167,255,0.9)]"></span>
              Password recovery • Secure flow
            </div>

            <h1
              class="text-4xl sm:text-6xl font-satoshi font-black tracking-tight
                    bg-gradient-to-b from-white via-white/80 to-white/45
                    text-transparent bg-clip-text
                    [text-shadow:0_0_24px_rgba(90,162,255,0.22)]">
              Reset password
            </h1>

            <p class="text-white/70 font-satoshi text-base sm:text-lg max-w-xl">
              If an account is linked to your email, we’ll send a secure reset link.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
              <a href="/login" class="w-full sm:w-auto">
                <span :class="[btnSecondary, 'w-full sm:w-auto']">Back to login</span>
              </a>
              <a href="https://t.me/lunaroficial" target="_blank" rel="noopener" class="w-full sm:w-auto">
                <span :class="[btnSecondary, 'w-full sm:w-auto']">Need help? Telegram</span>
              </a>
            </div>
          </div>

          <!-- Right card -->
          <div class="w-full flex justify-center lg:justify-end">
            <div
              class="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                    shadow-[0_22px_80px_rgba(0,0,0,0.65)] p-6 sm:p-8">

              <div class="flex items-center gap-3 mb-6">
                <div class="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon name="mdi:lock-reset" size="26" class="text-white/80" />
                </div>
                <div class="flex flex-col">
                  <p class="font-satoshi font-bold text-xl text-white">Reset your password</p>
                  <p class="text-white/60 text-sm">We’ll send a reset link if the email exists.</p>
                </div>
              </div>

              <form @submit.prevent="handleReset" class="flex flex-col gap-4">
                <!-- Email -->
                <div>
                  <label class="text-white/70 text-sm font-satoshi">Email</label>
                  <div class="relative mt-2">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                      <Icon name="material-symbols:stacked-email-rounded" class="-mb-1" size="22" />
                    </span>

                    <input
                      autocorrect="off"
                      v-model="email"
                      type="text"
                      placeholder="you@email.com"
                      class="w-full rounded-2xl bg-black/30 border border-white/10 px-11 py-3 text-white
                            placeholder-white/35 outline-none focus:border-[#7aa7ff]/60 transition
                            text-[16px]"
                    />
                  </div>
                </div>

                <!-- Turnstile -->
                <div class="mt-1">
                  <div id="turnstile-reset" class="flex justify-center"></div>
                </div>

                <!-- Error -->
                <div
                  v-if="error"
                  class="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-200 text-sm flex gap-2 items-start"
                >
                  <Icon name="mdi:alert-circle-outline" class="mt-0.5" />
                  <span>{{ error }}</span>
                </div>

                <!-- Success -->
                <div
                  v-if="success"
                  class="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-100 text-sm flex gap-2 items-start"
                >
                  <Icon name="mdi:check-circle-outline" class="mt-0.5" />
                  <span>{{ success }}</span>
                </div>

                <!-- CTA -->
                <button
                  type="submit"
                  class="mt-1 w-full rounded-2xl py-3 font-satoshi font-semibold
                        bg-[#7aa7ff]/20 border border-[#7aa7ff]/30 hover:bg-[#7aa7ff]/25 hover:border-[#7aa7ff]/45
                        transition shadow-[0_0_40px_rgba(122,167,255,0.12)]"
                  :class="loading ? 'opacity-60 cursor-not-allowed' : ''"
                  :disabled="loading"
                >
                  <span v-if="!loading" class="flex items-center justify-center gap-2">
                    <Icon name="mdi:send-outline" />
                    Send reset link
                  </span>
                  <span v-else class="flex items-center justify-center gap-2">
                    <Icon name="mdi:loading" class="animate-spin" />
                    Sending...
                  </span>
                </button>

                <p class="text-white/60 text-sm text-center mt-2">
                  Remembered your password?
                  <a href="/login" class="text-[#7aa7ff] hover:underline">Log in</a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-14 text-center text-white/35 text-xs font-satoshi">
          © 2025 lunarcntr.xyz — All Rights Reserved.
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import { sendPasswordResetEmail } from 'firebase/auth'
  import { auth } from '../firebase'

  const email = ref('')
  const error = ref('')
  const success = ref('')
  const loading = ref(false)

  const turnstileToken = ref('')
  const TURNSTILE_SITE_KEY = '0x4AAAAAABf1GGWwXUmxjcbx'

  /** botões no estilo lunar (independente de componentes externos) */
  const btnSecondary =
    'inline-flex items-center justify-center rounded-2xl px-4 py-3 font-satoshi font-semibold ' +
    'bg-white/5 border border-white/10 text-white/90 ' +
    'hover:bg-white/10 transition shadow-[0_12px_40px_rgba(0,0,0,0.25)]'

  const btnSecondarySm =
    'inline-flex items-center justify-center rounded-2xl px-3 py-2 font-satoshi font-semibold ' +
    'bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition'

  onMounted(() => {
    if (!window.turnstile) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
      script.onload = renderTurnstile
    } else {
      renderTurnstile()
    }
  })

  function renderTurnstile() {
    const el = document.getElementById('turnstile-reset')
    if (window.turnstile && el) {
      el.innerHTML = ''
      window.turnstile.render(el, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => {
          turnstileToken.value = token
        },
        'expired-callback': () => {
          turnstileToken.value = ''
        }
      })
    }
  }

  async function handleReset() {
    error.value = ''
    success.value = ''

    if (!email.value) {
      error.value = 'Please enter your email.'
      return
    }
    if (!turnstileToken.value) {
      error.value = 'Please solve the captcha.'
      return
    }

    loading.value = true
    try {
      await sendPasswordResetEmail(auth, email.value)
      success.value = 'If this email is registered, a reset link has been sent.'
      email.value = ''
    } catch (e) {
      if (e?.code === 'auth/invalid-email') error.value = 'Invalid email.'
      else error.value = 'Error sending reset email. Try again.'
    } finally {
      loading.value = false
    }
  }
  </script>

  <style>
  /* placeholder no padrão lunar */
  input::placeholder {
    color: rgba(255, 255, 255, 0.35);
    opacity: 1;
  }

  /* scrollbar igual ao resto do site */
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
  </style>
