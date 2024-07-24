<template>
  <div class="admin">
    <h2 class="page-title admin__title">Страница администратора</h2>
    <FormAddProduct></FormAddProduct>
  </div>
</template>

<script setup lang="ts">
import FormAddProduct from '@/components/forms/FormAddProduct.vue'
</script>

<style scoped lang="scss">
.admin {
  :deep(.form__form) {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    border-radius: 10px;
    background-color: rgba($accent-color, 0.1);
  }

  :deep(.v-input),
  :deep(.v-textarea) {
    width: 100%;
  }
}
</style>
