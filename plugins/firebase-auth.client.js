import { auth } from '~/firebase'

export default defineNuxtPlugin((nuxtApp) => {
  // Garante que o Firebase restaurou o usuário antes de qualquer rota
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      unsubscribe()
      resolve()
    })
  })
})