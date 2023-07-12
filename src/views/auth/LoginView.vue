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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const dynamic_jwt = ref(route.query.jwt)

const fetchAPI = async () => {
  const url = 'https://rendu-back.gravity-zero.fr/auth/login?jwt=' + dynamic_jwt.value

  try {
    const res = await fetch(url)
    const data = await res.json()

    localStorage.setItem('token', data.access)

    if (!res.ok) {
      const message = `An error has occured: ${res.status}`
      throw new Error(message)
    }
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
