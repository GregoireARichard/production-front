<template>
  <input class="form_input" />
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.form {
  position: relative;
  display: block;
  width: 100%;

  &_input {
    display: block;
    font-size: 1.6rem;
    font-weight: medium;
    width: 52rem;
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
}
</style>
