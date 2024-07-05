<template>
  <div>
    <h2 class="page-title">Товар номер {{ productId }}</h2>
    <p class="description">{{ product.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const productId = computed(() => {
  const pagePath = route.path
  return pagePath.split('/').slice(-1).join('')
})

const productsList = JSON.parse(localStorage.getItem('products'))

let product

productsList.forEach((item) => {
  if (item.id === Number(productId.value)) {
    product = item
  }
})
</script>
