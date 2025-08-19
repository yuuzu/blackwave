<template>
    <div class="font-satoshi min-h-screen w-full bg-[#080808] flex items-center justify-center">
        <!-- Tela de loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center gap-4 py-20">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#576784]"></div>
            <span class="text-lg text-[#b8b8b8] font-medium tracking-wide">Loading profile.</span>
        </div>
        <!-- Tela de usuário não encontrado ou não premium -->
        <div v-else-if="!userData" class="flex flex-col items-center justify-center gap-4 py-20">
            <svg viewBox="0 0 24 24" class="w-16 h-16 text-red-500">
                <path fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <span class="text-2xl font-bold text-red-400">User not found</span>
            <span class="text-[#b8b8b8] text-base text-center max-w-xs">
                The profile does not exist or the user is not premium.<br>
                Check the name and try again.
            </span>
            <a href="/"
                class="mt-2 w-max px-8 py-2 rounded-xl bg-[#1a1a1a] text-[#fafafa] border-2 border-[#202020] hover:brightness-110 duration-100 transition">Back</a>
        </div>
        <div v-else>
            <div
                class="max-w-xl w-screen mx-auto bg-[#121212]/70 border-2 border-[#191919] rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 font-satoshi">
                <!-- Foto do usuário -->
                <div class="relative">
                    <template v-if="userData.photoURL">
                        <img :src="userData.photoURL" alt="Profile photo"
                            class="w-28 h-28 rounded-full object-cover shadow-lg bg-[#23263a]" />
                    </template>
                    <template v-else>
                        <div class="w-28 h-28 rounded-full flex items-center justify-center bg-[#23263a] shadow-lg">
                            <svg viewBox="0 0 24 24" class="w-16 h-16 text-[#576784]">
                                <path fill="currentColor"
                                    d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                            </svg>
                        </div>
                    </template>
                </div>

                <!-- Nickname e badges -->
                <div class="flex flex-col justify-center items-center -mt-2 gap-1 z-1000">
                    <div class="flex items-center gap-2">
                        <span class="text-4xl font-bold break-words whitespace-normal w-full text-center block px-1"
                            style="max-width: 100%; word-break: break-word; min-width: 0;" :class="{
                                'glow-effect': userData.usernameEffect === 'glow',
                                'rainbow-effect': userData.usernameEffect === 'rainbow',
                                'typewriter-effect': userData.usernameEffect === 'typewriter'
                            }"
                            :style="userData.usernameEffect === 'rainbow'
                                ? 'padding: 0 0.25em; display: inline-block; max-width: 100%; word-break: break-word; min-width: 0;'
                                : `max-width: 100%; word-break: break-word; min-width: 0; color: ${userData.usernameColor || '#fff'}; ${userData.usernameEffect === 'glow' ? `text-shadow: 0 0 16px ${userData.usernameColor || '#fff'}, 0 0 32px ${userData.usernameColor || '#fff'}99, 0 0 64px ${userData.usernameColor || '#fff'}66;` : ''}`"
                            v-html="usernameDisplay">
                        </span>
                    </div>
                </div>
                <!-- BADGES BOX CENTRALIZADA -->
                <span class="flex items-center -mt-1 gap-1 px-1 py-0.5 rounded-xl bg-[#0a0a0a] shadow">
                    <!-- Status badges -->
                    <span v-if="userData.status === 'Administrator'"
                        class="w-7 h-7 flex items-center justify-center group relative">
                        <svg viewBox="0 0 24 24" class="w-6 h-6" style="filter: drop-shadow(0 0 6px #6783ff99);">
                            <path fill="#6783ff"
                                d="m16.06 13.09l5.63 5.59l-3.32 3.28l-5.59-5.59v-.92l2.36-2.36h.92m.91-2.53L16 9.6l-4.79 4.8v1.97L5.58 22L2.3 18.68l5.59-5.59h1.97l.78-.78L6.8 8.46H5.5L2.69 5.62L5.31 3l2.8 2.8v1.31L12 10.95l2.66-2.66l-.96-1.01L15 5.97h-2.66l-.65-.65L15 2l.66.66v2.66L16.97 4l3.28 3.28c1.09 1.1 1.09 2.89 0 3.98l-1.97-2.01l-1.31 1.31Z" />
                        </svg>
                        <span
                            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#000000] text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-10 shadow">
                            Administrator
                        </span>
                    </span>
                    <span v-if="userData.status === 'Administrator' || userData.status === 'Reseller'"
                        class="w-7 h-7 flex items-center justify-center group relative">
                        <svg viewBox="0 0 24 24" class="w-7 h-7" style="filter: drop-shadow(0 0 6px #ffb34799);">
                            <path fill="#ffb347"
                                d="M17.66 11.2c-.23-.3-.51-.56-.77-.82c-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32c-2.59 2.08-3.61 5.75-2.39 8.9c.04.1.08.2.08.33c0 .22-.15.42-.35.5c-.23.1-.47.04-.66-.12a.58.58 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5c.14.6.41 1.2.71 1.73c1.08 1.73 2.95 2.97 4.96 3.22c2.14.27 4.43-.12 6.07-1.6c1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6c-1.12.4-2.24-.16-2.9-.82c1.19-.28 1.9-1.16 2.11-2.05c.17-.8-.15-1.46-.28-2.23c-.12-.74-.1-1.37.17-2.06c.19.38.39.76.63 1.06c.77 1 1.98 1.44 2.24 2.8c.04.14.06.28.06.43c.03.82-.33 1.72-.93 2.27Z" />
                        </svg>
                        <span
                            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#000000] text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-10 shadow">
                            Reseller
                        </span>
                    </span>
                    <span v-if="['Administrator', 'Reseller', 'Premium'].includes(userData.status)"
                        class="w-7 h-7 flex items-center justify-center group relative brightness">
                        <svg viewBox="0 0 512 512" class="w-6 h-6" style="filter: drop-shadow(0 0 6px #8a97ab99);">
                            <path fill="#8a97ab"
                                d="M396.31 32H264l84.19 112.26L396.31 32zm-280.62 0l48.12 112.26L248 32H115.69zM256 74.67L192 160h128l-64-85.33zm166.95-23.61L376.26 160H488L422.95 51.06zm-333.9 0L23 160h112.74L89.05 51.06zM146.68 192H24l222.8 288h.53L146.68 192zm218.64 0L264.67 480h.53L488 192H365.32zm-35.93 0H182.61L256 400l73.39-208z" />
                        </svg>
                        <span
                            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#000000] text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-10 shadow">
                            Premium
                        </span>
                    </span>
                    <!-- Badges do array -->
                    <span v-for="badge in userData.badges || []" :key="badge"
                        class="w-7 h-7 flex items-center justify-center group relative">
                        <component :is="badgeSVG(badge)" />
                        <span
                            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#000000] text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-10 shadow">
                            {{ badgeTooltip(badge) }}
                        </span>
                    </span>
                </span>

                <!-- Descrição do perfil -->
                <div class="w-full bg-[#080808]/60 rounded-xl p-4 text-[#fafafa] text-center min-h-[56px] max-w-full break-words overflow-hidden"
                    style="word-break: break-word; max-width: 100%; max-height: 96px; white-space: pre-line;">
                    {{ (userData.description || 'No profile description yet.').slice(0, 100) }}
                </div>

                <!-- Contador de visualizações -->
                <div class="flex justify-center items-center gap-4 text-[#b8b8b8] text-sm mt-2">
                    <div class="flex items-center gap-2">
                        <Icon name="mdi:eye" size="18" />
                        <span>{{ userData.views || 0 }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <button :disabled="hasGivenReputation" @click="giveReputation"
                            class="focus:outline-none flex items-center"
                            :title="hasGivenReputation ? 'You already gave reputation' : 'Give reputation to this user'">
                            <Icon :name="hasGivenReputation ? 'mdi:star' : 'mdi:star-outline'" size="18"
                                class="transition text-[#fbbf24] align-middle" style="vertical-align: middle;" />
                        </button>
                        <span class="text-[#fbbf24] font-semibold text-base leading-none">{{ userData.reputation || 0
                            }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '~/firebase'
import { collection, query, where, getDocs, updateDoc, doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const route = useRoute()
const loading = ref(true)
const userData = ref(null)
const hasGivenReputation = ref(false)
const profileUserId = ref(null)
const typewriterIndex = ref(0)
const typewriterInterval = ref(null)

const usernameDisplay = computed(() => {
    if (!userData.value) return ''
    if (userData.value.usernameEffect === 'typewriter') {
        return userData.value.nickname
            ? userData.value.nickname.slice(0, typewriterIndex.value)
            : ''
    }
    return userData.value.nickname
        ? userData.value.nickname.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        : ''
})

// SVGs como componentes render functions
function badgeSVG(badge) {
    if (badge === 'Verified') {
        return {
            render() {
                return h('svg', {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "1 1.5 22 21",
                    style: "filter: drop-shadow(0 0 6px #008adacc); color: #008ada;"
                }, [
                    h('path', {
                        fill: "currentColor",
                        d: "m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                    })
                ])
            }
        }
    }
    if (badge === 'Dumb') {
        return {
            render() {
                return h('svg', {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "26",
                    height: "26",
                    viewBox: "0 0 24 24",
                    style: "filter: drop-shadow(0 0 6px #fafafacc); color: #fafafa;"
                }, [
                    h('path', {
                        fill: "currentColor",
                        d: "M17 3.34A10 10 0 1 1 2 12l.005-.324A10 10 0 0 1 17 3.34m-1.8 10.946a1 1 0 0 0-1.414.014a2.5 2.5 0 0 1-3.572 0a1 1 0 0 0-1.428 1.4a4.5 4.5 0 0 0 6.428 0a1 1 0 0 0-.014-1.414M7.707 7.793a1 1 0 0 0-1.414 1.414l.792.793l-.792.793a1 1 0 0 0 1.414 1.414l.793-.792l.793.792a1 1 0 1 0 1.414-1.414L9.915 10l.792-.793a1 1 0 1 0-1.414-1.414l-.793.792zm7 0a1 1 0 0 0-1.414 1.414l.792.793l-.792.793a1 1 0 0 0 1.414 1.414l.793-.792l.793.792a1 1 0 0 0 1.414-1.414L16.915 10l.792-.793a1 1 0 1 0-1.414-1.414l-.793.792z"
                    })
                ])
            }
        }
    }
    if (badge === '1Rep') {
        return {
            render() {
                return h('svg', {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "2 2 20 20",
                    style: "filter: drop-shadow(0 0 6px #ffd700cc); color: #ffd700;"
                }, [
                    h('path', {
                        fill: "currentColor",
                        d: "M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.329.452l-.595.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182l.328-.588Z"
                    })
                ])
            }
        }
    }
    if (badge === '1Lives') {
        return {
            render() {
                return h('svg', {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "4.39 2 15.22 20.97",
                    style: "filter: drop-shadow(0 0 6px #ffd700cc); color: #ffd700;"
                }, [
                    h('path', {
                        fill: "currentColor",
                        d: "m12 8.5l2.116 5.088l5.492.44l-4.184 3.585l1.278 5.36L12 20.1l-4.702 2.872l1.278-5.36l-4.184-3.584l5.492-.44L12 8.5ZM8 2v9H6V2h2Zm10 0v9h-2V2h2Zm-5 0v5h-2V2h2Z"
                    })
                ])
            }
        }
    }
    if (badge === 'BugHunter') {
        return {
            render() {
                return h('svg', {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "4 3.41 16 17.59",
                    style: "filter: drop-shadow(0 0 6px #3d9e5ccc); color: #3d9e5c;"
                }, [
                    h('path', {
                        fill: "currentColor",
                        d: "M19 8h-1.81a5.985 5.985 0 0 0-1.82-1.96l.93-.93a.996.996 0 1 0-1.41-1.41l-1.47 1.47C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L9.11 3.7A.996.996 0 1 0 7.7 5.11l.92.93C7.88 6.55 7.26 7.22 6.81 8H5c-.55 0-1 .45-1 1s.45 1 1 1h1.09c-.05.33-.09.66-.09 1v1H5c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .34.04.67.09 1H5c-.55 0-1 .45-1 1s.45 1 1 1h1.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H19c.55 0 1-.45 1-1s-.45-1-1-1h-1.09c.05-.33.09-.66.09-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1h-1v-1c0-.34-.04-.67-.09-1H19c.55 0 1-.45 1-1s-.45-1-1-1m-6 8h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1m0-4h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1"
                    })
                ])
            }
        }
    }
    // fallback
    return {
        render() {
            return h('svg', {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                style: "filter: drop-shadow(0 0 6px #fff8);"
            }, [
                h('circle', { cx: "12", cy: "12", r: "10", fill: "currentColor" })
            ])
        }
    }
}

function badgeTooltip(badge) {
    if (badge === 'Verified') return 'Verified'
    if (badge === 'Dumb') return 'Dumb'
    if (badge === '1Rep') return 'Top Reputation'
    if (badge === '1Lives') return 'Top Lives'
    if (badge === 'BugHunter') return 'Bug Hunter'
    return badge
}

onMounted(async () => {
    const nickname = route.params.nickname
    if (!nickname) {
        loading.value = false
        return
    }
    // Busca o usuário pelo nickname (case-insensitive)
    const q = query(
        collection(db, 'users'),
        where('nicknameLower', '==', nickname.toLowerCase())
    )
    const snap = await getDocs(q)
    if (!snap.empty) {
        const docSnap = snap.docs[0]
        profileUserId.value = docSnap.id

        // Escuta em tempo real o documento do usuário
        const userDocRef = doc(db, 'users', docSnap.id)
        onSnapshot(userDocRef, (docu) => {
            const data = docu.data()
            if (['Premium', 'Administrator', 'Reseller'].includes(data.status)) {
                userData.value = {
                    photoURL: data.photoURL || '',
                    nickname: data.nickname,
                    description: data.description || '',
                    status: data.status,
                    reputation: data.reputation || 0,
                    views: data.views || 0,
                    usernameEffect: data.usernameEffect || 'none',
                    profileOpacity: data.profileOpacity || 100,
                    badges: data.badges || [],
                    usernameColor: data.usernameColor || '#ffffff',
                }
                // Reinicia o typewriter se necessário
                if (userData.value.usernameEffect === 'typewriter') {
                    typewriterIndex.value = 0
                    clearInterval(typewriterInterval.value)
                    typewriterInterval.value = setInterval(() => {
                        if (typewriterIndex.value < (userData.value.nickname?.length || 0)) {
                            typewriterIndex.value++
                        } else {
                            clearInterval(typewriterInterval.value)
                        }
                    }, 80)
                } else {
                    clearInterval(typewriterInterval.value)
                    typewriterIndex.value = userData.value.nickname?.length || 0
                }
            }
        })

        // Incrementa visualização no Firestore (apenas uma vez)
        await updateDoc(userDocRef, {
            views: (snap.docs[0].data().views || 0) + 1
        })

        // Checa se o usuário autenticado já deu reputação
        const auth = getAuth()
        auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser && currentUser.uid !== docSnap.id) {
                const repDoc = await getDoc(doc(db, 'users', docSnap.id, 'reputations', currentUser.uid))
                hasGivenReputation.value = repDoc.exists()
            } else {
                hasGivenReputation.value = true // Não pode dar reputação para si mesmo ou não logado
            }
        })
    }
    loading.value = false
})

async function giveReputation() {
    const auth = getAuth()
    const currentUser = auth.currentUser
    if (!currentUser || !profileUserId.value || currentUser.uid === profileUserId.value) return
    // Marca que já deu reputação
    hasGivenReputation.value = true
    // Cria subcoleção 'reputations' para evitar múltiplos votos
    await setDoc(doc(db, 'users', profileUserId.value, 'reputations', currentUser.uid), {
        givenAt: serverTimestamp()
    })
    // Atualiza o contador de reputação
    await updateDoc(doc(db, 'users', profileUserId.value), {
        reputation: (userData.value.reputation || 0) + 1
    })
    userData.value.reputation += 1
}
</script>

<style scoped>
.glow-effect {
    text-shadow:
        0 0 16px #ffffff,
        0 0 32px #576784cc,
        0 0 64px #57678499,
        0 0 128px #57678466;
}

.rainbow-effect {
    background: linear-gradient(90deg,
            #ff0080,
            #7928ca,
            #0070f3,
            #357dad,
            #ff0080,
            #7928ca,
            #0070f3,
            #00ffb8,
            #ff0080);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: rainbow 6s linear infinite;
}

@keyframes rainbow {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 200% 50%;
    }
}

@keyframes rainbow {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}

.typewriter-effect {
    border-right: 2px solid #fff;
    white-space: nowrap;
    overflow: hidden;
    animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {

    0%,
    100% {
        border-color: transparent;
    }

    50% {
        border-color: #fff;
    }
}
</style>