<script setup>
import {useConfigStore} from "~/store/config.js";

const configStore = useConfigStore();

const reportModal = computed(() => configStore.$state.reportModal);
const reportErrorModal = computed(() => configStore.$state.reportErrorModal);
const settingModal = computed(() => configStore.$state.settingModal);
const affModal = computed(() => configStore.$state.affModal);

const handleClick = () => {
    configStore.setReportModal(false);
    configStore.setSettingModal(false);
    configStore.setReportErrorModal(false);
};
</script>

<template>
    <div v-if="reportModal || reportErrorModal || settingModal || affModal"
         class="modal-backdrop fade show" @click="handleClick"></div>
</template>
