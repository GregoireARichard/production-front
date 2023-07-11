<template>
  <Layout>
    <template #main>
      <main class="main">
        <Button class="button">Commencer le challenge</Button>
        {{ store.link }}
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import useConnectionLink from '@/composables/useConnectionLink'
import { store } from '@/composables/useConnectionLink'
import useToken from '@/composables/useToken'

const { setToken, token } = useToken()
// const { connectionLink } = useConnectionLink()

const fetchAPI = async () => {
  // const fetchLink = connectionLink.value
  console.log('LINK:', store.link)

  // try {
  //   const res = await fetch(fetchLink)
  //   const data = await res.json()

  //   setToken(data?.access)
  //   console.log('TOKEN:', token.value)
  // } catch (error) {
  //   console.error(error)
  // }
}

onMounted(() => {
  fetchAPI()
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 6rem);
}
</style>
