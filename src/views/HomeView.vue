<template>
  <Layout>
    <template #main>
      <main class="main">
        <h1>Hello</h1>
      </main>
    </template>
  </Layout>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '@/styles/utils/functions';

.main {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  z-index: z('main');
}
</style>
