<template>
  <div class="form">
    <p class="form__title">Войдите в свой аккаунт!</p>
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
      <p v-if="isWrongCreds" class="error-text">Неверный логин и/или пароль</p>
      <VButton type="submit" label="Войти" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

import VInput from '@/components/VInput.vue'
import VButton from '@/components/VButton.vue'

const emailField = ref('')
const passwordField = ref('')

const isWrongCreds = ref(false)

const rules = computed(() => ({
  emailField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    email: helpers.withMessage(`Введите корректный адрес`, email)
  },
  passwordField: {
    required: helpers.withMessage(`Это обязательное поле`, required)
  }
}))

const validation = useVuelidate(rules, { emailField, passwordField })

const submitForm = () => {
  const result = validation.value.$validate()
  result
    .then((res) => {
      if (res) {
        const userCreds = JSON.parse(localStorage['userCreds'])
        if (userCreds.login === emailField.value && userCreds.password === passwordField.value) {
          authStore.setLoginStatus()
          emailField.value = ''
          passwordField.value = ''
        } else {
          isWrongCreds.value = true
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
