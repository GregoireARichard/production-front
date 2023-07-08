import { defineStore } from 'pinia'

export const useData = defineStore('data', {
  state: () => ({
    connectionLink: null,
  }),
  getters: {
    getConnectionLink() {
      return this.connectionLink
    },
  },
  actions: {
    setConnectionLink(payload) {
      this.connectionLink = payload
    },
  },
})
