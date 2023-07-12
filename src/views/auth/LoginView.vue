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
  try {
    const url = 'https://rendu-back.gravity-zero.fr/auth/login?jwt=' + dynamic_jwt.value
    console.log(url, dynamic_jwt)

    const res = await fetch(url)

    if (!res.ok) {
      const message = `An error has occured: ${res.status}`
      throw new Error(message)
    }

    // console.log(res, res.json())
    // console.log('test')
    const data = await res.json()
    console.log(data.access)

    localStorage.setItem('token', data.access)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchAPI()
})

const test = localStorage.getItem('token')
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
