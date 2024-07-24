import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import type { IProduct } from '../types/catalog.ts'

export const useCatalogStore = defineStore('catalog', () => {
  const catalog = ref<IProduct[]>([])
  const isLoading = ref(false)

  const getProducts = () => {
    isLoading.value = true
    return axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
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

  function findItem(id: Number) {
    return catalog.value.find((i) => +i.id === +id)
  }

  return { catalog, isLoading, getProducts, findItem }
})
