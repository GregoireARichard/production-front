<template>
  <form class="form">
    <Input type="text" placeholder="Host" class="form_input" @input="getHost" required />
    <Input type="text" placeholder="Username" class="form_input" @input="getUsername" required />
    <Input type="password" placeholder="password" class="form_input" @input="getPassword" required />
    <Input type="number" placeholder="Port" class="form_input" @input="getPort" required />
    <Button class="connexion_button" type="button" @click="$emit('test-connection', {host:host, username:username, password:password, port:port});">Tester la connexion</Button>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const host = ref<HTMLElement | null>(null)
const username = ref<HTMLElement | null>(null)
const password = ref<HTMLElement | null>(null)
const port = ref<HTMLElement | null>(null)

const getHost = (e) => {
  host.value = e.target.value
}

const getUsername = (e) => {
  username.value = e.target.value
}

const getPassword = (e) => {
  password.value = e.target.value
}

const getPort = (e) => {
  port.value = e.target.value
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
