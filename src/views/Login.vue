<template>
  <div class="login">
    <div v-if="!authStore.isLogged" class="login__wrapper">
      <div v-if="!authStore.isRegistered" class="login__form">
        <form class="login__form-form" @submit.prevent="submitSignupForm">
          <VInput
            class="login__form-input"
            label="Ваш e-mail"
            name="emailSignupField"
            placeholder="Ваш e-mail"
            v-model:value="validationSignup.emailSignupField.$model"
            :error="validationSignup.emailSignupField.$errors"
          />
          <VInput
            class="login__form-input"
            label="Пароль"
            name="passwordSignupField"
            placeholder="Пароль"
            v-model:value="validationSignup.passwordSignupField.$model"
            :error="validationSignup.passwordSignupField.$errors"
          />
          <VInput
            class="login__form-input"
            label="Повторите пароль"
            name="passwordConfirmSignupField"
            placeholder="Повторите пароль"
            v-model:value="validationSignup.passwordConfirmSignupField.$model"
            :error="validationSignup.passwordConfirmSignupField.$errors"
          />
          <VButton type="submit" label="Зарегистрироваться" :disabled="validationSignup.value" />
        </form>
      </div>
      <div v-else class="login__form">
        <form class="login__form-form" @submit.prevent="submitLoginForm">
          <VInput
            class="login__form-input"
            label="Ваш e-mail"
            name="emailLoginField"
            placeholder="Ваш e-mail"
            v-model:value="validationLogin.emailLoginField.$model"
            :error="validationLogin.emailLoginField.$errors"
          />
          <VInput
            class="login__form-input"
            label="Пароль"
            name="passwordLoginField"
            placeholder="Пароль"
            v-model:value="validationLogin.passwordLoginField.$model"
            :error="validationLogin.passwordLoginField.$errors"
          />
          <p v-if="isWrongCreds" class="login__error-text">Неверный логин и/или пароль</p>
          <VButton type="submit" label="Войти" />
        </form>
      </div>

      <div v-if="authStore.isRegistered" class="login__message">
        <p class="login__message-text">Забыли пароль?</p>
        <VButton
          label="Напомнить!"
          type="link"
          class="login__message-button"
          @click.prevent="showCreds"
        />
      </div>
    </div>
    <p v-else class="login__welcoming">
      Вы успешно авторизовались! <br />
      Приятных покупок!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, email, sameAs } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

import VInput from '../components/VInput.vue'
import VButton from '../components/VButton.vue'

const emailLoginField = ref('')
const passwordLoginField = ref('')

const emailSignupField = ref('')
const passwordSignupField = ref('')
const passwordConfirmSignupField = ref('')

const isWrongCreds = ref(false)

const rulesLogin = computed(() => ({
  emailLoginField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    email: helpers.withMessage(`Введите корректный адрес`, email)
  },
  passwordLoginField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    valid: function (value) {
      const containsUppercase = /[A-Z]/.test(value)
      const containsLowercase = /[a-z]/.test(value)
      const containsNumber = /[0-9]/.test(value)
      const containsSpecial = /[#?!@$%^&*-]/.test(value)
      return containsUppercase && containsLowercase && containsNumber && containsSpecial
    }
  }
}))

const rulesSignup = computed(() => ({
  emailSignupField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    email: helpers.withMessage(`Введите корректный адрес`, email)
  },
  passwordSignupField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    valid: function (value) {
      const containsUppercase = /[A-Z]/.test(value)
      const containsLowercase = /[a-z]/.test(value)
      const containsNumber = /[0-9]/.test(value)
      const containsSpecial = /[#?!@$%^&*-]/.test(value)
      return containsUppercase && containsLowercase && containsNumber && containsSpecial
    }
  },
  passwordConfirmSignupField: {
    required: helpers.withMessage(`Это обязательное поле`, required),
    sameAs: helpers.withMessage(`Пароли должны совпадать`, sameAs(passwordSignupField))
  }
}))

const validationLogin = useVuelidate(rulesLogin, { emailLoginField, passwordLoginField })
const validationSignup = useVuelidate(rulesSignup, {
  emailSignupField,
  passwordSignupField,
  passwordConfirmSignupField
})

const submitLoginForm = () => {
  const result = validationLogin.value.$validate()
  result
    .then((res) => {
      if (res) {
        const userCreds = JSON.parse(localStorage['userCreds'])
        if (
          userCreds.login === emailLoginField.value &&
          userCreds.password === passwordLoginField.value
        ) {
          authStore.setLoginStatus()
          emailLoginField.value = ''
          passwordLoginField.value = ''
        } else {
          isWrongCreds.value = true
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const submitSignupForm = () => {
  const result = validationSignup.value.$validate()
  result
    .then((res) => {
      if (res) {
        localStorage.setItem(
          'userCreds',
          JSON.stringify({ login: emailSignupField.value, password: passwordSignupField.value })
        )
        authStore.setLoginStatus()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const showCreds = () => {
  const userCreds = JSON.parse(localStorage['userCreds'])
  alert(`Логин: ${userCreds.login}, Пароль: ${userCreds.password}`)
}
</script>

<style lang="scss" scoped>
.login {
  padding-top: 30px;

  &__form {
    margin-bottom: 30px;
  }

  &__error-text {
    margin-bottom: 24px;
    color: $danger-color;
  }

  &__message {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
