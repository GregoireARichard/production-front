<template>
  <div class="head">
    <h4 class="head_title">{{ dataRef.name }}</h4>
    <p class="head_text">{{ dataRef.description }}</p>
    <Toasters name="clue"><p v-html="dataRef.clue"></p></Toasters>
    <p>Points de la question: {{ dataRef.exercise_points }}</p>
  </div>
  <Toasters v-if="dataRef.error" name="error">
    {{ dataRef.error.title }}
    {{ dataRef.error.message }} <br />
    Code d'erreur: {{ error.status_code }}
  </Toasters>
  <Button class="connexion_button" @click="currentFetch">Tester la connexion</Button>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const dataRef = ref([])

interface Props {
  name?: keyof typeof fetchList
}

const fetchList = {
  SSH: 'fetchSSH',
  SGBDR: 'fetchSGBDR',
  'SSH Error': 'fetchSSHError',
}

const props = defineProps({
  // error: {
  //   type: Object,
  //   required: false,
  // },
  name: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  // clue: {
  //   type: String,
  //   required: true,
  // },
  // user_points: {
  //   type: Number,
  //   required: true,
  // },
  // exercise_points: {
  //   type: Number,
  //   required: true,
  // },
  // total_point: {
  //   type: Number,
  //   required: true,
  // },
})

const currentFetch = computed(() => {
  return `fetchList.${props.name}`
})

const fetchSSH = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('https://rendu-back.gravity-zero.fr/production/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: 'ssh',
        group_id: 1,
        test: {
          host: '193.70.84.157',
          username: 'ubuntu',
          port: 22,
        },
      }),
      // Autres options de la requête, par exemple le corps (body) de la requête
    })
    const dataSSH = await res.json()
    console.log(dataSSH)
    return (dataRef.value = dataSSH)
  } catch (error) {
    console.error(error)
  }
}

console.log(dataRef.value)

onMounted(() => {
  // Utilisez onMounted pour appeler fetchData après le chargement du composant
  fetchSSH() // Mettez à jour la référence réactive avec les données récupérées
})
</script>

<style scoped lang="scss">
.main {
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
      width: 100%;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  }
}
</style>
