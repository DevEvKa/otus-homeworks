<template>
  <div class="product-card">
    <div class="product-card__top">
      <div class="product-card__image">
        <img :src="product.image" :alt="product.title" />
      </div>
    </div>
    <div class="product-card__bottom">
      <a :href="`/products/${product.id}`" class="product-card__title">
        {{ product.title }}
      </a>
      <div class="product-card__row">
        <p class="product-card__rating">{{ product.rating?.rate }}</p>
        <div class="product-card__price">
          <span class="product-card__amount">{{ product.price }}</span>
          <span class="product-card__amount">₽</span>
        </div>
      </div>
      <button class="product-card__button" @click="cartStore.addToCart(product.id)">
        В корзину
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

type Product = {
  id: number
  title: string
  category: string
  description: string
  image: string
  price: number | string
  rating: {
    rate: number | string
    count: number | string
  }
}

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

const count = ref(0)

//const sum = computed(() => count.value * props.product.price)

// function addToCart() {
//   cartStore.addToCart(props.product.id)
//   count.value = 0
// }

// const emit = defineEmits(['addToCart'])

// const addProductToCart = (title: string, price: string | number) => {
//   emit('addToCart', [title, price])
// }
</script>

<style scoped lang="scss">
.product-card {
  width: calc(33% - 8px);
  min-height: 350px;
  box-shadow: 1px 2px 4px $dark-main;
  border: 1px solid $dark-main;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  transition: 0.2s;
  position: relative;

  @include md {
    width: calc(50% - 8px);
  }

  @include sm {
    width: 100%;
  }

  &:hover {
    box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.1);
  }

  &__top {
    flex: 0 0 220px;
    position: relative;
  }

  &__image {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    padding: 10px;
  }

  &__price {
    font-weight: 400;
    font-size: 17px;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }

  &__title {
    display: block;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 17px;
    line-height: 150%;
    color: #414141;
  }

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    display: block;
    width: 100%;
    font-weight: 400;
    font-size: 17px;
    color: $dark-main;
    padding: 10px;
    text-align: center;
    border: 1px solid $dark-main;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s;
    margin-top: auto;

    &:hover {
      border: 1px solid $dark-main;
      background-color: $dark-main;
      color: $light-main;
    }
  }
}
</style>
