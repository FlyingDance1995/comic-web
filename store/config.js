import { defineStore } from 'pinia'

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
            searchModal: false,
            reportModal: false,
            reportErrorModal: false,
            storyReportError: null,
            donateModal: false,
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
        },
        setSearchModal(value) {
            this.$state.searchModal = value;
        },
        setReportModal(value) {
            this.$state.reportModal = value;
        },
        setReportErrorModal(value) {
            this.$state.reportErrorModal = value;
        },
        setStoryReportError(value) {
            this.$state.storyReportError = value;
        },
        setDonateModal(value) {
            this.$state.donateModal = value;
        }
    },
});
