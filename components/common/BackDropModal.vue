<script setup>
import {useConfigStore} from "~/store/config.js";

const configStore = useConfigStore();

const reportModal = computed(() => configStore.$state.reportModal);
const reportErrorModal = computed(() => configStore.$state.reportErrorModal);

const handleClick = () => {
    configStore.setReportModal(false);
    configStore.setReportErrorModal(false);
};
</script>

<template>
    <div v-if="reportModal || reportErrorModal" class="modal-backdrop fade show" @click="handleClick"></div>
</template>
