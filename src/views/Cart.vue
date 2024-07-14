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
              <span class="cart__total-total-amount">{{ cartStore.totalSum }}</span>
              <span class="cart__total-total-amount">₽</span>
            </div>
          </div>
          <VButton label="Очистить корзину" color="light" @click.prevent="cartStore.clearCart" />
        </div>
        <div v-else class="cart__total">Ваша корзина пуста</div>
      </div>

      <div class="cart__form">
        <p class="cart__form-title">Оформите заказ прямо сейчас!</p>
        <form class="cart__form-form" @submit.prevent="submitForm">
          <VInput
            class="cart__form-input"
            label="Ваше имя"
            name="nameField"
            placeholder="Ваше имя"
            v-model:value="v.nameField.$model"
            :error="v.nameField.$errors"
          />
          <VInput
            class="cart__form-input"
            label="Ваша фамилия"
            name="surnameField"
            placeholder="Ваша фамилия"
            v-model:value="v.surnameField.$model"
            :error="v.surnameField.$errors"
          />
          <VInput
            class="cart__form-input"
            label="Ваш e-mail"
            name="emailField"
            placeholder="Ваш e-mail"
            v-model:value="v.emailField.$model"
            :error="v.emailField.$errors"
          />
          <VInput
            class="cart__form-input"
            label="Ваш номер телефона"
            name="phoneField"
            placeholder="Ваш номер телефона"
            v-model:value="v.phoneField.$model"
            :error="v.phoneField.$errors"
          />
          <VButton type="submit" label="Оформить заказ" :disabled="!cartStore.idsInCart" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers, email } from '@vuelidate/validators'

import VInput from '../components/VInput.vue'
import VButton from '../components/VButton.vue'
import CartCard from '../components/pages/CartCard.vue'

import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// form validation.start

const nameField = ref('')
const surnameField = ref('')
const emailField = ref('')
const phoneField = ref('')

const number = (value: string) => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value)

const rules = computed(() => ({
  nameField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    minLength: helpers.withMessage(`Минимальная длина: 2 символа`, minLength(2))
  },
  surnameField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    minLength: helpers.withMessage(`Минимальная длина: 2 символа`, minLength(2))
  },
  emailField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    email: helpers.withMessage(`Введите корректный адрес`, email)
  },
  phoneField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    phoneField: helpers.withMessage(`Введите корректный номер`, number)
  }
}))

const v = useVuelidate(rules, { nameField, surnameField, emailField, phoneField })

const submitForm = () => {
  const result = v.value.$validate()
  result
    .then((res) => {
      if (res) {
        alert('Form submitted.')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// form validation.end
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

    &-title {
      font-size: 20px;
      margin-bottom: 32px;
    }

    &-input {
      width: 350px;
    }
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
