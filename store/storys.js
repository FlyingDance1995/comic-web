import {defineStore} from 'pinia'

export const useStoryStore = defineStore('story', {
    state: () => ({
        storys: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchStorys(params = null) {
            this.loading = true;
            try {
                const { data: story } = await useAPI('/story', params);
                this.$state.storys = story.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

export const useStoryStore1 = defineStore('story1', {
    state: () => ({
        storys: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchStorys(params) {
            this.loading = true;
            try {
                const { data: story } = await useAPI('/story', params);
                this.$state.storys = story.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})
