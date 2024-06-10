// stores/viewStore.js
import { defineStore } from 'pinia'

export const useViewStore = defineStore('view', {
  state: () => ({
    viewMode: 'card', 
  }),
  actions: {
    setViewMode(mode) {
      this.viewMode = mode
    },
  },
})