import {defineStore} from 'pinia';

export const useTeamStore = defineStore('teams', {
    state: () => ({
        teams: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchTeams() {
            this.loading = true;
            try {
                const { data: teams } = await useAPI('/teams', params);
                this.$state.teams = teams.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})