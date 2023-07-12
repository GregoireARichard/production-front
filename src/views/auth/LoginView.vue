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

// import router from '../../router';

const jwt = ref('')

// Le paramètre "props" contiendra les paramètres de l'URL, y compris "jwt"
const { jwt: routeJwt } = props

// Affectez la valeur du paramètre "jwt" à la référence réactive
jwt.value = routeJwt

console.log(jwt, jwt.value)

const fetchAPI = async () => {
  // const fetchLink = JSON.parse(localStorage.getItem('magicLink'))
  // console.log(fetchLink)

  try {
    const res = await fetch(fetchLink)
    console.log(res)
    const data = await res.json()
    console.log(data)

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
