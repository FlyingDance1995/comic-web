import { defineStore } from 'pinia'
import axios from 'axios'

export const useTeamstore = defineStore('teams', {
  state: () => ({
    teams: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchTeams() {
      this.loading = true
      try {
        const response = await axios.get('http://103.176.146.159:8498/api/teams')
        this.teams = response.data.results
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})