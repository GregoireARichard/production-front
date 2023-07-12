<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <div class="head">
            <Toasters v-if="props.error" name="error" class="error">
              {{ props.error.title }}
              {{ props.error.message }} <br />
              Code d'erreur: {{ props.error.status_code }}
            </Toasters>
            <div class="head_title">
              <h4>Question {{ props.question_number }}: {{ props.name }}</h4>
              <p>{{ props.user_points }}/{{ props.total_point }}</p>
            </div>
            <p class="head_text">{{ props.description }}</p>
            <Toasters name="clue">
              <p>{{ props.clue }}</p>
            </Toasters>
            <p>Points de la question: {{ props.exercise_points }}</p>
          </div>
          <template v-if="isFirst">
            <FormSSH @test-connection="fetchSSH"></FormSSH>
          </template>

          <template v-if="isSecond">
            <FormSGBDR @test-connection="fetchSSH"></FormSGBDR>
          </template>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'

const isFirst = ref(true)
const isSecond = ref(false)

const props = reactive({
  clue: '',
  description: '',
  error: false,
  exercise_points: 0,
  name: '',
  passed: false,
  total_point: 0,
  user_points: 0,
  question_number: 1,
})

const fetchSSH = async (formData = null) => {
  const token = localStorage.getItem('token')

  try {
    let body: string | null = null

    if (formData) {
      body = JSON.stringify({
        name: 'ssh', //Le text minifier doit être utilisé ici
        test: formData,
      })
    }
    console.log(props.name)

    const res = await fetch('https://rendu-back.gravity-zero.fr/production/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: body,
    })

    if (res.status === 200) {
      const data = await res.json()
      props.name = data.name //text a minifier sinon ERREUR

      for (const [key, value] of Object.entries(data)) {
        props[key] = value
        // console.log(`${key}: ${value}`)
      }

      // console.log(props.clue)

      isFirst.value = false
      isSecond.value = true
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchSSH(null)
})
</script>

<style scoped lang="scss">
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 5rem 20rem;

  .block {
    position: relative;
    padding: 5rem;
    border-radius: 2rem;
    background-color: #ccb4f0;
  }
}
.head {
  position: relative;
  width: 100%;
  margin-bottom: 3rem;

  &_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    h4 {
      position: relative;
      font-size: 1.6rem;
      font-weight: bold;
      text-transform: uppercase;
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

    p {
      font-size: 2rem;
      font-weight: bold;
      color: #000;
    }
    .error {
      margin-bottom: 1rem;
    }
  }

  &_text {
    font-size: 1.6rem;
    font-weight: normal;
    line-height: 1.2;
    width: 100%;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
}
</style>
