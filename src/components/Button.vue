<template>
  <button class="button">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.button {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  padding: 1.7rem 2rem;
  border-radius: 0.5rem;
  background-color: black;
  cursor: pointer;

  &:hover {
    color: black;
    border: 1px solid black;
    background-color: white;
  }
}
</style>
