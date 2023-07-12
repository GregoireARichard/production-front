<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <QuestionPassed v-if="questionData?.passed" v-bind="passedData"></QuestionPassed>
          <Question v-if="!questionData?.passed" class="question" v-bind="questionData"> </Question>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const questionData = ref<string[]>([])

const getQuestion = async () => {
  const token = localStorage.getItem('token')

  try {
    const res = await fetch('https://rendu-back.gravity-zero.fr/production/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()

    questionData.value = data

    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getQuestion()
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
}
.question {
  display: block;
  margin-bottom: 1rem;
}

.score_container {
  margin-bottom: 1rem;
  .score {
    font-size: large;
    font-weight: bold;
  }
}
</style>
