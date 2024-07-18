<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <header class="header">
    <a href="/about"><img alt="Vue logo" class="logo" src="@/assets/logo.svg" /></a>

    <div class="header__wrapper">
      <nav>
        <RouterLink to="/about">О проекте</RouterLink>
        <RouterLink to="/catalog">Каталог</RouterLink>
        <RouterLink to="/cart">Корзина</RouterLink>
        <RouterLink to="/admin">МиниАдминка</RouterLink>
      </nav>
      <div class="header__login">
        <a v-if="!!authStore.isLogged" href="/login" @click.prevent="authStore.setLogoutStatus"
          ><img alt="logout" class="header__login-img" src="@/assets/logout.svg"
        /></a>
        <a v-else href="/login"
          ><img alt="login" class="header__login-img" src="@/assets/login.svg"
        /></a>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
@import './assets/scss/common.scss';

.header {
  display: flex;
  align-items: center;
  gap: 60px;
  margin-bottom: 20px;

  &__wrapper {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
  }

  &__login-img {
    display: block;
    width: 36px;
    height: auto;
  }
}

.logo {
  display: block;
  width: 50px;
  height: auto;
}

nav {
  display: flex;
  gap: 30px;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
