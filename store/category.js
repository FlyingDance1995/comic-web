import {defineStore} from 'pinia'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        category: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchCategory() {
            this.loading = true;
            try {
                const { data: category } = await useAPI('/category?page=1&size=300');
                this.$state.category = category.value.results;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
})
