<template>
  <button
    :class="[
      'button',
      `button--${color}`,
      { 'button--large': size === 'large' },
      `button--${type}`
    ]"
    :disabled="disabled"
    @click="clickOnButton"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    required: false
  },
  size: {
    type: String,
    default: 'normal'
  },
  type: {
    type: String,
    default: 'normal'
  }
})

const emit = defineEmits(['click-on-button'])

const clickOnButton = () => {
  emit('click-on-button')
}
</script>

<style scoped lang="scss">
.button {
  padding: 0 20px;
  height: 40px;
  color: $dark-main;
  border-radius: 7px;
  border: 1px solid $dark-main;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s;

  &--dark {
    background: $dark-main;
    border: 1px solid $dark-main;
    color: $light-main;
    &:enabled:hover {
      background: $light-main;
      color: $dark-main;
    }
  }
  &--light {
    background: $light-main;
    border: 1px solid $dark-main;
    color: $dark-main;
    &:enabled:hover {
      background: rgba($accent-color, 0.3);
    }
  }
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  &--large {
    height: 48px;
    padding: 0 30px;
  }

  &--link {
    height: auto;
    padding: 0;
    border: none;
    border-radius: 0;
    color: $accent-color;
    border-bottom: 1px solid $accent-color;

    &:hover {
      color: $dark-main;
      border-color: $dark-main;
    }
  }
}
</style>
