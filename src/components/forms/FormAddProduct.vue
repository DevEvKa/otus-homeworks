<template>
  <div class="form">
    <p class="form__title">Добавление товара</p>
    <form class="form__form" @submit.prevent="submitForm">
      <VInput
        class="form__input"
        label="Название товара"
        name="nameField"
        placeholder="Название товара"
        v-model:value="v.nameField.$model"
        :error="v.nameField.$errors"
      />
      <VInput
        class="form__input"
        label="Категория товара"
        name="categoryField"
        placeholder="Категория товара"
        v-model:value="v.categoryField.$model"
        :error="v.categoryField.$errors"
      />
      <VTextarea
        label="Описание товара"
        name="descriptionField"
        placeholder="Описание товара"
        accept="image/png, image/jpeg"
        v-model:value="v.descriptionField.$model"
        :error="v.descriptionField.$errors"
      />
      <VInput
        class="form__input"
        type="file"
        label="Фотография товара"
        name="photoField"
        placeholder="Фотография товара"
        accept="image/png, image/jpeg"
        v-model:value="v.photoField.$model"
        :error="v.photoField.$errors"
      />
      <VInput
        class="form__input"
        label="Стоимость товара"
        name="priceField"
        placeholder="Стоимость товара"
        v-model:value="v.priceField.$model"
        :error="v.priceField.$errors"
      />
      <VInput
        class="form__input"
        label="Количество товара"
        name="amountField"
        placeholder="Количество товара"
        v-model:value="v.amountField.$model"
        :error="v.amountField.$errors"
      />

      <VButton type="submit" label="Оформить заказ" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'

import VInput from '@/components/VInput.vue'
import VTextarea from '@/components/VTextarea.vue'
import VButton from '@/components/VButton.vue'

const nameField = ref('')
const categoryField = ref('')
const descriptionField = ref('')
const photoField = ref('')
const priceField = ref('')
const amountField = ref('')

const rules = computed(() => ({
  nameField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    minLength: helpers.withMessage(`Минимальная длина: 10 символов`, minLength(10))
  },
  categoryField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    minLength: helpers.withMessage(`Минимальная длина: 10 символов`, minLength(10))
  },
  descriptionField: {
    minLength: helpers.withMessage(`Минимальная длина: 20 символов`, minLength(20)),
    maxLength: helpers.withMessage(`Максимальная длина: 1000 символов`, minLength(1000))
  },
  photoField: {
    minLength: helpers.withMessage(`Минимальная длина: 20 символов`, minLength(20))
  },
  priceField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    isPositiveNumber: helpers.withMessage(
      'Стоимость должна быть положительным числом',
      isPositiveNumber
    )
  },
  amountField: {
    required: helpers.withMessage(`Это обязательное поле`, required)
  }
}))

const isPositiveNumber = (value) => {
  return value > 0 ? true : false
}

const v = useVuelidate(rules, {
  nameField,
  categoryField,
  descriptionField,
  photoField,
  priceField,
  amountField
})

const submitForm = () => {
  const result = v.value.$validate()
  result
    .then((res) => {
      if (res) {
        alert('Product is created')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped lang="scss"></style>
