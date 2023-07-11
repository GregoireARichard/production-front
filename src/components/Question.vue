<template>
  <main class="main">
    <slot />
    <div class="block">
      <div class="head">
        <h4 class="head_title">{{ name }}</h4>
        <p class="head_text">{{ description }}</p>
        <Toasters name="clue">{{ clue }}</Toasters>
        <p>Point de la question: {{ exercise_points }}</p>
      </div>
      <Toasters v-if="error" name="error">
        {{ error.title }}
        {{ error.message }} <br />
        Code d'erreur: {{ error.status_code }}
      </Toasters>
      <Button v-if="next === false">Tester la connexion</Button>
      <Toasters v-if="next" name="valid">Exercice réussi !</Toasters>
    </div>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  next: {
    type: Boolean,
    required: true,
  },
  error: {
    type: Object,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  clue: {
    type: String,
    required: true,
  },
  user_points: {
    type: Number,
    required: true,
  },
  exercise_points: {
    type: Number,
    required: true,
  },
  total_point: {
    type: Number,
    required: true,
  },
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
    }
  }
}
</style>
