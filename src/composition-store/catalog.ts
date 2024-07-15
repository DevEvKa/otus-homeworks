import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useFetchData(url) {
  const data = ref(null)
  const isLoading = ref(true)

  onMounted(async () => {
    try {
      const response = await axios.get(url)
      data.value = response.data
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  })

  return { data, isLoading }
}
