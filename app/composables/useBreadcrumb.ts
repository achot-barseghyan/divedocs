// composables/useBreadcrumb.ts
import type { MenuItem } from 'primevue/menuitem'

export const useBreadcrumb = () => {
  const route = useRoute()
  const router = useRouter()

  const generateBreadcrumbs = (): MenuItem[] => {
    const pathArray = route.path.split('/').filter((path: string) => path)
    const breadcrumbs: MenuItem[] = []

    pathArray.forEach((segment: string, index: number) => {
      const targetPath = '/' + pathArray.slice(0, index + 1).join('/')

      const matchedRoute = router.getRoutes().find((r) => r.path === targetPath)
      const label =
        (matchedRoute?.meta?.breadcrumb as string) ||
        segment
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

      breadcrumbs.push({
        label: label,
        url: targetPath,
      })
    })

    return breadcrumbs
  }

  return {
    breadcrumbs: computed(() => generateBreadcrumbs()),
  }
}
