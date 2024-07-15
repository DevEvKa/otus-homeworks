import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCatalogStore = defineStore('catalog', () => {
  const catalog = ref([])
  const isLoading = ref(false)

  const getProducts = () => {
    isLoading.value = true
    return axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        //catalog.value.push(response.data)
        catalog.value = response.data
      })
      .catch((error) => {
        console.log(error.response.data.error)
        catalog.value = []
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  getProducts()

  function findItem(id) {
    return catalog.value.find((i) => +i.id === +id)
  }

  return { catalog, isLoading, getProducts, findItem }
})
