import { defineStore } from 'pinia'
import axios from 'axios'

export const useStoryStore = defineStore('story', {
  state: () => ({
    storys: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchStorys() {
      this.loading = true
      try {
        const response = await axios.get('http://103.176.146.159:8498/api/story')
        this.storys = response.data.results
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})