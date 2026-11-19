// Counts one view per page displayed (first load and each navigation)
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  let last = ''
  const view = (path: string) => {
    if (path === last) return
    last = path
    track({ e: 'view', path })
  }
  nuxtApp.hook('app:mounted', () => view(router.currentRoute.value.path))
  router.afterEach((to) => view(to.path))
})
