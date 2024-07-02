<template>
  <div>
    <h1>Каталог</h1>
    <ul class="products__list">
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue';
import { ref } from 'vue';

const products = ref(null);

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => products.value = data);

</script>

<style scoped lang="scss">

.products {

  &__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: auto;
    gap: 16px;
  }
}

</style>