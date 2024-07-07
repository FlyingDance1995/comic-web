import { defineStore } from 'pinia'
import axios from 'axios'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    category: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCategory() {
      this.loading = true
      try {
        const response = await axios.get('http://103.176.146.159:8498/api/category')
        this.category = response.data.results
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})