import { defineStore } from 'pinia'

export const useTopStore = defineStore({
    id: 'top-store',
    state: () => {
        return {
            topDaily: null,
            topWeek: null,
            topMonth: null,
            topViewDaily: null,
            topViewWeek: null,
            topViewMonth: null,
            topDonate: null
        }
    },
    actions: {
        setTopDaily(value) {
            this.$state.topDaily = value;
        },
        setTopWeek(value) {
            this.$state.topWeek = value;
        },
        setTopMonth(value) {
            this.$state.topMonth = value;
        },
        setTopViewDaily(value) {
            this.$state.topViewDaily = value;
        },
        setTopViewWeek(value) {
            this.$state.topViewWeek = value;
        },
        setTopViewMonth(value) {
            this.$state.topViewMonth = value;
        },
        setTopDonate(value) {
            this.$state.topDonate = value;
        },
    },
});
