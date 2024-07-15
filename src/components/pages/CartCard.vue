<template>
  <li class="cart__order" v-if="count > 0">
    <div class="cart__order-image">
      <img :src="productItem.image" :alt="productItem.title" />
    </div>
    <h5 class="cart__order-title">{{ productItem.title }}</h5>
    <div class="cart__order-details">
      <div class="cart__order-counter">
        <VButton
          label="+"
          color="light"
          class="cart__order-increment"
          @click.prevent="cartStore.addToCart(productItem.id)"
        />
        <p>{{ count }} шт.</p>
        <VButton
          label="-"
          color="light"
          class="cart__order-decrement"
          @click.prevent="cartStore.reduceInCart(productItem.id)"
        />
      </div>
      <div class="cart__order-price">
        <span class="cart__order-amount">{{ productItem.price * count }}</span>
        <span class="cart__order-amount">₽</span>
      </div>
      <VButton
        label="Удалить товар"
        color="light"
        class="cart__order-decrement"
        @click.prevent="cartStore.removeFromCart(productItem.id)"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCatalogStore } from '@/stores/catalog'
import { useCartStore } from '@/stores/cart'

import VButton from '../../components/VButton.vue'

const catalogStore = useCatalogStore()
const cartStore = useCartStore()

const props = defineProps<{
  itemId: any
  count: any
}>()

const productItem = computed(() =>
  catalogStore.catalog.find((product) => +product.id === +props.itemId)
)
</script>

<style lang="scss" scoped>
.cart__order {
  width: 100%;
  border: 1px solid $dark-main;
  position: relative;
  display: flex;
  gap: 16px;
  border-radius: 10px;
  padding: 8px;

  &-image {
    width: 150px;
    height: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: 0.2s;
    }
  }

  &-title {
    display: flex;
    flex-grow: 1;
  }

  &-counter {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 26px;

    button {
      width: 50px;
      height: 50px;
    }
  }

  &-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 50px;
  }

  &-price {
    display: flex;
    gap: 8px;
    font-size: 26px;
  }
}
</style>
