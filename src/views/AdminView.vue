<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <h1 class="head">Admin</h1>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup></script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  margin-top: 10rem;

  .block {
    position: relative;
    padding: 5rem;
    border-radius: 2rem;
    background-color: #ccb4f0;
  }

  .head {
    position: relative;
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    color: #fff;
  }
}
</style>
