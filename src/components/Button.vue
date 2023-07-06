<template>
  <button class="button">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.button {
  background-color: black;
  color: white;
  padding: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: white;
    color: black;
    border: solid 1px;
    border-color: black;
    box-shadow: 0px 0px 5px 0px rgba(#000000, 0.6);
  }
}
</style>
