export default function useToken() {
  const token = ref('')

  const setToken = (newValue) => {
    token.value = newValue
  }

  return { token, setToken }
}
