import { defineStore } from 'pinia'
import { computed, ref, reactive, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authCreds = reactive(
    localStorage.getItem('userCreds') !== null
      ? {
          login: JSON.parse(localStorage['userCreds']).login,
          password: JSON.parse(localStorage['userCreds']).password
        }
      : {
          login: '',
          password: ''
        }
  )

  const isRegistered = computed(() => authCreds.login.length > 0)
  const isLogged = ref(false)

  watch(isLogged, () => {
    if (localStorage.getItem('userCreds') !== null) {
      authCreds.login = JSON.parse(localStorage['userCreds']).login
      authCreds.password = JSON.parse(localStorage['userCreds']).password
    }
  })

  const setLoginStatus = () => {
    isLogged.value = true
  }

  const setLogoutStatus = () => {
    isLogged.value = false
  }

  return {
    authCreds,
    isRegistered,
    isLogged,
    setLoginStatus,
    setLogoutStatus
  }
})
