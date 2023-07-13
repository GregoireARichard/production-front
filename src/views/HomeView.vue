<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <div class="head">
            <h4 class="head_title">Connectez-vous</h4>
            <p class="head_text">Un email sera envoyé à l'adresse indiquée afin de vous identifier.</p>
            <Toasters name="caution">Attention, le domaine hetic.eu ne fonctionne pas</Toasters>
          </div>
          <form action="" class="form">
            <Input type="text" placeholder="Full name*" class="form_input" @input="takeFullName" required />
            <Input type="email" placeholder="Email*" class="form_input" @input="checkEmail" required />
          </form>
          <Button @click="fetchData"> Envoyer le mail </Button>
          <Toasters v-show="isError" name="caution">
            <p ref="toasterRef">Attention, votre addresse mail n'est pas correcte</p>
          </Toasters>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toasterRef = ref<HTMLElement | null>()
const emailRef = ref<string | null>(null)
const fullNameRef = ref<string | null>(null)
const isSending = ref<boolean>(false)
const isError = ref<boolean>(false)

const takeFullName = (e: Event) => {
  fullNameRef.value = (e.target as HTMLInputElement).value
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
    input.style.border = '1px solid red'
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

/* ----------- Data */
const fetchData = async () => {
  if (fullNameRef.value === null || emailRef.value === null) {
    return emptyInput()
  }

  try {
    const res = await fetch('https://rendu-back.gravity-zero.fr/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailRef?.value, full_name: fullNameRef?.value, group_id: 1 }),
    })
    const data = await res.json()
    console.log(data)

    isSending.value = true
    localStorage.setItem('magicLink', JSON.stringify(data?.details.linkJwt))
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
