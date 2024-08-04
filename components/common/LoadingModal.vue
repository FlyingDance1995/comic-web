<script setup>
import {useConfigStore} from "~/store/config.js";

const configStore = useConfigStore();

const loadingModal = computed(() => configStore.$state.loadingModal);

watch(loadingModal, () => {
   if (loadingModal.value) {
       document.body.style.overflow = 'hidden';
   } else {
       document.body.style.overflow = '';
   }
}, {immediate: true});
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
