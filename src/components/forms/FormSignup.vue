<template>
  <div class="form">
    <p class="form__title">Зарегистрируйтесь!</p>
    <form class="form__form" @submit.prevent="submitForm">
      <VInput
        class="form__input"
        label="Ваш e-mail"
        name="emailField"
        placeholder="Ваш e-mail"
        v-model:value="validation.emailField.$model"
        :error="validation.emailField.$errors"
      />
      <VInput
        class="form__input"
        label="Пароль"
        name="passwordField"
        placeholder="Пароль"
        v-model:value="validation.passwordField.$model"
        :error="validation.passwordField.$errors"
      />
      <VInput
        class="form__input"
        label="Повторите пароль"
        name="passwordConfirmField"
        placeholder="Повторите пароль"
        v-model:value="validation.passwordConfirmField.$model"
        :error="validation.passwordConfirmField.$errors"
      />
      <VButton type="submit" label="Зарегистрироваться" :disabled="validation.value" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email, sameAs } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

import VInput from '@/components/VInput.vue'
import VButton from '@/components/VButton.vue'

const emailField = ref('')
const passwordField = ref('')
const passwordConfirmField = ref('')

const isWrongCreds = ref(false)

const rules = computed(() => ({
  emailField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    email: helpers.withMessage(`Введите корректный адрес`, email)
  },
  passwordField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    valid: function (value) {
      const containsUppercase = /[A-Z]/.test(value)
      const containsLowercase = /[a-z]/.test(value)
      const containsNumber = /[0-9]/.test(value)
      const containsSpecial = /[#?!@$%^&*-]/.test(value)
      return containsUppercase && containsLowercase && containsNumber && containsSpecial
    }
  },
  passwordConfirmField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    sameAs: helpers.withMessage(`Пароли должны совпадать`, sameAs(passwordField))
  }
}))

const validation = useVuelidate(rules, {
  emailField,
  passwordField,
  passwordConfirmField
})

const submitForm = () => {
  const result = validation.value.$validate()
  result
    .then((res) => {
      if (res) {
        localStorage.setItem(
          'userCreds',
          JSON.stringify({ login: emailField.value, password: passwordField.value })
        )
        authStore.setLoginStatus()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
