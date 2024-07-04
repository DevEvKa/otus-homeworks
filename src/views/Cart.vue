<template>
  <div class="cart">
    <h2 class="page-title cart__title">Корзина</h2>
    <div class="cart__body">
      <div class="cart__orders">
        <ul class="cart__orders-list">
          <li class="cart__order">
            <div href="#" class="cart__order-image">
              <img
                src="https://sun9-48.userapi.com/impg/PiH1Iyj03jWPf25V4mXMr97BU0saZfsfV60sIg/RvMERwY7FeU.jpg?size=605x807&quality=95&sign=a1ecde4851d3bcfbe1d477eff86a22d5&c_uniq_tag=0LlGsGv6y7jbq6ZUFN9pV8_j_PBwi4kyImd09l4tFDU&type=album"
                alt="------------------"
              />
            </div>
            <h5 class="cart__order-title">------------------</h5>
            <div class="cart__order-details">
              <div class="cart__order-counter">
                <VButton
                  label="+"
                  color="light"
                  class="cart__order-increment"
                  @click.prevent="addProduct"
                />
                <p>
                  {{ counter }}
                </p>
                <VButton
                  label="-"
                  color="light"
                  class="cart__order-decrement"
                  @click.prevent="deductProduct"
                />
              </div>
              <div class="cart__order-price">
                <span class="cart__order-amount">{{ counter * price }}</span>
                <span class="cart__order-amount">₽</span>
              </div>
              <VButton
                label="Удалить товар"
                color="light"
                class="cart__order-decrement"
                @click.prevent="deleteProduct"
              />
            </div>
          </li>
        </ul>
        <div class="cart__total">
          <p class="cart__total-text">Стоимость заказа</p>
          <div class="cart__total-price">
            <span class="cart__total-total-amount">50</span>
            <span class="cart__total-total-amount">₽</span>
          </div>
        </div>
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
          <VButton type="submit" label="Оформить заказ" />
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

const deleteProduct = (product) => {
  //после реализации стора здесь будет удаляться товар из корзины
}

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

const price = ref(30)
const counter = ref(1)

const addProduct = () => {
  counter.value++
}

const deductProduct = () => {
  if (counter.value > 0) {
    counter.value--
  }
}
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
    }
  }

  &__order {
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

  &__form {
    max-width: 370px;
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
    flex-direction: column;
    padding: 30px 0;
    font-size: 28px;

    &-price {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
