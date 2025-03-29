import {defineStore} from 'pinia'

// Truyen moi nhat
export const useStoryStore = defineStore('story', {
    state: () => ({
        storys: [],
        total: 0,
        loading: false,
        error: null
    }),

    actions: {
        async fetchStorys(params = null) {
            this.loading = true;
            try {
                const { data: story } = await useAPI('/story', {
                    query: {
                        size: 20,
                        ...params
                    }
                });
                this.$state.storys = story?.value?.results;
                this.$state.total = story?.value?.count;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

// Truyen hoan thanh
export const useStoryStore1 = defineStore('story1', {
    state: () => ({
        storys1: [],
        total1: 0,
        loading: false,
        error: null
    }),

    actions: {
        async fetchStorys(params = null) {
            this.loading = true;
            try {
                const { data: story } = await useAPI('/story', {
                    query: {
                        size: 20,
                        ...params
                    }
                });
                this.$state.storys1 = story?.value?.results;
                this.$state.total1 = story?.value?.count;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

// Truyen hot
export const useStoryHotStore1 = defineStore('story2', {
    state: () => ({
        storys1: [],
        total1: 0,
        loading: false,
        error: null
    }),

    actions: {
        async fetchStorys(params = null) {
            this.loading = true;
            try {
                const { data: story } = await useAPI('/story', {
                    query: {
                        size: 20,
                        ...params
                    }
                });
                this.$state.storys1 = story.value.results;
                this.$state.total1 = story.value.count;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

// Truyen Sang tac
export const usecreateStore1 = defineStore('story3', {
    state: () => ({
        storys1: [],
        total1: 0,
        loading: false,
        error: null
    }),

    actions: {
        async fetchStorys(params = null) {
            this.loading = true;
            try {
                const { data: story } = await useAPI('/story', {
                    query: {
                        size: 20,
                        ...params
                    }
                });
                this.$state.storys1 = story.value.results;
                this.$state.total1 = story.value.count;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})

// Truyen đề cử
export const useRecommendedStoryStore = defineStore('story4', {
    state: () => ({
        storys: [],
        total: 0,
        loading: false,
        error: null
    }),

    actions: {
        async fetchStorys(params = null) {
            this.loading = true;
            try {
                const { data: story } = await useAPI('/story', {
                    query: {
                        size: 20,
                        ...params
                    }
                });
                this.$state.storys = story?.value?.results;
                this.$state.total = story?.value?.count;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})