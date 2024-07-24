<template>
  <div class="login">
    <div v-if="!authStore.isLogged" class="login__wrapper">
      <div v-if="!authStore.isRegistered" class="login__form">
        <FormSignup></FormSignup>
      </div>
      <div v-else class="login__form">
        <FormLogin></FormLogin>
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

import FormLogin from '@/components/forms/FormLogin.vue'
import FormSignup from '@/components/forms/FormSignup.vue'

const authStore = useAuthStore()

import VButton from '../components/VButton.vue'

const isWrongCreds = ref(false)

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

  &__welcoming {
    font-size: 24px;
  }
}
</style>
