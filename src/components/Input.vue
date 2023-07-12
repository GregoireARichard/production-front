<template>
  <input class="input" />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.input {
  display: block;
  font-size: 1.6rem;
  font-weight: medium;
  width: 100%;
  height: 5rem;
  padding: 0 2.5rem;
  margin-bottom: 1rem;
  border-radius: 5rem;
  border: 1px solid #000;
  background-color: white;

  &::placeholder {
    color: #000;
  }
  &:hover {
    border-color: white;
  }
  &:focus {
    box-shadow: 0px 0px 3px 1px white;
  }
}
</style>
