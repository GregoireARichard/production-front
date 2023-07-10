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
  pointer-events: all;
  cursor: pointer;

  &:hover {
    color: black;
    box-shadow: 0px 0px 0px 1px black;
    background-color: white;
  }
  &:active {
    color: rgb(199, 199, 199);
    background-color: white;
    box-shadow: 0px 0px 3px 1px white;
  }
}
</style>
