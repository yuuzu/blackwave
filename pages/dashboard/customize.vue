<template>
    <div class="flex min-h-screen bg-[#0a0a0a]">
        <!-- Conteúdo principal scrollável -->
        <div class="flex-1 flex flex-col">
            <!-- Notificação global -->
            <transition name="pop-in">
                <div v-if="globalSuccessMsg"
                    class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center px-6 py-3 rounded-2xl bg-[#0d4a1a] border-2 border-[#0b6430] text-[#fafafa] shadow-lg min-w-[240px] max-w-[90vw]">
                    <svg class="mr-3 text-green-400" width="24" height="24" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="#16a34a" />
                        <path d="M8 12.5l2.5 2.5l5-5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span class="font-medium text-sm">{{ globalSuccessMsg }}</span>
                </div>
            </transition>

            <main class="flex-1 overflow-y-auto w-full">
                <section class="max-w-6xl mx-auto w-full px-2 sm:px-4 md:px-8 pt-8">
                    <h2 class="text-2xl font-bold mb-4 text-[#BEBEBE] text-left">Assets Uploader</h2>
                    <div class="bg-[#111] text-white rounded-3xl p-6 sm:p-10 w-full shadow-xl flex flex-col gap-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                            <!-- Audio -->
                            <div class="flex flex-col items-center w-full">
                                <div class="uploader-title text-lg font-semibold mb-6 text-center">Audio</div>
                                <button @click="openAudioManager"
                                    class="flex flex-col items-center justify-center w-full h-[150px] rounded-2xl border-2 border-[#181818] bg-[#0f0f0f] hover:brightness-110 duration-100 transition cursor-pointer">
                                    <span class="mb-4">
                                        <Icon name="streamline-ultimate:folder-add-bold" size="56px" />
                                    </span>
                                    <span class="uploader-text text-[#aaa] text-base">Click to open audio manager</span>
                                </button>
                                <div v-if="audioUrl" class="mt-4 w-full text-center">
                                    <audio :src="audioUrl" controls class="w-full"></audio>
                                </div>
                            </div>
                            <!-- Profile Avatar -->
                            <div class="flex flex-col items-center w-full">
                                <div class="uploader-title text-lg font-semibold mb-6 text-center">Profile Avatar</div>
                                <label
                                    class="flex flex-col items-center justify-center w-full h-[150px] rounded-2xl border-2 border-[#181818] bg-[#0f0f0f] hover:brightness-110 duration-100 transition cursor-pointer">
                                    <input type="file" accept="image/*" @change="onAvatarChange" hidden>
                                    <span class="mb-4">
                                        <Icon name="material-symbols:image-rounded" size="56px" />
                                    </span>
                                    <span class="uploader-text text-[#aaa] text-base">Click to upload a file</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="max-w-6xl mx-auto w-full px-2 sm:px-4 md:px-8 pt-8">
                    <h2 class="text-2xl font-bold mb-4 text-[#BEBEBE] text-left">General Customization</h2>
                    <div class="bg-[#111] text-white rounded-2xl p-4 sm:p-8 w-full shadow-xl">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <!-- Description -->
                            <div>
                                <div class="uploader-title text-base font-semibold mb-2">Description</div>
                                <div class="relative w-full">
                                    <input v-model="description" maxlength="100"
                                        class="w-full bg-[#0c0c0c] rounded-lg px-10 py-3 text-[#bebebe] placeholder-[#666] outline-none border-none text-sm sm:text-base"
                                        placeholder="Describe yourself..." @input="checkUnsaved" />
                                    <span
                                        class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                                        <Icon name="fluent:text-description-32-filled" size="20px"
                                            class="text-[#bebebe]" />
                                    </span>
                                </div>
                            </div>
                            <!-- Username Effects Button -->
                            <div>
                                <div class="uploader-title text-base font-semibold mb-2">Username Effects</div>
                                <button @click="showEffectsModal = true"
                                    class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0c0c0c] border-2 border-transparent hover:border-[#191919] transition w-full shadow min-h-[48px]">
                                    <svg width="24" height="24" fill="none" class="text-white" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <span class="text-base font-medium text-white">Choose Username Effects</span>
                                </button>
                            </div>
                            <div>
                                <div>
                                    <div class="uploader-title text-base font-semibold mb-2">Username Color</div>
                                    <div
                                        class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0c0c0c] border-2 border-transparent hover:border-[#191919] transition w-full shadow min-h-[48px]">
                                        <label class="flex items-center cursor-pointer">
                                            <span class="w-6 h-6 rounded-full border-2 border-[#232323] mr-3"
                                                :style="{ backgroundColor: usernameColor }"></span>
                                            <input type="color" v-model="usernameColor"
                                                class="w-0 h-0 opacity-0 absolute" @input="checkUnsaved" />
                                        </label>
                                        <input v-model="usernameColor" maxlength="7"
                                            class="bg-transparent border-none outline-none text-[#fafafa] text-base w-20"
                                            @input="checkUnsaved" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Barra de alterações não salvas -->
                <transition name="fade">
                    <div v-if="unsaved"
                        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-6 py-3 rounded-2xl bg-[#181818] border border-[#232323] shadow-lg min-w-[480px] sm:min-w-[340px] sm:max-w-[90vw]">
                        <span class="text-[#fafafa] text-base">You have unsaved changes!</span>
                        <button @click="resetChanges"
                            class="text-[#bebebe] hover:underline ml-8 mr-4 text-lg">Reset</button>
                        <button @click="saveCustomization"
                            class="bg-[#2d303d] hover:brightness-110 border-2 border-[#434653] text-white font-semibold px-5 py-1 rounded-full transition text-base duration-100">
                            Save Changes
                        </button>
                    </div>
                </transition>
            </main>

            <!-- Modal para selecionar efeitos -->
            <div v-if="showEffectsModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div class="bg-[#111111] rounded-xl shadow-xl p-8 w-full max-w-[340px] relative flex flex-col gap-6"
                    style="min-width:320px;">
                    <button @click="showEffectsModal = false"
                        class="absolute top-3 right-3 text-[#bebebe] hover:text-white text-xl">&times;</button>
                    <div class="grid grid-cols-2 gap-4">
                        <label v-for="effect in effectsList" :key="effect.value"
                            class="flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 w-[120px] h-[90px] sm:w-[130px] sm:h-[100px] transition-all text-center"
                            :class="usernameEffect === effect.value ? 'border-[#576784] bg-[#23263a]' : 'border-[#232323] bg-[#191919]'">
                            <input type="radio" v-model="usernameEffect" :value="effect.value" class="hidden"
                                @change="checkUnsaved" />
                            <span :class="[
                                'text-lg font-bold',
                                effect.value === 'glow' ? 'glow-effect' : '',
                                effect.value === 'rainbow' ? 'rainbow-effect' : '',
                                effect.value === 'typewriter' ? 'typewriter-effect' : ''
                            ]"
                                :style="(effect.value === 'none' || effect.value === 'glow') ? `color: ${usernameColor}` : ''">
                                {{ previewUsername }}
                            </span>
                            <span class="text-xs text-[#bebebe] mt-2">{{ effectLabels[effect.value] }}</span>
                        </label>
                    </div>
                    <div class="flex flex-col gap-3 justify-center mt-2">
                        <button @click="showEffectsModal = false"
                            class="bg-[#181818] border-2 border-[#212121] hover:brightness-110 text-[#bebebe] font-semibold px-4 py-2 rounded-lg transition">
                            Cancel
                        </button>
                        <button @click="saveCustomization"
                            class="bg-[#2d303d] border-2 border-[#4a4d5b] hover:brightness-110 text-white font-semibold px-4 py-2 rounded-lg transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            userId.value = user.uid
            const userDoc = await getDoc(doc(db, 'users', user.uid))
            if (userDoc.exists()) {
                avatarUrl.value = userDoc.data().photoURL || ''
                audioUrl.value = userDoc.data().audioURL || ''
                avatarFileName.value = avatarUrl.value ? avatarUrl.value.split('/').pop() : ''
                description.value = userDoc.data().description || ''
                usernameEffect.value = userDoc.data().usernameEffect || 'none'
                profileOpacity.value = userDoc.data().profileOpacity || 100
                previewUsername.value = userDoc.data().nickname || 'yourUsername'
                usernameColor.value = userDoc.data().usernameColor || '#ffffff'
                originalUsernameColor.value = usernameColor.value
                // Salva valores originais para comparação
                originalDescription.value = description.value
                originalUsernameEffect.value = usernameEffect.value
            }
        }
    })
})

// Detecta alterações para mostrar barra de "unsaved changes"
function checkUnsaved() {
    unsaved.value =
        description.value !== originalDescription.value ||
        usernameEffect.value !== originalUsernameEffect.value ||
        usernameColor.value !== originalUsernameColor.value
}

// Também observa mudanças para inputs feitos por outros métodos
watch([description, usernameEffect], checkUnsaved)

async function onAvatarChange(e) {
    errorMsg.value = ''
    successMsg.value = ''
    const file = e.target.files[0]
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
        successMsg.value = 'Avatar updated successfully!'
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
            usernameColor: usernameColor.value,
        })
        successMsg.value = 'Customization saved!'
        showGlobalSuccess('Successfully saved customization.')
        showEffectsModal.value = false
        // Atualiza valores originais
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
    unsaved.value = false
}

function openAudioManager() {
    alert('Audio manager coming soon!')
}
</script>

<style scoped>
.pop-in-enter-active,
.pop-in-leave-active {
    transition: opacity 0.4s, transform 0.4s;
}

.pop-in-enter-from,
.pop-in-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.assets-uploader {
    background: #111;
    color: #fff;
    border-radius: 16px;
}

.uploader-title {
    font-size: 1.1rem;
    margin-bottom: 12px;
    font-weight: 500;
}

.uploader-content {
    transition: border 0.2s;
}

.uploader-content:hover {
    border: 2px solid #576784;
}

.icon {
    margin-bottom: 12px;
}

.uploader-text {
    color: #aaa;
    font-size: 1rem;
}

input[type="range"] {
    height: 4px;
    border-radius: 2px;
    background: #232323;
}

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