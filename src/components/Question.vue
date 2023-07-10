<template #main>
  <main class="main">
    <div class="score_container">
      <p class="score">{{ props.user_points }}/{{ props.total_point }}</p>
    </div>
    <div class="block">
      <div class="head">
        <h4 class="head_title">{{ props.name }}</h4>
        <p class="head_text">{{ props.description }}</p>
        <Toasters name="clue">{{ props.clue }}</Toasters>
        <p>Point de la question: {{ props.exercise_points }}</p>
      </div>
      <Button>Tester la connexion</Button>
    </div>
  </main>
</template>
<script setup lang="ts">
interface Props {
  responseArray?: ['response', 'index']
}

const props = withDefaults(defineProps<Props>(), {
  responseArray: ['test', 1],
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
