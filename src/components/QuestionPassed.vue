<template>
  <div class="head">
    <h4 class="head_title">Question {{ question_number }}: {{ name }}</h4>
    <p class="head_text">{{ description }}</p>
    <p>Points de la question: {{ points }}</p>
  </div>
  <Toasters name="valid">
    <span>Bravo, vous avez réussi la question</span>
  </Toasters>
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
})
</script>

<style scoped lang="scss">
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
</style>
