<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <div class="head">
            <h4 class="head_title">Connectez-vous</h4>
            <p class="head_text">
              Un email sera envoyé à l'adresse indiquée afin de vous identifier.
            </p>
            <Toasters name="caution">Attention, le domaine hetic.eu ne fonctionne pas</Toasters>
          </div>
          <form action="" class="form">
            <Input type="email" placeholder="Email" class="form_input" @input="checkEmail" ref="inputRef" required />
            <span class="form_info" ref="infoRef">Rentrez un email valide</span>
          </form>
          <Button @click="fetchData"> Envoyer le mail </Button>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import useConnectionLink from '@/composables/useConnectionLink'

const { setConnectionLink, connectionLink } = useConnectionLink()

const emailRef = ref<string | null>(null)
const inputRef = ref<HTMLElement | null>(null)
const infoRef = ref<HTMLElement | null>(null)
const error = ref<boolean>(false)

const checkEmail = (e) => {
  const regexEmail = /\S+@\S+\.\S+/

  emailRef.value = e.target.value

  if (e.target.value.search(regexEmail) === 0) {
    if (inputRef.value) {
      inputRef.value.style.borderColor = 'black'
    }
  } else if (e.target.value.search(regexEmail) === -1) {
    if (inputRef.value) {
      error.value = true
      inputRef.value.style.borderColor = 'red'
    }
  }
}

const fetchData = async (e: Event) => {
  try {
    const res = await fetch('http://localhost:5050/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailRef?.value }),
    })
    const data = await res.json()

    setConnectionLink(data?.details.linkJwt)

    console.log('LINK', connectionLink.value)

    //   infoRef.value && (infoRef.value.style.display = 'block')
    //   inputRef.value && (inputRef.value.style.borderColor = 'red')
    // } else {
    //   const router = createRouter({
    //     history: createWebHistory(),
    //     linkActiveClass: 'active',
    //     routes: [
    //       { path: '/', component: HomeView },
    //       { path: '/auth/login', component: LoginView },
    //     ],
    //   })
    //   router.push('/auth/login')
    // }
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
    // margin: 1rem

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
