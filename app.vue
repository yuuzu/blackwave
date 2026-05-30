<template>
  <div
    v-if="maintenance"
    class="bg-[#0a0a0a] w-screen h-screen flex flex-col items-center justify-center text-white font-satoshi"
  >
    <div
      class="flex flex-col items-center justify-center bg-[#101010]/70 backdrop-blur-md rounded-xl px-6 py-4 mx-auto"
    >
      <Icon name="pajamas:warning-solid" size="48" class="text-yellow-400 mt-4" />
      <p class="text-2xl font-bold px-4 py-2">We are undergoing maintenance</p>
      <p class="text-lg font-bold pb-2">{{ maintenanceMsg }}</p>
    </div>
  </div>

  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '~/firebase'

const maintenance = ref(false)
const maintenanceMsg = ref("We'll be back soon.")

const { $lenis } = useNuxtApp()

onMounted(async () => {
  const snap = await getDoc(doc(db, 'config', 'maintenance'))

  if (snap.exists() && snap.data().active) {
    maintenance.value = true
    maintenanceMsg.value = snap.data().message || "We'll be back soon."
    return
  }

  // só faz scroll se não estiver em manutenção
  if ($lenis) {
    $lenis.scrollTo('#section2')
  }
})
</script>