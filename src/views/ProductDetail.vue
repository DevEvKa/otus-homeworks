<template>
  <div>
    <div v-if="catalogStore.isLoading">Загрузка...</div>
    <div v-else>
      <h2 class="page-title">{{ product.title }}</h2>
      <p class="product-detail__description">{{ product.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'

const route = useRoute()
const catalogStore = useCatalogStore()

const productId = computed(() => {
  const pagePath = route.path
  return pagePath.split('/').slice(-1).join('')
})

let product = {}

Object.keys(catalogStore.catalog).forEach((key) => {
  if (+key === +productId.value) {
    product = catalogStore.catalog[key]
  }
})
</script>
