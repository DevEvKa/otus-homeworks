<template>
  <p class="order-form__title">Оформите заказ прямо сейчас!</p>
  <form class="order-form__form" @submit.prevent="submitForm">
    <VInput
      class="order-form__input"
      label="Ваше имя"
      name="nameField"
      placeholder="Ваше имя"
      v-model:value="v.nameField.$model"
      :error="v.nameField.$errors"
    />
    <VInput
      class="order-form__input"
      label="Ваша фамилия"
      name="surnameField"
      placeholder="Ваша фамилия"
      v-model:value="v.surnameField.$model"
      :error="v.surnameField.$errors"
    />
    <VInput
      class="order-form__input"
      label="Ваш e-mail"
      name="emailField"
      placeholder="Ваш e-mail"
      v-model:value="v.emailField.$model"
      :error="v.emailField.$errors"
    />
    <VInput
      class="order-form__input"
      label="Ваш номер телефона"
      name="phoneField"
      placeholder="Ваш номер телефона"
      v-model:value="v.phoneField.$model"
      :error="v.phoneField.$errors"
    />
    <VButton type="submit" label="Оформить заказ" :disabled="!cartStore.idsInCart" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers, email } from '@vuelidate/validators'

import VInput from '@/components/VInput.vue'
import VButton from '@/components/VButton.vue'

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

<style lang="scss" scoped>
.order-form {
  &__title {
    font-size: 20px;
    margin-bottom: 32px;
  }

  &__input {
    width: 350px;
  }
}
</style>
