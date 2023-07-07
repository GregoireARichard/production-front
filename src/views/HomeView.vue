<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <div class="header">
            <h4 class="header_title">Connectez-vous</h4>
            <p class="header_text">
              Un email sera envoyé à l'adresse indiquée afin de vous identifier. (Attention: le domaine hetic.eu ne
              fonctionne pas).
            </p>
          </div>
          <form action="" class="form">
            <Input type="email" placeholder="Email" v-model="emailRef" required />
            <span class="form_info">Rentrez un email valide</span>
          </form>
          <Button @click="fetchData">Envoyer le mail</Button>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emailRef = ref<string | null>(null)

const fetchData = async (e: Event) => {
  e.preventDefault()

  try {
    const response = await fetch('http://localhost:5050/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailRef?.value }),
    })
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 10rem 40rem;

  .block {
    position: relative;
    padding: 5rem;
    border-radius: 2rem;
    background-color: #ccb4f0;
  }

  .header {
    position: relative;
    width: 100%;
    margin-bottom: 3rem;

    &_title {
      position: relative;
      font-size: 1.6rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 2rem;
      margin-left: 1.4rem;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -1.4rem;
        transform: translate(-50%, -50%);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: black;
      }
    }

    &_text {
      font-size: 1.6rem;
      font-weight: normal;
      line-height: 1.2;
    }
  }
}
</style>

<!-- // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5050/auth/magic?email=${emailRef.value}`)
  //     const data = await response.json()
  //     console.log(data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // } -->
