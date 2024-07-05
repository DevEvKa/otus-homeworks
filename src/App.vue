<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <a href="/about"><img alt="Vue logo" class="logo" src="@/assets/logo.svg" /></a>

    <div class="wrapper">
      <nav>
        <RouterLink to="/about">О проекте</RouterLink>
        <RouterLink to="/catalog">Каталог</RouterLink>
        <RouterLink to="/cart">Корзина</RouterLink>
        <RouterLink to="/admin">МиниАдминка</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
@import './assets/scss/common.scss';

header {
  display: flex;
  align-items: center;
  gap: 60px;
  margin-bottom: 20px;
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
