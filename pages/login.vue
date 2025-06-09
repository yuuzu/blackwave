<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
    <div class="w-full max-w-md bg-[#181818] rounded-2xl shadow-xl p-8 flex flex-col gap-6">
      <div class="flex flex-col items-center gap-2">
        <Icon name="basil:moon-solid" size="48px" class="text-[#576784]" />
        <h2 class="text-2xl font-bold font-satoshi text-white">Login</h2>
      </div>
      <form @submit.prevent="login" class="flex flex-col gap-4">
        <input v-model="email" type="email" placeholder="Email" required
          class="font-satoshi bg-[#232323] rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#576784] transition" />
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required
            class="bg-[#232323] rounded-lg px-4 py-3 w-full text-white outline-none focus:ring-2 focus:ring-[#576784] transition" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#576784] text-xl focus:outline-none" tabindex="-1">
            <transition name="spin" mode="out-in">
              <Icon :key="showPassword" :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" />
            </transition>
          </button>
        </div>
        <div id="turnstile-container" class="flex justify-center"></div>
        <PrimaryB type="submit">Login</PrimaryB>
      </form>
      <p v-if="error" class="font-satoshi text-red-400 text-sm text-center">{{ error }}</p>
      <p class="font-satoshi text-gray-400 text-xs text-center">
        Don't have an account?
        <a href="#" @click.prevent="handleRegister" class="font-satoshi text-[#75839c] hover:underline">
          Click here to register
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const turnstileToken = ref('')
const showPassword = ref(false)

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
  const el = document.getElementById('turnstile-container')
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

async function login() {
  error.value = ''
  if (!turnstileToken.value) {
    error.value = 'Por favor, complete o captcha.'
    return
  }
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
      error.value = 'Email ou senha inválidos.'
    } else if (e.code === 'auth/invalid-email') {
      error.value = 'Email inválido.'
    } else {
      error.value = 'Erro ao fazer login. Tente novamente.'
    }
  }
}

async function handleRegister() {
  error.value = ''
  if (!turnstileToken.value) {
    error.value = 'Por favor, complete o captcha.'
    return
  }
  try {
    if (auth.currentUser) {
      await auth.signOut()
    }
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await setDoc(doc(db, "users", cred.user.uid), {
      email: email.value,
      createdAt: new Date(),
      balance: 0,
      lives: '',
      livesUsed: 0,
      cardsBought: 0,
      admin: false,
      status: 'Common',
      checksMonth: 0,
      avgSpentWeek: 0,
      lastLogin: new Date()
    })
    error.value = ''
    router.push('/dashboard')
    return
  } catch (e) {
    console.log(e) // <--- Adicione esta linha
    if (e.code === 'auth/email-already-in-use') {
      error.value = 'Este email já está cadastrado.'
    } else if (e.code === 'auth/invalid-email') {
      error.value = 'Email inválido.'
    } else if (e.code === 'auth/weak-password') {
      error.value = 'A senha deve ter pelo menos 6 caracteres.'
    } else {
      error.value = 'Erro ao cadastrar. Tente novamente.'
    }
  }
}
</script>

<style>
.spin-enter-active,
.spin-leave-active {
  transition: transform 0.3s;
}

.spin-enter-from,
.spin-leave-to {
  transform: rotate(0deg);
}

.spin-enter-to,
.spin-leave-from {
  transform: rotate(180deg);
}
</style>