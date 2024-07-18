<script setup>
import {useConfigStore} from "~/store/config.js";

const configStore = useConfigStore();

const loadingModal = computed(() => configStore.$state.loadingModal);
</script>
<template>
    <div class="loading-modal" :style="{
        display: loadingModal ? 'block' : 'none'
    }">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
