<template>
  <div class="head">
    <Toasters v-if="error" name="error" class="error">
      {{ error.title }}
      {{ error.message }} <br />
      Code d'erreur: {{ error.status_code }}
    </Toasters>
    <div class="head_title">
      <h4>Question 1: SSH</h4>
      <p>{{ user_points }}/{{ total_point }}</p>
    </div>
    <p class="head_text">{{ description }}</p>
    <Toasters name="clue">
      <p>{{ clue }}</p>
    </Toasters>
    <p>Points de la question: {{ exercise_points }}</p>
  </div>
  <template v-if="isFirst">
    <FormSSH @test-connection="fetchSSH"></FormSSH>
  </template>

  <template v-if="isSecond">
    <FormSGBDR @test-connection="fetchSSH"></FormSGBDR>
  </template>
</template>

<script setup lang="ts">
let isFirst = ref<boolean>(true)
let isSecond = ref<boolean>(false)

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

const fetchSSH = async (formData: any) => {
  const token = localStorage.getItem('token')

  try {
    const res = await fetch('https://rendu-back.gravity-zero.fr/production/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: 'ssh',
        test: formData,
      }),
    })

    if (res.status === 200) {
      const data = await res.json()

      isFirst.value = false
      isSecond.value = true

      emit('data-to-parent', data)
    }
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

<!-- const fetchList = {
  SSH: 'fetchSSH',
  SGBDR: 'fetchSGBDR',
  SSHError: 'fetchSSHError',
}

const currentFetch = computed(() => {
  return `fetchList.${props.name}`
}) -->
