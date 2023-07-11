<template>
  <Layout>
    <template #main>
      <Question class="question" v-bind="api_response[0]">
        <div class="score_container">
          <p class="score">{{ api_response.user_points }}/{{ api_response[0].total_point }}</p>
        </div>
      </Question>
      <Question v-if="api_response[0].next === true" class="question" v-bind="api_response[1]"></Question>
      <Question v-if="api_response[1].next === true" class="question" v-bind="api_response[2]"></Question>
    </template>
  </Layout>
</template>

<script setup>
const api_response = [
  {
    next: false,
    error: {
      title: "Le fichier 'toto' n'existe pas",
      message: "impossible d'accéder au fichier",
      status_code: 404,
    },
    name: '4eme Exercice',
    description:
      'Vous devez créer un fichier toto à la racine de votre utilisateur avec les droits en lecture/écriture uniquement pour le groupe toto-production',
    clue: "Pensez bien à ajouter l'utilisateur fourni au groupe toto-production",
    user_points: 10,
    exercise_points: 5,
    total_point: 20,
  },
  {
    next: false,
    error: {
      title: "Le fichier 'toto' n'existe pas",
      message: "impossible d'accéder au fichier",
      status_code: 404,
    },
    name: '5eme Exercice',
    description:
      'Vous devez créer un fichier toto à la racine de votre utilisateur avec les droits en lecture/écriture uniquement pour le groupe toto-production',
    clue: "Pensez bien à ajouter l'utilisateur fourni au groupe toto-production",
    user_points: 10,
    exercise_points: 5,
    total_point: 20,
  },
]

const user_score = api_response[0].user_points
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
</style>
