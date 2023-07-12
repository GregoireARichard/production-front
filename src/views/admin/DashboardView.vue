<template>
  <Layout>
    <template #main>
      <main class="main">
        <div class="block">
          <div class="head">
            <h4 class="head_title">Dashboard (Admin)</h4>
          </div>
          <Input type="text" placeholder="Nom de l'exercice" class="input" @input="takeExerciseName" required />
          <div class="option">
            <input type="checkbox" id="state" class="switch" @click="takeState" />
            <label for="state">Désactiver l'exercice</label>
          </div>
          <Button @click="postExercise"> mettre à jour </Button>
          <table class="score">
            <tr class="score_head">
              <th>Nom</th>
              <th>Points</th>
            </tr>
            <tr v-for="(item, index) in tableExercise" :key="index" class="score_body">
              <td>{{ item.full_name }}</td>
              <td>{{ item.points }}</td>
            </tr>
          </table>
        </div>
      </main>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const exerciseRef = ref<string | null>(null)
const stateRef = ref<boolean | null>(null)

const takeExerciseName = (e: Event) => {
  exerciseRef.value = e.target?.value
}

const takeState = (e: Event) => {
  stateRef.value = e.target?.checked
}

const tableExercise = [
  {
    full_name: 'Amine',
    points: '17/20',
  },
  {
    full_name: 'Amine',
    points: '13/20',
  },
  {
    full_name: 'Amine',
    points: '15/20',
  },
  {
    full_name: 'Amine',
    points: '04/20',
  },
  {
    full_name: 'Amine',
    points: '07/20',
  },
]

const getResults = async () => {
  const url = import.meta.env.VITE_BACK_URL
  const accessToken = JSON.parse(localStorage.getItem('tokenAdmin'))
  const isAdminConnected = JSON.parse(localStorage.getItem('isAdminConnected'))

  if (isAdminConnected) {
    try {
      const res = await fetch(`${url}/admin/results`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
}

const postExercise = async () => {
  const url = import.meta.env.VITE_BACK_URL
  const token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const isAdminConnected = JSON.parse(localStorage.getItem('isAdminConnected'))

  if (isAdminConnected) {
    try {
      const res = await fetch(`${url}/admin/exercise`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: stateRef?.value, name: exerciseRef?.value }),
      })
      const data = await res.json()

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
}

onMounted(() => {
  getResults()
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  margin-top: 5rem;

  .block {
    position: relative;
    padding: 5rem;
    border-radius: 2rem;
    background-color: #ccb4f0;
  }

  .head {
    position: relative;
    width: 100%;
    margin-bottom: 3rem;

    &_title {
      position: relative;
      font-size: 1.6rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 2rem;
      margin-left: 1.4rem;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -1.4rem;
        transform: translate(-50%, -50%);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: black;
      }
    }

    &_text {
      font-size: 1.6rem;
      font-weight: normal;
      line-height: 1.2;
      margin-bottom: 1rem;
    }
  }

  .input {
    margin-bottom: 2rem;
  }

  .option {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
  }

  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type='checkbox'],
    input[type='radio'] {
      --active: #603b96;
      --active-inner: #fff;
      --border: #603b96;
      --border-hover: #603b96;
      --background: #fff;
      --disabled: #f6f8ff;
      --disabled-inner: #e1e6f9;
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      display: inline-block;
      height: 21px;
      margin: 0;
      outline: none;
      vertical-align: top;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      cursor: pointer;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
      }

      &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: 0.3s;
        --d-t: 0.6s;
        --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
      }

      &:disabled {
        --b: var(--disabled);
        opacity: 0.9;
        cursor: not-allowed;

        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }

        & + label {
          cursor: not-allowed;
        }
      }

      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            --bc: var(--border-hover);
          }
        }
      }

      & + label {
        font-size: 1.6rem;
        line-height: 1.4;
        display: inline-block;
        vertical-align: top;
        margin-left: 1rem;
        pointer-events: all;
        cursor: pointer;
      }
    }

    input[type='checkbox'] {
      &.switch {
        width: 38px;
        border-radius: 11px;

        &:after {
          left: 2px;
          top: 2px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background: var(--ab, var(--border));
          transform: translateX(var(--x, 0));
        }

        &:checked {
          --ab: var(--active-inner);
          --x: 17px;
        }

        &:disabled {
          &:not(:checked) {
            &:after {
              opacity: 0.6;
            }
          }
        }
      }
    }
  }

  .score {
    width: 100%;
    color: white;
    padding: 2.5rem;
    border-radius: 1.3rem;
    background-color: #603b96;
    margin-top: 3rem;

    &_head {
      position: relative;
      display: grid;
      grid-template-columns: 30rem 3rem;
      width: 100%;
      margin-bottom: 2rem;

      th {
        justify-self: start;
        font-size: 1.6rem;
        font-weight: bold;
        text-transform: uppercase;
      }
    }

    &_body {
      position: relative;
      display: grid;
      grid-template-columns: 30rem 3rem;
      width: 100%;
      padding: 1.4rem 0;
      border-bottom: 1px solid #2c1351a9;

      &:last-child {
        border: none;
      }

      td {
        font-size: 1.6rem;
        font-weight: normal;
      }
    }
  }
}
</style>