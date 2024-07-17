import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
    id: 'menu-store',
    state: () => {
        return {
            open: false,
        }
    },
    actions: {
        setMenu(value) {
            this.$state.open = value;
        },
    },
});
