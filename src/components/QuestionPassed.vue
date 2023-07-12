<template>
  <main class="main">
    <slot />
    <div class="block">
      <div class="head">
        <h4 class="head_title">{{ question_number }} {{ name }}</h4>
        <p class="head_text">{{ description }}</p>
        <p>Points de la question: {{ points }}</p>
      </div>
      <Toasters name="valid">Exercice réussi !</Toasters>
    </div>
  </main>
</template>
<script setup lang="ts">
const props = defineProps({
  question_number: {
    type: Number,
    required: true,
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
  points: {
    type: Number,
    required: true,
  },
  group_id: {
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
