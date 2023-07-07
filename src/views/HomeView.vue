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
          <form class="form">
            <input type="email" placeholder="Email" class="form_input" v-model="emailRef" />
            <button class="form_btn" @click="fetchData">Envoyer</button>
          </form>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup>
const emailRef = ref(null)

const fetchData = async (e) => {
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

// const fetchData = async () => {
//   try {
//     const response = await fetch(`http://localhost:5050/auth/magic?email=${emailRef.value}`)
//     const data = await response.json()
//     console.log(data)
//   } catch (error) {
//     console.error(error)
//   }
// }

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
      margin-bottom: 4rem;
      border-radius: 5rem;
      border: 1px solid #000;
      background-color: #9483ac;

      &::placeholder {
        color: #000;
      }
    }

    &_btn {
      background-color: red;
      padding: 1rem;
      pointer-events: all;
      cursor: pointer;
    }
  }
}
</style>
