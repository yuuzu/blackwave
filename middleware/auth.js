import { auth } from '~/firebase'

export default defineNuxtRouteMiddleware(() => {
  if (!auth.currentUser) {
    return navigateTo('/login')
  }
})