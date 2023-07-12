<template>
  <form class="form">
    <Input type="text" placeholder="Host" class="form_input" @input="props.host" required />
    <Input type="text" placeholder="Username" class="form_input" @input="props.username" required />
    <Input type="text" placeholder="Port" class="form_input" @input="props.port" required />
  </form>
</template>
<script setup lang="ts">
const props = defineProps({
  host: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
})
const hostInput = (event) => {
  defineEmits(['update:host', event.target.value])
}

const usernameInput = (event) => {
  defineEmits(['update:username', event.target.value])
}

const portInput = (event) => {
  defineEmits(['update:port', event.target.value])
}
</script>
<style scoped lang="scss">
.form {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 4rem;

  &_info {
    display: none;
    font-size: 1.4rem;
    font-weight: normal;
    color: #000;
    padding-left: 2.5rem;
  }
}
</style>
