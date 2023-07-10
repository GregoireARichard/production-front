<template>
  <Layout>
    <template #main>
      <Question v-bind="api_response"></Question>
    </template>
  </Layout>
</template>

<script setup>
const api_response = {
  next: true,
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
}
</script>

<style scoped lang="scss"></style>
