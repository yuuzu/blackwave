<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
    <div
      class="w-full max-w-sm border border-[2px] border-[#191919] bg-[#121212] rounded-2xl shadow-xl p-8 flex flex-col gap-6">
      <div class="flex flex-col items-center gap-2">
        <Icon name="basil:moon-solid" size="96px" class="text-[#576784]" />
        <h2 class="text-2xl font-bold font-satoshi text-white">Create your account</h2>
      </div>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <p class="font-satoshi font-semibold text-[#dddddd] pl-1 -mb-2">Nickname</p>
        <div class="relative">
          <span class="flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
            <Icon name="mdi:account-circle" size="24" />
          </span>
          <input autocorrect="off" v-model="nickname" type="text" placeholder="Nickname"
            class="flex flex-row font-satoshi bg-[#0c0c0c] rounded-xl px-12 py-2 text-white text-[15px] outline-none hover:ring-[#191919] ring-transparent ring-2 focus:ring-[#191919] transition w-full" />
        </div>
        <p class="font-satoshi font-semibold text-[#dddddd] pl-1 -mb-2">Email</p>
        <div class="relative">
          <span class="flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
            <Icon name="material-symbols:stacked-email-rounded" size="24" />
          </span>
          <input autocorrect="off" v-model="email" type="text" placeholder="Email"
            class="flex flex-row font-satoshi bg-[#0c0c0c] rounded-xl px-12 py-2 text-white text-[15px] outline-none hover:ring-[#191919] ring-transparent ring-2 focus:ring-[#191919] transition w-full" />
        </div>
        <p class="font-satoshi pl-1 font-semibold text-[#dddddd] -mb-2">Password</p>
        <div class="relative">
          <span class="flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-[#666666] pr-16">
            <Icon name="fluent:key-20-filled" size="24" />
          </span>
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password"
            class="bg-[#0c0c0c] font-satoshi rounded-xl px-12 py-2 w-full text-white text-[15px] outline-none hover:ring-[#191919] ring-transparent ring-2 focus:ring-[#191919] transition" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#576784] text-xl focus:outline-none" tabindex="-1">
            <div
              class="flex flex-col justify-center items-center bg-transparent w-7 h-7 hover:bg-[#bbbbbb]/20 active:mt-1 rounded-lg duration-100">
              <Icon class="bg-[#bbbbbb]" :key="showPassword" :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" />
            </div>
          </button>
        </div>
        <div id="turnstile-container" class="flex justify-center"></div>
        <div v-if="error"
          class="flex flex-col items-center justify-center bg-[#4a0d0d] border-2 border-[#640b0b] text-[#fafafa] px-4 py-2 rounded-xl mt-2">
          <p class="font-satoshi text-[16px] font-thin text-white w-max">{{ error }}</p>
        </div>
        <Button
          class="flex flex-col items-center justify-center bg-[#181818] border-2 border-[#202020] hover:border-[#262626] duration-300 text-[#fafafa] font-satoshi font-thin px-4 py-2 rounded-xl"
          type="submit">Register</Button>
      </form>
      <p class="-mt-3 font-satoshi text-[#c9c9c9] text-[15px] text-center">
        Already have an account?
        <a href="/login" class="font-satoshi text-[#576784] hover:underline">
          Log in
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

const router = useRouter()
const email = ref('')
const password = ref('')
const nickname = ref('')
const error = ref('')
const turnstileToken = ref('')
const showPassword = ref(false)

const TURNSTILE_SITE_KEY = '0x4AAAAAABf1GGWwXUmxjcbx' // Replace with your Turnstile key

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

function getFirebaseErrorMessage(code) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Invalid email.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'No internet connection.',
    'auth/internal-error': 'Internal error. Please try again.',
    'auth/missing-password': 'Please enter your password.',
    'auth/missing-email': 'Please enter your email.',
    'default': 'Error while registering. Please try again.'
  }
  return messages[code] || messages['default']
}

async function isNicknameTaken(nick) {
  const nickLower = nick.trim().toLowerCase();
  const q = query(
    collection(db, 'users'),
    where('nicknameLower', '==', nickLower)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

async function handleRegister() {
  error.value = '';
  if (!turnstileToken.value) {
    error.value = 'Please solve the captcha.';
    return;
  }
  if (!nickname.value || !email.value || !password.value) {
    error.value = 'Please fill in all fields.';
    return;
  }
  // Verificação de nickname único
  if (await isNicknameTaken(nickname.value)) {
    error.value = 'This nickname is already in use.';
    return;
  }
  try {
    if (auth.currentUser) {
      await auth.signOut();
    }
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);
    await setDoc(doc(db, "users", cred.user.uid), {
      nickname: nickname.value,
      nicknameLower: nickname.value.trim().toLowerCase(),
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
    });
    error.value = '';
    router.push('/dashboard');
    return;
  } catch (e) {
    error.value = getFirebaseErrorMessage(e.code);
  }
}
</script>

<style>
input::placeholder {
  color: #6b6b6b;
  opacity: 1;
}
</style>