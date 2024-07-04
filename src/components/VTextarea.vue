<template>
  <div class="v-textarea">
    <textarea
      class="v-textarea__text"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      :rows="rows"
    />
    <label :for="name" class="v-textarea__label">{{ label }}</label>
    <div class="v-textarea__error" v-for="element of error" :key="element.$uid">
      <div class="v-textarea__error-message">{{ element.$message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:value'])
const props = defineProps({
  error: {
    type: Array,
    required: false
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  rows: {
    type: String,
    default: '5'
  }
})

const updateValue = (e) => {
  emit('update:value', e.target.value)
}
</script>

<style lang="scss" scoped>
.v-textarea {
  margin-bottom: 30px;
  position: relative;

  &:has(.v-input__error-message) {
    .v-input__text {
      border-color: $danger-color;

      &::placeholder {
        color: $danger-color;
      }
    }
    .v-input__label {
      color: $danger-color;
    }
  }

  &__text {
    border: 1px solid $accent-color;
    padding: 10px;
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

  &__label {
    font-weight: bold;
    display: block;
    position: absolute;
    top: 20px;
    opacity: 0;
    z-index: -1;
    transition: 0.3s;
    font-size: 13px;
    color: $dark-main;
  }

  &__error {
    background: $danger-color;
    margin-top: 4px;
    border-radius: 7px;
    font-size: 13px;
    color: #fff;
    padding: 5px;
  }
}
</style>
