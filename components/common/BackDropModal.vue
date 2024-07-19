<script setup>
import {useConfigStore} from "~/store/config.js";

const configStore = useConfigStore();

const reportModal = computed(() => configStore.$state.reportModal);

const handleClick = () => {
    configStore.setReportModal(false);
};
</script>

<template>
    <div v-if="reportModal" class="modal-backdrop fade show" @click="handleClick"></div>
</template>
