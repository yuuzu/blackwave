<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
    <div class="w-full max-w-md bg-[#121212] border border-[#191919] rounded-2xl shadow-xl p-8 flex flex-col gap-6">
      <h2 class="text-2xl font-bold font-satoshi text-white">Reset your password</h2>
      <p class="text-[#bdbdbd] text-base font-satoshi">
        If an account is linked with your email, we will send a reset link.
      </p>
      <form @submit.prevent="handleReset" class="flex flex-col gap-4">
        <p class="font-satoshi font-semibold text-[#dddddd] pl-1 -mb-2">Email</p>
        <div class="relative">
          <span class="flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
            <Icon name="material-symbols:stacked-email-rounded" size="24" />
          </span>
          <input autocorrect="off" v-model="email" type="text" placeholder="Email"
            class="flex flex-row font-satoshi bg-[#0c0c0c] rounded-xl px-12 py-2 text-white text-[15px] outline-none hover:ring-[#191919] ring-transparent ring-2 focus:ring-[#191919] transition w-full" />
        </div>
        <div id="turnstile-reset" class="flex"></div>
        <div v-if="error" class="flex flex-col items-center justify-center bg-[#4a0d0d] border-2 border-[#640b0b] text-[#fafafa] px-4 py-2 rounded-xl mt-2">
          <p class="font-satoshi text-[16px] font-thin text-white w-max">{{ error }}</p>
        </div>
        <div v-if="success" class="flex flex-col items-center justify-center bg-[#0d4a1a] border-2 border-[#0b6430] text-[#fafafa] px-4 py-2 rounded-xl mt-2">
          <p class="font-satoshi text-[16px] font-thin text-white w-max">{{ success }}</p>
        </div>
        <button
          type="submit"
          class="bg-[#181818] border-2 border-[#202020] hover:border-[#262626] duration-300 text-[#fafafa] font-satoshi font-thin px-4 py-2 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase'

const email = ref('')
const error = ref('')
const success = ref('')
const turnstileToken = ref('')

const TURNSTILE_SITE_KEY = '0x4AAAAAABf1GGWwXUmxjcbx' // Substitua pela sua chave do Turnstile

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
    error.value = 'Please, solve the captcha.'
    return
  }
  try {
    await sendPasswordResetEmail(auth, email.value)
    success.value = 'If this email is registered, a reset link has been sent.'
    email.value = ''
  } catch (e) {
    if (e.code === 'auth/invalid-email') {
      error.value = 'Invalid email.'
    } else {
      error.value = 'Error sending reset email. Try again.'
    }
  }
}
</script>

<style>
input::placeholder {
  color: #6b6b6b;
  opacity: 1;
}
</style>