import { reactive } from 'vue'

export const storeLink = reactive({
  link: 'test',
  setLink(value) {
    return (this.link = value)
  },
})
