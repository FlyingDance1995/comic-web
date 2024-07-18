import { defineStore } from 'pinia'

export const useConfigStore = defineStore({
    id: 'config-store',
    state: () => {
        return {
            loadingModal: false,
            swal: false,
            textSwal: '',
            titleSwal: '',
        }
    },
    actions: {
        setLoadingModal(value) {
            this.$state.loadingModal = value;
        },
        setSwal(value) {
            this.$state.swal = value;
        },
        setTextSwal(value) {
            this.$state.textSwal = value;
        },
        setTitleSwal(value) {
            this.$state.titleSwal = value;
        },
    },
});
