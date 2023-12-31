<template>
  <Layout>
    <template #main>
      <div class="main-passed" v-for="exercise in props.exercise_passed" :key="exercise.question_number" v-if="props.passed">
        <div class="block-passed">
          <div class="head-passed">
            <button class="more" @click="show">voir question</button>
            <div class="head-passed_title">
              
              <h4>Question {{ exercise.question_number }}: {{ exercise.name }}</h4>
            </div>
            <p v-if="props.isVisible" class="head-passed_text">{{ exercise.description }}</p>
            <p>Points de la question: {{ exercise.points }}</p>
          </div>
          <Toasters name="valid">
            <span>Bravo, vous avez réussi la question</span>
          </Toasters>
        </div>
      </div>
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
            <div v-if="props.description_textarea.length > 0">
              <br />
              <textarea rows="15" cols="100">{{ props.description_textarea }}</textarea>
            </div>
            <Toasters name="clue">
              <p>
                {{ props.clue }}
                <p class="clue_code" v-if="props.clue_textarea.length > 0">{{ props.clue_textarea }}</p>
              </p>
            </Toasters>
            <p>Points de la question: {{ props.exercise_points }}</p>
          </div>
          <template v-if="props.name === 'SSH'">
            <FormSSH @test-connection="fetchSSH"></FormSSH>
          </template>

          <template v-if="props.name === 'SGBDR'">
            <FormSGBDR @test-connection="fetchSSH"></FormSGBDR>
          </template>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'

// const isFirst = ref(true)
// const isSecond = ref(false)

const props = reactive({
  clue: '',
  clue_textarea: '',
  description: '',
  description_textarea: '',
  error: false,
  exercise_points: 0,
  name: '',
  passed: false,
  total_point: 0,
  user_points: 0,
  question_number: 0,
  exercise_passed: [],
  isVisible: false
})

const fetchSSH = async (formData = null) => {
  const token = localStorage.getItem('token')

  try {
    let body: string | null = null

    if (formData) {
      body = JSON.stringify({
        name: props.name.toLowerCase(),
        test: formData,
      })
    }

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

      props.name = data.name
      props.description_textarea = ''
      for (const [key, value] of Object.entries(data)) {
        if (key === 'description') {
          const codeStartIndex = value.indexOf('<code>')
          if (codeStartIndex !== -1) {
            const parts = value.split('<br><code>')

            props[key] = parts[0]
            props.description_textarea = parts[1].replace('</code>', '')
          } else {
            props[key] = value
          }
        } else {
          props[key] = value
        }

        // console.log(`${key}: ${value}`)
      }
      for (const [key, value] of Object.entries(data)) {
        if (key === 'clue') {
          const codeStartIndex = value.indexOf('<code>')
          if (codeStartIndex !== -1) {
            const parts = value.split('<code>')

            props[key] = parts[0]
            props.clue_textarea = parts[1].replace('</code>', '')
          } else {
            props[key] = value
          }
        }
      }
      
      if (data.passed){
        props.passed = true
        props.exercise_passed = data.passed.exercises        
      }
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchSSH(null)
})

function show (){
  props.isVisible = !props.isVisible
}
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

.clue {
  &_code{
    display: inline;
    border: solid black 1px;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: white;
    width: fit-content;
    text-align: center;
  }
}

.main-passed {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5rem 20rem;


  .block-passed{
    position: relative;
    padding: 5rem;
    border-radius: 2rem;
    background-color: #ccb4f0;
  }

  .head-passed {
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

    }

  }
  
  &_text {
    font-size: 1.6rem;
      font-weight: normal;
      line-height: 1.2;
      max-width: 52rem;
      white-space: pre-wrap;
      overflow-wrap: anywhere;

  }
  
}
</style>
