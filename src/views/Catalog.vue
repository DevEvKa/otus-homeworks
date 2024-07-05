<template>
  <div class="container catalog">
    <div class="catalog__top">
      <h2 class="page-title">Каталог</h2>
      <VInput
        class="input catalog__filters-input"
        name="searchProductDescription"
        placeholder="Поиск по описанию"
        v-model:value="searchProductDescription"
      />
    </div>

    <div class="catalog__main">
      <aside class="catalog__filters">
        <VInput
          class="input catalog__filters-input"
          name="searchProductTitle"
          placeholder="Поиск по названию"
          v-model:value="searchProductTitle"
        />
        <VInput
          class="input catalog__filters-input"
          name="searchProductPrice"
          placeholder="Поиск по цене"
          v-model:value="searchProductPrice"
        />
        <VButton class="button catalog__reset-button" label="Сбросить" @click="cleanFilters" />
      </aside>
      <ul class="catalog__products">
        <ProductCard
          v-for="(product, index) in filteredProducts"
          :key="index"
          :product="product"
          @add-to-cart="addSelectedProduct(product)"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '../components/pages/ProductCard.vue'
import VInput from '../components/VInput.vue'
import VButton from '../components/VButton.vue'
import { ref, computed } from 'vue'

let products = ref([])

fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then(
    (data) => (
      (products.value = data), localStorage.setItem('products', JSON.stringify(products.value))
    )
  )

const searchProductDescription = ref('')
const searchProductTitle = ref('')
const searchProductPrice = ref('')

const filteredProducts = computed(() => {
  return products?.value
    .filter((product) =>
      product.description.toLowerCase().includes(searchProductDescription.value.toLowerCase())
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchProductTitle.value.toLowerCase())
    )
    .filter((product) => product.price > Number(searchProductPrice.value))
})

const cleanFilters = () => {
  searchProductTitle.value = ''
  searchProductPrice.value = ''
}

const addSelectedProduct = (productData) => {
  if (localStorage.getItem('cart') === null) {
    localStorage.setItem('cart', JSON.stringify([{ product: productData, counter: 1 }]))
    return
  }
  let productsInCart = JSON.parse(localStorage.getItem('cart'))

  let isContainProduct = false
  let productIndex
  productsInCart.forEach((item, index) => {
    if (item.product.id === productData.id) {
      isContainProduct = true
      productIndex = index
    }
  })

  if (isContainProduct) {
    productsInCart[productIndex].counter++
  } else {
    productsInCart.push({ product: productData, counter: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(productsInCart))
}
</script>

<style scoped lang="scss">
.catalog {
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__main {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  &__filters {
    width: 24%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .v-input {
      width: unset;
      margin-bottom: 20px;
    }
  }

  &__products {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    gap: 16px;
  }

  :deep(.v-input__text) {
    border-color: $dark-main;
  }
}
</style>
