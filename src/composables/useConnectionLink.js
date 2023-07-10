// export default function useConnectionLink() {
//   const connectionLink = ref('')

//   const setConnectionLink = (newState) => {
//     connectionLink.value = newState
//   }

//   return { connectionLink, setConnectionLink }
// }

import { reactive } from 'vue'

export const store = reactive({
  link: 'test',
  setLink(value) {
    this.link = value
  },
})
