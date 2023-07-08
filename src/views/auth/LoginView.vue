<template>
  <Layout>
    <template #main>
      <main class="main">Authentification en cours...</main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useConnectionLink from '@/composables/useConnectionLink'

const { connectionLink } = useConnectionLink()

const dataRef = ref<string | null>(null)

const fetchAPI = () => {
  const link = connectionLink.value
  console.log(connectionLink)

  // try {
  //   const res = await fetch('http://localhost:5050/user/register')
  //   const data = await res.json()
  // } catch (error) {
  //   console.error(error)
  // }
}

onMounted(() => {
  fetchAPI()
})
</script>

<style lang="scss" scoped></style>
