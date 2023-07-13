<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <div class="head">
            <h4 class="head_title">Connectez-vous (Admin)</h4>
          </div>
          <form action="" class="form">
            <Input type="email" placeholder="Email*" class="form_input" @input="checkEmail" required />
            <Input type="password" placeholder="Mot de passe*" class="form_input" @input="takePassword" required />
            <span class="form_info" ref="infoRef">Rentrez un email valide</span>
          </form>
          <Button @click="postLogin"> Connection </Button>
          <Toasters v-show="isError" name="caution">
            <p ref="toasterRef">Rentrez une addresse mail valide</p>
          </Toasters>
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
const isError = ref<boolean>(false)
const toasterRef = ref<HTMLElement | null>(null)

const takePassword = (e: Event) => {
  passwordRef.value = (e.target as HTMLInputElement).value
}

const checkEmail = (e: Event) => {
  const regexEmail = /\S+@\S+\.\S+/
  emailRef.value = (e.target as HTMLInputElement).value

  if (emailRef.value.search(regexEmail) === 0) {
    isError.value = false
  } else if (emailRef.value.search(regexEmail) === -1) {
    isError.value = true
  }
}

const emptyInput = () => {
  isError.value = true

  const inputs = document.querySelectorAll('input')
  inputs.forEach((input) => {
    input.style.border = '1px solid orange'
  })

  const toaster = toasterRef.value as HTMLElement
  toaster.textContent = 'Veuillez remplir les champs obligatoires (*)'

  setTimeout(() => {
    inputs.forEach((input) => {
      input.style.border = '1px solid black'
    })

    isError.value = false
  }, 4000)
}

/* --------- Data */
const postLogin = async () => {
  if (passwordRef.value === null || emailRef.value === null) {
    return emptyInput()
  } else if (emailRef.value.length !== 0) {
    const regexEmail = /\S+@\S+\.\S+/

    if (emailRef.value.search(regexEmail) === -1) {
      isError.value = true

      const toaster = toasterRef.value as HTMLElement
      toaster.textContent = 'Veuillez rentrer une addresse mail valide'

      const inputs = document.querySelectorAll('input')
      inputs.forEach((input) => {
        input.innerText = ''
      })

      return false
    }
  }

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

    if (data.code === 403) {
      isError.value = true

      const toaster = toasterRef.value as HTMLElement
      toaster.textContent = `Les informations rentrées ne sont pas correctes (${data.code}: ${data.message})`

      const inputs = document.querySelectorAll('input')
      inputs.forEach((input) => {
        input.innerText = ''
      })

      return false
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
