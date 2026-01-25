<template>
    <div class="w-full mx-auto pt-20 md:pt-8 px-4 sm:px-6 lg:px-10">
        <!-- Toast global -->
        <transition name="pop-in">
            <div v-if="globalSuccessMsg" class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl
               bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl
               text-white shadow-[0_18px_60px_rgba(0,0,0,0.55)] max-w-[92vw]">
                <span
                    class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20">
                    <Icon name="mdi:check-bold" size="18" class="text-emerald-300" />
                </span>
                <span class="font-medium text-sm text-white/90">{{ globalSuccessMsg }}</span>
            </div>
        </transition>

        <!-- Header -->
        <div
            class="inline-flex items-center gap-2 w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur-xl">
            <span class="h-1.5 w-1.5 rounded-full bg-[#7aa7ff] shadow-[0_0_18px_rgba(122,167,255,0.9)]"></span>
            Dashboard • Customize
        </div>
        <div class="mt-4 mb-5 md:mb-7">
            <h2 class="text-xl md:text-3xl font-black tracking-tight text-white">Assets Uploader</h2>
            <p class="text-sm text-white/55 mt-1">Upload and manage assets for your profile.</p>
        </div>

        <!-- Assets Uploader -->
        <section class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
             shadow-[0_18px_70px_rgba(0,0,0,0.55)] p-5 sm:p-7 md:p-10
             flex flex-col gap-8 overflow-hidden relative">
            <div
                class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.18),transparent_55%)]">
            </div>

            <div class="relative grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
                <!-- Audio -->
                <div class="flex flex-col items-center w-full">
                    <div class="text-base font-semibold mb-4 text-center text-white">Audio</div>

                    <button @click="openAudioManager" class="w-full h-[150px] rounded-2xl border border-white/10 bg-black/25
                   hover:bg-white/5 hover:border-white/15 transition
                   flex flex-col items-center justify-center gap-3">
                        <Icon name="streamline-ultimate:folder-add-bold" size="52px" class="text-white/85" />
                        <span class="text-white/55 text-sm">Click to open audio manager</span>
                    </button>

                    <div v-if="audioUrl" class="mt-4 w-full">
                        <audio :src="audioUrl" controls class="w-full"></audio>
                    </div>
                </div>

                <!-- Profile Avatar -->
                <div class="flex flex-col items-center w-full">
                    <div class="text-base font-semibold mb-4 text-center text-white">Profile Avatar</div>

                    <label class="w-full h-[150px] rounded-2xl border border-white/10 bg-black/25
                   hover:bg-white/5 hover:border-white/15 transition
                   flex flex-col items-center justify-center gap-3 cursor-pointer">
                        <input type="file" accept="image/*" @change="onAvatarChange" hidden />
                        <Icon name="material-symbols:image-rounded" size="52px" class="text-white/85" />
                        <span class="text-white/55 text-sm">Click to upload a file</span>
                    </label>

                    <div v-if="avatarUrl" class="mt-4 w-full flex items-center gap-3">
                        <img :src="avatarUrl" alt="Avatar preview"
                            class="w-12 h-12 rounded-2xl object-cover border border-white/10 bg-black/30" />
                        <div class="min-w-0">
                            <div class="text-sm font-semibold text-white truncate">
                                {{ avatarFileName || 'avatar' }}
                            </div>
                            <div class="text-xs text-white/55">Current avatar</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- General Customization -->
        <div class="mt-8 mb-5 md:mb-7">
            <h2 class="text-xl md:text-3xl font-black tracking-tight text-white">General Customization</h2>
            <p class="text-sm text-white/55 mt-1">Customize your profile description and username style.</p>
        </div>

        <section class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
             shadow-[0_18px_70px_rgba(0,0,0,0.55)] p-5 sm:p-7 md:p-8
             overflow-hidden relative">
            <div class="pointer-events-none absolute -inset-1 opacity-60 "></div>

            <div class="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                <!-- Description -->
                <div>
                    <div class="text-sm font-semibold mb-2 text-white">Description</div>
                    <div class="relative w-full">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
                            <Icon name="fluent:text-description-32-filled" size="20px" />
                        </span>

                        <input v-model="description" maxlength="100" placeholder="Describe yourself..."
                            @input="checkUnsaved" class="w-full rounded-2xl px-10 py-3 bg-black/25 border border-white/10 text-white placeholder-white/35
                     outline-none focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition" />

                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                            {{ description.length }}/100
                        </span>
                    </div>
                </div>

                <!-- Username Effects -->
                <div>
                    <div class="text-sm font-semibold mb-2 text-white">Username Effects</div>
                    <button @click="showEffectsModal = true" class="w-full min-h-[48px] rounded-2xl px-4 py-3 bg-black/25 border border-white/10
                   hover:bg-white/5 hover:border-white/15 transition
                   flex items-center gap-3">
                        <Icon name="mdi:sparkles" size="22" class="text-[#7aa7ff]" />
                        <span class="text-sm font-semibold text-white">Choose Username Effects</span>
                    </button>

                    <div class="mt-2 text-xs text-white/50">
                        Preview: <span class="font-semibold text-white/80">{{ previewUsername }}</span>
                    </div>
                </div>

                <!-- Username Color -->
                <div>
                    <div class="text-sm font-semibold mb-2 text-white">Username Color</div>
                    <div class="w-full min-h-[48px] rounded-2xl px-4 py-3 bg-black/25 border border-white/10
                   hover:bg-white/5 hover:border-white/15 transition flex items-center gap-3">
                        <label class="flex items-center cursor-pointer">
                            <span class="w-6 h-6 rounded-full border border-white/15"
                                :style="{ backgroundColor: usernameColor }"></span>
                            <input type="color" v-model="usernameColor" class="w-0 h-0 opacity-0 absolute"
                                @input="checkUnsaved" />
                        </label>

                        <input v-model="usernameColor" maxlength="7" @input="checkUnsaved"
                            class="bg-transparent outline-none border-none text-white font-mono text-sm w-24" />

                        <div class="ml-auto text-xs text-white/45">
                            Click the dot to pick
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Barra de alterações não salvas -->
        <transition name="fade">
            <div v-if="unsaved" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40
               w-[92vw] max-w-[780px]
               rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
               shadow-[0_18px_60px_rgba(0,0,0,0.55)]
               px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span class="text-white/85 text-sm sm:text-base font-semibold">
                    You have unsaved changes!
                </span>

                <div class="flex items-center justify-end gap-3">
                    <button @click="resetChanges"
                        class="text-white/60 hover:text-white hover:underline transition text-sm">
                        Reset
                    </button>
                    <button @click="saveCustomization" class="rounded-full px-5 py-2 text-sm font-bold text-white
                   bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </transition>

        <!-- Modal: efeitos -->
        <transition name="modal-fade">
            <div v-if="showEffectsModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showEffectsModal = false"></div>

                <transition name="modal-zoom">
                    <div class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-6 sm:p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden">
                        <div
                            class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.20),transparent_55%)]">
                        </div>

                        <button @click="showEffectsModal = false"
                            class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center">
                            <Icon name="mdi:close" size="22" class="text-white/70" />
                        </button>

                        <div class="relative">
                            <div class="mb-4">
                                <div class="text-lg font-black text-white">Username Effects</div>
                                <div class="text-sm text-white/55">Choose an effect for your username.</div>
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <label v-for="effect in effectsList" :key="effect.value" class="cursor-pointer rounded-2xl border p-4 flex flex-col items-center justify-center gap-2 text-center
                         transition" :class="usernameEffect === effect.value
                            ? 'border-[#7aa7ff]/40 bg-[#7aa7ff]/10'
                            : 'border-white/10 bg-black/20 hover:bg-white/5 hover:border-white/15'">
                                    <input type="radio" v-model="usernameEffect" :value="effect.value" class="hidden"
                                        @change="checkUnsaved" />

                                    <span :class="[
                                        'text-lg font-black',
                                        effect.value === 'glow' ? 'glow-effect' : '',
                                        effect.value === 'rainbow' ? 'rainbow-effect' : '',
                                        effect.value === 'typewriter' ? 'typewriter-effect' : ''
                                    ]" :style="(effect.value === 'none' || effect.value === 'glow') ? `color: ${usernameColor}` : ''">
                                        {{ previewUsername }}
                                    </span>

                                    <span class="text-xs text-white/55">{{ effectLabels[effect.value] }}</span>
                                </label>
                            </div>

                            <div class="flex gap-3 mt-6">
                                <button @click="showEffectsModal = false" class="flex-1 rounded-2xl px-4 py-2 text-sm font-bold text-white
                         bg-black/25 border border-white/10 hover:bg-white/5 hover:border-white/15 transition">
                                    Cancel
                                </button>
                                <button @click="saveCustomization" class="flex-1 rounded-2xl px-4 py-2 text-sm font-bold text-white
                         bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const avatarUrl = ref('')
const avatarFileName = ref('')
const audioUrl = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const description = ref('')
const usernameEffect = ref('none')
const profileOpacity = ref(100)
const showEffectsModal = ref(false)
const globalSuccessMsg = ref('')
const usernameColor = ref('#ffffff')
const originalUsernameColor = ref('#ffffff')

const userId = ref(null)
const previewUsername = ref('yourUsername')

// Unsaved changes
const originalDescription = ref('')
const originalUsernameEffect = ref('none')
const unsaved = ref(false)

const effectsList = [
    { value: 'none' },
    { value: 'glow' },
    { value: 'rainbow' },
    { value: 'typewriter' }
]
const effectLabels = {
    none: 'None',
    glow: 'Glow',
    rainbow: 'Rainbow',
    typewriter: 'Typewriter'
}

function showGlobalSuccess(msg) {
    globalSuccessMsg.value = msg
    setTimeout(() => {
        globalSuccessMsg.value = ''
    }, 3500)
}

onMounted(async () => {
    auth.onAuthStateChanged(async user => {
        if (!user) return
        userId.value = user.uid

        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (!userDoc.exists()) return

        avatarUrl.value = userDoc.data().photoURL || ''
        audioUrl.value = userDoc.data().audioURL || ''
        avatarFileName.value = avatarUrl.value ? avatarUrl.value.split('/').pop() : ''

        description.value = userDoc.data().description || ''
        usernameEffect.value = userDoc.data().usernameEffect || 'none'
        profileOpacity.value = userDoc.data().profileOpacity || 100
        previewUsername.value = userDoc.data().nickname || 'yourUsername'

        usernameColor.value = userDoc.data().usernameColor || '#ffffff'
        originalUsernameColor.value = usernameColor.value

        // originais
        originalDescription.value = description.value
        originalUsernameEffect.value = usernameEffect.value
    })
})

function checkUnsaved() {
    unsaved.value =
        description.value !== originalDescription.value ||
        usernameEffect.value !== originalUsernameEffect.value ||
        usernameColor.value !== originalUsernameColor.value
}

watch([description, usernameEffect, usernameColor], checkUnsaved)

async function onAvatarChange(e) {
    errorMsg.value = ''
    successMsg.value = ''
    const file = e.target.files?.[0]
    if (!file || !userId.value) return

    if (!file.type.startsWith('image/')) {
        errorMsg.value = 'Please select a valid image file.'
        return
    }
    if (file.size > 3 * 1024 * 1024) {
        errorMsg.value = 'The image must be at most 3MB.'
        return
    }

    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'archive')

        const res = await fetch('https://api.cloudinary.com/v1_1/dxoylrx16/image/upload', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        if (!data.secure_url) throw new Error('Upload failed')

        avatarUrl.value = data.secure_url
        avatarFileName.value = file.name

        await updateDoc(doc(db, 'users', userId.value), { photoURL: data.secure_url })
        showGlobalSuccess('Successfully saved avatar.')
    } catch (e) {
        errorMsg.value = 'Error uploading avatar.'
    }
}

async function saveCustomization() {
    errorMsg.value = ''
    successMsg.value = ''
    if (!userId.value) return

    try {
        await updateDoc(doc(db, 'users', userId.value), {
            description: description.value.slice(0, 100),
            usernameEffect: usernameEffect.value,
            profileOpacity: Number(profileOpacity.value),
            usernameColor: usernameColor.value
        })

        showGlobalSuccess('Successfully saved customization.')
        showEffectsModal.value = false

        originalDescription.value = description.value
        originalUsernameEffect.value = usernameEffect.value
        originalUsernameColor.value = usernameColor.value
        unsaved.value = false
    } catch (e) {
        errorMsg.value = 'Error saving customization.'
    }
}

function resetChanges() {
    description.value = originalDescription.value
    usernameEffect.value = originalUsernameEffect.value
    usernameColor.value = originalUsernameColor.value
    unsaved.value = false
}

function openAudioManager() {
    alert('Audio manager coming soon!')
}
</script>

<style scoped>
.pop-in-enter-active,
.pop-in-leave-active {
    transition: opacity 0.35s ease, transform 0.35s ease;
}

.pop-in-enter-from,
.pop-in-leave-to {
    opacity: 0;
    transform: translateY(-14px);
}

/* fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-zoom-enter-active,
.modal-zoom-leave-active {
    transition: all 0.26s cubic-bezier(.4, 2, .6, 1);
}

.modal-zoom-enter-from,
.modal-zoom-leave-to {
    opacity: 0;
    transform: scale(0.92);
}

/* effects */
.glow-effect {
    text-shadow:
        0 0 16px #576784,
        0 0 32px #576784cc,
        0 0 64px #57678499,
        0 0 128px #57678466;
}

.rainbow-effect {
    background: linear-gradient(90deg, #ff0080, #7928ca, #0070f3, #00ffb8, #ff0080);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: rainbow 2s linear infinite;
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
