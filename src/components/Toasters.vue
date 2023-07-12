<template>
  <div
    :class="[
      'toaster-container',
      { valid: name === 'valid' },
      { caution: name === 'caution' },
      { error: name === 'error' },
      { clue: name === 'clue' },
    ]"
  >
    <img class="svg" :src="iconUrl" :alt="iconAlt" />
    <p>
      <slot />
    </p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  name?: keyof typeof toasterIcon
}

const props = withDefaults(defineProps<Props>(), {
  name: 'valid',
})

const iconPath = '/icons'
const toasterIcon = {
  valid: {
    url: iconPath + '/check.svg',
    alt: 'icons check icon',
  },
  caution: {
    url: iconPath + '/attention.svg',
    alt: 'warning icon',
  },
  error: {
    url: iconPath + '/cross.svg',
    alt: 'cross icon',
  },
  clue: {
    url: iconPath + '/clue.svg',
    alt: 'clue icon',
  },
}
const iconUrl = `${toasterIcon[props.name].url}`
const iconAlt = `${toasterIcon[props.name].alt}`
</script>
<style scope lang="scss">
.toaster-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  img {
    width: 20px;
    height: 20px;
  }
  p {
    font-size: 1.4rem;
    font-weight: bold;
    margin-top: auto;
    margin-bottom: auto;
  }
}
.valid {
  background-color: #d0f1e5;
  color: #26d07c;
}

.caution {
  background-color: #fbebc4;
  color: #ffaa00;
}

.error {
  background-color: #fcd9d3;
  color: #ff3125;
}

.clue {
  background-color: #d9d9d9;
  color: #767676;
}
</style>
