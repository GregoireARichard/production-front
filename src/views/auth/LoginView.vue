<template>
  <Layout>
    <template #main>
      <main class="main">
        <Button class="button">
          <RouterLink to="/challenge/questions"> Commencer le challenge </RouterLink>
        </Button>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const fetchAPI = async () => {
  const fetchLink = JSON.parse(localStorage.getItem('magicLink'))

  try {
    const res = await fetch(fetchLink)
    const data = await res.json()

    localStorage.setItem('token', data.access)
  } catch (error) {
    console.error(error)
  }
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
