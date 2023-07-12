<template>
  <div class="head">
    <div class="head_title">
      <h4>Question 2: SGBDR</h4>
      <p class="head_text">{{ user_points }}/{{ total_point }}</p>
    </div>
    <p class="head_text">{{ description }}</p>

    <Toasters name="clue">
      <p>{{ clue }}</p>
    </Toasters>
    <p>Point de la question: exercice_points</p>
  </div>
  <Toasters v-if="error" name="error">
    {{ error.title }}
    {{ error.message }} <br />
    Code d'erreur: {{ error.status_code }}
  </Toasters>
  <form class="form">
    <Input type="text" placeholder="Host" class="form_input" @input="takeHost" required />
    <Input type="text" placeholder="Username" class="form_input" @input="takeUsername" required />
    <Input type="password" placeholder="Password" class="form_input" @input="takePassword" required />
    <Input type="text" placeholder="Port" class="form_input" @input="takePort" required />
  </form>
  <Button class="connexion_button" @click="fetchSGBDR">Tester la connexion</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  clue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  error: {
    type: Object,
    required: true,
  },
  exercise_points: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
  total_point: {
    type: Number,
    required: true,
  },
  user_points: {
    type: Number,
    required: true,
  },
})

const hostRef = ref<HTMLElement | null>(null)
const usernameRef = ref<HTMLElement | null>(null)
const passwordRef = ref<HTMLElement | null>(null)
const portRef = ref<HTMLElement | null>(null)

const takeHost = (e: Event) => {
  hostRef.value = e.target?.value
}

const takeUsername = (e: Event) => {
  usernameRef.value = e.target?.value
}

const takePassword = (e: Event) => {
  usernameRef.value = e.target?.value
}

const takePort = (e: Event) => {
  portRef.value = e.target?.value
}

const fetchSGBDR = async () => {
  const token = localStorage.getItem('token')

  try {
    const res = await fetch('https://rendu-back.gravity-zero.fr/production/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: 'sgbdr',
        group_id: 1,
        test: {
          host: hostRef.value,
          username: usernameRef.value,
          password: passwordRef.value,
          port: portRef.value,
        },
      }),
    })
    const data = await res.json()
  } catch (error) {
    console.error(error)
  }
}
</script>
<style scoped lang="scss">
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
</style>
