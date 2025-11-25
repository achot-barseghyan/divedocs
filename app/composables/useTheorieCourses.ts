export interface Course {
  id: number
  title: string
  description: string
  duration: string
  icon: string
}

export const useTheorieCourses = () => {
  const courses = ref<Course[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // Fetch courses from JSON file
  const fetchCourses = async () => {
    loading.value = true
    error.value = null

    try {
      // Option 1: From public folder
      const response = await fetch('/data/theorie-courses.json')
      if (!response.ok) {
        throw new Error('Failed to fetch courses')
      }

      courses.value = await response.json()

      // Option 2: Using $fetch (Nuxt's built-in)
      // courses.value = await $fetch<Course[]>('/data/courses.json')
    } catch (e) {
      error.value = e as Error
      console.error('Error fetching courses:', e)
    } finally {
      loading.value = false
    }
  }

  // Get all courses
  const getAllCourses = computed(() => courses.value)

  const getCourseById = (id: number) => {
    return computed(() => courses.value.find((c) => c.id === id) || null)
  }

  // Search courses - Fixed to accept reactive query
  const searchCourses = (query: Ref<string> | string) => {
    return computed(() => {
      const searchQuery = typeof query === 'string' ? query : query.value

      if (!searchQuery || searchQuery.trim() === '') return courses.value

      const lowerQuery = searchQuery.toLowerCase().trim()
      return courses.value.filter(
        (course) =>
          course.title.toLowerCase().includes(lowerQuery) ||
          course.description.toLowerCase().includes(lowerQuery)
      )
    })
  }

  // Filter courses by duration
  const filterByDuration = (maxDuration: string) => {
    return computed(() => {
      return courses.value.filter((course) => course.duration === maxDuration)
    })
  }

  // Get total courses count
  const totalCourses = computed(() => courses.value.length)

  // Get total duration (approximation in hours)
  const getTotalDuration = computed(() => {
    let totalHours = 0
    courses.value.forEach((course) => {
      const duration = course.duration
      if (duration.includes('heure')) {
        const hours = parseFloat(duration)
        totalHours += hours
      } else if (duration.includes('min')) {
        const minutes = parseFloat(duration)
        totalHours += minutes / 60
      }
    })
    return Math.round(totalHours * 10) / 10 // Round to 1 decimal
  })

  return {
    courses: getAllCourses,
    loading,
    error,
    fetchCourses,
    getAllCourses,
    getCourseById,
    searchCourses,
    filterByDuration,
    totalCourses,
    getTotalDuration,
  }
}
