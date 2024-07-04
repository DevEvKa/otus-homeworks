<template>
  <div class="v-input">
    <input
      :class="`v-input__${type}`"
      :type="type"
      :accept="accept"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
    />
    <label :for="name" class="v-input__label">{{ label }}</label>
    <div class="v-input__error" v-for="element of error" :key="element.$uid">
      <div class="v-input__error-message">{{ element.$message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:value'])
const props = defineProps({
  error: {
    type: Array
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  accept: {
    type: String
  },
  placeholder: {
    type: String
  },
  label: {
    type: String
  }
})

const updateValue = (e) => {
  emit('update:value', e.target.value)
}
</script>

<style lang="scss" scoped>
.v-input {
  width: 300px;
  margin-bottom: 30px;
  position: relative;

  &:has(.v-input__error-message) {
    .v-input__text {
      border-color: $danger-color;
    }
    .v-input__label {
      color: $danger-color;
    }
  }

  &__text {
    border: 1px solid $accent-color;
    padding: 0 10px;
    height: 40px;
    border-radius: 7px;
    font-size: 15px;
    width: 100%;
    position: relative;
    z-index: 1;

    &:focus {
      & + &__label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }

    &:not(:placeholder-shown) {
      & + .v-input__label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }

    &::placeholder {
      color: $dark-main;
    }
  }

  &__file {
    border: 1px solid $accent-color;
    padding: 0 10px;
    height: 60px;
    border-radius: 7px;
    font-size: 15px;
    width: 100%;
    position: relative;
    z-index: 1;
    padding-top: 20px;
    background-color: $light-main;
  }

  &__label {
    font-weight: bold;
    display: block;
    position: absolute;
    top: 20px;
    opacity: 0;
    z-index: -1;
    transition: 0.3s;
    font-size: 14px;
    color: $dark-main;
  }

  &__error {
    margin-top: 4px;
    border-radius: 6px;
    font-size: 14px;
    color: $danger-color;
    padding: 6px;
  }
}
</style>
