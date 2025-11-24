export const useManuelPages = () => {
  const pages = ref<any[]>([])
  const currentPage = ref(1)
  const totalPages = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPages = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/data/manuel-pages.json')
      if (!response.ok) throw new Error('Failed to fetch pages')
      const data = await response.json()
      pages.value = data.pages
      totalPages.value = data.totalPages
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const getCurrentPageData = () => {
    return pages.value[currentPage.value - 1] || null
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
      currentPage.value = pageNumber
    }
  }

  onMounted(() => {
    fetchPages()
  })

  return {
    pages,
    currentPage,
    totalPages,
    loading,
    error,
    getCurrentPageData,
    nextPage,
    prevPage,
    goToPage,
  }
}
