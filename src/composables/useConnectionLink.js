export default () => {
  const connectionLink = ref('')

  const setConnectionLink = (newState) => {
    connectionLink.value = newState
  }

  return { connectionLink, setConnectionLink }
}
