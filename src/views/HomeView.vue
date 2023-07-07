<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <div class="head">
            <h4 class="head_title">Connectez-vous</h4>
            <p class="head_text">
              Un email sera envoyé à l'adresse indiquée afin de vous identifier. (Attention: le domaine hetic.eu ne
              fonctionne pas).
            </p>
          </div>
          <form action="" class="form">
            <input type="email" placeholder="Email" class="form_input" @input="checkEmail" ref="inputRef" />
            <span class="form_info" ref="infoRef">Rentrez un email valide</span>
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
const inputRef = ref<HTMLElement | null>(null)
const infoRef = ref<HTMLElement | null>(null)
const error = ref<boolean>()

const checkEmail = (e) => {
  const regexEmail = /\S+@\S+\.\S+/

  emailRef.value = e.target.value

  if (e.target.value.search(regexEmail) === 0) {
    if (inputRef.value) {
      inputRef.value.style.borderColor = 'black'
    }
  } else if (e.target.value.search(regexEmail) === -1) {
    if (inputRef.value) {
      inputRef.value.style.borderColor = 'red'
    }
  }
}

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
    error.value = response.ok

    if (!response.ok) {
      infoRef.value ? (infoRef.value.style.display = 'block') : null
      inputRef.value && (inputRef.value.style.borderColor = 'red')
    }
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
    }
  }

  .form {
    position: relative;
    display: block;
    width: 100%;

    &_input {
      display: block;
      font-size: 1.6rem;
      font-weight: medium;
      width: 52rem;
      height: 5rem;
      padding: 0 2.5rem;
      margin-bottom: 1.5rem;
      border-radius: 5rem;
      border: 1px solid #000;
      background-color: #9483ac;

      &::placeholder {
        color: #000;
      }
    }

    &_icon {
      /* display: none; */
      position: absolute;
      top: 50%;
      right: 2.5rem;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
      color: #000;
    }

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

<!-- // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5050/auth/magic?email=${emailRef.value}`)
  //     const data = await response.json()
  //     console.log(data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // } -->
