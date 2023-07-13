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
            <Input type="text" placeholder="Full name" class="form_input" @input="takeFullName" required />
            <Input type="email" placeholder="Email" class="form_input" @input="takeEmail" required />
            <span class="form_info" ref="infoRef">Rentrez un email valide</span>
          </form>
          <Toasters name="valid" v-if="props.isSend">Email envoyé, regardez dans vos notifications !</Toasters>
          <Button @click="fetchData"> Envoyer le mail </Button>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const emailRef = ref<string | null>(null)
const fullNameRef = ref<string | null>(null)
const infoRef = ref<HTMLElement | null>(null)
const isSending = ref<boolean>(false)

const props = reactive({
  isSend: false,
})

const takeEmail = (e: Event) => {
  emailRef.value = (e.target as HTMLInputElement).value
}

const takeFullName = (e: Event) => {
  fullNameRef.value = (e.target as HTMLInputElement).value
}

const fetchData = async () => {
  try {
    const res = await fetch('https://rendu-back.gravity-zero.fr/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailRef?.value, full_name: fullNameRef?.value, group_id: 1 }),
    })
    const data = await res.json()

    props.isSend = data.ok

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
