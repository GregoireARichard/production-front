<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="header">
          <h4>Connectez-vous</h4>
        </div>
        <form action="" class="form">
          <input type="email" placeholder="Email" class="form_input" v-model="emailRef" />
          <span class="form_info">Rentrez une adresse e-mail valide</span>
        </form>
        <button class="button" @click="fetchData">Envoyer</button>
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

  .header {
    position: relative;
    width: 100%;
    margin-bottom: 3rem;

    h4 {
      font-size: 1.6rem;
      font-weight: 600;
      text-transform: uppercase;
    }
  }

  .form {
    position: relative;
    display: block;
    width: 100%;

    &_input {
      display: block;
      width: 100%;
      height: 4.5rem;
      padding: 0.8rem 1rem;
      margin-bottom: 2rem;
      border: 1px solid #000;
    }

    &_input:focus {
      border: 1px solid var(--black);
    }
  }

  .button {
    background-color: red;
    padding: 1rem;
    pointer-events: all;
    cursor: pointer;
  }
}
</style>
