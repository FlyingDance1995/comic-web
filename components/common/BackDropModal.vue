<script setup>
import {useConfigStore} from "~/store/config.js";

const configStore = useConfigStore();

const reportModal = computed(() => configStore.$state.reportModal);
const reportErrorModal = computed(() => configStore.$state.reportErrorModal);
const donateModal = computed(() => configStore.$state.donateModal);

const handleClick = () => {
    configStore.setReportModal(false);
    configStore.setReportErrorModal(false);
    configStore.setDonateModal(false);
};
</script>

<template>
    <div v-if="reportModal || reportErrorModal || donateModal" class="modal-backdrop fade show" @click="handleClick"></div>
</template>
