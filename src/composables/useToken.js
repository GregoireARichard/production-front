import { reactive } from 'vue'

export const storeToken = reactive({
  token: 'test',
  setToken(value) {
    return (this.token = value)
  },
})
