<template>
  <div class="cart">
    <h2 class="page-title cart__title">Корзина</h2>
    <div class="cart__body">
      <div class="cart__orders">
        <ul class="cart__orders-list">
          <CartCard
            v-for="itemId in cartStore.idsInCart"
            :key="itemId"
            :item-id="itemId"
            :count="cartStore.cartState.inCart[itemId]"
          />
        </ul>
        <div v-if="cartStore.idsInCart.length" class="cart__total">
          <div class="cart__total-left">
            <p class="cart__total-text">Стоимость заказа</p>
            <div class="cart__total-price">
              <span class="cart__total-total-amount">{{ cartStore.totalSum.toFixed(2) }}</span>
              <span class="cart__total-total-amount">₽</span>
            </div>
          </div>
          <VButton label="Очистить корзину" color="light" @click.prevent="cartStore.clearCart" />
        </div>
        <div v-else class="cart__total">Ваша корзина пуста</div>
      </div>

      <div class="cart__form">
        <FormOrder></FormOrder>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VButton from '@/components/VButton.vue'
import CartCard from '@/components/pages/CartCard.vue'
import FormOrder from '@/components/forms/FormOrder.vue'

import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped lang="scss">
.cart {
  &__body {
    display: flex;
    gap: 20px;
  }

  &__orders {
    flex-grow: 1;
    &-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  &__form {
    max-width: 370px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba($accent-color, 0.1);
  }

  &__total {
    display: flex;
    padding: 30px 0;
    font-size: 28px;
    justify-content: space-between;

    &-price {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
