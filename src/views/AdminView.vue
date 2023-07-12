<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <div class="head">
            <h4 class="head_title">Connectez-vous (Admin)</h4>
          </div>
          <form action="" class="form">
            <Input type="email" placeholder="Email" class="form_input" @input="takeEmail" required />
            <Input type="password" placeholder="Mot de passe" class="form_input" @input="takePassword" required />
            <span class="form_info" ref="infoRef">Rentrez un email valide</span>
          </form>
          <Button @click="postLogin"> Connection </Button>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emailRef = ref<string | null>(null)
const passwordRef = ref<string | null>(null)
const infoRef = ref<HTMLElement | null>(null)

const takeEmail = (e: Event) => {
  emailRef.value = e.target?.value
}

const takePassword = (e: Event) => {
  passwordRef.value = e.target?.value
}

const postLogin = async () => {
  try {
    const res = await fetch('https://rendu-back.gravity-zero.fr/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailRef?.value, password: passwordRef?.value }),
    })
    const data = await res.json()

    console.log(data)

    if (localStorage.getItem('isAdminConnected')) {
      localStorage.removeItem('isAdminConnected')
      localStorage.removeItem('tokenAdmin')
    } else {
      localStorage.setItem('isAdminConnected', JSON.stringify(true))
      localStorage.setItem('tokenAdmin', JSON.stringify(data.jwt))

      window.location.href = '/admin/dashboard'
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  margin-top: 10rem;

  .block {
    position: relative;
    padding: 5rem;
    border-radius: 2rem;
    background-color: #ccb4f0;
  }

  .head {
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
      margin-bottom: 1rem;
    }
  }

  .form {
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 4rem;

    &_info {
      display: none;
      font-size: 1.4rem;
      font-weight: normal;
      color: #000;
      padding-left: 2.5rem;
    }
  }
}
</style>
