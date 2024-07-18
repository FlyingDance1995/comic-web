import { defineStore } from 'pinia'

const swalSubmitFunction = () => {
    console.log(11)
};

export const useConfigStore = defineStore({
    id: 'config-store',
    state: () => {
        return {
            loadingModal: false,
            swal: {
                open: false,
                title: '',
                text: '',
                type: '',
                onSubmit: null
            },
        }
    },
    actions: {
        setLoadingModal(value) {
            this.$state.loadingModal = value;
        },
        setSwal(value) {
            this.$state.swal = value;
        },
        setOpenSwal(value) {
            this.$state.swal.open = value;
        }
    },
});
