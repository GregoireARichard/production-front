<template>
  <Layout>
    <template #main>
      <div v-if="data" class="main_container">
        <QuestionPassed v-if="data.passed" v-bind="data.passed.exercises[0]"></QuestionPassed>
        <Question class="question" v-bind="data">
          <div class="score_container">
            <p class="score">{{ data.user_points }}/{{ data.total_point }}</p>
          </div>
        </Question>
        <Button class="connexion_button" @click="fetchData">Tester la connexion</Button>
      </div>

      <div v-else>
        <p>chargement...</p>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const fetchData = async () => {
  try {
    const token = localStorage.getItem('token')
    console.log(token)
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
    const data = await res.json()
    return data
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

const data = ref(null)

onMounted(async () => {
  // Utilisez onMounted pour appeler fetchData après le chargement du composant
  data.value = await fetchData() // Mettez à jour la référence réactive avec les données récupérées
})

console.log(data.value)

const user_score = data.user_points
</script>

<style scoped lang="scss">
#main {
  .question {
    display: block;
  }
}

.question {
  margin-bottom: 1rem;
}

.score_container {
  margin-bottom: 1rem;
  .score {
    font-size: large;
    font-weight: bold;
  }
}

.main_container {
  display: block;
  justify-items: center;
  .connexion_button {
    justify-items: center;
  }
}
</style>
